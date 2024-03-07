import {CashStatus} from '@infoportal-common'

export enum EcrecCashRegistrationProgram {
  CashforAnimalFeed = 'CashforAnimalFeed',
  CashforAnimalShelter = 'CashforAnimalShelter',
}

export interface EcrecCashRegistrationTags {
  status?: CashStatus
  program?: EcrecCashRegistrationProgram
  paidUah?: number
}