import {useI18n} from '@/core/i18n'

export const usePlurals = (nounObject: Record<Intl.LDMLPluralRule, string>) => {
  const {currentLang} = useI18n()
  const localRules = new Intl.PluralRules(currentLang, {type: 'cardinal'})
  const nounMap = new Map(Object.entries(nounObject))

  return (number: number) => nounMap.get(localRules.select(number))
}
