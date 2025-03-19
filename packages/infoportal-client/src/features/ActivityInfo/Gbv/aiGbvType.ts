export type AiGbvType = AiGbvType.Type

export namespace AiGbvType {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    ID?: string
    'Reporting Organization': Opt<'Partner'>
    'Implementing Partner'?: Opt<'Partner'>
    'Implementing Partner 2'?: Opt<'Partner'>
    'Plan/Project code': Opt<'Activity Planning Module (GBV)'>
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
        formId: 'co7iurtm513bt64h7u',
        recordId,
        parentRecordId,
        fields: {
          c9jwta5m4whznd44: a['ID'],
          chkoxzhm4wi1a2f5: a['Reporting Organization']
            ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Reporting Organization']!]
            : undefined,
          cxegdaym4wi2qbq6: a['Implementing Partner']
            ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Implementing Partner']!]
            : undefined,
          c4y1cm9m4wi4r8x7: a['Implementing Partner 2']
            ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Implementing Partner 2']!]
            : undefined,
          ccqwr7rm52ju6299: a['Plan/Project code']
            ? 'csd3f5bm4tt7flx1amn' + ':' + options['Activity Planning Module (GBV)'][a['Plan/Project code']!]
            : undefined,
          ce9pjx6m4wihjfpa: a['Oblast'] ? 'ciok70dm4r8lp7f2' + ':' + a['Oblast'] : undefined,
          c7plljum4wiik9ib: a['Raion'] ? 'c1v215km4s71ndl22' + ':' + a['Raion'] : undefined,
          cjd10k0m4wijuqtc: a['Hromada'] ? 'cu8n0g0m4s7y2p16b' + ':' + a['Hromada'] : undefined,
          cp70mkkm4wil1q7d: a['Settlement'] ? 'cyr4ry4m4s81hdd6v' + ':' + a['Settlement'] : undefined,
          chcqc70m4wjta8gh: a['Collective Site'] ? 'ckt3l0m4wiw1n92' + ':' + a['Collective Site'] : undefined,
          cy52j7km4wiqb94g: a['Response Theme'] ? options['Response Theme'][a['Response Theme']!] : undefined,
        },
      },
      ...(a['Activities and People'] ?? []).flatMap((_, i) =>
        AiTypeActivitiesAndPeople.buildRequest(_, recordId + 'i' + ('' + i).padStart(2, '0'), recordId),
      ),
    ]
  }

  export const options = {
    Partner: {'Danish Refugee Council (DRC)': 'cjmwszwm4s8hlkyrae'},
    'Activity Planning Module (GBV)': {
      'GBV-DRC-00001': 'cttpclmm7ueb7126',
      'GBV-DRC-00002': 'cdr8jq1m7ui9n4s7',
      'GBV-DRC-00003': 'cbsvmkpm7uk5x6lc',
      'GBV-DRC-00004': 'crwci9mm8fsg4422',
    },
    'Response Theme': {'No specific theme': 'crfw0hkm4wiqb94f'},
  }

  export type AiTypeActivitiesAndPeople = AiTypeActivitiesAndPeople.Type

  export namespace AiTypeActivitiesAndPeople {
    type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
    export interface Type {
      'Reporting Month': string
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
    }

    export const buildRequest = (a: Type, recordId: string, parentRecordId: string | null = null) => {
      return [
        {
          formId: 'cgczbtmm513bt64h7v',
          recordId,
          parentRecordId,
          fields: {
            c9znya5m6j1fwro6: a['Reporting Month'],
            ckgn2n6m4wk2393o: a['Indicators']
              ? 'ctica5gm4r928td16' + ':' + options['Indicators - Protection'][a['Indicators']!]
              : undefined,
            cxcth1bm4wk7dvms: a['Total Individuals Reached'],
            ce79tc4m4wkdpd4t: a['Girls (0-17)'],
            ckd43oym4wkfhmwu: a['Boys (0-17)'],
            cflqb6km4wkujyxv: a['Adult Women (18-59)'],
            clhi83vm4wkxl81w: a['Adult Men (18-59)'],
            cty2zyem4wkyvyhx: a['Older Women (60+)'],
            csq1r47m4wl091ky: a['Older Men (60+)'],
            ctm6pddm4wl2ky2z: a['Non-individuals Reached/Quantity'],
            c3knsqem4wl8nfu14: a['People with Disability'],
          },
        },
      ]
    }

    export const options = {
      'Indicators - Protection': {
        'GBV case management > # of individuals supported with GBV case management that meet GBViE minimum standards':
          'ca16hqom6g8dljp4',
        'Psychosocial (mobile & static) support to GBV survivors and those at-risk > # of individuals provided with specialized individual or group GBV psychosocial support that meet GBViE minimum standards (not including recreational activities)':
          'cdnn8edm6g8dljp5',
        'GBV hotline > # of GBV Hotlines operational': 'cewday6m6g8dljp6',
        'GBV hotline > # of individuals who received services through hotlines (excluding PSS and legal aid)':
          'c7tpzbtm6g8dljp7',
        'GBV crisis interventions and accommodation (GBV shelters, crisis rooms and day care services) > # of individuals who were accommodated in GBV crisis rooms':
          'c9vnguvm6g8dljp8',
        'GBV crisis interventions and accommodation (GBV shelters, crisis rooms and day care services) > # of operational GBV crisis rooms':
          'c8bvnvwm6g8dljp9',
        'GBV crisis interventions and accommodation (GBV shelters, crisis rooms and day care services) > # of operational GBV day care center':
          'cj7awcpm6g8dljpa',
        'GBV crisis interventions and accommodation (GBV shelters, crisis rooms and day care services) > # of individuals who were accommodated in shelters':
          'cre0c4zm6g8dljpb',
        'GBV crisis interventions and accommodation (GBV shelters, crisis rooms and day care services) > # of operational GBV shelters':
          'cgb3u7mm6g8dljqc',
        'Support through Women and Girls Safe Spaces (WGSS) > # of women and girls who participated in skill-building, recreational, or livelihood (including vocational education) activities in women and girls safe spaces':
          'crdm234m6g8dljqd',
        "Support through Women and Girls Safe Spaces (WGSS) > # of GBV services (skill building, recreational,livelihood/vocational) provided at women and girls' safe spaces":
          'cgiwnpom6g8dljqe',
        'Legal aid services for GBV survivors and those at-risk > # of individuals supported with GBV specialized legal assistance and counseling':
          'cqet4dfm6g8dljqf',
        'Cash and voucher assistance through specialized care for GBV survivors and those at-risk > # of individuals reached with humanitarian Cash & Voucher Assistance (CVA) for GBV case management and/or other GBV response':
          'cibi8cdm6g8dljqg',
        'Dignity kits to GBV survivors and those at-risk > # of women and girls at risk who received dignity kits':
          'c3dg3arm6g8dljqh',
        'Intersectoral GBV referrals > # of functional intersectoral GBV referrals at regional and local levels':
          'cvdwuesm6g8dljqi',
        'Conduct awareness raising campaigns on GBV > # of individuals reached with awareness-raising activities and GBV-lifesaving information':
          'cskze4rm6g8dljqj',
        'Conduct awareness raising campaigns on GBV > # of GBV awareness campaigns through social media, websites, TV and radio':
          'c4mzhe6m6g8dljqk',
        'Enabling non-GBV humanitarian actors to mitigate GBV risks when delivering assistance > # of non-GBV humanitarian actors capacitated to mitigate GBV risks when delivering assistance':
          'ct2v7jmm6g8dljql',
        'GBV assessments > # of GBV assessments conducted': 'cqucmnym6g8dljqm',
        'GBV risk mitigation activities including safety audits in collective sites/transit centers and high-risk public areas > # of GBV safety audits conducted in collective sites, and selected public areas':
          'cy6kt4dm6g8dljqn',
        'Capacity Building of GBV service providers to deliver in accordance with the GBViE minimum standards > # of GBV service providers trained to deliver services in accordance with the GBViE minimum standards':
          'coarog2m6g8dljqo',
        'Advocacy on GBV issues > # of GBV advocacy interventions undertaken with decision-makers and communities':
          'chntanum6g8dljqp',
      },
      'Population Group': {'Internally Displaced': 'c3yfomom4s6zizi20', 'Non-Displaced': 'cjccin8m4s6ztsm21'},
    }
  }
}
