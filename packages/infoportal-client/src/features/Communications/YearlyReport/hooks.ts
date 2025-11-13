import {useMemo} from 'react'

import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'

import type {UseOptionsBuilder} from './types'

const useOptionsBuilder: UseOptionsBuilder = ({data, options}) => {
  const memoizedData = useMemo(() => data, [data])

  return options.reduce(
    (result, option) => ({
      ...result,
      [option]: () =>
        DatatableUtils.buildOptions(
          memoizedData
            .map((record) => record[option])
            .distinct((option) => option)
            .compact(),
        ),
    }),
    {} as ReturnType<UseOptionsBuilder>,
  )
}

export {useOptionsBuilder}
