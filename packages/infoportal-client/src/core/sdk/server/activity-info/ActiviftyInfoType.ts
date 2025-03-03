// @deprecated
// TODO DELETE
export interface ActiviftyInfoRecords {
  changes: ActivityInfoRecord[]
}

export interface ActivityInfoRecord {
  formId: string
  recordId: string
  parentRecordId: string | null
  fields: any
}
