import {PrismaClient} from '@prisma/client'
import {KoboMappedAnswersService} from '../../kobo/KoboMappedAnswersService'
import {fnSwitch, Seq, seq} from '@alexandreannic/ts-utils'
import {ApiPaginate, ApiPaginateHelper, DrcDonor, DrcOffice, DrcProject, KoboIndex, OblastIndex, Person, safeNumber} from '@infoportal-common'
import {KoboAnswerFilter} from '../../kobo/KoboService'
import {WfpDeduplicationService} from '../../wfpDeduplication/WfpDeduplicationService'
import {appConf} from '../../../core/conf/AppConf'
import {MpcaDataTag, MpcaEntity, MpcaProgram} from './MpcaDbType'
import {WfpDeduplication} from '../../wfpDeduplication/WfpDeduplicationType'
import {KoboSyncServer} from '../../kobo/KoboSyncServer'
import {Bn_Re} from '@infoportal-common'
import {Bn_OldMpcaNfi} from '@infoportal-common'
import {Bn_RapidResponse} from '@infoportal-common'
import {Shelter_cashForRepair} from '@infoportal-common'

export class MpcaDbService {

  constructor(
    private prisma: PrismaClient,
    private kobo: KoboMappedAnswersService = new KoboMappedAnswersService(prisma),
    private wfp: WfpDeduplicationService = new WfpDeduplicationService(prisma),
    private koboSync: KoboSyncServer = new KoboSyncServer(prisma),
    private conf = appConf
  ) {
  }

  readonly refreshNonArchivedForms = async () => {
    const forms = [
      KoboIndex.byName('bn_re').id,
      KoboIndex.byName('bn_rapidResponse').id,
      KoboIndex.byName('shelter_cashForRepair').id,
    ]
    await Promise.all(forms.map(formId => this.koboSync.syncApiForm({formId})))
  }

  readonly search = async (filters: KoboAnswerFilter): Promise<ApiPaginate<MpcaEntity>> => {
    const [wfpIndex, ...rest] = await Promise.all([
      this.wfp.search().then(_ => seq(_.data).groupBy(_ => _.taxId!)),
      this.searchBn_Bnre(filters),
      this.searchBn_1_mpcaNfi(filters),
      this.searchBn_RapidResponseMechanism(filters),
      this.searchBn_cashForRepair(filters),
      this.searchBn_0_mpcaReg(filters),
      this.searchBn_0_mpcaRegNoSig(filters),
      this.searchBn_0_mpcaRegESign(filters),
      this.searchBn_0_mpcaRegNewShort(filters),
    ])
    // const data = this.getDedupplication([...a, ...b, ...c, ...d], wfpIndex)
    return ApiPaginateHelper.make()(
      rest.flat().map(this.getDeduplication(wfpIndex))
      // .map(this.redirectDonor)
      // .map(this.mergeTagDonor)
    )
  }

  private readonly getDeduplication = (wfpIndex: Record<string, Seq<WfpDeduplication>>) => (row: MpcaEntity): MpcaEntity => {
    row.amountUahSupposed = row.hhSize ? row.hhSize * 3 * this.conf.params.assistanceAmountUAH(row.date) : undefined
    row.amountUahFinal = row.amountUahSupposed
    if (!row.taxId) return row
    const dedup = wfpIndex[row.taxId]
    if (!dedup || dedup.length === 0) return row
    dedup
      .filter(_ => _.createdAt.getTime() > row.date.getTime())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    row.deduplication = dedup.pop()
    if (row.deduplication) {
      row.amountUahDedup = row.deduplication.amount
      row.amountUahFinal = row.amountUahDedup
    }
    // if (row.hhSize)
    //   row.amountUahAfterDedup = fnSwitch(row.deduplication?.suggestion!, {
    //     [DrcSupportSuggestion.OneMonth]: row.hhSize * 2220,
    //     [DrcSupportSuggestion.TwoMonths]: row.hhSize * 2220 * 2,
    //     [DrcSupportSuggestion.NoAssistanceDrcDuplication]: 0,
    //     [DrcSupportSuggestion.NoAssistanceFullDuplication]: 0,
    //   }, () => row.hhSize! * 3 * 2220)
    return row
  }

  // private readonly mergeTagDonor = (row: MpcaData): MpcaData => {
  //   row.finalProject = row.tags?.projects?.[0] ?? row.project
  //   return row
  // }

  private readonly redirectDonor = (row: MpcaEntity): MpcaEntity => {
    if ((row.source === 'bn_rapidResponse' || row.source === 'bn_re')
      && row.donor === DrcDonor.PoolFunds
      && fnSwitch(row.oblast!, {
        Chernihivska: false,
        Donetska: true,
        Lvivska: false,
        Zaporizka: false,
        Dnipropetrovska: false,
        Kharkivska: true,
        Volynska: true,
      }, () => false)
    ) {
      row.donor = DrcDonor.BHA
      row.project = DrcProject['UKR-000284 BHA']
    }

    if (!row.donor && row.source === 'bn_rapidResponse' && fnSwitch(row.oblast!, {
      Chernihivska: false,
      Kharkivska: true,
      Donetska: true,
      Lvivska: false,
      Khersonska: true,
      Mykolaivska: true,
    }, () => false)) {
      row.donor = DrcDonor.BHA
      row.project = DrcProject['UKR-000284 BHA']
    }
    return row
  }


