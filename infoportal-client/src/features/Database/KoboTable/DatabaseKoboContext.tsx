import React, {ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useAsync, UseAsyncSimple} from '@/shared/hook/useAsync'
import {Kobo, KoboAnswer, KoboAnswerId, KoboForm, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {KeyOf, UUID} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {useIpToast} from '@/core/useToast'
import {useI18n} from '@/core/i18n'
import {UseFetcher} from '@/shared/hook/useFetcher'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {databaseCustomMapping} from '@/features/Database/KoboTable/customization/customMapping'

export interface DatabaseKoboContext {
  fetcherAnswers: UseFetcher<() => ReturnType<ApiSdk['kobo']['answer']['searchByAccess']>>
  serverId: UUID
  schema: KoboSchemaHelper.Bundle
  canEdit?: boolean
  form: KoboForm
  updateTag: ApiSdk['kobo']['answer']['updateTag']
  asyncRefresh: UseAsyncSimple<() => Promise<void>>
  asyncEdit: (answerId: KoboAnswerId) => string
  asyncUpdateTag: UseAsyncSimple<(_: {
    answerIds: KoboAnswerId[],
    key: KeyOf<any>,
    value: any
  }) => Promise<void>>
  data: KoboMappedAnswer[]
}

const Context = React.createContext({} as DatabaseKoboContext)

export const useDatabaseKoboTableContext = () => useContext<DatabaseKoboContext>(Context)

export const DatabaseKoboTableProvider = (props: {
  schema: KoboSchemaHelper.Bundle
  dataFilter?: (_: KoboMappedAnswer) => boolean
  children: ReactNode
  fetcherAnswers: DatabaseKoboContext['fetcherAnswers']
  serverId: DatabaseKoboContext['serverId']
  canEdit: DatabaseKoboContext['canEdit']
  form: DatabaseKoboContext['form']
  data: KoboAnswer[]
}) => {
  const {m} = useI18n()
  const {
    form,
    data,
    serverId,
    children,
    fetcherAnswers,
  } = props
  const {api} = useAppSettings()
  const {toastError} = useIpToast()
  const refreshRequestedFlag = useRef(false)

  const mapData = (data: KoboAnswer[]) => {
    const mapped = data.map(_ => {
      const m = Kobo.mapAnswerBySchema(props.schema.schemaHelper.questionIndex, _)
      if (databaseCustomMapping[form.id]) {
        return databaseCustomMapping[form.id](m)
      }
      return m
    })
    return props.dataFilter ? mapped.filter(props.dataFilter) : mapped
  }

  const asyncRefresh = useAsync(async () => {
    refreshRequestedFlag.current = true
    await api.koboApi.synchronizeAnswers(serverId, form.id)
    await fetcherAnswers.fetch({force: true, clean: false})
  })

  const asyncEdit = (answerId: KoboAnswerId) => api.koboApi.getEditUrl({serverId, formId: form.id, answerId})

  const [mappedData, setMappedData] = useState<KoboMappedAnswer[]>(mapData(data))

  useEffect(() => {
    if (refreshRequestedFlag.current) {
      setMappedData(mapData(data))
      refreshRequestedFlag.current = false
    }
  }, [data])

  const updateTag = useCallback((params: Parameters<ApiSdk['kobo']['answer']['updateTag']>[0]) => {
    const req = api.kobo.answer.updateTag({
      formId: form.id,
      answerIds: params.answerIds,
      tags: params.tags,
    })
    const updatedIds = new Set(params.answerIds)
    setMappedData(prev => prev.map(_ => updatedIds.has(_.id) ? ({..._, tags: params.tags as any}) : _))
    return req.catch(e => {
      toastError(m._koboDatabase.tagNotUpdated)
      fetcherAnswers.fetch({force: true, clean: false})
    })
  }, [mappedData])

  const asyncUpdateTag = useAsync(async ({
    answerIds,
    key,
    value
  }: {
    answerIds: KoboAnswerId[],
    key: KeyOf<any>,
    value: any,
  }) => {
    const index = new Set(answerIds)
    setMappedData(prev => {
      return prev?.map(_ => {
        if (index.has(_.id)) _.tags = {...(_.tags ?? {}), [key]: value}
        return _
      })
    })
    await api.kobo.answer.updateTag({
      formId: form.id,
      answerIds: answerIds,
      tags: {[key]: value}
    })
  })

  return (
    <Context.Provider value={{
      ...props,
      asyncRefresh,
      updateTag,
      asyncEdit,
      asyncUpdateTag,
      data: mappedData,
    }}>
      {children}
    </Context.Provider>
  )
}
