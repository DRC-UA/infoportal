// const x = {
//   'changes': [{
//     'formId': 'cdabzugldwuqqzo2',
//     'recordId': 'cndcqnxlr0lq0qk2',
//     'parentRecordId': null,
//     'fields': {
//       'ci607odlbs8w4pe2': 'cr4xx3dlbs86w9y2:cv9umq8lehiq43f103',
//       'cyq7n1zleo9wajf8': 'c6haa99le4g0c634:cqv2ex3leo1smc92',
//       'ckkwefble7p7iph8': 'cg7v61llbunvy9t9:ciua21glebrkckb2',
//       'ckqsibble7p7umj9': 'cjy8nbnlbunzcnh1h:clrmtnqlecp1fu03',
//       'cjmhva4le7p82b9a': 'c700rjplbuo1fjq5m:chagq9rlebstwse2'
//     }
//   }, {
//     'formId': 'czyzhrldwuqqzp3',
//     'recordId': 'cl26vj0lr0mg69a3',
//     'parentRecordId': 'cndcqnxlr0lq0qk2',
//     'fields': {
//       'cmxllh3ldsuvom9g': '2023-12',
//       'c19j8p9ldsv4qa3o': 'cqjd0o4ld4hbyo12:co8y3rvld4hchx14',
//       'c79be77ldswj831t': 'c3vbxtgldsw1as42:cvsdmhjle4efhhq19',
//       'cn37fnmlbs8mvny3r': 0
//     }
//   }]
// }

import {aiHromadas, aiOblasts, aiRaions, DrcProject} from '@infoportal-common'

