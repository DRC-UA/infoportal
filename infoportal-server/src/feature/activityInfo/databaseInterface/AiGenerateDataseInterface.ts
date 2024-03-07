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
  wash: () => generateDatabaseInterface({
    optionsLimit: 200000,
    formId: activityInfoForms.wash,
    name: 'wash',
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
      /Donor Name/,
      /Reporting Organization/,
      /Sub-Implementing Partner/,
      /Hromada/,
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

  snfi: () => generateDatabaseInterface({
    formId: activityInfoForms.snfi,
    name: 'snfi',
    skipQuestionsOptions: [
      /Oblast/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ],
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
      'Implementing Partner': _ => {
        return _.includes('Danish Refugee Council')
      }
    },
  }),

  generalProtection: () => generateDatabaseInterface({
    formId: activityInfoForms.generalProtectionRmm,
    name: 'generalProtection',
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
    },
    skipQuestionsOptions: [
      /Implementing Partner/,
      /Implementing Partner 2/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ]
  }),

  gbv: () => generateDatabaseInterface({
    formId: activityInfoForms.gbv,
    name: 'gbv',
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
    },
    skipQuestionsOptions: [
      /Implementing Partner/,
      /Implementing Partner 2/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ]
  }),

  mineAction: () => generateDatabaseInterface({
    formId: activityInfoForms.mineAction,
    name: 'mineAction',
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
    },
    skipQuestionsOptions: [
      /Implementing Partner/,
      /Implementing Partner 2/,
      /OblastIndex/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ]
  }),

  mpca: () => generateDatabaseInterface({
    optionsLimit: 200,
    formId: activityInfoForms.mpca,
    name: 'mpca',
    ignoredQuestions: [],
    skipQuestion: [
      /MPCA Indicators/,
      /Donor/,
      // /Implementing Partner/,
      // /MPCA Indicators/,
    ],
    skipQuestionsOptions: [
      /Implementing Partner/,
      /OblastIndex/,
      /Raion/,
      /Hromada/i,
      /Settlement/,
      /Collective Site/,
    ],
    pickSpecificOptionSet: {},
    filterOptions: {
      'Reporting Organization': _ => {
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
  optionsLimit = 100,
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

  const getElements = (f: FormDescs, ids: AIID[]): FormDesc['schema']['elements'][] => {
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
      .filter(_ => _.type === 'subform')
      // .filter(_ => !!_.typeParameters.formId)
      .map(_ => _.typeParameters?.formId ?? _.typeParameters?.range?.[0]?.formId)
      .compact()
      .get()

    return [
      questions,
      subFormsIds.length > 0 ? getElements(f, subFormsIds).flat() : [],
    ]
  }

  const getOptions = async (
    f: FormDescs,
    e: FormDesc['schema']['elements'][0],
  ): Promise<{
    formId: AIID,
    optionId: AIID,
    optionDefId: AIID,
    options: any[]
  }> => {
    const optionId = e.typeParameters.range![0].formId
    const getRandomOptions = () => {
      return (f[optionId].schema.elements.find(_ => _.code === e.code || (_.code ?? '').includes('ENG')) ?? f[optionId].schema.elements[0]).id
    }
    const optionDefId = pickSpecificOptionSet[optionId] ?? getObj(columnsListMap, optionId)?.labelsId ?? getRandomOptions()
    // const optionDefId = pickSpecificOptionSet[optionId] ?? getObj(columnsListMap, optionId)?.listId ?? getRandomOptions()
    const options = await x.fetchColumns(
      optionId,
      optionDefId,
      e.validationCondition?.replace(e.id + '.', '')
    )
    const filter = filterOptions[e.label]
    return {
      formId: e.id,
      optionId,
      optionDefId: optionId,
      options: filter ? options.filter(_ => filter(_.label)) : options.splice(0, optionsLimit),
    }
  }

  const prepareData = async (form: FormDesc['schema']['elements']): Promise<AIFormInformation[]> => {
    const options = await Promise.all(form
      .filter(_ => _.type === 'reference' && !pickSpecificOptionSet[_.id])
      .map(_ => getOptions(formDesc, _))
    )
    return form.map(q => {
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
  }

  const sanitalizeNonASCIIChar = (_: string) => _.replace(/[^\x00-\x7F]/g, ' ')

  const print = async () => {
    const [form, subForm] = getElements(formDesc, [formId])
    const formData = await prepareData(form)
    const formSubData = await prepareData(subForm)

    const filePath = outputDir + '/AiType' + capitalize(name) + '.ts'
    console.log(`Generate into ${filePath}`)
    fs.writeFileSync(filePath,
      `export namespace AiType${capitalize(name)} {` +
      generateInterface(formData) + '\n\n' +
      generateMappingFn(formData) + '\n\n' +
      printOptions(formData) + '\n\n' +
      (formSubData.length > 0 ?
        generateInterface(formSubData, 'sub') + '\n\n' +
        generateMappingFn(formSubData, 'sub') + '\n\n' +
        printOptions(formSubData, 'sub') + '\n\n'
        : '') +
      '}'
    )
  }

  const printOptions = (d: AIFormInformation[], prefix = '') => {
    return `export const options${capitalize(prefix)} = {\n`
      + d.filter(_ => !!_.options).map(q => ``
        + `  '${q.label}': {\n`
        + `    ${q.options?.map(o => `"${o.label}": '${o.id}'`).join(',\n    ')}`
        + `\n  }`
      ).join(',\n')
      + '\n}'
  }

  const isFetchingQuestionOptionBlocked = (label: string) => {
    return !!skipQuestionsOptions.find(_ => _.test(label.trim()))
  }

  const generateMappingFn = (d: AIFormInformation[], prefix = '') => {
    return `export const map${capitalize(prefix)} = (a: Type${capitalize(prefix)}) => ({\n`
      + d.map(q => {
        const mapValue = fnSwitch(q.type, {
          'enumerated': () => {
            return `options${capitalize(prefix)}['${q.label}'][a['${q.label}']!]`
          },
          'reference': () => {
            return `'${q.optionsId}' + ':' + options${capitalize(prefix)}['${q.label}'][a['${q.label}']!]`
          },
        }, _ => `a['${q.label}']`)
        return `  '${q.id}': a['${q.label}'] === undefined ? undefined : ${mapValue}`
      }).join(',\n')
      + '\n})'
  }

  const generateInterface = (d: AIFormInformation[], prefix = '') => {
    return ``
      + `type Opt${capitalize(prefix)}<T extends keyof typeof options${capitalize(prefix)}> = keyof (typeof options${capitalize(prefix)})[T]\n\n`
      + `export interface Type${capitalize(prefix)} {\n`
      + d.map(q => {
        const type = fnSwitch(q.type, {
          reference: `Opt${capitalize(prefix)}<'${q.label}'>`,
          enumerated: `Opt${capitalize(prefix)}<'${q.label}'>`,
          quantity: 'number',
        }, _ => 'string')
        return `  '${q.label}'${q.required ? '' : '?'}: ${type}`
      }).join(',\n')
      + '\n}'
  }

  await print()
}
