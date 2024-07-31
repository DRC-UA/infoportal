import React, {ReactNode, useContext, useEffect} from 'react'
import {useProtectionDashboardMonitoData, UseProtHHS2Data} from '@/features/Protection/DashboardMonito/useProtectionDashboardMonitoData'
import {useAppSettings} from '@/core/context/ConfigContext'
import {seq, Seq} from '@alexandreannic/ts-utils'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Period, PeriodHelper, Protection_hhs3} from '@infoportal-common'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {subDays} from 'date-fns'

export interface SnapshotProtMonitoContext {
  computed: NonNullable<UseProtHHS2Data>
  data: Seq<InferTypedAnswer<'protection_hhs3'>>
  dataFiltered: Seq<InferTypedAnswer<'protection_hhs3'>>
  dataPreviousPeriod: Seq<InferTypedAnswer<'protection_hhs3'>>
  period: Period
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
  period: Period,
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const _answers = useFetcher(api.kobo.typedAnswers.search.protection_hhs3)

  useEffect(() => {
    _answers.fetch({force: true, clean: false},)
  }, [])
  const data = seq(_answers.get?.data.filter(_ => !filters.currentOblast || filters.currentOblast.includes(_.where_are_you_current_living_oblast)) ?? [])
  const dataFiltered = data.filter(_ => PeriodHelper.isDateIn(period, _.submissionTime))
  const dataPreviousPeriod = data.filter(_ => PeriodHelper.isDateIn({start: subDays(period.start, 90), end: period.end}, _.submissionTime))

  const computed = useProtectionDashboardMonitoData({data})

  return (
    <Context.Provider value={{
      period,
      data,
      dataFiltered,
      dataPreviousPeriod,
      computed: computed!,
    }}>
      {_answers.get ? children : '...'}
    </Context.Provider>
  )
}
