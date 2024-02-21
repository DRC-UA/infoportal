import React, {ReactNode, useContext, useEffect, useMemo} from 'react'
import {MicrosoftGraphClient} from '@/core/sdk/microsoftGraph/microsoftGraphClient'
import {DrcProjectHelper, KoboIndex, NonNullableKey} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {MpcaPayment} from '@/core/sdk/server/mpcaPaymentTool/MpcaPayment'
import {KoboAnswerFilter} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {MpcaEntity, MpcaTypeTag} from '@/core/sdk/server/mpca/MpcaEntity'
import {Enum, map, Seq, seq} from '@alexandreannic/ts-utils'
import {KoboAnswerId, KoboId} from '@/core/sdk/server/kobo/Kobo'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'
import {useAsync, UseAsyncSimple} from '@/shared/hook/useAsync'

// [DONORS according to Alix]

// CASH for Repairs
//  si c'est le cash for repair a Mykolaiv c'est Danish MFA - UKR-000301
//  Si c'est celui de Lviv, c'est Pooled Funds: 000270

// Emergency DAM:
//   Danish MFA - UKR-000301 & Pooled Funds: 000270 (Kherson Registration); Novo Nordisk 000298 (Mykolaiv Registration)

interface UpdateTag<K extends keyof MpcaTypeTag> {
  formId?: KoboId
  answerIds: KoboAnswerId[],
  key: K,
  value: MpcaTypeTag[K] | null
}

export interface MpcaContext {
  refresh: UseAsyncSimple<() => Promise<void>>
  data?: Seq<MpcaEntity>
  asyncUpdates: UseAsyncSimple<<K extends keyof MpcaTypeTag>(_: UpdateTag<K>) => Promise<void>>
  fetcherData: UseFetcher<(filters?: KoboAnswerFilter) => Promise<Seq<MpcaEntity>>>
  _getPayments: UseFetcher<() => Promise<MpcaPayment[]>>
  _create: UseAsyncSimple<(_: string[]) => Promise<MpcaPayment>>
}

const Context = React.createContext({} as MpcaContext)

export const useMpcaContext = () => useContext(Context)

export const MpcaProvider = ({
  children,
  sdk = new MicrosoftGraphClient(),
}: {
  sdk?: MicrosoftGraphClient
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const _getPayments = useFetcher(api.mpcaPayment.getAll)
  const _create = useAsync(api.mpcaPayment.create)//

  const fetcherData = useFetcher((_?: KoboAnswerFilter) => api.mpca.search(_).then(_ => seq(_.data)) as Promise<Seq<MpcaEntity>>)
  const dataIndex = useMemo(() => {
    const index: Record<KoboAnswerId, number> = {}
    fetcherData.get?.forEach((_, i) => {
      index[_.id] = i
    })
    return index
  }, [fetcherData.get])

  const asyncRefresh = useAsync(async () => {
    await api.mpca.refresh()
    await fetcherData.fetch({clean: false, force: true})
  })

  useEffect(() => {
    fetcherData.fetch()
  }, [])

  const mappedData = useMemo(() => {
    return fetcherData.get?.map(_ => {
      _.finalProject = _.tags?.projects?.[0] ?? _.project
      _.finalDonor = map(_.tags?.projects?.[0], p => DrcProjectHelper.donorByProject[p]) ?? _.donor
      _.amountUahCommitted = !!_.tags?.committed ? _.amountUahFinal : 0
      return _
    })
  }, [fetcherData.get])

  const asyncUpdates = useAsync(async <K extends keyof MpcaTypeTag>({
    formId,
    answerIds,
    key,
    value
  }: UpdateTag<K>) => {
    if (formId) {
      await updateByFormId({
        formId,
        answerIds,
        key,
        value,
      })
    } else {
      const data = answerIds.map(_ => fetcherData.get![dataIndex[_]])
      const gb = seq(data).groupBy(_ => _.source)
      await Promise.all(Enum.entries(gb).map(([formName, answers]) => {
        return updateByFormId({
          formId: KoboIndex.byName(formName).id,
          answerIds: answers.map(_ => _.id),
          key,
          value,
        })
      }))
    }
  })

  const updateByFormId = async <K extends keyof MpcaTypeTag>({
    formId,
    answerIds,
    key,
    value
  }: NonNullableKey<UpdateTag<K>, 'formId'>) => {
    const newTags = {[key]: value}
    await api.kobo.answer.updateTag({
      formId,
      answerIds,
      tags: newTags,
    })
    fetcherData.set(prev => {
      const copy = prev ? seq([...prev]) : seq([])
      answerIds.forEach(id => {
        copy[dataIndex[id]].tags = {
          ...copy[dataIndex[id]].tags,
          ...newTags,
        }
      })
      return copy
    })
  }


  return (
    <Context.Provider value={{
      data: mappedData,
      fetcherData,
      _getPayments,
      _create,
      refresh: asyncRefresh,
      asyncUpdates,
    }}>
      {children}
    </Context.Provider>
  )
}