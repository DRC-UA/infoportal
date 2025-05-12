export type AiTypeChildProtectionAorRmm = AiTypeChildProtectionAorRmm.Type

export namespace AiTypeChildProtectionAorRmm {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    'Reporting Organization': Opt<'Partner'>
    'Implementing Partner'?: Opt<'Partner'>
    'Implementing Partner 2'?: Opt<'Partner'>
    'Plan/Project Code': Opt<'Activity Planning Module (Child Protection)'>
    Oblast: string
    Raion: string
    Hromada: string
    Settlement?: string
    'Collective Site'?: string
    'Activities and People'?: AiTypeActivitiesAndPeople[]
    ID: string
  }

  export const buildRequest = (a: Type, recordId: string, parentRecordId: string | null = null) => {
    return [
      {
        formId: 'cvgj28ym513hkiph7y',
        recordId,
        parentRecordId,
        fields: {
          chkoxzhm4wi1a2f5: a['Reporting Organization'] ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Reporting Organization']!] : undefined,
          cxegdaym4wi2qbq6: a['Implementing Partner'] ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Implementing Partner']!] : undefined,
          c4y1cm9m4wi4r8x7: a['Implementing Partner 2'] ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Implementing Partner 2']!] : undefined,
          cx026u6m52jrfo27: a['Plan/Project Code'] ? 'cqkzhlom4tt5ng81aml' + ':' + options['Activity Planning Module (Child Protection)'][a['Plan/Project Code']!] : undefined,
          ce9pjx6m4wihjfpa: a['Oblast'] ? 'ciok70dm4r8lp7f2' + ':' + a['Oblast'] : undefined,
          c7plljum4wiik9ib: a['Raion'] ? 'c1v215km4s71ndl22' + ':' + a['Raion'] : undefined,
          cjd10k0m4wijuqtc: a['Hromada'] ? 'cu8n0g0m4s7y2p16b' + ':' + a['Hromada'] : undefined,
          cp70mkkm4wil1q7d: a['Settlement'] ? 'cyr4ry4m4s81hdd6v' + ':' + a['Settlement'] : undefined,
          chcqc70m4wjta8gh: a['Collective Site'] ? 'ckt3l0m4wiw1n92' + ':' + a['Collective Site'] : undefined,
          cjx6f4m9iam99x2: a['ID'],
        },
      },
      ...(a['Activities and People'] ?? []).flatMap((_, i) => AiTypeActivitiesAndPeople.buildRequest(_, recordId + 'i' + ('' + i).padStart(2, '0'), recordId)),
    ]
  }

  export const options = {
    Partner: {'Danish Refugee Council (DRC)': 'cjmwszwm4s8hlkyrae'},
    'Activity Planning Module (Child Protection)': {'CP-DRC-00001': 'ci9xc7tm99yyvrx2', 'CP-DRC-00002': 'cosm9km99z0r7d3', 'CP-DRC-00003': 'cva3v3zm99z25464', 'CP-DRC-00004': 'ckjm906m99z3u3h5'},
  }

  export type AiTypeActivitiesAndPeople = AiTypeActivitiesAndPeople.Type

  export namespace AiTypeActivitiesAndPeople {
    type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
    export interface Type {
      /**
      Choose reporting month
    */
      'Reporting Month': string
      /**
      Choose activity and indicator from dropdown list below
    */
      Indicators: Opt<'Indicators - Protection'>
      'Response theme': Opt<'Response theme'>
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
      'HNRP Scope'?: Opt<'HNRP Scope'>
      'Outside HNRP Scope categories'?: Opt<'Outside HNRP Scope categories'>
    }

    export const buildRequest = (a: Type, recordId: string, parentRecordId: string | null = null) => {
      return [
        {
          formId: 'c3hqjzsm513hkiph7z',
          recordId,
          parentRecordId,
          fields: {
            ci8nkkpm6arvn262: a['Reporting Month'],
            ckgn2n6m4wk2393o: a['Indicators'] ? 'ctica5gm4r928td16' + ':' + options['Indicators - Protection'][a['Indicators']!] : undefined,
            c90clwim9ibsq7x5: a['Response theme'] ? options['Response theme'][a['Response theme']!] : undefined,
            cc9whaum4wl74eb12: a['Population Group'] ? 'cknn1yzm4s6xuox1x' + ':' + options['Population Group'][a['Population Group']!] : undefined,
            cxcth1bm4wk7dvms: a['Total Individuals Reached'],
            ce79tc4m4wkdpd4t: a['Girls (0-17)'],
            ckd43oym4wkfhmwu: a['Boys (0-17)'],
            cflqb6km4wkujyxv: a['Adult Women (18-59)'],
            clhi83vm4wkxl81w: a['Adult Men (18-59)'],
            cty2zyem4wkyvyhx: a['Older Women (60+)'],
            csq1r47m4wl091ky: a['Older Men (60+)'],
            ctm6pddm4wl2ky2z: a['Non-individuals Reached/Quantity'],
            c3knsqem4wl8nfu14: a['People with Disability'],
            c1bq0s1m8crs3mh3: a['HNRP Scope'] ? options['HNRP Scope'][a['HNRP Scope']!] : undefined,
            cikc6sim8crtlw34: a['Outside HNRP Scope categories'] ? 'ch0e182m4vgc05r2' + ':' + options['Outside HNRP Scope categories'][a['Outside HNRP Scope categories']!] : undefined,
          },
        },
      ]
    }

    export const options = {
      'Indicators - Protection': {
        'Provision of mental health and psychosocial support (MHPSS) services to girls and boys (Individual and groups) > # of girls and boys benefiting from age, gender, disability sensitive mental health and psychosocial support (MHPSS) services':
          'ch48a7m5111jhc3',
        'Provision of mental health and psychosocial support (MHPSS) services to parents/caregivers (Individual and group) and positive parenting sessions > # of parents/caregivers who receive psychosocial support and/or positive parenting leading to improved relationships with the children under their care':
          'cuv6r6tm5111jhc4',
        'Child protection case management > # of identified at risk girls and boys who receive case management services that meet their unique needs': 'cfbszlcm5111jhc5',
        'Service for children affected by, or at-risk victims of, explosive ordnance (EO)/victim assistance > # of children and caregivers who have been affected by landmine or other explosive weapons received by prevention and/or survivor assistance interventions':
          'c2kxk5om5111jhc6',
        'Child protection/child friendly legal assistance > # of girls and boys and their caregivers who received legal assistance on CP issues': 'cwulrv2m5111jhc7',
        'Referral to specialised services to address the critical needs of children and caregivers > # of girls and boys, caregivers with specific needs referred to specialized services and assistance (Health, rehabilitation, MH, and MPCA etc)':
          'cq4smtbm5111jhc8',
        'Family tracing and reunification > # of girls and boys reunified with their primary or extended family': 'cshp7mkm5111jhc9',
        'Supporting unaccompanied children or children at risk in alternative family-based care > # of girls and boys supported with family based alternative care arrangements': 'cqf397im5111jhca',
        'Emergency case management fund > # of children and their family members who received C4P, or emergency case management funds (in cash) utilised in standard case management service provision to prevent, mitigate, or respond to child protection risks':
          'c1zm1tvm5111jhcb',
        'Emergency support for children and caregivers (in-kind/NFI) > # of children and caregivers who received protection and social assistance in-kind': 'cqfppgvm5111jhcc',
        'Community engagement and community-based child protection > # of community-based child protection structures, or child/adolescent groups/clubs, established or supported (non – individual)':
          'c2owq2qm5111jhcd',
        'Community engagement and community-based child protection > # of girls, boys, women, and men of child protection community-based actors trained on CP related topics and supported':
          'ccyl13lm5111jhce',
        'Child protection awareness raising, risk mitigation measures and dissemination of life-saving information on child protection services and referrals > # of girls, boys and caregivers reached by messaging on key child protection risks, and related information on CP service and mitigation measures':
          'cssq6i4m5111jhcf',
        'Enhancing local child protection capacity to deliver critical life-saving service > # of CP actors [case/social workers, government officials, field staff] who have received training in CP training, PSEA, Child safeguarding (men and women)':
          'cxhxejmm5111jhcg',
        'Mainstreaming child protection in other sectors > # of women and men non-child protection staff trained on child protection mainstreaming CP approaches, safe identification, and referral pathways, etc':
          'cpmjx4lm5111jhch',
        'Strengthen the child safeguarding and PSEA measures in humanitarian response > # of CP partners staff (UN/INGOs/NGOs) trained on PSEA and child safeguarding': 'cmlkajxm5111jhci',
        'Strengthen the child safeguarding and PSEA measures in humanitarian response > # of girls, boys, women, and men aware of the ways to report safeguarding issues, including possible PSEA allegations':
          'cvl1ycym5111jhcj',
        'Unaccompanied and separated children > # of unaccompanied girls and boys identified and documented': 'csp8v1em5111jhck',
        'Unaccompanied and separated children > # of separated girls and boys identified and documented': 'ct6vg73m5111jhcl',
        'Establishment of CFS > # of CP safe space including child friendly spaces, Community Resilience Centres (CRC), and other safe spaces, service points (centre) established this month':
          'ctnp632m5111jhcm',
        'Establishment of mobile team > # of mobile team established and functional this month (mobile groups)': 'cnf3ewm5111jhcn',
      },
      'Population Group': {'Internally Displaced': 'c3yfomom4s6zizi20', 'Non-Displaced': 'cjccin8m4s6ztsm21'},
      'Outside HNRP Scope categories': {
        'Outside priority areas': 'c3ap6l0m4vgd4ov4',
        'Funding not reported in FTS​': 'c9801rnm4vgdewn5',
        'Delivered outside HNRP​ mechanism': 'cgc12ggm4vgdovj6',
        'Not aligned to guidance': 'cei6bscm4vgdvpq7',
      },
      'Response theme': {
        'No specific theme': 'c38liqbm9ibsq7w4',
        Evacuations: 'csyf8csm9ibtada6',
        'Emergency response after strikes': 'chi4t5m9ibtvcb7',
        'Both (evacuation & emergency response after strikes)': 'cs1otihm9ibui0s8',
      },
      'HNRP Scope': {'Outside HNRP Scope': 'cgvb288m8crs3mg2'},
    }
  }
}
