import {seq} from '@alexandreannic/ts-utils'
import {KoboApiQuestionChoice, KoboApiQuestionSchema, KoboApiSchema, removeHtml} from './../../index'

export type KoboTranslateQuestion = (key: string) => string
export type KoboTranslateChoice = (key: string, choice?: string) => string

export namespace KoboSchemaHelper {

  export const getLabel = (q: {
    name: string,
    label?: string[]
  }, langIndex?: number): string => {
    return q.label !== undefined ? (q.label as any)[langIndex as any] ?? q.name : q.name
  }

  export type Translation = ReturnType<typeof buildTranslation>

  export type Index = ReturnType<typeof buildIndex>

  export interface Bundle {
    schemaHelper: Index
    schemaUnsanitized: KoboApiSchema
    translate: {
      question: KoboTranslateQuestion
      choice: KoboTranslateChoice
    }
  }

  export const buildIndex = ({
    schema,
  }: {
    schema: KoboApiSchema,
  }) => {
    const {groupSchemas, surveyCleaned} = isolateGroups(schema.content.survey)
    const sanitizedForm: KoboApiSchema = {
      ...schema,
      content: {
        ...schema.content,
        survey: surveyCleaned.map(_ => {
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
    const choicesTranslation: Record<string, Record<string, KoboApiQuestionChoice>> = {}
    schema.content.choices.forEach(choice => {
      if (!choicesTranslation[choice.list_name]) choicesTranslation[choice.list_name] = {}
      choicesTranslation[choice.list_name][choice.name] = choice
    })

    return {
      question: (questionName: string) => {
        // TODO try catch slow down perf
        try {
          return getLabel(questionIndex[questionName], langIndex)
        } catch (e) {
          return questionName
        }
      },
      choice: (questionName: string, choiceName?: string) => {
        const listName = questionIndex[questionName]?.select_from_list_name
        // TODO try catch slow down perf
        try {
          if (choiceName) return getLabel(choicesTranslation[listName!][choiceName], langIndex)
        } catch (e) {
          // console.warn(
          //   'Cannot translate this options. Maybe the question type has changed?',
          //   {question: questionIndex[questionName], listName, choiceName, choicesTranslation}
          // )
        }
        return ''
      },
    }
  }

  export const buildBundle = ({schema, langIndex = 0}: {schema: KoboApiSchema, langIndex?: number}) => {
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
      surveyCleaned,
      groupSchemas,
    }
  }
}
