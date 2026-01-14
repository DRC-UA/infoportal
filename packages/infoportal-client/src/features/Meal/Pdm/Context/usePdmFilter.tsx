import {useMemo} from 'react'
import {seq, type Seq} from '@axanc/ts-utils'

import {useI18n} from '@/core/i18n'
import type {PdmData, PdmForm} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'

export const usePdmFilters = (data: Seq<PdmData<PdmForm>> = seq()) => {
  const {m} = useI18n()

  const shape = useMemo(
    () =>
      DataFilter.makeShape<PdmData<PdmForm>>({
        oblast: {
          icon: 'location_on',
          label: m.oblast,
          getValue: ({oblast}) => oblast,
          getOptions: () =>
            DataFilter.buildOptions(
              data
                .flatMap(({oblast}) => oblast!)
                .distinct((oblast) => oblast)
                .sort(),
            ),
        },
        office: {
          icon: 'share',
          label: m.office,
          getValue: ({office}) => office,
          getOptions: () =>
            DataFilter.buildOptions(
              data
                .flatMap(({office}) => office!)
                .distinct((office) => office)
                .sort(),
            ),
        },
        project: {
          icon: 'business',
          label: m.project,
          getValue: ({project}) => project,
          getOptions: () =>
            DataFilter.buildOptions(
              data
                .flatMap(({project}) => project!)
                .distinct((project) => project)
                .sort(),
            ),
        },
      }),
    [data, m],
  )

  return {shape}
}
