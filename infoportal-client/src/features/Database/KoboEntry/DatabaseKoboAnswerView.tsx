import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Icon, Skeleton, Switch} from '@mui/material'
import {IpBtn} from '@/shared/Btn'
import {useI18n} from '@/core/i18n'
import {KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {KoboQuestionSchema} from '@/core/sdk/server/kobo/KoboApi'
import React, {useEffect, useMemo, useState} from 'react'
import {KoboAttachedImg} from '@/shared/TableImg/KoboAttachedImg'
import {Txt} from 'mui-extension'
import {getColumnBySchema} from '@/features/Database/KoboTable/getColumnBySchema'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Datatable} from '@/shared/Datatable/Datatable'
import {KoboId} from '@infoportal-common'
import {Page, PageTitle} from '@/shared/Page'
import {useParams} from 'react-router'
import * as yup from 'yup'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'

export const databaseUrlParamsValidation = yup.object({
  serverId: yup.string().required(),
  formId: yup.string().required(),
  answerId: yup.string().required(),
})

export const DatabaseKoboAnswerViewPage = () => {
  const {m} = useI18n()
  const {serverId, formId, answerId} = databaseUrlParamsValidation.validateSync(useParams())
  const [showQuestionWithoutAnswer, setShowQuestionWithoutAnswer] = useState(false)
  const ctxSchema = useKoboSchemaContext()
  useEffect(() => {
    ctxSchema.fetchById(formId)
  }, [formId])
  return (
    <Page>
      <PageTitle>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {answerId}
          <Box sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
            <Txt sx={{fontSize: '1rem'}} color="hint">{m._koboDatabase.showAllQuestions}</Txt>
            <Switch value={showQuestionWithoutAnswer} onChange={e => setShowQuestionWithoutAnswer(e.target.checked)}/>
          </Box>
        </Box>
      </PageTitle>
      {/*<KoboAnswerFormView*/}
      {/*  showQuestionWithoutAnswer={showQuestionWithoutAnswer}*/}
      {/*  answer={answer}*/}
      {/*/>*/}
    </Page>
  )
}

export const DatabaseKoboAnswerViewDialog = ({
  onClose,
  formId,
  answer,
}: {
  formId: KoboId
  answer: KoboMappedAnswer<any>
  onClose: () => void
  open: boolean
}) => {
  const {m} = useI18n()
  const [showQuestionWithoutAnswer, setShowQuestionWithoutAnswer] = useState(false)
  return (
    <Dialog open={true}>
      <DialogTitle>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          {answer.id}
          <Box sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
            <Txt sx={{fontSize: '1rem'}} color="hint">{m._koboDatabase.showAllQuestions}</Txt>
            <Switch value={showQuestionWithoutAnswer} onChange={e => setShowQuestionWithoutAnswer(e.target.checked)}/>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <KoboAnswerFormView
          formId={formId}
          showQuestionWithoutAnswer={showQuestionWithoutAnswer}
          answer={answer}
        />
      </DialogContent>
      <DialogActions>
        <IpBtn onClick={onClose}>{m.close}</IpBtn>
      </DialogActions>
    </Dialog>
  )
}

const KoboAnswerFormView = ({
  answer,
  formId,
  showQuestionWithoutAnswer,
}: {
  showQuestionWithoutAnswer?: boolean
  answer: KoboMappedAnswer<any>
  formId: KoboId
}) => {
  const ctx = useKoboSchemaContext()
  useEffect(() => {
    ctx.fetchById(formId)
  }, [formId])
  return (
    <Box>
      {ctx.byId[formId]?.loading && <Skeleton/>}
      {ctx.byId[formId]?.get?.schemaHelper.sanitizedSchema.content.survey
        .filter(q => showQuestionWithoutAnswer || q.type === 'begin_group' || (answer[q.name] !== '' && answer[q.name]))
        .map(q => (
          <Box key={q.name} sx={{mb: 1.5}}>
            <KoboAnswerQuestionView
              schema={ctx.byId[formId]!.get!}
              answer={answer}
              questionSchema={q}
            />
          </Box>
        ))}
    </Box>
  )
}

