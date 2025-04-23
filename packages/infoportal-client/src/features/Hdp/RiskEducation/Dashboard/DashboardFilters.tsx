import type {FC} from 'react'
import {isDate} from 'date-fns'

import {useI18n} from '@/core/i18n'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import type {DashboardFiltersProps} from './types'

const DashboardFilters: FC<DashboardFiltersProps> = ({
  filterShape = {},
  optionFilter,
  fetcherPeriod,
  setOptionFilters,
  setPeriod,
  period,
}) => {
  const {m} = useI18n()
  const handleFiltersCleaning = () => {
    setOptionFilters({})
    setPeriod(fetcherPeriod?.get ?? {})
  }

  return (
    <DataFilterLayout
      shapes={filterShape}
      filters={optionFilter}
      onClear={handleFiltersCleaning}
      setFilters={setOptionFilters}
      before={
        <PeriodPicker
          value={[period?.start, period?.end]}
          onChange={([start, end]) => {
            setPeriod((prev) => ({
              start: isDate(start) ? start : prev.start,
              end: isDate(end) ? end : prev.end,
            }))
          }}
          label={[m.start, m.endIncluded]}
          min={fetcherPeriod?.get.start}
          max={fetcherPeriod?.get.end}
        />
      }
    />
  )
}

export {DashboardFilters}
