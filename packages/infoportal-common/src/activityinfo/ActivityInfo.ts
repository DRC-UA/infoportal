export interface Form {
  resources: {
    id: AIID
    parentId: AIID
    label: string
    type: 'FORM'
    visibility: 'PRIVATE'
  }[]
}

export type AIID = string

export type FormDescs = Record<AIID, FormDesc>

export type FormDesc = {
  id: AIID
  permissions: {
    viewFilter?: string
  }
  schema: {
    elements: {
      id: AIID
      code: string
      label: string
      description: string
      relevanceCondition: string
      validationCondition: string
      required: boolean
      type: 'subform' | 'reference' | 'enumerated' | 'calculated' | 'quantity' | 'FREE_TEXT' | 'month' | string
      typeParameters: {
        formId?: AIID
        cardinality?: 'single'
        range?: [{formId: AIID}]
        values?: {id: string; label: string}[]
        // formula?: string
      }
    }[]
  }
}

export interface Database {
  databaseId: string
  label: string
  description: string
  ownerId: string
}
