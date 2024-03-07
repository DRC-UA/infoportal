import {aiHromadas, aiOblasts, aiRaions} from '@infoportal-common'
import {ActiviftyInfoRecords} from '@/core/sdk/server/activity-info/ActiviftyInfoType'

export namespace AiTypeProtectionRmm {

  export const inputs = {
    ID: {id: 'ci8ugsnldt0vh8z1c'},
    'Partner Organization': {
      id: 'ci607odlbs8w4pe2',
      optionsId: 'cr4xx3dlbs86w9y2',
      labelsId: 'cnbsrhflbs8advx9'
    },
    'Implementing Partner 1': {
      id: 'cmlymv8ldsuaebzb',
      optionsId: 'cr4xx3dlbs86w9y2',
      labelsId: 'cnbsrhflbs8advx9'
    },
    'Implementing Partner 2': {
      id: 'c4iibgxldsubqwqc',
      optionsId: 'cr4xx3dlbs86w9y2',
      labelsId: 'cnbsrhflbs8advx9'
    },
    'Plan Code': {
      id: 'cu3do47ldu8x1eg4m',
      optionsId: 'cqnfuewldtzuhuf2',
      labelsId: 'co99k7plbs8ffnpn'
    },
    Oblast: {
      id: 'cva2znrle7pd83vd',
      optionsId: 'cg7v61llbunvy9t9',
      labelsId: 'ca0ivw8lda77nm46'
    },
    Raion: {
      id: 'cb7h23tle7pdocme',
      optionsId: 'cjy8nbnlbunzcnh1h',
      labelsId: 'cj7i9fldackojz7'
    },
    Hromada: {
      id: 'cqai21ple7pe0bif',
      optionsId: 'c700rjplbuo1fjq5m',
      labelsId: 'co749hfldacpjlc8'
    },
    Settlement: {
      id: 'cir5yiule7peev5g',
      optionsId: 'cqvi6fqlbuo3hyc63',
      labelsId: 'c499sexlbuo3syc6e'
    },
    'Collective Centre': {
      id: 'cpn7bf1le7pevjuh',
      optionsId: 'cl69o0lldbf4rtk2',
      labelsId: 'cb669lfldbf529g3'
    },
    'Response Theme': {id: 'cfzh1whldu8r0u84k'},
    'Reporting Month': {id: 'cmxllh3ldsuvom9g'},
    'Population Group': {
      id: 'c19j8p9ldsv4qa3o',
      optionsId: 'cqjd0o4ld4hbyo12',
      labelsId: 'c85susjld4hc4rb3'
    },
    'Protection Indicators': {
      id: 'c79be77ldswj831t',
      optionsId: 'c3vbxtgldsw1as42',
      labelsId: 'ck5orstldsw7jfn5'
    },
    'Protection Sub-Indicators': {
      id: 'ccli5mkldt1r8lb1d',
      optionsId: 'c91xm2fldt1k1kh8',
      labelsId: 'cvjz2klldswbsqzu'
    },
    'Total Individuals Reached': {id: 'cgwjgg2ldsx1nzsv'},
    Girls: {id: 'c62l7s0lbs8mvnx3b'},
    Boys: {id: 'cqvizd5lbs8mvnx3d'},
    'Adult Women': {id: 'ceij8s2lbs8mvnx3f'},
    'Adult Men': {id: 'cpbkputlbs8mvny3h'},
    'Elderly Women': {id: 'cpkkgqulbs8mvny3j'},
    'Elderly Men': {id: 'cmyfyd8lbs8mvny3l'},
    'People with disability': {id: 'cj41459lbs8mvny3n'},
    'Achievement (non-individual)': {id: 'cn37fnmlbs8mvny3r'}, // always = 12 I think
    '# of individuals who received support to master stress-management strategies': {id: 'cev98hrldvi6g825'},
    '# of individuals received Problem Management Plus intervention': {id: 'c9qcv7fldvih1bca'},
    '# of individuals received CETA intervention': {id: 'c2khmc8ldviio99b'},
    '# of individuals received other PSS interventions': {id: 'cucpuskldvik1mpc'},
    '# of individuals who received support to Master Stress-Management Strategies': {id: 'cxv8koaldviffeg9'}
  }

