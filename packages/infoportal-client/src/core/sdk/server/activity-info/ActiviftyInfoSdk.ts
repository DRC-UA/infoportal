import {ApiClient} from '../ApiClient'
import {ActiviftyInfoRecords} from '@/core/sdk/server/activity-info/ActiviftyInfoType'

interface ActivityInfoRequest {
  activityIdPrefix: string
  activity: Record<string, any>
  activityYYYYMM?: string
  activityIndex: number
  formId: string
  parentRecordId?: string
}

export class ActivityInfoSdk {
  constructor(private client: ApiClient) {}

  static readonly makeRecordId = ({prefix, periodStr, index}: {prefix: string; periodStr: string; index: number}) => {
    return prefix + periodStr.replaceAll('_', '') + ('' + index).padStart(3, '0')
  }

  static readonly makeRecordRequest = (params: ActivityInfoRequest): ActiviftyInfoRecords => {
    return {
      changes: [ActivityInfoSdk.makeRecordRequestContent(params)],
    }
  }

  static readonly makeRecordRequests = ({
    activityIdPrefix,
    activity,
    activityYYYYMM,
    activityIndex,
    formId,
    parentRecordId,
    subformId,
    subActivities,
  }: ActivityInfoRequest & {
    subformId?: string
    subActivities?: Record<string, any>[]
  }) => {
    activityYYYYMM = activityYYYYMM?.replace('-', '')
    const parentRequest = ActivityInfoSdk.makeRecordRequestContent({
      activityIdPrefix,
      activity,
      activityYYYYMM,
      activityIndex,
      formId,
      parentRecordId,
    })
    return {
      changes: [
        parentRequest,
        ...(subformId
          ? (subActivities?.map((_, i) =>
              ActivityInfoSdk.makeRecordRequestContent({
                activity: _,
                activityIndex: i,
                activityIdPrefix: parentRequest.recordId,
                formId: subformId,
                parentRecordId: parentRequest.recordId,
              }),
            ) ?? [])
          : []),
      ],
    }
  }

  private static readonly makeRecordRequestContent = ({
    activityIdPrefix,
    activity,
    activityIndex,
    activityYYYYMM = '',
    formId,
    parentRecordId,
  }: ActivityInfoRequest) => {
    return {
      formId: formId,
      recordId: activityIdPrefix + activityYYYYMM + ('' + activityIndex).padStart(3, '0'),
      parentRecordId: parentRecordId ?? null,
      fields: activity,
    }
  }

  readonly submitActivity = (body: ActiviftyInfoRecords[]) => {
    return this.client.post(`/activity-info/activity`, {body})
  }
}