  private readonly searchBn_Bnre = (filters: KoboAnswerFilter): Promise<MpcaEntity[]> => {
    return this.kobo.searchBn_re({
      filters: {
        ...filters,
        filterBy: [
          {column: 'back_prog_type', value: ['cfe', 'cfr', 'mpca', 'csf', 'cfu']},
        ]
      }
    }).then(_ => {
      return _.data.map(_ => {
        const group = [..._.hh_char_hh_det ?? [],
          {
            hh_char_hh_det_age: _.hh_char_hhh_age,
            hh_char_hh_det_gender: _.hh_char_hhh_gender
          },
          {
            hh_char_hh_det_age: _.hh_char_res_age,
            hh_char_hh_det_gender: _.hh_char_res_gender,
          },
        ]
        const oblast = OblastIndex.byKoboName(_.ben_det_oblast!)
        return {
          source: 'bn_re',
          enumerator: Bn_Re.options.back_enum[_.back_enum!],
          id: _.id,
          date: _.submissionTime,
          office: fnSwitch(_.back_office!, {
            chj: DrcOffice.Chernihiv,
            dnk: DrcOffice.Dnipro,
            hrk: DrcOffice.Kharkiv,
            lwo: DrcOffice.Lviv,
            nlv: DrcOffice.Mykolaiv,
            umy: DrcOffice.Sumy,
          }, () => undefined),
          oblast: oblast.name,
          oblastIso: oblast.iso,
          raion: Bn_Re.options.ben_det_raion[_.ben_det_raion!],
          hromada: Bn_Re.options.ben_det_hromada[_.ben_det_hromada!],
          prog: seq(_.back_prog_type)?.map(prog => fnSwitch(prog.split('_')[0], {
            'cfr': MpcaProgram.CashForRent,
            'cfe': MpcaProgram.CashForEducation,
            'mpca': MpcaProgram.MPCA,
            'csf': MpcaProgram.CashForFuel,
            'cfu': MpcaProgram.CashForUtilities,
          }, () => undefined)).compact(),
          hhSize: _.ben_det_hh_size,
          persons: group.map(p => ({
            age: safeNumber(p.hh_char_hh_det_age),
            gender: fnSwitch(p.hh_char_hh_det_gender!, {
              female: Person.Gender.Female,
              male: Person.Gender.Male,
            }, () => void 0)
          })),
          // elderlyMen: group.filter(p => p.hh_char_hh_det_age && p.hh_char_hh_det_age >= 50 && p.hh_char_hh_det_gender === 'male').length,
          // elderlyWomen: group.filter(p => p.hh_char_hh_det_age && p.hh_char_hh_det_age >= 50 && p.hh_char_hh_det_gender === 'female').length,
          // men: group.filter(p => p.hh_char_hh_det_age && p.hh_char_hh_det_age >= 18 && p.hh_char_hh_det_age < 50 && p.hh_char_hh_det_gender === 'male').length,
          // women: group.filter(p => p.hh_char_hh_det_age && p.hh_char_hh_det_age >= 18 && p.hh_char_hh_det_age < 50 && p.hh_char_hh_det_gender === 'female').length,
          // boys: group?.filter(p => p.hh_char_hh_det_age && p.hh_char_hh_det_age < 18 && p.hh_char_hh_det_gender === 'male').length,
          // girls: group?.filter(p => p.hh_char_hh_det_age && p.hh_char_hh_det_age < 18 && p.hh_char_hh_det_gender === 'female').length,
          // TODO Handle multiple donors
          ...fnSwitch(_.donor_mpca ?? _.donor_cfe ?? _.donor_cfu ?? _.donor_cff ?? _.donor_cfr ?? _.back_donor?.[0]!, {
            uhf_chj: {donor: DrcDonor.UHF, project: DrcProject['UKR-000314 UHF4'],},
            uhf_dnk: {donor: DrcDonor.UHF, project: DrcProject['UKR-000314 UHF4'],},
            uhf_hrk: {donor: DrcDonor.UHF, project: DrcProject['UKR-000314 UHF4'],},
            uhf_lwo: {donor: DrcDonor.UHF, project: DrcProject['UKR-000314 UHF4'],},
            uhf_nlv: {donor: DrcDonor.UHF, project: DrcProject['UKR-000314 UHF4'],},
            bha_lwo: {donor: DrcDonor.BHA, project: DrcProject['UKR-000284 BHA'],},
            bha_chj: {donor: DrcDonor.BHA, project: DrcProject['UKR-000284 BHA'],},
            bha_dnk: {donor: DrcDonor.BHA, project: DrcProject['UKR-000284 BHA'],},
            bha_hrk: {donor: DrcDonor.BHA, project: DrcProject['UKR-000284 BHA'],},
            bha_nlv: {donor: DrcDonor.BHA, project: DrcProject['UKR-000284 BHA'],},
            echo322_umy: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000322 ECHO2'],},
            echo322_chj: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000322 ECHO2'],},
            echo322_dnk: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000322 ECHO2'],},
            echo322_lwo: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000322 ECHO2'],},
            echo322_hrk: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000322 ECHO2'],},
            echo322_nlv: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000322 ECHO2'],},
            echo_chj: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000269 ECHO1'],},
            echo_dnk: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000269 ECHO1'],},
            echo_hrk: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000269 ECHO1'],},
            echo_lwo: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000269 ECHO1'],},
            echo_nlv: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000269 ECHO1'],},
            novo_nlv: {donor: DrcDonor.NovoNordisk, project: DrcProject['UKR-000298 Novo-Nordisk'],},
            okf_lwo: {donor: DrcDonor.OKF, project: DrcProject['UKR-000309 OKF'],},
            pool_chj: {donor: DrcDonor.PoolFunds, project: DrcProject['UKR-000270 Pooled Funds'],},
            pool_dnk: {donor: DrcDonor.PoolFunds, project: DrcProject['UKR-000270 Pooled Funds'],},
            pool_hrk: {donor: DrcDonor.PoolFunds, project: DrcProject['UKR-000270 Pooled Funds'],},
            pool_lwo: {donor: DrcDonor.PoolFunds, project: DrcProject['UKR-000270 Pooled Funds'],},
            pool_nlv: {donor: DrcDonor.PoolFunds, project: DrcProject['UKR-000270 Pooled Funds'],},
            sdc_umy: {donor: DrcDonor.SDCS, project: DrcProject['UKR-000330 SDC2'],},
            hrk_umy: {donor: DrcDonor.SDCS, project: DrcProject['UKR-000330 SDC2'],},
            uhf6_chj: {donor: DrcDonor.UHF, project: DrcProject['UKR-000336 UHF6'],},
            uhf6_dnk: {donor: DrcDonor.UHF, project: DrcProject['UKR-000336 UHF6'],},
            uhf6_hrk: {donor: DrcDonor.UHF, project: DrcProject['UKR-000336 UHF6'],},
            uhf6_lwo: {donor: DrcDonor.UHF, project: DrcProject['UKR-000336 UHF6'],},
            uhf6_nlv: {donor: DrcDonor.UHF, project: DrcProject['UKR-000336 UHF6'],},
            uhf6_umy: {donor: DrcDonor.UHF, project: DrcProject['UKR-000336 UHF6'],},
            uhf7_chj: {donor: DrcDonor.UHF, project: DrcProject['UKR-000352 UHF7'],},
            uhf7_dnk: {donor: DrcDonor.UHF, project: DrcProject['UKR-000352 UHF7'],},
            uhf7_hrk: {donor: DrcDonor.UHF, project: DrcProject['UKR-000352 UHF7'],},
            uhf7_lwo: {donor: DrcDonor.UHF, project: DrcProject['UKR-000352 UHF7'],},
            uhf7_nlv: {donor: DrcDonor.UHF, project: DrcProject['UKR-000352 UHF7'],},
            uhf7_umy: {donor: DrcDonor.UHF, project: DrcProject['UKR-000352 UHF7'],},
            umy_danida: {donor: DrcDonor.DANI, project: DrcProject['UKR-000267 DANIDA'],},
          }, _ => ({donor: _ as DrcDonor, project: _ as DrcProject})),
          benefStatus: _.ben_det_res_stat,
          lastName: _.ben_det_surname,
          firstName: _.ben_det_first_name,
          patronyme: _.ben_det_pat_name,
          passportSerie: _.pay_det_pass_ser,
          passportNum: _.pay_det_pass_num,
          taxId: _.pay_det_tax_id_num,
          taxIdFileName: _.pay_det_tax_id_ph,
          taxIdFileURL: _.attachments?.find(x => x.filename.includes(_.pay_det_tax_id_ph)),
          idFileName: _.pay_det_id_ph,
          idFileURL: _.attachments?.find(x => x.filename.includes(_.pay_det_id_ph)),
          phone: _.ben_det_ph_number ? '' + _.ben_det_ph_number : undefined,
          tags: _.tags as MpcaDataTag,
        }
      })
    })
  }
  // this.kobo.searchBn_cashForRentApplication(filters).then(_ => {
  //   return _.data.forEach(_ => res.push({
  //     source: MpcaRowSource.CashForRent,
  //     prog: [MpcaProgram.CashForRent],
  //     oblast: fnSwitch(_.ben_det_oblast ?? (_ as any).ben_det_oblastgov!, OblastIndex.koboOblastIndex, () => undefined),
  //     oblastIso: fnSwitch(_.ben_det_oblast ?? (_ as any).ben_det_oblastgov!, OblastIndex.koboOblastIndexIso, () => undefined),
  //     id: _.id,
  //     date: _.submissionTime,
  //     donor: undefined,
  //     lastName: _.ben_last_name,
  //     firstName: _.ben_first_name,
  //     patronyme: _.ben_first_patr,
  //     hhSize: _.ben_det_hh_size,
  //     // passportSerie: _.pay_det_pass_ser,
  //     passportNum: undefined,
  //     taxId: undefined,
  //     taxIdFileName: _.pay_det_tax_id_ph,
  //     taxIdFileURL: _.attachments.find(x => x.filename.includes(_.pay_det_tax_id_ph)),
  //     idFileName: _.pay_det_id_ph,
  //     idFileURL: _.attachments.find(x => x.filename.includes(_.pay_det_id_ph)),
  //     phone: _.bin ? '' + _.bin : undefined,
  //   }))
  // }),

