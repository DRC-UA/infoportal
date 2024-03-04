import {useMemo, useState} from 'react'
import {Seq, seq} from '@alexandreannic/ts-utils'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {appConfig} from '@/conf/AppConfig'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {Person, KoboIndex, OblastIndex, PeriodHelper, KoboUnified, Period, drcOffices} from '@infoportal-common'
import {useI18n} from '@/core/i18n'

export const useMetaDashboardData = (data: Seq<KoboUnified>) => {
  const {m} = useI18n()
  const [period, setPeriod] = useState<Partial<Period>>({})

  const shape = useMemo(() => {
    return DataFilter.makeShape<KoboUnified>({
      form: {
        icon: appConfig.icons.koboForm,
        label: m.koboForms,
        getValue: _ => _.formId,
        getOptions: () => data.map(_ => _.formId!).distinct(_ => _).sort().map(_ => DataFilter.buildOption(_, KoboIndex.searchById(_)?.translation ?? _))
      },
      activity: {
        multiple: true,
        icon: appConfig.icons.program,
        label: m.program,
        getValue: _ => _.activity,
        getOptions: () => DataFilter.buildOptions(data.flatMap(_ => _.activity!).distinct(_ => _).sort()),
      },
      office: {
        icon: appConfig.icons.office,
        label: m.office,
        getValue: _ => _.office,
        getOptions: () => DataFilter.buildOptions(drcOffices)
      },
      project: {
        multiple: true,
        icon: appConfig.icons.project,
        label: m.project,
        getValue: _ => _.project,
        getOptions: () => DataFilter.buildOptions(data.flatMap(_ => _.project!).distinct(_ => _).sort())
      },
      oblast: {
        icon: appConfig.icons.oblast,
        label: m.oblast,
        getValue: _ => _.oblast,
        getOptions: () => DataFilter.buildOptions(OblastIndex.names),
      },
      raion: {
        label: m.raion,
        getValue: _ => _.raion,
        getOptions: (get) => get().map(_ => _.raion).compact()
          .distinct(_ => _)
          .sort().map(_ => ({value: _, label: _}))
      },
      hromada: {
        label: m.hromada,
        getValue: _ => _.hromada,
        getOptions: (get) => get()
          .map(_ => _.hromada)
          .compact()
          .distinct(_ => _)
          .sort()
          .map(_ => ({value: _, label: _}))
      },
    })
  }, [data])
  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof shape>>({}, {storageKey: 'protection-dashboard-filters'})

  const filteredData = useMemo(() => {
    const filteredBy_date = data.filter(d => {
      try {
        const isDateIn = PeriodHelper.isDateIn(period, d.date)
        if (!isDateIn) return false
        return true
      } catch (e) {
        console.log(e, d)
      }
    })
    return DataFilter.filterData(filteredBy_date, shape, filters)
  }, [data, filters, period, shape])

  const filteredPersons = useMemo(() => filteredData.flatMap(_ => _.individuals ?? []), [filteredData])

  return {
    shape,
    period,
    setPeriod,
    filters,
    setFilters,
    filteredData,
    filteredPersons,
  }
}