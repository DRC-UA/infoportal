import {Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useFetcher} from '@/shared/hook/useFetcher'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiTable'

import {AiWashMapper} from './aiWashMapper'

export const AiWash = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: Partial<Period>) => AiWashMapper.req(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="snfi" />
      </Panel>
    </Page>
  )
}