  private readonly searchBn_cashForRepair = (filters: KoboAnswerFilter): Promise<MpcaEntity[]> => {
    return this.kobo.searchShelter_cashForRepair(filters)
      .then(_ => {
        return _.data.map(_ => {
          const oblast = OblastIndex.byKoboName(_.ben_det_oblast ?? (_ as any).ben_det_oblastgov)
          return ({
            source: 'shelter_cashForRepair',
            prog: [MpcaProgram.CashForRepair],
            enumerator: Shelter_cashForRepair.options.name_enum[_.name_enum!],
            oblast: oblast.name,
            oblastIso: oblast.iso,
            office: fnSwitch(_.back_office!, {
              dnk: DrcOffice.Dnipro,
              hrk: DrcOffice.Kharkiv,
              nlv: DrcOffice.Mykolaiv,
              cej: DrcOffice.Chernihiv,
              umy: DrcOffice.Sumy,
            }, () => undefined),
            id: _.id,
            date: _.submissionTime,
            donor: undefined,
            lastName: _.bis,
            firstName: _.bif,
            patronyme: _.bip,
            hhSize: _.bihm,
            // passportSerie: _.pay_det_pass_ser,
            passportNum: _.pay_det_pass_num,
            taxId: _.pay_det_tax_id_num,
            taxIdFileName: _.pay_det_tax_id_ph,
            taxIdFileURL: _.attachments?.find(x => x.filename.includes(_.pay_det_tax_id_ph)),
            idFileName: _.pay_det_id_ph,
            idFileURL: _.attachments?.find(x => x.filename.includes(_.pay_det_id_ph)),
            phone: _.bin ? '' + _.bin : undefined,
            tags: _.tags as MpcaDataTag,
          })
        })
      })
  }

