import {KoboAnswerId, KoboId} from '@infoportal-common'
import {useKoboColumnDef} from '@/shared/koboEdit/KoboSchemaWrapper'
import React, {Dispatch, SetStateAction} from 'react'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {Skeleton} from '@mui/material'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useIpToast} from '@/core/useToast'
import {useI18n} from '@/core/i18n'
import {KeyOf} from '@alexandreannic/ts-utils'

export const KoboEditAnswer = <T extends Record<string, any>>({
  value,
  onChange,
  formId,
  columnName,
  answerId,
  setLocalData,
}: {
  value?: T
  onChange?: (_: T) => void,
  formId: KoboId,
  columnName: KeyOf<T>
  answerId: KoboAnswerId
  setLocalData: Dispatch<SetStateAction<T[]>>
}) => {
  const {m} = useI18n()
  const {toastError, toastLoading} = useIpToast()
  const {api} = useAppSettings()

  const {columnDef, schema, loading} = useKoboColumnDef({formId, columnName})

  if (loading) return <Skeleton/>
  if (!columnDef || !schema) return <></>

  const handleChange = async (newValue: any) => {
    const loading = toastLoading(m.updatingTag(1, columnName, newValue))
    const oldValue = value
    onChange?.(newValue)
    await api.kobo.answer.updateAnswers({
      answerIds: [answerId],
      answer: newValue,
      formId,
      question: columnName,
    }).then(() => {
      loading.setOpen(false)
    }).catch(() => {
      loading.setOpen(false)
      toastError(m.cannotUpdateTag(1, columnName, newValue))
      if (oldValue)
        onChange?.(oldValue)
    })
  }

  switch (columnDef.type) {
    case 'select_one': {
      return (
        <IpSelectSingle
          value={value as any}
          onChange={handleChange}
          options={schema.schemaHelper.choicesIndex[columnDef.select_from_list_name!].map(_ =>
            ({value: _.name, children: schema.translate.choice(columnName, _.name)})
          )}
        />
      )
    }
    default:
      return <></>
    // case 'select_multiple': {
    //   return (
    //     <ScRadioGroup dense multiple value={value?.split(' ')} onChange={_ => setValue(_.join(' '))}>
    //       {schema.schemaHelper.choicesIndex[columnDef.select_from_list_name!].map(_ =>
    //         <ScRadioGroupItem dense key={_.name} value={_.name} description={_.name} title={schema.translate.choice(columnName, _.name)}/>
    //       )}
    //     </ScRadioGroup>
    //   )
    // }
    // case 'text': {
    //   return <IpInput multiline maxRows={9} fullWidth value={value} onChange={e => setValue(e.target.value)}/>
    // }
    // case 'integer':
    // case 'decimal': {
    //   return <IpInput type="number" fullWidth value={value} onChange={e => setValue(e.target.value)}/>
    // }
    // case 'datetime':
    // case 'date': {
    //   return <IpDatepicker value={value} onChange={setValue}/>
    // }
  }
}