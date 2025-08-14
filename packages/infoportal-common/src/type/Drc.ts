import {Obj, seq} from '@axanc/ts-utils'

import {OblastName} from '../location/index.js'

export enum DrcOffice {
  Chernihiv = 'Chernihiv',
  Chernivtsi = 'Chernivtsi',
  Dnipro = 'Dnipro',
  Ichna = 'Ichna',
  Ivankiv = 'Ivankiv',
  Kharkiv = 'Kharkiv',
  Kherson = 'Kherson',
  Kyiv = 'Kyiv',
  Lviv = 'Lviv',
  Mykolaiv = 'Mykolaiv',
  Poltava = 'Poltava',
  Sloviansk = 'Sloviansk',
  Sumy = 'Sumy',
  Zaporizhzhya = 'Zaporizhzhya',
}

export enum DrcOperatingOffice {
  Dnipro = 'Dnipro',
  Kharkiv = 'Kharkiv',
  Kyiv = 'Kyiv',
  Mykolaiv = 'Mykolaiv',
  Sloviansk = 'Sloviansk',
  Sumy = 'Sumy',
}

export const oblastByDrcOffice: Record<DrcOffice, OblastName> = {
  Kyiv: 'Kyivska',
  Sumy: 'Sumska',
  Mykolaiv: 'Mykolaivska',
  Lviv: 'Lvivska',
  Chernihiv: 'Chernihivska',
  Kharkiv: 'Kharkivska',
  Dnipro: 'Dnipropetrovska',
  Poltava: 'Poltavska',
  Chernivtsi: 'Chernihivska',
  Sloviansk: 'Donetska',
  Ivankiv: 'Ivano-Frankivska', // 🫣
  Ichna: 'Chernihivska',
  Kherson: 'Khersonska',
  Zaporizhzhya: 'Zaporizka',
}

export const drcOffices = Obj.values(DrcOffice)

export enum DrcSector {
  DrcSector = 'DrcSector',
  EORE = 'EORE',
  Education = 'Education',
  Evacuations = 'Evacuations',
  FoodSecurity = 'FoodSecurity',
  GBV = 'GBV',
  GeneralProtection = 'GeneralProtection',
  Health = 'Health',
  Legal = 'Legal',
  Livelihoods = 'Livelihoods',
  MPCA = 'MPCA',
  NFI = 'NFI',
  Nutrition = 'Nutrition',
  PSS = 'PSS',
  Shelter = 'Shelter',
  VA = 'VA',
  WaSH = 'WaSH',
}

export enum DrcProgram {
  AwarenessRaisingSession = 'AwarenessRaisingSession',
  CapacityBuilding = 'CapacityBuilding',
  CaseManagement = 'CaseManagement',
  CashForEducation = 'CashForEducation',
  CashForFuel = 'CashForFuel',
  CashForRent = 'CashForRent',
  CashForRepair = 'CashForRepair',
  CashForUtilities = 'CashForUtilities',
  CommunityLevelPm = 'CommunityLevelPm',
  Counselling = 'Counselling',
  DignityKits = 'DignityKits',
  ESK = 'ESK',
  FGD = 'FGD',
  GBV = 'GBV',
  HygieneKit = 'HygieneKit',
  InfantWinterClothing = 'InfantWinterClothing',
  Legal = 'Legal',
  LegalAid = 'LegalAid',
  LegalAssistanceCivil = 'Legal Assistance: civil',
  LegalAssistanceCivilDocs = 'Legal Assistance: civil with docs',
  LegalAssistanceHlp = 'Legal Assistance: HLP',
  LegalAssistanceHlpDocs = 'Legal Assistance: HLP with docs',
  LegalCounselling = 'Legal Counselling',
  MHPSSActivities = 'MHPSSActivities',
  MPCA = 'MPCA',
  MSME = 'MSME',
  NFI = 'NFI',
  Observation = 'Observation',
  P2P = 'PeerToPeerTraining',
  PFA = 'PsychologicalFirstAid',
  PGS = 'PsychosocialGroupSession',
  PIS = 'PsychosocialIndividualSession',
  PSS = 'PSS',
  ProtectionMonitoring = 'ProtectionMonitoring',
  Referral = 'Referral',
  SectoralCashForAgriculture = 'SectoralCashForAgriculture',
  SectoralCashForAnimalFeed = 'SectoralCashForAnimalFeed',
  SectoralCashForAnimalShelterRepair = 'SectoralCashForAnimalShelterRepair',
  ShelterRepair = 'ShelterRepair',
  TIA = 'TIA',
  VET = 'VET',
  WGSS = 'WGSS',
}

