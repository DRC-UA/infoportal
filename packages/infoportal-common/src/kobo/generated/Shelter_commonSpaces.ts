export namespace Shelter_commonSpaces {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: a5LCi33Fte33grspeZFANk
  export interface T {
    start: string
    end: string
    // introduction/reporting_date [date] Reporting date
    reporting_date: Date | undefined
    // introduction/office [select_one] DRC Office
    office: undefined | Option<'office'>
    // introduction/project [select_one] Project
    project: undefined | Option<'project'>
    // introduction/ben_det_oblast [select_one] Oblast
    ben_det_oblast: undefined | Option<'ben_det_oblast'>
    // introduction/ben_det_raion [select_one] Raion
    ben_det_raion: undefined | string
    // introduction/ben_det_hromada [select_one] Hromada
    ben_det_hromada: undefined | string
    // introduction/ben_det_settlement [select_one_from_file] Settlement
    ben_det_settlement: string
    // building_information/address [text] Address of building to be repaired
    address: string | undefined
    // building_information/gps_coordinates [geopoint] Street gps coordinates
    gps_coordinates: string
    // building_information/damaged_conflict [select_one] Building damaged by conflict?
    damaged_conflict: undefined | Option<'compliance_standards'>
    // building_information/damage [select_multiple] Extent of damage to common spaces
    damage: undefined | Option<'damage'>[]
    // building_information/damage_other [text] If "Other", please specify
    damage_other: string | undefined
    // building_information/management_model [select_multiple] Management model
    management_model: undefined | Option<'management_model'>[]
    // building_information/management_model_other [text] If "Other", please specify
    management_model_other: string | undefined
    // building_information/person_responsible [text] Person responsible
    person_responsible: string | undefined
    // building_information/not_targets [note] **Targets**
    not_targets: string
    // building_information/total_apartments [integer] Total number of apartments (in building or in section)
    total_apartments: number | undefined
    // building_information/occupied_apartments [integer] Number of occupied apartments (direct HH beneficiaries)
    occupied_apartments: number | undefined
    // building_information/individuals [integer] Number of individuals (total combined of direct HH beneficiaries)
    individuals: number | undefined
    // building_information/total_girl [calculate] Total number of girls under18 years (total combined of direct HH beneficiaries)
    total_girl: string
    // building_information/total_boy [calculate] Total number of boys under18 years (total combined of direct HH beneficiaries)
    total_boy: string
    // building_information/total_female [calculate] Total number of females more 18 years (total combined of direct HH beneficiaries)
    total_female: string
    // building_information/total_male [calculate] Total number of males more 18 years (total combined of direct HH beneficiaries)
    total_male: string
    // building_information/total_dis [calculate] Total number of people with disabilities (total combined of direct HH beneficiaries)
    total_dis: string
    // building_information/total_chronic [calculate] Total number of people with chronic diseases (total combined of direct HH beneficiaries)
    total_chronic: string
    // apartment_information [begin_repeat] Apartment information
    apartment_information:
      | {
          apt_number: string | undefined | undefined
          fp_name: string | undefined | undefined
          owner_number: number | undefined | undefined
          ben_det_hh_size: number | undefined | undefined
          hh_char_hh_det: string | undefined
          hh_char_hh_det_gender: undefined | Option<'hh_char_hh_det_gender'> | undefined
          hh_char_hh_det_age: number | undefined | undefined
          hh_char_hh_det_dis_select: undefined | Option<'hh_char_hh_det_dis_select'>[] | undefined
          hh_char_hh_det_dis_level: undefined | Option<'hh_char_hh_det_dis_level'> | undefined
          chronic_disease: undefined | Option<'compliance_standards'> | undefined
          explain_chronic_disease: string | undefined | undefined
          female_hh_l18: string | undefined
          male_hh_l18: string | undefined
          female_hh_m18: string | undefined
          male_hh_m18: string | undefined
          calc_det_dis_level: string | undefined
          calc_chronic_disease: string | undefined
          eligible_egov: undefined | Option<'compliance_standards'> | undefined
          barriers_compensation: undefined | Option<'barriers_compensation'>[] | undefined
          barriers_compensation_other: string | undefined | undefined
          referred_legal: undefined | Option<'compliance_standards'> | undefined
          referred_legal_no: string | undefined | undefined
          interested_attending_legal_session: undefined | Option<'interested_attending_legal_session'>[] | undefined
        }[]
      | undefined
    // modality_assistance [select_one] Modality of assistance
    modality_assistance: undefined | Option<'modality_assistance'>
    // work_order [text] Work Order
    work_order: string | undefined
    // status [select_one] Status
    status: undefined | Option<'status'>
    // work_done [date] Work done at
    work_done: Date | undefined
    // compliance_standards [select_one] Compliance with technical and performance standards
    compliance_standards: undefined | Option<'compliance_standards'>
    // compliance_standards_no [text] If 'No', please specify what issue is
    compliance_standards_no: string | undefined
  }
  export const options = {
    compliance_standards: {
      yes: `Yes`,
      no: `No`,
    },
    office: {
      dnk: `Dnipro (DNK)`,
      hrk: `Kharkiv (HRK)`,
      nlv: `Mykloaiv (NLV)`,
      umy: `Sumy (UMY)`,
      slo: `Sloviansk (SLO)`,
    },
    project: {
      ukr000399_sdc3: `SDC 399`,
      ukr000423_echo4: `ECHO 423`,
    },
    damage: {
      windows: `Windows`,
      staircaise: `Staircaise / lift`,
      entrance_doors: `Entrance doors`,
      roof: `Roof`,
      other: `Other`,
    },
    management_model: {
      osbb: `OSBB`,
      management_company: `Management company`,
      local_authorities: `Local Authorities`,
      other: `Other`,
    },
    barriers_compensation: {
      outdated_documents: `Outdated documents`,
      absence_resistration: `Absence of resistration in digital cataster`,
      co_ownership: `Co-ownership/Inheritance issues`,
      cost_repairs: `Cost for repairs is too high`,
      other: `Other`,
    },
    hh_char_hh_det_gender: {
      female: `Female`,
      male: `Male`,
    },
    hh_char_hh_det_dis_select: {
      diff_see: `Have difficulty seeing, even if wearing glasses`,
      diff_hear: `Have difficulty hearing, even if using a hearing aid`,
      diff_walk: `Have difficulty walking or climbing steps`,
      diff_rem: `Have difficulty remembering or concentrating`,
      diff_care: `Have difficulty with self-care such as washing all over or dressing`,
      diff_comm: `Have difficulty communicating, for example understanding or being understood`,
      diff_none: `None of the above apply`,
    },
    hh_char_hh_det_dis_level: {
      zero: `No, no difficulty`,
      one: `Yes, some difficulty`,
      two: `Yes, a lot of difficulty`,
      fri: `Cannot do at all`,
    },
    interested_attending_legal_session: {
      registering_osbb: `Procedure for registering OSBB`,
      compensation_damaged_housing: `Procedure for receiving compensation for damaged housing`,
      ownership_compensation: `Confirmation of ownership to access compensation`,
      application_rd4u: `Submission of an application to the International Register of Damages RD4U`,
      inheritance_martial_law: `Inheritance under martial law`,
      not_interested: `Do not interested in legal sessions`,
    },
    modality_assistance: {
      cash: `Cash`,
      contractor: `Contractor`,
      na: `N/A`,
    },
    status: {
      contractor_visit: `Contractor visit done`,
      work_estimates: `Work estimates received`,
      purchase_request: `Purchase Request Done`,
      work_order: `Work Order Done`,
      repair_started: `Repair works Started`,
      repair_completed: `Repair works Completed`,
    },
    ben_det_oblast: {
      crimea: `Autonomous Republic of Crimea`,
      cherkaska: `Cherkasy`,
      chernihivska: `Chernihiv`,
      chernivetska: `Chernivtsi`,
      dnipropetrovska: `Dnipropetrovsk`,
      donetska: `Donetsk`,
      'ivano-frankivska': `Ivano-Frankivsk`,
      kharkivska: `Kharkiv`,
      khersonska: `Kherson`,
      khmelnytska: `Khmelnytskyi`,
      kirovohradska: `Kirovohrad`,
      kyivska: `Kyiv`,
      luhanska: `Luhansk`,
      lvivska: `Lviv`,
      mykolaivska: `Mykolaiv`,
      odeska: `Odesa`,
      poltavska: `Poltava`,
      rivnenska: `Rivne`,
      sumska: `Sumy`,
      ternopilska: `Ternopil`,
      vinnytska: `Vinnytsia`,
      volynska: `Volyn`,
      zakarpatska: `Zakarpattia`,
      zaporizka: `Zaporizhzhia`,
      zhytomyrska: `Zhytomyr`,
      sevastopol: `Sevastopol`,
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
      reporting_date: _.reporting_date ? new Date(_.reporting_date) : undefined,
      damage: _.damage?.split(' '),
      management_model: _.management_model?.split(' '),
      total_apartments: _.total_apartments ? +_.total_apartments : undefined,
      occupied_apartments: _.occupied_apartments ? +_.occupied_apartments : undefined,
      individuals: _.individuals ? +_.individuals : undefined,
      apartment_information: _['apartment_information']?.map(extractQuestionName).map((_: any) => {
        _['owner_number'] = _.owner_number ? +_.owner_number : undefined
        _['ben_det_hh_size'] = _.ben_det_hh_size ? +_.ben_det_hh_size : undefined
        _['hh_char_hh_det_age'] = _.hh_char_hh_det_age ? +_.hh_char_hh_det_age : undefined
        _['hh_char_hh_det_dis_select'] = _.hh_char_hh_det_dis_select?.split(' ')
        _['barriers_compensation'] = _.barriers_compensation?.split(' ')
        _['interested_attending_legal_session'] = _.interested_attending_legal_session?.split(' ')
        return _
      }),
      work_done: _.work_done ? new Date(_.work_done) : undefined,
    }) as T
}
