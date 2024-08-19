import {DrcOffice, KoboId} from 'infoportal-common'
import {FeatureAccess} from '@prisma/client'

export enum AppFeatureId {
  mpca = 'mpca',
  wfp_deduplication = 'wfp_deduplication',
  kobo_database = 'kobo_database',
  cfm = 'cfm',
  shelter = 'shelter',
  activity_info = 'activity_info',
  dashboard = 'dashboard',
}

interface AccessWfpDeduplication {
  office: DrcOffice
}

export interface WfpDeduplicationAccessParams {
  filters?: {office: string[]}
}

export interface KoboDatabaseAccessParams {
  koboFormId: KoboId,
  filters?: Record<string, string[]>
}


export interface KoboDatabaseFeatureParams {
  koboFormId: KoboId,
  filters?: Record<string, string[]>
}

export class KoboDatabaseFeatureParams {
  static readonly create = (_: KoboDatabaseFeatureParams): any => _
}

export interface Access<T = any> extends Omit<FeatureAccess, 'params'> {
  params: T | null
}