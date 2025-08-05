import {useMemo, useState} from 'react'
import {seq} from '@axanc/ts-utils'

import {Period, PeriodHelper, pickPrioritizedAid} from 'infoportal-common'

import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useI18n} from '@/core/i18n'
import {DataFilter} from '@/shared/DataFilter/DataFilter'

import {useLegalFilterShape} from '../hooks'

const useIndividualAidData = () => {
  const {m} = useI18n()
  const fetcherAnswer = useKoboAnswersContext().byName('legal_individual_aid')
  const [casePeriod, setCasePeriod] = useState<Partial<Period>>({})
  const [caseClosurePeriod, setCaseClosurePeriod] = useState<Partial<Period>>({})
  const filterShape = useLegalFilterShape()

  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})

  const data = seq(fetcherAnswer.get?.data) ?? []

  const dataFiltered = useMemo(() => {
    return DataFilter.filterData(data, filterShape, optionFilter)
      .map(({number_case, ...record}) => {
        const prioritizedAid = pickPrioritizedAid(number_case).aid
        // let's ignore lower priority cases:
        return {
          ...record,
          number_case: prioritizedAid ? [prioritizedAid] : undefined,
        }
      })
      .filter(({number_case}) => {
        return (
          PeriodHelper.isDateIn(casePeriod, number_case?.[0]?.date_case) &&
          PeriodHelper.isDateIn(caseClosurePeriod, number_case?.[0]?.date_case_closure)
        )
      })
  }, [data, filterShape, optionFilter, casePeriod, caseClosurePeriod])

  return {
    data,
    dataFiltered,
    fetcherAnswer,
    optionFilter,
    setOptionFilters,
    casePeriod,
    setCasePeriod,
    caseClosurePeriod,
    setCaseClosurePeriod,
  }
}

export {useIndividualAidData}
