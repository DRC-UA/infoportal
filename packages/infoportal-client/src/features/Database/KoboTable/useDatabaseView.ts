import {KoboId, UUID} from 'infoportal-common'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useAsync} from '@/shared/hook/useAsync'
import {Seq, seq} from '@alexandreannic/ts-utils'
import {DatabaseView, DatabaseViewCol, DatabaseViewColVisibility, DatabaseViewVisibility} from '@/core/sdk/server/databaseView/DatabaseView'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {DatabaseViewDefaultName} from '@/features/Database/KoboTable/view/DatabaseViewInputRow'
import {useSession} from '@/core/Session/SessionContext'

export type UseDatabaseView = ReturnType<typeof useDatabaseView>

export const useDatabaseView = (formId: KoboId) => {
  const {api} = useAppSettings()
  const {session} = useSession()
  const [currentViewId, setCurrentViewId] = usePersistentState<string | undefined>(undefined, {storageKey: 'db-view' + formId})
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])

  const fetcherViews = useFetcher(() => api.databaseView.search({databaseId: formId}))

  const {currentView, colsById} = useMemo(() => {
    const currentView = fetcherViews.get?.find(_ => _.id === currentViewId)
    return {
      currentView,
      colsById: seq(currentView?.details ?? []).groupByFirst(_ => _.name)
    }
  }, [currentViewId, fetcherViews.get])

  const asyncViewDelete = useAsync((id: UUID) => api.databaseView.delete(id).then(_ => {
    fetcherViews.set(_ => _?.filter(_ => _.id !== id))
  }))

  const asyncViewUpdate = useAsync((body: Partial<Pick<DatabaseView, 'id' | 'visibility'>>) => {
    const res = api.databaseView.update(body)
    fetcherViews.set(views => views?.map(_ => body.id === _.id
      ? {..._, visibility: body.visibility ?? _.visibility}
      : _
    ))
    return res
  })

  const asyncColUpdate = useAsync(async (body: Partial<Pick<DatabaseViewCol, 'name' | 'width' | 'visibility'>>) => {
    if (!currentView || (currentView.visibility === DatabaseViewVisibility.Sealed && currentView.createdBy !== session.email)) return
    const res = api.databaseView.updateCol(currentView.id, body)
    fetcherViews.set(views => views?.map(view => {
      if (view.id !== currentView.id) return view
      return {
        ...view,
        details: view.details.map(col => col.name === body.name ? {
          ...col,
          width: body.width ?? col.width,
          visibility: body.visibility ?? col.visibility
        } : col)
      }
    }))
    return res
  })

  const asyncViewCreate = useAsync(async (params: Pick<DatabaseView, 'name' | 'visibility'>) => {
    const res = await api.databaseView.create({...params, databaseId: formId})
    fetcherViews.set(_ => [..._ ?? [], res])
  })

  useEffect(() => {
    setHiddenColumns(currentView?.details?.filter(_ => _.visibility === DatabaseViewColVisibility.Hidden)?.map(_ => _.name) ?? [])
  }, [currentViewId])

  useEffect(function saveColumnsVisibility() {
    if (!currentViewId) return
    const hidden = new Set(hiddenColumns)
    const touchedColumns: Seq<Pick<DatabaseViewCol, 'name' | 'visibility'>> = seq([
      ...currentView?.details ?? [],
      ...hiddenColumns.filter(_ => !!currentView?.details?.some(_ => _.name)).map(_ => ({name: _, visibility: DatabaseViewColVisibility.Visible}))
    ])
    const columnUpdates = touchedColumns.map(_ => {
      if (_.visibility === DatabaseViewColVisibility.Hidden && !hidden.has(_.name)) return {name: _.name, visibility: DatabaseViewColVisibility.Visible}
      if (_.visibility === DatabaseViewColVisibility.Visible && hidden.has(_.name)) return {name: _.name, visibility: DatabaseViewColVisibility.Hidden}
      return
    }).compact()
    columnUpdates?.forEach(_ => asyncColUpdate.call(_))
  }, [hiddenColumns])

  const onResizeColumn = useCallback((columnId: string, width: number) => {
    if (!currentViewId) return
    asyncColUpdate.call({name: columnId, width})
  }, [currentViewId])

  useEffect(() => {
    fetcherViews.fetch()
  }, [])

  useEffect(function initView() {
    if (!fetcherViews.get) return
    if (fetcherViews.get.length === 0)
      asyncViewCreate.call({name: DatabaseViewDefaultName, visibility: DatabaseViewVisibility.Public})
    else if (!currentViewId)
      setCurrentViewId(fetcherViews.get[0].id)
  }, [fetcherViews.get])

  return {
    fetcherViews,
    asyncColUpdate,
    asyncViewCreate,
    asyncViewDelete,
    asyncViewUpdate,
    hiddenColumns,
    setHiddenColumns,
    setCurrentViewId,
    onResizeColumn,
    currentView,
    colsById,
  }
}