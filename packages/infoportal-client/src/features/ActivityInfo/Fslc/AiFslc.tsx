import React from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {AiFslcMapper} from '@/features/ActivityInfo/Fslc/aiFslcMapper'
import {useFetcher} from '@/shared/hook/useFetcher'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiBundle'

export const AiFslc = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: string) => AiFslcMapper.reqCashRegistration(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="fslc"/>
      </Panel>
    </Page>
  )
}