import {useCallback, useEffect} from 'react'

import {Protection_gbv_capacity_needs_assessment_2026 as GbvCapacityNeedsAssessment} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'

const useTranslations = () => {
  const {currentLang} = useI18n()
  const {byName, setLangIndex} = useKoboSchemaContext({autoFetch: ['protection_gbv_capacity_needs_assessment_2026']})
  const schema = byName['protection_gbv_capacity_needs_assessment_2026'].get
  const getOptionTranslations = useCallback(
    (option: keyof GbvCapacityNeedsAssessment.T | keyof typeof GbvCapacityNeedsAssessment.options) => {
      return schema?.helper.getOptionsByQuestionName(option).map(({name}) => ({
        value: name,
        label: schema.translate.choice(option, name) ?? name,
      }))
    },
    [schema],
  )

  useEffect(() => {
    setLangIndex(currentLang === 'en' ? 0 : 1)
  }, [currentLang])

  return {
    translateOption: getOptionTranslations,
    translateField: schema?.translate.question,
  }
}

export {useTranslations}
