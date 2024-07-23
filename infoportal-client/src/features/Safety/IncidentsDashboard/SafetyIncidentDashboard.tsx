import React, {useEffect, useMemo, useState} from 'react'
import {map, seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {KoboIndex, Period, Safety_incident} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {SafetyIncidentDashboardBody} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboardBody'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'

enum AlertType {
  green = 'green',
  blue = 'blue',
  yellow = 'yellow',
  red = 'red',
}

export const SafetyIncidentDashboard = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const _period = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('safety_incident').id))
  const ctxAnswers = useKoboAnswersContext()

  const filterShape = useMemo(() => DataFilter.makeShape<InferTypedAnswer<'safety_incident'>>({
    oblast: {
      icon: 'location_on',
      getValue: (_) => _.oblast,
      getOptions: () => DataFilter.buildOptionsFromObject(Safety_incident.options.oblast),
      label: m.oblast,
    },
    alertType: {
      icon: 'notifications',
      getValue: (_) => {
        const alertTypes: AlertType[] = []
        if (_.alert_green_num) alertTypes.push(AlertType.green)
        if (_.alert_blue_num) alertTypes.push(AlertType.blue)
        if (_.alert_yellow_num) alertTypes.push(AlertType.yellow)
        if (_.alert_red_num) alertTypes.push(AlertType.red)
        return alertTypes
      },
      getOptions: () => [
        {value: AlertType.green, label: m.safety.green},
        {value: AlertType.blue, label: m.safety.blue},
        {value: AlertType.yellow, label: m.safety.yellow},
        {value: AlertType.red, label: m.safety.red},
      ],
      multiple: true,
      label: m.safety.alertType,
    },
  }), [m])

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
      dataIncident: data.filter((_) => !_.incident_type || _.incident_type.includes('other') || _.incident_type.includes('attack')),
      dataAlert: data.filter((_) => _.incident_type?.includes('alert')),
    }
  }, [data])

  const {
    dataIncidentFiltered,
    dataAlertFiltered,
  } = useMemo(() => {
    return {
      dataIncidentFiltered: DataFilter.filterData(dataIncident, filterShape, optionFilter), //.filter(_ => PeriodHelper.isDateIn(period, _.date)),
      dataAlertFiltered: DataFilter.filterData(dataAlert, filterShape, optionFilter), //.filter(_ => PeriodHelper.isDateIn(period, _.date)),
    }
  }, [data, period, optionFilter])

  useEffect(() => {
    if (optionFilter.alertType === undefined) {
      setOptionFilters((prev) => ({
        ...prev,
        alertType: [],
      }))
    }
  }, [optionFilter.alertType])

  return (
    <Page width="lg" loading={ctxAnswers.byName.loading('safety_incident')}>
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
            onChange={([start, end]) => setPeriod((prev) => ({...prev, start, end}))}
          >
            {(value, onChange) => (
              <PeriodPicker
                sx={{marginTop: '-6px'}}
                value={value ?? [undefined, undefined]}
                onChange={onChange}
                min={_period.get?.start}
                max={_period.get?.end}
              />
            )}
          </DebouncedInput>
        }
      />
      <>
        <SafetyIncidentDashboardBody
          period={period}
          data={{
            data,
            dataAlert,
            dataAlertFiltered,
            dataIncident,
            dataIncidentFiltered,
          }}
          optionFilter={optionFilter}
          setOptionFilters={setOptionFilters}
        />
        {/*<DashboardSafetyIncidentAgravatingFactors data={data} computed={computed}/>*/}
      </>
    </Page>
  )
}
