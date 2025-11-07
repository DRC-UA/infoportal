import {Period} from 'infoportal-common'

import {AiProtectionMapper} from '@/features/ActivityInfo/Protection/aiProtectionMapper'
import {useAppSettings} from '@/core/context/ConfigContext'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiTable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

export const AiProtection = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: Partial<Period>) => AiProtectionMapper.req(api)(period))

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="protection" />
      </Panel>
    </Page>
  )
}
