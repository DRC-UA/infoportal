export namespace Cs_tracker {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: ac5Xu2t2vJ97WneTGaSVNH
  export interface T {
    start: string
    end: string
    // training_date [date] Date of Training
    training_date: Date | undefined
    // project_code [select_one] Please enter the project code
    project_code: undefined | Option<'project_code'>
    // project_code_other [text] If Other, please specify:
    project_code_other: string | undefined
    // location [select_one] Training Location
    location: undefined | Option<'office'>
    // location_other [text] If Other, please specify:
    location_other: string | undefined
    // training_type [select_one] Training Type
    training_type: undefined | Option<'training_type'>
    // training_format [select_one] Training Format
    training_format: undefined | Option<'training_format'>
    // training_duration [select_one] Training Duration
    training_duration: undefined | Option<'training_duration'>
    // gender/participants_female [integer] Female
    participants_female: number | undefined
    // gender/participants_male [integer] Male
    participants_male: number | undefined
    // gender/participants_not_applicable [integer] Not Applicable
    participants_not_applicable: number | undefined
    // participants_organisation/total_participants [integer] Number of participants trained (total)
    total_participants: number | undefined
    // participants_organisation/organisation [select_multiple] Organisation
    organisation: undefined | Option<'organisation'>[]
    // participants_organisation/participants_drc_num [integer] Number participants (DRC)
    participants_drc_num: number | undefined
    // participants_organisation/participants_partner_num [integer] Number participants (Partner)
    participants_partner_num: number | undefined
    // participants_organisation/participants_partner_name [integer] Name of Partner
    participants_partner_name: number | undefined
    // participants_organisation/participants_other_num [integer] Number participants (Other)
    participants_other_num: number | undefined
    // participants_organisation/participants_other_name [integer] Affiliation of participants (Other)
    participants_other_name: number | undefined
    // participants_organisation/sector_team [select_multiple] Sector/Team
    sector_team: undefined | Option<'sector_team'>[]
    // participants_organisation/hdp_num [integer] HDP:
    hdp_num: number | undefined
    // participants_organisation/ecrec_num [integer] Ecrec:
    ecrec_num: number | undefined
    // participants_organisation/shelter_num [integer] Shelter & Settlement:
    shelter_num: number | undefined
    // participants_organisation/protection_num [integer] Protection:
    protection_num: number | undefined
    // participants_organisation/meal_num [integer] MEAL:
    meal_num: number | undefined
    // participants_organisation/partnership_num [integer] Partnership:
    partnership_num: number | undefined
    // participants_organisation/support_num [integer] Support Services:
    support_num: number | undefined
    // participants_organisation/bn_num [integer] Basic Needs:
    bn_num: number | undefined
    // participants_organisation/sector_team_other [text] If Other, please specify:
    sector_team_other: string | undefined
    // participants_organisation/office [select_multiple] Area/Base Office (Duty station)
    office: undefined | Option<'office'>[]
    // participants_organisation/kyiv_num [integer] Kyiv:
    kyiv_num: number | undefined
    // participants_organisation/che_num [integer] Chernihiv:
    che_num: number | undefined
    // participants_organisation/sumy_num [integer] Sumy:
    sumy_num: number | undefined
    // participants_organisation/kha_num [integer] Kharkiv:
    kha_num: number | undefined
    // participants_organisation/myko_num [integer] Mykolaiv:
    myko_num: number | undefined
    // participants_organisation/khe_num [integer] Kherson:
    khe_num: number | undefined
    // participants_organisation/iva_num [integer] Ivankiv:
    iva_num: number | undefined
    // participants_organisation/slo_num [integer] Sloviansk:
    slo_num: number | undefined
    // participants_organisation/dnk_num [integer] Dnipro:
    dnk_num: number | undefined
    // participants_organisation/office_other [text] If Other, please specify:
    office_other: string | undefined
    // participants_organisation/role_organisation [select_multiple] Role in Organisation
    role_organisation: undefined | Option<'role_organisation'>[]
    // participants_organisation/manager_num [integer] Management
    manager_num: number | undefined
    // participants_organisation/non_manager_num [integer] Non-Management
    non_manager_num: number | undefined
    // participants_organisation/na_num [integer] Unknown
    na_num: number | undefined
    // email [text] Please provide your e-mail in case of any follow-up questions
    email: string | undefined
  }

  export const options = {
    project_code: {
      UKR_000270: `UKR-000270 Pooled Funds`,
      'UKR-000304': `UKR-000304 PSPU`,
      UKR_000306: `UKR-000306 Dutch II`,
      UKR_000307: `UKR-000307 KG Foundation`,
      UKR_000350: `UKR-000350 SIDA`,
      UKR_000355: `UKR-000355 Danish MFA`,
      UKR_000372: `UKR-000372 ECHO3`,
      UKR_000373: `UKR-000373 Novo-Nordilsk`,
      UKR_000378: `UKR-000378 Danish MFA`,
      UKR_000380: `UKR-000380 DANIDA`,
      UKR_000385: `UKR-000385 Pooled Funds`,
      UKR_000386: `UKR-000386 Pooled Funds`,
      'UK_-000387': `UKR-000387 WRA`,
      UKR_000388: `UKR-000388 BHA`,
      UKR_000392: `UKR-000392 HGBF HDP`,
      UKR_000396: `UKR-000396 Danish MFA`,
      UKR_000397: `UKR-000397 GFFO`,
      UKR_000398: `UKR-000398 SDC`,
      UKR_000399: `UKR-000399 SDC3`,
      UKR_000418: `UKR-000418 SIDA`,
      UKR_000419: `UKR-000419 Danida SPA`,
      UKR_000420: `UKR-000419 Danida SPA`,
      na: `Not applicable`,
      other: `Other`,
    },
    undefined: {
      bellow_30y: `Below 30 years old`,
      '30_40y': `30-40 years old`,
      '40_50y': `40-50 years old`,
      above_50y: `Above 50 years old`,
      female: `Female`,
      male: `Male`,
      other: `Other`,
      pns: `Prefer not to say`,
      yes: `Yes`,
      no: `No`,
    },
    organisation: {
      drc: `DRC`,
      partner: `Partner`,
      other: `Other Organisation`,
    },
    sector_team: {
      hdp: `HDP`,
      ecrec: `Economic Recovery`,
      shelter: `Shelter & Settlement`,
      protection: `Protection`,
      meal: `MEAL`,
      partnership: `Partnership`,
      support: `Support Services`,
      bn: `Basic Needs Team`,
      other: `Other`,
    },
    office: {
      kyiv: `Kyiv (CO)`,
      chernihiv: `Chernihiv`,
      sumy: `Sumy`,
      kharkiv: `Kharkiv`,
      mykolaiv: `Mykolaiv`,
      kherson: `Kherson`,
      ivankiv: `Ivankiv`,
      sloviansk: `Sloviansk`,
      dnipro: `Dnipro`,
      other: `Other`,
    },
    role_organisation: {
      manager: `Management`,
      support: `Non-Management`,
      unknown: `Unknown`,
    },
    training_format: {
      offline: `Offline`,
      online: `Online`,
    },
    training_duration: {
      half_day: `Half-day`,
      '1_2days': `1-2 days`,
      '3days': `3 days`,
    },
    training_type: {
      session: `Training Session`,
      tot: `ToT`,
    },
  } as const

  const extractQuestionName = (_: Record<string, any>) => {
    const output: any = {}
    Object.entries(_).forEach(([k, v]) => {
      const arr = k.split('/')
      const qName = arr[arr.length - 1]
      output[qName] = v
    })
    return output
  }

  export const map = (_: Record<keyof T, any>): T =>
    ({
      ..._,
      training_date: _.training_date ? new Date(_.training_date) : undefined,
      participants_female: _.participants_female ? +_.participants_female : undefined,
      participants_male: _.participants_male ? +_.participants_male : undefined,
      participants_not_applicable: _.participants_not_applicable ? +_.participants_not_applicable : undefined,
      total_participants: _.total_participants ? +_.total_participants : undefined,
      organisation: _.organisation?.split(' '),
      participants_drc_num: _.participants_drc_num ? +_.participants_drc_num : undefined,
      participants_partner_num: _.participants_partner_num ? +_.participants_partner_num : undefined,
      participants_partner_name: _.participants_partner_name ? +_.participants_partner_name : undefined,
      participants_other_num: _.participants_other_num ? +_.participants_other_num : undefined,
      participants_other_name: _.participants_other_name ? +_.participants_other_name : undefined,
      sector_team: _.sector_team?.split(' '),
      hdp_num: _.hdp_num ? +_.hdp_num : undefined,
      ecrec_num: _.ecrec_num ? +_.ecrec_num : undefined,
      shelter_num: _.shelter_num ? +_.shelter_num : undefined,
      protection_num: _.protection_num ? +_.protection_num : undefined,
      meal_num: _.meal_num ? +_.meal_num : undefined,
      partnership_num: _.partnership_num ? +_.partnership_num : undefined,
      support_num: _.support_num ? +_.support_num : undefined,
      bn_num: _.bn_num ? +_.bn_num : undefined,
      office: _.office?.split(' '),
      kyiv_num: _.kyiv_num ? +_.kyiv_num : undefined,
      che_num: _.che_num ? +_.che_num : undefined,
      sumy_num: _.sumy_num ? +_.sumy_num : undefined,
      kha_num: _.kha_num ? +_.kha_num : undefined,
      myko_num: _.myko_num ? +_.myko_num : undefined,
      khe_num: _.khe_num ? +_.khe_num : undefined,
      iva_num: _.iva_num ? +_.iva_num : undefined,
      slo_num: _.slo_num ? +_.slo_num : undefined,
      dnk_num: _.dnk_num ? +_.dnk_num : undefined,
      role_organisation: _.role_organisation?.split(' '),
      manager_num: _.manager_num ? +_.manager_num : undefined,
      non_manager_num: _.non_manager_num ? +_.non_manager_num : undefined,
      na_num: _.na_num ? +_.na_num : undefined,
    }) as T
}
