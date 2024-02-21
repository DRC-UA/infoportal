import {DrcOffice} from '@infoportal-common'
import {Utils} from '@/utils/utils'

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

export class WfpDeduplication {
  static readonly map = (_: Record<keyof WfpDeduplication, any> & {beneficiary?: {taxId?: string}}): WfpDeduplication => {
    _.fileName = _.fileName?.replace('.gpg', '')
    _.createdAt = new Date(_.createdAt)
    _.validFrom = new Date(_.validFrom)
    _.expiry = new Date(_.expiry)
    _.existingStart = _.existingStart ? new Date(_.existingStart) : undefined
    _.existingEnd = _.existingEnd ? new Date(_.existingEnd) : undefined
    _.taxId = _.beneficiary?.taxId
    _.suggestion = getDrcSuggestion(_)
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

const unAgencies = [
  'FAO',
  'IOM',
  'UNHCR',
  'UNICEF',
  'WFP',
]

export const getDrcSuggestion = (_: WfpDeduplication): DrcSupportSuggestion => {
  if (!_.existingOrga || !_.existingStart || !_.existingEnd) return DrcSupportSuggestion.ThreeMonthsNoDuplication
  if (_.existingOrga === 'DRC') return DrcSupportSuggestion.NoAssistanceDrcDuplication
  if (_.status === WfpDeduplicationStatus.Error) return DrcSupportSuggestion.DeduplicationFailed
  if (_.createdAt.getTime() < new Date(2023, 8, 13).getTime() && unAgencies.includes(_.existingOrga)) return DrcSupportSuggestion.ThreeMonthsUnAgency
  if (_.status === WfpDeduplicationStatus.Deduplicated) return DrcSupportSuggestion.NoAssistanceFullDuplication
  const overlap = Utils.getOverlapMonths(_.validFrom, _.expiry, _.existingStart, _.existingEnd)
  if (overlap === 3)
    return DrcSupportSuggestion.NoAssistanceExactSameTimeframe
  if (overlap === 2)
    return DrcSupportSuggestion.OneMonth
  if (overlap === 1)
    return DrcSupportSuggestion.TwoMonths
  return 'WARNING' as any
  // throw new Error(`Unhandled case for ${JSON.stringify(_)}`)
}