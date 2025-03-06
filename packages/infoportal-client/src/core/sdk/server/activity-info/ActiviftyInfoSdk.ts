import {ApiClient} from '../ApiClient'
import {ActivityInfoRecord, ActivityInfoRequest} from '@/core/sdk/server/activity-info/ActiviftyInfoType'

export class ActivityInfoSdk {
  constructor(private client: ApiClient) {}

  static readonly makeRecordId = ({prefix, periodStr, index}: {prefix: string; periodStr: string; index: number}) => {
    return prefix + periodStr.replaceAll('-', '') + ('' + index).padStart(3, '0')
  }

  static readonly wrapRequest = (changes: ActivityInfoRecord[]): ActivityInfoRequest => {
    return {changes}
  }

  readonly submitActivity = (body: ActivityInfoRequest[]) => {
    return this.client.post(`/activity-info/activity`, {body})
  }
}