export class DrcSectorHelper {
  private static readonly byProgram: Record<DrcProgram, DrcSector[]> = {
    AwarenessRaisingSession: [DrcSector.GeneralProtection, DrcSector.GBV], //	# of individuals reached with awareness-raising activities and GBV-life-saving information
    CapacityBuilding: [DrcSector.GBV], //	# of non-GBV service providers trained on GBV prevention, risk mitigation and referrals that meet GBViE minimum standards
    CaseManagement: [DrcSector.GBV], //	# of individuals reached with humanitarian cash and voucher assistance for GBV case management and
    CashForEducation: [DrcSector.Education],
    CashForFuel: [DrcSector.Shelter],
    CashForRent: [DrcSector.Shelter],
    CashForRepair: [DrcSector.Shelter],
    CashForUtilities: [DrcSector.Shelter],
    CommunityLevelPm: [DrcSector.GeneralProtection],
    Counselling: [DrcSector.GeneralProtection],
    DignityKits: [DrcSector.GBV], //	# of women and girls at risk who received dignity kits
    ESK: [DrcSector.Shelter],
    FGD: [DrcSector.GeneralProtection],
    GBV: [DrcSector.GBV],
    HygieneKit: [DrcSector.NFI],
    InfantWinterClothing: [DrcSector.NFI],
    Legal: [DrcSector.GeneralProtection],
    LegalAid: [DrcSector.GBV], //	# of individuals at risk supported with GBV specialized legal assistance and counseling
    [DrcProgram.LegalAssistanceCivil]: [DrcSector.Legal],
    [DrcProgram.LegalAssistanceCivilDocs]: [DrcSector.Legal],
    [DrcProgram.LegalAssistanceHlp]: [DrcSector.Legal],
    [DrcProgram.LegalAssistanceHlpDocs]: [DrcSector.Legal],
    [DrcProgram.LegalCounselling]: [DrcSector.Legal],
    MHPSSActivities: [DrcSector.PSS],
    MPCA: [DrcSector.MPCA],
    MSME: [DrcSector.Livelihoods],
    NFI: [DrcSector.NFI],
    Observation: [DrcSector.GeneralProtection],
    PSS: [DrcSector.GeneralProtection],
    PeerToPeerTraining: [DrcSector.PSS],
    ProtectionMonitoring: [DrcSector.GeneralProtection],
    PsychologicalFirstAid: [DrcSector.PSS],
    PsychosocialGroupSession: [DrcSector.PSS],
    PsychosocialIndividualSession: [DrcSector.PSS],
    Referral: [DrcSector.GeneralProtection],
    SectoralCashForAgriculture: [DrcSector.Livelihoods],
    SectoralCashForAnimalFeed: [DrcSector.Livelihoods],
    SectoralCashForAnimalShelterRepair: [DrcSector.Livelihoods],
    ShelterRepair: [DrcSector.Shelter],
    TIA: [DrcSector.VA],
    VET: [DrcSector.Livelihoods],
    WGSS: [DrcSector.GBV], //	# of women and girls who received recreational and livelihood skills including vocational education sessions in women and girls safe spaces
    //	# of operational women and girls\' safe spaces
    // CapacityBuilding: DrcSector.GBV,	//	# of GBV service providers trained on GBV prevention and response that meet GBViE minimum standards
  } as const

