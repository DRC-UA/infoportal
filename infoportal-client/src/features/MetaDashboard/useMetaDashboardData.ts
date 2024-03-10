import {useMemo, useState} from 'react'
import {Seq} from '@alexandreannic/ts-utils'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {appConfig} from '@/conf/AppConfig'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {drcOffices, IKoboMeta, KoboIndex, KoboMetaStatus, OblastIndex, Period, PeriodHelper} from '@infoportal-common'
import {useI18n} from '@/core/i18n'

export const useMetaDashboardData = (data: Seq<IKoboMeta>) => {
  const {m} = useI18n()
  const [period, setPeriod] = useState<Partial<Period>>({})

  const shape = useMemo(() => {
    return DataFilter.makeShape<IKoboMeta>({
      sector: {
        icon: 'category',
        label: m.sector,
        getValue: _ => _.sector,
        getOptions: () => DataFilter.buildOptions(data.flatMap(_ => _.sector!).distinct(_ => _).sort()),
      },
      activity: {
        icon: appConfig.icons.program,
        label: m.program,
        getValue: _ => _.activity,
        getOptions: (get) => DataFilter.buildOptions(get().flatMap(_ => _.activity!).distinct(_ => _).sort()),
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
      status: {
        icon: 'check_circle',
        label: m.status,
        getValue: _ => _.status,
        getOptions: () => DataFilter.buildOptionsFromObject(KoboMetaStatus),
      },
      form: {
        icon: appConfig.icons.koboForm,
        label: m.koboForms,
        getValue: _ => _.formId,
        getOptions: () => data.map(_ => _.formId!).distinct(_ => _).sort().map(_ => DataFilter.buildOption(_, KoboIndex.searchById(_)?.translation ?? _))
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

  const filteredPersons = useMemo(() => filteredData.flatMap(_ => _.persons ?? []), [filteredData])

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