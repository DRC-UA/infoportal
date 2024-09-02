import {KoboId, UUID} from 'infoportal-common'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useAsync} from '@/shared/hook/useAsync'
import {Seq, seq} from '@alexandreannic/ts-utils'
import {DatabaseView, DatabaseViewCol, DatabaseViewColVisibility, DatabaseViewVisibility} from '@/core/sdk/server/databaseView/DatabaseView'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {useSession} from '@/core/Session/SessionContext'

export type UseDatabaseView = ReturnType<typeof useDatabaseView>

export const DatabaseViewDefaultName = 'Default'

export const useDatabaseView = (formId: KoboId) => {
  const {api} = useAppSettings()
  const {session} = useSession()
  const [currentViewId, setCurrentViewId] = usePersistentState<string | undefined>(undefined, {storageKey: 'db-view' + formId})
  const [currentView, setCurrentView] = useState<DatabaseView | undefined>()
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([])

  const fetcherViews = useFetcher(() => api.databaseView.search({databaseId: formId}))

  const asyncViewDelete = useAsync((id: UUID) => api.databaseView.delete(id).then(_ => {
    fetcherViews.set(_ => _?.filter(_ => _.id !== id))
  }))

  const canUpdateView = (v: DatabaseView) => !!v && (v.visibility !== DatabaseViewVisibility.Sealed || v.createdBy === session.email)

  const updateView = (newView: DatabaseView) => {
    fetcherViews.set(views => {
      return views?.map(view => view.id === currentView!.id ? newView : view)
    })
    return newView
  }

  const asyncViewUpdate = useAsync(async (view: DatabaseView, changes: Partial<Pick<DatabaseView, 'visibility'>>) => {
    if (!canUpdateView(view)) return
    const newView = await api.databaseView.update({id: view.id, ...changes})
    return updateView(newView)
  })

  const asyncColUpdate = useAsync(async (view: DatabaseView, body: Partial<Pick<DatabaseViewCol, 'name' | 'width' | 'visibility'>>) => {
    if (!canUpdateView(view)) return
    const newView = await api.databaseView.updateCol(view.id, body)
    return updateView(newView)
  })

  const asyncViewCreate = useAsync(async (params: Pick<DatabaseView, 'name' | 'visibility'>) => {
    const res = await api.databaseView.create({...params, databaseId: formId})
    fetcherViews.set(_ => [..._ ?? [], res])
  })

  useEffect(function initView() {
    if (!fetcherViews.get || currentView) {
      return
    }
    if (fetcherViews.get.length === 0) {
      asyncViewCreate.call({name: DatabaseViewDefaultName, visibility: DatabaseViewVisibility.Public})
    } else if (!currentViewId) {
      setCurrentViewId(fetcherViews.get[0].id)
      setCurrentView(fetcherViews.get[0])
    } else {
      const match = fetcherViews.get.find(_ => _.id === currentViewId) ?? fetcherViews.get[0]
      setCurrentView(match)
    }
  }, [fetcherViews.get])

  useEffect(() => {
    setCurrentView(fetcherViews.get?.find(_ => _.id === currentViewId))
  }, [currentViewId])

  useEffect(() => {
    setHiddenColumns(currentView?.details?.filter(_ => _.visibility === DatabaseViewColVisibility.Hidden)?.map(_ => _.name) ?? [])
  }, [currentView])


  useEffect(function saveColumnsVisibility() {
    if (!currentView) return
    const hidden = new Set(hiddenColumns)
    const touchedColumns: Seq<Pick<DatabaseViewCol, 'name' | 'visibility'>> = seq([
      ...currentView?.details ?? [],
      ...hiddenColumns.filter(_ => !currentView?.details?.some(_ => _.name)).map(_ => ({name: _, visibility: DatabaseViewColVisibility.Visible}))
    ])
    const columnUpdates = touchedColumns.map(_ => {
      if (_.visibility === DatabaseViewColVisibility.Hidden && !hidden.has(_.name)) return {name: _.name, visibility: DatabaseViewColVisibility.Visible}
      if (_.visibility === DatabaseViewColVisibility.Visible && hidden.has(_.name)) return {name: _.name, visibility: DatabaseViewColVisibility.Hidden}
      return
    }).compact()
    columnUpdates?.forEach(_ => asyncColUpdate.call(currentView, _))
  }, [hiddenColumns])

  const onResizeColumn = useCallback((columnId: string, width: number) => {
    if (!currentView) return
    asyncColUpdate.call(currentView, {name: columnId, width})
  }, [currentView])

  const colsById = useMemo(() => {
    return seq(currentView?.details ?? []).groupByFirst(_ => _.name)
  }, [currentView])


  useEffect(() => {
    fetcherViews.fetch()
  }, [])

  return {
    fetcherViews,
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