export namespace AiSnfiType {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'Reporting Organization': Opt<'Reporting Organization'>,
    'Implementing Partner'?: Opt<'Implementing Partner'>,
    'Plan/Project Code': Opt<'Plan/Project Code'>,
    'Indicators - SNFI': Opt<'Indicators - SNFI'>,
    'Distribution through Common Pipeline': Opt<'Distribution through Common Pipeline'>,
    'Distribution through inter-agency convoy (HOPC)': Opt<'Distribution through inter-agency convoy (HOPC)'>,
    'Oblast': string,
    'Raion': string,
    'Hromada': string,
    'Settlement'?: string,
    'Collective Site'?: string,
    'Reporting Date (YYYY-MM-DD)': string,
    'Reporting Month': string,
    'Population Group': Opt<'Population Group'>,
    'Non-individuals Reached': number,
    'Total Individuals Reached': number,
    'Girls (0-17)': number,
    'Boys (0-17)': number,
    'Adult Women (18-59)': number,
    'Adult Men (18-59)': number,
    'Older Women (60+)': number,
    'Older Men (60+)': number,
    'People with disability'?: number,
    'Comment'?: string
  }

  export const map = (a: Type) => ({
    'cs1qazglr960f863y': a['Reporting Organization'] === undefined ? undefined : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
    'cuyzrsclr960f873z': a['Implementing Partner'] === undefined ? undefined : 'czbgrslpwg36j52' + ':' + options['Implementing Partner'][a['Implementing Partner']!],
    'cg1pbdjlr965gbs4v': a['Plan/Project Code'] === undefined ? undefined : 'c52pe2mlr95snzf1q' + ':' + options['Plan/Project Code'][a['Plan/Project Code']!],
    'c95dt4flrkljpae5': a['Indicators - SNFI'] === undefined ? undefined : 'cfsiyzhlqb3qx23ac' + ':' + options['Indicators - SNFI'][a['Indicators - SNFI']!],
    'cryl3w4ls03kgonh': a['Distribution through Common Pipeline'] === undefined ? undefined : options['Distribution through Common Pipeline'][a['Distribution through Common Pipeline']!],
    'c9r0xuyls03nuejj': a['Distribution through inter-agency convoy (HOPC)'] === undefined ? undefined : options['Distribution through inter-agency convoy (HOPC)'][a['Distribution through inter-agency convoy (HOPC)']!],
    'c6bulw2lqf3085j4y': a['Oblast'] === undefined ? undefined : 'cemuxawlq3kfmqf2' + ':' + a['Oblast'],
    'cb39ganlqf3085j4z': a['Raion'] === undefined ? undefined : 'cd5q9sdlq3kklo314' + ':' + a['Raion'],
    'cmdrqq8lqf3085j50': a['Hromada'] === undefined ? undefined : 'cwlaxxlq3kp2bu5a' + ':' + a['Hromada'],
    'cn43jajlqf3085j51': a['Settlement'] === undefined ? undefined : 'cfn5ltdlq3lbcb95w' + ':' + a['Settlement'],
    'cy26vp3lr960f8e4a': a['Collective Site'] === undefined ? undefined : a['Collective Site'],
    'cq4oobolr960f8e4d': a['Reporting Date (YYYY-MM-DD)'] === undefined ? undefined : a['Reporting Date (YYYY-MM-DD)'],
    'cpljznblr960f8f4e': a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    'coklklr960f8i4i': a['Population Group'] === undefined ? undefined : 'cf8ig2alq6dbe8t2' + ':' + options['Population Group'][a['Population Group']!],
    'cbzwmwnlr960f8i4k': a['Non-individuals Reached'] === undefined ? undefined : a['Non-individuals Reached'],
    'cj9zrudlr960f8j4l': a['Total Individuals Reached'] === undefined ? undefined : a['Total Individuals Reached'],
    'ch0ejrblr960f8m4m': a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    'c1514a9lr960f8m4n': a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    'cjiw5cglr960f8o4o': a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
    'cvftzh8lr960f8o4p': a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
    'cr5nvs9lr960f8p4q': a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
    'cfe87k6lr960f8q4r': a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
    'cxoosq1lr960f8r4s': a['People with disability'] === undefined ? undefined : a['People with disability'],
    'cgpsrwqlrq4ezo1m': a['Comment'] === undefined ? undefined : a['Comment']
  })

  export const options = {
    'Reporting Organization': {
      'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'
    },
    'Implementing Partner': {
      'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'
    },
    'Plan/Project Code': {
      'SNFI-DRC-00001': 'cogjzchltfvf0i96',
      'SNFI-DRC-00002': 'comrbdrltfvt2ba7',
      'SNFI-DRC-00003': 'cfk562tltfvw5658',
      'SNFI-DRC-00004': 'cxdte2dltfvym1p9',
      'SNFI-DRC-00005': 'cz4d1myltfw08qza',
      'SNFI-DRC-00006': 'cqpalmjlth6tlpb2',
      'SNFI-DRC-00007': 'chd9sl9ltihdbdn4',
      'SNFI-DRC-00008': 'cb8q500ltjrjl0j4',
    },
    'Indicators - SNFI': {
      '# of individuals supported with emergency shelter support': 'cqbiyfslrke6ze93',
      '# of individuals supported with emergency construction materials': 'ciikv4xlrke6zea4',
      '# of individuals supported through Prykhystok': 'c3tkc5mlrke6zea5',
      '# of individuals supported with NFIs': 'cdibfn0lrke6zea6',
      // "# of individuals supported with NFIs": 'cozl3hllrke6zea7',
      '# of individuals supported through insulation of substandard homes': 'cmi92iglrke6zea8',
      // "# of individuals supported through insulation of substandard homes": 'c2b3oeelrke6zea9',
      '# of individuals supported with cash for utilities': 'cqq0mzxlrke6zeaa',
      '# of individuals supported through provision of sustainable energy at the home': 'cjcnjnqlrke6zeab',
      // "# of individuals supported through provision of sustainable energy at the home": 'ce94o8wlrke6zeac',
      '# of individuals supported with light humanitarian repairs': 'coe5n5slrke6zead',
      // "# of individuals supported with light humanitarian repairs": 'cv42tfvlrke6zeae',
      '# of individuals supported with medium humanitarian repairs': 'cjtu8tjlrke6zeaf',
      // "# of individuals supported with medium humanitarian repairs": 'c874hhclrke6zeag',
      '# of individuals supported through repairs to common spaces in multistories': 'c7pdvcslrke6zeah',
      // "# of individuals supported through repairs to common spaces in multistories": 'c1hggf3lrke6zeai',
      '# of individuals supported by cash for rent (RMI)': 'ck09zltlrke6zeaj',
      '# of individuals supported through refurbishment of collective sites': 'cugh87clrke6zeak',
      '# of individuals supported through humanitarian repairs of social facilities': 'coqqm9slrke6zeal',
      // "# of individuals supported through humanitarian repairs of social facilities": 'cakfcirlrke6zeam',
      '# of individuals supported with heavy humanitarian repairs': 'cu7r3xtlrke6zebn',
      // "# of individuals supported with heavy humanitarian repairs": 'clah6j5lrke6zebo',
      '# of individuals supported with transitional shelter': 'comaq5nlrke6zebp',
      // "# of individuals supported with transitional shelter": 'cvwtyp0lrke6zebq',
      '# of individuals supported with white appliances': 'cu9qmu0lrke6zebr',
      // "# of individuals supported with white appliances": 'cgrctz9lrke6zebs',
      // "# of individuals supported with NFIs": 'cuwfb5ulrke6zebt',
      // "# of individuals supported through insulation of substandard homes": 'cf0jhphlrke6zebu',
      // "# of individuals supported through provision of sustainable energy at the home": 'cdnwq5blrke6zebv',
      // "# of individuals supported with light humanitarian repairs": 'ccagmwilrke6zebw',
      // "# of individuals supported with medium humanitarian repairs": 'c9f82yflrke6zebx',
      // "# of individuals supported with white appliances": 'ccw1bxlrke6zeby',
      '# supported with non-standard NFIs': 'ckddjh0lrke6zebz',
      '# supported with core house reconstruction': 'cgpklgxlrke6zeb10',
      '# of individuals supported with winter heating appliances': 'cw1trxolrke6zeb11',
      // "# of individuals supported with winter heating appliances": 'c7aa1telrke6zeb12',
      '# of individuals reached with support for winter energy needs (cash/voucher/fuel)': 'c2w7eoblrke6zeb13',
      // "# of individuals reached with support for winter energy needs (cash/voucher/fuel)": 'cailiytlrke6zeb14',
      '# of individuals supported with winter clothes': 'cesc70ilrke6zeb15',
      // "# of individuals supported with winter clothes": 'cm0qc6flrke6zeb16',
      '# of individuals supported with winter NFIs': 'c9s84polrke6zeb17',
      // "# of individuals supported with winter NFIs": 'c8ojxm4lrke6zeb18',
      // "# of individuals supported with winter heating appliances": 'cbjnxfulrke6zeb19',
      // "# of individuals reached with support for winter energy needs (cash/voucher/fuel)": 'c6g9rfklrke6zeb1a',
      // "# of individuals supported with winter clothes": 'cavj34llrke6zeb1b',
      // "# of individuals supported with winter NFIs": 'cka2oeolrke6zeb1c'
    },
    'Distribution through Common Pipeline': {
      'Yes': 'c4rrv3dls03kgong',
      'No': 'cg7qn48ls03l08gi'
    },
    'Distribution through inter-agency convoy (HOPC)': {
      'Yes': 'c7xcwyels03nuejk',
      'No': 'cuf5onjls03nuejl'
    },
    'Population Group': {
      'Internally Displaced': 'cvw4on6lq6dgcoj5',
      'Non-Displaced': 'ck6ulx8lq6dgcok6',
      'Returnees': 'cuz9qi9lq6dgcok7'
    }
  }

}