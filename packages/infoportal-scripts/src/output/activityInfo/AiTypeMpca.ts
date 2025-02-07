export namespace AiTypeMpca {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    /**
      Reporting Organization    */
    org_rep: Opt<'org_rep'>
    /**
      Implementing Partner    */
    org_imp: Opt<'org_imp'>
    /**
      Activity Plan Code    */
    plan_code: Opt<'plan_code'>
    /**
      Donor    */
    donor: string
    /**
      Indicators - MPCA    */
    indicator?: Opt<'indicator'>
    /**
      Total amount (USD) distributed through multi-purpose cash assistance
      The total cost for the MPCA activity, including financial service provider costs.    */
    MP101_CV_02: number
    /**
      Payments Frequency    */
    frequency: Opt<'frequency'>
    /**
      Targeting Framework    */
    target_frame: Opt<'target_frame'>
    /**
      Financial Service Provider (FSP)    */
    FSP: Opt<'FSP'>
    /**
      Response Theme    */
    theme: Opt<'theme'>
    /**
      Raion    */
    adm2?: string
    /**
      Hromada    */
    adm3: string
    /**
      Settlement    */
    adm4?: string
    /**
      Collective Site    */
    cs?: string
    /**
      Reporting Month    */
    month_rep: string
    /**
      Activity Start Month    */
    month_start?: string
    /**
      Activity End Month    */
    month_end?: string
    /**
      Number of Covered Months    */
    duration: Opt<'duration'>
    /**
      Population Group    */
    popgroup: Opt<'popgroup'>
    /**
      Total Individuals Reached    */
    ind_total: number
    /**
      Girls (0-17)    */
    ind_girls: number
    /**
      Boys (0-17)    */
    ind_boys: number
    /**
      Adult Women (18-59)    */
    ind_adwomen: number
    /**
      Adult Men (18-59)    */
    ind_admen: number
    /**
      Older Women (60+)    */
    ind_oldwomen: number
    /**
      Older Men (60+)    */
    ind_oldmen: number
    /**
      People with disability
      Out of the total individuals reached    */
    ind_pwd: number
    /**
      Girls with disability (0-17)    */
    girls_pwd?: number
    /**
      Boys with disability (0-17)    */
    boys_pwd?: number
    /**
      Adult Women with disability (18-59)    */
    adwomen_pwd?: number
    /**
      Adult Men with disability (18-59)    */
    admen_pwd?: number
    /**
      Older Women with disability (60+)    */
    oldwomen_pwd?: number
    /**
      Older Men with disability (60+)    */
    oldmen_pwd?: number
    /**
      HNRP Scope    */
    hnrp_scope?: Opt<'hnrp_scope'>
    /**
      Outside HNRP Scope sub-categories    */
    outscope_type?: Opt<'outscope_type'>
  }

  export const map = (a: Type) => ({
    cw67b3nlq6so74pf:
      a['Reporting Organization'] === undefined
        ? undefined
        : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
    c53wwymlq6so74pg:
      a['Implementing Partner'] === undefined
        ? undefined
        : 'czbgrslpwg36j52' + ':' + options['Implementing Partner'][a['Implementing Partner']!],
    cxzc3wylqxzrn9i2:
      a['Activity Plan Code'] === undefined
        ? undefined
        : 'c80149tlqm62xpv1tk' + ':' + options['Activity Plan Code'][a['Activity Plan Code']!],
    cmuq05dlqnsj7yqf: a['Donor'] === undefined ? undefined : a['Donor'],
    ckv9joulsvxoptn2:
      a['Indicators - MPCA'] === undefined
        ? undefined
        : 'cid2wxslqb3pzob9e' + ':' + options['Indicators - MPCA'][a['Indicators - MPCA']!],
    c9aasnglqnsgaq6e:
      a['Total amount (USD) distributed through multi-purpose cash assistance'] === undefined
        ? undefined
        : a['Total amount (USD) distributed through multi-purpose cash assistance'],
    cakkhd9lqntdpktd:
      a['Payments Frequency'] === undefined ? undefined : options['Payments Frequency'][a['Payments Frequency']!],
    c23tps3lu6qi1jq6:
      a['Targeting Framework'] === undefined ? undefined : options['Targeting Framework'][a['Targeting Framework']!],
    cjrs9bzlr0f2x6wd:
      a['Financial Service Provider (FSP)'] === undefined
        ? undefined
        : options['Financial Service Provider (FSP)'][a['Financial Service Provider (FSP)']!],
    cb7ml4clqnt87pf3: a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!],
    cetir2xlqnrziz03: a['Raion'] === undefined ? undefined : a['Raion'],
    cshl0i7lq6so74qp: a['Hromada'] === undefined ? undefined : a['Hromada'],
    c2o66c6lq6so74qq: a['Settlement'] === undefined ? undefined : a['Settlement'],
    cf2masdlq6so74qr: a['Collective Site'] === undefined ? undefined : a['Collective Site'],
    cmol4qhlq6so74qv: a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    c4t8d0xlqz50e1e2: a['Activity Start Month'] === undefined ? undefined : a['Activity Start Month'],
    c4aesi0lqz510nh3: a['Activity End Month'] === undefined ? undefined : a['Activity End Month'],
    canw5vhlqntauao6:
      a['Number of Covered Months'] === undefined
        ? undefined
        : options['Number of Covered Months'][a['Number of Covered Months']!],
    cf6hv4zlq6so74qz:
      a['Population Group'] === undefined
        ? undefined
        : 'cf8ig2alq6dbe8t2' + ':' + options['Population Group'][a['Population Group']!],
    c8docc8lq6so74q12: a['Total Individuals Reached'] === undefined ? undefined : a['Total Individuals Reached'],
    cxxa4fmlq6so74q13: a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    cihl0t2lq6so74q14: a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    cm5uwnwlq6so74q15: a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
    csp8uxllq6so74q16: a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
    cy3skbtlq6so74q17: a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
    c91006ylq6so74r18: a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
    cexzo0hlq6so74r19: a['People with disability'] === undefined ? undefined : a['People with disability'],
    cll4mlllqp9p0mr4: a['Girls with disability (0-17)'] === undefined ? undefined : a['Girls with disability (0-17)'],
    c3cim3lqp9pzl35: a['Boys with disability (0-17)'] === undefined ? undefined : a['Boys with disability (0-17)'],
    cutta7glqp9qq8v6:
      a['Adult Women with disability (18-59)'] === undefined ? undefined : a['Adult Women with disability (18-59)'],
    cyacnhzlqp9rkug7:
      a['Adult Men with disability (18-59)'] === undefined ? undefined : a['Adult Men with disability (18-59)'],
    cyk1e6rlqp9s7sk8:
      a['Older Women with disability (60+)'] === undefined ? undefined : a['Older Women with disability (60+)'],
    cwt6rrtlqp9sz659:
      a['Older Men with disability (60+)'] === undefined ? undefined : a['Older Men with disability (60+)'],
    cfpnh6elw6flq1u3: a['HNRP Scope'] === undefined ? undefined : options['HNRP Scope'][a['HNRP Scope']!],
    cy3friplw6fxn6w4:
      a['Outside HNRP Scope sub-categories'] === undefined
        ? undefined
        : 'cs4astklw6ftd2y2' +
          ':' +
          options['Outside HNRP Scope sub-categories'][a['Outside HNRP Scope sub-categories']!],
  })

  export const options = {
    org_rep: {'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'},
    org_imp: {'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'},
    plan_code: {
      'MPCA-DRC-00001': 'cghgcrlltn5k1wn2',
      'MPCA-DRC-00002': 'cf1o4x9ltn5mws75',
      'MPCA-DRC-00003': 'cin9hupltn5o8y68',
      'MPCA-DRC-00004': 'clpzjvyltn5ow78a',
      'MPCA-DRC-00005': 'ccyfia1luwf5qys3',
      'MPCA-DRC-00006': 'cmfd695luwfodg67',
      'MPCA-DRC-00007': 'cj53fxfluwfvu265i',
      'MPCA-DRC-00008': 'cx68b6hlvz4sptv14y',
      'MPCA-DRC-00009': 'cz6ahurlw0lz2g52',
      'MPCA-DRC-00010': 'ch81mymlw0o1el93',
      'MPCA-DRC-00011': 'cu5abj0m0w38bc52',
      'MPCA-DRC-00012': 'c4jpb7xm38tx8su2',
      'MPCA-DRC-00013': 'ck959bmm4inykm0a',
    },
    indicator: {
      '# of individuals assisted with multi-purpose cash assistance': 'cyj5n1elqb3qh9ba5',
      '# amount (USD) distributed through multi-purpose cash assistance': 'c7vtwjhlqb3qh9ba6',
      '% of households who report being able to meet their basic needs as they define and prioritize them':
        'cd0hscblqb3qh9ba7',
      '% of recipients (disaggregated by sex, age, and disability) reporting that humanitarian assistance is delivered in a safe manner':
        'c92m9uflqb3qh9ba8',
      '% of recipients (disaggregated by sex, age, and disability) reporting that humanitarian assistance is delivered in an accessible manner':
        'czn5galqb3qh9ba9',
      '% of essential needs covered per sector': 'c64d3uwlqb3qh9baa',
      '% of recipients (disaggregated by sex, age, and disability) reporting that humanitarian assistance is delivered in a timely manner':
        'c5at5eelqb3qh9bab',
    },
    frequency: {'One-off': 'c22oxp8lqntdpktc', 'Multiple payments': 'cigkge6lqnteihce'},
    target_frame: {
      'Regular Targeting': 'cewjd3vlu6qi1jq5',
      'Rapid Targeting': 'cfi4u8rlu6qm2j67',
      Unknown: 'ce3ihfulu6qm5qe8',
    },
    FSP: {
      'Bank Transfer': 'crpccsqlr0f2x6wc',
      'Digital Wallets': 'cqsen3tlsljp7rz8',
      MoneyGram: 'cqfsd11lr0f5bzgf',
      'Private Post Office': 'ckvdcjxlr0f5vavh',
      'Ukrposhta (delivery)': 'c83wejdlsljok6h7',
      'Ukrposhta (pick up)': 'c56c4rhlr0f5hrkg',
      'Western Union': 'ca6qhyclr0f569te',
    },
    theme: {'No specific theme': 'clx2juzlqnt87pe2'},
    duration: {
      'One month': 'czbonyjlqntauao5',
      'Two months': 'cokxxzhlqntc71k7',
      'Three months (recommended)': 'c6s6jv3lqntc9ua8',
      'Four months': 'cab6to9lqntckcz9',
      'Five months': 'ctsl3i3lqntco52a',
      'Six months': 'cwqi52ylqntcx15b',
    },
    popgroup: {
      'Internally Displaced': 'cvw4on6lq6dgcoj5',
      'Non-Displaced': 'ck6ulx8lq6dgcok6',
      Returnees: 'cuz9qi9lq6dgcok7',
    },
    hnrp_scope: {'Outside HNRP Scope': 'c5xynzmlw6flq1u2'},
    outscope_type: {
      'Outside priority areas': 'cvf0ba4lw6fucqv4',
      'Funding not reported in FTS​': 'c7cah40lw6fula95',
      'Delivered outside HNRP​ mechanism': 'cj4y1s3lw6furva6',
      'Not aligned to guidance': 'c8mycj4lw6fv7477',
    },
  }
}
