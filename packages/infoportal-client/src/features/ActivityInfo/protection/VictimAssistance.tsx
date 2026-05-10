import type {FC} from 'react'

import {DrcProgram} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'
import {Page} from '@/shared'

import {mapMakerProtection} from './utils'

const VictimAssistance: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher({
    activities: [DrcProgram.TIA],
    mapper: mapMakerProtection('drcva'),
  })

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {VictimAssistance}
