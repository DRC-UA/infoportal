import {ReactNode} from 'react'
import {IpBtn, Modal, Txt} from '@/shared'
import {useI18n} from '@/core/i18n'
import {useKoboEditAnswerContext} from '@/core/context/KoboEditAnswersContext'
import {Kobo} from 'kobo-sdk'
import {AccessSum} from '@/core/sdk/server/access/Access'

export const useCustomSelectedHeader = ({
  formId,
  access,
  selectedIds
}: {
  access: AccessSum
  formId: Kobo.FormId,
  selectedIds: Kobo.SubmissionId[]
}): ReactNode => {
  const {m} = useI18n()
  const ctx = useKoboEditAnswerContext()

  return (
    <>
      {access.write && (
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