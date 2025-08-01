import {match} from '@axanc/ts-utils'

import {
  DrcOffice,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  getActivityType,
  KoboMetaStatus,
  KoboXmlMapper,
  Legal_individual_aid,
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

      return KoboMetaMapper.make({
        office: match(aid?.office)
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
          .default(undefined),
        oblast: KoboXmlMapper.Location.mapOblast(answers.oblast)?.name!,
        raion: KoboXmlMapper.Location.searchRaion(answers.raion),
        hromada: KoboXmlMapper.Location.searchHromada(answers.hromada),
        settlement: answers.settlement,
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
