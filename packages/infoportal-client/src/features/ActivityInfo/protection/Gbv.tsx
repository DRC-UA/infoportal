import type {FC} from 'react'

import {DrcProgram, DrcSector} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'
import {Page} from '@/shared'

import {mapMakerProtection} from './utils'

const Gbv: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher({
    sectors: [DrcSector.GBV],
    activities: [
      DrcProgram.AwarenessRaisingSession,
      DrcProgram.CapacityBuilding,
      DrcProgram.DignityKits,
      DrcProgram.WGSS,
      // DrcProgram.PSS,
    ],
    mapper: mapMakerProtection('drcgbv'),
  })

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {Gbv}
