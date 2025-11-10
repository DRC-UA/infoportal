import {match} from '@axanc/ts-utils'
import {isDate} from 'date-fns'

import {
  DrcOffice,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  KoboMetaStatus,
  KoboXmlMapper,
  Va_bio_tia,
} from 'infoportal-common'

import {KoboMetaOrigin} from './KoboMetaType.js'
import {KoboMetaMapper, MetaMapperInsert} from './KoboMetaService.js'

// MEMO: do not remove this
//
// override typo in the VA BIO&TIA form
// in packages/infoportal-common/src/kobo/generated/Va_bio_tia.ts
// which is replaced by infoportal-scripts/kobo-generator,
// ukt000350_sida: DrcProject['UKR-000350 SIDA'],
// __t___________: _____________________________, - notice the "t" instead of "r"

export class KoboMetaMapperVa {
  static readonly bioAndTia: MetaMapperInsert<KoboMetaOrigin<Va_bio_tia.T>> = (row) => {
    const answer = Va_bio_tia.map(row.answers)
    const persons = KoboXmlMapper.Persons.va_bio_tia(answer)

    // Each TIA assessment can belong to a different project,
    // so we split them into separate meta records to avoid mixing multiple projects in a single record.
    // This ensures clean data structure and accurate reporting per project.

    const assessments = answer.tia_assesment || []

    return assessments.flatMap((tia) => {
      const projectKey = tia.project
      const mappedProject = Va_bio_tia.options.project[projectKey!]
      const project = ['ongoing', 'rejected', 'not_approved', undefined].includes(projectKey)
        ? undefined
        : mappedProject in DrcProject
          ? DrcProject[mappedProject as keyof typeof DrcProject]
          : undefined

      if (!project) return []

      return KoboMetaMapper.make({
        office: match(answer.office_bio)
          .cases({
            cej: DrcOffice.Chernihiv,
            dnk: DrcOffice.Dnipro,
            hrk: DrcOffice.Kharkiv,
            nlv: DrcOffice.Mykolaiv,
            umy: DrcOffice.Sumy,
            iev: DrcOffice.Kyiv,
            slo: DrcOffice.Sloviansk,
          })
          .default(undefined),
        oblast: KoboXmlMapper.Location.mapOblast(tia.oblast)?.name!,
        raion: KoboXmlMapper.Location.searchRaion(tia.raion),
        hromada: KoboXmlMapper.Location.searchHromada(tia.hromada),
        settlement: tia.settlement,
        sector: DrcSector.VA,
        activity: DrcProgram.TIA,
        persons,
        personsCount: persons.length,
        project: [project],
        donor: [DrcProjectHelper.donorByProject[project]],
        status: isDate(tia.date_assistance_provided) ? KoboMetaStatus.Committed : undefined,
        lastStatusUpdate: tia.date_assistance_provided,
      })
    })
  }
}
