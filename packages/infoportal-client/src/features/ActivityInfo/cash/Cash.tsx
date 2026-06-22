import type {FC} from 'react'

import {useAppSettings} from '@/core/context/ConfigContext'
import {AiTable, useKoboFetcher} from '@/features/ActivityInfo/shared'
import {Page} from '@/shared'

import {cashMapperMaker, filterCallbackMaker} from './utils'

const Cash: FC = () => {
  const {
    conf: {uah2usd},
  } = useAppSettings()

  const {period, setPeriod, loading, data, columns} = useKoboFetcher('bn_rapidResponse2', {
    mapper: cashMapperMaker(uah2usd),
    filterCallbackMaker,
  })

  return (
    <Page loading={loading} width="full">
      <AiTable
        {...{
          data,
          columns,
          period,
          setPeriod,
          showCurrencyRate: true,
        }}
      />
    </Page>
  )
}

export {Cash}
