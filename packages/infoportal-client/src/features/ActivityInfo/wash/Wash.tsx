import type {FC} from 'react'

import {DrcSector} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'
import {Page} from '@/shared'

import {washMapper} from './utils'

const Wash: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher({
    sectors: [DrcSector.NFI],
    mapper: washMapper,
  })

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {Wash}
