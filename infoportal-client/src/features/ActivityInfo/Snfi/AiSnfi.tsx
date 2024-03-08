import React from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {AiShelterMapper} from '@/features/ActivityInfo/Snfi/aiSnfiData'
import {useFetcher} from '@/shared/hook/useFetcher'
import {BundleTable} from '@/features/ActivityInfo/shared/AiBundle'

export const AiSnfi = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((p: string) => {
    const res = Promise.all([
      AiShelterMapper.reqRepairs(api)(p),
      // AiShelterMapper.reqEsk(api)(p),
    ]).then(_ => _.reduce((acc, r) => [...acc, ...r], []))
    return res
  })
  
  return (
    <Page width="full">
      <Panel>
        <BundleTable fetcher={fetcher}/>
      </Panel>
    </Page>
  )
}