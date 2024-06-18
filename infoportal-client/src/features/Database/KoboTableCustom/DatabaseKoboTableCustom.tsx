import React, {useEffect, useMemo} from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {useParams} from 'react-router'
import * as yup from 'yup'
import {useMemoFn} from '@alexandreannic/react-hooks-lib'
import {seq} from '@alexandreannic/ts-utils'
import {KoboAnswerId, KoboId} from '@infoportal-common'

export const customForms = [{
  id: '1',
  name: '[ECREC] VET',
  horizontalJoin: [
    {id: 'aGGGapARnC2ek7sA6SuHmu', colName: 'id'},
    {id: 'aNRJbxkYEH2yogyeNowXzS', colName: 'id_form_vet'},
  ]
}]

const urlValidation = yup.object({
  id: yup.string().required()
})

export const DatabaseTableCustomRoute = () => {
  const {id} = urlValidation.validateSync(useParams())
  const customForm = useMemo(() => customForms.find(_ => _.id === id), [id])
  const formIds = useMemo(() => customForm!.horizontalJoin.map(_ => _.id), [id])
  const ctxSchema = useKoboSchemaContext()
  const ctxAnswers = useKoboAnswersContext()
  useEffect(() => {
    formIds.forEach(_ => {
      ctxAnswers.byId.fetch({}, _)
      ctxSchema.fetchById(_)
    })
  }, [formIds])

  const data = useMemoFn(formIds.map(_ => ctxAnswers.byId.get(_)), dataSets => {
    if (dataSets.find(_ => !_)) return
    const indexes: Record<KoboId, Record<KoboAnswerId, any[]>> = {} as any
    seq(dataSets).compact().forEach((_, i) => {
      if (i === 0) return
      const join = customForm!.horizontalJoin?.[i]
      if (!join) return
      indexes[formIds[i]] = seq(_.data).groupBy(_ => (_ as any)[join.colName])
    })
    return dataSets[0]!.data.map(_ => {
      return {
        [formIds[0]]: _,
        ...seq(formIds).reduceObject(_ => [_, indexes[_]])

      }
    })
  })

  // const data = useMemo(() => {
  //
  // }, formIds.map(_ => ctxAnswers.byId.get(_)))
  const loading = ctxSchema.anyLoading || !!formIds.find(_ => ctxAnswers.byId.loading(_))
  return (
    <>
      <Page width="full" sx={{p: 0}} loading={loading}>
        <Panel>
          Test
        </Panel>
      </Page>
    </>
  )
}
