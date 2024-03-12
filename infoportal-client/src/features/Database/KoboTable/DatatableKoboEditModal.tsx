import {BasicDialog} from '@/shared/BasicDialog'
import {useMemo, useState} from 'react'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Box} from '@mui/material'
import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'
import {KoboAnswerId, KoboId} from '@/core/sdk/server/kobo/Kobo'
import {IpInput} from '@/shared/Input/Input'
import {useAsync} from '@/shared/hook/useAsync'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {Alert} from 'mui-extension'
import {KoboUpdateAnswers} from '@/core/sdk/server/kobo/KoboAnswerSdk'

export const DatatableKoboEditModal = ({
  formId,
  column,
  answerIds,
  onClose
}: {
  formId: KoboId,
  column: string
  answerIds: KoboAnswerId[]
  onClose?: () => void,
}) => {
  const {m} = useI18n()
  const {api} = useAppSettings()
  // const {toastHttpError} = useIpToast()
  const ctx = useDatabaseKoboTableContext()

  const asyncUpdate = useAsync((params: KoboUpdateAnswers<any, any>) => api.kobo.answer.updateAnswers(params)
    .then(() => {
      const answerIdsIndex = new Set(params.answerIds)
      ctx.setData(data => data.map(d => {
        if (answerIdsIndex.has(d.id)) {
          d[params.question] = params.answer
        }
        return d
      }))
    })
  )
  // useEffectFn(asyncUpdate.error, toastHttpError)

  const [value, setValue] = useState<any>()

  const columnDef = useMemo(() => ctx.schema.schemaHelper.questionIndex[column], [column])

  return (
    <BasicDialog
      open={!!column}
      onClose={onClose}
      loading={asyncUpdate.loading}
      onConfirm={() => asyncUpdate.call({formId, answerIds, question: column, answer: value})}
      title={`${m.edit} (${answerIds.length})`}
    >
      {asyncUpdate.error && (
        <Alert type="error">
          {m.somethingWentWrong}
        </Alert>
      )}
      <Box sx={{mb: 1.5, minWidth: 340}}>{ctx.schema.translate.question(column)}</Box>
      {(() => {
        switch (columnDef.type) {
          case 'select_one': {
            return (
              <ScRadioGroup dense value={value} onChange={setValue}>
                {ctx.schema.schemaHelper.choicesIndex[columnDef.select_from_list_name!].map(_ =>
                  <ScRadioGroupItem dense key={_.name} value={_.name} description={_.name} title={ctx.schema.translate.choice(column, _.name)}/>
                )}
              </ScRadioGroup>
            )
          }
          case 'select_multiple': {
            return (
              <ScRadioGroup dense multiple value={value?.split(' ')} onChange={_ => setValue(_.join(' '))}>
                {ctx.schema.schemaHelper.choicesIndex[columnDef.select_from_list_name!].map(_ =>
                  <ScRadioGroupItem dense key={_.name} value={_.name} description={_.name} title={ctx.schema.translate.choice(column, _.name)}/>
                )}
              </ScRadioGroup>
            )
          }
          case 'text': {
            return <IpInput multiline maxRows={9} fullWidth value={value} onChange={e => setValue(e.target.value)}/>
          }
          case 'integer':
          case 'decimal': {
            return <IpInput type="number" fullWidth value={value} onChange={e => setValue(e.target.value)}/>
          }
          case 'datetime':
          case 'date': {
            return <IpDatepicker value={value} onChange={setValue}/>
          }
        }
      })()}
    </BasicDialog>
  )
}