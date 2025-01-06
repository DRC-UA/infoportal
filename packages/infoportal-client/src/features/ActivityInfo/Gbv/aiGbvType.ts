export namespace AiGbvType {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    ID?: string
    'Reporting Organization': Opt<'Reporting Organization'>
    'Implementing Partner'?: string
    'Implementing Partner 2'?: string
    'Plan/Project Code': Opt<'Plan/Project Code'>
    Oblast: Opt<'Oblast'>
    Raion: string
    Hromada: string
    Settlement?: string
    'Collective Site'?: string
    'Response Theme': Opt<'Response Theme'>
  }

  export const map = (a: Type) => {
    return {
      cvb0gcplqf3085j4s: a['ID'] === undefined ? undefined : a['ID'],
      c1g03yllqf3085j4t:
        a['Reporting Organization'] === undefined
          ? undefined
          : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
      ct68whplqf3085j4u: a['Implementing Partner'] === undefined ? undefined : a['Implementing Partner'],
      cz796xnlqf3085j4v: a['Implementing Partner 2'] === undefined ? undefined : a['Implementing Partner 2'],
      cokrtv7lrixjgcd9:
        a['Plan/Project Code'] === undefined
          ? undefined
          : 'cqfsgcblr6f4hbpzu' + ':' + options['Plan/Project Code'][a['Plan/Project Code']!],
      c6bulw2lqf3085j4y: a['Oblast'] === undefined ? undefined : 'cemuxawlq3kfmqf2' + ':' + a['Oblast']!,
      cb39ganlqf3085j4z: a['Raion'] === undefined ? undefined : a['Raion'],
      cmdrqq8lqf3085j50: a['Hromada'] === undefined ? undefined : a['Hromada'],
      cn43jajlqf3085j51: a['Settlement'] === undefined ? undefined : a['Settlement'],
      ce0zvlllqf3085j52: a['Collective Site'] === undefined ? undefined : a['Collective Site'],
      c18374vlqf3085j54:
        a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!],
    }
  }

  export const options = {
    'Reporting Organization': {
      'Danish Refugee Council': 'cloyih3lpwhjdsu2r0',
    },
    'Plan/Project Code': {
      'GBV-DRC-00001': 'c10nfqbls2wqyvg2',
      'GBV-DRC-00002': 'co0svlsls2x3ndr3',
      'GBV-DRC-00003': 'cftn5bgls2xbfl14',
      'GBV-DRC-00004': 'cqr8n0hls2xh58h5',
      'GBV-DRC-00005': 'c3xqrqfls2xll546',
      'GBV-DRC-00006': 'cujyq82lx8vzpq17',
      'GBV-DRC-00007': 'cd2wcsflx8w67gb8',
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
    'Response Theme': {
      'No specific theme': 'c40c4vklqf3085j55',
    },
  }

  type OptSub<T extends keyof typeof optionsSub> = keyof (typeof optionsSub)[T]

  export interface TypeSub {
    'Reporting Month': string
    'Population Group': OptSub<'Population Group'>
    'Type of beneficiaries'?: OptSub<'Type of beneficiaries'>
    Indicators: OptSub<'Indicators'>
    'Total Individuals Reached': number
    'Girls (0-17)': number
    'Boys (0-17)': number
    'Adult Women (18-59)': number
    'Adult Men (18-59)': number
    'Older Women (60+)': number
    'Older Men (60+)': number
    'Non-individuals Reached/Quantity'?: number
    'People with Disability'?: number
    'Basic/Essential'?: number
    Elderly?: number
    Winter?: number
    Other?: number
    'Type of distribution'?: OptSub<'Type of distribution'>
    'Who distributed the kits?'?: OptSub<'Who distributed the kits?'>
    'Dignity kits in stock?'?: OptSub<'Dignity kits in stock?'>
    // 'Basic/Essential': number,
    // 'Elderly': number,
    // 'Winter': number,
    // 'Other kits in stock': number,
    // 'Current status of stock'?: OptSub<'Current status of stock'>,
    'Any assessment/feedback done/collected on post distribution of kits?'?: OptSub<'Any assessment/feedback done/collected on post distribution of kits?'>
    'Was the service provided to evacuees?'?: OptSub<'Was the service provided to evacuees?'>
    'How many evacuees received the service?'?: number
    'HNRP Scope'?: OptSub<'HNRP Scope'>
    'Outside HNRP Scope sub-categories'?: OptSub<'Outside HNRP Scope sub-categories'>
  }

  export const mapSub = (a: TypeSub) => ({
    c3qgzazlqf3umfi5q: a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    cfk8s3wlqf3umfi5r:
      a['Population Group'] === undefined
        ? undefined
        : 'cf8ig2alq6dbe8t2' + ':' + optionsSub['Population Group'][a['Population Group']!],
    c6893c2lslppffd6:
      a['Type of beneficiaries'] === undefined
        ? undefined
        : optionsSub['Type of beneficiaries'][a['Type of beneficiaries']!],
    cdy5p8nlqf3umfi5s:
      a['Indicators'] === undefined ? undefined : 'c8uhbuclqb1fjlg2' + ':' + optionsSub['Indicators'][a['Indicators']!],
    c91ka88lqf3umfi5w: a['Total Individuals Reached'] === undefined ? undefined : a['Total Individuals Reached'],
    cehoaaplqf3umfi5x: a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    co2cpjrlqf3umfi5y: a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    cosf9hmlqf3umfi5z: a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
    cug19qulqf3umfi60: a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
    cdrd176lqf3umfi61: a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
    c81tgzdlqf3umfi62: a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
    cnaij95lqf3umfi63:
      a['Non-individuals Reached/Quantity'] === undefined ? undefined : a['Non-individuals Reached/Quantity'],
    cz8i6pylqf3umfi64: a['People with Disability'] === undefined ? undefined : a['People with Disability'],
    csu8pzdly8iiipm2: a['Basic/Essential'] === undefined ? undefined : a['Basic/Essential'],
    clamhrkly8ixinx7: a['Elderly'] === undefined ? undefined : a['Elderly'],
    cfzhi7sly8iyijd8: a['Winter'] === undefined ? undefined : a['Winter'],
    c2se8vzly8j0lzs9: a['Other'] === undefined ? undefined : a['Other'],
    cqb6zihlz6vk00d3:
      a['Type of distribution'] === undefined
        ? undefined
        : optionsSub['Type of distribution'][a['Type of distribution']!],
    c5618bdlz6voilh7:
      a['Who distributed the kits?'] === undefined
        ? undefined
        : optionsSub['Who distributed the kits?'][a['Who distributed the kits?']!],
    cs7s2k4lz9rrvoq3:
      a['Dignity kits in stock?'] === undefined
        ? undefined
        : optionsSub['Dignity kits in stock?'][a['Dignity kits in stock?']!],
    // 'cypmnrslz9rxpiza': a['Basic/Essential'] === undefined ? undefined : a['Basic/Essential'],
    // 'cy7z3dslz9rzmweb': a['Elderly'] === undefined ? undefined : a['Elderly'],
    // 'cs92jsxlz9s0zylc': a['Winter'] === undefined ? undefined : a['Winter'],
    // 'ctfsguzlz9s1wwmd': a['Other kits in stock'] === undefined ? undefined : a['Other kits in stock'],
    // 'cylcj77lz9s9v7df': a['Current status of stock'] === undefined ? undefined : optionsSub['Current status of stock'][a['Current status of stock']!],
    cnf5ivglz9sg86uk:
      a['Any assessment/feedback done/collected on post distribution of kits?'] === undefined
        ? undefined
        : optionsSub['Any assessment/feedback done/collected on post distribution of kits?'][
            a['Any assessment/feedback done/collected on post distribution of kits?']!
          ],
    cq1dlstlt6ysqm63:
      a['Was the service provided to evacuees?'] === undefined
        ? undefined
        : optionsSub['Was the service provided to evacuees?'][a['Was the service provided to evacuees?']!],
    cokstg6lt73gbxif:
      a['How many evacuees received the service?'] === undefined
        ? undefined
        : a['How many evacuees received the service?'],
    cb95o8glw6fmedx3: a['HNRP Scope'] === undefined ? undefined : optionsSub['HNRP Scope'][a['HNRP Scope']!],
    c1167nvlw6fybtr4:
      a['Outside HNRP Scope sub-categories'] === undefined
        ? undefined
        : 'cs4astklw6ftd2y2' +
          ':' +
          optionsSub['Outside HNRP Scope sub-categories'][a['Outside HNRP Scope sub-categories']!],
  })

  export const optionsSub = {
    'Population Group': {
      'Internally Displaced': 'cvw4on6lq6dgcoj5',
      'Non-Displaced': 'ck6ulx8lq6dgcok6',
      Returnees: 'cuz9qi9lq6dgcok7',
    },
    'Type of beneficiaries': {
      'New beneficiaries': 'clxysqflslppffd5',
      'Repeated beneficiaries': 'cv19gg2lslpptjy7',
    },
    Indicators: {
      '# of individuals supported with GBV case management that meet GBViE minimum standards': 'c296s26lqmgu66ul',
      '# of individuals provided with specialized individual or group GBV psychosocial support that meet GBViE standards (not including recreational activities)':
        'c5q9o3xlqmgu66um',
      '# of GBV hotlines operational': 'c6rdt1clqmgu66un',
      '# of individuals who received services in GBV crisis rooms': 'citub83lqmgu66uo',
      '# of operational GBV crisis rooms': 'c2d0f3ulqmgu66up',
      '# of individuals who received services in GBV day care centers': 'cjeproolqmgu66uq',
      '# of operational GBV day care center': 'cm844hglqmgu66ur',
      '# of individuals who received services in shelters': 'c72si1ylqmgu66us',
      '# of operational GBV shelters': 'cv5v0z7lqmgu66ut',
      '# of women and girls who received recreational and livelihood skills including vocational education sessions in women and girls safe spaces':
        'c5x9amllqmgu66uu',
      "# of operational women and girls' safe spaces": 'cagbueslqmgu66uv',
      '# of individuals at risk supported with GBV specialized legal assistance and counseling': 'c6g3oerlqmgu66uw',
      '# of individuals reached with humanitarian cash and voucher assistance for GBV case management and/or other GBV response':
        'cn8myhdlqmgu66ux',
      '# of women and girls at risk who received dignity kits': 'chyifk6lqmgu66uy',
      '# of individuals reached with awareness-raising activities and GBV-life-saving information': 'cvauilxlqmgu66uz',
      '# of GBV awareness campaigns through social media, websites, TV and radio': 'ctrecbblqmgu66u10',
      '# of non-GBV service providers trained on GBV prevention, risk mitigation and referrals that meet GBViE minimum standards':
        'c8wzmoylqmgu66u11',
      '# of GBV assessments conducted': 'cdycodllqmgu66u12',
      '# of GBV safety audits conducted in collective sites and selected public areas': 'cduyu4slqmgu66u13',
      '# of GBV service providers trained on GBV prevention and response that meet GBViE minimum standards':
        'c5zjdi5lqmgu66u14',
      '# of GBV advocacy interventions undertaken with decision-makers and communities': 'c3ufluolqmgu66u15',
    },
    'Type of distribution': {
      'Via convoys': 'csct9jvlz6vk00d2',
      'Through static centers': 'cenbkqlz6vlilq4',
      'Through mobile teams or door-to-door': 'cw0jeaclz6vluuk5',
    },
    'Who distributed the kits?': {
      'Employees/staff/volunteers of the reporting organization': 'crm2lwdlz6voilh6',
      'Employees/staff/volunteers of the implementing organization': 'cspb9mblz6vpwbb8',
      'Community volunteers': 'ck9eujklz6vqqik9',
      'Local authority': 'crbln39lz6vqw1ca',
    },
    'Dignity kits in stock?': {
      Yes: 'c9z4jlglz9rrvop2',
      No: 'c10f080lz9rteeo4',
    },
    'Current status of stock': {
      Procured: 'cnvgyiolz9s9v7ce',
      'Outside of country': 'c9n9kmhlz9scej7g',
      'Currently in transit to Ukraine': 'c5l0hsolz9scn45h',
      'In location in Ukraine': 'cciatn6lz9sczv5i',
    },
    'Any assessment/feedback done/collected on post distribution of kits?': {
      'No assessments planned/done': 'cbw8wg8lz9sg86uj',
      'An assessment is planned or ongoing': 'ceijherlz9sjt21l',
      'Assessment completed – report currently being drafted/finalized': 'cfa27folz9sk1olm',
      'Assessment completed – report is ready (please share with GBV AoR team)': 'cwy2y3wlz9sk7hzn',
    },
    'Was the service provided to evacuees?': {
      Yes: 'cuieqxklt6ysqm62',
      No: 'cw6e6s4lt6z214r4',
    },
    'HNRP Scope': {
      'Outside HNRP Scope': 'c8fdrbqlw6fmedx2',
    },
    'Outside HNRP Scope sub-categories': {
      'Outside priority areas': 'cvf0ba4lw6fucqv4',
      'Funding not reported in FTS​': 'c7cah40lw6fula95',
      'Delivered outside HNRP​ mechanism': 'cj4y1s3lw6furva6',
      'Not aligned to guidance': 'c8mycj4lw6fv7477',
    },
  }
}
