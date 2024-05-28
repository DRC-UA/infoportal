import React, {ReactNode, useContext, useEffect} from 'react'
import {useProtectionDashboardMonitoData, UseProtHHS2Data} from '@/features/Protection/DashboardMonito/useProtectionDashboardMonitoData'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {seq, Seq} from '@alexandreannic/ts-utils'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Period, PeriodHelper, Protection_hhs3} from '@infoportal-common'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk2'

export interface SnapshotProtMonitoContext {
  computed: NonNullable<UseProtHHS2Data>
  data: Seq<InferTypedAnswer<'protection_hhs3'>>
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
    currentOblast?: Protection_hhs3.T['where_are_you_current_living_oblast'][],
    drcOffice?: Protection_hhs3.T['staff_to_insert_their_DRC_office'][],
  }
  period: Partial<Period>,
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const {m} = useI18n()


  const request = (filter: Partial<Period>) => {
    return api.kobo.typedAnswers2.search.protection_hhs3({
      filters: {
        start: filter.start ?? undefined,
        end: filter.end ?? undefined,
      }
    })
      .then(_ => _.data.filter(_ => PeriodHelper.isDateIn(period, _.submissionTime)))
      .then(_ => _.filter(_ => !filters.currentOblast || filters.currentOblast.includes(_.where_are_you_current_living_oblast)))
      .then(seq)
  }

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
