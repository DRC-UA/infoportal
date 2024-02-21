export namespace AiTypeSnfiRmm {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'Reporting Partner': Opt<'Reporting Partner'>,
    'Report to a planned project': Opt<'Report to a planned project'>,
    'Plan Code': Opt<'Plan Code'>,
    'Implementing Partner': Opt<'Implementing Partner'>,
    'SNFI indictors': Opt<'SNFI indictors'>,
    'Distribution through IOM NFI Common Pipeline'?: Opt<'Distribution through IOM NFI Common Pipeline'>,
    'Oblast': string,
    'Raion': string,
    'Hromada': string,
    'Settlement': string,
    'Collective Site': string,
    'Implementation status': Opt<'Implementation status'>,
    'Reporting Date (YYYY-MM-DD)': string,
    'Population Group': Opt<'Population Group'>,
    'Indicator Value (HHs reached, buildings, etc.)': number,
    '# Individuals Reached': number,
    'Girls (0-17)': number,
    'Boys (0-17)': number,
    'Women (18-59)': number,
    'Men (18-59)': number,
    'Elderly Women (60+)': number,
    'Elderly Men (60+)': number,
    'People with disability'?: number
  }

  export const map = (a: Type) => ({
    'cq6zwqjlf82vdwm3': a['Reporting Partner'] === undefined ? undefined : 'cr4xx3dlbs86w9y2' + ':' + options['Reporting Partner'][a['Reporting Partner']!],
    'csmijzwldtzh3bl38': a['Report to a planned project'] === undefined ? undefined : options['Report to a planned project'][a['Report to a planned project']!],
    'c75dtq4les7cpc82d': a['Plan Code'] === undefined ? undefined : 'cdesthtldec3hei2' + ':' + options['Plan Code'][a['Plan Code']!],
    'cn10ozsldtxbraj1l': a['Implementing Partner'] === undefined ? undefined : 'cr4xx3dlbs86w9y2' + ':' + options['Implementing Partner'][a['Implementing Partner']!],
    'cv9pg04ldu2u9h93j': a['SNFI indictors'] === undefined ? undefined : 'cyi4zqdldu27njw36' + ':' + options['SNFI indictors'][a['SNFI indictors']!],
    'ct345swleh7rbj47': a['Distribution through IOM NFI Common Pipeline'] === undefined ? undefined : options['Distribution through IOM NFI Common Pipeline'][a['Distribution through IOM NFI Common Pipeline']!],
    'camsdoble7prey5o': a['Oblast'] === undefined ? undefined : a['Oblast'],
    'c74nt9ale7prs2hp': a['Raion'] === undefined ? undefined : a['Raion'],
    'cs63bxkle7ps0xuq': a['Hromada'] === undefined ? undefined : a['Hromada'],
    'cobl961lfk2oa3g3': a['Settlement'] === undefined ? undefined : a['Settlement'],
    'cvq23zolfk3jvle9': a['Collective Site'] === undefined ? undefined : a['Collective Site'],
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
      'cc2oeg9lfcltvxs2': 'cc2oeg9lfcltvxs2',
      'cqbc4a0lfcmcba79': 'cqbc4a0lfcmcba79',
      'cimr207lfcmlc3te': 'cimr207lfcmlc3te',
      'cdbzb1rlfcmtstbi': 'cdbzb1rlfcmtstbi',
      'c3vslbnlfcnk477k': 'c3vslbnlfcnk477k',
      'c6dfzmflfco0dzxq': 'c6dfzmflfco0dzxq',
      'c7bw6p5lfcob0w5x': 'c7bw6p5lfcob0w5x',
      'co1cpbhlfcoijgo12': 'co1cpbhlfcoijgo12',
      'cl9endilfcomq1u15': 'cl9endilfcomq1u15',
      'cjrzs01lfcoqlv118': 'cjrzs01lfcoqlv118',
      'c9cnokdlfcozmj81b': 'c9cnokdlfcozmj81b',
      'ca8ikqllgc9q5o42': 'ca8ikqllgc9q5o42'
    },
    'Implementing Partner': {
      'Danish Refugee Council': 'cv9umq8lehiq43f103'
    },
    'SNFI indictors': {
      'SN101': 'cfki5tlleso4fy3c',
      'SN105': 'cpyzq6bleso4fy3d',
      // "SN105": 'csalzgqleso4fy3e',
      // "SN105": 'c26k8r0leso4fy3f',
      // "SN105": 'cvtcm66leso4fy3g',
      // "SN105": 'chal488leso4fy3h',
      // "SN105": 'cpunls3leso4fy3i',
      'SN108': 'cvx2enaleso4fy3j',
      'SN209': 'chqvyjsleso4fy3k',
      'SN211': 'cr9tef2leso4fy3l',
      // "SN209": 'cpdiym0leso4fy3m',
      // "SN211": 'csmfud9leso4fy3n',
      // "SN209": 'c6rx5unleso4fy3o',
      // "SN211": 'ccg81qqleso4fy3p',
      'SNX01': 'cu7k41zleso4fy3q',
      'SNX03': 'ciqbvlleso4fy3r',
      // "SNX01": 'cnu3iivleso4fy3s',
      // "SNX03": 'cvqvy18leso4fy3t',
      // "SNX01": 'c5h36iileso4fy3u',
      // "SNX03": 'cdgav4nleso4fy3v'
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