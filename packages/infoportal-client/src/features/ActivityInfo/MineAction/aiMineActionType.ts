export type AiMineActionType = AiMineActionType.Type

export namespace AiMineActionType {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    ID?: string
    'Reporting Organization': Opt<'Partner'>
    /**
      If applicable
    */
    'Implementing Partner'?: Opt<'Partner'>
    /**
      Add another Implementing Partner if applicable
    */
    'Implementing Partner 2'?: Opt<'Partner'>
    'Plan/Project Code': Opt<'Activity Planning Module (Mine Action AoR)'>
    Oblast: string
    Raion: string
    Hromada: string
    Settlement?: string
    'Collective Site'?: string
    'Response Theme': Opt<'Response Theme'>
    'Activities and People'?: AiTypeActivitiesAndPeople[]
  }

  export const buildRequest = (a: Type, recordId: string, parentRecordId: string | null = null) => {
    return [
      {
        formId: 'cmnzatklqv1q3s243u',
        recordId,
        parentRecordId,
        fields: {
          cvb0gcplqf3085j4s: a['ID'],
          c1g03yllqf3085j4t: a['Reporting Organization'] ? 'czbgrslpwg36j52' + ':' + options['Partner'][a['Reporting Organization']!] : undefined,
          ct68whplqf3085j4u: a['Implementing Partner'] ? 'czbgrslpwg36j52' + ':' + options['Partner'][a['Implementing Partner']!] : undefined,
          cz796xnlqf3085j4v: a['Implementing Partner 2'] ? 'czbgrslpwg36j52' + ':' + options['Partner'][a['Implementing Partner 2']!] : undefined,
          ccn9h61lrkokg015: a['Plan/Project Code'] ? 'c9c396nlr6f4i48zv' + ':' + options['Activity Planning Module (Mine Action AoR)'][a['Plan/Project Code']!] : undefined,
          c6bulw2lqf3085j4y: a['Oblast'] ? 'cemuxawlq3kfmqf2' + ':' + a['Oblast'] : undefined,
          cb39ganlqf3085j4z: a['Raion'] ? 'cd5q9sdlq3kklo314' + ':' + a['Raion'] : undefined,
          cmdrqq8lqf3085j50: a['Hromada'] ? 'cwlaxxlq3kp2bu5a' + ':' + a['Hromada'] : undefined,
          cn43jajlqf3085j51: a['Settlement'] ? 'cfn5ltdlq3lbcb95w' + ':' + a['Settlement'] : undefined,
          ce0zvlllqf3085j52: a['Collective Site'] ? 'ca2hwjalq6e6dbs1l' + ':' + a['Collective Site'] : undefined,
          c18374vlqf3085j54: a['Response Theme'] ? options['Response Theme'][a['Response Theme']!] : undefined,
        },
      },
      ...(a['Activities and People'] ?? []).flatMap((_, i) => AiTypeActivitiesAndPeople.buildRequest(_, recordId + 'i' + ('' + i).padStart(2, '0'), recordId)),
    ]
  }

  export const options = {
    Partner: {'Danish Refugee Council (DRC)': 'cloyih3lpwhjdsu2r0'},
    'Activity Planning Module (Mine Action AoR)': {
      '': 'csduwtmlsn2cadn8',
      '': 'c1ibtnblsnbwirq2',
      '': 'c410zexlsogr3942',
      '': 'ckql3hzlsogumin3',
      '': 'c5h7kj9lsohodvh4',
      '': 'cfr73p4lsohuagv5',
      '': 'cnpgzxlsoi5jhb6',
      '': 'c4dqoqzlsoi8e4m7',
      '': 'cbq4ql1lsojygo38',
      '': 'cvnl97qlsok0t9m9',
      '': 'c4bck8ylssrdvtb2',
      '': 'cxmz8zyly7c04mi2',
      '': 'cytsa31ly7c6dm43',
      '': 'cc4w1sily7c9xva4',
      '': 'c26rv9dly7cdl9g5',
      '': 'cfzu1rnm4b9h8qp4',
      '': 'cd7xp0ym4b9koer5',
      '': 'c8up20vm4bb3y1d6',
    },
    'Response Theme': {'No specific theme': 'c40c4vklqf3085j55'},
  }

  export type AiTypeActivitiesAndPeople = AiTypeActivitiesAndPeople.Type

  export namespace AiTypeActivitiesAndPeople {
    type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
    export interface Type {
      'Reporting Month': string
      'Population Group': Opt<'Population Group'>
      Indicators: Opt<'Indicators - Protection'>
      'Total Individuals Reached': number
      'Girls (0-17)': number
      'Boys (0-17)': number
      'Adult Women (18-59)': number
      'Adult Men (18-59)': number
      'Older Women (60+)': number
      'Older Men (60+)': number
      'Non-individuals Reached/Quantity': number
      /**
      Out of the total individuals reached
    */
      'People with Disability'?: number
      'HNRP Scope'?: Opt<'HNRP Scope'>
      'Outside HNRP Scope sub-categories'?: Opt<'Outside HNRP Scope sub-categories'>
    }

    export const buildRequest = (a: Type, recordId: string, parentRecordId: string | null = null) => {
      return [
        {
          formId: 'cegbam4lqv1q3s243v',
          recordId,
          parentRecordId,
          fields: {
            c3qgzazlqf3umfi5q: a['Reporting Month'],
            cfk8s3wlqf3umfi5r: a['Population Group'] ? 'cf8ig2alq6dbe8t2' + ':' + options['Population Group'][a['Population Group']!] : undefined,
            cdy5p8nlqf3umfi5s: a['Indicators'] ? 'c8uhbuclqb1fjlg2' + ':' + options['Indicators - Protection'][a['Indicators']!] : undefined,
            c91ka88lqf3umfi5w: a['Total Individuals Reached'],
            cehoaaplqf3umfi5x: a['Girls (0-17)'],
            co2cpjrlqf3umfi5y: a['Boys (0-17)'],
            cosf9hmlqf3umfi5z: a['Adult Women (18-59)'],
            cug19qulqf3umfi60: a['Adult Men (18-59)'],
            cdrd176lqf3umfi61: a['Older Women (60+)'],
            c81tgzdlqf3umfi62: a['Older Men (60+)'],
            cnaij95lqf3umfi63: a['Non-individuals Reached/Quantity'],
            cz8i6pylqf3umfi64: a['People with Disability'],
            cbisjn4lw6fmi713: a['HNRP Scope'] ? options['HNRP Scope'][a['HNRP Scope']!] : undefined,
            cny9yumlw6fyggv4: a['Outside HNRP Scope sub-categories'] ? 'cs4astklw6ftd2y2' + ':' + options['Outside HNRP Scope sub-categories'][a['Outside HNRP Scope sub-categories']!] : undefined,
          },
        },
      ]
    }

    export const options = {
      'Population Group': {'Internally Displaced': 'cvw4on6lq6dgcoj5', 'Non-Displaced': 'ck6ulx8lq6dgcok6', Returnees: 'cuz9qi9lq6dgcok7'},
      'Indicators - Protection': {
        'Provision of face-to-face Explosive Ordnance Risk Education (EORE) sessions > # of individuals who participated in face-to-face EORE sessions in the educational institutions (e.g. schools)':
          'ck8w3wflqmgu66u16',
        'Provide ToT: Capacity building support to become an accredited EORE operator > # of organizations (national or local) who received capacity building support to become an accredited EORE operator':
          'cau7kexlqmgu66u17',
        'Cash assistance provided to mine / ERW survivor (SADD) > # mine / ERW survivors who received cash assistance (SADD)': 'cihm2xplqmgu66u18',
        'MHPSS provided to mine / ERW survivor (SADD) > # of mine / ERW survivor who received MHPSS (SADD)': 'cy1jgeilqmgu66u19',
        'Non-technical survey > Area surveyed (square metres) - (TBD)': 'cmg8547lqmgu66u1a',
        'Land clearance > Area cleared (square metres)': 'ci7ya6zlqmgu66u1b',
        'Land clearance > # of individuals who directly benefitted from land clearance (SADD)': 'cl00iz2lqmgu66u1c',
        'Institutional support > # of interventions (equipment provision) to national mine action institutions': 'clxeupalqmgu66u1d',
        'Capacity building > # of personnel trained on mine action activities (IMAS) related to survey and clearance': 'chks7q9lqmgu66u1e',
        'Provision of face-to-face Explosive Ordnance Risk Education (EORE) sessions > # of individuals who participated in face-to-face EORE sessions excluding educational institutions (e.g. communities)':
          'cepwuk2ls044z522',
      },
      'Outside HNRP Scope sub-categories': {
        'Outside priority areas': 'cvf0ba4lw6fucqv4',
        'Funding not reported in FTS​': 'c7cah40lw6fula95',
        'Delivered outside HNRP​ mechanism': 'cj4y1s3lw6furva6',
        'Not aligned to guidance': 'c8mycj4lw6fv7477',
      },
      'HNRP Scope': {'Outside HNRP Scope': 'cmkd5v6lw6fmi712'},
    }
  }
}
