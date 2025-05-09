export type AiFslcType = AiFslType.Type

export namespace AiFslType {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    'Reporting Month': string
    'Reporting Organization': Opt<'Partner'>
    'Implementing Partner': Opt<'Partner'>
    'Activity Plan Code': Opt<'FSLC Activity Planning Module (APM)'>
    'Response Theme'?: Opt<'Response Theme'>
    'Activity and indicator': Opt<'Indicators - FSL'>
    'Implementation Status': Opt<'Implementation Status'>
    Frequency?: Opt<'Frequency'>
    'Kcal covered  (per person per day)'?: number
    Unit?: Opt<'Unit'>
    'Total Quantity distributed (per person)'?: number
    'Total Cash Value (local currency)'?: number
    Currency?: Opt<'Currency'>
    'Cash Delivery Mechanism'?: Opt<'Cash Delivery Mechanism'>
    Oblast: string
    Raion: string
    Hromada: string
    Settlement?: string
    'Population Group': Opt<'Population Group'>
    'Total People Assisted': number
    'Girls (0-17)': number
    'Boys (0-17)': number
    'Adult Women (18-59)': number
    'Adult Men (18-59)': number
    'Older Women (60+)': number
    'Older Men (60+)': number
    'People With Disabilities'?: number
    'Households Assisted'?: number
    'New beneficiaries (assisted for the first time in 2025)': number
    'Were these people reached in 2025 by another FSL sub-indicator?': Opt<'Were these people reached in 2025 by another FSL sub-indicator?'>
    'If yes, which sub-indicator': Opt<'Indicators - FSL'>
    'If yes, how many people received from both sub-activities': number
    Comment?: string
    'HNRP Scope'?: Opt<'HNRP Scope'>
    'Outside HNRP Scope categories'?: Opt<'Outside HNRP Scope categories'>
    /**
      DO NOT EDIT THIS FIELD PLEASE!

БУДЬ ЛАСКА, НЕ РЕДАГУЙТЕ ЦЕ ПОЛЕ!
    */
    key?: string
  }

  export const buildRequest = (a: Type, recordId: string, parentRecordId: string | null = null) => {
    return [
      {
        formId: 'cxx4z9am74csoag9',
        recordId,
        parentRecordId,
        fields: {
          c5shhuim74ctls4b: a['Reporting Month'],
          c8ta7spm74cus9jd: a['Reporting Organization']
            ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Reporting Organization']!]
            : undefined,
          c8m0rzem74cwwi1g: a['Implementing Partner']
            ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Implementing Partner']!]
            : undefined,
          cbt281vm74czamji: a['Activity Plan Code']
            ? 'ch3x9upm67vz8ng3' + ':' + options['FSLC Activity Planning Module (APM)'][a['Activity Plan Code']!]
            : undefined,
          c8nrqwomaclgncx6: a['Response Theme'] ? options['Response Theme'][a['Response Theme']!] : undefined,
          chzv6znm74d91x8p: a['Activity and indicator']
            ? 'caybsh0m4r95mfm198' + ':' + options['Indicators - FSL'][a['Activity and indicator']!]
            : undefined,
          cj3gufum74db4w5s: a['Implementation Status']
            ? options['Implementation Status'][a['Implementation Status']!]
            : undefined,
          cai4mcjm74ddh3wv: a['Frequency'] ? options['Frequency'][a['Frequency']!] : undefined,
          cpqutcpm74dg00712: a['Kcal covered  (per person per day)'],
          codusvbm74djjk715: a['Unit'] ? options['Unit'][a['Unit']!] : undefined,
          clsqvjwm74dm6ig1b: a['Total Quantity distributed (per person)'],
          cc5bwyam74do3hg1c: a['Total Cash Value (local currency)'],
          cguxb7am74dqhl31f: a['Currency'] ? options['Currency'][a['Currency']!] : undefined,
          cnxiqgfm74drukl1j: a['Cash Delivery Mechanism']
            ? options['Cash Delivery Mechanism'][a['Cash Delivery Mechanism']!]
            : undefined,
          cns96rm74dvxy71u: a['Oblast'] ? 'ciok70dm4r8lp7f2' + ':' + a['Oblast'] : undefined,
          c1mu55wm74dwh0t1v: a['Raion'] ? 'c1v215km4s71ndl22' + ':' + a['Raion'] : undefined,
          c8gxbuvm74dxp151w: a['Hromada'] ? 'cu8n0g0m4s7y2p16b' + ':' + a['Hromada'] : undefined,
          c3w3q1jm74dyr3z1x: a['Settlement'] ? 'cyr4ry4m4s81hdd6v' + ':' + a['Settlement'] : undefined,
          cnowra7m74e26yb21: a['Population Group']
            ? 'cknn1yzm4s6xuox1x' + ':' + options['Population Group'][a['Population Group']!]
            : undefined,
          ccomu65m74e2xgo22: a['Total People Assisted'],
          c55sl1fm74e4gyl23: a['Girls (0-17)'],
          cruxt7xm74e669l24: a['Boys (0-17)'],
          c9w7c39m74e6thq25: a['Adult Women (18-59)'],
          c88exf5m74e80rv26: a['Adult Men (18-59)'],
          cbd136fm74eaa1e27: a['Older Women (60+)'],
          cw042h3m74ecuq028: a['Older Men (60+)'],
          cxlhhwem74edw9629: a['People With Disabilities'],
          cjv2vbem74ef0i22a: a['Households Assisted'],
          cqypj9sm74elbee2b: a['New beneficiaries (assisted for the first time in 2025)'],
          cc9dpi3m74en0yg2d: a['Were these people reached in 2025 by another FSL sub-indicator?']
            ? options['Were these people reached in 2025 by another FSL sub-indicator?'][
                a['Were these people reached in 2025 by another FSL sub-indicator?']!
              ]
            : undefined,
          cxmypsxm74erbao2f: a['If yes, which sub-indicator']
            ? 'caybsh0m4r95mfm198' + ':' + options['Indicators - FSL'][a['If yes, which sub-indicator']!]
            : undefined,
          cnzbyp9m74etytf2g: a['If yes, how many people received from both sub-activities'],
          cdhcrtym74f2x5x2k: a['Comment'],
          c1jpxpjm74f0pyh2i: a['HNRP Scope'] ? options['HNRP Scope'][a['HNRP Scope']!] : undefined,
          cvdttxbm74f1upg2j: a['Outside HNRP Scope categories']
            ? 'ch0e182m4vgc05r2' + ':' + options['Outside HNRP Scope categories'][a['Outside HNRP Scope categories']!]
            : undefined,
        },
      },
    ]
  }

  export const options = {
    Partner: {'Danish Refugee Council (DRC)': 'cjmwszwm4s8hlkyrae'},
    'FSLC Activity Planning Module (APM)': {
      'FSLC-DRC-00001': 'cxthga8m7ystarl6i',
      'FSLC-DRC-00002': 'cptll80m7ytnmrp15a',
    },
    'Indicators - FSL': {
      'Provision of market-based transitional cash and relief voucher assistance > # of individuals receiving market-based assistance to ensure their immediate access to food > Provision of market-based transitional relief voucher assistance > Cash/Voucher':
        'cbasp8bm74osbft4',
      'Distribution of in-kind food assistance > # of individuals receiving in-kind food assistance to ensure their immediate access to food > General Food Distribution > In-kind':
        'cr1uzgm74osbft5',
      'Distribution of in-kind food assistance > # of individuals receiving in-kind food assistance to ensure their immediate access to food > Hot meals > In-kind':
        'cf3vk9km74osbft6',
      'Distribution of in-kind food assistance > # of individuals receiving in-kind food assistance to ensure their immediate access to food > Rapid Response Ration > In-kind':
        'c9jfqzjm74osbft7',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Cereal seeds, seedlings, fertilizers, and hand tools > Cash/Voucher':
        'cih6ivzm74osbft8',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Equipment and tools, such as greenhouses, irrigation systems, motor blocks, etc > Cash/Voucher':
        'c4mrq01m74osbft9',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Multi purpose Agricultural grants or vouchers > Cash/Voucher':
        'ci9eh7gm74osbfta',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Vegetable seeds, seedlings, fertilizers, and hand tools > Cash/Voucher':
        'cdhbquim74osbftb',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Cereal seeds, seedlings, fertilizers, and hand tools > In-kind':
        'cjcx4nim74osbftc',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Equipment and tools, such as greenhouses, irrigation systems, motor blocks, etc > In-kind':
        'clccfrwm74osbftd',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Training on agricultural practice > Service':
        'cp2umu6m74osbfte',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Vegetable seeds, seedlings, fertilizers, and hand tools > In-kind':
        'cj5gx5vm74osbftf',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Other agricultural infrastructure rehabilitation > Cash/Voucher':
        'ca2h5jhm74osbftg',
      'Provision of agricultural inputs > # of individuals provided with emergency agriculture inputs, contributing to their food consumption > Other agricultural infrastructure rehabilitation > In-kind':
        'c5qb9v5m74osbfth',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Beekeeping grant > Cash/Voucher':
        'cawvfuum74osbfti',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock feed > Cash/Voucher':
        'cqwmzc9m74osbftj',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock health > Cash/Voucher':
        'cktsiu2m74osbftk',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock kit grants > Cash/Voucher':
        'c86wecom74osbftl',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock provision / restocking > Cash/Voucher':
        'ci3e5fzm74osbftm',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock shelter/barnes > Cash/Voucher':
        'c1q5kkom74osbftn',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Poultry kit (feed, health, provision) > Cash/Voucher':
        'c9qptflm74osbfto',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Beekeeping kit > Cash/Voucher':
        'cvz4yxsm74osbftp',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Beekeeping kit > In-kind':
        'cougjiwm74osbftq',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock feed > In-kind':
        'cgy0sc8m74osbftr',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock health > In-kind':
        'chgxytem74osbfts',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock provision / restocking > In-kind':
        'c70el2jm74osbftt',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock shelter/barnes > In-kind':
        'cgo6eo8m74osbftu',
      'Provision of productive animal survival > # of individuals provided with emergency livestock inputs, contributing to their food consumption > Poultry kit (feed, health, provision) > In-kind':
        'cuyht5km74osbftv',
      'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Emergency business grants > Cash/Voucher':
        'cjsmm6zm74osbftw',
      'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Start-up or self-employment grants > Cash/Voucher':
        'chi27tkm74osbftx',
      'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Cash for work > Cash/Voucher':
        'cxjgsw2m74osbfty',
      'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Job placements/internships/temporary work > Cash/Voucher':
        'cvuf7oim74osbftz',
      'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Business and entrepreneurship training or events > Service':
        'cv0w1fmm74osbft10',
      'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Job placements/internships/temporary work > Service':
        'ca9drsqm74osbft11',
      'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Vocational and reskilling training > Service':
        'cniimuim74osbft12',
      'Protection of emergency off-farm livelihoods > # of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Career councelling and employment training or events > Service':
        'cdxr6kom74osbft13',
    },
    'Population Group': {'Internally Displaced': 'c3yfomom4s6zizi20', 'Non-Displaced': 'cjccin8m4s6ztsm21'},
    'Outside HNRP Scope categories': {
      'Outside priority areas': 'c3ap6l0m4vgd4ov4',
      'Funding not reported in FTS​': 'c9801rnm4vgdewn5',
      'Delivered outside HNRP​ mechanism': 'cgc12ggm4vgdovj6',
      'Not aligned to guidance': 'cei6bscm4vgdvpq7',
    },
    'Response Theme': {Evacuations: 'cpomm6tmaclgncx5', 'Emergency response after strikes': 'cdvh6xymaclhrqo7'},
    'Implementation Status': {Ongoing: 'cw8mkxsm74db4w5r', Completed: 'c2eiij2m74dcav9t'},
    Frequency: {
      Weekly: 'cw34ekkm74ddh3wu',
      Biweekly: 'chaemqkm74ddzuzw',
      Monthly: 'c6y1cnim74de34rx',
      Bimonthly: 'cb16xium74deh10y',
      Quarterly: 'c8oilyhm74deyl3z',
      'One-off': 'c2af6jlm74df2v110',
      Other: 'c70bsarm74df9m611',
    },
    Unit: {
      Grams: 'cg8wld5m74djjk614',
      Kilograms: 'clcp65am74dk7vs16',
      Tons: 'ckhu31m74dkant17',
      Animals: 'cfo9yy2m74dkcyl18',
      Objects: 'cee14w2m74dkrm719',
      Trainings: 'cxdkkknm74dkvt01a',
    },
    Currency: {EUR: 'ccn4ls7m74dqhl31e', UAH: 'cw900bfm74dr0m01g', USD: 'c7whof8m74dr2k81h'},
    'Cash Delivery Mechanism': {
      'ATM Card': 'csa8rhvm74drukl1i',
      'Bank Transfer': 'clygy9fm74dsjt91k',
      'Direct Cash Payment': 'cayxllym74dsuc01l',
      'E-Transfer': 'c86j261m74dt0gf1m',
      'E-Voucher': 'clkpbtpm74dt7861n',
      'Mobile Money': 'clgl89em74dtda91o',
      'Money Transfer Agent': 'cyu9dmqm74dtmv91p',
      'Paper Voucher': 'c926bnum74dtt261q',
      'Post Office': 'ckjvidrm74dtycg1r',
      'Other Mechanisms': 'c1qq0dzm74du3k61s',
    },
    'Were these people reached in 2025 by another FSL sub-indicator?': {
      Yes: 'cpsp477m74en0yg2c',
      No: 'c2rn16qm74epszt2e',
    },
    'HNRP Scope': {'Outside HNRP Scope': 'cci23kym74f0pyh2h'},
  }
}
