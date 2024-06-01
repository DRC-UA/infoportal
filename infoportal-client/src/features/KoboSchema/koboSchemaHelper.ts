import {mapFor, seq} from '@alexandreannic/ts-utils'
import {KoboApiQuestionChoice, KoboApiQuestionSchema, KoboApiSchema, removeHtml} from '@infoportal-common'
import {Messages} from '@/core/i18n/localization/en'
import {KoboTranslateChoice, KoboTranslateQuestion} from '@/features/KoboSchema/KoboSchemaContext'

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
    m
  }: {
    schema: KoboApiSchema,
    m: Messages
  }) => {
    const customSchema = {
      id: {
        name: 'id',
        label: mapFor(schema.content.translations.length, () => 'ID'),
        type: 'text' as const,
        $kuid: 'id',
        $autoname: 'id',
        $qpath: 'id',
        $xpath: 'id',
      },
      submissionTime: {
        name: 'submissionTime',
        label: mapFor(schema.content.translations.length, () => m.submissionTime),
        type: 'date' as const,
        $kuid: 'submissionTime',
        $autoname: 'submissionTime',
        $qpath: 'submissionTime',
        $xpath: 'submissionTime',
      },
      submittedBy: {
        name: 'submitted_by',
        label: mapFor(schema.content.translations.length, () => m.submittedBy),
        type: 'text' as const,
        $kuid: 'submitted_by',
        $autoname: 'submitted_by',
        $qpath: 'submitted_by',
        $xpath: 'submitted_by',
      },
    }
    const {groupSchemas, surveyCleaned} = isolateGroups(schema.content.survey)

    const sanitizedForm: KoboApiSchema = {
      ...schema,
      content: {
        ...schema.content,
        survey: [
          customSchema.id,
          customSchema.submissionTime,
          ...surveyCleaned.map(_ => {
            return {
              ..._,
              label: _.label?.map(_ => removeHtml(_))
            }
          }),
          customSchema.submittedBy,
        ]
      }
    }

    const choicesIndex = seq(schema.content.choices).groupBy(_ => _.list_name)
    const questionIndex = seq([
      customSchema.id,
      customSchema.submissionTime,
      ...schema.content.survey,
      customSchema.submittedBy,
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
    translateQuestion: KoboTranslateQuestion
    translateChoice: KoboTranslateChoice,
  } => {
    const choicesTranslation: Record<string, Record<string, KoboApiQuestionChoice>> = {}
    schema.content.choices.forEach(choice => {
      if (!choicesTranslation[choice.list_name]) choicesTranslation[choice.list_name] = {}
      choicesTranslation[choice.list_name][choice.name] = choice
    })

    return {
      translateQuestion: (questionName: string) => {
        // TODO try catch slow down perf
        try {
          return getLabel(questionIndex[questionName], langIndex)
        } catch (e) {
          return questionName
        }
      },
      translateChoice: (questionName: string, choiceName?: string) => {
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

  export const buildBundle = ({m, schema, langIndex = 0}: {m: Messages, schema: KoboApiSchema, langIndex?: number}) => {
    const schemaHelper = KoboSchemaHelper.buildIndex({schema: schema, m})
    const {translateQuestion, translateChoice} = buildTranslation({
      schema: schema,
      langIndex,
      questionIndex: schemaHelper.questionIndex,
    })
    return {
      schemaUnsanitized: schema,
      schemaHelper: schemaHelper,
      translate: {
        choice: translateChoice,
        question: translateQuestion,
      },
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
