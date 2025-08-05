import {match} from '@axanc/ts-utils'

import {
  DrcOffice,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  KoboMetaStatus,
  KoboXmlMapper,
  Legal_individual_aid,
  oblastByDrcOffice,
  pickPrioritizedAid,
} from 'infoportal-common'

import {KoboMetaMapper, MetaMapperInsert} from './KoboMetaService.js'
import {KoboMetaOrigin} from './KoboMetaType.js'

class KoboMetaMapperLegal {
  static readonly individualAid: MetaMapperInsert<KoboMetaOrigin<Legal_individual_aid.T>> = (row) => {
    const answers = Legal_individual_aid.map(row.answers)

    const persons = KoboXmlMapper.Persons.legal_individual_aid(answers)

    const {aid, activity} = pickPrioritizedAid(answers.number_case)

    if (aid !== undefined) {
      const project = match(aid.project)
        .cases({
          ukr000304_pspu: DrcProject['UKR-000304 PSPU'],
          ukr000350_sida: DrcProject['UKR-000350 SIDA'],
          ukr000355_danish_mofa: DrcProject['UKR-000355 Danish MFA'],
          ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
          ukr000388_bha: DrcProject['UKR-000388 BHA'],
          ukr000397_gffo: DrcProject['UKR-000397 GFFO'],
          ukr000399_sdc: DrcProject['UKR-000399 SDC3'],
          ukr000423_echo: DrcProject['UKR-000423 ECHO4'],
          ukr000424_dutch_mfa: DrcProject['UKR-000424 Dutch MFA'],
          ukr000426_sdc: DrcProject['UKR-000426 SDC'],
        })
        .default(undefined)

      const office = match(aid?.office)
        .cases({
          umy: DrcOffice.Sumy,
          hrk: DrcOffice.Kharkiv,
          nlv: DrcOffice.Mykolaiv,
          khe: DrcOffice.Kherson,
          iev: DrcOffice.Kyiv,
          dnk: DrcOffice.Dnipro,
          zap: DrcOffice.Zaporizhzhya,
          slo: DrcOffice.Sloviansk,
        })
        .default(undefined)

      // refugees have no UA location, hence use office location instead (doesn't come the form,
      // so setting manually here:)
      const officeLocation = match(aid?.office as any)
        .cases({
          umy: {
            oblast: oblastByDrcOffice[DrcOffice.Sumy].toLocaleLowerCase(),
            raion: 'Sumskyi',
            hromada: 'Sumska',
            settlement: 'Sumy_UA5908027001',
          },
          hrk: {
            oblast: oblastByDrcOffice[DrcOffice.Kharkiv].toLocaleLowerCase(),
            raion: 'Kharkivskyi',
            hromada: 'Kharkivska',
            settlement: 'Kharkiv_UA6312027001',
          },
          nlv: {
            oblast: oblastByDrcOffice[DrcOffice.Mykolaiv].toLocaleLowerCase(),
            raion: 'Mykolaivskyi',
            hromada: 'Mykolaivska',
            settlement: 'Mykolaiv_UA6804049016',
          },
          khe: {
            oblast: oblastByDrcOffice[DrcOffice.Kherson].toLocaleLowerCase(),
            raion: 'Khersonskyi',
            hromada: 'Khersonska',
            settlement: 'Kherson_UA6510015001',
          },
          iev: {
            oblast: oblastByDrcOffice[DrcOffice.Kyiv].toLocaleLowerCase(),
            raion: 'Kyiv',
            hromada: 'Kyiv',
            settlement: 'Kyiv_UA8000000',
          },
          dnk: {
            oblast: oblastByDrcOffice[DrcOffice.Dnipro].toLocaleLowerCase(),
            raion: 'Dniprovskyi',
            hromada: 'Dniprovska',
            settlement: 'Dnipro_UA1202001001',
          },
          zap: {
            oblast: oblastByDrcOffice[DrcOffice.Zaporizhzhya].toLocaleLowerCase(),
            raion: 'Zaporizkyi',
            hromada: 'Zaporizka',
            settlement: 'Zaporizhzhia_UA1416021011',
          },
          slo: {
            oblast: oblastByDrcOffice[DrcOffice.Sloviansk].toLocaleLowerCase(),
            raion: 'Kramatorskyi',
            hromada: 'Slovianska',
            settlement: 'Sloviansk_UA1412021001',
          },
        })
        .default(undefined)

      return KoboMetaMapper.make({
        office,
        ...(answers.oblast
          ? {
              oblast: KoboXmlMapper.Location.mapOblast(answers.settlement === 'kyiv' ? 'kyiv' : answers.oblast)?.name!,
              raion: KoboXmlMapper.Location.searchRaion(answers.settlement === 'kyiv' ? 'kyiv' : answers.raion),
              hromada: KoboXmlMapper.Location.searchHromada(answers.settlement === 'kyiv' ? 'kyiv' : answers.hromada),
              settlement: answers.settlement,
            }
          : {
              oblast: KoboXmlMapper.Location.mapOblast(officeLocation?.oblast)?.name!,
              raion: officeLocation?.raion,
              hromada: officeLocation?.hromada,
              settlement: officeLocation?.settlement,
            }),
        sector: DrcSector.Legal,
        activity,
        persons,
        personsCount: persons.length,
        project: project ? [project] : [],
        donor: project ? [DrcProjectHelper.donorByProject[project]] : [],
        status: match(aid?.status_case)
          .cases({
            pending: KoboMetaStatus.Pending,
            closed_ready: KoboMetaStatus.Committed,
          })
          .default(() => (aid.status_case_pending ? KoboMetaStatus.Pending : undefined)),
        lastStatusUpdate: aid?.date_case_closure ?? aid?.date_case ?? row.updatedAt ?? row.date,
      })
    }
  }
}

export {KoboMetaMapperLegal}
