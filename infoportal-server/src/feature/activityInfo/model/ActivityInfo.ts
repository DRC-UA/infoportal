export interface Form {
  resources: {
    id: AIID
    parentId: AIID
    label: string
    type: 'FORM',
    visibility: 'PRIVATE'
  }[]
}

export type AIID = string

export type FormDescs = Record<AIID, FormDesc>

export type FormDesc = {
  id: AIID
  permissions: {
    viewFilter?: string,
  },
  schema: {
    elements: {
      id: AIID
      code: string,
      label: string
      description: string
      relevanceCondition: string,
      validationCondition: string,
      required: boolean,
      type: 'subform' | 'reference' | 'enumerated' | 'calculated' | 'quantity' | 'FREE_TEXT' | 'month' | string,
      typeParameters: {
        formId?: AIID,
        cardinality?: 'single'
        range?: [{formId: AIID}]
        values?: {id: string, label: string}[]
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

const dbId = 'cbi4e3dlbs86afe2'
export const activityInfoForms = {
  generalProtectionRmm: 'czd5jf7lqf2zv4r4r',
  mineAction: 'cmnzatklqv1q3s243u',
  snfi: 'c95ky7klr95z6ia3v',
  wash: 'cz86p3tlqc7h66y2',
  mpca: 'c9vv9j8lqm633lj1tm',
  gbv: 'c6mrp6dlqv1q7q243w',
  // mineAction: 'cmnzatklqv1q3s243u',

  // snfiRmm: 'ckrgu2uldtxbgbg1h',
  // generalProtectionRmm: 'cas3n26ldsu5aea5',
  // activities_and_people: 'cy3vehlldsu5aeb6',
  // washAPM2: 'cg7insdlee1c3h0s',
  // washRmm: 'crvtph7lg6d5dhq2',
  // mpcaRmm: 'cxeirf9ldwx90rs6',
}
