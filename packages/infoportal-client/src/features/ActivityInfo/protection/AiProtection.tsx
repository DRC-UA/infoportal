import type {FC} from 'react'

import {AiTable} from '@/features/ActivityInfo/shared'

import {useVaDataColumns} from './hooks'

const AiVaTable: FC = () => {
  const {data, columns, period, setPeriod, loading} = useVaDataColumns()
  console.log(data)
  return <AiTable {...{data, columns, period, setPeriod, loading}} />
}

export default AiVaTable
