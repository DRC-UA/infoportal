import {useCallback, useEffect, useMemo, useState} from 'react'
import {Seq, match} from '@axanc/ts-utils'

import {PeriodHelper, Protection_pss, type Period} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useI18n} from '@/core/i18n'
import {KoboSchemaContext, useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {usePersistentState} from '@/shared/hook/usePersistantState'

import type {ProtectionPssWithPersons} from './types'

type UsePssFilter = ReturnType<typeof usePssFilters>

const useOptionsTranslation = (contextName: keyof KoboSchemaContext['byName']) => {
  const schemaContext = useKoboSchemaContext({autoFetch: [contextName]})
  const schema = schemaContext.byName[contextName].get

  const getOptionTranslation = useCallback(
    (option: keyof Protection_pss.T) => {
      return (
        schema?.helper.getOptionsByQuestionName(option).map(({name}) => ({
          value: name,
          label: schema.translate.choice(option, name) ?? name,
        })) ?? []
      )
    },
    [schema],
  )

  return {
    translateOptions: getOptionTranslation,
  }
}

const usePssFilters = (data: Seq<ProtectionPssWithPersons> | undefined) => {
  const {m, currentLang} = useI18n()
  const [period, setPeriod] = useState<Partial<Period>>({})
  const schemaContext = useKoboSchemaContext({autoFetch: ['protection_pss']})
  const {translateOptions} = useOptionsTranslation('protection_pss')

  useEffect(() => {
    schemaContext.setLangIndex(match(currentLang).cases({en: 1}).default(0))
  }, [currentLang])

  const shape = useMemo(() => {
    return DataFilter.makeShape<ProtectionPssWithPersons>({
      office: {
        icon: appConfig.icons.office,
        label: m.office,
        getValue: ({staff_to_insert_their_DRC_office}) => staff_to_insert_their_DRC_office,
        getOptions: () => translateOptions('staff_to_insert_their_DRC_office'),
      },
      oblast: {
        icon: appConfig.icons.oblast,
        label: m.oblast,
        getValue: ({ben_det_oblast}) => ben_det_oblast,
        getOptions: () => translateOptions('ben_det_oblast'),
      },
      raion: {
        label: m.raion,
        getValue: ({ben_det_raion}) => ben_det_raion,
        getOptions: () => translateOptions('ben_det_raion'),
      },
      hromada: {
        label: m.hromada,
        getValue: ({ben_det_hromada}) => ben_det_hromada,
        getOptions: () => translateOptions('ben_det_hromada'),
      },
      project: {
        icon: appConfig.icons.project,
        label: m.project,
        getValue: ({project}) => project,
        getOptions: () => translateOptions('project'),
      },
      activity: {
        // icon: appConfig.icons.project,
        label: m.activity,
        getValue: ({activity}) => activity,
        getOptions: () => translateOptions('activity'),
      },
    })
  }, [data])

  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof shape>>(
    {},
    {storageKey: 'pss-dashboard-filters'},
  )

  const filteredData = useMemo(() => {
    if (!data) return
    const filteredBy_date = data.filter((d) => {
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

  return {
    period,
    setPeriod,
    filters,
    setFilters,
    data: filteredData,
    shape,
  }
}

export {usePssFilters, useOptionsTranslation, type UsePssFilter}
