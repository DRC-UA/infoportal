import {KoboSdk} from '../feature/connector/kobo/KoboClient/KoboSdk'
import {fnSwitch, seq} from '@alexandreannic/ts-utils'
import {KoboApiForm} from '../feature/connector/kobo/KoboClient/type/KoboApiForm'
import * as fs from 'fs'
import {ApiClient} from '../core/client/ApiClient'
import {appConf} from '../core/conf/AppConf'
import {KoboId} from '../feature/connector/kobo/KoboClient/type/KoboAnswer'
import {KoboIndex} from '@infoportal-common'

interface KoboInterfaceGeneratorParams {
  outDir: string,
  formName: string,
  formId: string,
  skipQuestionTyping?: string[]
  overrideOptionsByQuestion?: Record<string, Record<string, string[]>>
  overrideAllOptions?: Record<string, string[]>
}

export const generateKoboInterface = async (koboSdk: KoboSdk, outDir: string) => {
  const forms: Omit<KoboInterfaceGeneratorParams, 'outDir'>[] = [
    {
      formName: 'Shelter_north', formId: KoboIndex.byName('shelter_north').id,
    },
    {
      formName: 'Partnership_partnersDatabase', formId: KoboIndex.byName('partnership_partnersDatabase').id,
      overrideOptionsByQuestion: {
        Type_of_organization: {
          'municipal_organization_or_othe': [`Government-run entity`],
        }
      }
    },
    {
      formName: 'Partnership_assessment', formId: KoboIndex.byName('partnership_assessment').id,
    },
    {
      formName: 'Partnership_initialQuestionnaire', formId: KoboIndex.byName('partnership_initialQuestionnaire').id,
    },
    {
      formName: 'Protection_communityMonitoring', formId: KoboIndex.byName('protection_communityMonitoring').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    // {
    //   formName: 'Protection_hhs2_2',
    //   formId: 'aQBCaoRUxvtb5BQcv7wnTK',
    // },
    {
      formName: 'Protection_gbv', formId: KoboIndex.byName('protection_gbv').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Protection_groupSession', formId: KoboIndex.byName('protection_groupSession').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Protection_pss', formId: KoboIndex.byName('protection_groupSession').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {formName: 'Bn_cashForRentApplication', formId: KoboIndex.byName('bn_cashForRentApplication').id},
    {formName: 'Bn_RapidResponse', formId: KoboIndex.byName('bn_rapidResponse').id},
    {formName: 'Shelter_cashForRepair', formId: KoboIndex.byName('shelter_cashForRepair').id},
    {
      formName: 'Ecrec_cashRegistration', formId: KoboIndex.byName('ecrec_cashRegistration').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Ecrec_cashRegistrationBha', formId: KoboIndex.byName('ecrec_cashRegistrationBha').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Meal_VerificationEcrec', formId: KoboIndex.byName('meal_verificationEcrec').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Meal_VerificationWinterization', formId: KoboIndex.byName('meal_verificationWinterization').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Meal_VisitMonitoring', formId: KoboIndex.byName('meal_visitMonitoring').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Meal_CfmInternal', formId: KoboIndex.byName('meal_cfmInternal').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Meal_CfmExternal', formId: KoboIndex.byName('meal_cfmExternal').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Shelter_NTA', formId: KoboIndex.byName('shelter_nta').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Shelter_TA', formId: KoboIndex.byName('shelter_ta').id, skipQuestionTyping: [
        'ben_det_hromada',
        'ben_det_raion',
      ]
    },
    {
      formName: 'Bn_rapidResponseSidar',
      formId: KoboIndex.byName('bn_rapidResponseSida').id,
    },
    {
      formName: 'Protection_hhs',
      formId: KoboIndex.byName('protection_hhs2_1').id,
      overrideAllOptions: {
        other_specify: ['Other'],
        health_1_2: ['Health'],
      },
      overrideOptionsByQuestion: {
        what_are_the_barriers_to_accessing_health_services: {
          safety_risks_associated_with_access_to_presence_at_health_facility: ['Safety risks associated with access to/presence at health facility'],
        },
        what_are_your_main_concerns_regarding_your_accommodation: {
          'risk_of_eviction': [`Risk of eviction`],
          'accommodations_condition': [`Accommodation’s condition`],
          'overcrowded_lack_of_privacy': [`Overcrowded/Lack of privacy`],
          'lack_of_functioning_utilities': [`Lack of functioning utilities`],
          'lack_of_connectivity': [`Lack of connectivity`],
          'security_and_safety_risks': [`Security and safety risks`],
          'lack_of_financial_compensation_or_rehabilitation_for_damage_or_destruction_of_housing': [`Lack of support for damaged housing`],
        },
        what_is_the_type_of_your_household: {
          'one_person_household': [`One person household`],
          'couple_without_children': [`Couple without children`],
          'couple_with_children': [`Couple with children`],
          'mother_with_children': [`Mother with children`],
          'father_with_children': [`Father with children`],
          'extended_family': [`Extended family`],
        }
      }
    },
    {
      formName: 'Protection_hhs3',
      formId: KoboIndex.byName('protection_hhs3').id,
      overrideAllOptions: {
        other_specify: ['Other'],
        health_1_2: ['Health'],
      },
      overrideOptionsByQuestion: {
        what_are_the_barriers_to_accessing_health_services: {
          safety_risks_associated_with_access_to_presence_at_health_facility: ['Safety risks associated with access to/presence at health facility'],
        },
        what_are_your_main_concerns_regarding_your_accommodation: {
          'risk_of_eviction': [`Risk of eviction`],
          'accommodations_condition': [`Accommodation’s condition`],
          'overcrowded_lack_of_privacy': [`Overcrowded/Lack of privacy`],
          'lack_of_functioning_utilities': [`Lack of functioning utilities`],
          'lack_of_connectivity': [`Lack of connectivity`],
          'security_and_safety_risks': [`Security and safety risks`],
          'lack_of_financial_compensation_or_rehabilitation_for_damage_or_destruction_of_housing': [`Lack of support for damaged housing`],
        },
        what_is_the_type_of_your_household: {
          'one_person_household': [`One person household`],
          'couple_without_children': [`Couple without children`],
          'couple_with_children': [`Couple with children`],
          'mother_with_children': [`Mother with children`],
          'father_with_children': [`Father with children`],
          'extended_family': [`Extended family`],
        }
      }
    },
    {
      formName: 'Bn_0_mpcaRegNewShort', formId: KoboIndex.byName('bn_0_mpcaRegNewShort').id, skipQuestionTyping: ['hromada', 'raion']
    },
    {
      formName: 'Bn_0_mpcaReg', formId: KoboIndex.byName('bn_0_mpcaReg').id, skipQuestionTyping: ['hromada', 'raion']
    },
    {
      formName: 'Bn_0_mpcaRegNoSig', formId: KoboIndex.byName('bn_0_mpcaRegNoSig').id, skipQuestionTyping: ['hromada', 'raion']
    },
    {
      formName: 'Bn_0_mpcaRegESign', formId: KoboIndex.byName('bn_0_mpcaRegESign').id, skipQuestionTyping: ['hromada', 'raion']
    },
    {formName: 'Bn_Re', formId: KoboIndex.byName('bn_re').id},
    {formName: 'Bn_OldMpcaNfi', formId: KoboIndex.byName('bn_1_mpcaNfi').id},
    {formName: 'Bn_OldMpcaNfiNaa', formId: KoboIndex.byName('bn_1_mpcaNfiNaa').id},
    {formName: 'Bn_OldMpcaNfiMyko', formId: KoboIndex.byName('bn_1_mpcaNfiMyko').id},
    {
      formName: 'Protection_Hhs2', formId: KoboIndex.byName('protection_hhs2').id,
      overrideAllOptions: {
        health_1_2: ['Health'],
      },
    },
    {formName: 'safety_incident', formId: KoboIndex.byName('safety_incident').id},
  ]
  return Promise.all(forms.map(f => new KoboInterfaceGenerator(koboSdk, {
    outDir,
    ...f,
  }).generate()))
}

const ignoredQuestionTypes: KoboApiForm['content']['survey'][0]['type'][] = [
  // 'calculate',
  'begin_group',
  'end_group',
  // 'note',
  'end_repeat',
]

class KoboInterfaceGenerator {

  constructor(
    private sdk: KoboSdk,
    private options: KoboInterfaceGeneratorParams) {
  }

  readonly excludedQuestionNames = [
    'start',
    'end'
  ]

  readonly fixDuplicateName = (survey: KoboApiForm['content']['survey']): KoboApiForm['content']['survey'] => {
    const duplicate: Record<string, number> = {}
    return survey.map(q => {
      if (!q.name) return q
      if (duplicate[q.name] !== undefined) {
        duplicate[q.name] = duplicate[q.name] + 1
        q.name = q.name + duplicate[q.name]
      } else {
        duplicate[q.name] = 0
      }
      return q
    })
  }

  readonly generate = async () => {
    const form = await this.sdk.getForm(this.options.formId)
    const survey = this.fixDuplicateName(form.content.survey)
    const mainInterface = this.generateInterface(survey, this.options.formId)
    const options = this.generateOptionsType(survey, form.content.choices)
    const mapping = this.generateFunctionMapping(survey)
    const location = this.options.outDir + '/'
    if (!fs.existsSync(location)) {
      fs.mkdirSync(location)
    }
    fs.writeFileSync(location + '/' + this.options.formName + '.ts', [
      `export namespace ${this.options.formName} {`,
      mainInterface.join('\n\t'),
      options,
      mapping,
      `}`,
    ].join(`\n`))
  }

  readonly extractQuestionNameFromGroupFn = `
const extractQuestionName = (_: Record<string, any>) => {
  const output: any = {}
  Object.entries(_).forEach(([k, v]) => {
    const arr = k.split('/')
    const qName = arr[arr.length - 1]
    output[qName] = v
  })
  return output
}`

  readonly generateFunctionMapping = (survey: KoboApiForm['content']['survey']) => {
    const repeatItems = this.getBeginRepeatQuestion(survey)
    const basicMapping = (name: string) => {
      return {
        integer: () => `_.${name} ? +_.${name} : undefined`,
        date: () => `_.${name} ? new Date(_.${name}) : undefined`,
        datetime: () => `_.${name} ? new Date(_.${name}) : undefined`,
        select_multiple: () => `_.${name}?.split(' ')`,
      }
    }
    const fnMappings = survey
      .filter(_ => !ignoredQuestionTypes.includes(_.type))
      .filter(_ => repeatItems.every(r => {
        return !_.$qpath.includes(r.name + '-')
      }))
      .map(x => {
        const name = x.name ?? x.$autoname
        return [
          name,
          fnSwitch(x.type, {
            ...basicMapping(name),
            // integer: `_.${name} ? +_.${name} : undefined`,
            // date: `_.${name} ? new Date(_.${name}) : undefined`,
            // datetime: `_.${name} ? new Date(_.${name}) : undefined`,
            // select_multiple: `_.${name}?.split(' ')`,
            begin_repeat: () => {
              const groupedQuestions = survey.filter(_ => _.name !== x.name && _.$qpath?.includes(x.name + '-'))
              return `_.${name}?.map(extractQuestionName).map((_: any) => {\n`
                + groupedQuestions.map(_ => {
                  const sname = _.name ?? _.$autoname
                  return [
                    sname,
                    fnSwitch(_.type, basicMapping(sname), () => undefined),
                  ]
                }).filter(_ => _[1] !== undefined).map(([questionName, fn]) => `\t\t_['${questionName}'] = ${fn}`).join(`\n`)
                + `\n\t\treturn _`
                + `\t\n})`
            }
          }, _ => undefined)
        ]
      })
      .filter(_ => _[1] !== undefined)
    return this.extractQuestionNameFromGroupFn + '\n\n'
      + `export const map = (_: Record<keyof T, any>): T => ({\n`
      + `\t..._,\n`
      + `${fnMappings.map(([questionName, fn]) => `\t${questionName}: ${fn},`).join('\n')}\n`
      + `}) as T`
  }

  // readonly skipQuestionInBeginRepeat = (survey: KoboApiForm['content']['survey']) => (_: KoboApiForm['content']['survey'][0]) => {
  //   const repeatItem = this.getBeginRepeatQuestion(survey)
  //   console.log(repeatItem)
  //   return _ => repeatItem.every(r => {
  //     console.log('$qpath', _.$qpath)
  //     return !_.$qpath.includes(r.name + '-')
  //   })
  // }

  readonly getBeginRepeatQuestion = (survey: KoboApiForm['content']['survey']) => {
    return survey.filter(_ => _.type === 'begin_repeat')
  }

  readonly generateInterface = (survey: KoboApiForm['content']['survey'], formId: KoboId): string[] => {
    const indexOptionId = seq(survey).groupBy(_ => _.select_from_list_name!)
    const repeatItems = this.getBeginRepeatQuestion(survey)
    const properties = survey
      .filter(_ => !ignoredQuestionTypes.includes(_.type))
      .filter(_ => repeatItems.every(r => {
        return !_.$qpath.includes(r.name + '-')
      }))
      .map(x => {
        const lastQuestionNameHavingOptionId = seq(indexOptionId[x.select_from_list_name ?? '']).last()?.name
        const basicQuestionTypeMapping = (lastQuestionNameHavingOptionId?: string) => ({
          'select_one': () => 'undefined | ' + (this.options.skipQuestionTyping?.includes(x.name) ? 'string' : `Option<'${lastQuestionNameHavingOptionId}'>`),
          'select_multiple': () => 'undefined | ' + (this.options.skipQuestionTyping?.includes(x.name) ? 'string[]' : `Option<'${lastQuestionNameHavingOptionId}'>[]`),
          'integer': () => 'number | undefined',
          'decimal': () => 'number | undefined',
          'text': () => 'string | undefined',
          'date': () => 'Date | undefined',
          'datetime': () => 'Date | undefined',
        })
        const type = fnSwitch(x.type, {
          ...basicQuestionTypeMapping(lastQuestionNameHavingOptionId),
          'begin_repeat': () => {
            const groupedQuestions = survey.filter(_ => _.name !== x.name && _.$qpath?.includes(x.name + '-'))
            return '{' + groupedQuestions.map(_ => {
              const lastQuestionNameHavingOptionId = seq(indexOptionId[_.select_from_list_name ?? '']).last()?.name
              return `${_.$autoname}: ${fnSwitch(_.type, basicQuestionTypeMapping(lastQuestionNameHavingOptionId), _ => 'string')} | undefined`
            }).join(',') + '}[] | undefined'

          }
        }, () => 'string')
        return (x.label ? `// ${x.$xpath} [${x.type}] ${x.label[0]?.replace(/\s/g, ' ')}\n` : '')
          + `  ${x.name ?? x.$autoname}: ${type},`
      })
    return [
      `export type Option<T extends keyof typeof options> = keyof (typeof options)[T]`,
      `// Form id: ${formId}`,
      `export interface T {`,
      ...properties.map(_ => `  ${_}`),
      `}`
    ]
  }

  readonly generateOptionsType = (survey: KoboApiForm['content']['survey'], choices: KoboApiForm['content']['choices']) => {
    const indexOptionId = seq(survey).reduceObject<Record<string, string>>(_ => [_.select_from_list_name ?? '', _.name])
    const res: Record<string, Record<string, string>> = {}
    choices.forEach(choice => {
      if (this.options.skipQuestionTyping?.includes(indexOptionId[choice.list_name])) return
      const questionName = indexOptionId[choice.list_name]
      if (!res[questionName]) {
        res[questionName] = {}
      }
      res[questionName][choice.name] = (() => {
        try {
          return this.options.overrideOptionsByQuestion?.[questionName][choice.name][0]
            ?? this.options.overrideAllOptions?.[choice.name][0]
            ?? choice.label[0]
        } catch (e: any) {
          return choice.label[0]
        }
      })()
    })
    return `export const options = {\n`
      + Object.entries(res).map(([k, v]) => `${k}: {\n` +
        Object.keys(v)
          .map(sk => `\t'${sk.replaceAll(`'`, `\\'`)}': \`${v[sk]?.replace('`', '')}\``)
          .join(',\n')
      ).join('\n},\n')
      + '\n}}'
  }
}

(async () => {
  const koboSdk = new KoboSdk(new ApiClient({
      baseUrl: appConf.kobo.url + '/api',
      headers: {
        Authorization: KoboSdk.makeAuthorizationHeader(appConf.kobo.token),
      }
    })
  )
  await generateKoboInterface(
    koboSdk,
    appConf.rootProjectDir + '/src/script/output/kobo',
  )
})()