import {KoboAnswer} from '@/core/sdk/server/kobo/Kobo'
import {ActiviftyInfoRecords} from '@/core/sdk/server/activity-info/ActiviftyInfoType'

export interface AiBundle<TActivity = any, TAnswer extends Record<string, any> = any> {
  data: KoboAnswer<TAnswer>[],
  activity: TActivity,
  requestBody: ActiviftyInfoRecords,
}