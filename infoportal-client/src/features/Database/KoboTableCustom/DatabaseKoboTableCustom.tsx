import React, {useEffect, useMemo} from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {useParams} from 'react-router'
import * as yup from 'yup'
import {useMemoFn} from '@alexandreannic/react-hooks-lib'
import {seq} from '@alexandreannic/ts-utils'
import {getColumnBySchema} from '@/features/Database/KoboTable/getColumnBySchema'
import {useI18n} from '@/core/i18n'
import {Datatable} from '@/shared/Datatable/Datatable'

export const customForms = [{
  id: '1',
  name: '[ECREC] VET',
  forms: [
    {id: 'aGGGapARnC2ek7sA6SuHmu'},
    {id: 'aNRJbxkYEH2yogyeNowXzS', join: {originId: 'aGGGapARnC2ek7sA6SuHmu', originColName: 'id', colName: 'id_form_vet'}},
  ]
}]

const urlValidation = yup.object({
  id: yup.string().required()
})

export const DatabaseTableCustomRoute = () => {
  const {m} = useI18n()
  const {id} = urlValidation.validateSync(useParams())
  const customForm = useMemo(() => customForms.find(_ => _.id === id), [id])
  const formIds = useMemo(() => customForm!.forms.map(_ => _.id), [id])
  const ctxSchema = useKoboSchemaContext()
  const ctxAnswers = useKoboAnswersContext()
  if (!customForm) return
  useEffect(() => {
    formIds.forEach(_ => {
      ctxAnswers.byId.fetch({}, _)
      ctxSchema.fetchById(_)
    })
  }, [formIds])

  const data = useMemoFn(formIds.map(_ => ctxAnswers.byId.get(_)?.data), dataSets => {
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
      group => seq(ctxAnswers.byId.get(group[0].formId)?.data!).groupBy(_ => (_ as any)[group[0].colName])
    )
    return dataSets[0]!.map((row, i) => {
      return {
        [customForm.forms[0].id]: row,
        ...seq(customForm.forms).compactBy('join').reduceObject(_ => {
          console.log(_.id, _.join.originColName, (row as any)[_.join.originColName])
          return [_.id, indexes[_.id][(row as any)[_.join.originColName]]]
        })
      }
    })
  })

  const columns = useMemo(() => {
    return customForm.forms.map(_ => _.id).flatMap(formId => {
      const schema = ctxSchema.byId[formId]?.get
      if (!schema) return []
      return getColumnBySchema({
        formId,
        data: data,
        schema: schema.schemaHelper.sanitizedSchema.content.survey,
        groupSchemas: schema.schemaHelper.groupSchemas,
        translateQuestion: schema.translate.question,
        translateChoice: schema.translate.choice,
        choicesIndex: schema.schemaHelper.choicesIndex,
        m,
        getRow: _ => _[formId] ?? {} as any,
        // externalFilesIndex: externalFilesIndex,
        // repeatGroupsAsColumn: repeatGroupsAsColumns,
        // onOpenGroupModal: setOpenGroupModalAnswer,
      })
    })
  }, customForm.forms.map(_ => ctxSchema.byId[_.id]?.get))

  console.log(columns)

  console.log(data?.filter(_ => Object.values(_).every(_ => _ !== undefined)))

  // const data = useMemo(() => {
  //
  // }, formIds.map(_ => ctxAnswers.byId.get(_)))
  const loading = ctxSchema.anyLoading || !!formIds.find(_ => ctxAnswers.byId.loading(_))
  return (
    <>
      <Page width="full" sx={{p: 0}} loading={loading}>
        <Panel>
          <Datatable id="test" columns={columns} data={data}/>
          Test
        </Panel>
      </Page>
    </>
  )
}
