import {useMemo, useState} from 'react'
import {seq} from '@axanc/ts-utils'

import {Period, PeriodHelper} from 'infoportal-common'

import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useI18n} from '@/core/i18n'
import {DataFilter} from '@/shared/DataFilter/DataFilter'

import {useLegalFilterShape} from '../hooks'

import {pickPrioritizedAid} from './utils'

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
      .map((record) => ({
        ...record,
        number_case:
          record.number_case?.filter(({date_case, date_case_closure}) => {
            return (
              PeriodHelper.isDateIn(casePeriod, date_case) &&
              PeriodHelper.isDateIn(caseClosurePeriod, date_case_closure)
            )
          }) ?? [],
      }))
      .filter((record) => record.number_case.length > 0)
      .map(({number_case, ...record}) => ({...record, number_case: pickPrioritizedAid(number_case)}))
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
