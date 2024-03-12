import {Page} from '@/shared/Page'
import React from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Panel} from '@/shared/Panel'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiBundle'
import {useFetcher} from '@/shared/hook/useFetcher'
import {AiMpcaMapper} from '@/features/ActivityInfo/Mpca/aiMpcaMapper'

export const AiMpca = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: string) => AiMpcaMapper.reqCashRegistration(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="mpca"/>
      </Panel>
    </Page>
  )
}