import {useCallback, useMemo, useState} from 'react'
import {Seq} from '@alexandreannic/ts-utils'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {appConfig} from '@/conf/AppConfig'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {drcOffices, IKoboMeta, KoboIndex, KoboMetaStatus, OblastIndex, Period, PeriodHelper} from '@infoportal-common'
import {useI18n} from '@/core/i18n'

export type MetaDashboardCustomFilter = {
  distinctBy?: 'taxId' | 'phone'
}

export const distinctByTaxId = <T extends {taxId?: string}, >(data: Seq<T>): Seq<T> => {
  const alreadyMet = new Set()
  return data.filter(_ => {
    if (!_.taxId) return true
    if (alreadyMet.has(_.taxId)) return false
    alreadyMet.add(_.taxId)
    return true
  })
}

export type UseMetaDashboardData = ReturnType<typeof useMetaDashboardData>
export const useMetaDashboardData = (data: Seq<IKoboMeta>) => {
  const {m} = useI18n()
  const [periodCommit, setPeriodCommit] = useState<Partial<Period>>({})
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
  const [shapeFilters, setShapeFilters] = usePersistentState<DataFilter.InferShape<typeof shape>>({}, {storageKey: 'meta-dashboard-filters'})
  const [customFilters, setCustomFilters] = usePersistentState<MetaDashboardCustomFilter>({}, {storageKey: 'meta-dashboard-custom-filters'})

  const filteredData = useMemo(() => {
    const filteredBy_date = data.filter(d => {
      try {
        const isDateIn = PeriodHelper.isDateIn(period, d.date)
        if (!isDateIn) return false
        const isDateCommitIn = (!periodCommit.start && !periodCommit.end)
          || PeriodHelper.isDateIn(periodCommit, d.lastStatusUpdate ?? d.date) && d.status === KoboMetaStatus.Committed
        if (!isDateCommitIn) return false
        return true
      } catch (e) {
        console.log(e, d)
      }
    })
    return DataFilter.filterData(filteredBy_date, shape, shapeFilters)
  }, [data, shapeFilters, period, shape])

  const distinctData = useMemo(() => {
    return distinctByTaxId(filteredData)
  }, [filteredData, customFilters.distinctBy])

  const filteredPersons = useMemo(() => filteredData.flatMap(_ => _.persons ?? []), [filteredData])
  const distinctPersons = useMemo(() => distinctData.flatMap(_ => _.persons ?? []), [distinctData])

  const clearAllFilter = useCallback(() => {
    setShapeFilters({})
    setCustomFilters({})
    setPeriod({})
    setCustomFilters({})
  }, [])

  return {
    shape,
    period,
    setPeriod,
    periodCommit,
    setPeriodCommit,
    shapeFilters,
    setShapeFilters,
    customFilters,
    setCustomFilters,
    clearAllFilter,
    distinctPersons,
    filteredData: customFilters.distinctBy === 'taxId' ? distinctData : filteredData,
    filteredPersons: customFilters.distinctBy === 'taxId' ? distinctPersons : filteredPersons,
  }
}