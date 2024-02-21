import {KoboAnswerId, KoboId} from '@/core/sdk/server/kobo/Kobo'
import React, {Dispatch, ReactNode, SetStateAction} from 'react'
import {AaSelect, AaSelectProps} from '@/shared/Select/Select'
import {useAsync} from '@/shared/hook/useAsync'
import {cfmMakeUpdateRequestKey} from '@/features/Cfm/CfmContext'
import {Enum} from '@alexandreannic/ts-utils'
import {useAppSettings} from '@/core/context/ConfigContext'

import {KeyOf} from '@infoportal-common'

export const KoboSelectTag = <
  TTag extends Record<string, any>,
  T extends {id: KoboAnswerId, tags?: TTag},
  K extends string = string,
>({
  label,
  entry,
  tag,
  formId,
  answerId,
  enumerator,
  translate,
  setData,
  showUndefinedOption,
  ...props
}: {
  entry: T,
  showUndefinedOption?: boolean
  label?: string
  tag: KeyOf<TTag>
  formId: KoboId
  answerId: KoboAnswerId
  enumerator: Record<K, string>
  translate?: Record<K, ReactNode>
  setData?: Dispatch<SetStateAction<T[] | undefined>>
} & Pick<AaSelectProps<any>, 'sx'>) => {
  const {api} = useAppSettings()
  const enumKeys = Enum.keys(enumerator)
  const updateTag = useAsync((_: {formId: KoboId, answerId: KoboAnswerId, key: KeyOf<TTag>, value: any}) => api.kobo.answer.updateTag({
    formId: _.formId,
    answerIds: [_.answerId],
    tags: {[_.key]: _.value}
  }), {
    requestKey: ([_]) => cfmMakeUpdateRequestKey(_.formId, _.answerId, _.key as any)
  })

  return (
    <AaSelect
      showUndefinedOption={showUndefinedOption}
      label={label}
      defaultValue={entry.tags?.[tag] ?? ''}
      onChange={(tagChange) => {
        updateTag.call({
          formId: formId,
          answerId,
          key: tag,
          value: tagChange,
        }).then(newTag => setData?.(data => data?.map(d => {
          if (d?.id === entry.id) {
            entry.tags = newTag
          }
          return d
        })))
      }}
      options={enumKeys.map(_ => ({
        value: _, children: translate ? translate[_] : _,
      }) as any)}
      {...props}
    />
  )
}