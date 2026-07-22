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
  const formSchema = schemaContext.byName[formName].get

  const translateOption = useCallback(
    (option: string) => {
      return formSchema?.helper.getOptionsByQuestionName(option)?.map(({name}) => ({
        value: name,
        label: formSchema.translate.choice(option, name) ?? name,
      }))
    },
    [formSchema],
  )

  const translateField = useCallback(
    (key: string): string => {
      const translateFunction = formSchema?.translate.question

      if (!translateFunction) return 'Loading form scheme translations...'

      return translateFunction(key) ?? `Failed to translate the "${key}" field`
    },
    [formSchema?.translate.question],
  )

  const translateLabels = (option: string) =>
    translateOption(option)?.reduce(
      (result, {value, label}) => ({
        ...result,
        [value]: label,
      }),
      {} as Record<string, string>,
    )

  useEffect(() => {
    schemaContext.setLangIndex(match(currentLang).cases(langCases).exhaustive())
  }, [currentLang])

  return {
    translateOption,
    translateField,
    translateLabels,
  }
}

export {useKoboTranslations, usePlurals}
