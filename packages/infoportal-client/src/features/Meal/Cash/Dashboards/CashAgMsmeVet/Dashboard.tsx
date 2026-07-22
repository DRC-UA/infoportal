import {useMemo, type FC} from 'react'

import {groupBy} from 'infoportal-common'

import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Page} from '@/shared/Page'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {useKoboTranslations} from '@/utils'

import {
  AgAccountability,
  AgSufficiency,
  AgOutcome,
  CashOverview,
  ReceivingAndUsage,
  RegistrationAndDelivery,
  SufficiencyMsme,
  SufficiencyVet,
} from './components'
import {useCashAgMsmeVet} from './hooks'

const MealEcrecAgVetMsmeDashboard: FC = () => {
  const {data, fetcher, shape, filters, setFilters, periodFilter, setPeriodFilter} = useCashAgMsmeVet()
  const {cfg, msme, vet} = useMemo(
    () => groupBy({data, groups: [{by: ({pdmType}) => pdmType!}], finalTransform: (record) => record}).groups,
    [data],
  )
  const {translateField} = useKoboTranslations('meal_ecrec_agMsmeVetPam', {uk: 1, en: 0})

  return (
    <Page width="lg" loading={fetcher.loading}>
      <DataFilterLayout
        shapes={shape}
        filters={filters}
        setFilters={setFilters}
        onClear={() => {
          setFilters({})
          setPeriodFilter({})
        }}
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
      <ReceivingAndUsage data={data} title={translateField('use_mpca_assistance')} />
      <RegistrationAndDelivery data={data} title={translateField('delivery_process')} />
      {(filters.pdmtype === undefined || filters.pdmtype.length === 0 || filters.pdmtype.includes('cfg')) && (
        <>
          <AgSufficiency data={cfg} title={translateField('sufficiency')} />
          <AgOutcome data={cfg} title={translateField('outcome')} />
          <AgAccountability data={cfg} title={translateField('aap')} />
        </>
      )}
      {(filters.pdmtype === undefined || filters.pdmtype.length === 0 || filters.pdmtype.includes('vet')) && (
        <SufficiencyVet data={vet} title={translateField('sufficiency_vet')} />
      )}
      {(filters.pdmtype === undefined || filters.pdmtype.length === 0 || filters.pdmtype.includes('msme')) && (
        <SufficiencyMsme data={msme} title={translateField('sufficiency_msme')} />
      )}
    </Page>
  )
}

export default MealEcrecAgVetMsmeDashboard
