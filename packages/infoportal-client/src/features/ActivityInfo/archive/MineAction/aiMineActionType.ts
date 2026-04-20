export type AiMineActionType = AiMineActionType.Type

export namespace AiMineActionType {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    ID?: string
    'Reporting Organization': Opt<'Partner'>
    'Implementing Partner'?: Opt<'Partner'>
    'Implementing Partner 2'?: Opt<'Partner'>
    'Plan/Project Code': Opt<'Activity Planning Module (Mine Action)'>
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
        formId: 'cxpfp3xm513b6r15nwo',
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
          cudwpx1m52jxy70a: a['Plan/Project Code']
            ? 'cmxjoenm4tt829i1amo' + ':' + options['Activity Planning Module (Mine Action)'][a['Plan/Project Code']!]
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
    'Activity Planning Module (Mine Action)': {
      'MA-DRC-00001': 'ctcpgydm7d3o87d1hr',
      'MA-DRC-00002': 'cb0nbfcm7d3o87d1hs',
      'MA-DRC-00003': 'cpw6zd7m7d3o87e1ht',
      'MA-DRC-00004': 'cgf37som7d3o87e1hu',
      'MA-DRC-00005': 'cs2ppiom7d3o87e1hv',
      'MA-DRC-00006': 'ca7nt41m7d3o87e1hw',
      'MA-DRC-00007': 'cbyya7nm7d3o87e1hx',
      'MA-DRC-00008': 'chhxz5m7d3o87e1hy',
      'MA-DRC-00009': 'chyqpvrm7d3o87e1hz',
      'MA-DRC-00010': 'clyht14m7d3o87e1i0',
      'MA-DRC-00011': 'cbuernkm7k7a2ai3',
      'MA-DRC-00012': 'c95awyvme8c9r4apq',
      'MA-DRC-00013': 'cocpt1rme8cel9npr',
    },
    'Response Theme': {
      'No specific theme': 'crfw0hkm4wiqb94f',
      Evacuations: 'crvmz4tma3ng31x7',
      'Emergency response after strikes': 'civlosjma3ng8q38',
      'Both (evacuation and emergency response after strikes)': 'cehf311ma3ngda29',
    },
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
          formId: 'c1qx3sfm513b6r15nwp',
          recordId,
          parentRecordId,
          fields: {
            cndgh2bm6j5fhcqa: a['Reporting Month'],
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
        'Explosive Ordnance Risk Education (EORE) > # of individuals who participated in face-to-face EORE sessions in the educational institutions (e.g. schools)':
          'cn10071m5111jhc1a',
        'Explosive Ordnance Risk Education (EORE) > # of individuals who participated in face-to-face EORE sessions excluding educational institutions (e.g. communities)':
          'cbwhw5m5111jhc1b',
        'Number of organizations (national or local) who received capacity-building support to become an accredited EORE operator > # of organizations (national or local) who received capacity building support to become an certified EORE operator':
          'cocqg63m5111jhc1c',
        'Cash assistance provided to mine / ERW survivor (SADD) > # EO survivors who received cash assistance (SADD)':
          'crzckufm5111jhc1d',
        'Number of EO victims that have been referred to other services > # of EO victims that have been referred to other services':
          'cuk4lbgm5111jhc1e',
        'Non-technical survey (# surveys) - Area in m2 surveyed > Area surveyed (square metres of area identified and SHA or CHA)':
          'cibcwb8m5111jhc1f',
        'Land cleared > Area cleared (square metres)': 'cliiyj5m5111jhc1g',
        'Land cleared > # of individuals who directly benefitted from land clearance (SADD)': 'cbtmf9im5111jhc1h',
        'Capacity building > # of personnel trained on mine action activities (IMAS) related to survey and clearance':
          'c4xk9rfm5111jhc1i',
      },
      'Population Group': {'Internally Displaced': 'c3yfomom4s6zizi20', 'Non-Displaced': 'cjccin8m4s6ztsm21'},
    }
  }
}
