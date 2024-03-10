import {Bn_Re, DrcDonor, DrcOffice, DrcProject, KoboFormName, KoboTagStatus, OblastISO, OblastName, Person} from '@infoportal-common'
import {KoboAnswerId, KoboAttachment, KoboBaseTags} from '@/core/sdk/server/kobo/Kobo'
import {WfpDeduplication} from '@/core/sdk/server/wfpDeduplication/WfpDeduplication'
import {DeepPartial, Enum} from '@alexandreannic/ts-utils'

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

  static readonly budgets: DeepPartial<Record<DrcProject, Record<DrcOffice, number>>> = {
    [DrcProject['UKR-000345 BHA2']]: {
      [DrcOffice.Kharkiv]: 15390000,
      [DrcOffice.Dnipro]: 15390000,
      [DrcOffice.Mykolaiv]: 15390000,
    },
    [DrcProject['UKR-000270 Pooled Funds']]: {
      [DrcOffice.Kharkiv]: 15431220,
      [DrcOffice.Dnipro]: 10909080,
      [DrcOffice.Chernihiv]: 12021300,
      [DrcOffice.Lviv]: 845820,
    },
    [DrcProject['UKR-000270 Pooled Funds Old (MPCA)']]: {
      [DrcOffice.Kharkiv]: 4500000,
      [DrcOffice.Dnipro]: 1260000,
      [DrcOffice.Chernihiv]: 1260000,
      [DrcOffice.Lviv]: 777000,
    },
    [DrcProject['UKR-000340 Augustinus Fonden']]: {
      [DrcOffice.Dnipro]: 3388421,
    },
    [DrcProject['UKR-000341 Hoffmans & Husmans']]: {
      [DrcOffice.Kharkiv]: 3388421,
    },
    [DrcProject['UKR-000342 Pooled Funds']]: {
      [DrcOffice.Dnipro]: 3727267,
      [DrcOffice.Kharkiv]: 3727267,
      [DrcOffice.Lviv]: 3717747,
      [DrcOffice.Mykolaiv]: 3717747,
    },
    [DrcProject['UKR-000306 Dutch II']]: {
      [DrcOffice.Chernihiv]: 7322400,
      [DrcOffice.Dnipro]: 7322400,
      [DrcOffice.Kharkiv]: 7322400,
    },
    [DrcProject['UKR-000330 SDC2']]: {
      [DrcOffice.Sumy]: 21600000,
      [DrcOffice.Dnipro]: 29808000,
      [DrcOffice.Kharkiv]: 29808000,
    },
    [DrcProject['UKR-000347 DANIDA']]: {
      [DrcOffice.Sumy]: 3240000,
      [DrcOffice.Dnipro]: 6480000,
      [DrcOffice.Kharkiv]: 6480000,
    },
    [DrcProject['UKR-000309 OKF']]: {
      [DrcOffice.Lviv]: 17881148,
    },
    [DrcProject['UKR-000298 Novo-Nordisk']]: {
      [DrcOffice.Mykolaiv]: 28231000,
    },
  }

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