  private readonly searchBn_RapidResponseMechanism = (filters: KoboAnswerFilter): Promise<MpcaEntity[]> => {
    return this.kobo.searchBn_RapidResponseMechanism({
      filters: {
        ...filters,
        filterBy: [
          {column: 'back_prog_type', value: ['mpca', null]},
          {
            column: 'back_prog_type_l', value: [
              'mpca_lwo',
              'mpca_nlv',
              'mpca_dnk',
              'mpca_hrk',
              'mpca_chj',
              'cfr_lwo',
              'cfr_dnk',
              'cfr_chj',
              'cfe_lwo',
              null
            ]
          },
        ]
      }
    }).then(_ => {
      return _.data.map(_ => {
        const group = [..._.hh_char_hh_det_l ?? [], {hh_char_hh_det_age_l: _.hh_char_hhh_age_l, hh_char_hh_det_gender_l: _.hh_char_hhh_gender_l}]
        const oblastIso = fnSwitch(_.ben_det_oblast ?? _.ben_det_oblast_l!,
          OblastIndex.koboOblastIndexIso,
          () => _.submissionTime.getMonth() === 5 ? OblastIndex.byName('Mykolaivska').iso : undefined)
        const oblast = OblastIndex.byIso(oblastIso)?.name
        return ({
          source: 'bn_rapidResponse',
          enumerator: Bn_RapidResponse.options.back_enum_l[_.back_enum ?? _.back_enum_l!],
          prog: seq(_.back_prog_type ?? _.back_prog_type_l).map(prog => fnSwitch(prog.split('_')[0], {
            'cfr': MpcaProgram.CashForRent,
            'cfe': MpcaProgram.CashForEducation,
            'mpca': MpcaProgram.MPCA,
          }, () => undefined)).compact(),
          office: (() => {
            if (_.back_office_l)
              return fnSwitch(_.back_office_l!, {
                chj: DrcOffice.Chernihiv,
                dnk: DrcOffice.Dnipro,
                hrk: DrcOffice.Kharkiv,
                lwo: DrcOffice.Lviv,
                nlv: DrcOffice.Mykolaiv,
                umy: DrcOffice.Sumy,
              })
            return fnSwitch(oblast!, {
              Chernihivska: DrcOffice.Chernihiv,
              Kharkivska: DrcOffice.Kharkiv,
              Khersonska: DrcOffice.Mykolaiv,
              Mykolaivska: DrcOffice.Mykolaiv,
              Lvivska: DrcOffice.Lviv,
              Donetska: DrcOffice.Kharkiv,
            }, () => undefined)
          })(),
          ...(() => {
            if (_.back_donor)
              return fnSwitch(_.back_donor, {
                echo: {donor: DrcDonor.ECHO, project: DrcProject['UKR-000322 ECHO2'],},
                uhf_4: {donor: DrcDonor.UHF, project: DrcProject['UKR-000314 UHF4'],},
                bha: {donor: DrcDonor.BHA, project: DrcProject['UKR-000284 BHA'],},
                novo: {donor: DrcDonor.NovoNordisk, project: DrcProject['UKR-000298 Novo-Nordisk'],},
                pooled: {donor: DrcDonor.PoolFunds, project: DrcProject['UKR-000270 Pooled Funds'],},
              }, () => undefined)
            else if (_.back_donor_l)
              return fnSwitch(_.back_donor_l, {
                uhf_chj: {donor: DrcDonor.UHF, project: DrcProject[`UKR-000314 UHF4`]},
                uhf_dnk: {donor: DrcDonor.UHF, project: DrcProject[`UKR-000314 UHF4`]},
                uhf_hrk: {donor: DrcDonor.UHF, project: DrcProject[`UKR-000314 UHF4`]},
                uhf_lwo: {donor: DrcDonor.UHF, project: DrcProject[`UKR-000314 UHF4`]},
                uhf_nlv: {donor: DrcDonor.UHF, project: DrcProject[`UKR-000314 UHF4`]},
                bha_lwo: {donor: DrcDonor.BHA, project: DrcProject[`UKR-000284 BHA`]},
                bha_chj: {donor: DrcDonor.BHA, project: DrcProject[`UKR-000284 BHA`]},
                bha_dnk: {donor: DrcDonor.BHA, project: DrcProject[`UKR-000284 BHA`]},
                bha_hrk: {donor: DrcDonor.BHA, project: DrcProject[`UKR-000284 BHA`]},
                bha_nlv: {donor: DrcDonor.BHA, project: DrcProject[`UKR-000284 BHA`]},
                echo_chj: {donor: DrcDonor.ECHO, project: DrcProject[`UKR-000269 ECHO1`]},
                echo_dnk: {donor: DrcDonor.ECHO, project: DrcProject[`UKR-000269 ECHO1`]},
                echo_hrk: {donor: DrcDonor.ECHO, project: DrcProject[`UKR-000269 ECHO1`]},
                echo_lwo: {donor: DrcDonor.ECHO, project: DrcProject[`UKR-000269 ECHO1`]},
                echo_nlv: {donor: DrcDonor.ECHO, project: DrcProject[`UKR-000269 ECHO1`]},
                novo_nlv: {donor: DrcDonor.NovoNordisk, project: DrcProject[`UKR-000298 Novo-Nordisk`]},
                okf_lwo: {donor: DrcDonor.OKF, project: DrcProject[`UKR-000309 OKF`]},
                pool_chj: {donor: DrcDonor.PoolFunds, project: DrcProject[`UKR-000270 Pooled Funds`]},
                pool_dnk: {donor: DrcDonor.PoolFunds, project: DrcProject[`UKR-000270 Pooled Funds`]},
                pool_hrk: {donor: DrcDonor.PoolFunds, project: DrcProject[`UKR-000270 Pooled Funds`]},
                pool_lwo: {donor: DrcDonor.PoolFunds, project: DrcProject[`UKR-000270 Pooled Funds`]},
                pool_nlv: {donor: DrcDonor.PoolFunds, project: DrcProject[`UKR-000270 Pooled Funds`]},
              }, () => undefined)
          })(),
          oblast,
          oblastIso,
          raion: Bn_RapidResponse.options.ben_det_raion_l[_.ben_det_raion_l!],
          hromada: Bn_RapidResponse.options.ben_det_hromada_l[_.ben_det_hromada_l!],
          // amountUahSupposed: _.ass_inc_mpca_ben_l as any,
          id: _.id,
          date: _.submissionTime,
          benefStatus: _.ben_det_res_stat_l,
          lastName: _.ben_det_surname ?? _.ben_det_surname,
          firstName: _.ben_det_first_name ?? _.ben_det_first_name,
          patronyme: _.ben_det_pat_name ?? _.ben_det_pat_name,
          hhSize: _.ben_det_hh_size ?? _.ben_det_hh_size_l,
          persons: group.map(p => ({
            age: safeNumber(p.hh_char_hh_det_age_l),
            gender: fnSwitch(p.hh_char_hh_det_gender_l!, {
              female: Person.Gender.Female,
              male: Person.Gender.Male,
            }, () => void 0)
          })),
          // elderlyMen: group.filter(p => p.hh_char_hh_det_age_l && p.hh_char_hh_det_age_l >= 50 && p.hh_char_hh_det_gender_l === 'male').length,
          // elderlyWomen: group.filter(p => p.hh_char_hh_det_age_l && p.hh_char_hh_det_age_l >= 50 && p.hh_char_hh_det_gender_l === 'female').length,
          // men: group.filter(p => p.hh_char_hh_det_age_l && p.hh_char_hh_det_age_l >= 18 && p.hh_char_hh_det_age_l < 50 && p.hh_char_hh_det_gender_l === 'male').length,
          // women: group.filter(p => p.hh_char_hh_det_age_l && p.hh_char_hh_det_age_l >= 18 && p.hh_char_hh_det_age_l < 50 && p.hh_char_hh_det_gender_l === 'female').length,
          // boys: group?.filter(p => p.hh_char_hh_det_age_l && p.hh_char_hh_det_age_l < 18 && p.hh_char_hh_det_gender_l === 'male').length,
          // girls: group?.filter(p => p.hh_char_hh_det_age_l && p.hh_char_hh_det_age_l < 18 && p.hh_char_hh_det_gender_l === 'female').length,
          passportSerie: _.pay_det_pass_ser ?? _.pay_det_pass_ser_l,
          passportNum: _.pay_det_pass_num ?? _.pay_det_pass_num_l,
          taxId: _.pay_det_tax_id_num ?? _.pay_det_tax_id_num_l,
          taxIdFileName: _.pay_det_tax_id_ph ?? _.pay_det_tax_id_ph_l,
          taxIdFileURL: _.attachments?.find(x => x.filename.includes(_.pay_det_tax_id_ph)),
          idFileName: _.pay_det_id_ph ?? _.pay_det_id_ph_l,
          idFileURL: _.attachments?.find(x => x.filename.includes(_.pay_det_id_ph)),
          phone: _.ben_det_ph_number ? '' + _.ben_det_ph_number : undefined,
          tags: _.tags as MpcaDataTag,
        })
      })
    })
  }

