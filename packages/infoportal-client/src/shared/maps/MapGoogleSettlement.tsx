import {useFetcher} from '@/shared/hook/useFetcher'
import {useEffect} from 'react'
import {Obj, Seq} from '@axanc/ts-utils'
import {initGoogleMaps} from '@/core/initGoogleMaps'
import {useTheme} from '@mui/material'
import {useAppSettings} from '@/core/context/ConfigContext'
import {UaLocation} from 'ua-location'

export const MapGoogleSettlement = <D extends Record<string, any>>({
  height,
  data,
  getSettlement,
}: {
  height?: number
  data: Seq<D>
  getSettlement: (_: D) => string | undefined
}) => {
  const t = useTheme()
  const {api} = useAppSettings()
  const fetcherSettlement = useFetcher(UaLocation.Settlement.getAll)
  useEffect(() => {
    fetcherSettlement.fetch()
    api.session.track(`Load Settlements GoogleMaps`)
  }, [])

  useEffect(() => {
    if (!data || !fetcherSettlement.get) return
    const res = Obj.entries(
      data
        .map(getSettlement)
        .filter((_) => _ && _.startsWith('UA'))
        .groupByAndApply(
          (_) => _!,
          (_) => _.length,
        ),
    )
      .map(([iso, count]) => {
        const s = fetcherSettlement.get?.get(iso)
        if (!s) return
        return {
          label: `${s.en}/${s.ua}`,
          desc: s.iso,
          loc: s.loc,
          size: count,
        }
      })
      .filter((_) => !!_)
    initGoogleMaps({
      domSelector: '#google-maps',
      color: t.palette.primary.main,
      bubbles: res,
    })
  }, [fetcherSettlement.get, data])
  return <div id="google-maps" style={{height: height ?? 320}} />
}