  private static readonly autoValidatedActivity = new Set([
    DrcProgram.NFI,
    DrcProgram.HygieneKit,
    DrcProgram.ESK,
    DrcProgram.InfantWinterClothing,
  ])
  static readonly isAutoValidatedActivity = (_: DrcProgram) => DrcSectorHelper.autoValidatedActivity.has(_)

  static readonly findFirstByProgram = (p: DrcProgram): DrcSector => {
    // @ts-ignore
    return DrcSectorHelper.byProgram[p][0]
  }
}

export type DrcOfficeShort =
  | 'CEJ'
  | 'DNK'
  | 'HRK'
  | 'KYV'
  | 'LWO'
  | 'NLV'
  | 'UMY'
  // legacy offices:
  | 'Chernivtsi'
  | 'Ichna'
  | 'Ivankiv'
  | 'Kherson'
  | 'Poltava'
  | 'Sloviansk'
  | 'Zaporizhzhya'

export const drcOfficeShort: Record<DrcOffice, DrcOfficeShort> = {
  [DrcOffice.Chernihiv]: 'CEJ',
  [DrcOffice.Chernivtsi]: 'Chernivtsi',
  [DrcOffice.Dnipro]: 'DNK',
  [DrcOffice.Ichna]: 'Ichna',
  [DrcOffice.Ivankiv]: 'Ivankiv',
  [DrcOffice.Kharkiv]: 'HRK',
  [DrcOffice.Kherson]: 'Kherson',
  [DrcOffice.Kyiv]: 'KYV',
  [DrcOffice.Lviv]: 'LWO',
  [DrcOffice.Mykolaiv]: 'NLV',
  [DrcOffice.Poltava]: 'Poltava',
  [DrcOffice.Sloviansk]: 'Sloviansk',
  [DrcOffice.Sumy]: 'UMY',
  [DrcOffice.Zaporizhzhya]: 'Zaporizhzhya',
}

export enum DrcDonor {
  AugustinusFonden = 'AugustinusFonden',
  BHA = 'BHA',
  DANI = 'DANI',
  DMFA = 'DMFA',
  DUT = 'DUT',
  ECHO = 'ECHO',
  EUIC = 'EUIC',
  FCDO = 'FCDO',
  FINM = 'FINM',
  FREM = 'FREM',
  GFFO = 'GFFO',
  HoffmansAndHusmans = 'HoffmansAndHusmans',
  MOFA = 'MOFA',
  NovoNordisk = 'NovoNordisk',
  OKF = 'OKF',
  PFRU = 'PFRU',
  PMKA = 'PMKA',
  PMRA = 'PMRA',
  PSPU = 'PSPU',
  PoolFunds = 'PoolFunds',
  SDC = 'SDC',
  SDCS = 'SDCS',
  SIDA = 'SIDA',
  UHF = 'UHF',
  UNHC = 'UNHC',
  // extra options out of sorted list:
  Other = 'Other',
  None = 'None',
}

export const drcDonorTranlate: Record<DrcDonor, string> = {
  AugustinusFonden: 'Augustinus Fonden',
  BHA: 'BHA',
  DANI: 'Danida',
  DMFA: 'DMFA',
  DUT: 'DUT',
  ECHO: 'ECHO',
  EUIC: 'EUIC',
  FCDO: 'FCDO',
  FINM: 'FINM',
  FREM: 'FREM',
  GFFO: 'GFFO',
  HoffmansAndHusmans: 'Hoffmans & Husmans',
  MOFA: 'MOFA',
  NovoNordisk: 'Novo Nordisk',
  OKF: 'OKF',
  PFRU: 'PFRU',
  PMKA: 'PMKA',
  PMRA: 'PMRA',
  PSPU: 'PSPU',
  PoolFunds: 'Pooled Funds',
  SDC: 'SDC',
  SDCS: 'SDCS',
  SIDA: 'SIDA',
  UHF: 'UHF',
  UNHC: 'UNHC',
  // extra options out of sorted list:
  Other: 'Other',
  None: 'None',
}

