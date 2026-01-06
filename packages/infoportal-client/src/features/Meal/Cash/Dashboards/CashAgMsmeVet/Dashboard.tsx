import type {FC} from 'react'

import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Page} from '@/shared/Page'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import {CashOverview} from './components/Overview'
import {useCashAgMsmeVet} from './hooks'

const MealEcrecAgVetMsmeDashboard: FC = () => {
  const {data, fetcher, shape, filters, setFilters, periodFilter, setPeriodFilter} = useCashAgMsmeVet()

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
      <CashOverview data={data} />
    </Page>
  )
}

export default MealEcrecAgVetMsmeDashboard
