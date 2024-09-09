import React, {useEffect, useMemo} from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {useParams} from 'react-router'
import * as yup from 'yup'
import {seq} from '@alexandreannic/ts-utils'
import {getColumnBySchema} from '@/features/Database/KoboTable/columns/getColumnBySchema'
import {useI18n} from '@/core/i18n'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useTheme} from '@mui/material'
import {getColumnsCustom} from '@/features/Database/KoboTable/columns/getColumnsCustom'
import {useKoboEditTagContext} from '@/core/context/KoboEditTagsContext'
import {databaseCustomMapping} from '@/features/Database/KoboTable/customization/customMapping'
import {getColumnsBase} from '@/features/Database/KoboTable/columns/getColumnsBase'
import {KoboAnswerId, KoboId, KoboIndex, KoboSchemaHelper, KoboValidation} from 'infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {useLayoutContext} from '@/shared/Layout/LayoutContext'

interface CustomForm {
  id: string
  name: string
  // langs: string[]
  forms: {
    id: string
    // langIndexes?: number[]
    join?: {
      originId: KoboId, originColName: string, colName: string
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
        join: {originId: 'aGGGapARnC2ek7sA6SuHmu', originColName: 'id', colName: 'id_form_vet'}

      },
    ]
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
        join: {originId: KoboIndex.byName('ecrec_msmeGrantEoi').id, originColName: 'ben_det_tax_id_num', colName: 'tax_id_num'}
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
    ]
  }
]

const urlValidation = yup.object({
  id: yup.string().required()
})

export const DatabaseTableCustomRoute = () => {
  const ctxEditTag = useKoboEditTagContext()
  const {api} = useAppSettings()
  const {m} = useI18n()
  const t = useTheme()
  const {id} = urlValidation.validateSync(useParams())
  const customForm = useMemo(() => customForms.find(_ => _.id === id), [id])
  const formIds = useMemo(() => customForm!.forms.map(_ => _.id), [id])
  const ctxSchema = useKoboSchemaContext()
  const {setTitle} = useLayoutContext()
  const ctxAnswers = useKoboAnswersContext()
  if (!customForm) return

  useEffect(() => {
    formIds.forEach(_ => {
      ctxAnswers.byId(_).fetch()
      ctxSchema.fetchById(_)
    })
  }, [formIds])

  const schemas = customForm.forms.map(_ => ({formId: _.id, schema: ctxSchema.byId[_.id]?.get})).filter(_ => !!_.schema) as {formId: KoboId, schema: KoboSchemaHelper.Bundle}[]

  useEffect(() => {
    setTitle(schemas.map(_ => _.schema.schemaUnsanitized.name).join(' + '))
  }, [schemas])

  const data = useMemo(() => {
    const dataSets = formIds.map(_ => ctxAnswers.byId(_).get?.data)
    if (!dataSets.every(_ => _ !== undefined)) return
    const indexesParams = seq(customForm.forms)
      .compactBy('join')
      .flatMap(_ => [
        {formId: _.id, colName: _.join.colName},
        {formId: _.join.originId, colName: _.join.originColName},
      ])
      .distinct(_ => _.formId)
    const indexes = indexesParams.groupByAndApply(
      _ => _.formId,
      group => seq(ctxAnswers.byId(group[0].formId).get?.data.filter(_ => !_.tags || _.tags._validation !== KoboValidation.Rejected)!).groupByFirst(_ => (_ as any)[group[0].colName])
    )
    return dataSets[0]!.map((row, i) => {
      return {
        [customForm.forms[0].id]: (databaseCustomMapping[customForm.forms[0].id] ?? (_ => _))(row),
        ...seq(customForm.forms).compactBy('join').reduceObject(_ => {
          const refRow = indexes[_.id][(row as any)[_.join.originColName]]
          return [_.id, refRow ? (databaseCustomMapping[_.id] ?? (_ => _))(refRow) : undefined]
        })
      }
    })
  }, [...formIds.map(_ => ctxAnswers.byId(_).get?.data), ctxSchema.langIndex])

  const columns = useMemo(() => {
    return schemas.flatMap(({formId, schema}) => {
      const cols = getColumnBySchema({
        formId,
        data: data,
        schema: schema.schemaHelper.sanitizedSchema.content.survey,
        groupSchemas: schema.schemaHelper.groupSchemas,
        translateQuestion: schema.translate.question,
        translateChoice: schema.translate.choice,
        choicesIndex: schema.schemaHelper.choicesIndex,
        m,
        theme: t,
        getRow: _ => (_[formId] ?? {}) as any,
        // externalFilesIndex: externalFilesIndex,
        // repeatGroupsAsColumn: repeatGroupsAsColumns,
        // onOpenGroupModal: setOpenGroupModalAnswer,
      }).map(_ => {
        _.id = formId + '_' + _.id
        _.group = formId + _.group
        _.groupLabel = schema.schemaUnsanitized.name + '/' + _.groupLabel
        return _
      })
      cols[cols.length - 1].style = () => ({borderRight: '3px solid ' + t.palette.divider})
      cols[cols.length - 1].styleHead = {borderRight: '3px solid ' + t.palette.divider}
      return [
        ...getColumnsBase({
          selectedIds: [],
          formId,
          canEdit: true,
          m,
          openAnswerModal: ctxAnswers.openAnswerModal,
          asyncEdit: (answerId: KoboAnswerId) => api.koboApi.getEditUrl({formId: formId, answerId}),
          asyncUpdateTagById: ctxEditTag.asyncUpdateById,
          openEditTag: ctxEditTag.open,
        }),
        ...getColumnsCustom({
          getRow: _ => _[formId] ?? {},
          selectedIds: [],
          formId: formId,
          canEdit: true,
          m,
          asyncUpdateTagById: ctxEditTag.asyncUpdateById,
          openEditTag: ctxEditTag.open,
        }),
        ...cols
      ]
    })
  }, [...schemas, ctxSchema.langIndex])

  const loading = ctxSchema.anyLoading || !!formIds.find(_ => ctxAnswers.byId(_).loading)
  return (
    <>
      <Page width="full" sx={{p: 0}} loading={loading}>
        <Panel>
          <Datatable
            id={customForm.id}
            columns={columns}
            data={data as any}
            showExportBtn
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
                <IpSelectSingle<number>
                  hideNullOption
                  sx={{maxWidth: 128, mr: 1}}
                  defaultValue={ctxSchema.langIndex}
                  onChange={ctxSchema.setLangIndex}
                  options={[
                    {children: 'XML', value: -1},
                    // ...customForm.langs.map((l, i) => ({children: l, value: i})),
                    ...ctxSchema.byId[customForm.forms[0].id]?.get?.schemaHelper.sanitizedSchema.content.translations.map((_, i) => ({children: _, value: i})) ?? [],
                    // ...ctx.schema.schemaHelper.sanitizedSchema.content.translations.map((_, i) => ({children: _, value: i}))
                  ]}
                />
              </>
            }
          />
        </Panel>
      </Page>
    </>
  )
}
