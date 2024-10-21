import {KoboApiQuestionSchema, KoboApiSchema} from 'infoportal-common'

export enum KoboCustomDirectives {
  TRIGGER_EMAIL = 'TRIGGER_EMAIL',
}

type Directive = {directive: KoboCustomDirectives, question: KoboApiQuestionSchema}

export const getKoboCustomDirectives = (schema: KoboApiSchema): Directive[] => {
  const collected: Directive[] = []
  for (let i = 0; i < schema.content.survey.length; i++) {
    if (['start', 'end'].includes(schema.content.survey[i].name)) i++
    else {
      const directive = getKoboCustomDirective(schema.content.survey[i])
      if (directive) collected.push(directive)
      else break
    }
  }
  return collected
}

export const getKoboCustomDirective = (question: KoboApiQuestionSchema): Directive | undefined => {
  const directive = question.$qpath.match(/^IP\(([A-Z_]+)\)$/)?.[1]
  return {directive: (KoboCustomDirectives as any)[directive!], question}
}