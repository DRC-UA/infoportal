import React, {useEffect, useMemo, useState} from 'react'
import {map, seq, Seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {KoboAnswerFlat, KoboIndex, KoboSafetyIncidentHelper, Period, Safety_incidentTracker} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {useSafetyIncidentDashboard} from '@/features/Safety/IncidentsDashboard/useSafetyIncidentDashboard'
import {SafetyIncidentDashboardBody} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboardBody'
import {useFetcher} from '@/shared/hook/useFetcher'

export interface DashboardSafetyIncidentsPageProps {
  filters: DataFilter.Filter
  data: Seq<KoboAnswerFlat<KoboSafetyIncidentHelper.Type>>
  computed: NonNullable<ReturnType<typeof useSafetyIncidentDashboard>>
}

export const SafetyIncidentDashboard = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const _period = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('safety_incident').id))

  const filterShape = DataFilter.makeShape<KoboAnswerFlat<Safety_incidentTracker.T>>({
    oblast: {
      icon: 'location_on',
      getValue: _ => _.oblast,
      getOptions: () => DataFilter.buildOptionsFromObject(Safety_incidentTracker.options.oblast),
      label: m.oblast,
    },
    attackType: {
      icon: 'rocket_launch',
      getValue: _ => _.attack_type,
      getOptions: () => DataFilter.buildOptionsFromObject(Safety_incidentTracker.options.attack_type),
      label: m.safety.attackTypes,
      multiple: true,
    },
    alertType: {
      icon: 'notifications_active',
      getValue: _ => {
        const alertTypes = [];
        if (_.alert_blue_num ?? 0 > 0) alertTypes.push('blue');
        if (_.alert_yellow_num ?? 0 > 0) alertTypes.push('yellow');
        if (_.alert_red_num ?? 0 > 0) alertTypes.push('red');
        return alertTypes;
      },
      getOptions: () => [
        { value: 'blue', label: m.safety.blue },
        { value: 'yellow', label: m.safety.yellow },
        { value: 'red', label: m.safety.red }
      ],
      label: 'Alert Type',
      multiple: true,
    }
  })

  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})
  const _answers = useFetcher((filter: Partial<Period>) => api.kobo.typedAnswers.search.safety_incident({
    filters: {
      start: filter.start,
      end: filter.end,
    }
  }).then(_ => seq(_.data)) as Promise<DashboardSafetyIncidentsPageProps['data']>)

  useEffect(() => {
    _period.fetch()
  }, [])

  useEffect(() => {
    map(_period.get, setPeriodFilter)
  }, [_period.get])

  useEffect(() => {
    _answers.fetch({force: true, clean: false}, periodFilter)
  }, [periodFilter])

  const data: DashboardSafetyIncidentsPageProps['data'] | undefined = useMemo(() => {
    return map(_answers.get, _ => seq(DataFilter.filterData(_, filterShape, optionFilter)))
  }, [_answers.get, optionFilter])

  const computed = useSafetyIncidentDashboard({data: _answers.get, period: periodFilter})

  const totalAlerts = useMemo(() => {
    return data?.sum(_ => (+(_.alert_blue_num ?? 0)) + (+(_.alert_yellow_num ?? 0)) + (+(_.alert_red_num ?? 0))) ?? 0
  }, [data])

  return (
    <Page
      width="lg"
      loading={_answers.loading}
    >
      <DataFilterLayout
        shapes={filterShape}
        filters={optionFilter}
        setFilters={setOptionFilters}
        before={
          <DebouncedInput<[Date | undefined, Date | undefined]>
            debounce={400}
            value={[periodFilter.start, periodFilter.end]}
            onChange={([start, end]) => setPeriodFilter(prev => ({...prev, start, end}))}
          >
            {(value, onChange) => <PeriodPicker
              sx={{marginTop: '-6px'}}
              defaultValue={value ?? [undefined, undefined]}
              onChange={onChange}
              min={_period.get?.start}
              max={_period.get?.end}
            />}
          </DebouncedInput>
        }
      />
      {data && computed && (
        <>
          <SafetyIncidentDashboardBody data={data} computed={computed} totalAlerts={totalAlerts}/>
          {/*<DashboardSafetyIncidentAgravatingFactors data={data} computed={computed}/>*/}
        </>
      )}
    </Page>
  )
}
