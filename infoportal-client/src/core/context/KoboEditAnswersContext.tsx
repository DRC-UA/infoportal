import React, {Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'
import {KoboEditModal} from '@/shared/koboEdit/KoboEditModal'
import {KoboUpdateAnswers} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useAsync, UseAsyncMultiple} from '@/shared/hook/useAsync'

type EditDataParams<T extends Record<string, any> = any> = Omit<KoboUpdateAnswers<T>, 'answer'> & {
  onSuccess?: (params: KoboUpdateAnswers<T>) => void
}

export interface KoboEditAnswersContext {
  asyncUpdate: UseAsyncMultiple<(_: KoboUpdateAnswers) => Promise<void>>
  open: Dispatch<SetStateAction<EditDataParams | undefined>>
  close: () => void
}

const Context = React.createContext({} as KoboEditAnswersContext)

export const useKoboEditContext = () => useContext<KoboEditAnswersContext>(Context)

export const KoboEditAnswersProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const {api} = useAppSettings()
  const [editPopup, setEditPopup] = useState<EditDataParams | undefined>()
  const ctxAnswers = useKoboAnswersContext()

  const updateCacheById = ({
    formId,
    question,
    answerIds,
    answer,
  }: KoboUpdateAnswers) => {
    const idsIndex = new Set(...answerIds)
    const currentAnswers = ctxAnswers.fetcherById.getAsMap.get(formId)
    if (!currentAnswers) return
    ctxAnswers.fetcherById.getAsMap.set(formId, {
      ...currentAnswers, data: currentAnswers.data.map(a => {
        if (idsIndex.has(a.id)) {
          a[question] = answer
        }
        return a
      })
    })
  }

  const asyncUpdate = useAsync(async (p: KoboUpdateAnswers) => {
    await api.kobo.answer.updateAnswers({
      answerIds: p.answerIds,
      answer: p.answer,
      formId: p.formId,
      question: p.question,
    }).then(() => {
      updateCacheById(p)
    }).catch((e) => {
      ctxAnswers.fetcherById.fetch({force: true, clean: false}, p.formId)
      return Promise.reject(e)
    })
  }, {requestKey: ([_]) => _.formId})

  return (
    <Context.Provider value={{
      asyncUpdate,
      open: setEditPopup,
      close: () => setEditPopup(undefined)
    }}>
      {children}
      {editPopup && (
        <KoboEditModal
          formId={editPopup.formId}
          columnName={editPopup.question}
          answerIds={editPopup.answerIds}
          onClose={() => setEditPopup(undefined)}
          onUpdated={editPopup.onSuccess}
        />
      )}
    </Context.Provider>
  )
}
