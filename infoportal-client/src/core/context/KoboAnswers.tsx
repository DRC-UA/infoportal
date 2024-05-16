import {useAppSettings} from '@/core/context/ConfigContext'
import {KoboAnswerFlat, KoboAnswerId} from '@infoportal-common'
import {InferTypedAnswer, KoboMappedName} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk2'
import {UseFetchers, useFetchers} from '@/shared/hook/useFetchers'
import {Paginate, useEffectFn} from '@alexandreannic/react-hooks-lib'
import React, {ReactNode, useContext} from 'react'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'
import {useIpToast} from '@/core/useToast'

const Context = React.createContext({} as KoboAnswersContext)

export type KoboAnswersContext = {
  fetcherByName: UseFetchers<<T extends KoboMappedName>(name: T) => ApiPaginate<InferTypedAnswer<T>>>
  fetcherById: UseFetchers<(id: KoboAnswerId) => Promise<Paginate<KoboAnswerFlat<any, any>>>>
  byName: <T extends KoboMappedName>(name: T) => undefined | Paginate<InferTypedAnswer<T>>
  byId: (id: KoboAnswerId) => undefined | Paginate<KoboAnswerFlat<any, any>>
}

export const KoboAnswersProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const fetcherByName = useFetchers((name: KoboMappedName) => api.kobo.typedAnswers2.searchByAccess[name!]({}), {requestKey: _ => _[0]})
  const fetcherById = useFetchers((id: KoboAnswerId) => api.kobo.answer.searchByAccess({formId: id}), {requestKey: _ => _[0]})
  const {toastHttpError} = useIpToast()

  const byName = <T extends KoboMappedName>(name: T): undefined | Paginate<InferTypedAnswer<T>> => {
    return fetcherByName.get[name] as any
  }
  const byId = (id: KoboAnswerId): undefined | Paginate<KoboAnswerFlat<any, any>> => {
    return fetcherById.get[id] as any
  }
  useEffectFn(fetcherByName.error, toastHttpError)
  useEffectFn(fetcherById.error, toastHttpError)

  return (
    <Context.Provider value={{
      fetcherByName,
      fetcherById,
      byName,
      byId,
    }}>
      {children}
    </Context.Provider>
  )
}

export const useKoboAnswersContext = () => useContext(Context)