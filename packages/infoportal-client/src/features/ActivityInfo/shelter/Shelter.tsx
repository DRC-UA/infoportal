import type {FC} from 'react'

import {DrcProgram, DrcSector} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'
import {Page} from '@/shared'

import {shelterMapper} from './utils'

const Shelter: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher({
    sectors: [DrcSector.Shelter],
    activities: [
      DrcProgram.ESK,
      DrcProgram.CashForFuel,
      DrcProgram.CashForUtilities,
      DrcProgram.CashForRent,
      DrcProgram.CashForRepair,
      DrcProgram.ShelterRepair,
      DrcProgram.ShelterCommonSpacesRepair,
    ],
    mapper: shelterMapper,
  })

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {Shelter}
