import {useMemo} from 'react'

import {Legal_individual_aid} from 'infoportal-common'

import {appConfig} from '@/conf/AppConfig'
import {useI18n} from '@/core/i18n'
import type {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {DataFilter} from '@/shared/DataFilter/DataFilter'

const useLegalFilterShape = () => {
  const {m} = useI18n()

  return useMemo(
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
            return number_case?.map(({beneficiary_application_type}) => beneficiary_application_type!)
          },
          multiple: true,
          getOptions: () =>
            DataFilter.buildOptionsFromObject(Legal_individual_aid.options.beneficiary_application_type),
          label: m.legal.aidType.title,
        },
        caseStatus: {
          icon: 'fact_check',
          getValue: ({number_case}) => {
            return number_case?.map(({status_case}) => status_case!)
          },
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.status_case),
          label: m.legal.aidStatus,
        },
        caseCategory: {
          icon: 'check',
          getValue: ({number_case}) => {
            return number_case?.map(({category_issue}) => category_issue!)
          },
          multiple: true,
          getOptions: () => DataFilter.buildOptionsFromObject(Legal_individual_aid.options.category_issue),
          label: m.legal.aidCategory,
        },
      }),
    [m],
  )
}

export {useLegalFilterShape}
