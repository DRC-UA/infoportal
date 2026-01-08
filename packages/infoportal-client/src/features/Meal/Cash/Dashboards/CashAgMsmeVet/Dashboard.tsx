import {useMemo, type FC} from 'react'

import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Page} from '@/shared/Page'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import CashOverview from './components/Overview'
import ReceivingAndUsage from './components/ReceiveingAndUsage'
import RegistrationAndDelivery from './components/RegistrationAndDelivery'
import SufficiencyAg from './components/SufficiencyAg'
import {useCashAgMsmeVet} from './hooks'

const MealEcrecAgVetMsmeDashboard: FC = () => {
  const {data, fetcher, shape, filters, setFilters, periodFilter, setPeriodFilter} = useCashAgMsmeVet()
  const agriData = useMemo(() => data.filter(({pdmType}) => pdmType === 'cfg'), [data])

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
      <ReceivingAndUsage data={data} />
      <RegistrationAndDelivery data={data} />
      {(filters.pdmtype === undefined || filters.pdmtype.length === 0 || filters.pdmtype.includes('cfg')) && (
        <SufficiencyAg data={agriData} />
      )}
    </Page>
  )
}

export default MealEcrecAgVetMsmeDashboard
