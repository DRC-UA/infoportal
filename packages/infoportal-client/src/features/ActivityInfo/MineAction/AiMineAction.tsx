import type {FC} from 'react'

import {Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiTable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

import {AiMineActionMapper} from './AiMineActionMapper'

export const AiMineAction: FC = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: Partial<Period>) => AiMineActionMapper.request(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="eore" />
      </Panel>
    </Page>
  )
}
