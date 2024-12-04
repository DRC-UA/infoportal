import {seq} from '@alexandreannic/ts-utils'
import {KoboApiColType, KoboApiQuestionSchema, KoboApiSchema, removeHtml} from './../../index'
import {KoboSchemaRepeatHelper} from './koboSchemaRepeatHelper'
import {Kobo} from 'kobo-sdk/Kobo'

export type KoboTranslateQuestion = (key: string) => string
export type KoboTranslateChoice = (key: string, choice?: string) => string

export const ignoredColType: Set<KoboApiColType> = new Set([
  'end_group',
  'end_repeat',
  'deviceid',
])

export namespace KoboSchemaHelper {

  export const getLabel = (q: {
    name: string,
    label?: string[]
  }, langIndex?: number): string => {
    return q.label !== undefined ? (q.label as any)[langIndex as any] ?? q.name : q.name
  }

  export type Translation = ReturnType<typeof buildTranslation>

  export type Helper = ReturnType<typeof buildHelper>

  export interface Bundle {
    helper: Helper
    schema: KoboApiSchema
    schemaFlatAndSanitized: KoboApiQuestionSchema[]
    schemaSanitized: KoboApiSchema
    translate: Translation
  }

  const sanitizeQuestions = (questions: KoboApiQuestionSchema[]): KoboApiQuestionSchema[] => {
    return questions.filter(_ => !ignoredColType.has(_.type) && !(
      _.type === 'note' && !_.calculation ||
      _.type === 'calculate' && !_.label
    )).map(_ => ({
      ..._,
      label: _.label?.map(_ => removeHtml(_))
    }))
  }

  export const buildHelper = ({
    schema,
  }: {
    schema: KoboApiSchema,
  }) => {
    const groupHelper = new KoboSchemaRepeatHelper(schema.content.survey)
    const choicesIndex = seq(schema.content.choices).groupBy(_ => _.list_name)
    const questionIndex = seq([
      ...schema.content.survey,
    ]).compactBy('name').reduceObject<Record<string, KoboApiQuestionSchema>>(_ => [_.name, _])

    const getOptionsByQuestionName = (qName: string) => {
      const listName = questionIndex[qName].select_from_list_name
      return choicesIndex[listName!]
    }

    return {
      group: groupHelper,
      choicesIndex,
      questionIndex,
      getOptionsByQuestionName,
    }
  }

  export const buildTranslation = ({
    schema,
    langIndex,
    questionIndex,
  }: {
    schema: Kobo.Form,
    langIndex: number
    questionIndex: Helper['questionIndex']
  }): {
    question: KoboTranslateQuestion
    choice: KoboTranslateChoice,
  } => {
    const questionsTranslation: Record<string, string> = {}
    const choicesTranslation: Record<string, Record<string, string>> = {}
    seq(schema.content.survey).compactBy('name').forEach(_ => {
      questionsTranslation[_.name] = _.label?.[langIndex] ?? _.name
    })
    ;(schema.content.choices ?? []).forEach(choice => {
      if (!choicesTranslation[choice.list_name]) choicesTranslation[choice.list_name] = {}
      choicesTranslation[choice.list_name][choice.name] = choice.label?.[langIndex] ?? choice.name
    })
    return {
      question: (questionName: string) => {
        return questionsTranslation[questionName]
      },
      choice: (questionName: string, choiceName?: string) => {
        if (!choiceName) return ''
        return choicesTranslation[questionIndex[questionName]?.select_from_list_name!]?.[choiceName] ?? choiceName
      },
    }
  }

  export const buildBundle = ({schema, langIndex = 0}: {schema: KoboApiSchema, langIndex?: number}): Bundle => {
    const helper = buildHelper({schema: schema})
    const translate = buildTranslation({
      schema: schema,
      langIndex,
      questionIndex: helper.questionIndex,
    })
    return {
      schema: schema,
      schemaFlatAndSanitized: sanitizeQuestions(helper.group.questionsFlat),
      schemaSanitized: {
        ...schema,
        content: {
          ...schema.content,
          survey: sanitizeQuestions(schema.content.survey),
        }
      },
      helper,
      translate,
    }
  }
}