export enum DrcProject {
  'SIDA 518-570A' = 'SIDA 518-570A',
  'UKR-000xxx DANIDA' = 'UKR-000xxx DANIDA',
  // sorted part starts here:
  'UKR-000226 SDC' = 'UKR-000226 SDC',
  'UKR-000230 PM WRA' = 'UKR-000230 PM WRA',
  'UKR-000231 PM WKA' = 'UKR-000231 PM WKA',
  'UKR-000247 FCDO' = 'UKR-000247 FCDO',
  'UKR-000249 Finnish MFA' = 'UKR-000249 Finnish MFA',
  'UKR-000255 EU IcSP' = 'UKR-000255 EU IcSP',
  'UKR-000267 DANIDA' = 'UKR-000267 DANIDA',
  'UKR-000269 ECHO1' = 'UKR-000269 ECHO1',
  'UKR-000270 Pooled Funds Old (MPCA)' = 'UKR-000270 Pooled Funds Old (MPCA)',
  'UKR-000270 Pooled Funds' = 'UKR-000270 Pooled Funds',
  'UKR-000274 Novo-Nordilsk' = 'UKR-000274 Novo-Nordilsk',
  'UKR-000276 UHF3' = 'UKR-000276 UHF3',
  'UKR-000284 BHA' = 'UKR-000284 BHA',
  'UKR-000285 FCDO' = 'UKR-000285 FCDO',
  'UKR-000286 DMFA' = 'UKR-000286 DMFA',
  'UKR-000290 SDC Shelter' = 'UKR-000290 SDC Shelter',
  'UKR-000291_292 UNHCR' = 'UKR-000291_292 UNHCR',
  'UKR-000293 French MFA' = 'UKR-000293 French MFA',
  'UKR-000294 Dutch I' = 'UKR-000294 Dutch I',
  'UKR-000298 Novo-Nordisk' = 'UKR-000298 Novo-Nordisk',
  'UKR-000301 DANISH MoFA' = 'UKR-000301 DANISH MoFA',
  'UKR-000304 PSPU' = 'UKR-000304 PSPU',
  'UKR-000306 Dutch II' = 'UKR-000306 Dutch II',
  'UKR-000308 UNHCR' = 'UKR-000308 UNHCR',
  'UKR-000309 OKF' = 'UKR-000309 OKF',
  'UKR-000314 UHF4' = 'UKR-000314 UHF4',
  'UKR-000316 UHF5' = 'UKR-000316 UHF5',
  'UKR-000322 ECHO2' = 'UKR-000322 ECHO2',
  'UKR-000323 PFRU' = 'UKR-000323 PFRU',
  'UKR-000329 SIDA H2R' = 'UKR-000329 SIDA H2R',
  'UKR-000330 SDC2' = 'UKR-000330 SDC2',
  'UKR-000331 GFFO' = 'UKR-000331 GFFO',
  'UKR-000336 UHF6' = 'UKR-000336 UHF6',
  'UKR-000340 Augustinus Fonden' = 'UKR-000340 Augustinus Fonden',
  'UKR-000341 Hoffmans & Husmans' = 'UKR-000341 Hoffmans & Husmans',
  'UKR-000342 Pooled Funds' = 'UKR-000342 Pooled Funds',
  'UKR-000345 BHA2' = 'UKR-000345 BHA2',
  'UKR-000347 DANIDA' = 'UKR-000347 DANIDA',
  'UKR-000348 BHA3' = 'UKR-000348 BHA3',
  'UKR-000350 SIDA' = 'UKR-000350 SIDA',
  'UKR-000352 UHF7' = 'UKR-000352 UHF7',
  'UKR-000355 DMFA Mykolaiv' = 'UKR-000355 Danish MFA',
  'UKR-000355 Danish MFA' = 'UKR-000355 Danish MFA',
  'UKR-000360 Novo-Nordisk' = 'UKR-000360 Novo-Nordisk',
  'UKR-000363 UHF VIII' = 'UKR-000363 UHF8',
  'UKR-000363 UHF8' = 'UKR-000363 UHF8',
  'UKR-000370 SIDA' = 'UKR-000370 SIDA',
  // @deprecated wrong code 371, it should be 372
  'UKR-000371 ECHO3' = 'UKR-000371 ECHO3',
  'UKR-000372 ECHO3' = 'UKR-000372 ECHO3',
  'UKR-000373 Novo-Nordilsk' = 'UKR-000373 Novo-Nordilsk',
  'UKR-000378 Danish MFA' = 'UKR-000378 Danish MFA',
  'UKR-000380 DANIDA' = 'UKR-000380 DANIDA',
  'UKR-000385 Pooled Funds' = 'UKR-000385 Pooled Funds',
  'UKR-000386 Pooled Funds' = 'UKR-000386 Pooled Funds',
  'UKR-000388 BHA' = 'UKR-000388 BHA',
  'UKR-000390 UHF9' = 'UKR-000390 UHF9',
  'UKR-000396 Danish MFA' = 'UKR-000396 Danish MFA',
  'UKR-000397 GFFO' = 'UKR-000397 GFFO',
  'UKR-000398 SDC' = 'UKR-000398 SDC',
  'UKR-000399 SDC' = 'UKR-000399 SDC',
  'UKR-000399 SDC3' = 'UKR-000399 SDC3',
  'UKR-000418 SIDA' = 'UKR-000418 SIDA',
  'UKR-000423 ECHO' = 'UKR-000423 ECHO4',
  'UKR-000423 ECHO4' = 'UKR-000423 ECHO4',
  'UKR-000424 Dutch MFA' = 'UKR-000424 Dutch MFA',
  'UKR-000426 SDC' = 'UKR-000426 SDC',
  // extra options out of sorted list:
  'Other' = 'Other',
  'None' = 'None',
}