  private readonly searchBn_1_mpcaNfi = (filters: KoboAnswerFilter): Promise<MpcaEntity[]> => {
    return this.kobo.searchBn_1_mpcaNfi({
      filters: {
        ...filters,
        filterBy: [{
          column: 'Programme',
          value: ['cash_for_rent', 'mpca'],
          type: 'array',
        }]
      }
    }).then(_ => {
      return _.data.map(_ => {
        const group = [..._.group_in3fh72 ?? [], {GenderHH: _.gender_respondent, AgeHH: _.agex}]
        const oblast = OblastIndex.byKoboName(_.oblast)
        return ({
          source: 'bn_1_mpcaNfi',
          id: _.id,
          enumerator: Bn_OldMpcaNfi.options.staff_names[_.staff_names!],
          date: _.submissionTime,
          prog: fnSwitch(_.Programme!, {
            'mpca': [MpcaProgram.MPCA],
            'mpca___nfi': [MpcaProgram.MPCA],
            'nfi': undefined,
            'cash_for_rent': [MpcaProgram.CashForRent],
            'mpca___cash_for_rent': [MpcaProgram.MPCA, MpcaProgram.CashForRent],
          }, () => undefined),
          office: fnSwitch(_.drc_base!, {
            chj: DrcOffice.Chernihiv,
            hrk: DrcOffice.Kharkiv,
            dnk: DrcOffice.Dnipro,
            lwo: DrcOffice.Lviv,
            cwc: DrcOffice.Chernivtsi,
            iev: DrcOffice.Kyiv,
            plv: DrcOffice.Poltava,
          }, () => undefined),
          // office: fnSwitch(oblast!, {
          //   Lvivska: DrcOffice.Lviv,
          //   Chernivetska: DrcOffice.Lviv,
          //   Zaporizka: DrcOffice.Dnipro,
          //   Dnipropetrovska: DrcOffice.Dnipro,
          //   Chernihivska: DrcOffice.Chernihiv,
          //   Kharkivska: DrcOffice.Kharkiv,
          // }, () => undefined),
          oblast: oblast?.name,
          oblastIso: oblast?.iso,
          donor: DrcDonor.BHA,
          project: DrcProject['UKR-000284 BHA'],
          benefStatus: fnSwitch(_.status!, {
            status_idp: 'idp',
            status_conflict: 'long_res',
            status_returnee: 'ret',
            status_refugee: 'ref_asy',
          }),
          persons: group.map(p => ({
            age: safeNumber(p.AgeHH),
            gender: fnSwitch(p.GenderHH!, {female: Person.Gender.Female, male: Person.Gender.Male, nogender: Person.Gender.Other}, () => void 0)
          })),
          // elderlyMen: group.filter(p => p.AgeHH && p.AgeHH >= 50 && p.GenderHH === 'male').length,
          // elderlyWomen: group.filter(p => p.AgeHH && p.AgeHH >= 50 && p.GenderHH === 'female').length,
          // men: group.filter(p => p.AgeHH && p.AgeHH >= 18 && p.AgeHH < 50 && p.GenderHH === 'male').length,
          // women: group.filter(p => p.AgeHH && p.AgeHH >= 18 && p.AgeHH < 50 && p.GenderHH === 'female').length,
          // boys: group.filter(p => p.AgeHH && p.AgeHH < 18 && p.GenderHH === 'male').length,
          // girls: group.filter(p => p.AgeHH && p.AgeHH < 18 && p.GenderHH === 'female').length,
          lastName: _.patron,
          firstName: _.name_resp,
          patronyme: _.last_resp,
          hhSize: (() => {
            const isWierdCasesWhereGroupIsAboveTotalAndHhhIsRepeated = _.Total_Family && _.group_in3fh72 && _.Total_Family < _.group_in3fh72.length
            if (isWierdCasesWhereGroupIsAboveTotalAndHhhIsRepeated) {
              return _.group_in3fh72!.length
            }
            return _.Total_Family
          })(),
          passportSerie: _.passport_serial,
          passportNum: _.passport_number,
          taxId: _.ITN,
          taxIdFileName: _.photo_reg_passport,
          taxIdFileURL: _.attachments?.find(x => x.filename.includes(_.Photo_of_IDP_Certificate_001)),
          idFileName: _.photo_reg_passport_001,
          idFileURL: _.attachments?.find(x => x.filename.includes(_.photo_reg_passport_001) || x.filename.includes(_.photo_reg_passport)),
          phone: _.phone ? '' + _.phone : undefined,
          tags: _.tags as MpcaDataTag,
        })
      })
    })
  }

