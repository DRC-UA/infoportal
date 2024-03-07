export namespace AiTypeMineAction {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'ID'?: string,
    'Reporting Organization': Opt<'Reporting Organization'>,
    'Implementing Partner'?: string,
    'Implementing Partner 2'?: string,
    'Plan/Project Code': Opt<'Plan/Project Code'>,
    'Oblast': Opt<'Oblast'>,
    'Raion': string,
    'Hromada': Opt<'Hromada'>,
    'Settlement'?: string,
    'Collective Site'?: string,
    'Response Theme': Opt<'Response Theme'>
  }

  export const map = (a: Type) => ({
    'cvb0gcplqf3085j4s': a['ID'] === undefined ? undefined : a['ID'],
    'c1g03yllqf3085j4t': a['Reporting Organization'] === undefined ? undefined : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
    'ct68whplqf3085j4u': a['Implementing Partner'] === undefined ? undefined : a['Implementing Partner'],
    'cz796xnlqf3085j4v': a['Implementing Partner 2'] === undefined ? undefined : a['Implementing Partner 2'],
    'ccn9h61lrkokg015': a['Plan/Project Code'] === undefined ? undefined : 'c9c396nlr6f4i48zv' + ':' + options['Plan/Project Code'][a['Plan/Project Code']!],
    'c6bulw2lqf3085j4y': a['Oblast'] === undefined ? undefined : 'cemuxawlq3kfmqf2' + ':' + options['Oblast'][a['Oblast']!],
    'cb39ganlqf3085j4z': a['Raion'] === undefined ? undefined : a['Raion'],
    'cmdrqq8lqf3085j50': a['Hromada'] === undefined ? undefined : 'cwlaxxlq3kp2bu5a' + ':' + options['Hromada'][a['Hromada']!],
    'cn43jajlqf3085j51': a['Settlement'] === undefined ? undefined : a['Settlement'],
    'ce0zvlllqf3085j52': a['Collective Site'] === undefined ? undefined : a['Collective Site'],
    'c18374vlqf3085j54': a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!]
  })

  export const options = {
    'Reporting Organization': {
      'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'
    },
    'Plan/Project Code': {
      'MA-DRC-00001': 'csduwtmlsn2cadn8',
      'MA-DRC-00002': 'c1ibtnblsnbwirq2',
      'MA-DRC-00003': 'c410zexlsogr3942',
      'MA-DRC-00004': 'ckql3hzlsogumin3',
      'MA-DRC-00005': 'c5h7kj9lsohodvh4',
      'MA-DRC-00006': 'cfr73p4lsohuagv5',
      'MA-DRC-00007': 'cnpgzxlsoi5jhb6',
      'MA-DRC-00008': 'c4dqoqzlsoi8e4m7',
      'MA-DRC-00009': 'cbq4ql1lsojygo38',
      'MA-DRC-00010': 'cvnl97qlsok0t9m9',
      'MA-DRC-00011': 'c4bck8ylssrdvtb2'
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
      'Sevastopol_Севастополь': 'cjvbpkplq3kjj6hw'
    },
    'Hromada': {
      'Aromatnenska_UA0102003': 'ceyv5tolq3la4dr249',
      'Bakhchysaraiska_UA0102005': 'cn5h6calq3la4dr24a',
      'Verkhorichenska_UA0102009': 'cnc7xsvlq3la4dr24b',
      'Vilinska_UA0102011': 'c2zc7cflq3la4dr24c',
      'Holubynska_UA0102013': 'ck5pbm3lq3la4dr24d',
      'Dolynnenska_UA0102015': 'cd4tehilq3la4dr24e',
      'Zaliznychnenska_UA0102017': 'cb69w6qlq3la4dr24f',
      'Zelenivska_UA0102019': 'ck1p0oolq3la4dr24g',
      'Kashtanivska_UA0102025': 'crr9kz3lq3la4dr24h',
      'Krasnomatska_UA0102027': 'ceel6f4lq3la4dr24i',
      'Kuibyshevska_UA0102029': 'cekrlc6lq3la4dr24j',
      'Pishchanivska_UA0102033': 'cs9ovk0lq3la4dr24k',
      'Plodivska_UA0102035': 'clcrplnlq3la4dr24l',
      'Poshtivska_UA0102037': 'c49nm87lq3la4dr24m',
      'Skalystivska_UA0102039': 'ckh1vyelq3la4dr24n',
      'Tabachnenska_UA0102041': 'cameja8lq3la4dr24o',
      'Tinystivska_UA0102045': 'c55vt83lq3la4dr24p',
      'Uhlivska_UA0102047': 'c3cf7gylq3la4dr24q',
      'Aromatnivska_UA0104001': 'csl2jq3lq3la4dr24r',
      'Bahativska_UA0104003': 'c4cw1izlq3la4dr24s'
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
    'Non-individuals Reached/Quantity': number,
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
      '# of individuals who participated in face-to-face EORE sessions in the educational institutions (e.g. schools)': 'ck8w3wflqmgu66u16',
      '# of organizations (national or local) who received capacity building support to become an accredited EORE operator': 'cau7kexlqmgu66u17',
      '# mine / ERW survivors who received cash assistance (SADD)': 'cihm2xplqmgu66u18',
      '# of mine / ERW survivor who received MHPSS (SADD)': 'cy1jgeilqmgu66u19',
      'Area surveyed (square metres) - (TBD)': 'cmg8547lqmgu66u1a',
      'Area cleared (square metres)': 'ci7ya6zlqmgu66u1b',
      '# of individuals who directly benefitted from land clearance (SADD)': 'cl00iz2lqmgu66u1c',
      '# of interventions (equipment provision) to national mine action institutions': 'clxeupalqmgu66u1d',
      '# of personnel trained on mine action activities (IMAS) related to survey and clearance': 'chks7q9lqmgu66u1e',
      '# of individuals who participated in face-to-face EORE sessions excluding educational institutions (e.g. communities)': 'cepwuk2ls044z522'
    }
  }

}