import {useFetcher} from '@/shared/hook/useFetcher'
import {useEffect} from 'react'
import {Obj, Seq} from '@alexandreannic/ts-utils'
import {initGoogleMaps} from '@/core/initGoogleMaps'
import {useTheme} from '@mui/material'
import {AILocationHelper} from 'infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'

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
  const fetcherGeoLoc = useFetcher(AILocationHelper.getSettlementGeoLoc)
  const fetcherSettlements = useFetcher(AILocationHelper.getSettlement)
  useEffect(() => {
    fetcherGeoLoc.fetch()
    fetcherSettlements.fetch()
    api.session.track(`Load Settlements GoogleMaps`)
  }, [])

  useEffect(() => {
    if (!data || !fetcherGeoLoc.get || !fetcherSettlements.get) return
    const res = Obj.entries(
      data
        .map(getSettlement)
        .filter((_) => _ && _.startsWith('UA'))
        .groupByAndApply(
          (_) => _!,
          (_) => _.length,
        ),
    ).map(([iso, count]) => {
      const s = fetcherSettlements.get![iso]
      return {
        label: `${s.en}/${s.ua}`,
        desc: s.iso,
        loc: fetcherGeoLoc.get![iso],
        size: count,
      }
    })
    initGoogleMaps({
      domSelector: '#google-maps',
      color: t.palette.primary.main,
      bubbles: res,
    })
  }, [fetcherGeoLoc.get, data])
  return <div id="google-maps" style={{height: height ?? 320}} />
}
