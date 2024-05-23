import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import {databaseUrlParamsValidation} from '@/features/Database/Database'
import {useParams} from 'react-router'
import {useFetcher} from '@/shared/hook/useFetcher'
import React, {useEffect} from 'react'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useI18n} from '@/core/i18n'
import {Panel} from '@/shared/Panel'
import {alpha, Avatar, Icon, useTheme} from '@mui/material'
import {keyTypeIcon} from '@/features/Database/KoboTable/getColumnBySchema'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {KoboAnswerHistory} from '@/core/sdk/server/kobo/answerHistory/KoboAnswerHistory'

export const DatabaseHistory = () => {
  const {serverId, formId} = databaseUrlParamsValidation.validateSync(useParams())
  const t = useTheme()
  const {m, formatDateTime, formatDate} = useI18n()
  const {api} = useAppSettings()
  const fetcher = useFetcher(() => api.kobo.answerHistory.search({formId}))
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byId2(formId).get

  useEffect(() => {
    ctxSchema.fetchById(formId)
    fetcher.fetch()
  }, [])

  const getTranslation = (row: KoboAnswerHistory, fn: (_: KoboAnswerHistory) => string) => {
    const value: any = fn(row)
    if (!schema) return value
    const questionSchema = schema.schemaHelper.questionIndex[row.property]
    if (!questionSchema) return value
    switch (questionSchema.type) {
      case 'select_multiple': {
        const label = value?.split(' ').map((_: string) => schema.translate.choice(row.property, _)).join(' | ')
        return label
      }
      case 'select_one': {
        const render = schema.translate.choice(row.property, value)
        return render ?? (
          <span title={value}>
              <TableIcon color="disabled" tooltip={m._koboDatabase.valueNoLongerInOption} sx={{mr: 1}} children="error"/>
            {value}
            </span>
        )
      }
      default: {
        return value
      }
    }
  }

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
              width: 80,
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
              width: 80,
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
                    <Avatar sx={{minWidth: 20, width: 20, height: 20, mr: .5}}><Icon fontSize="small">person</Icon></Avatar>
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
              width: 250,
              render: _ => {
                return {
                  value: _.property,
                  label: schema?.translate.question(_.property),
                }
              }
            },
            {
              type: 'select_one',
              id: 'property',
              head: 'XML',
              width: 90,
              render: _ => {
                return {
                  value: _.property,
                  label: <code style={{background: t.palette.background.default, color: t.palette.text.secondary}}>{_.property}</code>,
                }
              }
            },
            {
              type: 'string',
              id: 'translate',
              head: m._koboDatabase.oldValue,
              render: row => {
                const label = getTranslation(row, _ => _.oldValue)
                return {
                  label: <span style={{background: alpha(t.palette.error.light, .16), color: t.palette.error.main}}>{label}</span>,
                  value: row.oldValue
                }
              }
            },
            {
              type: 'string',
              id: 'translate',
              head: m._koboDatabase.newValue,
              render: row => {
                const label = getTranslation(row, _ => _.newValue)
                return {
                  label: <span style={{background: alpha(t.palette.success.light, .16), color: t.palette.success.main}}>{label}</span>,
                  value: row.newValue
                }
              }
            }
          ]}
        />
      </Panel>
    </Page>
  )
}
