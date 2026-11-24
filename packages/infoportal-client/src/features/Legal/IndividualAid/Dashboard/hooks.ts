import {useMemo, useState} from 'react'
import {seq} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {capitalize, Period, PeriodHelper, pickPrioritizedAid, Legal_individual_aid} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useI18n} from '@/core/i18n'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {DataFilter} from '@/shared/DataFilter/DataFilter'

const useIndividualAidData = () => {
  const {m} = useI18n()
  const fetcherAnswer = useKoboAnswersContext().byName('legal_individual_aid')
  const [casePeriod, setCasePeriod] = useState<Partial<Period>>({})
  const [caseClosurePeriod, setCaseClosurePeriod] = useState<Partial<Period>>({})

  const [optionFilter, setOptionFilters] = useState<
    Partial<Record<keyof Legal_individual_aid.T, string[] | undefined>>
  >({})

  const data = seq(fetcherAnswer.get?.data) ?? []

  const filterShape = useMemo(
    () =>
      DataFilter.makeShape<InferTypedAnswer<'legal_individual_aid'>>({
        office: {
          icon: appConfig.icons.office,
          getValue: ({number_case}) => number_case?.map(({office}) => office!),
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.office),
          label: m.office,
        },
        oblast: {
          icon: 'location_on',
          getValue: ({oblast}) => oblast,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.oblast),
          label: m.oblast,
        },
        raion: {
          icon: 'location_on',
          getValue: ({raion}) => raion,
          getOptions: () => {
            const raionsOfSelectedOblasts =
              optionFilter.oblast?.map((oblast) => UaLocation.Oblast.findByName(capitalize(oblast))?.raions).flat() ??
              []
            const filteredRaions = Object.entries(Legal_individual_aid.options.raion).filter(([key, value]) =>
              raionsOfSelectedOblasts.map((raion) => raion?.en).includes(value),
            )
            return DataFilter.buildOptionsFromObject(Object.fromEntries(filteredRaions))
          },
          label: m.raion,
        },
        project: {
          icon: 'inventory_2',
          getValue: ({number_case}) => number_case?.map(({project}) => project!),
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.project),
          label: m.project,
        },
        registeredBy: {
          icon: 'assignment_ind',
          getValue: ({number_case}) => number_case?.map(({first_lawyer}) => first_lawyer!),
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.another_lawyer),
          label: m.legal.registeredBy,
        },
        applicationType: {
          icon: 'cases',
          getValue: ({number_case}) => {
            return number_case?.map(({beneficiary_application_type}) => beneficiary_application_type!).flat()
          },
          multiple: true,
          getOptions: () => {
            return DataFilter.buildOptionsFromObject(Legal_individual_aid.options.beneficiary_application_type)
          },
          label: m.legal.aidType.title,
        },
        caseStatus: {
          icon: 'fact_check',
          getValue: ({number_case}) => number_case?.map(({status_case}) => status_case!),
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.status_case),
          label: m.legal.aidStatus,
        },
        caseCategory: {
          icon: 'check',
          getValue: ({number_case}) => number_case?.map(({category_issue}) => category_issue!),
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.category_issue),
          label: m.legal.aidCategory,
        },
      }),
    [m, data],
  )

  const dataFiltered = useMemo(() => {
    return DataFilter.filterData(data, filterShape, optionFilter)
      .map(({number_case, ...record}) => {
        const prioritizedAid = pickPrioritizedAid(number_case).aid
        // let's ignore lower priority cases:
        return {
          ...record,
          number_case: prioritizedAid ? [prioritizedAid] : undefined,
        }
      })
      .filter(({number_case}) => {
        return (
          PeriodHelper.isDateIn(casePeriod, number_case?.[0]?.date_case) &&
          PeriodHelper.isDateIn(caseClosurePeriod, number_case?.[0]?.date_case_closure)
        )
      })
  }, [data, filterShape, optionFilter, casePeriod, caseClosurePeriod])

  return {
    data,
    dataFiltered,
    fetcherAnswer,
    filterShape,
    optionFilter,
    setOptionFilters,
    casePeriod,
    setCasePeriod,
    caseClosurePeriod,
    setCaseClosurePeriod,
  }
}

export {useIndividualAidData}
