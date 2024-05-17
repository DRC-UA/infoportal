import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useRef, useState} from 'react'
import {useAsync, UseAsyncSimple} from '@/shared/hook/useAsync'
import {Kobo, KoboForm, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {KeyOf, KoboAnswerFlat, KoboAnswerId, UUID} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useIpToast} from '@/core/useToast'
import {useI18n} from '@/core/i18n'
import {useFetcher} from '@/shared/hook/useFetcher'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {databaseCustomMapping} from '@/features/Database/KoboTable/customization/customMapping'
import * as csvToJson from 'csvtojson'
import {Obj, seq} from '@alexandreannic/ts-utils'
import {FetchParams} from '@/shared/hook/useFetchers'

export type ExternalFilesChoices = {list_name: string, name: string, label: string}
export type KoboExternalFilesIndex = Record<string, Record<string, ExternalFilesChoices>>

export interface DatabaseKoboContext {
  refetch: (p?: FetchParams) => Promise<void>
  serverId: UUID
  schema: KoboSchemaHelper.Bundle
  canEdit?: boolean
  form: KoboForm
  asyncRefresh: UseAsyncSimple<() => Promise<void>>
  asyncEdit: (answerId: KoboAnswerId) => string
  asyncUpdateTag: UseAsyncSimple<(_: {
    answerIds: KoboAnswerId[],
    key: KeyOf<any>,
    value: any
  }) => Promise<void>>
  data: KoboMappedAnswer[]
  loading?: boolean
  setData: Dispatch<SetStateAction<KoboMappedAnswer[]>>
  externalFilesIndex?: KoboExternalFilesIndex
}

const Context = React.createContext({} as DatabaseKoboContext)

export const useDatabaseKoboTableContext = () => useContext<DatabaseKoboContext>(Context)

export const DatabaseKoboTableProvider = (props: {
  schema: KoboSchemaHelper.Bundle
  dataFilter?: (_: KoboMappedAnswer) => boolean
  children: ReactNode
  loading?: boolean
  refetch: (p?: FetchParams) => Promise<void>
  serverId: DatabaseKoboContext['serverId']
  canEdit: DatabaseKoboContext['canEdit']
  form: DatabaseKoboContext['form']
  data: KoboAnswerFlat[]
}) => {
  const {m} = useI18n()
  const {
    form,
    data,
    serverId,
    children,
    refetch,
  } = props
  const {api} = useAppSettings()
  const {toastError} = useIpToast()
  const refreshRequestedFlag = useRef(false)
  const [indexExternalFiles, setIndexExternalFiles] = useState<KoboExternalFilesIndex>()

  const fetcherExternalFiles = useFetcher<() => Promise<{file: string, csv: string}[]>>(() => {
    return Promise.all(props.schema.schemaUnsanitized.files.map(file =>
      api.proxyRequest('GET', file.content)
        .then((csv: string) => ({file: file.metadata.filename, csv}))
        .catch(() => {
          console.error(`Cannot get Kobo external files ${file.metadata.filename} from ${file.content}`)
          return undefined
        })
    )).then(_ => seq(_).compact())
  })

  useEffect(() => {
    fetcherExternalFiles.fetch().then(async res => {
      const jsons: ExternalFilesChoices[][] = await Promise.all(res.map(_ => csvToJson.default({delimiter: ';'}).fromString(_.csv)))
      const indexed = jsons.map(_ => seq(_).groupByFirst(_ => _.name))
      const indexes = seq(res).map((_, i) => ({file: _.file, index: indexed[i]}))
      setIndexExternalFiles(Obj.mapValues(seq(indexes).groupByFirst(_ => _.file), _ => _.index))
    })
  }, [props.schema.schemaUnsanitized])

  const mapData = (data: KoboAnswerFlat[]) => {
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
    await refetch({force: true, clean: false})
  })

  const asyncEdit = (answerId: KoboAnswerId) => api.koboApi.getEditUrl({serverId, formId: form.id, answerId})

  const [mappedData, setMappedData] = useState<KoboMappedAnswer[]>(mapData(data))

  useEffect(() => {
    if (refreshRequestedFlag.current) {
      setMappedData(mapData(data))
      refreshRequestedFlag.current = false
    }
  }, [data])

  const asyncUpdateTag = useAsync(async ({
    answerIds,
    key,
    value
  }: {
    answerIds: KoboAnswerId[],
    key: KeyOf<any>,
    value: any,
  }) => {
    const req = api.kobo.answer.updateTag({
      formId: form.id,
      answerIds: answerIds,
      tags: {[key]: value}
    })
    const index = new Set(answerIds)
    setMappedData(prev => prev?.map(_ => {
      if (index.has(_.id)) _.tags = {...(_.tags ?? {}), [key]: value}
      return _
    }))
    return req.catch(e => {
      toastError(m._koboDatabase.tagNotUpdated)
      refetch({force: true, clean: false})
    })
  })

  return (
    <Context.Provider value={{
      ...props,
      externalFilesIndex: indexExternalFiles,
      asyncRefresh,
      asyncEdit,
      asyncUpdateTag,
      data: mappedData,
      setData: setMappedData,
    }}>
      {children}
    </Context.Provider>
  )
}
