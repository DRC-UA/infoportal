import {useEffect, useMemo, useState} from 'react'
import {useParams} from 'react-router'
import {seq} from '@axanc/ts-utils'
import {useTheme, FormControlLabel, Switch} from '@mui/material'
import {Kobo} from 'kobo-sdk'
import * as yup from 'yup'

import {KoboIndex, KoboSchemaHelper, KoboValidation, Shelter_ta} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useKoboUpdateContext} from '@/core/context/KoboUpdateContext'
import {useI18n} from '@/core/i18n'
import {useSession} from '@/core/Session/SessionContext'
import {columnBySchemaGenerator} from '@/features/Database/KoboTable/columns/columnBySchema'
import {getColumnsCustom} from '@/features/Database/KoboTable/columns/columnsCustom'
import {ArchiveAlert} from '@/features/Database/KoboTable/DatabaseKoboTableContent'
import {useDatabaseView} from '@/features/Database/KoboTable/view/useDatabaseView'
import {DatabaseViewInput} from '@/features/Database/KoboTable/view/DatabaseViewInput'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {databaseCustomMapping} from '@/features/Database/KoboTable/customization/customMapping'
import {getColumnsBase} from '@/features/Database/KoboTable/columns/columnsBase'
import {Datatable} from '@/shared/Datatable/Datatable'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {useLayoutContext} from '@/shared/Layout/LayoutContext'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

interface CustomForm {
  id: string
  name: string
  // langs: string[]
  forms: {
    id: string
    // langIndexes?: number[]
    join?: {
      originId: Kobo.FormId
      originColName: string
      colName: string
    }
  }[]
}

export const customForms: CustomForm[] = [
  {
    id: 'vet',
    // langs: ['English (en)', 'Ukrainian (ua)'],
    name: '[ECREC] VET',
    forms: [
      {
        id: 'aGGGapARnC2ek7sA6SuHmu',
        // langIndexes: [1, 0],
      },
      {
        // langIndexes: [1, 0],
        id: 'a4iDDoLpUJHbu6cwsn2fnG',
        join: {originId: 'aGGGapARnC2ek7sA6SuHmu', originColName: 'id', colName: 'id_form_vet'},
      },
    ],
  },
  {
    id: 'gbv_cm',
    // langs: ['English (en)', 'Ukrainian (ua)'],
    name: '[GBV CM] Case Managment',
    forms: [
      {
        id: 'aYDgEB7JDPH7mKgTYo5ZJQ',
        // langIndexes: [1, 0],
      },
      {
        // langIndexes: [1, 0],
        id: 'a8N56ecDP8J7uYfYdFWNBV',
        join: {originId: 'aYDgEB7JDPH7mKgTYo5ZJQ', originColName: 'client_code', colName: 'client_code'},
      },
      {
        // langIndexes: [1, 0],
        id: 'ajrLm9hVbidCKnUXdyr7Ja',
        join: {originId: 'aYDgEB7JDPH7mKgTYo5ZJQ', originColName: 'client_code', colName: 'client_code'},
      },
      {
        // langIndexes: [1, 0],
        id: 'aG2TZEWjtgnPqSfqGizrMg',
        join: {originId: 'aYDgEB7JDPH7mKgTYo5ZJQ', originColName: 'client_code', colName: 'client_code'},
      },
      {
        // langIndexes: [1, 0],
        id: 'aMFYbug56WAQDHJ4fmFuL6',
        join: {originId: 'aYDgEB7JDPH7mKgTYo5ZJQ', originColName: 'client_code', colName: 'client_code'},
      },
      {
        // langIndexes: [1, 0],
        id: 'awg7jysq6FWssttromNhNw',
        join: {originId: 'aYDgEB7JDPH7mKgTYo5ZJQ', originColName: 'client_code', colName: 'client_code'},
      },
    ],
  },
  {
    id: 'msme',
    // langs: ['English (en)', 'Ukrainian (ua)'],
    name: '[ECREC] MSME',
    forms: [
      {
        id: KoboIndex.byName('ecrec_msmeGrantEoi').id,
        // langIndexes: [1, 0],
      },
      {
        id: KoboIndex.byName('ecrec_msmeGrantSelection').id,
        // langIndexes: [0, 1],
        join: {
          originId: KoboIndex.byName('ecrec_msmeGrantEoi').id,
          originColName: 'ben_det_tax_id_num',
          colName: 'tax_id_num',
        },
      },
      // {
      //   id: KoboIndex.byName('ecrec_msmeGrantSelection').id,
      //   // langIndexes: [1, 0],
      // },
      // {
      //   id: KoboIndex.byName('ecrec_msmeGrantEoi').id,
      //   // langIndexes: [0, 1],
      //   join: {originId: KoboIndex.byName('ecrec_msmeGrantSelection').id, originColName: 'ben_det_tax_id_num', colName: 'tax_id_num'}
      // },
    ],
  },
  {
    id: 'shelter_repair',
    // langs: ['English (en)', 'Ukrainian (ua)'],
    name: '[Shelter] Repair (NTA+TA)',
    forms: [
      {
        id: KoboIndex.byName('shelter_nta').id,
        // langIndexes: [1, 0],
      },
      {
        id: KoboIndex.byName('shelter_ta').id,
        // langIndexes: [0, 1],
        join: {
          originId: KoboIndex.byName('shelter_nta').id,
          originColName: 'id',
          colName: (() => {
            const key: keyof Shelter_ta.T = 'nta_id'
            return key
          })(),
        },
      },
      // {
      //   id: KoboIndex.byName('ecrec_msmeGrantSelection').id,
      //   // langIndexes: [1, 0],
      // },
      // {
      //   id: KoboIndex.byName('ecrec_msmeGrantEoi').id,
      //   // langIndexes: [0, 1],
      //   join: {originId: KoboIndex.byName('ecrec_msmeGrantSelection').id, originColName: 'ben_det_tax_id_num', colName: 'tax_id_num'}
      // },
    ],
  },
]

