import {useMemo, type FC} from 'react'

import {useI18n} from '@/core/i18n'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Page} from '@/shared/Page'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import {
  AgAccountability,
  AgSufficiency,
  AgOutcome,
  CashOverview,
  ReceivingAndUsage,
  RegistrationAndDelivery,
} from './components'
import {useCashAgMsmeVet, useTranslations} from './hooks'

const MealEcrecAgVetMsmeDashboard: FC = () => {
  const {data, fetcher, shape, filters, setFilters, periodFilter, setPeriodFilter} = useCashAgMsmeVet()
  const agriData = useMemo(() => data.filter(({pdmType}) => pdmType === 'cfg'), [data])
  const {translateField} = useTranslations()
  const {m} = useI18n()

  return (
    <Page width="lg" loading={fetcher.loading}>
      <DataFilterLayout
        shapes={shape}
        filters={filters}
        setFilters={setFilters}
        before={
          <DebouncedInput<[Date | undefined, Date | undefined]>
            debounce={400}
            value={[periodFilter.start, periodFilter.end]}
            onChange={([start, end]) => setPeriodFilter((prev) => ({...prev, start, end}))}
          >
            {(value, onChange) => (
              <PeriodPicker defaultValue={value} value={value} onChange={onChange} fullWidth={false} />
            )}
          </DebouncedInput>
        }
      />
      <CashOverview data={data} pdmType={filters.pdmtype} />
      <ReceivingAndUsage
        data={data}
        title={
          translateField ? translateField('use_mpca_assistance') : m.mealMonitoringPdm.loadingDataSubtitlePlaceholder
        }
      />
      <RegistrationAndDelivery
        data={data}
        title={translateField ? translateField('delivery_process') : m.mealMonitoringPdm.loadingDataSubtitlePlaceholder}
      />
      {(filters.pdmtype === undefined || filters.pdmtype.length === 0 || filters.pdmtype.includes('cfg')) && (
        <>
          <AgSufficiency
            data={agriData}
            title={translateField ? translateField('sufficiency') : m.mealMonitoringPdm.loadingDataSubtitlePlaceholder}
          />
          <AgOutcome
            data={agriData}
            title={translateField ? translateField('outcome') : m.mealMonitoringPdm.loadingDataSubtitlePlaceholder}
          />
          <AgAccountability
            data={agriData}
            title={translateField ? translateField('aap') : m.mealMonitoringPdm.loadingDataSubtitlePlaceholder}
          />
        </>
      )}
    </Page>
  )
}

export default MealEcrecAgVetMsmeDashboard
