import {useEffect, useMemo} from 'react'
import {seq, Obj, type Seq} from '@axanc/ts-utils'

import {Bn_pam, Meal_cashPdm} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'

import {CashPdmData} from '../Context/CashContext'

const beforeFields = [
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

const useCopingStrategiesFigures = (data: Seq<CashPdmData<Meal_cashPdm.T>>) => {
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
          .map(({...beforeFields}) => {
            return Obj.entries(beforeFields).reduce(
              (strategies, [name, value]) => (value === 'yes' ? [...strategies, name] : strategies),
              [],
            )
          }),
      ),
      after: seq(
        (data as unknown as Seq<CashPdmData<Bn_pam.T>>)
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
              }).reduce((strategies, [name, value]) => (value === 'yes' ? [...strategies, name] : strategies), [])
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
