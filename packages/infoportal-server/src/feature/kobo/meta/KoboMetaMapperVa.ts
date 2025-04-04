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

export class KoboMetaMapperVa {
  static readonly #mapKoboProjectCodeToDrcProject = (
    projectCode:
      | NonNullable<Va_bio_tia.T['tia_assesment']>[number]['project']
      | NonNullable<Va_bio_tia.T['sub_status']>[number], // TIA Assessment's project or Submission Status' project
  ): DrcProject | undefined => {
    return match(projectCode)
      .cases({
        ukr000306_dutch: DrcProject['UKR-000306 Dutch II'],
        // override typo in the VA BIO&TIA form:
        ukt000350_sida: DrcProject['UKR-000350 SIDA'],
        ukr000350_sida: DrcProject['UKR-000350 SIDA'],
        ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
        ukr000372_echo3: DrcProject['UKR-000372 ECHO3'],
        ukr000397_gffo: DrcProject['UKR-000397 GFFO'],
      })
      .default(undefined)
  }

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

    const projects =
      answer.tia_assesment
        ?.map(({project}, index) => {
          if (project === 'not_approved' || (!project && !answer.sub_status?.[index]) || !answer.sub_status) return

          return DrcProject[Va_bio_tia.options.project[project]]

        })
        .filter((project) => !!project) || []

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
      project: projects,
      donor:
        seq(projects)
          .map((project) => {
            return DrcProjectHelper.donorByProject[project]
          })
          .compact() || [],
      status: match(answer.case_status)
        .cases({
          paid: KoboMetaStatus.Committed,
          rejected: KoboMetaStatus.Rejected,
          ongoing: KoboMetaStatus.Pending,
        })
        .default(undefined),
      lastStatusUpdate: row.date,
    })
  }
}
