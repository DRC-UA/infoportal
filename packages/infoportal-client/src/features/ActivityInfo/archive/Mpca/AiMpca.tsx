import {Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {AiBundleTable} from '@/features/ActivityInfo/shared/AiTable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

import {AiMpcaMapper} from './aiMpcaMapper'

export const AiMpca = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher((period: Partial<Period>) => AiMpcaMapper.reqCashRegistration(api)(period))
  const {conf} = useAppSettings()

  return (
    <Page width="full">
      <Panel>
        <AiBundleTable
          fetcher={fetcher}
          id="mpca"
          header={
            <>
              USD to UAH&nbsp;<b>{conf.uahToUsd}</b>
            </>
          }
        />
      </Panel>
    </Page>
  )
}