  export const inputsOptions = {
    'Population Group': {
      'IDPs': 'co8y3rvld4hchx14',
      'Non-Displaced': 'cl76cbild4hcq8i5',
      'Returnees': 'cxbkri3ld4hcx9z6',
    },
    'Protection Indicators': {
      '# of persons reached through protection monitoring': 'cntvm8fle4efhhpn',
      '# of key informants reached through community level protection monitoring': 'ceabnj7le4efhhpo',
      '# of persons who participated in awareness raising activities - GP': 'c6rcu2jle4efhhp6',
    },
    'Partner Organization': {
      'DRC - Danish Demining Group (DRC-DDG)': 'cv9umq8lehiq43f103',
      // TODO Check why I got cgaexfclehiq43fzv ???
      // 'DRC - Danish Demining Group (DRC-DDG)': 'cgaexfclehiq43fzv',
    },
    'Plan Code': {
      'GP-DRC-00001': 'cfbgfipleo7dg222',
      'GP-DRC-00002': 'cy76ipoleo7ij1j3',
      'GP-DRC-00003': 'crsa7psleo7l08n4',
      'GP-DRC-00004': 'cxf2j7kleo7mstp5',
      'GP-DRC-00005': 'cgoek15lgw7jc2u2',
      'GP-DRC-00006': 'cbmqt7lgw7p3163',
      'GP-DRC-00007': 'ca3hc2jlje85ybb2',
      'GP-DRC-00008': 'cj88e64lncw3r1d2',
      'GP-DRC-00009': 'cpg4iwslncw9r0v3',
      'GP-DRC-00010': 'ca48ok8lncwdkna4',
    },
    Oblast: aiOblasts,
    Raion: aiRaions,
    Hromada: aiHromadas,
  }

  export type GET<T extends keyof typeof inputsOptions> = keyof typeof inputsOptions[T]

// let B: Partial<Record<keyof typeof inputs, any>> = {
//   ID: 2,
//   'Protection Indicators'
// }
  export interface FormParams {
    'Partner Organization'?: GET<'Partner Organization'>
    'Plan Code': GET<'Plan Code'>
    'Oblast': GET<'Oblast'>
    'Raion': GET<'Raion'>
    'Hromada': GET<'Hromada'>
    'Settlement'?: string
    'Collective Centre'?: string
    subActivities: {
      'Reporting Month': string
      'Population Group': GET<'Population Group'>
      'Protection Indicators': GET<'Protection Indicators'>
      'Collective Centre'?: string
      'Total Individuals Reached': number
      'Girls': number
      'Boys': number
      'Adult Women': number
      'Adult Men': number
      'Elderly Women': number
      'Elderly Men': number
      'People with disability'?: number
      // 'Achievement (non-individual)': number
    }[]
  }


  interface AIHHForms {
    'ID': string,
    'Partner Organization': string
    'Implementing Partner 1': string
    'Implementing Partner 2': string
    'Plan Code': string
    'Oblast': string
    'Raion': string
    'Hromada': string
    'Settlement': string
    'Collective Centre': string
    'Response Theme': string
    'Reporting Month': string
    'Population Group': string
    'Protection Indicators': string
    'Protection Sub-Indicators': string
    'Total Individuals Reached': string
    'Girls': string
    'Boys': string
    'Adult Women': string
    'Adult Men': string
    'Elderly Women': string
    'Elderly Men': string
    'Achievement (non-individual)': string
    'People with disability': string
  }


// form/c3vbxtgldsw1as42/record/cntvm8fle4efhhpn
  const activities = {
    c6nflpglemqkd9h4: 'HRP2023',
    c16tlt9ldsw73ck4: 'Моніторинг у сфері захисту на рівні домогосподарств',
    cbp0y9bldswb0lxm: 'c2lllo9ldswb0lxl',
    cfsnsvdldswa105f: 'c173cqnldswa105e',
    cgtjh8zldvhgzn629: 'cc66lm4ldvhhbit2a',
    cjarsddldsw9l9z9: 'Особи',
    ck5orstldsw7jfn5: '# of persons reached through protection monitoring',
    cmees1vlemqj5iw2: 'GP108',
    cmyo72klemqjrwp3: 'GP108-019',
    cnebbh7ldsw8pu58: 'Individual',
    co2cveqldsw8bnr7: 'ALL',
    cqn8nk6ldsw7vr26: 'кількість осіб, охоплених моніторингом захисту',
    cvjz2klldswbsqzu: 'cq04ujnldswbsqzt',
    cykkilxldsw1s0h3: 'Protection Monitoring at Household Level',
  }