export namespace AiGbvInterface {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'ID'?: string,
    'Partner Organization': Opt<'Partner Organization'>,
    'Implementing Partner 1'?: string,
    'Implementing Partner 2'?: string,
    'Plan Code': Opt<'Plan Code'>,
    'Oblast': string,
    'Raion': string,
    'Hromada': string,
    'Settlement'?: string,
    'Collective Centre'?: string,
    'Response Theme'?: Opt<'Response Theme'>,
    'Sub Activities': SubActivity[]
  }

  export interface SubActivity {
    'Reporting Month': string,
    'Population Group': Opt<'Population Group'>,
    'Protection Indicators': Opt<'Protection Indicators'>,
    // 'Protection Sub-Indicators'?: Opt<'Protection Sub-Indicators'>,
    'Total Individuals Reached': number,
    'Girls': number,
    'Boys': number,
    'Adult Women': number,
    'Adult Men': number,
    'Elderly Women': number,
    'Elderly Men': number,
    'Achievement (non-individual)'?: number,
    'People with disability'?: number
  }

  export const map = (a: Type) => ({
    'ci8ugsnldt0vh8z1c': a['ID'] === undefined ? undefined : a['ID'],
    'ci607odlbs8w4pe2': a['Partner Organization'] === undefined ? undefined : 'cr4xx3dlbs86w9y2' + ':' + options['Partner Organization'][a['Partner Organization']!],
    'cmlymv8ldsuaebzb': a['Implementing Partner 1'] === undefined ? undefined : a['Implementing Partner 1'],
    'c4iibgxldsubqwqc': a['Implementing Partner 2'] === undefined ? undefined : a['Implementing Partner 2'],
    'cyq7n1zleo9wajf8': a['Plan Code'] === undefined ? undefined : 'c6haa99le4g0c634' + ':' + options['Plan Code'][a['Plan Code']!],
    // 'ckkwefble7p7iph8': a['Oblast'] === undefined ? undefined : a['Oblast'],
    // 'ckqsibble7p7umj9': a['Raion'] === undefined ? undefined : a['Raion'],
    // 'cjmhva4le7p82b9a': a['Hromada'] === undefined ? undefined : a['Hromada'],

    // @ts-ignore
    'ckkwefble7p7iph8': 'cg7v61llbunvy9t9:' + aiOblasts[a['Oblast']],
    // @ts-ignore
    'ckqsibble7p7umj9': 'cjy8nbnlbunzcnh1h:' + aiRaions[a['Raion']],
    // @ts-ignore
    'cjmhva4le7p82b9a': 'c700rjplbuo1fjq5m:' + aiHromadas[a['Hromada']],

    'citz8g7le7p8aisb': a['Settlement'] === undefined ? undefined : a['Settlement'],
    'c6mrow2le7p8jswc': a['Collective Centre'] === undefined ? undefined : a['Collective Centre'],
    'cfzh1whldu8r0u84k': a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!],
  })

  export const mapSubActivities = (a: SubActivity) => ({
    'cmxllh3ldsuvom9g': a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    'c19j8p9ldsv4qa3o': a['Population Group'] === undefined ? undefined : 'cqjd0o4ld4hbyo12' + ':' + options['Population Group'][a['Population Group']!],
    'c79be77ldswj831t': a['Protection Indicators'] === undefined ? undefined : 'c3vbxtgldsw1as42' + ':' + options['Protection Indicators'][a['Protection Indicators']!],
    // 'ccli5mkldt1r8lb1d': a['Protection Sub-Indicators'] === undefined ? undefined : 'c91xm2fldt1k1kh8' + ':' + options['Protection Sub-Indicators'][a['Protection Sub-Indicators']!],
    'cgwjgg2ldsx1nzsv': a['Total Individuals Reached'] === undefined ? undefined : a['Total Individuals Reached'],
    'c62l7s0lbs8mvnx3b': a['Girls'] === undefined ? undefined : a['Girls'],
    'cqvizd5lbs8mvnx3d': a['Boys'] === undefined ? undefined : a['Boys'],
    'ceij8s2lbs8mvnx3f': a['Adult Women'] === undefined ? undefined : a['Adult Women'],
    'cpbkputlbs8mvny3h': a['Adult Men'] === undefined ? undefined : a['Adult Men'],
    'cpkkgqulbs8mvny3j': a['Elderly Women'] === undefined ? undefined : a['Elderly Women'],
    'cmyfyd8lbs8mvny3l': a['Elderly Men'] === undefined ? undefined : a['Elderly Men'],
    'cn37fnmlbs8mvny3r': a['Achievement (non-individual)'] === undefined ? undefined : a['Achievement (non-individual)'],
    'cj41459lbs8mvny3n': a['People with disability'] === undefined ? undefined : a['People with disability']
  })

  export const options = {
    'Partner Organization': {
      'Danish Refugee Council': 'cv9umq8lehiq43f103'
    },
    'Plan Code': {
      'cqv2ex3leo1smc92': 'cqv2ex3leo1smc92', // GBV-DRC-00001
      'c13xfxtleo35w163': 'c13xfxtleo35w163', // GBV-DRC-00002
      'c11bjfrleo4eol68': 'c11bjfrleo4eol68', // GBV-DRC-00003
      [DrcProject['UKR-000347 DANIDA']]: 'cb7jjjlljcxspbl2', // GBV-DRC-00004
      [DrcProject['UKR-000345 BHA2']]: 'cdxjam2llw0jtqca' // GBV-DRC-00005
    },
    'Response Theme': {
      'Newly retaken area': 'cgjvsvoldu8r0u84j',
      'Winter response': 'cfh6bxxldu8ra1j4l'
    },
    'Population Group': {
      'IDPs': 'co8y3rvld4hchx14',
      'Non-Displaced': 'cl76cbild4hcq8i5',
      'Returnees': 'cxbkri3ld4hcx9z6'
    },
    'Protection Indicators': {
      '# of GBV survivors and people at risk supported with GBV case management that meet minimum standards': 'c5s2rlble4efhhqt',
      /**/  '# of GBV survivors and people at risk provided with specialized GBV PSS assistance that meet minimum standards': 'c499bule4efhhqu',
      '# of operational GBV shelters': 'cliq72dle4efhhqv',
      '# of  GBV survivors and people at risk who received services in shelters': 'ci0f79tle4efhhqw',
      '# of operational GBV crisis rooms': 'c6jl12cle4efhhqx',
      '# of GBV survivors and people at risk who received services in GBV crisis rooms': 'cltetczle4efhhqy',
      '# of operational GBV day care center': 'c499cy9le4efhhqz',
      '# of GBV survivors and people at risk who received services in GBV day care centers': 'css4kbole4efhhq10',
      '# of operational women and girls\' safe spaces': 'ccpxkpjle4efhhq11',
      /**/  '# of women and girls who received recreational and livelihood skills including vocational education sessions in women and girls safe spaces': 'cwcwbi9le4efhhq12',
      '# of GBV survivors and those at risk supported with age appropriate and gender sensitive legal assistance and counseling': 'cpf3585le4efhhq13',
      /**/  '# of women and girls who received dignity kits': 'c3nd2kxle4efhhq14',
      '# GBV survivors and those at risk supported with cash and voucher assistance': 'cfaw0gcle4efhhq15',
      /**/  '# of persons received information on GBV services, referrals, preventive and risk mitigation action': 'c7m8si3le4efhhq16',
      '# of non-GBV humanitarian workers trained /sensitized on GBV risk prevention and mitigation': 'crdnemile4efhhq17',
      '# of GBV workers from specialized services (national, regional, local or international) trained in GBViE minimum standards': 'cvwyhulle4efhhq18',
      '# of advocacy interventions undertaken on GBV issues': 'cvsdmhjle4efhhq19',
      '# of GBV Safety Audits conducted': 'ccbkdiule4efhhq1a',
      '# of GBV assessments conducted': 'c7aifbhle4efhhq1b',
      '# of Rayons with updated functional GBV referral pathways': 'cktfsz3le4efhhq1c',
      '# of GBV Hotlines operational': 'cmnyaiklezjw6i02',
    },
  }
}