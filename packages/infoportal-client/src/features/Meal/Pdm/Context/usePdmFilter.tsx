import {useMemo, useState} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useI18n} from '@/core/i18n'
import {PdmData, PdmForm} from '@/features/Meal/Pdm/Context/MealPdmContext'
import {Seq, seq} from '@alexandreannic/ts-utils'
import {appConfig} from '@/conf/AppConfig'

export const usePdmFilters = (data?: Seq<PdmData<PdmForm>>) => {
  const {m} = useI18n()

  const shape = useMemo(() => {
    const d = data ?? seq([])
    return DataFilter.makeShape<PdmData<PdmForm>>({
      oblast: {
        icon: 'location_on',
        label: m.oblast,
        getValue: _ => _.oblast,
        getOptions: () =>
          DataFilter.buildOptions(d.flatMap(_ => _.oblast!).distinct(_ => _).sort()),
      },
      office: {
        icon: 'share',
        label: m.office,
        getValue: _ => _.office,
        getOptions: () =>
          DataFilter.buildOptions(d.flatMap(_ => _.office!).distinct(_ => _).sort()),
      },
      projects: {
        icon: appConfig.icons.sector,
        label: m.donor,
        getValue: _ => _.project,
        getOptions: () =>
          DataFilter.buildOptions(d.flatMap(_ => _.project!).distinct(_ => _).sort()),
      },
    })
  }, [data])

  const [filters, setFilters] = useState<DataFilter.InferShape<typeof shape>>({})

  return {
    shape,
    filters,
    setFilters,
  }
}
