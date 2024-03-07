export namespace AiTypeMpca {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'Reporting Organization': Opt<'Reporting Organization'>,
    'Implementing Partner': string,
    'Activity Plan Code': Opt<'Activity Plan Code'>,
    'Indicators - MPCA'?: Opt<'Indicators - MPCA'>,
    'Total amount (USD) distributed through multi-purpose cash assistance': number,
    'Payments Frequency': Opt<'Payments Frequency'>,
    'Financial Service Provider (FSP)': Opt<'Financial Service Provider (FSP)'>,
    'Response Theme': Opt<'Response Theme'>,
    'Raion'?: string,
    'Hromada': string,
    'Settlement'?: string,
    'Collective Site'?: string,
    'Reporting Month': string,
    'Activity Start Month'?: string,
    'Activity End Month'?: string,
    'Number of Covered Months': Opt<'Number of Covered Months'>,
    'Population Group': Opt<'Population Group'>,
    'Total Individuals Reached': number,
    'Girls (0-17)': number,
    'Boys (0-17)': number,
    'Adult Women (18-59)': number,
    'Adult Men (18-59)': number,
    'Older Women (60+)': number,
    'Older Men (60+)': number,
    'People with disability': number,
    'Girls with disability (0-17)'?: number,
    'Boys with disability (0-17)'?: number,
    'Adult Women with disability (18-59)'?: number,
    'Adult Men with disability (18-59)'?: number,
    'Older Women with disability (60+)'?: number,
    'Older Men with disability (60+)'?: number
  }

  export const map = (a: Type) => ({
    'cw67b3nlq6so74pf': a['Reporting Organization'] === undefined ? undefined : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
    'c53wwymlq6so74pg': a['Implementing Partner'] === undefined ? undefined : a['Implementing Partner'],
    'cxzc3wylqxzrn9i2': a['Activity Plan Code'] === undefined ? undefined : 'c80149tlqm62xpv1tk' + ':' + options['Activity Plan Code'][a['Activity Plan Code']!],
    'ckv9joulsvxoptn2': a['Indicators - MPCA'] === undefined ? undefined : 'cid2wxslqb3pzob9e' + ':' + options['Indicators - MPCA'][a['Indicators - MPCA']!],
    'c9aasnglqnsgaq6e': a['Total amount (USD) distributed through multi-purpose cash assistance'] === undefined ? undefined : a['Total amount (USD) distributed through multi-purpose cash assistance'],
    'cakkhd9lqntdpktd': a['Payments Frequency'] === undefined ? undefined : options['Payments Frequency'][a['Payments Frequency']!],
    'cjrs9bzlr0f2x6wd': a['Financial Service Provider (FSP)'] === undefined ? undefined : options['Financial Service Provider (FSP)'][a['Financial Service Provider (FSP)']!],
    'cb7ml4clqnt87pf3': a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!],
    'cetir2xlqnrziz03': a['Raion'] === undefined ? undefined : a['Raion'],
    'cshl0i7lq6so74qp': a['Hromada'] === undefined ? undefined : a['Hromada'],
    'c2o66c6lq6so74qq': a['Settlement'] === undefined ? undefined : a['Settlement'],
    'cf2masdlq6so74qr': a['Collective Site'] === undefined ? undefined : a['Collective Site'],
    'cmol4qhlq6so74qv': a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    'c4t8d0xlqz50e1e2': a['Activity Start Month'] === undefined ? undefined : a['Activity Start Month'],
    'c4aesi0lqz510nh3': a['Activity End Month'] === undefined ? undefined : a['Activity End Month'],
    'canw5vhlqntauao6': a['Number of Covered Months'] === undefined ? undefined : options['Number of Covered Months'][a['Number of Covered Months']!],
    'cf6hv4zlq6so74qz': a['Population Group'] === undefined ? undefined : 'cf8ig2alq6dbe8t2' + ':' + options['Population Group'][a['Population Group']!],
    'c8docc8lq6so74q12': a['Total Individuals Reached'] === undefined ? undefined : a['Total Individuals Reached'],
    'cxxa4fmlq6so74q13': a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    'cihl0t2lq6so74q14': a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    'cm5uwnwlq6so74q15': a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
    'csp8uxllq6so74q16': a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
    'cy3skbtlq6so74q17': a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
    'c91006ylq6so74r18': a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
    'cexzo0hlq6so74r19': a['People with disability'] === undefined ? undefined : a['People with disability'],
    'cll4mlllqp9p0mr4': a['Girls with disability (0-17)'] === undefined ? undefined : a['Girls with disability (0-17)'],
    'c3cim3lqp9pzl35': a['Boys with disability (0-17)'] === undefined ? undefined : a['Boys with disability (0-17)'],
    'cutta7glqp9qq8v6': a['Adult Women with disability (18-59)'] === undefined ? undefined : a['Adult Women with disability (18-59)'],
    'cyacnhzlqp9rkug7': a['Adult Men with disability (18-59)'] === undefined ? undefined : a['Adult Men with disability (18-59)'],
    'cyk1e6rlqp9s7sk8': a['Older Women with disability (60+)'] === undefined ? undefined : a['Older Women with disability (60+)'],
    'cwt6rrtlqp9sz659': a['Older Men with disability (60+)'] === undefined ? undefined : a['Older Men with disability (60+)']
  })

  export const options = {
    'Reporting Organization': {
      'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'
    },
    'Activity Plan Code': {},
    'Indicators - MPCA': {
      '# of individuals assisted with multi-purpose cash assistance': 'cyj5n1elqb3qh9ba5',
      '# amount (USD) distributed through multi-purpose cash assistance': 'c7vtwjhlqb3qh9ba6',
      '% of households who report being able to meet their basic needs as they define and prioritize them': 'cd0hscblqb3qh9ba7',
      '% of recipients (disaggregated by sex, age, and disability) reporting that humanitarian assistance is delivered in a safe manner': 'c92m9uflqb3qh9ba8',
      '% of recipients (disaggregated by sex, age, and disability) reporting that humanitarian assistance is delivered in an accessible manner': 'czn5galqb3qh9ba9',
      '% of essential needs covered per sector': 'c64d3uwlqb3qh9baa',
      '% of recipients (disaggregated by sex, age, and disability) reporting that humanitarian assistance is delivered in a timely manner': 'c5at5eelqb3qh9bab'
    },
    'Payments Frequency': {
      'One-off': 'c22oxp8lqntdpktc',
      'Multiple payments': 'cigkge6lqnteihce'
    },
    'Financial Service Provider (FSP)': {
      'Bank Transfer': 'crpccsqlr0f2x6wc',
      'Digital Wallets': 'cqsen3tlsljp7rz8',
      'MoneyGram': 'cqfsd11lr0f5bzgf',
      'Private Post Office': 'ckvdcjxlr0f5vavh',
      'Ukrposhta (delivery)': 'c83wejdlsljok6h7',
      'Ukrposhta (pick up)': 'c56c4rhlr0f5hrkg',
      'Western Union': 'ca6qhyclr0f569te'
    },
    'Response Theme': {
      'No specific theme': 'clx2juzlqnt87pe2'
    },
    'Number of Covered Months': {
      'One month': 'czbonyjlqntauao5',
      'Two months': 'cokxxzhlqntc71k7',
      'Three months (recommended)': 'c6s6jv3lqntc9ua8',
      'Four months': 'cab6to9lqntckcz9',
      'Five months': 'ctsl3i3lqntco52a',
      'Six months': 'cwqi52ylqntcx15b'
    },
    'Population Group': {
      'Internally Displaced': 'cvw4on6lq6dgcoj5',
      'Non-Displaced': 'ck6ulx8lq6dgcok6',
      'Returnees': 'cuz9qi9lq6dgcok7'
    }
  }

}