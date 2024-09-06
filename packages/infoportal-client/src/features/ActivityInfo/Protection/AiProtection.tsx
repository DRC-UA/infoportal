import {Page} from '@/shared/Page'
import React from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Panel} from '@/shared/Panel'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiTable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {AiProtectionMapper} from '@/features/ActivityInfo/Protection/aiProtectionMapper'

export const AiProtection = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: string) => AiProtectionMapper.req(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="snfi"/>
      </Panel>
    </Page>
  )
}