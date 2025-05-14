import {seq, match} from '@axanc/ts-utils'
import {differenceInYears} from 'date-fns'

import {
  DrcOffice,
  DrcProgram,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  KoboMetaStatus,
  KoboXmlMapper,
  Person,
  Va_bio_tia,
} from 'infoportal-common'

import {KoboMetaOrigin} from './KoboMetaType.js'
import {KoboMetaMapper, MetaMapperInsert} from './KoboMetaService.js'

const Gender = Person.Gender

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
    if (answer.bio_gender || answer.bio_date_birth) {
      const age = answer.bio_date_birth && differenceInYears(Date.now(), answer.bio_date_birth)

      persons.push({
        age,
        gender: match(answer.bio_gender)
          .cases({
            female: Gender.Female,
            male: Gender.Male,
          })
          .default(undefined),
      })
    }
// Each TIA assessment can belong to a different project,
// so we split them into separate meta records to avoid mixing multiple projects in a single record.
// This ensures clean data structure and accurate reporting per project.

    const assessments = answer.tia_assesment || []

    return assessments.flatMap((tia) => {
      const projectKey = tia.project
      const project =
        projectKey && projectKey !== 'not_approved' ? DrcProject[Va_bio_tia.options.project[projectKey]] : undefined

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
        oblast: KoboXmlMapper.Location.mapOblast(answer.place_oblast)?.name!,
        raion: KoboXmlMapper.Location.searchRaion(answer.place_raion),
        hromada: KoboXmlMapper.Location.searchHromada(answer.place_hromada),
        settlement: answer.place_settlement,
        sector: DrcSector.VA,
        activity: DrcProgram.TIA,
        persons,
        personsCount: persons.length,
        project: [project],
        donor: [DrcProjectHelper.donorByProject[project]],
        status: match(answer.case_status)
          .cases({
            paid: KoboMetaStatus.Committed,
            rejected: KoboMetaStatus.Rejected,
            ongoing: KoboMetaStatus.Pending,
          })
          .default(undefined),
        lastStatusUpdate: answer.date_paid,
      })
    })
  }
}