  export const columnsListMap = {
    cr4xx3dlbs86w9y2: {
      labelsId: 'cnbsrhflbs8advx9',
      label: 'partnerOrg',
    },
    cqnfuewldtzuhuf2: {
      labelsId: 'co99k7plbs8ffnpn',
      label: 'planCodeActivity',
    },
    cg7v61llbunvy9t9: {
      labelsId: 'ca0ivw8lda77nm46',
      label: 'oblast',
    },
    cjy8nbnlbunzcnh1h: {
      labelsId: 'cj7i9fldackojz7',
      label: 'raion',
    },
    c700rjplbuo1fjq5m: {
      labelsId: 'co749hfldacpjlc8',
      label: 'hromada',
    },
    cqjd0o4ld4hbyo12: {
      labelsId: 'c85susjld4hc4rb3',
      label: 'populationGroup',
    },
    c3vbxtgldsw1as42: {
      labelsId: 'ck5orstldsw7jfn5',
      label: 'protectionIndicators',
    },
    ccli5mkldt1r8lb1d: {
      labelsId: 'cvjz2klldswbsqzu',
      label: 'Protection Sub-Indicators'
    }
  }

// ID des indicators avec sublist from c79be77ldswj831t
// c3vbxtgldsw1as42 : ck5orstldsw7jfn5

  // const mapMonthToId: any = {
  //   1: 'ja',
  //   2: 'fe',
  //   3: 'ma',
  //   4: 'ap',
  //   5: 'ma',
  //   6: 'ju',
  //   7: 'jy',
  //   8: 'ao',
  //   9: 'se',
  //   10: 'oc',
  //   11: 'no',
  //   12: 'de',
  // }

  export const makeForm = (params: FormParams, period: string, index: number): ActiviftyInfoRecords => {
    const getKeyId = (id: keyof typeof inputs) => inputs[id].id
    // const buildOption = <T extends keyof typeof inputsOptions>(t: T, defaultValue?: keyof (typeof inputsOptions)[T]) => {
    //   return {
    //     [inputs[t].id]: (inputs[t] as any).optionsId + ':' + ((inputsOptions as any)[t][(params as any)[t] ?? defaultValue])
    //   }
    // }
    // const buildValue = <T extends keyof FormParams>(t: T) => {
    //   return {[inputs[t].id]: params[t]}
    // }

    // @ts-ignore
    const buildOption = <T extends Partial<Record<keyof typeof inputs, any>>, K extends keyof T>(obj: T, k: K, defaultValue?: keyof (typeof inputsOptions)[K]) => {
      const input = (inputs as any)[k]
      const value = (obj as any)[k] ?? defaultValue
      if (value !== undefined)
        return {[input.id]: input.optionsId + ':' + (inputsOptions as any)[k][value]}
    }

    const buildValue = <T extends Partial<Record<keyof typeof inputs, any>>, K extends keyof T>(obj: T, k: K) => {
      const input = (inputs as any)[k]
      const value = obj[k]
      if (value !== undefined)
        return {[input.id]: value}
    }
    const monthNumber = period.split('-')[1].padStart(2, '0')
    const recordId = 'drcprot' + period.replaceAll(/[^\d]/g, '') + 'i' + ('' + index).padStart(3, '0')
    return {
      'changes': [
        {
          formId: 'cas3n26ldsu5aea5',
          recordId,
          parentRecordId: null,
          fields: {
            ...buildOption(params, 'Partner Organization', 'DRC - Danish Demining Group (DRC-DDG)'),
            ...buildOption(params, 'Plan Code'),
            ...buildOption(params, 'Oblast'),
            ...buildOption(params, 'Raion'),
            ...buildOption(params, 'Hromada'),
            ...buildValue(params, 'Settlement'),
            ...buildValue(params, 'Collective Centre'),
            // 'Response Theme': '',
          },
        },
        ...params.subActivities.map((x, i) => {
          return {
            formId: 'cy3vehlldsu5aeb6',
            recordId: recordId + i,
            parentRecordId: recordId,
            fields: {
              ...buildValue(x, 'Reporting Month'),
              ...buildOption(x, 'Population Group'),
              ...buildOption(x, 'Protection Indicators', '# of persons reached through protection monitoring'),
              // ...buildOption(x, 'Protection Sub-Indicators', '# of persons reached through protection monitoring'),
              ...buildValue(x, 'Total Individuals Reached'),
              ...buildValue(x, 'Girls'),
              ...buildValue(x, 'Boys'),
              ...buildValue(x, 'Adult Women'),
              ...buildValue(x, 'Adult Men'),
              ...buildValue(x, 'Elderly Women'),
              ...buildValue(x, 'Elderly Men'),
              ...buildValue(x, 'People with disability'),
            }
          }
        }),
      ]
    }
  }
}

