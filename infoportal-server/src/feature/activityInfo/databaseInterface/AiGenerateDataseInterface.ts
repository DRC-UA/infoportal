import {AiProtectionHhs} from '../sandbox/AiProtectionHhs'
import {ActivityInfoSdk} from '../sdk/ActivityInfoSdk'
import {activityInfoForms, AIID, FormDesc, FormDescs} from '../model/ActivityInfo'
import {fnSwitch, seq} from '@alexandreannic/ts-utils'
import fs from 'fs'
import {capitalize} from '@infoportal-common'
import {appConf} from '../../../core/conf/AppConf'
import columnsListMap = AiProtectionHhs.columnsListMap
import {getObj} from '../../../helper/Utils'

export const ActivityInfoBuildType = {
  washRMM: () => generateDatabaseInterface({
    optionsLimit: 200000,
    formId: activityInfoForms.washRmm,
    name: 'washRMM',
    ignoredQuestions: [
      'Total Reached (All Population Groups)',
    ],
    skipQuestion: [
      /Collective Sites/,
      /Total Reached \(No Disaggregation\)/,
      /Oblast/,
      /Raion/,
      /Implementing Partner/,
    ],
    skipQuestionsOptions: [
      /Sub-Implementing Partner/,
      /Hormada/,
      /Settlement/,
    ],
    pickSpecificOptionSet: {
      cg7insdlee1c3h0s: 'cbc6ncylee1d4ulu',
      c6q8ni3lepq77hp3: 'cocmup7lepq89f38',
    },
    filterOptions: {
      'Organisation': _ => {
        return _.includes('Danish Refugee Council')
      },
      'Implementing Partner': _ => {
        return _.includes('Danish Refugee Council')
      }
    }
  }),

  snfiRmm: () => generateDatabaseInterface({
    formId: activityInfoForms.snfiRmm,
    name: 'snfiRmm',
    skipQuestionsOptions: [
      /Oblast/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ],
    filterOptions: {
      'Reporting Partner': _ => {
        return _.includes('Danish Refugee Council')
      },
      'Implementing Partner': _ => {
        return _.includes('Danish Refugee Council')
      }
    }
  }),

  generalProtectionRmm: () => generateDatabaseInterface({
    formId: activityInfoForms.generalProtectionRmm,
    name: 'generalProtectionRmm',
  }),

  mpcaRmm: () => generateDatabaseInterface({
    optionsLimit: 200,
    formId: activityInfoForms.mpcaRmm,
    name: 'mpcaRmm',
    ignoredQuestions: [],
    skipQuestion: [
      /MPCA Indicators/,
      // /Implementing Partner/,
      // /MPCA Indicators/,
    ],
    skipQuestionsOptions: [
      /Sub-Implementing Partner/,
      /OblastIndex/,
      /Raion/,
      /Hormada/,
      /Settlement/,
    ],
    pickSpecificOptionSet: {},
    filterOptions: {
      'Partner Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
    }
  })
}

interface AiFormOption {
  id: string
  label: string
}

interface AIFormInformation {
  id: string
  type: FormDesc['schema']['elements'][0]['type']
  optionsId?: string
  label: string
  options?: AiFormOption[]
  optionsLength?: number
  required?: boolean
}

