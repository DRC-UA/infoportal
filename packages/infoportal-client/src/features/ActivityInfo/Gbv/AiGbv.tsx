import React from 'react'

import {Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiTable'
import {Panel} from '@/shared/Panel'
import {Page} from '@/shared/Page'
import {useFetcher} from '@/shared/hook/useFetcher'

import {AiGbvMapper2} from './AiGbvMapper'

export const AiGbv = () => {
  const {api} = useAppSettings()

  const fetcher = useFetcher((period: Partial<Period>) => AiGbvMapper2.req(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable id="gbv" fetcher={fetcher} />
      </Panel>
    </Page>
  )
}
