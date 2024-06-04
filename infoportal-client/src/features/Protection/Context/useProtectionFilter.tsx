import {Seq, seq} from '@alexandreannic/ts-utils'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {ProtectionActivityFlat} from '@/features/Protection/Context/protectionType'
import {useI18n} from '@/core/i18n'
import {useMemo, useState} from 'react'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {hash, IKoboMeta, KoboIndex, Period, PeriodHelper} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'

import {appConfig} from '@/conf/AppConfig'

export type UseProtectionFilter = ReturnType<typeof useProtectionFilters>

export interface ProtectionCustomFilter {
  echo?: boolean
  echoDisability?: boolean
}

export const useProtectionFilters = (data?: Seq<IKoboMeta>, flatData?: Seq<ProtectionActivityFlat>) => {
  const {m} = useI18n()
  const {conf} = useAppSettings()
  const [custom, setCustom] = useState<ProtectionCustomFilter>({})
  const [period, setPeriod] = useState<Partial<Period>>({})
  const shape = useMemo(() => {
    const d = data ?? seq([])
    return DataFilter.makeShape<IKoboMeta>({
      office: {
        icon: appConfig.icons.office,
        label: m.office,
        getValue: _ => _.office,
        getOptions: () => DataFilter.buildOptions(d.flatMap(_ => _.office!).distinct(_ => _).sort())
      },
      oblast: {
        icon: appConfig.icons.oblast,
        label: m.oblast,
        getValue: _ => _.oblast,
        getOptions: () => DataFilter.buildOptions(d.flatMap(_ => _.oblast!).distinct(_ => _).sort())
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
      activity: {
        icon: appConfig.icons.program,
        label: m.activity,
        getValue: _ => _.activity,
        getOptions: () => d.map(_ => _.activity!).distinct(_ => _).sort().map(_ => DataFilter.buildOption(_, KoboIndex.searchById(_)?.translation))
      },
      form: {
        icon: appConfig.icons.koboForm,
        label: m.koboForms,
        getValue: _ => _.formId,
        getOptions: () => d.map(_ => _.formId!).distinct(_ => _).sort().map(_ => DataFilter.buildOption(_, KoboIndex.searchById(_)?.translation))
      },
    })
  }, [data])

  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof shape>>({}, {storageKey: 'protection-dashboard-filters'})

  const filteredData = useMemo(() => {
    if (!data) return
    const filteredBy_date = data.filter(d => {
      try {
        const isDateIn = PeriodHelper.isDateIn(period, d.date)
        if (!isDateIn) return false
        if (custom.echo && hash(d.koboId, 'dedup') % 100 <= conf.other.protection.echoDuplicationEstimationPercent) return false
        if (custom.echoDisability && hash(d.koboId, 'disability') % 100 >= conf.other.protection.echoDisabilityEstimationPercent) return false
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