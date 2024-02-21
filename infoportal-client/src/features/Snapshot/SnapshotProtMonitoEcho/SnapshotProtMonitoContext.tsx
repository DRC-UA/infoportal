import React, {ReactNode, useContext, useEffect} from 'react'
import {useProtectionDashboardMonitoData, UseProtHHS2Data} from '@/features/Protection/DashboardMonito/useProtectionDashboardMonitoData'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {seq, Seq} from '@alexandreannic/ts-utils'
import {useFetcher} from '@/shared/hook/useFetcher'
import {KoboProtection_hhs3, Period, Protection_Hhs2} from '@infoportal-common'

export interface SnapshotProtMonitoContext {
  computed: NonNullable<UseProtHHS2Data>
  data: Seq<KoboProtection_hhs3.T>
  period: Partial<Period>
}

const Context = React.createContext({} as SnapshotProtMonitoContext)

export const useSnapshotProtMonitoringContext = () => useContext<SnapshotProtMonitoContext>(Context)

export const SnapshotProtMonitoringProvider = ({
  filters = {},
  period,
  children,
}: {
  filters?: {
    currentOblast?: Protection_Hhs2.T['where_are_you_current_living_oblast'][],
    drcOffice?: Protection_Hhs2.T['staff_to_insert_their_DRC_office'][],
  }
  period: Partial<Period>,
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const {m} = useI18n()

  const request = (filter: Partial<Period>) => api.kobo.typedAnswers.searchProtection_hhs3({
    filters: {
      start: filter.start ?? undefined,
      end: filter.end ?? undefined,
    }
  })
    .then(_ => _.data.filter(_ => !filters.currentOblast || filters.currentOblast.includes(_.where_are_you_current_living_oblast)))
    .then(seq)
  // .filter(_ =>
  //   _.where_are_you_current_living_oblast !== OblastIndex.findISOByName('Dnipropetrovska') &&
  //   _.where_are_you_current_living_oblast !== OblastIndex.findISOByName('Volynska') &&
  //   _.where_are_you_current_living_oblast !== OblastIndex.findISOByName('Ivano-Frankivska')
  // )


  const _answers = useFetcher(request)

  useEffect(() => {
    // if (periodFilter.start || periodFilter.end)
    _answers.fetch({force: true, clean: false}, period)
  }, [period])

  const computed = useProtectionDashboardMonitoData({data: _answers.get})

  return (
    <Context.Provider value={{
      period,
      data: _answers.get!,
      computed: computed!,
    }}>
      {_answers.get ? children : '...'}
    </Context.Provider>
  )
}
