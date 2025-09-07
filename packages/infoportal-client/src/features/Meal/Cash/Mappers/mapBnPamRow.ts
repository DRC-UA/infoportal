import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'
import {Meal_cashPdm, Bn_pam, KoboSubmissionFlat, OblastIndex} from 'infoportal-common'
import {normalizeBnPamToMealPdmAnswers} from './normalizeBnPamToMealPdm'
import {MapFields} from './mapFields'

export const mapBnPamToCashPdmData = (rec: KoboSubmissionFlat<Bn_pam.T>): CashPdmData<Meal_cashPdm.T> => {
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
    persons: undefined,

    answers: mealAnswers,
  }
}
