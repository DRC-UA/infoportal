import {useEffect, useMemo, type FC, useState} from 'react'
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
import {IpBtn, Page, TableEditCellBtn} from '@/shared'
import {Datatable} from '@/shared/Datatable/Datatable'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {Panel} from '@/shared/Panel'

import type {DatabaseKoboRepeatGroupProps} from './types'
import {useKoboUpdateContext} from '@/core/context/KoboUpdateContext'

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
  onEditIndexed,
  m,
  t,
  currentLang,
  selectedRow,
}: {
  groupName: string
  formId: Kobo.FormId
  schema: KoboSchemaHelper.Bundle
  onRepeatGroupClick?: ColumnBySchemaGeneratorProps['onRepeatGroupClick']
  onEditIndexed?: (xpathIndexed: string, qName: string) => void
  m: ColumnBySchemaGeneratorProps['m']
  t: ColumnBySchemaGeneratorProps['t']
  currentLang?: AppLang
  selectedRow?: KoboFlattenRepeatedGroup.Data
}) => {
  const groupInfo = schema.helper.group.getByName(groupName)!
  let res: DatatableColumn.Props<KoboFlattenRepeatedGroup.Data>[] = []
  const schemaGenerator = columnBySchemaGenerator({
    onRepeatGroupClick,
    repeatGroupName: groupInfo.name,
    formId,
    schema,
    onEdit: undefined,
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

  if (selectedRow && onEditIndexed) {
    const getXPathByName = (qName: string) => schema.helper.questionIndex[qName]?.$xpath
    const blocked = new Set(['id', 'submissionTime', '_index', '_parent_index', '_parent_table_name'])
    res = res.map((col) => {
      const qName = String(col.id)
      if (blocked.has(qName)) return col
      return {
        ...col,
        subHeader: (
          <TableEditCellBtn
            onClick={() => {
              const qName = String(col.id)
              const baseXPath = getXPathByName(qName)!
              if (!baseXPath) return col
              const xpathIndexed = KoboFlattenRepeatedGroup.buildIndexedXPath({
                questionXPath: baseXPath,
                row: selectedRow!,
              })
              onEditIndexed(xpathIndexed, qName)
            }}
          />
        ),
      }
    })
  }
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
  const [selected, setSelected] = useState<string[]>([])
  const {openById, asyncUpdateManyRepeatById} = useKoboUpdateContext()

  useEffect(() => {
    fetcherAnswers.fetch({force: false, clean: false})
  }, [formId])

  const flat = useMemo(() => {
    return KoboFlattenRepeatedGroup.run({data: fetcherAnswers.get?.data ?? [], path: paths})
  }, [fetcherAnswers.get?.data, groupInfo])

  const selectedRow = useMemo(() => {
    if (!flat?.length || selected.length === 0) return undefined
    const keyOf = (r: any) => `${r.id}-${r._index ?? 0}`
    return flat.find((r) => keyOf(r) === selected[0])
  }, [flat, selected])

  const filters = useMemo(
    () => ({
      id: qs.id,
      ...(qs.index ? {_parent_index: {value: qs.index}} : {}),
    }),
    [qs.id, qs.index],
  )

  const columns = useMemo(() => {
    const enableEdit = selected.length > 0
    return getColumnsForRepeatGroup({
      groupName: groupInfo.name,
      formId,
      schema,
      t,
      m,
      selectedRow,
      onEditIndexed: enableEdit
        ? (xpathIndexed: string, qName: string) => {
            const keyOf = (r: any) => `${r.id}-${r._index ?? 0}`
            const selectedRowsAll = (flat ?? []).filter((r) => selected.includes(keyOf(r)))

            const base = selectedRow!
            const baseAnswerId = String(base.id)
            const getXPathByName = (name: string) => schema.helper.questionIndex[name]?.$xpath!

            openById({
              target: 'answer',
              params: {
                formId,
                answerIds: [baseAnswerId],
                question: qName,
                questionIndexed: xpathIndexed,
                indexChain: base._index_chain,
                pathChain: base._path_chain,

                onSubmitOverride: async (answer: any) => {
                  const basePayload = {
                    formId,
                    answerIds: [baseAnswerId],
                    question: qName,
                    questionIndexed: xpathIndexed,
                    indexChain: base._index_chain,
                    pathChain: base._path_chain,
                    answer,
                  }

                  const others = selectedRowsAll.filter(
                    (r) => !(r.id === base.id && (r._index ?? 0) === (base._index ?? 0)),
                  )
                  const baseXPath = getXPathByName(qName)

                  const othersPayloads = others.map((r) => ({
                    formId,
                    answerIds: [String(r.id)],
                    question: qName,
                    questionIndexed: KoboFlattenRepeatedGroup.buildIndexedXPath({
                      questionXPath: baseXPath,
                      row: r as any,
                    }),
                    indexChain: r._index_chain,
                    pathChain: r._path_chain,
                    answer,
                  }))

                  await asyncUpdateManyRepeatById.call([basePayload, ...othersPayloads])

                  return 1 + othersPayloads.length
                },
              },
            })
          }
        : undefined,
      onRepeatGroupClick: ({name, row}) =>
        navigate(databaseIndex.siteMap.group.absolute(formId, name, row.id, row._index)),
    })
  }, [formId, schema, groupInfo.name, t, m, selected, selectedRow, navigate])

  return (
    <Datatable
      defaultFilters={filters}
      id={`db${formId}-g${group}`}
      columns={columns}
      data={flat}
      select={{
        getId: (row) => `${row.id}-${row._index ?? 0}`,
        onSelect: setSelected,
      }}
      getRenderRowKey={(row) => `${row.id}#${row._index ?? 0}`}
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
    />
  )
}
