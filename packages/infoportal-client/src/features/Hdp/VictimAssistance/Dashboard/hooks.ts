import {useEffect, useMemo, useState} from 'react'
import {map, seq} from '@axanc/ts-utils'

import {Va_bio_tia, KoboIndex, Period, PeriodHelper} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useI18n} from '@/core/i18n'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher} from '@/shared/hook/useFetcher'

export type UseVictimAssistanceData = ReturnType<typeof useVictimAssistanceData>

export const useVictimAssistanceData = () => {
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
        project: {
          icon: appConfig.icons.project,
          multiple: true,
          getValue: ({tia_assesment}) =>
            seq(tia_assesment)
              .map(({project}) => project)
              .compact()
              .get(),
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
      .map((record) =>
        optionFilter.project && optionFilter.project.length > 0
          ? {
              ...record,
              tia_assesment: record.tia_assesment?.filter(
                ({project}) => project && optionFilter.project?.includes(project),
              ),
            }
          : record,
      )
      .filter(({date}) => PeriodHelper.isDateIn(period, date))
  }, [data, filterShape, optionFilter])

  useEffect(() => {
    map(fetcherPeriod.get, setPeriod)
  }, [fetcherPeriod.get])

  return {
    data,
    dataFiltered,
    filterShape,
    fetcherAnswer,
    fetcherPeriod,
    optionFilter,
    setOptionFilters,
    period,
    setPeriod,
  }
}
