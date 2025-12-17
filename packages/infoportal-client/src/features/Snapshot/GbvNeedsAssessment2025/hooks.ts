import {useCallback} from 'react'

import {Protection_gbv_capacity_needs_assessment_2026 as GbvCapacityNeedsAssessment} from 'infoportal-common'

import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'

const useTranslations = () => {
  const schemaContext = useKoboSchemaContext({autoFetch: ['protection_gbv_capacity_needs_assessment_2026']})
  const schema = schemaContext.byName['protection_gbv_capacity_needs_assessment_2026'].get

  const getOptionTranslations = useCallback(
    (option: keyof GbvCapacityNeedsAssessment.T | keyof typeof GbvCapacityNeedsAssessment.options) => {
      return schema?.helper.getOptionsByQuestionName(option).map(({name}) => ({
        value: name,
        label: schema.translate.choice(option, name) ?? name,
      }))
    },
    [schema],
  )

  return {
    translateOption: getOptionTranslations,
    translateField: schema?.translate.question,
  }
}

export {useTranslations}
