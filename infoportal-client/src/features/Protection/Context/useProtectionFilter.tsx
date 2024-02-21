import {Seq, seq} from '@alexandreannic/ts-utils'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {ProtectionActivity, ProtectionActivityFlat} from '@/features/Protection/Context/protectionType'
import {useI18n} from '@/core/i18n'
import {useMemo, useState} from 'react'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {hash, KoboIndex, Period} from '@infoportal-common'
import {endOfDay, startOfDay} from 'date-fns'
import {useAppSettings} from '@/core/context/ConfigContext'

import {appConfig} from '@/conf/AppConfig'

export type UseProtectionFilter = ReturnType<typeof useProtectionFilters>

export interface ProtectionCustomFilter {
  echo?: boolean
  echoDisability?: boolean
}

export const useProtectionFilters = (data?: Seq<ProtectionActivity>, flatData?: Seq<ProtectionActivityFlat>) => {
  const {m} = useI18n()
  const {conf} = useAppSettings()
  const [custom, setCustom] = useState<ProtectionCustomFilter>({})
  const [period, setPeriod] = useState<Partial<Period>>({
    start: startOfDay(new Date(2023, 4, 1)),
    end: endOfDay(new Date(2023, 11, 31))
  })

  const shape = useMemo(() => {
    const d = data ?? seq([])
    return DataFilter.makeShape<ProtectionActivity>({
      office: {
        icon: appConfig.icons.office,
        label: m.office,
        getValue: _ => _.office,
        getOptions: () => DataFilter.buildOptions(d.flatMap(_ => _.office!).distinct(_ => _).sort())
      },
      oblast: {
        icon: appConfig.icons.oblast,
        label: m.oblast,
        getValue: _ => _.oblast.name,
        getOptions: () => DataFilter.buildOptions(d.flatMap(_ => _.oblast.name!).distinct(_ => _).sort())
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
      project: {
        multiple: true,
        icon: appConfig.icons.project,
        label: m.project,
        getValue: _ => _.project,
        getOptions: () => DataFilter.buildOptions(d.flatMap(_ => _.project!).distinct(_ => _).sort())
      },
      form: {
        icon: appConfig.icons.koboForm,
        label: m.koboForms,
        getValue: _ => _.koboForm,
        getOptions: () => d.map(_ => _.koboForm!).distinct(_ => _).sort().map(_ => DataFilter.buildOption(_, KoboIndex.byName(_).translation))
      },
    })
  }, [data])

  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof shape>>({}, {storageKey: 'protection-dashboard-filters'})

  const filteredData = useMemo(() => {
    if (!data) return
    const filteredBy_date = data.filter(d => {
      try {
        if (period?.start && period.start.getTime() >= d.date.getTime()) return false
        if (period?.end && period.end.getTime() <= d.date.getTime()) return false
        if (custom.echo && hash(d.id, 'dedup') % 100 <= conf.other.protection.echoDuplicationEstimationPercent) return false
        if (custom.echoDisability && hash(d.id, 'disability') % 100 >= conf.other.protection.echoDisabilityEstimationPercent) return false
        return true
      } catch (e) {
        console.log(e, d)
      }
    })
    return DataFilter.filterData(filteredBy_date, shape, filters)
  }, [data, filters, period, custom, shape])

  return {
    period,
    setPeriod,
    filters,
    setFilters,
    data: filteredData,
    custom,
    setCustom,
    shape,
  }
}