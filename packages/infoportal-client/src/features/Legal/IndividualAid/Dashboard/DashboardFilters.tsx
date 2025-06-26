import type {FC} from 'react'

import {useI18n} from '@/core/i18n'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import {useIndividualAidContext} from './context'
import {Box, Typography} from '@mui/material'

const Filters: FC = () => {
  const ctx = useIndividualAidContext()
  const {m} = useI18n()

  return (
    <DataFilterLayout
      shapes={ctx.filterShape}
      filters={ctx.optionFilter}
      onClear={() => {
        ctx.setOptionFilters({})
        ctx.setCasePeriod(ctx.casePeriod)
        ctx.setCasePeriod(ctx.caseClosurePeriod)
      }}
      setFilters={ctx.setOptionFilters}
      slotProps={{
        filtersBox: {pt: 2.5},
        controlsBox: {pt: 2.5},
      }}
      before={
        <Box display="flex">
          <Box>
            <Typography fontSize="small">{m.legal.caseDate}</Typography>
            <PeriodPicker
              value={[ctx.casePeriod.start, ctx.casePeriod.end]}
              onChange={([start, end]) => {
                ctx.setCasePeriod((prev) => ({...prev, start: start ?? undefined, end: end ?? undefined}))
              }}
              fullWidth={false}
              label={[m.start, m.endIncluded]}
              min={ctx.casePeriod?.start}
              max={ctx.casePeriod?.end}
            />
          </Box>
          <Box>
            <Typography fontSize="small">{m.legal.caseClosureDate}</Typography>
            <PeriodPicker
              value={[ctx.caseClosurePeriod.start, ctx.caseClosurePeriod.end]}
              onChange={([start, end]) => {
                ctx.setCaseClosurePeriod((prev) => ({...prev, start: start ?? undefined, end: end ?? undefined}))
              }}
              fullWidth={false}
              label={[m.start, m.endIncluded]}
              min={ctx.caseClosurePeriod?.start}
              max={ctx.caseClosurePeriod?.end}
            />
          </Box>
        </Box>
      }
    />
  )
}

export default Filters
