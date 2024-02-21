export interface ActiviftyInfoRecords {
  changes: ActiviftyInfoRecord[]
}

export interface ActiviftyInfoRecord {
  formId: string
  recordId: string
  parentRecordId: string | null
  fields: any
}