const urlValidation = yup.object({
  id: yup.string().required(),
})

const indexFinder = (array: string[] | undefined = [], queryString: string): number => {
  let defaultIndex: number = 0

  const foundIndex = array.findIndex((element) => element.includes(queryString))

  if (foundIndex === -1) return defaultIndex

  return foundIndex
}

export const DatabaseTableCustomRoute = () => {
  const {api} = useAppSettings()
  const {m, currentLang} = useI18n()
  const t = useTheme()
  const {session} = useSession()

  const {id} = urlValidation.validateSync(useParams())

  const ctxKoboUpdate = useKoboUpdateContext()
  const ctxSchema = useKoboSchemaContext()
  const ctxAnswers = useKoboAnswersContext()

  const customForm = useMemo(() => customForms.find((_) => _.id === id), [id])
  const formIds = useMemo(() => customForm!.forms.map((_) => _.id), [id])
  const {setTitle} = useLayoutContext()

  const [selectedIndexes, setSelectedIndexes] = useState<string[]>([])
  const [showXmlLabels, setShowXmlLabels] = useState(false)

  const handleXmlLabelsToggle = () => setShowXmlLabels((previous) => !previous)

  if (!customForm) return

  const view = useDatabaseView('custom-db-' + customForm.id)

  useEffect(() => {
    formIds.forEach((_) => {
      ctxAnswers.byId(_).fetch()
      ctxSchema.fetchById(_)
    })
  }, [formIds])

  const schemas = customForm.forms
    .map((_) => ({formId: _.id, schema: ctxSchema.byId[_.id]?.get}))
    .filter((_) => !!_.schema) as {formId: Kobo.FormId; schema: KoboSchemaHelper.Bundle}[]
  const isFullyArchived = schemas.every((_) => _.schema.schema.deployment_status === 'archived')

  useEffect(() => {
    setTitle(schemas.map((_) => _.schema.schema.name).join(' + '))
  }, [schemas])

  const dataLoadingState = useMemo(
    () => ({
      formDataStates: formIds.map((id) => !!ctxAnswers.byId(id).get?.data),
      langIndex: ctxSchema.langIndex,
    }),
    [formIds, ctxAnswers, ctxSchema.langIndex],
  )

  const data = useMemo(() => {
    const dataSets = formIds.map((_) => ctxAnswers.byId(_).get?.data)
    if (!dataSets.every((_) => _ !== undefined)) return
    const indexesParams = seq(customForm.forms)
      .compactBy('join')
      .flatMap((_) => [
        {formId: _.id, colName: _.join.colName},
        {formId: _.join.originId, colName: _.join.originColName},
      ])
      .distinct((_) => _.formId)
    const indexes = indexesParams.groupByAndApply(
      (_) => _.formId,
      (group) =>
        seq(
          ctxAnswers
            .byId(group[0].formId)
            .get?.data.filter((_) => !_.tags || _.tags._validation !== KoboValidation.Rejected)!,
        ).groupByFirst((_) => (_ as any)[group[0].colName]),
    )
    return dataSets[0]!.map((row, i) => {
      return {
        index: i,
        [customForm.forms[0].id]: (databaseCustomMapping[customForm.forms[0].id] ?? ((_) => _))(row),
        ...seq(customForm.forms)
          .compactBy('join')
          .reduceObject((_) => {
            const refRow = indexes[_.id][(row as any)[_.join.originColName]]
            return [_.id, refRow ? (databaseCustomMapping[_.id] ?? ((_) => _))(refRow) : undefined]
          }),
      }
    })
  }, [dataLoadingState])

  const schemasState = useMemo(
    () => ({
      schemasData: schemas,
    }),
    [schemas],
  )

  const columns: DatatableColumn.Props<any>[] = useMemo(() => {
    return schemas.flatMap(({formId, schema}) => {
      const selectedIds = data ? selectedIndexes.map((_) => data[+_][formId]?.id).filter((_) => _ !== undefined) : []
      const cols = columnBySchemaGenerator({
        formId,
        schema,
        m,
        onEdit:
          selectedIds.length > 0
            ? (questionName) =>
                ctxKoboUpdate.openById({
                  target: 'answer',
                  params: {
                    formId: formId,
                    question: questionName,
                    answerIds: selectedIds,
                  },
                })
            : undefined,
        t,
        getRow: (_) => (_[formId] ?? {}) as any,
        currentLang,
      }).getAll()

      cols[cols.length - 1].style = () => ({borderRight: '3px solid ' + t.palette.divider})
      cols[cols.length - 1].styleHead = {borderRight: '3px solid ' + t.palette.divider}

      return [
        ...getColumnsBase({
          selectedIds,
          formId,
          canEdit: true,
          m,
          openViewAnswer: ctxAnswers.openView,
          ctxEdit: ctxKoboUpdate,
          asyncEdit: (answerId: Kobo.SubmissionId) => api.koboApi.getEditUrl({formId: formId, answerId}),
          getRow: (_) => (_[formId] ?? {}) as any,
        }),
        ...getColumnsCustom({
          getRow: (_) => _[formId] ?? {},
          selectedIds,
          ctxUpdate: ctxKoboUpdate,
          formId,
          canEdit: true,
          m,
        }),
        ...cols,
      ].map((_) => {
        return {
          ..._,
          formId,
          id: formId + '_' + _.id,
          group: formId + _.group,
          groupLabel: schema.schema.name + '/' + _.groupLabel,
          width: view.colsById[formId + '_' + _.id]?.width ?? _.width ?? 90,
        }
      })
    })
  }, [schemasState, data, selectedIndexes, ctxSchema.langIndex, view.currentView])

  useEffect(() => {
    const translations = {
      // we can't guarantee same language index in different form schemas,
      // but we are setting the lang index in common Kobo context, so let's base on the first schema
      // I know it's error-prone, can't see a better choice
      en: indexFinder(schemas[0]?.schema.schemaSanitized.content.translations, '(en)'),
      uk: indexFinder(schemas[0]?.schema.schemaSanitized.content.translations, '(uk)'),
    } as const

    if (showXmlLabels) {
      ctxSchema.setLangIndex(-1)
    } else {
      ctxSchema.setLangIndex(translations[currentLang])
    }
  }, [schemasState, currentLang, showXmlLabels])

  const loading = ctxSchema.anyLoading || !!formIds.find((_) => ctxAnswers.byId(_).loading)

  return (
    <>
      <Page width="full" sx={{p: 0}} loading={loading}>
        <Panel>
          <Datatable
            id={customForm.id}
            joinedTable
            onResizeColumn={view.onResizeColumn}
            columns={columns}
            select={{
              onSelect: setSelectedIndexes,
              getId: (_) => '' + _.index,
            }}
            data={data}
            showExportBtn
            columnsToggle={{
              disableAutoSave: true,
              hidden: view.hiddenColumns,
              onHide: view.setHiddenColumns,
            }}
            // exportAdditionalSheets={data => {
            //   const questionToAddInGroups = schemas.flatMap(({schema, formId}) => {
            //     return schema.schemaHelper.sanitizedSchema.content.survey.filter(_ => ['id', 'submissionTime', 'start', 'end'].includes(_.name))
            //   })
            //   return schemas.map(({formId, schema}) => {
            //
            //   })
            //   return Obj.entries(schemas.flatMap(_ => _.schema.schemaHelper.groupSchemas)).map(([groupName, questions]) => {
            //     const _: GenerateXlsFromArrayParams<any> = {
            //       sheetName: groupName as string,
            //       data: seq(data).flatMap(d => (d[groupName] as any[])?.map(_ => ({
            //         ..._,
            //         id: d.id,
            //         start: d.start,
            //         end: d.end,
            //         submissionTime: d.submissionTime,
            //       }))).compact(),
            //       schema: renderExportKoboSchema({
            //         formId: ctx.form.id,
            //         schema: [...questionToAddInGroups, ...questions],
            //         groupSchemas: ctx.schema.schemaHelper.groupSchemas,
            //         translateQuestion: ctx.schema.translate.question,
            //         translateChoice: ctx.schema.translate.choice,
            //       })
            //     }
            //     return _
            //   })
            header={
              <>
                <DatabaseViewInput sx={{mr: 1}} view={view} />
                {session.admin && (
                  <FormControlLabel
                    sx={{ml: 1}}
                    control={
                      <Switch
                        size="small"
                        checked={showXmlLabels}
                        onChange={handleXmlLabelsToggle}
                        name="xml-fields-display-switch"
                      />
                    }
                    label={m.xmlLabels}
                  />
                )}
                {isFullyArchived && <ArchiveAlert />}
              </>
            }
          />
        </Panel>
      </Page>
    </>
  )
}
