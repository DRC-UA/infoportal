import {aiHromadas, aiOblasts, aiRaions, DrcProject} from '@infoportal-common'


export namespace AiSnfiInterface {
  export enum PlanCode {
    'DRC-SN-00014' = 'DRC-SN-00014',
    'DRC-SN-00013' = 'DRC-SN-00013',
    'DRC-SN-00015' = 'DRC-SN-00015',
  }

  export type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'Reporting Partner': Opt<'Reporting Partner'>,
    'Report to a planned project': Opt<'Report to a planned project'>,
    'Plan Code'?: Opt<'Plan Code'>,
    'Implementing Partner': Opt<'Implementing Partner'>,
    'SNFI indictors': Opt<'SNFI indictors'>,
    'Distribution through IOM NFI Common Pipeline'?: Opt<'Distribution through IOM NFI Common Pipeline'>,
    'Oblast': string,
    'Raion': string,
    'Hromada': string,
    'Settlement'?: string,
    'Collective Site'?: string,
    'Implementation status': Opt<'Implementation status'>,
    'Reporting Date (YYYY-MM-DD)': string,
    'Population Group'?: Opt<'Population Group'>,
    'Indicator Value (HHs reached, buildings, etc.)': number,
    '# Individuals Reached'?: number,
    'Girls (0-17)'?: number,
    'Boys (0-17)'?: number,
    'Women (18-59)'?: number,
    'Men (18-59)'?: number,
    'Elderly Women (60+)'?: number,
    'Elderly Men (60+)'?: number,
    'People with disability'?: number
  }

  export const map = (a: Type) => ({
    'cq6zwqjlf82vdwm3': a['Reporting Partner'] === undefined ? undefined : 'cr4xx3dlbs86w9y2' + ':' + options['Reporting Partner'][a['Reporting Partner']!],
    'csmijzwldtzh3bl38': a['Report to a planned project'] === undefined ? undefined : options['Report to a planned project'][a['Report to a planned project']!],
    'c75dtq4les7cpc82d': a['Plan Code'] === undefined ? undefined : 'cdesthtldec3hei2' + ':' + options['Plan Code'][a['Plan Code']!],
    'cn10ozsldtxbraj1l': a['Implementing Partner'] === undefined ? undefined : 'cr4xx3dlbs86w9y2' + ':' + options['Implementing Partner'][a['Implementing Partner']!],
    'cv9pg04ldu2u9h93j': a['SNFI indictors'] === undefined ? undefined : 'cyi4zqdldu27njw36' + ':' + options['SNFI indictors'][a['SNFI indictors']!],
    'ct345swleh7rbj47': a['Distribution through IOM NFI Common Pipeline'] === undefined ? undefined : options['Distribution through IOM NFI Common Pipeline'][a['Distribution through IOM NFI Common Pipeline']!],
    // 'camsdoble7prey5o': a['Oblast'] === undefined ? undefined : a['Oblast'],
    // 'c74nt9ale7prs2hp': a['Raion'] === undefined ? undefined : a['Raion'],
    // 'cs63bxkle7ps0xuq': a['Hromada'] === undefined ? undefined : a['Hromada'],
    // @ts-ignore
    'camsdoble7prey5o': 'cg7v61llbunvy9t9:' + aiOblasts[a['Oblast']],
    // @ts-ignore
    'c74nt9ale7prs2hp': 'cjy8nbnlbunzcnh1h:' + aiRaions[a['Raion']],
    // @ts-ignore
    'cs63bxkle7ps0xuq': 'c700rjplbuo1fjq5m:' + aiHromadas[a['Hromada']],
    'cobl961lfk2oa3g3': 'cqvi6fqlbuo3hyc63:c21rblslfk31pl57', // Settlement
    'cvq23zolfk3jvle9': 'cl69o0lldbf4rtk2:csomp5ilfqiu8ty2', // Collective Site
    // 'cobl961lfk2oa3g3': a['Settlement'] === undefined ? undefined : a['Settlement'],
    // 'cvq23zolfk3jvle9': a['Collective Site'] === undefined ? undefined : a['Collective Site'],
    'c8fnjxzles7i9yi2k': a['Implementation status'] === undefined ? undefined : options['Implementation status'][a['Implementation status']!],
    'csfoqprleh6qg1k3': a['Reporting Date (YYYY-MM-DD)'] === undefined ? undefined : a['Reporting Date (YYYY-MM-DD)'],
    'c16s0poldtxdh4i2k': a['Population Group'] === undefined ? undefined : 'cqjd0o4ld4hbyo12' + ':' + options['Population Group'][a['Population Group']!],
    'cqi4oh3ldx7oxbk2b': a['Indicator Value (HHs reached, buildings, etc.)'] === undefined ? undefined : a['Indicator Value (HHs reached, buildings, etc.)'],
    'cizsb4rldtxdh4i2r': a['# Individuals Reached'] === undefined ? undefined : a['# Individuals Reached'],
    'cfoottlldtxdh4i2s': a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    'cxxg0f1ldtxdh4i2t': a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    'c7s25dpldtxdh4i2u': a['Women (18-59)'] === undefined ? undefined : a['Women (18-59)'],
    'cszje7jldtxdh4i2v': a['Men (18-59)'] === undefined ? undefined : a['Men (18-59)'],
    'c75mnm0ldtxdh4i2w': a['Elderly Women (60+)'] === undefined ? undefined : a['Elderly Women (60+)'],
    'cpwm9hildtxdh4i2x': a['Elderly Men (60+)'] === undefined ? undefined : a['Elderly Men (60+)'],
    'cy9uo60ldtxdh4i2y': a['People with disability'] === undefined ? undefined : a['People with disability']
  })

  export const options = {
    'Reporting Partner': {
      'Danish Refugee Council': 'cv9umq8lehiq43f103'
    },
    'Report to a planned project': {
      'Yes': 'cvlcuxtldtzh3bl37',
      'No': 'cslpqb5ldtzhdsl39'
    },
    'Plan Code': {
      [DrcProject['UKR-000309 OKF']]: 'c8rqqunlrgrhzxk4',
      [DrcProject['UKR-000342 Pooled Funds']]: 'cnzw17blrgrnqir2',
      [DrcProject['UKR-000284 BHA']]: 'cudbg39lrgdou5o3',
      [DrcProject['UKR-000336 UHF6']]: 'cf5s649lrgdmlpy2',
      [DrcProject['UKR-000314 UHF4']]: 'cs1j3twlosqnuj33',
      [DrcProject['UKR-000322 ECHO2']]: 'cvwwdp5losjpowe2',
      [DrcProject['UKR-000308 UNHCR']]: 'cp9vejmlosqpryz4',
    } as Record<DrcProject, string>,
    'Implementing Partner': {
      'Danish Refugee Council': 'cv9umq8lehiq43f103'
    },
    'SNFI indictors': {
      // 'Emergency Shelter Support': 'cfki5tlleso4fy3c',
      'esk': 'cfki5tlleso4fy3c',
      // 'light_repair': 'cp9vejmlosqpryz4',
      'light_repair': 'cthbls4leso4fy310',
      // 'light_repair': 'cp9vejmlosqpryz4',
      // 'light_repair': 'cvwwdp5losjpowe2',
      // 'light_repair': 'cvwwdp5losjpowe2',
      // 'medium_repair': 'cvwwdp5losjpowe2',
      // 'medium_repair': 'cp9vejmlosqpryz4',
      'medium_repair': 'csek3cileso4fy312',
    },
    'Distribution through IOM NFI Common Pipeline': {
      'Yes': 'ciza7n6leh7rbj46',
      'No': 'c9a1bnileh7s0me8'
    },
    'Implementation status': {
      'Ongoing': 'c9kxwthles7i9yi2j',
      'Complete': 'c7x3nhyles7iq962l'
    },
    'Population Group': {
      'IDPs': 'co8y3rvld4hchx14',
      'Non-Displaced': 'cl76cbild4hcq8i5',
      'Returnees': 'cxbkri3ld4hcx9z6'
    }
  }
}

