import React from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {AiShelterMapper} from '@/features/ActivityInfo/Snfi/aiSnfiMapper'
import {useFetcher} from '@/shared/hook/useFetcher'
import {BundleTable} from '@/features/ActivityInfo/shared/AiBundle'

export const AiSnfi = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: string) => {
    return Promise.all([
      AiShelterMapper.reqRepairs(api)(period),
      AiShelterMapper.reqEsk(api)(period),
    ]).then(_ => _.reduce((acc, r) => [...acc, ...r], []))
  })

  return (
    <Page width="full">
      <Panel>
        <BundleTable fetcher={fetcher} id="snfi"/>
      </Panel>
    </Page>
  )
}