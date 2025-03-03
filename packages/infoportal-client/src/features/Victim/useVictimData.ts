import {useEffect, useMemo, useState} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {useI18n} from '@/core/i18n'
import {KoboIndex, Period, PeriodHelper} from 'infoportal-common'
import {map, seq} from '@axanc/ts-utils'
import {differenceInDays, subDays} from 'date-fns'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Va_bio_tia} from 'infoportal-common'
import {previousPeriodDeltaDays} from '@/features/Safety/IncidentsDashboard/useSafetyIncidentData'
import {appConfig} from '@/conf/AppConfig'

export type UseVictimData = ReturnType<typeof useVictimData>

export const useVictimData = () => {
  const {m} = useI18n()
  const {api} = useAppSettings()
  const fetcherAnswer = useKoboAnswersContext().byName('va_bio_tia')
  const fetcherPeriod = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('va_bio_tia').id))

  const filterShape = useMemo(
    () =>
      DataFilter.makeShape<InferTypedAnswer<'va_bio_tia'>>({
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
  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const [period, setPeriod] = useState<Partial<Period>>({})

  const data = seq(fetcherAnswer.get?.data) ?? []

  const dataFiltered = useMemo(() => {
    return DataFilter.filterData(data, filterShape, optionFilter)
  }, [data, filterShape, optionFilter])

  const dataFilteredLastPeriod = useMemo(
    () =>
      map(period.start, period.end, (start, end) => {
        const lastPeriod = {
          start: start,
          end: subDays(end, previousPeriodDeltaDays),
        }
        if (differenceInDays(end, start) <= previousPeriodDeltaDays) return
        return data.filter((_) => PeriodHelper.isDateIn(lastPeriod, _.date))
      }),
    [dataFiltered],
  )

  useEffect(() => {
    map(fetcherPeriod.get, setPeriod)
  }, [fetcherPeriod.get])

  return {
    data,
    dataFiltered,
    dataFilteredLastPeriod,
    filterShape,
    fetcherAnswer,
    fetcherPeriod,
    optionFilter,
    setOptionFilters,
    period,
    setPeriod,
  }
}
