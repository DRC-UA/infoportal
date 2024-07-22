import {seq} from '@alexandreannic/ts-utils'
import {KoboApiQuestionSchema, KoboApiSchema, removeHtml} from './../../index'

export type KoboTranslateQuestion = (key: string) => string
export type KoboTranslateChoice = (key: string, choice?: string) => string

export namespace KoboSchemaHelper {

  export const getLabel = (q: {
    name: string,
    label?: string[]
  }, langIndex?: number): string => {
    return q.label !== undefined ? (q.label as any)[langIndex as any] ?? q.name : q.name
  }

  // export type Index = {
  //   groupsCount: number
  //   groupSchemas: Record<string, KoboApiQuestionSchema[]>
  //   schema: KoboApiSchema
  //   sanitizedSchema: KoboApiSchema,
  //   choicesIndex: Record<string, KoboApiQuestionChoice>
  //   questionIndex: Record<string, KoboApiQuestionSchema>
  //   getOptionsByQuestionName: (_:string) => KoboApiQuestionChoice
  // }

  export type Translation = ReturnType<typeof buildTranslation>

  export type Index = ReturnType<typeof buildIndex>

  export interface Bundle {
    schemaHelper: Index
    schemaUnsanitized: KoboApiSchema
    translate: Translation
  }

  export const buildIndex = ({
    schema,
  }: {
    schema: KoboApiSchema,
  }) => {
    const {groupSchemas, surveySanitized} = isolateGroups(schema.content.survey)
    const sanitizedForm: KoboApiSchema = {
      ...schema,
      content: {
        ...schema.content,
        survey: surveySanitized.filter(_ => !(_.type === 'note' && !_.calculation)).map(_ => {
          return {
            ..._,
            label: _.label?.map(_ => removeHtml(_))
          }
        }),
      }
    }

    const choicesIndex = seq(schema.content.choices).groupBy(_ => _.list_name)
    const questionIndex = seq([
      ...schema.content.survey,
    ]).reduceObject<Record<string, KoboApiQuestionSchema>>(_ => [_.name, _])

    const getOptionsByQuestionName = (qName: string) => {
      const listName = questionIndex[qName].select_from_list_name
      return choicesIndex[listName!]
    }

    return {
      groupsCount: Object.keys(groupSchemas).length,
      groupSchemas,
      schema: schema,
      sanitizedSchema: sanitizedForm,
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
    schema: KoboApiSchema,
    langIndex: number
    questionIndex: Index['questionIndex']
  }): {
    question: KoboTranslateQuestion
    choice: KoboTranslateChoice,
  } => {
    const questionsTranslation: Record<string, string> = {}
    const choicesTranslation: Record<string, Record<string, string>> = {}
    schema.content.survey.forEach(_ => {
      questionsTranslation[_.name] = _.label?.[langIndex] ?? _.name
    })
    schema.content.choices.forEach(choice => {
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
    const schemaHelper = KoboSchemaHelper.buildIndex({schema: schema})
    const translate = buildTranslation({
      schema: schema,
      langIndex,
      questionIndex: schemaHelper.questionIndex,
    })
    return {
      schemaUnsanitized: schema,
      schemaHelper: schemaHelper,
      translate,
    }
  }

  const isolateGroups = (survey: KoboApiSchema['content']['survey']) => {
    const surveyCleaned: KoboApiQuestionSchema[] = []
    const groupSchemas: Record<string, KoboApiQuestionSchema[]> = {}
    for (let i = 0; i < survey.length; i++) {
      surveyCleaned.push(survey[i])
      if (survey[i].type === 'begin_repeat') {
        const groupname = survey[i].name
        groupSchemas[groupname] = []
        while (survey[i].type !== 'end_repeat') {
          i++
          groupSchemas[groupname].push(survey[i])
        }
      }
    }
    return {
      surveySanitized: surveyCleaned,
      groupSchemas,
    }
  }
}
