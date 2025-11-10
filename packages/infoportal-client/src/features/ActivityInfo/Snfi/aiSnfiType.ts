export type AiTypeSnfiRmm = AiTypeSnfiRmm.Type

export namespace AiTypeSnfiRmm {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    'Reporting Organization': Opt<'Partner'>
    'Implementing Partner'?: Opt<'Partner'>
    'Plan/Project Code': Opt<'SNFI 2025 APM'>
    'Indicators - SNFI': Opt<'Indicators - SNFI'>
    /**
      Select yes if items were received through the IOM common pipeline.
    */
    'Distribution through Common Pipeline'?: Opt<'Distribution through Common Pipeline'>
    Theme?: Opt<'Theme'>
    Oblast: string
    Raion: string
    Hromada: string
    Settlement: string
    'Collective Sites'?: string
    'Reporting Month': string
    'Activity Start month'?: string
    'Activity End month'?: string
    'Population Group': Opt<'Population Group'>
    'Non-individuals Reached': number
    'Total Individuals Reached': number
    'Girls (0-17)': number
    'Boys (0-17)': number
    'Adult Women (18-59)': number
    'Adult Men (18-59)': number
    'Older Women (60+)': number
    'Older Men (60+)': number
    /**
      Out of the total individuals reached
    */
    'People with disability'?: number
    'HNRP Scope'?: Opt<'HNRP Scope'>
    'Outside HNRP Scope sub-category'?: Opt<'Outside HNRP Scope categories'>
  }

  export const buildRequest = (a: Type, recordId: string, parentRecordId: string | null = null) => {
    return [
      {
        formId: 'cmasgbem5w7pgf02',
        recordId,
        parentRecordId,
        fields: {
          c5i3wifm5w7q3vq4: a['Reporting Organization']
            ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Reporting Organization']!]
            : undefined,
          cn33ikom5w7q3vq5: a['Implementing Partner']
            ? 'cideet6m4jy2m0fy3x' + ':' + options['Partner'][a['Implementing Partner']!]
            : undefined,
          cx8b8s5m6ul1gml2: a['Plan/Project Code']
            ? 'ctgic3km6ukvzc22' + ':' + options['SNFI 2025 APM'][a['Plan/Project Code']!]
            : undefined,
          ceiqk7wm697ng7n2: a['Indicators - SNFI']
            ? 'cxff543m4r94qi4d' + ':' + options['Indicators - SNFI'][a['Indicators - SNFI']!]
            : undefined,
          ck0xai3m7ajd4ve3: a['Distribution through Common Pipeline']
            ? options['Distribution through Common Pipeline'][a['Distribution through Common Pipeline']!]
            : undefined,
          cx1f1xtm5w7q3vqb: a['Theme'] ? options['Theme'][a['Theme']!] : undefined,
          czi6xi7m5w7q3vqe: a['Oblast'] ? 'ciok70dm4r8lp7f2' + ':' + a['Oblast'] : undefined,
          c9jdhgpm5w7q3vqf: a['Raion'] ? 'c1v215km4s71ndl22' + ':' + a['Raion'] : undefined,
          cuzmwpvm5w7q3vsh: a['Hromada'] ? 'cu8n0g0m4s7y2p16b' + ':' + a['Hromada'] : undefined,
          c42av3m5w7q3vsj: a['Settlement'] ? 'cyr4ry4m4s81hdd6v' + ':' + a['Settlement'] : undefined,
          cukxnnum73gr39e2: a['Collective Sites'] ? 'ckt3l0m4wiw1n92' + ':' + a['Collective Sites'] : undefined,
          cwy07nvm5w7q3vsm: a['Reporting Month'],
          cxukplim5w7q3vsn: a['Activity Start month'],
          cyrbergm5w7q3vso: a['Activity End month'],
          c34r0rcm5w7q3vsq: a['Population Group']
            ? 'cknn1yzm4s6xuox1x' + ':' + options['Population Group'][a['Population Group']!]
            : undefined,
          cec1r1cm5w7q3vss: a['Non-individuals Reached'],
          cptm3phm5w7q3vst: a['Total Individuals Reached'],
          cxchrp3m5w7q3vsu: a['Girls (0-17)'],
          cwhznqsm5w7q3vtv: a['Boys (0-17)'],
          cqxytp7m5w7q3vtw: a['Adult Women (18-59)'],
          c905xm4m5w7q3vtx: a['Adult Men (18-59)'],
          cmt1lkxm5w7q3vty: a['Older Women (60+)'],
          c8qlzrcm5w7q3vtz: a['Older Men (60+)'],
          cdn7buym5w7q3vt10: a['People with disability'],
          c1vmga5m5w7q3vt11: a['HNRP Scope'] ? options['HNRP Scope'][a['HNRP Scope']!] : undefined,
          ct2ezbgm5w7q3vt13: a['Outside HNRP Scope sub-category']
            ? 'ch0e182m4vgc05r2' + ':' + options['Outside HNRP Scope categories'][a['Outside HNRP Scope sub-category']!]
            : undefined,
        },
      },
    ]
  }

  export const options = {
    Partner: {'Danish Refugee Council (DRC)': 'cjmwszwm4s8hlkyrae'},
    'SNFI 2025 APM': {
      'SNFI-DRC-00003': 'c1e4i22m7xattdq2',
      'SNFI-DRC-00004': 'cpbol3jm7xcpal62',
      'SNFI-DRC-00005': 'csd2ahnm7xdgzhi3',
      'SNFI-DRC-00006': 'cpflc8mm7xdkfm64',
      'SNFI-DRC-00007': 'cs1owlnm7xe8mq25',
      'SNFI-DRC-00008': 'c2jnc3fm7xfhwdz6',
      'SNFI-DRC-00009': 'coqp6ewm7xgn5l07',
      'SNFI-DRC-00010': 'cyfam4fmct791u22',
      'SNFI-DRC-00011': 'cxsivt3mct9gfu33',
      'SNFI-DRC-00012': 'c8t96oimht46coz2',
    },
    'Indicators - SNFI': {
      'Emergency Shelter Support > # supported with emergency shelter kits > cash-voucher': 'cgccvcom6f3xnh22',
      'Emergency Shelter Support > # supported with emergency construction materials > cash-voucher':
        'cn67cnim6f3xnh23',
      'Emergency Shelter Support > # supported with emergency construction materials > in-kind': 'ch7noasm6f3xnh24',
      'Emergency Shelter Support > # supported with emergency shelter kits > in-kind': 'c72t93hm6f3xnh25',
      'Emergency NFI support > # supported with household NFI > cash-voucher': 'ci1qchm6f3xnh26',
      'Emergency NFI support > # reached through donation of NFIs (Invincibility Points, bomb shelters, transit centers) > cash-voucher':
        'cmi0cu6m6f3xnh27',
      'Emergency NFI support > # reached through donation of NFIs (Invincibility Points, bomb shelters, transit centers) > in-kind':
        'c5gtxa7m6f3xnh28',
      'Emergency NFI support > # supported with household NFI > in-kind': 'crmuflgm6f3xnh29',
      'Winter Heating > # supported with winter energy > cash-voucher': 'cvp39cym6f3xnh2b',
      'Winter Heating > # supported with cash for utilities > cash-voucher': 'cwdmzdmm6f3xnh2c',
      'Winter Heating > # supported with winter heating appliances > cash-voucher': 'cg95b8lm6f3xnh2d',
      'Winter Heating > # supported with winter energy > in-kind': 'cayqgf0m6f3xnh3e',
      'Winter Heating > # supported with winter heating appliances > in-kind': 'cwngp6lm6f3xnh3f',
      'Personal Insulation > # supported with NFIs for winter > cash-voucher': 'cder48zm6f3xnh3g',
      'Personal Insulation > # supported with winter clothes > cash-voucher': 'ctb2mmnm6f3xnh3h',
      'Personal Insulation > # supported with NFIs for winter > in-kind': 'cmcy1p9m6f3xnh3i',
      'Personal Insulation > # supported with winter clothes > in-kind': 'ctnej21m6f3xnh3j',
      'Shelter Insulation > # supported through insulation of substandard houses > cash-voucher': 'c8r9qhcm6f3xnh3k',
      'Shelter Insulation > # supported through insulation of substandard houses > in-kind': 'c4hhpd3m6f3xnh3l',
      'Humanitarian repair > # supported with light repairs > cash-voucher': 'coxp89om6f3xnh3m',
      'Humanitarian repair > # supported with medium repairs > cash-voucher': 'cjj7cijm6f3xnh3n',
      'Humanitarian repair > # supported with heavy repairs > cash-voucher': 'ck0n2crm6f3xnh3o',
      'Humanitarian repair > # supported through repairs of common spaces > cash-voucher': 'cvetk8lm6f3xnh3p',
      'Humanitarian repair > # supported through the repair of social facilities > cash-voucher': 'cetucanm6f3xnh3q',
      'Humanitarian repair > # supported with light repairs > in-kind': 'c93b2olm6f3xnh3r',
      'Humanitarian repair > # supported with medium repairs > in-kind': 'ckvgktcm6f3xnh3s',
      'Humanitarian repair > # supported with heavy repairs > in-kind': 'ca3y9udm6f3xnh3t',
      'Humanitarian repair > # supported through repairs of common spaces > in-kind': 'c9sdg0rm6f3xnh3u',
      'Humanitarian repair > # supported through the repair of social facilities > in-kind': 'cgxmt75m6f3xnh3v',
      'Refurbishment of Collective Sites > # supported through the refurbishment of collective sites > in-kind':
        'crvhu8om6f3xnh3w',
      'Rental support > # received rental support (RMI) > cash-voucher': 'cvw540sm6f3xnh3x',
      'Humanitarian repair > # supported with IDP light repair > cash-voucher': 'c8v1crgmb7p045c5',
      'Humanitarian repair > # supported with IDP medium repair > cash-voucher': 'cp58u5hmb7p045c6',
      'Humanitarian repair > # supported with IDP light repair > in-kind': 'cvicxoymb7p045c7',
      'Humanitarian repair > # supported with IDP medium repair > in-kind': 'cqpu9namb7p045c8',
    },
    'Population Group': {'Internally Displaced': 'c3yfomom4s6zizi20', 'Non-Displaced': 'cjccin8m4s6ztsm21'},
    'Outside HNRP Scope categories': {
      'Outside priority areas': 'c3ap6l0m4vgd4ov4',
      'Funding not reported in FTS​': 'c9801rnm4vgdewn5',
      'Delivered outside HNRP​ mechanism': 'cgc12ggm4vgdovj6',
      'Not aligned to guidance': 'cei6bscm4vgdvpq7',
    },
    'Distribution through Common Pipeline': {Yes: 'c5uk15xm7ajd4vd2', No: 'coik3vdm7ajeeuc4'},
    Theme: {
      'No specific theme': 'cu5nj6em5w7q3vqc',
      Evacuations: 'cvret7nmb818f1n2',
      'Emergency response after strikes': 'cqpda51mb818ocb3',
      'Both (evacuation & emergency response after strikes)': 'c8cob8lmb818rff4',
    },
    'HNRP Scope': {'Outside HNRP Scope': 'c4xszfom5w7q3vt12'},
  }
}
