import {useMemo, useState, useEffect} from 'react'
import {seq} from '@axanc/ts-utils'
import {format, isValid, subMonths, startOfMonth, endOfMonth, endOfDay} from 'date-fns'

import {Period} from 'infoportal-common'

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
  const fetcher = useFetcher(() => {
    return api.hdp.fetchRiskEducation({
      filters: {
        period: {
          start: !!period.start && isValid(period.start) && format(period.start, 'yyyy-MM-dd'),
          end: !!period.end && isValid(period.end) && format(period.end, 'yyyy-MM-dd'),
        },
      },
    })
  })
  const data = useMemo(() => seq(fetcher.get?.recordset) ?? [], [fetcher.get])

  const filterShape = useMemo(
    () =>
      DataFilter.makeShape({
        office: {
          icon: appConfig.icons.office,
          getValue: (_) => _.office_bio,
          getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.office),
          label: m.office,
        },
        oblast: {
          icon: 'location_on',
          getValue: (_) => _.place_oblast,
          getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.case_oblast),
          label: m.oblast,
        },
        donor: {
          icon: appConfig.icons.donor,
          getValue: (_) =>
            seq(_.tia_assesment)
              .map((_) => _.project)
              .compact()
              .get()
              .join(', '),
          getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.project),
          label: m.project,
        },
        status: {
          icon: 'check_circle',
          getValue: (_) => _.case_status,
          getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.case_status),
          label: m.status,
        },
        statusCase: {
          icon: 'warning',
          getValue: (_) => _.bio_injured_dead,
          getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.case_injured_dead),
          label: m.case,
        },
        incident: {
          icon: 'preview',
          getValue: (_) => _.bio_type_incident,
          getOptions: () => DataFilter.buildOptionsFromObject(Va_bio_tia.options.bio_type_incident),
          label: m.safety.incident,
        },
      }),
    [m],
  )

  useEffect(() => {
    fetcher.fetch()
  }, [])

  useEffect(() => {
    fetcher.fetch({force: true, clean: true})
  }, [period])

  return {
    data,
    fetcher,
    filterShape,
    period,
    setPeriod,
  }
}
