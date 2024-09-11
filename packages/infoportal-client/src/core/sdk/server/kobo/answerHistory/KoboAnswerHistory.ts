import {KoboId} from 'infoportal-common'

export interface KoboAnswerHistorySearch {
  formId: KoboId
}

export interface KoboAnswerHistory {
  id: string
  answerId: string
  by: string
  date: Date
  type: 'answer' | 'tag' | 'delete'
  property?: string
  oldValue?: any
  newValue?: any
}

export class KoboAnswerHistory {
  static readonly map = (_: any): KoboAnswerHistory => {
    _.date = new Date(_.date)
    return _
  }
}
