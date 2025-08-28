import {useEffect, useMemo, type FC} from 'react'
import {map} from '@axanc/ts-utils'
import {useTheme} from '@mui/material'
import {Kobo} from 'kobo-sdk'
import {NavLink, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import * as yup from 'yup'

import {KoboFlattenRepeatedGroup, KoboSchemaHelper} from 'infoportal-common'

import {useI18n, type AppLang} from '@/core/i18n'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {databaseIndex} from '@/features/Database/databaseIndex'
import {
  columnBySchemaGenerator,
  ColumnBySchemaGeneratorProps,
} from '@/features/Database/KoboTable/columns/columnBySchema'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {IpBtn, Page} from '@/shared'
import {Datatable} from '@/shared/Datatable/Datatable'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {Panel} from '@/shared/Panel'

import type {DatabaseKoboRepeatGroupProps} from './types'

const databaseUrlParamsValidation = yup.object({
  formId: yup.string().required(),
  group: yup.string().required(),
})

export const DatabaseKoboRepeatRoute: FC<DatabaseKoboRepeatGroupProps> = ({formId: formIdFromProps, backLink}) => {
  const ctxSchema = useKoboSchemaContext()
  const {formId: formIdFromRoute, group} = databaseUrlParamsValidation.validateSync({
    formId: false,
    ...useParams(),
  })
  const formId = formIdFromProps || formIdFromRoute
  const schemaLoader = ctxSchema.byId[formId]

  return (
    <Page
      width="full"
      sx={{p: 0, pb: 0, mb: 0}}
      animation="translateLeft"
      animationDeps={[formId]}
      loading={schemaLoader?.loading}
    >
      {map(schemaLoader?.get, (schema) => (
        <Panel sx={{mb: 0}}>
          <DatabaseKoboRepeat schema={schema} group={group} formId={formId} backLink={backLink} />
        </Panel>
      ))}
    </Page>
  )
}

export const getColumnsForRepeatGroup = ({
  groupName,
  formId,
  schema,
  onRepeatGroupClick,
  m,
  t,
  currentLang,
}: {
  groupName: string
  formId: Kobo.FormId
  schema: KoboSchemaHelper.Bundle
  onRepeatGroupClick?: ColumnBySchemaGeneratorProps['onRepeatGroupClick']
  m: ColumnBySchemaGeneratorProps['m']
  t: ColumnBySchemaGeneratorProps['t']
  currentLang?: AppLang
}) => {
  const groupInfo = schema.helper.group.getByName(groupName)!
  const res: DatatableColumn.Props<KoboFlattenRepeatedGroup.Data>[] = []
  const schemaGenerator = columnBySchemaGenerator({
    onRepeatGroupClick,
    formId,
    schema,
    t,
    m,
    currentLang,
  })
  if (groupInfo.depth > 1) {
    res.push(
      {
        type: 'select_one',
        id: '_parent_table_name',
        head: '_parent_table_name',
        renderQuick: (_: KoboFlattenRepeatedGroup.Data) => _._parent_table_name,
      },
      {
        type: 'string',
        id: '_parent_index',
        head: '_parent_index',
        renderQuick: (_: KoboFlattenRepeatedGroup.Data) => '' + _._parent_index,
      },
    )
  }
  res.push(
    {
      type: 'string',
      id: '_index',
      head: '_index',
      renderQuick: (_) => '' + _._index,
    },
    schemaGenerator.getId(),
    schemaGenerator.getSubmissionTime(),
    ...schemaGenerator.getByQuestions(groupInfo.questions),
  )
  return res
}

const DatabaseKoboRepeat = ({
  schema,
  group,
  formId,
  backLink,
}: {
  formId: Kobo.FormId
  group: string
  schema: KoboSchemaHelper.Bundle
  backLink?: string
}) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const qs = {
    id: searchParams.get('id') ?? undefined,
    index: searchParams.get('index') ?? undefined,
  }
  const fetcherAnswers = useKoboAnswersContext().byId(formId)
  const data = fetcherAnswers.get?.data
  const t = useTheme()
  const {m} = useI18n()
  const groupInfo = schema.helper.group.getByName(group)!
  const paths = groupInfo.pathArr

  useEffect(() => {
    fetcherAnswers.fetch({force: false, clean: false})
  }, [formId])

  const {columns, filters} = useMemo(() => {
    const res = getColumnsForRepeatGroup({
      formId,
      schema,
      t,
      m,
      onRepeatGroupClick: (_) => navigate(databaseIndex.siteMap.group.absolute(formId, _.name, _.row.id, _.row._index)),
      groupName: groupInfo.name,
    })
    return {
      columns: res,
      filters: {
        id: qs.id,
        ...(qs.index ? {_parent_index: {value: qs.index}} : {}),
      },
    }
  }, [formId, group, schema, data])

  const flat = useMemo(() => {
    return KoboFlattenRepeatedGroup.run({data: fetcherAnswers.get?.data ?? [], path: paths})
  }, [fetcherAnswers.get?.data, groupInfo])

  return (
    <Datatable
      defaultFilters={filters}
      header={
        <NavLink
          to={
            backLink ??
            (groupInfo.depth > 1
              ? databaseIndex.siteMap.group.absolute(formId, paths[paths.length - 2], qs.id)
              : databaseIndex.siteMap.database.absolute(formId))
          }
        >
          <IpBtn variant="contained" icon="arrow_back">
            {m.back}
          </IpBtn>
        </NavLink>
      }
      id={`db${formId}-g${group}`}
      columns={columns}
      data={flat}
    />
  )
}
