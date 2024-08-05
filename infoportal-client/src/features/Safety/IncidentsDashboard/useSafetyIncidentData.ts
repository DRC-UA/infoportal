import {useEffect, useMemo, useState} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {useI18n} from '@/core/i18n'
import {KoboIndex, Period, PeriodHelper, Safety_incident} from '@infoportal-common'
import {map, seq} from '@alexandreannic/ts-utils'
import {differenceInDays, subDays} from 'date-fns'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'

enum AlertType {
  green = 'green',
  blue = 'blue',
  yellow = 'yellow',
  red = 'red',
}

export const previousPeriodDeltaDays = 90

export type UseSafetyIncidentData = ReturnType<typeof useSafetyIncidentData>

export const useSafetyIncidentData = () => {
  const {m} = useI18n()
  const {api} = useAppSettings()
  const fetcherAnswer = useKoboAnswersContext().byName('safety_incident')
  const fetcherPeriod = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('safety_incident').id))

  const filterShape = useMemo(() => DataFilter.makeShape<InferTypedAnswer<'safety_incident'>>({
    oblast: {
      icon: 'location_on',
      getValue: _ => _.oblast,
      getOptions: () => DataFilter.buildOptionsFromObject(Safety_incident.options.oblast),
      label: m.oblast,
    },
    alertType: {
      icon: 'notifications',
      getValue: _ => {
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
    attack: {
      icon: 'warning',
      getValue: _ => _.attack,
      getOptions: () => DataFilter.buildOptionsFromObject(Safety_incident.options.zie_visit_person, true),
      label: m.safety.attack,
    },
    attackType: {
      icon: 'rocket_launch',
      getValue: _ => _.attack_type,
      getOptions: () => DataFilter.buildOptionsFromObject(Safety_incident.options.attack_type),
      multiple: true,
      label: m.safety.attackType,
    },
  }), [m])
  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const [period, setPeriod] = useState<Partial<Period>>({})

  const data = seq(fetcherAnswer.get?.data) ?? []
  const dataFiltered = useMemo(() => {
    return DataFilter.filterData(data, filterShape, optionFilter).filter(_ => PeriodHelper.isDateIn(period, _.date))
  }, [data, filterShape, optionFilter, period])

  const dataFilteredLastPeriod = useMemo(() => map(period.start, period.end, (start, end) => {
    const lastPeriod = {
      start: start,
      end: subDays(end, previousPeriodDeltaDays)
    }
    if (differenceInDays(end, start) <= previousPeriodDeltaDays) return
    return data.filter(_ => PeriodHelper.isDateIn(lastPeriod, _.date))
  }), [dataFiltered])

  useEffect(() => {
    map(fetcherPeriod.get, setPeriod)
  }, [fetcherPeriod.get])

  return {
    data,
    dataFiltered,
    dataFilteredLastPeriod,
    filterShape,
    fetcherAnswer,
    fetcherPeriod,
    optionFilter,
    setOptionFilters,
    period,
    setPeriod,
  }
}