export namespace AiTypeFslc {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'Reporting Month': string
    'Reporting Organization': Opt<'Reporting Organization'>
    'Implementing Partner'?: Opt<'Implementing Partner'>
    'Activity Plan Code': Opt<'Activity Plan Code'>
    'Activity and indicator': Opt<'Activity and indicator'>
    'Implementation Status': Opt<'Implementation Status'>
    Frequency?: Opt<'Frequency'>
    'Kcal covered  (per person per day)'?: number
    Unit?: Opt<'Unit'>
    'Total Quantity distributed (per person)'?: number
    'Total Value (local currency)'?: number
    Currency?: Opt<'Currency'>
    'Cash delivery mechanism'?: Opt<'Cash delivery mechanism'>
    Oblast: Opt<'Oblast'>
    Raion: string
    Hromada: string
    Settlement?: string
    'Location type'?: Opt<'Location type'>
    'Population Group': Opt<'Population Group'>
    'Number of people reached': number
    'Girls (0-17)': number
    'Boys (0-17)': number
    'Adult Women (18-59)': number
    'Adult Men (18-59)': number
    'Older Women (60+)': number
    'Older Men (60+)': number
    'Number of people with disability'?: number
    'Number of reached households'?: number
    'New beneficiaries (assisted for the first time in 2024)': number
    'Were these people reached in 2024 by another FSL sub-activity?': Opt<'Were these people reached in 2024 by another FSL sub-activity?'>
    'If yes, which sub-activity': Opt<'If yes, which sub-activity'>
    'If yes, how many people received from both sub-activities': number
    Comments?: string
    key: string
    'HNRP Scope'?: Opt<'HNRP Scope'>
    'Outside HNRP Scope sub-categories'?: Opt<'Outside HNRP Scope sub-categories'>
  }

  export const map = (a: Type) => ({
    c5xzo7ilqc8soyxy: a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    c3x7t6ylqc66x155:
      a['Reporting Organization'] === undefined
        ? undefined
        : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
    cuemiqzlqc6c2k88:
      a['Implementing Partner'] === undefined
        ? undefined
        : 'czbgrslpwg36j52' + ':' + options['Implementing Partner'][a['Implementing Partner']!],
    c47kem6ls28yvcg4:
      a['Activity Plan Code'] === undefined
        ? undefined
        : 'cjjdxkylqdjn7p72' + ':' + options['Activity Plan Code'][a['Activity Plan Code']!],
    cwboqx7lqc9cx5i12:
      a['Activity and indicator'] === undefined
        ? undefined
        : 'cvseljqlqb3ntvj7j' + ':' + options['Activity and indicator'][a['Activity and indicator']!],
    c3lymiilqc9r6qr14:
      a['Implementation Status'] === undefined
        ? undefined
        : options['Implementation Status'][a['Implementation Status']!],
    cp6l488lqca6as81s: a['Frequency'] === undefined ? undefined : options['Frequency'][a['Frequency']!],
    c14yq8gls26mj3nc:
      a['Kcal covered  (per person per day)'] === undefined ? undefined : a['Kcal covered  (per person per day)'],
    cet46puls26p5noe: a['Unit'] === undefined ? undefined : options['Unit'][a['Unit']!],
    c4hr51dls270cnki:
      a['Total Quantity distributed (per person)'] === undefined
        ? undefined
        : a['Total Quantity distributed (per person)'],
    chs58s3lqca2w271q: a['Total Value (local currency)'] === undefined ? undefined : a['Total Value (local currency)'],
    c9axoqdlqca1d331n: a['Currency'] === undefined ? undefined : options['Currency'][a['Currency']!],
    cxjlomilqc9wp9b1c:
      a['Cash delivery mechanism'] === undefined
        ? undefined
        : options['Cash delivery mechanism'][a['Cash delivery mechanism']!],
    cddimyllqc7p5vdk:
      a['Oblast'] === undefined ? undefined : 'cemuxawlq3kfmqf2' + ':' + options['Oblast'][a['Oblast']!],
    cgzvhgwlqc7zjuvl: a['Raion'] === undefined ? undefined : a['Raion'],
    cluq8u7lqc81x2bm: a['Hromada'] === undefined ? undefined : a['Hromada'],
    cn8bos4lqc84hi0n: a['Settlement'] === undefined ? undefined : a['Settlement'],
    c1m3xohls2786wqk: a['Location type'] === undefined ? undefined : options['Location type'][a['Location type']!],
    c68n3qzlqc981m410:
      a['Population Group'] === undefined
        ? undefined
        : 'cf8ig2alq6dbe8t2' + ':' + options['Population Group'][a['Population Group']!],
    cdhyf9tlqcab8261z: a['Number of people reached'] === undefined ? undefined : a['Number of people reached'],
    cii0393lqcajgwu21: a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    cbmkl0klqcale6622: a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    c5xgzvblqcamsrx23: a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
    chcj26blqcax7ou24: a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
    cgzc21slqcaxhqn25: a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
    cqoejaglqcay3pr26: a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
    cq4uxglqcayeav27:
      a['Number of people with disability'] === undefined ? undefined : a['Number of people with disability'],
    caomv6mls27r2m3t: a['Number of reached households'] === undefined ? undefined : a['Number of reached households'],
    ck0g4kpls27s7dvu:
      a['New beneficiaries (assisted for the first time in 2024)'] === undefined
        ? undefined
        : a['New beneficiaries (assisted for the first time in 2024)'],
    c2jbl2kls27x2tow:
      a['Were these people reached in 2024 by another FSL sub-activity?'] === undefined
        ? undefined
        : options['Were these people reached in 2024 by another FSL sub-activity?'][
            a['Were these people reached in 2024 by another FSL sub-activity?']!
          ],
    chpi4dhls8w61ct2:
      a['If yes, which sub-activity'] === undefined
        ? undefined
        : 'cvseljqlqb3ntvj7j' + ':' + options['If yes, which sub-activity'][a['If yes, which sub-activity']!],
    cad7my8ls282dx115:
      a['If yes, how many people received from both sub-activities'] === undefined
        ? undefined
        : a['If yes, how many people received from both sub-activities'],
    ctbdca9ls28349s16: a['Comments'] === undefined ? undefined : a['Comments'],
    cvxm25lucpueia7: a['key'] === undefined ? undefined : a['key'],
    c5qzmw6lw6flfyl3: a['HNRP Scope'] === undefined ? undefined : options['HNRP Scope'][a['HNRP Scope']!],
    cr3o9h1lw6fxhoo4:
      a['Outside HNRP Scope sub-categories'] === undefined
        ? undefined
        : 'cs4astklw6ftd2y2' +
          ':' +
          options['Outside HNRP Scope sub-categories'][a['Outside HNRP Scope sub-categories']!],
  })

  export const options = {
    'Reporting Organization': {
      'Danish Refugee Council': 'cloyih3lpwhjdsu2r0',
    },
    'Implementing Partner': {
      'Danish Refugee Council': 'cloyih3lpwhjdsu2r0',
    },
    'Activity Plan Code': {
      'FSLC-DRC-00001': 'csp3fvaltn0j3ou2',
      'FSLC-DRC-00002': 'cbcn08hltn0lsg03',
      'FSLC-DRC-00003': 'cex9iwdltn0pa1y4',
      'FSLC-DRC-00004': 'c9fdyl6m0wi6rxz15j',
      'FSLC-DRC-00005': 'c8ds712m0wibuyo15k',
      'FSLC-DRC-00006': 'ccif15em0xgz1of2',
      'FSLC-DRC-00007': 'ch3p5pxm20hjc1z2',
      'FSLC-DRC-00008': 'ce8581lm5qv7rse3',
      'FSLC-DRC-00009': 'ctgme0cm5qvrxa96i',
    },
    'Activity and indicator': {
      'Provision of market-based assistance > Provision of market-based relief voucher assistance (value voucher or commodity voucher) > # of individuals receiving market-based assistance to ensure their immediate access to food > Cash':
        'cdsseb9luclbdwv2',
      'Agriculture and livestock inputs (cash) > Agricultural grants > # of individuals receiving sectoral cash to contributing to household food security > Cash':
        'cv58tzkluclbdwv3',
      'Agriculture and livestock inputs (cash) > Sectoral cash for seeds and tools > # of individuals receiving sectoral cash to contributing to household food security > Cash':
        'cksul5oluclbdwv4',
      'Agriculture and livestock inputs (cash) > Sectoral cash for livestock and poultry input (restocking/distribution) > # of individuals receiving sectoral cash to contributing to household food security > Cash':
        'cod9ox4luclbdwv5',
      'Agriculture and livestock inputs (cash) > Sectoral cash for temporary livestock shelter > # of individuals receiving sectoral cash to contributing to household food security > Cash':
        'cgsu89wluclbdwv6',
      'Agriculture and livestock inputs (cash) > Sectoral cash for animal feed > # of individuals receiving sectoral cash to contributing to household food security > Cash':
        'cx8imqaluclbdwv7',
      'Agriculture and livestock inputs (cash) > Sectoral cash for livestock health > # of individuals receiving sectoral cash to contributing to household food security > Cash':
        'cl3nmf1luclbdwv8',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Support to cooperatives and market linkages > # of individuals supported with rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Cash':
        'cqn8fmluclbdwv9',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Temporary repair of grain and vegetable storage > # of individual farmers supported with repairs of their livestock shelter, grain, and vegetable storage > Cash':
        'c1y6esfluclbdwva',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Temporary repair of livestock shelter/barns > # of individual farmers supported with repairs of their livestock shelter, grain, and vegetable storage > Cash':
        'cy77eh2luclbdwvb',
      'Urban and off-farm (Non-agricultural) livelihoods > Small business grants (startup grants) > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Cash':
        'cwf5wugluclbdwvc',
      'Urban and off-farm (Non-agricultural) livelihoods > Cash for work > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Cash':
        'cy7mlolluclbdwvd',
      'Distribution of in-kind food assistance > General Food Distribution > # of individuals receiving in-kind food assistance to ensure their immediate access to food > In-kind':
        'ckb9x6nluclbdwve',
      'Distribution of in-kind food assistance > Rapid Response Ration  > # of individuals receiving in-kind food assistance to ensure their immediate access to food > In-kind':
        'cudv593luclbdwvf',
      'Distribution of in-kind food assistance > Institutional feeding > # of individuals receiving in-kind food assistance to ensure their immediate access to food > In-kind':
        'clk0ve8luclbdwvg',
      'Distribution of in-kind food assistance > Hot meals > # of individuals receiving in-kind food assistance to ensure their immediate access to food > In-kind':
        'c62jbb4luclbdwvh',
      'Agriculture and livestock inputs (in-kind) > Cereal seeds and tools > # of individuals provided with emergency agriculture and livestock inputs, contributing to their food consumption > In-kind':
        'cajjme8luclbdwvi',
      'Agriculture and livestock inputs (in-kind) > Vegetable seed and tools > # of individuals provided with emergency agriculture and livestock inputs, contributing to their food consumption > In-kind':
        'cwuh3kxluclbdwvj',
      'Agriculture and livestock inputs (in-kind) > Emergency livestock and poultry input (restocking, poultry distribution) > # of individuals provided with emergency agriculture and livestock inputs, contributing to their food consumption > In-kind':
        'c1r8kw1luclbdwvk',
      'Agriculture and livestock inputs (in-kind) > Support to livestock and poultry health > # of individuals provided with emergency agriculture and livestock inputs, contributing to their food consumption > In-kind':
        'clqz8mdluclbdwvl',
      'Agriculture and livestock inputs (in-kind) > Support to livestock and poultry feed > # of individuals provided with emergency agriculture and livestock inputs, contributing to their food consumption > In-kind':
        'cacdxvsluclbdwvm',
      'Agriculture and livestock inputs (in-kind) > Support to beekeepers (tools and equipment) > # of individuals provided with emergency agriculture and livestock inputs, contributing to their food consumption > In-kind':
        'cddjt06luclbdwvn',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Support to cooperatives and market linkages > # of individuals supported with rehabilitation of the agricultural infrastructure, cooperative support, and value chain > In-kind':
        'cqumr0mluclbdwvo',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Temporary repair of grain and vegetable storage > # of individual farmers supported with repairs of their livestock shelter, grain, and vegetable storage > In-kind':
        'cig4itpluclbdwvp',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Temporary repair of livestock shelter/barns > # of individual farmers supported with repairs of their livestock shelter, grain, and vegetable storage > In-kind':
        'c680vshluclbdwvq',
      'Agriculture and livestock inputs (in-kind) > Training on agricultural practice > # of individuals provided with emergency agriculture and livestock inputs, contributing to their food consumption > Service':
        'c9gwbc6luclbdwvr',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Support to cooperatives and market linkages > # of individuals supported with rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Service':
        'clpm48jluclbdwvs',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Temporary repair of grain and vegetable storage > # of individual farmers supported with repairs of their livestock shelter, grain, and vegetable storage > Service':
        'c14nmxnluclbdwvt',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Temporary repair of livestock shelter/barns > # of individual farmers supported with repairs of their livestock shelter, grain, and vegetable storage > Service':
        'cwlq0zmluclbdwvu',
      'Urban and off-farm (Non-agricultural) livelihoods > Employment and reskilling > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Service':
        'c7x4cjiluclbdwvv',
      'Urban and off-farm (Non-agricultural) livelihoods > Job placement and counseling > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Service':
        'c16nyfvluclbdwvw',
      'Urban and off-farm (Non-agricultural) livelihoods > Temporary employment programs > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Service':
        'c190tv5luclbdwvx',
      'Urban and off-farm (Non-agricultural) livelihoods > Technical and vocational education and training (TVET) > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Service':
        'ca0kvknluclbdwvy',
      'Urban and off-farm (Non-agricultural) livelihoods > Bussiness trainings and skill enhancement workshops > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Service':
        'cp9zi8yluclbdwvz',
      'Provision of market-based assistance > Provision of market-based relief voucher assistance (value voucher or commodity voucher) > # of individuals receiving market-based assistance to ensure their immediate access to food > Voucher':
        'cnuo9k8luclbdwv10',
      'Agriculture and livestock inputs (cash) > Sectoral cash for seeds and tools > # of individuals receiving sectoral cash to contributing to household food security > Voucher':
        'clcwb1hluclbdwv11',
      'Agriculture and livestock inputs (cash) > Sectoral cash for livestock and poultry input (restocking/distribution) > # of individuals receiving sectoral cash to contributing to household food security > Voucher':
        'c69xjcrluclbdwv12',
      'Agriculture and livestock inputs (cash) > Sectoral cash for temporary livestock shelter > # of individuals receiving sectoral cash to contributing to household food security > Voucher':
        'cxckdpeluclbdwv13',
      'Agriculture and livestock inputs (cash) > Sectoral cash for animal feed > # of individuals receiving sectoral cash to contributing to household food security > Voucher':
        'cb8q6qgluclbdwv14',
      'Agriculture and livestock inputs (cash) > Sectoral cash for livestock health > # of individuals receiving sectoral cash to contributing to household food security > Voucher':
        'cfm70w9luclbdwv15',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Support to cooperatives and market linkages > # of individuals supported with rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Voucher':
        'crkjt22luclbdwv16',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Temporary repair of grain and vegetable storage > # of individual farmers supported with repairs of their livestock shelter, grain, and vegetable storage > Voucher':
        'cwnkw41luclbdwv17',
      'Temporary rehabilitation of the agricultural infrastructure, cooperative support, and value chain > Temporary repair of livestock shelter/barns > # of individual farmers supported with repairs of their livestock shelter, grain, and vegetable storage > Voucher':
        'cco7mfeluclbdwv18',
    },
    'Implementation Status': {
      Completed: 'cg07fuklqc9r6qq13',
      Ongoing: 'c6s86zqlqc9sloo15',
    },
    Frequency: {
      Weekly: 'cobeyzclqca6as81r',
      Fortnight: 'cy66rvklqca75ce1t',
      Monthly: 'cr09863lqca7avy1u',
      Quarterly: 'c672byclqca7ezi1v',
      'One-off': 'cgjbd91lqca7msv1w',
      Other: 'cdfo485lqca7xym1x',
      'Bi-monthly': 'cn9xsotlyebztvz7',
    },
    Unit: {
      Tons: 'c19r7opls26p5nod',
      Kilograms: 'cmdpumdls26qzmof',
      Grams: 'cwoj9z1ls26r2a7g',
      Trainings: 'c1llff3ls26rdo9h',
      Animals: 'cuvmooilsogvr3q2',
      Objects: 'ci5tdi7m0ur3p494',
    },
    Currency: {
      EUR: 'c4kgwg9lqca2b8e1o',
      UAH: 'cuc2fcqlqca1d331m',
      USD: 'cxfbx1plqca2e4m1p',
    },
    'Cash delivery mechanism': {
      'ATM Card': 'ccupph2lqc9wp9b1b',
      'Bank Transfer': 'cm3fx07lqc9xsyg1d',
      'Direct cash payment': 'cfpj6qglqc9xymn1e',
      'E-transfer': 'crpuyxwlqc9ycad1f',
      'E-voucher': 'cn3kwz7lqc9ygev1g',
      'Mobile Money': 'cm8mloclqc9ymrq1h',
      'Money Transfer Agent': 'c9wcc13lqc9z1j91i',
      'Paper Voucher': 'cr6f8z3lqc9z9f21j',
      'Post Office': 'cf1261jlqc9ze661k',
      'Other mechanisms': 'cybkw5hlqc9zj3k1l',
    },
    Oblast: {
      'Autonomous Republic of Crimea_Автономна Республіка Крим': 'c5c2sr3lq3kjj6gd',
      Cherkaska_Черкаська: 'clbgltvlq3kjj6he',
      Chernihivska_Чернігівська: 'c7jz1shlq3kjj6hf',
      Chernivetska_Чернівецька: 'c78zq2rlq3kjj6hg',
      Dnipropetrovska_Дніпропетровська: 'c6l0fjylq3kjj6hh',
      Donetska_Донецька: 'c3memjqlq3kjj6hi',
      'Ivano-Frankivska_Івано-Франківська': 'cy93k5lq3kjj6hj',
      Kharkivska_Харківська: 'cbbcx5ylq3kjj6hk',
      Khersonska_Херсонська: 'cq8k2oylq3kjj6hl',
      Khmelnytska_Хмельницька: 'cliunu3lq3kjj6hm',
      Kirovohradska_Кіровоградська: 'cxvw276lq3kjj6hn',
      Kyiv_Київ: 'cwe11jplq3kjj6ho',
      Kyivska_Київська: 'cnp046mlq3kjj6hp',
      Luhanska_Луганська: 'ctu8ahklq3kjj6hq',
      Lvivska_Львівська: 'cmpyidslq3kjj6hr',
      Mykolaivska_Миколаївська: 'ccqvlallq3kjj6hs',
      Odeska_Одеська: 'c2uwqqqlq3kjj6ht',
      Poltavska_Полтавська: 'cwq2uuxlq3kjj6hu',
      Rivnenska_Рівненська: 'c2j0t0flq3kjj6hv',
      Sevastopol_Севастополь: 'cjvbpkplq3kjj6hw',
      Sumska_Сумська: 'cb4nm4xlq3kjj6hx',
      Ternopilska_Тернопільська: 'clrrzfslq3kjj6hy',
      Vinnytska_Вінницька: 'cvx17yllq3kjj6hz',
      Volynska_Волинська: 'cdzklrblq3kjj6h10',
      Zakarpatska_Закарпатська: 'cfqiux5lq3kjj6h11',
      Zaporizka_Запорізька: 'cmqvx7elq3kjj6h12',
      Zhytomyrska_Житомирська: 'c51dllnlq3kjj6h13',
    },
    'Location type': {
      Rural: 'cazwy1bls2786wqj',
      'Urban / Peri-urban': 'cd7dhfvls279bv8l',
      'Collective centers': 'cqhhz4als279lhqm',
      'Health Institution': 'cqi9ossls279thwn',
      'Educational institution': 'cfyj2e3ls279vcyo',
      'Social Institution': 'cszqcjxls27a1qlp',
      'Charity / NGO': 'cijxlcnls27acalq',
      'Local authority': 'c4w31sls27ahbir',
      Other: 'cer3u3yls27amhjs',
    },
    'Population Group': {
      'Internally Displaced': 'cvw4on6lq6dgcoj5',
      'Non-Displaced': 'ck6ulx8lq6dgcok6',
      Returnees: 'cuz9qi9lq6dgcok7',
    },
    'Were these people reached in 2024 by another FSL sub-activity?': {
      Yes: 'cmqxgadls27x2tov',
      No: 'clcxcdzls27xkm0x',
    },
    'If yes, which sub-activity': {
      FSL: 'cdsseb9luclbdwv2',
      FSL: 'cv58tzkluclbdwv3',
      FSL: 'cksul5oluclbdwv4',
      FSL: 'cod9ox4luclbdwv5',
      FSL: 'cgsu89wluclbdwv6',
      FSL: 'cx8imqaluclbdwv7',
      FSL: 'cl3nmf1luclbdwv8',
      FSL: 'cqn8fmluclbdwv9',
      FSL: 'c1y6esfluclbdwva',
      FSL: 'cy77eh2luclbdwvb',
      FSL: 'cwf5wugluclbdwvc',
      FSL: 'cy7mlolluclbdwvd',
      FSL: 'ckb9x6nluclbdwve',
      FSL: 'cudv593luclbdwvf',
      FSL: 'clk0ve8luclbdwvg',
      FSL: 'c62jbb4luclbdwvh',
      FSL: 'cajjme8luclbdwvi',
      FSL: 'cwuh3kxluclbdwvj',
      FSL: 'c1r8kw1luclbdwvk',
      FSL: 'clqz8mdluclbdwvl',
      FSL: 'cacdxvsluclbdwvm',
      FSL: 'cddjt06luclbdwvn',
      FSL: 'cqumr0mluclbdwvo',
      FSL: 'cig4itpluclbdwvp',
      FSL: 'c680vshluclbdwvq',
      FSL: 'c9gwbc6luclbdwvr',
      FSL: 'clpm48jluclbdwvs',
      FSL: 'c14nmxnluclbdwvt',
      FSL: 'cwlq0zmluclbdwvu',
      FSL: 'c7x4cjiluclbdwvv',
      FSL: 'c16nyfvluclbdwvw',
      FSL: 'c190tv5luclbdwvx',
      FSL: 'ca0kvknluclbdwvy',
      FSL: 'cp9zi8yluclbdwvz',
      FSL: 'cnuo9k8luclbdwv10',
      FSL: 'clcwb1hluclbdwv11',
      FSL: 'c69xjcrluclbdwv12',
      FSL: 'cxckdpeluclbdwv13',
      FSL: 'cb8q6qgluclbdwv14',
      FSL: 'cfm70w9luclbdwv15',
      FSL: 'crkjt22luclbdwv16',
      FSL: 'cwnkw41luclbdwv17',
      FSL: 'cco7mfeluclbdwv18',
    },
    'HNRP Scope': {
      'Outside HNRP Scope': 'cse3gxjlw6flfyl2',
    },
    'Outside HNRP Scope sub-categories': {
      'Outside priority areas': 'cvf0ba4lw6fucqv4',
      'Funding not reported in FTS​': 'c7cah40lw6fula95',
      'Delivered outside HNRP​ mechanism': 'cj4y1s3lw6furva6',
      'Not aligned to guidance': 'c8mycj4lw6fv7477',
    },
  }
}
