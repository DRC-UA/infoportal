import {PrismaClient, UctWfpDeduplication} from '@prisma/client'
import {Seq, seq} from '@axanc/ts-utils'
import {addMonths, toDate} from 'date-fns'

import {ApiPaginate, ApiPaginateHelper, DrcProgram, IKoboMeta, KoboIndex, MpcaEntity} from 'infoportal-common'

import {appConf} from '../../core/conf/AppConf.js'

import {KoboMappedAnswersService} from '../kobo/KoboMappedAnswersService.js'
import {KoboAnswerFilter} from '../kobo/KoboService.js'
import {KoboMetaService} from '../kobo/meta/KoboMetaService.js'
import {KoboSyncServer} from '../kobo/sync/KoboSyncServer.js'
import {WfpDeduplicationService} from '../wfpDeduplication/WfpDeduplicationService.js'

export class MpcaDbService {
  constructor(
    private prisma: PrismaClient,
    private meta = new KoboMetaService(prisma),
    private kobo: KoboMappedAnswersService = new KoboMappedAnswersService(prisma),
    private wfp: WfpDeduplicationService = new WfpDeduplicationService(prisma),
    private koboSync: KoboSyncServer = new KoboSyncServer(prisma),
    private conf = appConf,
  ) {}

  readonly refreshNonArchivedForms = async () => {
    const forms = [
      KoboIndex.byName('bn_re').id,
      KoboIndex.byName('bn_rapidResponse').id,
      KoboIndex.byName('shelter_cashForRepair').id,
    ]
    await Promise.all(forms.map((formId) => this.koboSync.syncApiAnswersToDbByForm({formId})))
  }

  readonly search = async (filters: KoboAnswerFilter): Promise<ApiPaginate<MpcaEntity>> => {
    const [wfpIndex, meta] = await Promise.all([
      this.wfp.search().then((_) => seq(_.data).groupBy((_) => _.taxId!)),
      this.meta.search({
        activities: [
          DrcProgram.MPCA,
          DrcProgram.SectoralCashForAgriculture,
          DrcProgram.SectoralCashForAnimalShelterRepair,
          DrcProgram.SectoralCashForAnimalFeed,
          DrcProgram.CashForRepair,
          DrcProgram.CashForRent,
          DrcProgram.CashForEducation,
          DrcProgram.CashForFuel,
          DrcProgram.CashForUtilities,
        ],
      }),
    ])

    return ApiPaginateHelper.make()(meta.map(this.getDeduplication(wfpIndex)))
  }

  private readonly getDeduplication =
    (wfpIndex: Record<string, Seq<UctWfpDeduplication>>) =>
    (row: IKoboMeta): MpcaEntity => {
      if (row.activity !== DrcProgram.MPCA) return row
      const res: MpcaEntity = {...row}
      res.amountUahSupposed = row.personsCount
        ? row.personsCount * 3 * this.conf.params.assistanceAmountUAH(row.date)
        : undefined
      res.amountUahFinal = res.amountUahSupposed

      if (!row.taxId) return res

      const dedup = wfpIndex[row.taxId]

      if (!dedup || dedup.length === 0) return res

      res.deduplication = wfpIndex[row.taxId].find(
        (_) =>
          _.startDate &&
          _.endDate &&
          addMonths(row.date, 3).getTime() > toDate(_.startDate).getTime() &&
          row.date.getTime() < toDate(_.endDate).getTime(),
      )

      if (res.deduplication) {
        res.amountUahDedup = res.deduplication.amount
        res.amountUahFinal = res.amountUahDedup
      }

      return res
    }
}
