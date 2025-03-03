export interface ActivityInfoRecords {
  changes: ActivityInfoRecord[]
}

export interface ActivityInfoRecord {
  formId: string
  recordId: string
  parentRecordId: string | null
  fields: any
}
