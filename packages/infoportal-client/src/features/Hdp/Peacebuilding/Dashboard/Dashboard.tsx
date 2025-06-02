import type {FC} from 'react'

import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'

import {usePeacebuildingContext, PeacebuildingProvider} from './Context'
import {DashboardWidgets} from './DashboardWidgets'
import {Typography} from '@mui/material'

export const Dashboard: FC = () => {
  return (
    <PeacebuildingProvider>
      <DashboardWithContext />
    </PeacebuildingProvider>
  )
}

const DashboardWithContext: FC = () => {
  const {m} = useI18n()
  const ctx = usePeacebuildingContext()

  return (
    <Page width="lg" loading={ctx.fetcherAnswer.loading}>
      <Typography variant="h4" sx={{fontWeight: 'bold', mb: 2, mt: 2}}>
        {m.peacebuildingTitle}
      </Typography>
      <DataFilterLayout
        shapes={ctx.filterShape}
        filters={ctx.optionFilter}
        onClear={() => {
          ctx.setOptionFilters({})
          ctx.setPeriod(ctx.fetcherPeriod.get ?? {})
        }}
        setFilters={ctx.setOptionFilters}
        before={
          <PeriodPicker
            value={[ctx.period.start, ctx.period.end]}
            onChange={([start, end]) => {
              ctx.setPeriod((prev) => ({...prev, start: start ?? undefined, end: end ?? undefined}))
            }}
            label={[m.start, m.endIncluded]}
            min={ctx.fetcherPeriod.get?.start}
            max={ctx.fetcherPeriod.get?.end}
          />
        }
      />
      <DashboardWidgets />
    </Page>
  )
}
