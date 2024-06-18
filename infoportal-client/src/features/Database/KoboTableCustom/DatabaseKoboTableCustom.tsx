import React, {useEffect, useMemo} from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {useParams} from 'react-router'
import * as yup from 'yup'

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
  const formIds = useMemo(
    () => customForms.find(_ => _.id === id)!.horizontalJoin.map(_ => _.id),
    [id]
  )
  const ctxSchema = useKoboSchemaContext()
  const ctxAnswers = useKoboAnswersContext()
  useEffect(() => {
    formIds.forEach(_ => {
      ctxAnswers.byId.fetch({}, _)
      ctxSchema.fetchById(_)
    })
  }, [formIds])
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
