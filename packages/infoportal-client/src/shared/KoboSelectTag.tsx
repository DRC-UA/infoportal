import {KeyOf, KoboAnswerId, KoboId} from 'infoportal-common'
import React, {Dispatch, ReactNode, SetStateAction} from 'react'
import {AaSelectProps} from '@/shared/Select/Select'
import {Obj} from '@alexandreannic/ts-utils'
import {useKoboEditTagContext} from '@/core/context/KoboEditTagsContext'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'

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
  disabled,
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
  disabled?: boolean
} & Pick<AaSelectProps<any>, 'sx'>) => {
  const ctxEditTag = useKoboEditTagContext()
  const enumKeys = Obj.keys(enumerator)

  return (
    <IpSelectSingle
      hideNullOption={!showUndefinedOption}
      label={label}
      defaultValue={entry.tags?.[tag] ?? ''}
      onChange={(tagChange: any) => {
        ctxEditTag.asyncUpdateById.call({
          formId: formId,
          answerIds: [answerId],
          tag,
          value: tagChange,
        })
      }}
      options={enumKeys.map(_ => ({
        value: _, children: translate ? translate[_] : _,
      }) as any)}
      disabled={disabled}
      {...props}
    />
  )
}