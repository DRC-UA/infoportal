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
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {useIpToast} from '@/core/useToast'
import {Datepicker} from '@/shared/Datepicker/Datepicker'
import {Alert} from 'mui-extension'

export const DatatableKoboEditModal = ({
  formId,
  column,
  submissionIds,
  onClose
}: {
  formId: KoboId,
  column: string
  submissionIds: KoboAnswerId[]
  onClose?: () => void,
}) => {
  const {m} = useI18n()
  const {api} = useAppSettings()
  // const {toastHttpError} = useIpToast()
  const ctx = useDatabaseKoboTableContext()

  const asyncUpdate = useAsync((params: any) => api.kobo.answer.updateSubmission(params))
  // useEffectFn(asyncUpdate.error, toastHttpError)

  const [value, setValue] = useState<any>()

  const columnDef = useMemo(() => ctx.schema.schemaHelper.questionIndex[column], [column])

  return (
    <BasicDialog
      open={!!column}
      onClose={onClose}
      loading={asyncUpdate.loading}
      onConfirm={() => asyncUpdate.call({formId, submissionIds, question: column, answer: value})}
      title={`${m.edit} (${submissionIds.length})`}
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
            return <Datepicker value={value} onChange={setValue}/>
          }
        }
      })()}
    </BasicDialog>
  )
}