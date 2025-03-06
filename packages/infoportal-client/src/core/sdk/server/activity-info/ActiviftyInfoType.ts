export interface ActivityInfoRequest {
  changes: ActivityInfoRecord[]
}

export interface ActivityInfoRecord {
  formId: string
  recordId: string
  parentRecordId: string | null
  fields: any
}
