import type {FC} from 'react'

import Filters from '../Filters'

import {useIndividualAidContext} from './context'

const DashboardFilters: FC = () => {
  const ctx = useIndividualAidContext()

  return (
    <Filters
      shapes={ctx.filterShape}
      filters={ctx.optionFilter}
      setOptionFilters={ctx.setOptionFilters}
      setCasePeriod={ctx.setCasePeriod}
      casePeriod={ctx.casePeriod}
      caseClosurePeriod={ctx.caseClosurePeriod}
      setCaseClosurePeriod={ctx.setCaseClosurePeriod}
    />
  )
}

export default DashboardFilters
