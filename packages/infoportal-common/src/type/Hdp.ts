import type {IResult} from 'mssql'

import type {OblastName, OblastISO} from '../location'

import type {Person} from './Person'
import type {DrcDonor, DrcOfficeShort, DrcSector, DrcProgram, DrcOffice, DrcProject} from './Drc'

type RiskEducationActivity = 'Direct session' | 'Event' | 'Rapid session'

type RiskEducationSubactivity =
  | 'CBO/NGO'
  | 'Community'
  | 'Door To Door'
  | 'EECP'
  | 'Education institution'
  | 'Organization'
  | 'School'
  | 'Summer Camp'
  | 'Shelter'
type SessionMode = 'Offline' | 'Online'

interface RiskEducationDirectSession {
  id_re_direct_session_main: number
  session_id: string
  reported_by: string
  submitted_by: string | null
  session_date: string
  session_time: string
  submitted_date: string | null
  project_id: string
  donor_name: DrcDonor
  office_name_short: DrcOfficeShort
  contact_person: string | null
  contact_position: string | null
  contact_phone: string | null
  contact_email: string | null
  activity_re: RiskEducationActivity
  mode_online_offline: SessionMode
  type_session: RiskEducationSubactivity
  address: string | null
  location_name: string | null
  latitude_session: number | null
  longitude_session: number | null
  gps_session: string | null
  note: string | null
  id_re_direct_session_admin_beneficiaries: number
  _id_re_direct_session_main: number
  admin1_name_en: OblastName
  admin1_main_code: OblastISO
  admin2_name_en: string
  admin2_main_code: string
  admin3_name_en: string
  admin3_main_code: string
  admin4_name_en: string
  admin4_main_code: string
  admin4_code: string
  admin4_name_code: string
  latitude_admin4: number | null
  longitude_admin4: number | null
  gps_admin4: string | null
  isou_id: number | null
  short_facility_title_ua: string | null
  idp: number | null
  females_adults_disabilities: number | null
  males_adults_disabilities: number | null
  females_children_disabilities: number | null
  males_children_disabilities: number | null
  beneficiaries_disabilities: number | null
  females_6_11: number | null
  males_6_11: number | null
  females_12_17: number | null
  males_12_17: number | null
  females_18_59: number | null
  males_18_59: number | null
  females_60: number | null
  males_60: number | null
  total_group_1: number | null
  females_0_4: number | null
  males_0_4: number | null
  females_5_17: number | null
  males_5_17: number | null
  females_18_49: number | null
  males_18_49: number | null
  females_50: number | null
  males_50: number | null
  total_group_2: number | null
  females_6_11_general: number | null
  males_6_11_general: number | null
  females_12_17_general: number | null
  males_12_17_general: number | null
  females_18_59_general: number | null
  males_18_59_general: number | null
  females_60_general: number | null
  males_60_general: number | null
  grand_total: number | null
}

interface HdpDashboardAdapted {
  id: string
  date: Date
  oblast: OblastName
  raion?: string
  hromada?: string
  settlement?: string
  firstName?: string
  lastName?: string
  patronymicName?: string
  phone?: string
  displacement?: Person.DisplacementStatus
  sector: DrcSector
  activity?: DrcProgram
  office?: DrcOffice
  project: DrcProject[]
  donor: DrcDonor[]

  persons?: Person.Details[]
  personsCount?: number

  lastStatusUpdate?: Date

  taxId?: string
  taxIdFileName?: string
  taxIdFileId?: number
  idFileName?: string
  idFileId?: number
  passportNum?: string
}

type RiskEducationDirectSessionResponseData = IResult<RiskEducationDirectSession>

export type {
  HdpDashboardAdapted,
  RiskEducationDirectSessionResponseData,
  RiskEducationDirectSession,
  RiskEducationActivity,
}
