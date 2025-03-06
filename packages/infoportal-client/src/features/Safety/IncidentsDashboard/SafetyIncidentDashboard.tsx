import React from 'react'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {SafetyIncidentDashboardBody} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboardBody'
import {
  SafetyIncidentProvider,
  useSafetyIncidentContext,
} from '@/features/Safety/IncidentsDashboard/SafetyIncidentContext'

export const SafetyIncidentDashboard = () => {
  return (
    <SafetyIncidentProvider>
      <SafetyIncidentDashboardWithContext />
    </SafetyIncidentProvider>
  )
}

const SafetyIncidentDashboardWithContext = () => {
  const {m} = useI18n()
  const ctx = useSafetyIncidentContext()
  return (
    <Page width="lg" loading={ctx.fetcherAnswer.loading}>
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
      <>
        <SafetyIncidentDashboardBody />
        {/*<DashboardSafetyIncidentAgravatingFactors data={data} computed={computed}/>*/}
      </>
    </Page>
  )
}
