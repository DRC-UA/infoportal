import {match} from '@axanc/ts-utils'

import {
  DrcOffice,
  DrcProject,
  DrcProjectHelper,
  KoboSubmissionFlat,
  KoboXmlMapper,
  Meal_ecrec_agMsmeVetPam,
  OblastIndex,
} from 'infoportal-common'

import type {EcrecPdmDataType} from './types'

const pdmAdapter = (record: KoboSubmissionFlat<Meal_ecrec_agMsmeVetPam.T>): EcrecPdmDataType => ({
  source: match(record.pdmtype).cases<'pdm' | 'ecrec'>({cfg: 'pdm'}).default('ecrec'),
  oblast: record.ben_det_oblast === 'crimea' ? undefined : OblastIndex.byKoboName(record.ben_det_oblast)?.name,
  raion: record.ben_det_raion,
  hromada: record.ben_det_hromada,
  project: match(record.donor)
    .cases({
      other: DrcProjectHelper.search(record.donor_other),
      ukr000355_dmfa: DrcProject['UKR-000355 Danish MFA'],
      ukr000388_bha: DrcProject['UKR-000388 BHA'],
      ukr000424_dutchmfa: DrcProject['UKR-000424 Dutch MFA'],
    })
    .default(undefined),
  office: match(record.office)
    .cases({
      dnipro: DrcOffice.Dnipro,
      kharkiv: DrcOffice.Kharkiv,
      slovyansk: DrcOffice.Sloviansk,
      sumy: DrcOffice.Sumy,
      mykolaiv: DrcOffice.Mykolaiv,
      lviv: DrcOffice.Lviv,
      chernihiv: DrcOffice.Chernihiv,
      zaporizhzhya: DrcOffice.Zaporizhzhya,
    })
    .default(undefined),
  pdmType: record.pdmtype,
  received: record.did_receive_cash ?? record.did_receive_cash_no,
  activity: record.pdmtype,
  persons: KoboXmlMapper.Persons.meal_ecrec_agMsmeVetPam(record),
  familySize: (record.number_male ?? 0) + (record.number_female ?? 0),
  answers: record,
})

export {pdmAdapter}
