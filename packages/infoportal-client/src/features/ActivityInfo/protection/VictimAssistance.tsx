import type {FC} from 'react'

import {DrcProgram} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'
import {Page} from '@/shared'

import {protectionMapperMaker} from './utils'

const VictimAssistance: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher({
    activities: [DrcProgram.TIA],
    mapper: protectionMapperMaker('drcva'),
  })

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {VictimAssistance}
