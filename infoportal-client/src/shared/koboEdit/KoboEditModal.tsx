import {BasicDialog} from '@/shared/BasicDialog'
import React, {ReactNode, useMemo, useState} from 'react'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Alert, Box, Collapse} from '@mui/material'
import {useI18n} from '@/core/i18n'
import {KoboAnswerId, KoboId} from '@infoportal-common'
import {IpInput} from '@/shared/Input/Input'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {KoboUpdateAnswers} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {IpBtn} from '@/shared/Btn'
import {useKoboColumnDef} from '@/shared/koboEdit/KoboSchemaWrapper'
import {useKoboEditAnswerContext} from '@/core/context/KoboEditAnswersContext'
import {UseFetcher, useFetcher} from '@/shared/hook/useFetcher'
import {useKoboEditTagContext} from '@/core/context/KoboEditTagsContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Txt} from 'mui-extension'

export type KoboEditModalOption = {
  value: string,
  label: string,
  desc?: string
  before?: ReactNode
}

export type KoboEditModalType = 'select_one'
  | 'select_multiple'
  | 'text'
  | 'integer'
  | 'decimal'
  | 'datetime'
  | 'date'

export const KoboEditModalAnswer = ({
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
  const {m} = useI18n()
  const ctxEdit = useKoboEditAnswerContext()
  const {columnDef, schema, loading: loadingSchema} = useKoboColumnDef({formId, columnName})

  const fetcherUpdate = useFetcher((value: any) => {
    const p = {formId, answerIds, question: columnName, answer: value}
    return ctxEdit.asyncUpdateById.call(p).then(() => {
      onUpdated?.(p)
      return answerIds.length
    })
  })

  return (
    <KoboEditModal
      onClose={onClose}
      loading={loadingSchema}
      fetcherUpdate={fetcherUpdate}
      title={`${m.edit} (${answerIds.length})`}
      subTitle={schema?.schemaUnsanitized.name}
      type={columnDef?.type as any}
      options={columnDef ? schema?.schemaHelper.choicesIndex[columnDef.select_from_list_name!]?.map(_ =>
        ({value: _.name, desc: _.name, label: schema.translate.choice(columnName, _.name)})
      ) : undefined}
    />
  )
}

export const KoboEditModalTag = ({
  formId,
  tag,
  answerIds,
  type,
  options,
  onClose,
  onUpdated,
}: {
  formId: KoboId,
  tag: string
  type: KoboEditModalType
  answerIds: KoboAnswerId[]
  options?: string[] | KoboEditModalOption[]
  onClose?: () => void,
  onUpdated?: (_: any) => void,
}) => {
  const {m} = useI18n()
  const ctxEdit = useKoboEditTagContext()
  const ctxSchema = useKoboSchemaContext()

  const fetcherUpdate = useFetcher((value: any) => {
    return ctxEdit.asyncUpdateById.call({formId, answerIds, tag, value}).then(() => {
      onUpdated?.(value)
      return answerIds.length
    })
  })

  return (
    <KoboEditModal
      onClose={onClose}
      fetcherUpdate={fetcherUpdate}
      title={`${m.edit} (${answerIds.length})`}
      subTitle={ctxSchema.byId2(formId).get?.schemaUnsanitized.name}
      type={type}
      options={options}
    />
  )
}

export const KoboEditModal = ({
  title,
  loading,
  onClose,
  type,
  options,
  fetcherUpdate,
  subTitle,
}: {
  type?: KoboEditModalType
  subTitle?: string
  title?: string
  fetcherUpdate: UseFetcher<(_: any) => Promise<number>>
  onClose?: () => void,
  options?: string[] | KoboEditModalOption[]
  loading?: boolean
}) => {
  const [value, setValue] = useState<any>()
  const {m} = useI18n()
  const _options = useMemo(() => {
    const harmonized: KoboEditModalOption[] | undefined = options?.map(x => typeof x === 'string' ? {value: x, label: x,} : x) as any
    return harmonized?.map(_ =>
      <ScRadioGroupItem
        dense
        key={_.value}
        value={_.value}
        before={_.before}
        description={_.desc}
        title={_.label}
      />
    )
  }, [options])

  const _loading = loading || fetcherUpdate.loading
  return (
    <BasicDialog
      open={true}
      onClose={onClose}
      loading={_loading}
      cancelLabel={m.close}
      confirmDisabled={_loading || !!fetcherUpdate.get}
      onConfirm={() => fetcherUpdate.fetch({force: true, clean: true}, value)}
      title={title}
    >
      <Txt truncate color="hint" block sx={{mb: 1, maxWidth: 400}}>{subTitle}</Txt>
      {fetcherUpdate.error && (
        <Alert color="error">
          {m.somethingWentWrong}
        </Alert>
      )}
      {fetcherUpdate.get && (
        <Alert color="success" action={
          <>
            <IpBtn onClick={() => fetcherUpdate.clearCache()}>{m.change}</IpBtn>
          </>
        }>{m.successfullyEdited(fetcherUpdate.get)}</Alert>
      )}
      <Collapse in={!fetcherUpdate.get}>
        <Box sx={{minWidth: 340}}>
          {(() => {
            switch (type) {
              case 'select_one': {
                return (
                  <ScRadioGroup dense value={value} onChange={setValue}>
                    {_options}
                  </ScRadioGroup>
                )
              }
              case 'select_multiple': {
                return (
                  <ScRadioGroup dense multiple value={value ?? []} onChange={_ => setValue(_)}>
                    {_options}
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