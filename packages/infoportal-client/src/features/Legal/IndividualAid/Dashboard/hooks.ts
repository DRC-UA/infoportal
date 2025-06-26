import {useMemo, useState} from 'react'
import {seq} from '@axanc/ts-utils'

import {Period, PeriodHelper, Legal_individual_aid} from 'infoportal-common'

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

  const filterShape = useMemo(
    () =>
      DataFilter.makeShape<InferTypedAnswer<'legal_individual_aid'>>({
        oblast: {
          icon: 'location_on',
          getValue: ({oblast}) => oblast,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.oblast),
          label: m.oblast,
        },
        office: {
          icon: appConfig.icons.office,
          getValue: ({number_case}) => number_case?.map(({office}) => office!),
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.office),
          label: m.office,
        },
        project: {
          icon: 'inventory_2',
          getValue: ({number_case}) => number_case?.map(({project}) => project!),
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.project),
          label: m.project,
        },
        applicationType: {
          icon: 'cases',
          getValue: ({number_case}) => {
            return number_case?.map(({beneficiary_application_type}) => beneficiary_application_type!)
          },
          multiple: true,
          getOptions: () =>
            DataFilter.buildOptionsFromObject(Legal_individual_aid.options.beneficiary_application_type),
          label: m.legal.caseType.title,
        },
        caseStatus: {
          icon: 'fact_check',
          getValue: ({number_case}) => {
            return number_case?.map(({status_case}) => status_case!)
          },
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.status_case),
          label: m.legal.caseStatus,
        },
        caseCategory: {
          icon: 'check',
          getValue: ({number_case}) => {
            return number_case?.map(({category_issue}) => category_issue!)
          },
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.category_issue),
          label: m.legal.caseCategory,
        },
      }),
    [m],
  )
  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})

  const data = seq(fetcherAnswer.get?.data) ?? []

  const dataFiltered = useMemo(() => {
    return DataFilter.filterData(data, filterShape, optionFilter)
      .map((record) => ({
        ...record,
        number_case:
          record.number_case?.filter(({date_case, date_case_closure}) => {
            return (
              PeriodHelper.isDateIn(casePeriod, date_case) &&
              PeriodHelper.isDateIn(caseClosurePeriod, date_case_closure)
            )
          }) ?? [],
      }))
      .filter((record) => record.number_case.length > 0)
  }, [data, filterShape, optionFilter, casePeriod, caseClosurePeriod])

  return {
    data,
    dataFiltered,
    filterShape,
    fetcherAnswer,
    optionFilter,
    setOptionFilters,
    casePeriod,
    setCasePeriod,
    caseClosurePeriod,
    setCaseClosurePeriod,
  }
}

export {useIndividualAidData}