  private readonly searchBn_0_mpcaRegNewShort = (filters: KoboAnswerFilter): Promise<MpcaEntity[]> => {
    return this.kobo.searchBn_0_mpcaRegNewShort(filters)
      .then(_ => {
        return _.data.map(_ => {
          const oblast = OblastIndex.byKoboName(_.oblast)
          return {
            source: 'bn_0_mpcaRegNewShort',
            prog: [MpcaProgram.MPCA],
            enumerator: Bn_OldMpcaNfi.options.staff_names[_.staff_names!],
            oblast: oblast?.name,
            oblastIso: oblast?.iso,
            office: fnSwitch(_.drc_base!, {
              chj: DrcOffice.Chernihiv,
            }, () => {
              throw new Error(`Unhandled oblast ${_.oblast}`)
            }),
            id: _.id,
            date: _.submissionTime,
            ...fnSwitch(_.DRC_project!, {
              bha_project: {project: DrcProject['UKR-000284 BHA'], donor: DrcDonor.BHA},
            }, () => {
              throw new Error(`Unhandled project ${_.DRC_project}`)
            }),
            lastName: _.last_resp,
            firstName: _.name_resp,
            patronyme: _.patron,
            hhSize: _.household_size,
            passportNum: undefined,
            taxId: _.your_id,
            taxIdFileName: undefined,
            taxIdFileURL: undefined,
            idFileName: undefined,
            idFileURL: undefined,
            phone: '' + _.phone,
            tags: _.tags as MpcaDataTag,
          }
        })
      })
  }

