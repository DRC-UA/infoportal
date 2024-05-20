import {useAppSettings} from '@/core/context/ConfigContext'
import {KoboAnswerId, KoboFormName, KoboId, KoboIndex} from '@infoportal-common'
import {InferTypedAnswer, KoboFormNameMapped} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk2'
import {FetchParams, useFetchers} from '@/shared/hook/useFetchers'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import React, {ReactNode, useContext, useMemo} from 'react'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'
import {useIpToast} from '@/core/useToast'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Kobo, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {useI18n} from '@/core/i18n'

const Context = React.createContext({} as KoboAnswersContext)

export type KoboAnswersContext = {
  byId: {
    set: (id: KoboId, value: ApiPaginate<KoboMappedAnswer>) => void,
    fetch: (p: FetchParams, id: KoboId) => Promise<ApiPaginate<KoboMappedAnswer>>,
    get: (id: KoboAnswerId) => undefined | ApiPaginate<KoboMappedAnswer>,
    loading: (id: KoboAnswerId) => boolean | undefined
  },
  byName: {
    set: <T extends KoboFormNameMapped>(name: T, value: ApiPaginate<InferTypedAnswer<T>>) => void,
    fetch: <T extends KoboFormNameMapped>(p: FetchParams, name: T) => Promise<ApiPaginate<InferTypedAnswer<T>>>
    get: <T extends KoboFormNameMapped>(name: T) => undefined | ApiPaginate<InferTypedAnswer<T>>
    loading: (name: KoboFormNameMapped) => boolean | undefined
  }
}

export const KoboAnswersProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const ctxSchema = useKoboSchemaContext()

  const getMappedRequest = (_?: KoboFormName) => api.kobo.typedAnswers2.searchByAccess[_ as KoboFormNameMapped]

  const fetcher = useFetchers(async (id: KoboAnswerId) => {
    const mappedReq = getMappedRequest(KoboIndex.searchById(id)?.name)
    if (mappedReq as any) {
      return mappedReq({})
    } else {
      const [schema, answers] = await Promise.all([
        ctxSchema.fetchById(id).then(_ => KoboSchemaHelper.buildIndex({schema: _, m})),
        api.kobo.answer.searchByAccess({formId: id}),
      ])
      return {
        ...answers,
        data: answers.data.map(_ => Kobo.mapAnswerBySchema(schema.questionIndex, _))
      }
    }
  }, {requestKey: _ => _[0]})
  const {toastHttpError} = useIpToast()

  const {byName, byId} = useMemo(() => {
    return {
      byName: {
        set: <T extends KoboFormNameMapped>(name: T, value: ApiPaginate<InferTypedAnswer<T>>) => {
          fetcher.getAsMap.set(KoboIndex.byName(name).id, value as any)
        },
        get: <T extends KoboFormNameMapped>(name: T): undefined | ApiPaginate<InferTypedAnswer<T>> => {
          return fetcher.get[KoboIndex.byName(name).id] as any
        },
        fetch: <T extends KoboFormNameMapped>(p: FetchParams = {}, name: T): Promise<ApiPaginate<InferTypedAnswer<T>>> => {
          return fetcher.fetch(p, KoboIndex.byName(name).id) as any
        },
        loading: (name: KoboFormNameMapped) => fetcher.loading[KoboIndex.byName(name).id]
      },
      byId: {
        set: (name: KoboAnswerId, value: ApiPaginate<KoboMappedAnswer>) => {
          fetcher.getAsMap.set(name, value as any)
        },
        get: (id: KoboAnswerId): undefined | ApiPaginate<KoboMappedAnswer> => {
          return fetcher.get[id] as any
        },
        fetch: (p: FetchParams = {}, id: KoboAnswerId): Promise<ApiPaginate<KoboMappedAnswer>> => {
          return fetcher.fetch(p, id) as any
        },
        loading: (id: KoboAnswerId) => fetcher.loading[id],
      }
    }
  }, [fetcher.getAsMap])

  useEffectFn(fetcher.error, toastHttpError)

  return (
    <Context.Provider value={{
      byName,
      byId,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useKoboAnswersContext = () => useContext<KoboAnswersContext>(Context)