const KoboAnswerQuestionView = ({
  schema,
  questionSchema,
  answer: row,
}: {
  schema: KoboSchemaHelper.Bundle
  questionSchema: KoboQuestionSchema
  answer: KoboMappedAnswer<any>
}) => {
  const langIndex = useKoboSchemaContext()
  const {formatDateTime} = useI18n()
  const {m} = useI18n()
  const columns = useMemo(() => {
    if (questionSchema.type === 'begin_repeat')
      return getColumnBySchema({
        data: row[questionSchema.name],
        m,
        schema: schema.schemaHelper.groupSchemas[questionSchema.name],
        translateQuestion: schema.translate.question,
        translateChoice: schema.translate.choice,
        choicesIndex: schema.schemaHelper.choicesIndex,
        groupSchemas: schema.schemaHelper.groupSchemas,
      })
  }, [schema.schemaHelper.sanitizedSchema, langIndex])
  switch (questionSchema.type) {
    case 'begin_group': {
      return <Box sx={{pt: 1, mt: 2, borderTop: t => `1px solid ${t.palette.divider}`}}>
        <Txt bold block size="title">{schema.translate.question(questionSchema.name)}</Txt>
      </Box>
    }
    case 'image': {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <Box>
          <Txt block size="small" color="hint">{row[questionSchema.name]}</Txt>
          <KoboAttachedImg attachments={row.attachments} size={84} fileName={row[questionSchema.name] as string}/>
        </Box>
      </>
    }
    case 'text': {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <KoboQuestionAnswerView icon="short_text">{row[questionSchema.name]}</KoboQuestionAnswerView>
      </>
    }
    case 'note': {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <KoboQuestionAnswerView icon="information">{row[questionSchema.name]}</KoboQuestionAnswerView>
      </>
    }
    case 'begin_repeat': {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <Datatable columns={columns!} data={row[questionSchema.name]} id={questionSchema.name}/>
      </>
    }
    case 'start':
    case 'end':
    case 'datetime':
    case 'date': {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <KoboQuestionAnswerView icon="event">{formatDateTime(row[questionSchema.name])}</KoboQuestionAnswerView>
      </>
    }
    case 'select_multiple': {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        {(row[questionSchema.name] as string[])?.map(_ =>
          <KoboQuestionAnswerView key={_} icon="check_box">{schema.translate.choice(questionSchema.name, _)}</KoboQuestionAnswerView>
        )}
      </>
    }
    case 'select_one': {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <KoboQuestionAnswerView icon="radio_button_checked">{schema.translate.choice(questionSchema.name, row[questionSchema.name])}</KoboQuestionAnswerView>
      </>
    }
    case 'calculate':
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <KoboQuestionAnswerView icon="functions">{row[questionSchema.name]}</KoboQuestionAnswerView>
      </>
    case 'decimal':
    case 'integer': {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <KoboQuestionAnswerView icon="tag">{row[questionSchema.name]}</KoboQuestionAnswerView>
      </>
    }
    default: {
      return <>
        <KoboQuestionLabelView>{schema.translate.question(questionSchema.name)}</KoboQuestionLabelView>
        <KoboQuestionAnswerView icon="short_text">{JSON.stringify(row[questionSchema.name])}</KoboQuestionAnswerView>
      </>
    }
  }
}

const KoboQuestionLabelView = ({
  children,
}: {
  children: string
}) => {
  return <Txt bold block sx={{mb: .5}} dangerouslySetInnerHTML={{__html: children}}/>
}

const KoboQuestionAnswerView = ({
  icon,
  children,
}: {
  icon: string
  children: string
}) => {
  if (!children) return
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Icon color="disabled" sx={{mr: 1}}>{icon}</Icon>
      <Txt color="hint">{children}</Txt>
    </Box>
  )
}
