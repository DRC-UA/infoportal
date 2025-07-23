import type {FC} from 'react'
import {Box, Typography} from '@mui/material'

import {useI18n} from '@/core/i18n'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import type {FiltersProps} from './types'

const Filters: FC<FiltersProps> = ({
  shapes,
  filters,
  setOptionFilters,
  setCasePeriod,
  casePeriod,
  caseClosurePeriod,
  setCaseClosurePeriod,
  slotProps,
}) => {
  const {m} = useI18n()

  return (
    <DataFilterLayout
      shapes={shapes}
      filters={filters}
      onClear={() => {
        setOptionFilters({})
        setCasePeriod({})
        setCaseClosurePeriod({})
      }}
      setFilters={setOptionFilters}
      slotProps={{
        filtersBox: {pt: 2.5},
        controlsBox: {pt: 2.5},
        wrapperBox: slotProps?.wrapperBox,
      }}
      before={
        <Box display="flex">
          <Box>
            <Typography fontSize="small">{m.legal.aidDate}</Typography>
            <PeriodPicker
              value={[casePeriod?.start, casePeriod?.end]}
              onChange={([start, end]) => {
                setCasePeriod((prev) => ({...prev, start, end}))
              }}
              fullWidth={false}
              label={[m.start, m.endIncluded]}
              min={casePeriod?.start}
              max={casePeriod?.end}
            />
          </Box>
          <Box>
            <Typography fontSize="small">{m.legal.aidClosureDate}</Typography>
            <PeriodPicker
              value={[caseClosurePeriod?.start, caseClosurePeriod?.end]}
              onChange={([start, end]) => {
                setCaseClosurePeriod((prev) => ({...prev, start, end}))
              }}
              fullWidth={false}
              label={[m.start, m.endIncluded]}
              min={caseClosurePeriod?.start}
              max={caseClosurePeriod?.end}
            />
          </Box>
        </Box>
      }
    />
  )
}

export default Filters
