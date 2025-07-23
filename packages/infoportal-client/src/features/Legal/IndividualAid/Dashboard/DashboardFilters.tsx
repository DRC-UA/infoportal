import type {FC} from 'react'

import {useLegalFilterShape} from '../hooks'
import Filters from '../Filters'

import {useIndividualAidContext} from './context'

const DashboardFilters: FC = () => {
  const shapes = useLegalFilterShape()
  const ctx = useIndividualAidContext()

  return (
    <Filters
      shapes={shapes}
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