//^(\d+)\t([^\t]+)\t([^\t\n]+)$\n
//$1: {hromada: '$2', settlement: '$3'},\n

// Community Level
// const w = {
//   'changes': [{
//     'formId': 'cas3n26ldsu5aea5',
//     'recordId': 'c5hc6jilng55yjm2',
//     'parentRecordId': null,
//     'fields': {
//       'ci607odlbs8w4pe2': 'cr4xx3dlbs86w9y2:cv9umq8lehiq43f103',  // partner
//       'cu3do47ldu8x1eg4m': 'cqnfuewldtzuhuf2:cfbgfipleo7dg222',   // plan code
//       'cva2znrle7pd83vd': 'cg7v61llbunvy9t9:ciua21glebrkckb2',    // oblast
//       'cb7h23tle7pdocme': 'cjy8nbnlbunzcnh1h:clrmtnqlecp1fu03',   // raion
//       'cqai21ple7pe0bif': 'c700rjplbuo1fjq5m:chagq9rlebstwse2'    // hromada
//     }
//   },
//     {
//       'formId': 'cy3vehlldsu5aeb6',
//       'recordId': 'c9x69gllng5jlbf3',
//       'parentRecordId': 'c5hc6jilng55yjm2',
//       'fields': {
//         'cmxllh3ldsuvom9g': '2023-09',
//         'c19j8p9ldsv4qa3o': 'cqjd0o4ld4hbyo12:co8y3rvld4hchx14', // Population group
//         'c79be77ldswj831t': 'c3vbxtgldsw1as42:ceabnj7le4efhhpo', // Protection indicators
//         'cgwjgg2ldsx1nzsv': 0,
//         'c62l7s0lbs8mvnx3b': 0,
//         'cqvizd5lbs8mvnx3d': 0,
//         'ceij8s2lbs8mvnx3f': 0,
//         'cpbkputlbs8mvny3h': 0,
//         'cpkkgqulbs8mvny3j': 0,
//         'cmyfyd8lbs8mvny3l': 0,
//         'cj41459lbs8mvny3n': 0
//       }
//     }]
// }

// Awarness
// const x = {
//   'changes': [{
//     'formId': 'cas3n26ldsu5aea5',
//     'recordId': 'c2pjbs0lne9z9n82',
//     'parentRecordId': null,
//     'fields': {
//       'ci607odlbs8w4pe2': 'cr4xx3dlbs86w9y2:cv9umq8lehiq43f103',
//       'cu3do47ldu8x1eg4m': 'cqnfuewldtzuhuf2:cfbgfipleo7dg222',
//       'cva2znrle7pd83vd': 'cg7v61llbunvy9t9:ciua21glebrkckb2',
//       'cb7h23tle7pdocme': 'cjy8nbnlbunzcnh1h:clrmtnqlecp1fu03',
//       'cqai21ple7pe0bif': 'c700rjplbuo1fjq5m:chagq9rlebstwse2'
//     }
//   },
//     {
//       'formId': 'cy3vehlldsu5aeb6',
//       'recordId': 'cfbjfs6lng5reib3',
//       'parentRecordId': 'c2pjbs0lne9z9n82',
//       'fields': {
//         'cmxllh3ldsuvom9g': '2023-09',
//         'c19j8p9ldsv4qa3o': 'cqjd0o4ld4hbyo12:co8y3rvld4hchx14',
//         'c79be77ldswj831t': 'c3vbxtgldsw1as42:c6rcu2jle4efhhp6',
//         'cgwjgg2ldsx1nzsv': 0,
//         'c62l7s0lbs8mvnx3b': 0,
//         'cqvizd5lbs8mvnx3d': 0,
//         'ceij8s2lbs8mvnx3f': 0,
//         'cpbkputlbs8mvny3h': 0,
//         'cpkkgqulbs8mvny3j': 0,
//         'cmyfyd8lbs8mvny3l': 0,
//         'cj41459lbs8mvny3n': 0
//       }
//     }]
// }