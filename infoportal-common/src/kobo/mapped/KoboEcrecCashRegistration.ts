import {Ecrec_cashRegistration} from '../generated/Ecrec_cashRegistration'
import {CashStatus, KoboAnswer, KoboBaseTags, KoboGeneralMapping} from './Common'

export namespace KoboEcrec_cashRegistration {

  export enum Program {
    CashforAnimalFeed = 'CashforAnimalFeed',
    CashforAnimalShelter = 'CashforAnimalShelter',
  }

  export interface Tags extends KoboBaseTags {
    status?: CashStatus
    paidUah?: number
    program?: Program
  }

  export type T = KoboAnswer<Ecrec_cashRegistration.T, Tags> & {
    custom: KoboGeneralMapping.IndividualBreakdown
  }
}
