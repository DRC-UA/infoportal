export enum EcrecCashRegistrationPaymentStatus {
  Paid = 'Paid'
}

export enum EcrecCashRegistrationProgram {
  CashforAnimalFeed = 'CashforAnimalFeed',
  CashforAnimalShelter = 'CashforAnimalShelter',
}

export interface EcrecCashRegistrationTags {
  status?: EcrecCashRegistrationPaymentStatus
  program?: EcrecCashRegistrationProgram
  paidUah?: number
}