const eskExample = {
  'changes': [{
    'formId': 'ckrgu2uldtxbgbg1h',
    'recordId': 'cq3pkp6lpwq07pd4',
    'parentRecordId': null,
    'fields': {
      'cq6zwqjlf82vdwm3': 'cr4xx3dlbs86w9y2:cv9umq8lehiq43f103',
      'csmijzwldtzh3bl38': 'cvlcuxtldtzh3bl37',
      'c75dtq4les7cpc82d': 'cdesthtldec3hei2:cp9vejmlosqpryz4',
      'cn10ozsldtxbraj1l': 'cr4xx3dlbs86w9y2:cv9umq8lehiq43f103',
      'cv9pg04ldu2u9h93j': 'cyi4zqdldu27njw36:cfki5tlleso4fy3c',
      'camsdoble7prey5o': 'cg7v61llbunvy9t9:c4s5fm0lebrkckc9',
      'c74nt9ale7prs2hp': 'cjy8nbnlbunzcnh1h:cxylhcclecp1fu236',
      'cs63bxkle7ps0xuq': 'c700rjplbuo1fjq5m:ckx035qlebsucnn13y',
      'cobl961lfk2oa3g3': 'cqvi6fqlbuo3hyc63:c21rblslfk31pl57',
      'cvq23zolfk3jvle9': 'cl69o0lldbf4rtk2:csomp5ilfqiu8ty2',
      'c8fnjxzles7i9yi2k': 'c7x3nhyles7iq962l',
      'csfoqprleh6qg1k3': '2023-11-01',
      'c16s0poldtxdh4i2k': 'cqjd0o4ld4hbyo12:co8y3rvld4hchx14',
      'cqi4oh3ldx7oxbk2b': 22,
      'cizsb4rldtxdh4i2r': 21,
      'cfoottlldtxdh4i2s': 1,
      'cxxg0f1ldtxdh4i2t': 2,
      'c7s25dpldtxdh4i2u': 3,
      'cszje7jldtxdh4i2v': 4,
      'c75mnm0ldtxdh4i2w': 5,
      'cpwm9hildtxdh4i2x': 6,
      'cy9uo60ldtxdh4i2y': 0
    }
  }]
}