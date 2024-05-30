import React, {useEffect, useMemo, useState} from 'react'
import {map, seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {KoboIndex, Period, PeriodHelper, Safety_incident} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {SafetyIncidentDashboardBody} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboardBody'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {differenceInDays, subDays} from 'date-fns'
import {protectionDashboardMonitoPreviousPeriodDeltaDays} from '@/features/Protection/DashboardMonito/useProtectionDashboardMonitoData'

export const SafetyIncidentDashboard = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const _period = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('safety_incident').id))
  const ctxAnswers = useKoboAnswersContext()
  const filterShape = useMemo(() => DataFilter.makeShape<InferTypedAnswer<'safety_incident'>>({
    oblast: {
      icon: 'location_on',
      getValue: _ => _.oblast,
      getOptions: () => DataFilter.buildOptionsFromObject(Safety_incident.options.oblast),
      label: m.oblast,
    },
    attackType: {
      icon: 'rocket_launch',
      getValue: _ => _.attack_type,
      getOptions: () => DataFilter.buildOptionsFromObject(Safety_incident.options.attack_type),
      label: m.safety.attackTypes,
      multiple: true,
    },
  }), [])

  useEffect(() => {
    ctxAnswers.byName.fetch({}, 'safety_incident')
    _period.fetch()
  }, [])

  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const [period, setPeriod] = useState<Partial<Period>>({})

  useEffect(() => {
    map(_period.get, setPeriod)
  }, [_period.get])

  const data = seq(ctxAnswers.byName.get('safety_incident')?.data) ?? []
  const {dataIncident, dataAlert} = useMemo(() => {
    return {
      dataIncident: data.filter(_ => !_.incident_type?.includes('alert')),
      dataAlert: data.filter(_ => _.incident_type?.includes('alert')),
    }
  }, [data])

  const {dataIncidentFiltered, dataIncidentFilteredLastPeriod} = useMemo(() => {
    const filtered = DataFilter.filterData(dataIncident, filterShape, optionFilter)
    return {
      dataIncidentFiltered: filtered.filter(_ => PeriodHelper.isDateIn(period, _.date)),
      dataIncidentFilteredLastPeriod: map(period.start, period.end, (start, end) => {
        const lastPeriod = {
          start: start,
          end: subDays(end, protectionDashboardMonitoPreviousPeriodDeltaDays)
        }
        if (differenceInDays(end, start) <= protectionDashboardMonitoPreviousPeriodDeltaDays) return
        return filtered.filter(_ => PeriodHelper.isDateIn(lastPeriod, _.date))
      })
    }
  }, [dataIncident, optionFilter])

  return (
    <Page
      width="lg"
      loading={ctxAnswers.byName.loading('safety_incident')}
    >
      <DataFilterLayout
        shapes={filterShape}
        filters={optionFilter}
        onClear={() => {
          setOptionFilters({})
          setPeriod(_period.get ?? {})
        }}
        setFilters={setOptionFilters}
        before={
          <DebouncedInput<[Date | undefined, Date | undefined]>
            debounce={400}
            value={[period.start, period.end]}
            onChange={([start, end]) => setPeriod(prev => ({...prev, start, end}))}
          >
            {(value, onChange) => <PeriodPicker
              sx={{marginTop: '-6px'}}
              value={value ?? [undefined, undefined]}
              onChange={onChange}
              min={_period.get?.start}
              max={_period.get?.end}
            />}
          </DebouncedInput>
        }
      />
      <>
        <SafetyIncidentDashboardBody data={{
          data,
          dataAlert,
          dataIncident,
          dataIncidentFiltered,
          dataIncidentFilteredLastPeriod,
        }}/>
        {/*<DashboardSafetyIncidentAgravatingFactors data={data} computed={computed}/>*/}
      </>
    </Page>
  )
}
