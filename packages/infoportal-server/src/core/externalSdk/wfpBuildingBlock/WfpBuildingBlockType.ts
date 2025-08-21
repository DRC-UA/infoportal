import {WfpCategory} from 'infoportal-common'

export interface WfpFilters {
  limit?: number
  offset?: number
}

export interface WfpPaginate<T> {
  items: T[]
  paging: {
    offset: number
    limit: number
    total: number
    totalAtLeast: number
  }
}

export interface AssistanceProvided {
  amount: string
  beneficiaryId: string
  createdAt: Date
  expiry: Date
  id: number
  validFrom: Date
  category: WfpCategory
}

export class AssistanceProvided {
  static readonly map = ({
    createdAt,
    expiry,
    validFrom,
    ...rest
  }: Record<keyof AssistanceProvided, any>): AssistanceProvided => {
    return {
      ...rest,
      createdAt: new Date(createdAt),
      expiry: new Date(expiry),
      validFrom: new Date(validFrom),
    }
  }
}

export interface AssistancePrevented {
  amount: string
  beneficiaryId: string
  createdAt: Date
  currency: 'UAH'
  expiry: Date
  id: number
  // "Partially deduplicated - Already assisted by CARITAS from 20221201 to 20221231 for UAH  8,880.00  for CASH-MPA"
  message: string
  validFrom: Date
  category: WfpCategory
}

export class AssistancePrevented {
  static readonly filterRemoved = (input: WfpPaginate<any>): WfpPaginate<any> => {
    return {
      ...input,
      items: input.items.filter((_) => _.removedByAsyncTaskId === null),
    }
  }

  static readonly map = (_: Record<keyof AssistancePrevented, any>): AssistancePrevented => {
    return {
      ..._,
      createdAt: new Date(_.createdAt),
      expiry: new Date(_.expiry),
      validFrom: new Date(_.validFrom),
    }
  }
}

export interface WfpImport {
  authorizedAt: Date
  createdAt: Date
  parkedAt: Date
  startedAt: Date
  finishedAt: Date
  fileName: string
  type: 'beneficiary-import-requests'
  additionalInfo: {
    failsCount: number
    lastBatchIndex: number
    lastBatchResult?: any
    numberOfBatches: number
    rowCount: number
    rowSum: number
    successCount: number
    warningsCount: number
  }
}

export class WfpImportHelper {
  static readonly map = ({
    createdAt,
    parkedAt,
    startedAt,
    finishedAt,
    ...rest
  }: Record<keyof WfpImport, any>): WfpImport => {
    return {
      ...rest,
      createdAt: new Date(createdAt),
      parkedAt: new Date(parkedAt),
      startedAt: new Date(startedAt),
      finishedAt: new Date(finishedAt),
    }
  }
}