  private readonly searchBn_0_mpcaReg = (filters: KoboAnswerFilter): Promise<MpcaEntity[]> => {
    return this.kobo.searchBn_0_mpcaReg(filters)
      .then(_ => {
        return _.data.map(_ => {
          const oblast = fnSwitch(_.oblast!, {
            dnipropetrovska: OblastIndex.byName('Dnipropetrovska'),
            lvivska: OblastIndex.byName('Lvivska'),
            chernihivska: OblastIndex.byName('Chernihivska'),
            chernivetska: OblastIndex.byName('Chernivetska'),
            mykolaivska: OblastIndex.byName('Mykolaivska'),
            khersonska: OblastIndex.byName('Khersonska'),
            donetska: OblastIndex.byName('Donetska'),
          }, d => {
            return OblastIndex.byKoboName(d)
          })
          return {
            source: 'bn_0_mpcaReg',
            prog: [MpcaProgram.MPCA],
            enumerator: Bn_OldMpcaNfi.options.staff_names[_.staff_names!],
            oblast: oblast?.name,
            oblastIso: oblast?.iso,
            office: fnSwitch(_.drc_base!, {
              dnk: DrcOffice.Dnipro,
              lwo: DrcOffice.Lviv,
              chj: DrcOffice.Chernihiv,
              cwc: DrcOffice.Chernivtsi,
            }, () => {
              throw new Error(`Unhandled office ${_.drc_base}`)
            }),
            id: _.id,
            date: _.submissionTime,
            ...fnSwitch(_.DRC_project!, {
              bha_project: {project: DrcProject['UKR-000284 BHA'], donor: DrcDonor.BHA},
            }, () => {
              throw new Error(`Unhandled project ${_.DRC_project}`)
            }),
            lastName: _.last_resp,
            firstName: _.name_resp,
            patronyme: _.patron,
            hhSize: _.household_size,
            passportSerie: _.passport_serial,
            passportNum: _.passport_number,
            taxId: _.your_id,
            taxIdFileName: _.id,
            taxIdFileURL: undefined,
            idFileName: undefined,
            idFileURL: undefined,
            phone: '' + _.phone,
            tags: _.tags as MpcaDataTag,
          }
        })
      })
  }
  private readonly searchBn_0_mpcaRegNoSig = (filters: KoboAnswerFilter): Promise<MpcaEntity[]> => {
    return this.kobo.searchBn_0_mpcaRegNoSig(filters)
      .then(_ => {
        return _.data.map(_ => {
          const oblast = fnSwitch(_.oblast!, {
            dnipropetrovska: OblastIndex.byName('Dnipropetrovska'),
            lvivska: OblastIndex.byName('Lvivska'),
            chernihivska: OblastIndex.byName('Chernihivska'),
            chernivetska: OblastIndex.byName('Chernivetska'),
            mykolaivska: OblastIndex.byName('Mykolaivska'),
            khersonska: OblastIndex.byName('Khersonska'),
            donetska: OblastIndex.byName('Donetska'),
          }, d => {
            return OblastIndex.byKoboName(d)
          })
          return {
            source: 'bn_0_mpcaRegNoSig',
            prog: [MpcaProgram.MPCA],
            oblast: oblast.name,
            oblastIso: oblast.iso,
            office: fnSwitch(_.drc_base!, {
              dnk: DrcOffice.Dnipro,
              lwo: DrcOffice.Lviv,
              chj: DrcOffice.Chernihiv,
              cwc: DrcOffice.Chernivtsi,
            }, () => {
              throw new Error(`Unhandled office ${_.drc_base}`)
            }),
            id: _.id,
            date: _.submissionTime,
            ...fnSwitch(_.DRC_project!, {
              bha: {project: DrcProject['UKR-000284 BHA'], donor: DrcDonor.BHA},
            }, () => {
              throw new Error(`Unhandled project ${_.DRC_project}`)
            }),
            lastName: _.last_resp,
            firstName: _.name_resp,
            patronyme: _.patron,
            hhSize: _.household_size,
            taxId: _.adult_1,
            phone: '' + _.phone,
            tags: _.tags as MpcaDataTag,
          }
        })
      })
  }
  private readonly searchBn_0_mpcaRegESign = (filters: KoboAnswerFilter): Promise<MpcaEntity[]> => {
    return this.kobo.searchBn_0_mpcaRegESign(filters)
      .then(_ => {
        return _.data.map(_ => {
          const oblast = fnSwitch(_.oblast!, {
            dnipropetrovska: OblastIndex.byName('Dnipropetrovska'),
            lvivska: OblastIndex.byName('Lvivska'),
            chernihivska: OblastIndex.byName('Chernihivska'),
            chernivetska: OblastIndex.byName('Chernivetska'),
            mykolaivska: OblastIndex.byName('Mykolaivska'),
            khersonska: OblastIndex.byName('Khersonska'),
            donetska: OblastIndex.byName('Donetska'),
            kharkivska: OblastIndex.byName('Kharkivska'),
            kyivska: OblastIndex.byName('Kyivska'),
            luhanska: OblastIndex.byName('Luhanska'),
            zaporizka: OblastIndex.byName('Zaporizka'),
            odeska: OblastIndex.byName('Odeska'),
          }, d => {
            return OblastIndex.byKoboName(_.oblast)
          })
          return {
            source: 'bn_0_mpcaRegESign',
            prog: [MpcaProgram.MPCA],
            oblast: oblast?.name,
            oblastIso: oblast?.iso,
            office: fnSwitch(_.drc_base!, {
              dnk: DrcOffice.Dnipro,
              lwo: DrcOffice.Lviv,
              chj: DrcOffice.Chernihiv,
              cwc: DrcOffice.Chernivtsi,
            }, () => {
              throw new Error(`Unhandled office ${_.drc_base}`)
            }),
            id: _.id,
            date: _.submissionTime,
            ...fnSwitch(_.DRC_project!, {
              bha: {project: DrcProject['UKR-000284 BHA'], donor: DrcDonor.BHA},
            }, () => {
              throw new Error(`Unhandled project ${_.DRC_project}`)
            }),
            lastName: _.last_resp,
            firstName: _.name_resp,
            patronyme: _.patron,
            hhSize: _.household_size,
            taxId: _.adult_1,
            taxIdFileName: _.Photo_of_Individual_Tax_Code,
            taxIdFileURL: _.attachments?.find(x => x.filename.includes(_.Photo_of_Individual_Tax_Code)),
            idFileName: _.Passport_page_1 ?? _.Photo_of_ID_card,
            idFileURL: _.attachments?.find(x => x.filename.includes(_.Passport_page_1) || x.filename.includes(_.Photo_of_ID_card)),
            phone: '' + _.phone,
            tags: _.tags as MpcaDataTag,
          }
        })
      })
  }
}
