import type {FC} from 'react'

import {AiTable} from '@/features/ActivityInfo/shared'
import {Page} from '@/shared'

import {useEcrecData} from './utils'

const Ecrec: FC = () => {
  const {loading, data, columns, period, setPeriod} = useEcrecData()

  return (
    <Page loading={loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {Ecrec}
