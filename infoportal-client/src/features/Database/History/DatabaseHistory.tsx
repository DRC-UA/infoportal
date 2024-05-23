import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import {databaseUrlParamsValidation} from '@/features/Database/Database'
import {useParams} from 'react-router'
import {useFetcher} from '@/shared/hook/useFetcher'
import React, {useEffect} from 'react'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useI18n} from '@/core/i18n'
import {Panel} from '@/shared/Panel'
import {Avatar, Icon} from '@mui/material'
import {keyTypeIcon} from '@/features/Database/KoboTable/getColumnBySchema'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'

export const DatabaseHistory = () => {
  const {serverId, formId} = databaseUrlParamsValidation.validateSync(useParams())
  const {m, formatDateTime, formatDate} = useI18n()
  const {api} = useAppSettings()
  const fetcher = useFetcher(() => api.kobo.answerHistory.search({formId}))
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byId2(formId).get

  useEffect(() => {
    ctxSchema.fetchById(formId)
    fetcher.fetch()
  }, [])


  return (
    <Page width="lg">
      <Panel>
        <Datatable
          loading={fetcher.loading}
          data={fetcher.get?.data}
          id={`kobo-answer-history${formId}`}
          columns={[
            // {
            //   type: 'string',
            //   id: 'ID',
            //   head: m.id,
            //   renderQuick: _ => _.id,
            // },
            {
              type: 'date',
              id: 'date',
              width: 0,
              head: m.date,
              render: _ => {
                return {
                  value: _.date,
                  label: formatDate(_.date),
                  tooltip: formatDateTime(_.date),
                }
              }
            },
            {
              type: 'select_one',
              id: 'property',
              typeIcon: keyTypeIcon,
              className: 'td-id',
              width: 0,
              head: m.id,
              render: _ => {
                return {
                  value: _.answerId,
                  label: _.answerId,
                }
              }
            },
            {
              type: 'select_one',
              id: 'author',
              head: m.by,
              render: _ => {
                return {
                  value: _.by,
                  label: <span style={{display: 'inline-flex', alignItems: 'center'}}>
                    <Avatar sx={{minWidth: 22, width: 22, height: 22, mr: 1}}><Icon fontSize="small">person</Icon></Avatar>
                    {_.by}
                  </span>,
                }
              }
            },
            {
              type: 'select_one',
              id: 'type',
              head: m.type,
              render: _ => {
                return {
                  value: _.type,
                  label: fnSwitch(_.type, {
                    answer: m._koboDatabase.koboQuestion,
                    tag: m._koboDatabase.customColumn,
                  })
                }
              }
            },
            {
              type: 'select_one',
              id: 'property',
              head: m.column,
              render: _ => {
                return {
                  value: _.property,
                  label: _.property,
                }
              }
            },
            {
              type: 'string',
              id: 'property',
              head: m._koboDatabase.newValue,
              render: _ => {
                return {
                  value: _.newValue,
                  label: _.newValue,
                }
              }
            },
            // ...schema ? getColumnByQuestionSchema({
            //   data: fetcher.get ?? [],
            //   m,
            //   q: schema.schemaHelper.questionIndex[_.property],
            //   groupSchemas: schema.schemaHelper.groupSchemas,
            //   translateChoice: schema.translate.choice,
            //   translateQuestion: schema.translate.question,
            //   choicesIndex: schema.schemaHelper.choicesIndex,
            //   formId,
            // }) : []
            {
              type: 'string',
              id: 'translate',
              head: m._koboDatabase.translation,
              render: row => {
                const value: any = row.newValue
                const defaultValue = {
                  value: value,
                  label: value,
                }
                if (!schema) return defaultValue
                const questionSchema = schema.schemaHelper.questionIndex[row.property]
                if (!questionSchema) return defaultValue
                switch (questionSchema.type) {
                  case 'select_multiple': {
                    console.log(value, row.property, schema.schemaHelper.choicesIndex)
                    const label = value?.split(' ').map((_: string) => schema.translate.choice(row.property, _)).join(' | ')
                    return {
                      label,
                      export: label,
                      tooltip: label,
                      value: value,
                    }
                  }
                  case 'select_one': {
                    const render = schema.translate.choice(row.property, value)
                    return {
                      export: render,
                      value: value,
                      tooltip: render ?? m._koboDatabase.valueNoLongerInOption,
                      label: render ?? (
                        <span title={value}>
                          <TableIcon color="disabled" tooltip={m._koboDatabase.valueNoLongerInOption} sx={{mr: 1}} children="error"/>
                          {value}
                        </span>
                      ),
                    }
                  }
                  default: {
                    return defaultValue
                  }
                }
              }
            }
          ]}
        />
      </Panel>
    </Page>
  )
}
