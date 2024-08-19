import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from 'react'
import {useAsync, UseAsyncSimple} from '@/shared/hook/useAsync'
import {KoboForm, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {KoboAnswerId, KoboSchemaHelper, UUID} from 'infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'
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
  data?: KoboMappedAnswer[]
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
  data?: KoboMappedAnswer[]
}) => {
  const {
    form,
    data,
    serverId,
    children,
    refetch,
  } = props
  const {api} = useAppSettings()
  const [indexExternalFiles, setIndexExternalFiles] = useState<KoboExternalFilesIndex>()

  const fetcherExternalFiles = useFetcher<() => Promise<{file: string, csv: string}[]>>(() => {
    return Promise.all(props.schema.schemaUnsanitized.files.map(file =>
      api.koboApi.proxy({method: 'GET', url: file.content, serverId})
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

  const mapData = (data: KoboMappedAnswer[]) => {
    const mapped = databaseCustomMapping[form.id] ? data?.map(_ => {
      return databaseCustomMapping[form.id](_)
    }) : data
    // const mapped = data.map(_ => {
    //   const m = Kobo.mapAnswerBySchema(props.schema.schemaHelper.questionIndex, _)
    //   if (databaseCustomMapping[form.id]) {
    //     return databaseCustomMapping[form.id](m)
    //   }
    //   return m
    // })
    return props.dataFilter ? mapped.filter(props.dataFilter) : mapped
  }

  const asyncRefresh = useAsync(async () => {
    await api.koboApi.synchronizeAnswers(serverId, form.id)
    await refetch({force: true, clean: false})
  })

  const asyncEdit = (answerId: KoboAnswerId) => api.koboApi.getEditUrl({serverId, formId: form.id, answerId})

  const [mappedData, setMappedData] = useState<KoboMappedAnswer[] | undefined>(undefined)

  useEffect(() => {
    if (data) setMappedData(mapData(data))
  }, [data])

  return (
    <Context.Provider value={{
      ...props,
      externalFilesIndex: indexExternalFiles,
      asyncRefresh,
      asyncEdit,
      data: mappedData,
      setData: setMappedData as Dispatch<SetStateAction<KoboMappedAnswer[]>>,
    }}>
      {children}
    </Context.Provider>
  )
}
