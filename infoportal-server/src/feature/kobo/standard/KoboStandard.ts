import {DrcDonor, DrcOffice, DrcProject, OblastName, Person} from '@infoportal-common'

export type KoboStandard = {
  date: Date
  oblast: OblastName
  raion?: string
  hromada?: string
  settlement?: string
  taxId?: string
  firstName?: string
  lastName?: string
  patronymicName?: string
  phone?: string
  disStatus?: KoboStandardDisStatus
  activity?: string
  office: DrcOffice
  project?: DrcProject
  donor?: DrcDonor
  individuals?: KoboStandardIndividual[]
}

export enum KoboStandardDisStatus {
  IDP = 'IDP',
  LongTermResident = 'LongTermResident',
  Returnee = 'Returnee',
  Refugee = 'Refugee'
}

export type KoboStandardIndividual = {
  gender?: Person.Gender
  age?: number
  disability?: string
}