export const allProjects = Obj.values(DrcProject)

export class DrcProjectHelper {
  static readonly list = Obj.keys(DrcProject)

  static readonly donorByProject: Record<DrcProject, DrcDonor> = {
    'SIDA 518-570A': DrcDonor.SIDA,
    'UKR-000xxx DANIDA': DrcDonor.DANI,
    // sorted list starts here:
    'UKR-000226 SDC': DrcDonor.SDC,
    'UKR-000230 PM WRA': DrcDonor.PMRA,
    'UKR-000231 PM WKA': DrcDonor.PMKA,
    'UKR-000247 FCDO': DrcDonor.FCDO,
    'UKR-000249 Finnish MFA': DrcDonor.FINM,
    'UKR-000255 EU IcSP': DrcDonor.EUIC,
    'UKR-000267 DANIDA': DrcDonor.DANI,
    'UKR-000269 ECHO1': DrcDonor.ECHO,
    'UKR-000270 Pooled Funds Old (MPCA)': DrcDonor.PoolFunds,
    'UKR-000270 Pooled Funds': DrcDonor.PoolFunds,
    'UKR-000274 Novo-Nordilsk': DrcDonor.NovoNordisk,
    'UKR-000276 UHF3': DrcDonor.UHF,
    'UKR-000284 BHA': DrcDonor.BHA,
    'UKR-000285 FCDO': DrcDonor.FCDO,
    'UKR-000286 DMFA': DrcDonor.DMFA,
    'UKR-000290 SDC Shelter': DrcDonor.SDCS,
    'UKR-000291_292 UNHCR': DrcDonor.UNHC,
    'UKR-000293 French MFA': DrcDonor.FREM,
    'UKR-000294 Dutch I': DrcDonor.DUT,
    'UKR-000298 Novo-Nordisk': DrcDonor.NovoNordisk,
    'UKR-000301 DANISH MoFA': DrcDonor.MOFA,
    'UKR-000304 PSPU': DrcDonor.PSPU,
    'UKR-000306 Dutch II': DrcDonor.DUT,
    'UKR-000308 UNHCR': DrcDonor.UNHC,
    'UKR-000309 OKF': DrcDonor.OKF,
    'UKR-000314 UHF4': DrcDonor.UHF,
    'UKR-000316 UHF5': DrcDonor.UHF,
    'UKR-000322 ECHO2': DrcDonor.ECHO,
    'UKR-000323 PFRU': DrcDonor.PFRU,
    'UKR-000329 SIDA H2R': DrcDonor.SIDA,
    'UKR-000330 SDC2': DrcDonor.SDC,
    'UKR-000331 GFFO': DrcDonor.GFFO,
    'UKR-000336 UHF6': DrcDonor.UHF,
    'UKR-000340 Augustinus Fonden': DrcDonor.AugustinusFonden,
    'UKR-000341 Hoffmans & Husmans': DrcDonor.HoffmansAndHusmans,
    'UKR-000342 Pooled Funds': DrcDonor.PoolFunds,
    'UKR-000345 BHA2': DrcDonor.BHA,
    'UKR-000347 DANIDA': DrcDonor.DANI,
    'UKR-000348 BHA3': DrcDonor.BHA,
    'UKR-000350 SIDA': DrcDonor.SIDA,
    'UKR-000352 UHF7': DrcDonor.UHF,
    'UKR-000355 Danish MFA': DrcDonor.DMFA,
    'UKR-000360 Novo-Nordisk': DrcDonor.NovoNordisk,
    'UKR-000363 UHF8': DrcDonor.UHF,
    'UKR-000370 SIDA': DrcDonor.SIDA,
    'UKR-000371 ECHO3': DrcDonor.ECHO,
    'UKR-000372 ECHO3': DrcDonor.ECHO,
    'UKR-000373 Novo-Nordilsk': DrcDonor.NovoNordisk,
    'UKR-000378 Danish MFA': DrcDonor.DMFA,
    'UKR-000380 DANIDA': DrcDonor.DANI,
    'UKR-000385 Pooled Funds': DrcDonor.PoolFunds,
    'UKR-000386 Pooled Funds': DrcDonor.PoolFunds,
    'UKR-000388 BHA': DrcDonor.BHA,
    'UKR-000390 UHF9': DrcDonor.UHF,
    'UKR-000396 Danish MFA': DrcDonor.DMFA,
    'UKR-000397 GFFO': DrcDonor.GFFO,
    'UKR-000398 SDC': DrcDonor.SDC,
    'UKR-000399 SDC': DrcDonor.SDC,
    'UKR-000399 SDC3': DrcDonor.SDC,
    'UKR-000418 SIDA': DrcDonor.SIDA,
    'UKR-000423 ECHO4': DrcDonor.ECHO,
    'UKR-000424 Dutch MFA': DrcDonor.DUT,
    'UKR-000426 SDC': DrcDonor.SDC,
    // extra options out of sorted list:
    Other: DrcDonor.Other,
    None: DrcDonor.None,
  }

