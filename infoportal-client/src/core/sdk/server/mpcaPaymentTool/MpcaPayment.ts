import {KoboAnswerId} from '@infoportal-common'

export interface MpcaPayment {
  id: string
  name?: string
  index: number
  budgetLineMPCA?: string
  budgetLineCFR?: string
  budgetLineStartUp?: string
  headOfOperation?: string
  cashAndVoucherAssistanceAssistant?: string
  financeAndAdministrationOfficer?: string
  city?: string
  createdAt: Date
  updatedAt: Date
  answers: KoboAnswerId[]
}

export interface MpcaPaymentUpdate {
  name?: string
  budgetLineMPCA?: string
  budgetLineCFR?: string
  budgetLineStartUp?: string
  headOfOperation?: string
  cashAndVoucherAssistanceAssistant?: string
  financeAndAdministrationOfficer?: string
  city?: string
}

export class MpcaPayment {
  static readonly mapEntity = (_: Record<keyof MpcaPayment, any>): MpcaPayment => {
    return {
      ..._,
      createdAt: new Date(_.createdAt),
      updatedAt: new Date(_.updatedAt),
    }
  }
}