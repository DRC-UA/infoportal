import {Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiTable'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useFetcher} from '@/shared/hook/useFetcher'

import {AiShelterMapper} from './aiSnfiMapper'

export const AiSnfi = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher(async (period: Partial<Period>) => {
    const records = await Promise.all([
      AiShelterMapper.reqRepairs(api)(period),
      AiShelterMapper.reqEsk(api)(period),
      AiShelterMapper.reqCommonSpacesRepairs(api)(period),
    ])

    return records.reduce((acc, r) => [...acc, ...r], [])
  })

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable fetcher={fetcher} id="snfi" />
      </Panel>
    </Page>
  )
}
