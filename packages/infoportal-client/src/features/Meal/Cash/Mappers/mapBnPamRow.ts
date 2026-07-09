import {match} from '@axanc/ts-utils'

import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'

import {Meal_cashPdm, Bn_pam, KoboSubmissionFlat, OblastIndex, KoboXmlMapper} from 'infoportal-common'

import {MapFields} from './mapFields'
import {normalizeBnPamToMealPdmAnswers} from './normalizeBnPamToMealPdm'

export const mapBnPamToCashPdmData = (rec: KoboSubmissionFlat<Bn_pam.T>): CashPdmData<Bn_pam.T> => {
  const mealCore = normalizeBnPamToMealPdmAnswers(rec)
  const mealAnswers = MapFields.attachMeta(rec, mealCore)

  const mealDonor = MapFields.donorIfExact(rec.donor)

  return {
    source: 'pdm',
    oblast: rec.ben_det_oblast ? OblastIndex.byKoboName(rec.ben_det_oblast)?.name : undefined,
    raion: rec.ben_det_raion ?? undefined,
    hromada: rec.ben_det_hromada ?? undefined,

    project: MapFields.projectFromExactDonor(mealDonor),
    office: MapFields.projectOfficeIfExact(rec.office),

    pdmType: mealAnswers.pdmtype?.[0],
    received: mealAnswers.did_receive_cash,
    activity: undefined,
    persons: KoboXmlMapper.Persons.bn_pam(rec),
    answers: rec,
  }
}
