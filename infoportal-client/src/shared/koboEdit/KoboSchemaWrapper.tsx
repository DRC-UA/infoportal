import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useEffect, useMemo} from 'react'
import {KoboId} from '@infoportal-common'
import {KeyOf} from '@alexandreannic/ts-utils'

export const useKoboColumnDef = <T extends Record<string, any>>({
  formId,
  columnName,
}: {
  formId: KoboId,
  columnName: KeyOf<T>
}) => {
  const ctx = useKoboSchemaContext()
  useEffect(() => {
    ctx.fetchById(formId)
  }, [formId])

  return useMemo(() => {
    const schema = ctx.byId[formId]?.get
    console.log(formId, columnName, ctx.byId[formId]?.get, schema?.schemaHelper.questionIndex[columnName as string])
    return {
      loading: ctx.byId[formId]?.loading,
      schema,
      columnDef: schema?.schemaHelper.questionIndex[columnName as string]
    }
  }, [ctx.byId, formId, columnName])
}