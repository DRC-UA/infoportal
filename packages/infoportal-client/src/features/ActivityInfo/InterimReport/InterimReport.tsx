import {useMemo, useEffect, type FC} from 'react'

import {KoboMetaStatus} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

const InterimReport: FC = () => {
  const {api} = useAppSettings()
  const {get, loading, fetch} = useFetcher(() => api.koboMeta.search({status: [KoboMetaStatus.Committed]}))

  const data = useMemo(() => get, [get])

  useEffect(() => {
    fetch()
  }, [])

  console.log({data, loading})

  return (
    <Page width="full" loading={loading}>
      <div>Interim Report Table</div>
    </Page>
  )
}

export default InterimReport