  static readonly projectByDonor: Record<DrcDonor, DrcProject[]> = seq(
    Obj.entries(DrcProjectHelper.donorByProject),
  ).groupByAndApply(
    (_) => _[1],
    (_) => _.map((_) => _[0]),
  )

  static readonly extractCode = (str?: string): string | undefined => {
    if (!str) return undefined

    let match = str.match(/UKR.?(000\d\d\d)/i)
    if (match) return match[1]

    match = str.match(/(\d{3,})/)
    if (match) return `000${match[1]}`

    return undefined
  }

  static readonly searchCode = (value?: string): string | undefined => {
    if (value) return value.match(/(000)?(\d\d\d)/)?.[2]
  }

  static readonly search = (str?: string): DrcProject | undefined => {
    return DrcProjectHelper.searchByCode(DrcProjectHelper.extractCode(str))
  }

  static readonly searchByCode = (code?: string): DrcProject | undefined => {
    if (code) return Obj.values(DrcProject).find((_) => _.includes(code))
  }

  static readonly budgetByProject: Partial<Record<DrcProject, number>> = {
    [DrcProject['UKR-000269 ECHO1']]: 3000000,
    [DrcProject['UKR-000284 BHA']]: 57000000,
    [DrcProject['UKR-000322 ECHO2']]: 10243523, //.13, // 9423057.51 EURO from PIP
    [DrcProject['UKR-000345 BHA2']]: 10080572.0,
  }
}

export type DrcJob = string
