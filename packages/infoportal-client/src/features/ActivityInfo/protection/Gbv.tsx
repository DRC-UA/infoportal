import type {FC} from 'react'

import {DrcProgram} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'

import {mapGeneralProtection} from './utils'
import {Page} from '@/shared'

const Gbv: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher(
    [
      DrcProgram.AwarenessRaisingSession,
      DrcProgram.CapacityBuilding,
      DrcProgram.DignityKits,
      DrcProgram.WGSS,
      DrcProgram.PSS,
    ],
    mapGeneralProtection,
  )

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {Gbv}
