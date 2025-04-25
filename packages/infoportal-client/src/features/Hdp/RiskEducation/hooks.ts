import {useMemo, useState, useEffect} from 'react'
import {seq} from '@axanc/ts-utils'
import {format, isValid, subMonths, startOfMonth, endOfMonth} from 'date-fns'

import type {Period} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher} from '@/shared/hook/useFetcher'

export type UseRiskEducationData = ReturnType<typeof useRistEducationData>

export const useRistEducationData = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const monthAgo = subMonths(new Date(), 1)
  const [period, setPeriod] = useState<Partial<Period>>({
    start: startOfMonth(monthAgo),
    end: endOfMonth(monthAgo),
  })
  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const filterShape = useMemo(
    () =>
      DataFilter.makeShape({
        office: {
          icon: appConfig.icons.office,
          getValue: ({office_name_short}) => office_name_short,
          getOptions: () => {
            return new Set(data.map(({office_name_short}) => office_name_short))
              .values()
              .toArray()
              .map((value) => ({value, label: value}))
          },
          label: m.office,
        },
        // oblast: {
        //   icon: 'location_on',
        //   getValue: (_) => _.oblast,
        //   getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.case_oblast),
        //   label: m.oblast,
        // },
        // oblast: {
        //   icon: 'location_on',
        //   getValue: (_) => _.raion,
        //   getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.case_oblast),
        //   label: m.raion,
        // },
        // donor: {
        //   icon: appConfig.icons.donor,
        //   getValue: (_) =>
        //     seq(_.tia_assesment)
        //       .map((_) => _.project)
        //       .compact()
        //       .get()
        //       .join(', '),
        //   getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.project),
        //   label: m.project,
        // },
      }),
    [m],
  )

  const fetcher = useFetcher(() => {
    return api.hdp.fetchRiskEducation({
      filters: {
        period: {
          start: !!period.start && isValid(period.start) && format(period.start, 'yyyy-MM-dd'),
          end: !!period.end && isValid(period.end) && format(period.end, 'yyyy-MM-dd'),
        },
        // ...optionFilter, // filters will go here
      },
    })
  })

  const data = useMemo(() => seq(fetcher.get?.recordset) ?? [], [fetcher.get])

  useEffect(() => {
    fetcher.fetch()
  }, [])

  useEffect(() => {
    fetcher.fetch({force: true, clean: true}).then((data) => {
      console.log(
        seq(data.recordset)
          .distinct(({office_name_short}) => office_name_short)
          .map(({office_name_short}) => office_name_short),
      )
    })
  }, [period])

  return {
    data,
    fetcher,
    filterShape,
    period,
    setPeriod,
    optionFilter,
    setOptionFilters,
  }
}
