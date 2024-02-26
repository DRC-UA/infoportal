import {KoboAnswerId, KoboId} from '@/core/sdk/server/kobo/Kobo'
import {Dispatch, SetStateAction} from 'react'
import {useAsync} from '@/shared/hook/useAsync'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useIpToast} from '@/core/useToast'
import {useDatabaseKoboAnswerView} from '@/features/Database/KoboEntry/DatabaseKoboAnswerView'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {useI18n} from '@/core/i18n'

import {ShelterEntity} from '@/core/sdk/server/shelter/ShelterEntity'

export type UseShelterActions<T extends Record<string, any>> = ReturnType<typeof useShelterActions<T>>

export const useShelterActions = <T extends Record<string, any>, >({
  form,
  formId,
  schema,
  setEntity,
}: {
  form: 'nta' | 'ta'
  schema: KoboSchemaHelper.Bundle
  formId: KoboId,
  setEntity: Dispatch<SetStateAction<ShelterEntity[] | undefined>>
}) => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const {toastError, toastLoading} = useIpToast()

  const updateTag = ({answerIds, key, value}: {
    answerIds: KoboAnswerId[]
    key: any
    value: any
  }) => setEntity(prev => {
    if (!prev) return prev
    const set = new Set(answerIds)
    return prev.map(_ => {
      if (set.has(_[form]?.id ?? '!') && _[form]) {
        _[form]!.tags = {
          ...(_[form]?.tags ?? {}),
          [key]: value,
        }
      }
      return _
    })
  })

  const asyncUpdates = useAsync(async <K extends keyof T>(props: {
    answerIds: KoboAnswerId[],
    key: K,
    value: T[K] | null
  }) => {
    const loading = toastLoading(m._shelter.updatingTag(props.answerIds.length, props.key as string, props.value as string))
    await api.kobo.answer.updateTag({
      formId,
      submissionIds: props.answerIds,
      tags: {[props.key]: props.value},
    }).then(() => {
      loading.setOpen(false)
      updateTag(props)
    }).catch(() => {
      loading.setOpen(false)
      toastError(m._shelter.cannotUpdateTag(props.answerIds.length, props.key as string, props.value as string))
    })
  })

  const asyncUpdate = useAsync(<K extends keyof T>({answerId, key, value}: {
    answerId: KoboAnswerId,
    key: K,
    value: T[K] | null
  }) => {
    const loading = toastLoading(m._shelter.updatingTag(1, key as string, value as string))
    return api.kobo.answer.updateTag({
      formId,
      submissionIds: [answerId],
      tags: {[key]: value},
    }).then(() => {
      loading.setOpen(false)
      updateTag({answerIds: [answerId], key, value,})
    }).catch(() => {
      loading.setOpen(false)
      toastError(m._shelter.cannotUpdateTag(1, key as string, value as string))
    })
  }, {
    requestKey: ([_]) => _.answerId
  })

  const asyncEdit = (answerId: KoboAnswerId) => api.koboApi.getEditUrl({formId, answerId})

  const [openModalAnswer] = useDatabaseKoboAnswerView<ShelterEntity['ta']>(schema.schemaUnsanitized)

  // useEffectFn(asyncUpdates.lastError, toastHttpError)
  // useEffectFn(asyncUpdate.lastError, toastHttpError)

  return {
    schema,
    asyncUpdate,
    asyncUpdates,
    asyncEdit,
    openModalAnswer,
  }
}
