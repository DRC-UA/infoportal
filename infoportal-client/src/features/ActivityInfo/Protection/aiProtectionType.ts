export namespace AiProtectionType {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'ID'?: string,
    'Reporting Organization': Opt<'Reporting Organization'>,
    'Implementing Partner'?: string,
    'Implementing Partner 2'?: string,
    'Plan/Project Code': Opt<'Plan/Project Code'>,
    'Oblast': Opt<'Oblast'>,
    'Raion': string,
    'Hromada': string,
    'Settlement'?: string,
    'Collective Site'?: string,
    'Response Theme': Opt<'Response Theme'>
  }

  export const map = (a: Type) => ({
    'cvb0gcplqf3085j4s': a['ID'] === undefined ? undefined : a['ID'],
    'c1g03yllqf3085j4t': a['Reporting Organization'] === undefined ? undefined : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
    'ct68whplqf3085j4u': a['Implementing Partner'] === undefined ? undefined : a['Implementing Partner'],
    'cz796xnlqf3085j4v': a['Implementing Partner 2'] === undefined ? undefined : a['Implementing Partner 2'],
    'ctn2ej8lqf3085j4w': a['Plan/Project Code'] === undefined ? undefined : 'cuar8eplqf1xm9225' + ':' + options['Plan/Project Code'][a['Plan/Project Code']!],
    'c6bulw2lqf3085j4y': a['Oblast'] === undefined ? undefined : 'cemuxawlq3kfmqf2' + ':' + a['Oblast'],
    'cb39ganlqf3085j4z': a['Raion'] === undefined ? undefined : 'cd5q9sdlq3kklo314' + ':' + a['Raion'],
    'cmdrqq8lqf3085j50': a['Hromada'] === undefined ? undefined : 'cwlaxxlq3kp2bu5a' + ':' + a['Hromada'],
    'cn43jajlqf3085j51': a['Settlement'] === undefined ? undefined : 'cfn5ltdlq3lbcb95w' + ':' + a['Settlement'],
    'ce0zvlllqf3085j52': a['Collective Site'] === undefined ? undefined : a['Collective Site'],
    'c18374vlqf3085j54': a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!]
  })

  export const options = {
    'Reporting Organization': {
      'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'
    },
    'Plan/Project Code': {
      'PRT-DRC-00001': 'cepwx9plsai8rlfd',
      'PRT-DRC-00002': 'c5woab2lsaieofhe',
      'PRT-DRC-00003': 'c6oy73wlsaihu52f',
      'PRT-DRC-00004': 'clsx70blsaiucltg',
      'PRT-DRC-00005': 'cyvk25tlsaiz8skh',
      'PRT-DRC-00006': 'c5yiak4lsaj2cpei',
      'PRT-DRC-00007': 'c7ddst8lsaj7gnaj',
      'PRT-DRC-00008': 'cwf3am5ltmwcn9k2',
      'PRT-DRC-00009': 'cq3lo88lx0343j83',
      'PRT-DRC-00010': 'cfbrw5olx039qnm4',
      'PRT-DRC-00011': 'caaapdflxoq6ktk2',
      'PRT-DRC-00012': 'ciu3pcllxoqadnt3',
    },
    'Oblast': {
      'Autonomous Republic of Crimea_Автономна Республіка Крим': 'c5c2sr3lq3kjj6gd',
      'Cherkaska_Черкаська': 'clbgltvlq3kjj6he',
      'Chernihivska_Чернігівська': 'c7jz1shlq3kjj6hf',
      'Chernivetska_Чернівецька': 'c78zq2rlq3kjj6hg',
      'Dnipropetrovska_Дніпропетровська': 'c6l0fjylq3kjj6hh',
      'Donetska_Донецька': 'c3memjqlq3kjj6hi',
      'Ivano-Frankivska_Івано-Франківська': 'cy93k5lq3kjj6hj',
      'Kharkivska_Харківська': 'cbbcx5ylq3kjj6hk',
      'Khersonska_Херсонська': 'cq8k2oylq3kjj6hl',
      'Khmelnytska_Хмельницька': 'cliunu3lq3kjj6hm',
      'Kirovohradska_Кіровоградська': 'cxvw276lq3kjj6hn',
      'Kyiv_Київ': 'cwe11jplq3kjj6ho',
      'Kyivska_Київська': 'cnp046mlq3kjj6hp',
      'Luhanska_Луганська': 'ctu8ahklq3kjj6hq',
      'Lvivska_Львівська': 'cmpyidslq3kjj6hr',
      'Mykolaivska_Миколаївська': 'ccqvlallq3kjj6hs',
      'Odeska_Одеська': 'c2uwqqqlq3kjj6ht',
      'Poltavska_Полтавська': 'cwq2uuxlq3kjj6hu',
      'Rivnenska_Рівненська': 'c2j0t0flq3kjj6hv',
      'Sevastopol_Севастополь': 'cjvbpkplq3kjj6hw',
      'Sumska_Сумська': 'cb4nm4xlq3kjj6hx',
      'Ternopilska_Тернопільська': 'clrrzfslq3kjj6hy',
      'Vinnytska_Вінницька': 'cvx17yllq3kjj6hz',
      'Volynska_Волинська': 'cdzklrblq3kjj6h10',
      'Zakarpatska_Закарпатська': 'cfqiux5lq3kjj6h11',
      'Zaporizka_Запорізька': 'cmqvx7elq3kjj6h12',
      'Zhytomyrska_Житомирська': 'c51dllnlq3kjj6h13'
    },
    'Response Theme': {
      'No specific theme': 'c40c4vklqf3085j55'
    }
  }

  type OptSub<T extends keyof typeof optionsSub> = keyof (typeof optionsSub)[T]

  export interface TypeSub {
    'Reporting Month': string,
    'Population Group': OptSub<'Population Group'>,
    'Indicators': OptSub<'Indicators'>,
    'Total Individuals Reached': number,
    'Girls (0-17)': number,
    'Boys (0-17)': number,
    'Adult Women (18-59)': number,
    'Adult Men (18-59)': number,
    'Older Women (60+)': number,
    'Older Men (60+)': number,
    'Non-individuals Reached/Quantity'?: number,
    'People with Disability'?: number
  }

  export const mapSub = (a: TypeSub) => ({
    'c3qgzazlqf3umfi5q': a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    'cfk8s3wlqf3umfi5r': a['Population Group'] === undefined ? undefined : 'cf8ig2alq6dbe8t2' + ':' + optionsSub['Population Group'][a['Population Group']!],
    'cdy5p8nlqf3umfi5s': a['Indicators'] === undefined ? undefined : 'c8uhbuclqb1fjlg2' + ':' + optionsSub['Indicators'][a['Indicators']!],
    'c91ka88lqf3umfi5w': a['Total Individuals Reached'] === undefined ? undefined : a['Total Individuals Reached'],
    'cehoaaplqf3umfi5x': a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    'co2cpjrlqf3umfi5y': a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    'cosf9hmlqf3umfi5z': a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
    'cug19qulqf3umfi60': a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
    'cdrd176lqf3umfi61': a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
    'c81tgzdlqf3umfi62': a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
    'cnaij95lqf3umfi63': a['Non-individuals Reached/Quantity'] === undefined ? undefined : a['Non-individuals Reached/Quantity'],
    'cz8i6pylqf3umfi64': a['People with Disability'] === undefined ? undefined : a['People with Disability']
  })

  export const optionsSub = {
    'Population Group': {
      'Internally Displaced': 'cvw4on6lq6dgcoj5',
      'Non-Displaced': 'ck6ulx8lq6dgcok6',
      'Returnees': 'cuz9qi9lq6dgcok7'
    },
    'Indicators': {
      '# of individuals who received case management services (not including specialized CP & GBV services)': 'cuv5lkclqmgu66u1f',
      '# of individuals who participated in community-based protection activities': 'cfye7v0lqmgu66u1g',
      '# of individuals in a community trained on protection approaches or issues (not including GBV or Child Protection)': 'c4gngpdlqmgu66u1h',
      '# of individuals supported through community-based organizations with social rehabilitation': 'cigruiclqmgu66u1i',
      '# of organizations of people with disabilities (OPDs) supported to provide social rehabilitation': 'cr9kr8qlqmgu66v1j',
      '# of hotlines established and operated': 'chkpac2lqmgu66v1k',
      '# of calls received by hotlines from individuals': 'cevyso1lqmgu66v1l',
      '# of individuals with specific needs who received cash assistance to prevent, mitigate or respond to protection risks': 'cxnbfd8lqmgu66v1m',
      '# of individuals with specific needs who received in-kind protection assistance to prevent, mitigate or respond to protection risks': 'cbolgy6lqmgu66v1n',
      '# of individuals who received legal assistance on HLP issues': 'cugc39qlqmgu66v1o',
      '# of individuals who successfully secured HLP documentation': 'cepn945lqmgu66v1p',
      '# of individuals who received legal assistance': 'c9xmy7flqmgu66v1q',
      '# of individuals who successfully secured civil documentation': 'c99v29olqmgu66v1r',
      '# of individuals who received protection counselling': 'c5qlvw9lqmgu66v1s',
      '# of individuals who received legal counselling': 'c4qmnm2lqmgu66v1t',
      '# of individuals who received HLP legal counselling': 'c4b7guylqmgu66v1u',
      '# of individuals reached through protection monitoring at the household level': 'cx5yue4lqmgu66v1v',
      '# of locations assessed through community level protection monitoring': 'clez5molqmgu66v1w',
      '# of interviews conducted with key informants through community level protection monitoring': 'cicv1plqmgu66v1x',
      '# of individuals who received individual or group-based psychosocial support': 'c3d56b7lqmgu66v1y',
      '# of individuals with specific needs referred to specialized services and assistance': 'cjt0ciglqmgu66v1z',
      '# of individuals provided with transportation services': 'ccpeionlqmgu66v20',
      '# of individuals who participated in awareness raising activities on Protection': 'csxs7tvlqmgu66v21',
      '# of individuals who participated in awareness raising sessions on HLP': 'cv8k7nolqmgu66v22',
      '# of advocacy interventions undertaken on protection issues': 'c6aftmvlqmgu66v23',
      '# of protection assessments conducted': 'cckhamclqmgu66v24',
      '# of humanitarian staff trained on protection approaches or issues': 'csbl6nxlqmgu66v25',
      '# of government staff trained on protection approaches or issues': 'chymmkklqmgu66v26',
      '# of humanitarian staff trained on HLP': 'c8bht7flqmgu66v27',
      '# of government staff trained on HLP': 'cc1gtwnlqmgu66v28',
      '# of community centers established or maintained': 'c2395qdlqmgu66v29',
      '# of government institutions supported': 'cy4jvntlqmgu66v2a'
    }
  }
}