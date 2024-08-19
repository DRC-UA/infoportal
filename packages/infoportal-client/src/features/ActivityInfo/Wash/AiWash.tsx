import {useAppSettings} from '@/core/context/ConfigContext'
import React from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useFetcher} from '@/shared/hook/useFetcher'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiBundle'
import {AiWashMapper} from '@/features/ActivityInfo/Wash/aiWashMapper'

export const AiWash = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: string) => AiWashMapper.req(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="snfi"/>
      </Panel>
    </Page>
  )
}