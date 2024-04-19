import {Bn_Re, DrcDonor, DrcOffice, DrcProject, KoboFormName, KoboTagStatus, OblastISO, OblastName, Person} from '@infoportal-common'
import {KoboAnswerId, KoboAttachment, KoboBaseTags} from '@/core/sdk/server/kobo/Kobo'
import {WfpDeduplication} from '@/core/sdk/server/wfpDeduplication/WfpDeduplication'
import {Enum} from '@alexandreannic/ts-utils'

export interface MpcaTypeTag extends KoboBaseTags, KoboTagStatus {
  projects?: DrcProject[]
}

const buildEnumFromObject = <T extends KoboFormName>(t: T[]): { [K in T]: K } => {
  return t.reduce((acc, curr) => ({...acc, [curr]: curr}), {} as any)
}

export const mpcaRowSources = buildEnumFromObject([
  'bn_rapidResponse',
  'shelter_cashForRepair',
  'shelter_cashForRepair',
  'bn_re',
  'bn_1_mpcaNfi',
  'bn_0_mpcaReg',
  'bn_0_mpcaRegESign',
  'bn_0_mpcaRegNoSig',
  'bn_0_mpcaRegNewShort',
])

export type MpcaRowSource = keyof typeof mpcaRowSources
//
// export enum MpcaRowSource {
//   RapidResponseMechansim = 'RapidResponseMechansim',
//   CashForRent = 'CashForRent',
//   CashForRepairRegistration = 'CashForRepairRegistration',
//   BasicNeedRegistration = 'BasicNeedRegistration',
//   OldBNRE = 'OldBNRE',
// }

export enum MpcaProgram {
  CashForFuel = 'CashForFuel',
  CashForUtilities = 'CashForUtilities',
  CashForRent = 'CashForRent',
  CashForEducation = 'CashForEducation',
  MPCA = 'MPCA',
}

export interface MpcaEntity {
  id: KoboAnswerId
  source: MpcaRowSource
  enumerator?: string
  oblast?: OblastName
  office?: DrcOffice
  oblastIso?: OblastISO
  raion?: string
  hromada?: string
  date: Date
  prog?: MpcaProgram[]
  donor?: DrcDonor
  finalDonor?: DrcDonor
  project?: DrcProject
  finalProject?: DrcProject
  amountUahSupposed?: number
  amountUahDedup?: number
  amountUahFinal?: number
  amountUahCommitted?: number
  benefStatus?: Bn_Re.T['ben_det_res_stat']
  lastName?: string
  firstName?: string
  patronyme?: string
  hhSize?: number
  passportSerie?: string
  passportNum?: string
  taxId?: string
  taxIdFileName?: string
  taxIdFileURL?: KoboAttachment
  idFileName?: string
  idFileURL?: KoboAttachment
  phone?: string
  deduplication?: WfpDeduplication
  persons?: Person.Person[]
  tags?: MpcaTypeTag
  // girls?: number
  // boys?: number
  // men?: number
  // women?: number
  // elderlyMen?: number
  // elderlyWomen?: number
}

export class MpcaHelper {

  static readonly budgets = [
    {project: 'UKR-000345 BHA2', office: 'Kharkiv', budget: 15390000},
    {project: 'UKR-000345 BHA2', office: 'Dnipro', budget: 15390000},
    {project: 'UKR-000345 BHA2', office: 'Mykolaiv', budget: 15390000},
    {project: 'UKR-000270 Pooled Funds', office: 'Kharkiv', budget: 15431220},
    {project: 'UKR-000270 Pooled Funds', office: 'Dnipro', budget: 10909080},
    {project: 'UKR-000270 Pooled Funds', office: 'Chernihiv', budget: 12021300},
    {project: 'UKR-000270 Pooled Funds', office: 'Lviv', budget: 845820},
    {project: 'UKR-000270 Pooled Funds Old (MPCA)', office: 'Kharkiv', budget: 4500000},
    {project: 'UKR-000270 Pooled Funds Old (MPCA)', office: 'Dnipro', budget: 1260000},
    {project: 'UKR-000270 Pooled Funds Old (MPCA)', office: 'Chernihiv', budget: 1260000},
    {project: 'UKR-000270 Pooled Funds Old (MPCA)', office: 'Lviv', budget: 777000},
    {project: 'UKR-000340 Augustinus Fonden', office: 'Dnipro', budget: 3388421},
    {project: 'UKR-000341 Hoffmans & Husmans', office: 'Kharkiv', budget: 3388421},
    {project: 'UKR-000342 Pooled Funds', office: 'Dnipro', budget: 3727267},
    {project: 'UKR-000342 Pooled Funds', office: 'Kharkiv', budget: 3727267},
    {project: 'UKR-000342 Pooled Funds', office: 'Lviv', budget: 3717747},
    {project: 'UKR-000342 Pooled Funds', office: 'Mykolaiv', budget: 3717747},
    {project: 'UKR-000306 Dutch II', office: 'Chernihiv', budget: 7322400},
    {project: 'UKR-000306 Dutch II', office: 'Dnipro', budget: 7322400},
    {project: 'UKR-000306 Dutch II', office: 'Kharkiv', budget: 7322400},
    {project: 'UKR-000330 SDC2', office: 'Sumy', budget: 21600000},
    {project: 'UKR-000330 SDC2', office: 'Dnipro', budget: 29808000},
    {project: 'UKR-000330 SDC2', office: 'Kharkiv', budget: 29808000},
    {project: 'UKR-000347 DANIDA', office: 'Sumy', budget: 3240000},
    {project: 'UKR-000347 DANIDA', office: 'Dnipro', budget: 6480000},
    {project: 'UKR-000347 DANIDA', office: 'Kharkiv', budget: 6480000},
    {project: 'UKR-000309 OKF', office: 'Lviv', budget: 17881148},
    {project: 'UKR-000298 Novo-Nordisk', office: 'Mykolaiv', budget: 28231000},
  ]

  static readonly projects = Enum.keys({// [DrcProject['Novo-Nordisk (UKR-000274)']]: true,
    [DrcProject['UKR-000322 ECHO2']]: true,
    [DrcProject['UKR-000340 Augustinus Fonden']]: true,
    [DrcProject['UKR-000284 BHA']]: true,
    [DrcProject['UKR-000347 DANIDA']]: true,
    [DrcProject['UKR-000341 Hoffmans & Husmans']]: true,
    [DrcProject['UKR-000298 Novo-Nordisk']]: true,
    [DrcProject['UKR-000309 OKF']]: true,
    [DrcProject['UKR-000270 Pooled Funds']]: true,
    [DrcProject['UKR-000342 Pooled Funds']]: true,
    [DrcProject['UKR-000306 Dutch II']]: true,
    [DrcProject['UKR-000330 SDC2']]: true,
  })

  static readonly map = (_: MpcaEntity): MpcaEntity => {
    _.date = new Date(_.date)
    if (_.tags?.lastStatusUpdate) _.tags.lastStatusUpdate = new Date(_.tags.lastStatusUpdate)
    return _
  }
}