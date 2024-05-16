import React, {Dispatch, ReactNode, SetStateAction, useContext, useState} from 'react'
import {KoboEditModal} from '@/shared/koboEdit/KoboEditModal'
import {KoboAnswerId, KoboId} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {KoboUpdateAnswers} from '@/core/sdk/server/kobo/KoboAnswerSdk'

type EditData = {
  answerIds: KoboAnswerId[]
  type: 'tags' | 'answers'
  questionName: string
  formId: KoboId,
  onSuccess?: (params: KoboUpdateAnswers) => void
}

export interface KoboEditAnswersContext {
  open: Dispatch<SetStateAction<EditData | undefined>>
  close: () => void
}

const Context = React.createContext({} as KoboEditAnswersContext)

export const useEditKoboContext = () => useContext<KoboEditAnswersContext>(Context)

export const KoboEditAnswersProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [editPopup, setEditPopup] = useState<EditData | undefined>()

  return (
    <Context.Provider value={{
      open: setEditPopup,
      close: () => setEditPopup(undefined)
    }}>
      {children}
      {editPopup && fnSwitch(editPopup.type, {
        answers: (
          <KoboEditModal
            formId={editPopup.formId}
            columnName={editPopup.questionName}
            answerIds={editPopup.answerIds}
            onClose={() => setEditPopup(undefined)}
            onUpdated={editPopup.onSuccess}
          />
        )
      }, () => <></>)}
    </Context.Provider>
  )
}