const generateDatabaseInterface = async ({
  formId,
  name,
  optionsLimit = 20,
  ignoredQuestions = [],
  pickSpecificOptionSet = {},
  skipQuestionsOptions = [],
  filterOptions = {},
  skipQuestion = [],
  outputDir = appConf.rootProjectDir + '/src/script/output/activityInfo',
}: {
  optionsLimit?: number
  ignoredQuestions?: string[]
  formId: string,
  name: string,
  skipQuestion?: RegExp[]
  pickSpecificOptionSet?: Record<AIID, AIID>
  skipQuestionsOptions?: RegExp[],
  filterOptions?: Record<string, (label: string) => boolean>
  outputDir?: string
}) => {
  name = capitalize(name)
  const x = new ActivityInfoSdk()
  const formDesc = await x.fetchForm(formId)

  const getElements = (f: FormDescs, ids: AIID[]): FormDesc['schema']['elements'] => {
    const ignoredInputs = [
      'subform',
      'section',
      'calculated',
    ]
    const elements = ids.map(_ => f[_]).flatMap(_ => {
      return _.schema.elements
        .filter(_ => !skipQuestion.find(p => p.test(_.label)))
        .map(_ => {
          if (isFetchingQuestionOptionBlocked(_.label)) {
            _.type = 'FREE_TEXT'
          }
          return _
        })
    })

    const questions = elements
      .filter(_ => !ignoredInputs.includes(_.type))
      .filter(_ => !ignoredQuestions.includes(_.label))

    const subFormsIds = seq(elements)
      // .filter(_ => !!_.typeParameters.formId)
      .map(_ => _.typeParameters.formId ?? _.typeParameters.range?.[0]?.formId)
      .compact()
      .get()

    return [
      ...questions,
      ...subFormsIds.length > 0 ? getElements(f, subFormsIds) : [],
    ]
  }

  const getOptions = async (
    f: FormDescs,
    e: FormDesc['schema']['elements'][0],
    // filter?: (_: string) => boolean
  ): Promise<{
    formId: AIID,
    optionId: AIID,
    optionDefId: AIID,
    options: any[]
  }> => {
    const optionId = e.typeParameters.range![0].formId
    const getRandomOptions = () => {
      return (f[optionId].schema.elements.find(_ => (_.code ?? '').includes('ENG')) ?? f[optionId].schema.elements[0]).id
    }
    const optionDefId = pickSpecificOptionSet[optionId] ?? getObj(columnsListMap, optionId)?.labelsId ?? getRandomOptions()
    // const optionDefId = pickSpecificOptionSet[optionId] ?? getObj(columnsListMap, optionId)?.listId ?? getRandomOptions()
    const options = await x.fetchColumns(optionId, optionDefId)
    const filter = filterOptions[e.label]
    return {
      formId: e.id,
      optionId,
      optionDefId: optionId,
      options: filter ? options.filter(_ => filter(_.label)) : options.splice(0, optionsLimit),
    }
  }

  const print = async () => {
    const forms = getElements(formDesc, [formId])
    console.log(forms)
    const options = await Promise.all(forms
      .filter(_ => _.type === 'reference' && !pickSpecificOptionSet[_.id])
      .map(_ => getOptions(formDesc, _))
    )
    const data = forms.map(q => {
      const o = options.find(_ => _.formId === q.id)
      return {
        id: q.id,
        type: q.type,
        optionsId: o?.optionDefId,
        label: sanitalizeNonASCIIChar(q.label),
        options: o?.options ?? (q.type === 'enumerated' ? q.typeParameters.values : undefined),
        optionsLength: o?.options.length,
        required: q.required,
      }
    })
    generate(data)
  }

  const sanitalizeNonASCIIChar = (_: string) => _.replace(/[^\x00-\x7F]/g, ' ')

  const generate = (data: AIFormInformation[]) => {
    fs.writeFileSync(outputDir + '/AiType' + capitalize(name) + '.ts',
      `export namespace AiType${capitalize(name)} {` +
      generateInterface(data) + '\n\n' +
      generateMappingFn(data) + '\n\n' +
      generateOptions(data) + '\n\n' +
      '}'
    )
  }

  const generateOptions = (d: AIFormInformation[]) => {
    return `export const options = {\n`
      + d.filter(_ => !!_.options).map(q => ``
        + `  '${q.label}': {\n`
        + `    ${q.options?.map(o => `"${o.label}": '${o.id}'`).join(',\n    ')}`
        + `\n  }`
      ).join(',\n')
      + '\n}'
  }

  const isFetchingQuestionOptionBlocked = (label: string) => {
    return !!skipQuestionsOptions.find(_ => _.test(label))
  }

  const generateMappingFn = (d: AIFormInformation[]) => {
    return `export const map = (a: Type) => ({\n`
      + d.map(q => {
        const mapValue = fnSwitch(q.type, {
          'enumerated': () => {
            return `options['${q.label}'][a['${q.label}']!]`
          },
          'reference': () => {
            return `'${q.optionsId}' + ':' + options['${q.label}'][a['${q.label}']!]`
          },
        }, _ => `a['${q.label}']`)
        return `  '${q.id}': a['${q.label}'] === undefined ? undefined : ${mapValue}`
      }).join(',\n')
      + '\n})'
  }

  const generateInterface = (d: AIFormInformation[]) => {
    return ``
      + `type Opt<T extends keyof typeof options> = keyof (typeof options)[T]\n\n`
      + `export interface Type {\n`
      + d.map(q => {
        const type = fnSwitch(q.type, {
          reference: `Opt<'${q.label}'>`,
          enumerated: `Opt<'${q.label}'>`,
          quantity: 'number',
        }, _ => 'string')
        return `  '${q.label}'${q.required ? '' : '?'}: ${type}`
      }).join(',\n')
      + '\n}'
  }

  console.error(await print())
}
