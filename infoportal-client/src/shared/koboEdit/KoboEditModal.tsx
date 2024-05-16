import {BasicDialog} from '@/shared/BasicDialog'
import React, {useState} from 'react'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Alert, Box, Collapse, useTheme} from '@mui/material'
import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'
import {KoboAnswerId, KoboId} from '../../../../infoportal-common/src'
import {IpInput} from '@/shared/Input/Input'
import {useAsync} from '@/shared/hook/useAsync'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {KoboUpdateAnswers} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {useIpToast} from '@/core/useToast'
import {IpBtn} from '@/shared/Btn'
import {useKoboColumnDef} from '@/shared/koboEdit/KoboSchemaWrapper'

export const KoboEditModal = ({
  formId,
  columnName,
  answerIds,
  onClose,
  onUpdated,
}: {
  formId: KoboId,
  columnName: string
  answerIds: KoboAnswerId[]
  onClose?: () => void,
  onUpdated?: (params: KoboUpdateAnswers<any, any>) => void,
}) => {
  const t = useTheme()
  const {m} = useI18n()
  const {api} = useAppSettings()
  const {toastError} = useIpToast()
  const {columnDef, schema, loading: loadingSchema} = useKoboColumnDef({formId, columnName})

  const [updatedSuccessfullyRows, setUpdatedSuccessfullyRows] = useState<number | undefined>()

  const asyncUpdate = useAsync((params: KoboUpdateAnswers<any, any>) => {
    setUpdatedSuccessfullyRows(undefined)
    return api.kobo.answer.updateAnswers(params)
      .then(() => {
        onUpdated?.(params)
        setUpdatedSuccessfullyRows(params.answerIds.length)
      })
  })

  const [value, setValue] = useState<any>()
  const loading = asyncUpdate.loading || loadingSchema

  return (
    <BasicDialog
      open={!!columnName}
      onClose={onClose}
      loading={loading}
      cancelLabel={m.close}
      confirmDisabled={loading}
      onConfirm={() => asyncUpdate.call({formId, answerIds, question: columnName, answer: value})}
      title={`${m.edit} (${answerIds.length})`}
    >
      {asyncUpdate.error && (
        <Alert color="error">
          {m.somethingWentWrong}
        </Alert>
      )}
      {updatedSuccessfullyRows && (
        <Alert color="success" action={
          <>
            <IpBtn onClick={() => setUpdatedSuccessfullyRows(undefined)}>{m.change}</IpBtn>
          </>
        }>{m.successfullyEdited(updatedSuccessfullyRows)}</Alert>
      )}
      <Collapse in={!updatedSuccessfullyRows}>
        <Box>
          <Box sx={{mb: 1.5, minWidth: 340}}>{schema?.translate.question(columnName)}</Box>
          {(() => {
            if (!columnDef || !schema) return
            switch (columnDef.type) {
              case 'select_one': {
                return (
                  <ScRadioGroup dense value={value} onChange={setValue}>
                    {schema.schemaHelper.choicesIndex[columnDef.select_from_list_name!].map(_ =>
                      <ScRadioGroupItem dense key={_.name} value={_.name} description={_.name} title={schema.translate.choice(columnName, _.name)}/>
                    )}
                  </ScRadioGroup>
                )
              }
              case 'select_multiple': {
                return (
                  <ScRadioGroup dense multiple value={value?.split(' ')} onChange={_ => setValue(_.join(' '))}>
                    {schema.schemaHelper.choicesIndex[columnDef.select_from_list_name!].map(_ =>
                      <ScRadioGroupItem dense key={_.name} value={_.name} description={_.name} title={schema.translate.choice(columnName, _.name)}/>
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
        </Box>
      </Collapse>
    </BasicDialog>
  )
}