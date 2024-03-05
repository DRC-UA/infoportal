import {DisplacementStatus, DrcDonor, DrcOffice, DrcProject, Oblast, Person, PersonDetails, Protection_pss} from '@infoportal-common'
import {KoboAnswerMetaData} from '@/core/sdk/server/kobo/Kobo'

export type ProtectionKoboForm =
  'protection_gbv' |
  'protection_pss' |
  'protection_hhs3' |
  // 'protection_hhs2_1' |
  'protection_groupSession'

// export type ProtectionKoboForm = ArrayValues<typeof ProtectionDataHelper.koboForms>

export type ProtectionActivityFlat  = Omit<ProtectionActivity, 'persons'> & PersonDetails

export interface ProtectionActivity extends KoboAnswerMetaData {
  date: Date
  office?: DrcOffice
  oblast: Oblast
  raion?: string
  hromada?: string
  project?: DrcProject[]
  donor?: DrcDonor[]
  persons?: PersonDetails[]
  hhDisplacementStatus?: DisplacementStatus
  koboForm: ProtectionKoboForm
  // koboForm: Extract<KoboFormName,
  //   'protection_gbv' |
  //   'protection_pss' |
  //   'protection_hhs2_1' |
  //   'protection_groupSession'
  // >
}