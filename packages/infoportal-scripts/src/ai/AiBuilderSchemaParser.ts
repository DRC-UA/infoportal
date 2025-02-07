import {ActivityInfo, ActivityInfoSdk} from 'infoportal-common'
import {seq} from '@alexandreannic/ts-utils'
import {AiBuilder} from './AiBuilder'

export interface AiParsedOption {
  id: string
  label: string
}

export interface AiParsedSchema {
  id: string
  type: ActivityInfo.FormSchema['schema']['elements'][0]['type']
  optionsId?: string
  label: string
  options?: AiParsedOption[]
  optionsLength?: number
  required?: boolean
}

export class AiBuilderSchemParser {
  constructor(
    private args: AiBuilder.Args,
    private formTree: ActivityInfo.FormTree,
    private sdk: ActivityInfoSdk,
  ) {}

  readonly parse = async () => {
    const elements = this.getElements([this.args.formId])
    return Promise.all(elements.map(this.parseElements))
  }

  private readonly parseElements = async (elements: ActivityInfo.FormElement[]): Promise<AiParsedSchema[]> => {
    const allChoices = await Promise.all(elements.filter((_) => _.type === 'reference').map(this.getChoices))
    return elements.map((q) => {
      const choices = allChoices.find((_) => _.formId === q.id)
      return {
        id: q.id,
        type: q.type,
        optionsId: choices?.optionDefId,
        label: this.sanitalizeNonASCIIChar(q.label),
        options: choices?.choices ?? (q.type === 'enumerated' ? q.typeParameters.values : undefined),
        optionsLength: choices?.choices.length,
        required: q.required,
      }
    })
  }

  private readonly getChoices = async (
    schema: ActivityInfo.FormSchema['schema']['elements'][0],
  ): Promise<{
    label: string
    formId: ActivityInfo.Id
    formChoiceId: ActivityInfo.Id
    optionDefId: ActivityInfo.Id
    choices: any[]
  }> => {
    const qSettings = this.args.questionSettings[schema.label]
    const formChoiceId = schema.typeParameters.range![0].formId
    const getDefaultColumnId = (): ActivityInfo.Id => {
      return (
        this.formTree[formChoiceId].schema.elements.find(
          (_) => _.code === schema.code || (_.code ?? '').includes('ENG'),
        ) ?? this.formTree[formChoiceId].schema.elements[0]
      ).id
    }
    const getSelectedColumns = (): ActivityInfo.Id[] | undefined => {
      const columnsLabels = qSettings?.selectColumnByLabels
      if (!columnsLabels) return undefined
      return this.formTree[formChoiceId].schema.elements.filter((_) => columnsLabels.includes(_.label)).map((_) => _.id)
    }
    const optionDefIds = getSelectedColumns() ?? [getDefaultColumnId()]
    const choices = await this.sdk.fetchColumns(
      formChoiceId,
      optionDefIds,
      schema.validationCondition?.replace(schema.id + '.', ''),
    )
    const filteredChoices = (() => {
      const filter = qSettings?.filterChoices
      if (filter) return choices.filter((_) => filter(_.label))
      if (this.args.optionsLimit !== undefined) return choices.splice(0, this.args.optionsLimit)
      return choices
    })()
    return {
      label: schema.label,
      formId: schema.id,
      formChoiceId: formChoiceId,
      optionDefId: formChoiceId,
      choices: filteredChoices,
    }
  }

  private readonly getElements = (ids: ActivityInfo.Id[]): ActivityInfo.FormElement[][] => {
    const ignoredInputs = ['subform', 'section', 'calculated']
    const elements = ids
      .map((_) => this.formTree[_])
      .flatMap((_: ActivityInfo.FormSchema) => {
        return _.schema.elements
          .filter((_) => !this.args.questionSettings[_.label]?.skip)
          .map((_) => {
            if (this.args.questionSettings[_.label]?.skipChoices) {
              _.type = 'FREE_TEXT'
            }
            return _
          })
      })

    const questions = elements.filter((_) => !ignoredInputs.includes(_.type))

    const subFormsIds = seq(elements)
      .filter((_) => _.type === 'subform')
      // .filter(_ => !!_.typeParameters.formId)
      .map((_) => _.typeParameters?.formId ?? _.typeParameters?.range?.[0]?.formId)
      .compact()
      .get()

    return [questions, subFormsIds.length > 0 ? this.getElements(subFormsIds).flat() : []]
  }

  private readonly sanitalizeNonASCIIChar = (_: string) => _.replace(/[^\x00-\x7F]/g, ' ')
}
