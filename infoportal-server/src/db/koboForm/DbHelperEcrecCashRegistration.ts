import {KoboTagStatus} from '@infoportal-common'

export enum EcrecCashRegistrationProgram {
  CashforAnimalFeed = 'CashforAnimalFeed',
  CashforAnimalShelter = 'CashforAnimalShelter',
}

export interface EcrecCashRegistrationTags extends KoboTagStatus {
  program?: EcrecCashRegistrationProgram
  paidUah?: number
}