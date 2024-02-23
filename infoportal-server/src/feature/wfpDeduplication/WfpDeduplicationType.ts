import {DrcOffice} from '@infoportal-common'
import {getOverlapMonths} from '../../helper/Utils'

export enum WfpDeduplicationStatus {
  Deduplicated = 'Deduplicated',
  PartiallyDeduplicated = 'PartiallyDeduplicated',
  NotDeduplicated = 'NotDeduplicated',
  Error = 'Error',
}

export interface WfpDeduplication {
  id: string
  amount: number
  fileName?: string
  office?: DrcOffice
  wfpId: number
  createdAt: Date
  validFrom: Date
  expiry: Date
  beneficiaryId: string
  taxId?: string
  message?: string
  status: WfpDeduplicationStatus
  existingOrga?: string
  existingStart?: Date
  existingEnd?: Date
  existingAmount?: number
  suggestion: DrcSupportSuggestion
}

export class WfpDeduplicationHelper {

  static readonly map = (_: any): WfpDeduplication => {
    _.suggestion = getDrcSuggestion(_)
    _.taxId = _.beneficiary.taxId
    return _
  }
}

export enum DrcSupportSuggestion {
  ThreeMonthsUnAgency = 'ThreeMonthsUnAgency',
  ThreeMonthsNoDuplication = 'ThreeMonthsNoDuplication',
  TwoMonths = 'TwoMonths',
  OneMonth = 'OneMonth',
  NoAssistanceFullDuplication = 'NoAssistanceFullDuplication',
  NoAssistanceExactSameTimeframe = 'NoAssistanceExactSameTimeframe',
  NoAssistanceDrcDuplication = 'NoAssistanceDrcDuplication',
  DeduplicationFailed = 'DeduplicationFailed',
  ManualCheck = 'ManualCheck',
}

const unAgencies = ['FAO', 'IOM', 'UNHCR', 'UNICEF', 'WFP']

export const getDrcSuggestion = (_: WfpDeduplication): DrcSupportSuggestion => {
  if (!_.existingOrga || !_.existingStart || !_.existingEnd) return DrcSupportSuggestion.ThreeMonthsNoDuplication
  if (_.existingOrga === 'DRC') return DrcSupportSuggestion.NoAssistanceDrcDuplication
  if (_.status === WfpDeduplicationStatus.Error) return DrcSupportSuggestion.DeduplicationFailed
  if (_.createdAt.getTime() < new Date(2023, 8, 13).getTime() && unAgencies.includes(_.existingOrga)) return DrcSupportSuggestion.ThreeMonthsUnAgency
  if (_.status === WfpDeduplicationStatus.Deduplicated) return DrcSupportSuggestion.NoAssistanceFullDuplication
  const overlap = getOverlapMonths(_.validFrom, _.expiry, _.existingStart, _.existingEnd)
  if (overlap === 3)
    return DrcSupportSuggestion.NoAssistanceExactSameTimeframe
  if (overlap === 2)
    return DrcSupportSuggestion.OneMonth
  if (overlap === 1)
    return DrcSupportSuggestion.TwoMonths
  return 'WARNING' as any
  // throw new Error(`Unhandled case for ${JSON.stringify(_)}`)
}