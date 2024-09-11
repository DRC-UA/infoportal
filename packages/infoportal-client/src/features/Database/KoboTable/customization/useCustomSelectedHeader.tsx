import {ReactNode} from 'react'
import {KoboAnswerId} from 'infoportal-common'
import {IpBtn, Modal, Txt} from '@/shared'
import {useI18n} from '@/core/i18n'
import {KoboId} from 'infoportal-common/kobo'
import {useKoboEditAnswerContext} from '@/core/context/KoboEditAnswersContext'
import {UserSession} from '@/core/sdk/server/session/Session'

export const useCustomSelectedHeader = ({
  formId,
  session,
  selectedIds
}: {
  session: UserSession
  formId: KoboId,
  selectedIds: KoboAnswerId[]
}): ReactNode => {
  const {m} = useI18n()
  const ctx = useKoboEditAnswerContext()

  return (
    <>
      {session.admin && (
        <Modal
          loading={ctx.asyncDeleteById.anyLoading}
          onConfirm={(event, close) => ctx.asyncDeleteById.call({
            formId,
            answerIds: selectedIds,
          }).then(close)}
          title={m.confirmRemove}
          content={
            <Txt color="hint">{m.confirmRemoveDesc}</Txt>
          }>
          <IpBtn variant="contained" icon="delete">{m.deleteSelected}</IpBtn>
        </Modal>
      )}
    </>
  )
}