import {useEffect, useCallback} from 'react'
import {match} from '@axanc/ts-utils'

import {type KoboFormName} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'

const usePlurals = (nounObject: Record<Intl.LDMLPluralRule, string>) => {
  const {currentLang} = useI18n()
  const localRules = new Intl.PluralRules(currentLang, {type: 'cardinal'})
  const nounMap = new Map(Object.entries(nounObject))

  return (number: number) => nounMap.get(localRules.select(number))
}

const useKoboTranslations = (formName: KoboFormName, langCases: {uk: 0; en: 1} | {uk: 1; en: 0} = {uk: 0, en: 1}) => {
  const {currentLang} = useI18n()
  const schemaContext = useKoboSchemaContext({autoFetch: [formName]})
  const gbvConceptsSchema = schemaContext.byName[formName].get

  const getOptionTranslations = useCallback(
    (option: string) => {
      return gbvConceptsSchema?.helper.getOptionsByQuestionName(option)?.map(({name}) => ({
        value: name,
        label: gbvConceptsSchema.translate.choice(option, name) ?? name,
      }))
    },
    [gbvConceptsSchema],
  )

  useEffect(() => {
    schemaContext.setLangIndex(match(currentLang).cases(langCases).exhaustive())
  }, [currentLang])

  return {
    translateOption: getOptionTranslations,
    translateField: gbvConceptsSchema?.translate.question,
  }
}

export {useKoboTranslations, usePlurals}
