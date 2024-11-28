import {KoboApiQuestionSchema, KoboApiSchema} from './sdk/v2/type/KoboApiForm'

/**
 * Track question name from Kobo submissions and trigger specific actions accordingly
 */
export enum KoboCustomDirectives {
  TRIGGER_EMAIL = 'TRIGGER_EMAIL',
}

export const koboCustomDirectivePrefix = '__IP__'

export const makeKoboCustomDirective = (_: keyof typeof KoboCustomDirectives) => koboCustomDirectivePrefix + _

type Directive = {directive: KoboCustomDirectives, question: KoboApiQuestionSchema}

export const getKoboCustomDirectives = (schema: KoboApiSchema): Directive[] => {
  const collected: Directive[] = []
  for (let i = 0; i < schema.content.survey.length; i++) {
    if (['start', 'end'].includes(schema.content.survey[i].name!)) i++
    else {
      const directive = getKoboCustomDirective(schema.content.survey[i])
      if (directive) collected.push(directive)
      else break
    }
  }
  return collected
}

export const getKoboCustomDirective = (question: KoboApiQuestionSchema): Directive | undefined => {
  if (!question.name) return
  const directive = question.name.match(new RegExp(`^${koboCustomDirectivePrefix}([A-Z_]+)$`))?.[1]
  return {directive: (KoboCustomDirectives as any)[directive!], question}
}