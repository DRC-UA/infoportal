export type AiProtectionType = AiProtectionType.Type

export namespace AiProtectionType {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    ID?: string
    'Reporting Organization': Opt<'Partner'>
    'Implementing Partner'?: Opt<'Partner'>
    'Implementing Partner 2'?: Opt<'Partner'>
    'Plan/Project Code': Opt<'Activity Planning Module (Protection)'>
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
        formId: 'c1viqabm4whwvwo3',
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
          cwe8bxcm4wi7lr68: a['Plan/Project Code']
            ? 'c9ujc88m4sgf6hw9' + ':' + options['Activity Planning Module (Protection)'][a['Plan/Project Code']!]
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
    'Activity Planning Module (Protection)': {
      'PRT-DRC-00001': 'c7ci6z0m730pxq83',
      'PRT-DRC-00002': 'cqzyoqrm730zf5d4',
      'PRT-DRC-00003': 'c91inndm73143d45',
      'PRT-DRC-00004': 'cmzh0x9m7317x856',
    },
    'Response Theme': {'No specific theme': 'crfw0hkm4wiqb94f'},
  }

  export type AiTypeActivitiesAndPeople = AiTypeActivitiesAndPeople.Type

  export namespace AiTypeActivitiesAndPeople {
    type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
    export interface Type {
      'Reporting Month': string
      Indicators: Opt<'Indicators - Protection'>
      'Population Group': Opt<'Population Group'>
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
          formId: 'cz3l80om4wjulqqi',
          recordId,
          parentRecordId,
          fields: {
            ctxcbypm5pf0fjs8c: a['Reporting Month'],
            ckgn2n6m4wk2393o: a['Indicators']
              ? 'ctica5gm4r928td16' + ':' + options['Indicators - Protection'][a['Indicators']!]
              : undefined,
            cc9whaum4wl74eb12: a['Population Group']
              ? 'cknn1yzm4s6xuox1x' + ':' + options['Population Group'][a['Population Group']!]
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
        'Case management - Protection > # of individuals who received protection case management services (not including specialized CP & GBV services)':
          'cltuo5sm6gnc64f2',
        'Case management - Protection > # of individuals who received social accompaniment': 'cz89rbhm6gnc64g3',
        'Case management - Protection > # of individuals who received home based care': 'crdmliim6gnc64g4',
        'Case management - Protection > # of organizations of people with disabilities and organizations of older people supported to provide social rehabilitation':
          'ct9meaqm6gnc64g5',
        'Case management - Protection > # of individuals who received social rehabilitation': 'cxtl3dm6gnc64g6',
        'Community-based protection activities > # of individuals who participated in community-based protection activities':
          'cla02spm6gnc64g7',
        'Community-based protection activities > # of community centers/spaces established or maintained':
          'cq50wt6m6gnc64g8',
        'Community-based protection activities > # of community social facilitators trained and supported':
          'cluz106m6gnc64g9',
        'Individual protection assistance (cash) > # of individuals with specific needs who received cash assistance to prevent, mitigate or respond to protection risks':
          'c8p20h6m6gnc64ga',
        'Individual protection assistance (in-kind) based on individual risk assessment > # of individuals with specific needs who received in kind protection assistance based on individual risk assessment to prevent, mitigate or respond to protection risks':
          'coeib1pm6gnc64gb',
        'Legal assistance - HLP > # of individuals who received legal assistance on HLP issues': 'coldqvjm6gnc64gc',
        'Legal assistance - HLP > # of individuals who successfully secured HLP documentation': 'cj43ufhm6gnc64gd',
        'Legal assistance - Protection > # of individuals who received legal assistance': 'cse2m80m6gnc64ge',
        'Legal assistance - Protection > # of individuals who successfully secured civil documentation':
          'cx19qngm6gnc64gf',
        'Protection counselling > # of individuals who received protection counselling': 'cx7lsftm6gnc64gg',
        'Psychosocial support (individual and groups) - Protection > # of individuals who received individual or group-based psychosocial support':
          'cjw9xsmm6gnc64gh',
        'Referral to specialized services > # of individuals with specific needs referred to specialized services and assistance (Internal/External referrals)':
          'c4dmypmm6gnc64gi',
        'Transportation > # of individuals provided with transportation services - Humanitarian evacuation':
          'cqqerunm6gnc64gj',
        'Transportation > # of individuals provided with transportation services - Access to social services':
          'cs1iti8m6gnc64gk',
        'Hotlines > # of hotlines established and operated': 'cji45t6m6gnc64gl',
        'Hotlines > # individuals calling hotlines': 'c9iy2ehm6gnc64gm',
        'Awareness raising - Protection & HLP > # of individuals who participated in awareness raising activities on Protection':
          'cgupfhum6gnc64gn',
        'Awareness raising - Protection & HLP > # of individuals who participated in awareness raising sessions on HLP':
          'cwlsm7fm6gnc64go',
        'Advocacy - Protection > # of advocacy interventions undertaken on protection issues': 'c4glpggm6gnc64gp',
        'Assessments (Community level) > # protection assessments conducted': 'cq69xxtm6gnc64gq',
        'Capacity building (Humanitarian actors and Government) - Protection & HLP > # of humanitarian staff trained on protection approaches or issues':
          'cthi790m6gnc64gr',
        'Capacity building (Humanitarian actors and Government) - Protection & HLP > # of government staff trained on protection approaches or issues':
          'co8xxc2m6gnc64gs',
        'Capacity building (Humanitarian actors and Government) - Protection & HLP > # of humanitarian staff trained on HLP':
          'ck62or2m6gnc64gt',
        'Capacity building (Humanitarian actors and Government) - Protection & HLP > # of government staff trained on HLP':
          'cptwow7m6gnc64gu',
        'Support to service providers to prevent disruption of critical service provision > # of service providers supported':
          'cnervh1m6gnc64gv',
        'Protection monitoring at household level > # of individuals reached through protection monitoring at the household level':
          'ciqjitjm6gnc64gw',
        'Protection monitoring at the community level > # of key informants reached through community level protection monitoring':
          'c7w3d24m6gnc64gx',
      },
      'Population Group': {'Internally Displaced': 'c3yfomom4s6zizi20', 'Non-Displaced': 'cjccin8m4s6ztsm21'},
    }
  }
}
