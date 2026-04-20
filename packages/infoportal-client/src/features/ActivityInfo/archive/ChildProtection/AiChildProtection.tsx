import type {FC} from 'react'

import {Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiTable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

import {AiChildProtectionMapper} from './AiChildProtectionMapper'

export const AiChildProtection: FC = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: Partial<Period>) => AiChildProtectionMapper.request(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="child-protection" />
      </Panel>
    </Page>
  )
}
