import {useEffect, useMemo} from 'react'
import {seq, Obj, type Seq} from '@axanc/ts-utils'

import {
  Bn_pam,
  Meal_cashPdm,
  Bn_rapidResponse2,
  type KoboSubmissionFlat,
  type KoboTagStatus,
  type CashStatus,
} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'

import {CashPdmData} from '../Context/CashContext'

type BeforeCopingRelatedFields = Array<keyof KoboSubmissionFlat<Bn_rapidResponse2.T, KoboTagStatus<CashStatus>>>
type AfterCopingRelatedFields = Array<keyof KoboSubmissionFlat<Bn_pam.T, KoboTagStatus<CashStatus>>>

const beforeFields: BeforeCopingRelatedFields = [
  'lcs_spent_savings',
  'lcs_forrowed_food',
  'lcs_reduced_utilities',
  'lcs_reduce_education_expenditures',
  'lcs_sell_productive_assets',
  'lcs_reduce_health_expenditures',
  'lcs_sell_hh_assets',
  'lcs_sell_house',
  'lcs_strangers_money',
  'lcs_degrading_income_source',
  'lcs_move_elsewhere',
  'lcs_withdrew_children',
]

const useCopingStrategiesFigures = (data: Seq<CashPdmData<Bn_pam.T>>) => {
  const {api} = useAppSettings()
  const rrmFetcher = useFetcher(api.kobo.typedAnswers.search.bn_rapidResponse2)

  const {before, after} = useMemo(() => {
    const uniqueNumbersSet = new Set(
      data
        .map(({answers: {unique_number}}) => unique_number)
        .filter(Boolean)
        .map(String),
    )
    const rrmKoboIds = new Set((rrmFetcher.get?.data ?? []).map(({id}) => id))
    const uniqueIdSet = uniqueNumbersSet.intersection(rrmKoboIds)

    return {
      before: seq(
        (rrmFetcher.get?.data ?? [])
          .filter(({id}) => uniqueIdSet.has(id))
          .map((record) => {
            return Obj.entries(record).reduce(
              (strategies, [name, value]) =>
                beforeFields.includes(name) && value === 'yes' ? [...strategies, name] : strategies,
              [] as BeforeCopingRelatedFields,
            )
          }),
      ),
      after: seq(
        data
          .filter(({answers: {unique_number}}) => uniqueIdSet.has(String(unique_number)))
          .map(
            ({
              answers: {
                lcs_spent_savings,
                lcs_forrowed_food,
                lcs_reduced_utilities,
                lcs_reduce_education_expenditures,
                lcs_sell_productive_assets,
                lcs_reduce_health_expenditures,
                lcs_sell_hh_assets,
                lcs_sell_house,
                lcs_strangers_money,
                lcs_degrading_income_source,
              },
            }) => {
              return Obj.entries({
                lcs_spent_savings,
                lcs_forrowed_food,
                lcs_reduced_utilities,
                lcs_reduce_education_expenditures,
                lcs_sell_productive_assets,
                lcs_reduce_health_expenditures,
                lcs_sell_hh_assets,
                lcs_sell_house,
                lcs_strangers_money,
                lcs_degrading_income_source,
              }).reduce(
                (strategies, [name, value]) => (value === 'yes' ? [...strategies, name] : strategies),
                [] as AfterCopingRelatedFields,
              )
            },
          ),
      ),
    }
  }, [data, rrmFetcher.get])

  useEffect(() => {
    if (!rrmFetcher.get) rrmFetcher.fetch()
  }, [])

  return {
    before,
    after,
    isLoading: rrmFetcher.loading,
  }
}

export {useCopingStrategiesFigures}
