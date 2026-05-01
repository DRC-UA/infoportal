import type {FC} from 'react'

import {DrcProgram} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'

import {mapVictimAssistance} from './utils'
import {Page} from '@/shared'

const VictimAssistance: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher([DrcProgram.TIA], mapVictimAssistance)

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod, loading: false}} />
    </Page>
  )
}

export {VictimAssistance}
