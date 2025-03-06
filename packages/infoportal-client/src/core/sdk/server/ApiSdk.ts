import {ApiClient, RequestOption} from './ApiClient'
import {NfiMPcaSdk} from './nfi/NfiMPcaSdk'
import {ActivityInfoSdk} from './activity-info/ActiviftyInfoSdk'
import {KoboApiSdk} from './kobo/KoboApiSdk'
import {Method} from 'axios'
import {SessionSdk} from '@/core/sdk/server/session/SessionSdk'
import {KoboAnswerSdk} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {KoboServerSdk} from '@/core/sdk/server/kobo/KoboServerSdk'
import {KoboFormSdk} from '@/core/sdk/server/kobo/KoboFormSdk'
import {WfpDeduplicationSdk} from '@/core/sdk/server/wfpDeduplication/WfpDeduplicationSdk'
import {AccessSdk} from '@/core/sdk/server/access/AccessSdk'
import {UserSdk} from '@/core/sdk/server/user/UserSdk'
import {ProxySdk} from '@/core/sdk/server/proxy/ProxySdk'
import {MpcaSdk} from '@/core/sdk/server/mpca/MpcaSdk'
import {GroupSdk} from '@/core/sdk/server/group/GroupSdk'
import {MealVerificationClient} from '@/core/sdk/server/mealVerification/MealVerificationClient'
import {KoboMetaSdk} from '@/core/sdk/server/kobo-meta/KoboMetaSdk'
import {JsonStoreSdk} from '@/core/sdk/server/jsonStore/JsonStoreSdk'
import {HdpSdk} from '@/core/sdk/server/hdp/HdpSdk'
import {KoboTypedAnswerSdk} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {KoboAnswerHistorySdk} from '@/core/sdk/server/kobo/answerHistory/KoboAnswerHistorySdk'
import {CacheSdk} from '@/core/sdk/server/cache/CacheSdk'
import {DatabaseViewSdk} from '@/core/sdk/server/databaseView/DatabaseViewSdk'
import {ImportFromXlsDataSdk} from '@/core/sdk/server/importXls/ImportFromXlsSdk'

export class ApiSdk {
  constructor(private client: ApiClient) {
    this.session = new SessionSdk(client)
    this.nfi = new NfiMPcaSdk(client)
    this.koboMeta = new KoboMetaSdk(client)
    this.kobo = {
      answerHistory: new KoboAnswerHistorySdk(this.client),
      typedAnswers: new KoboTypedAnswerSdk(this.client),
      answer: new KoboAnswerSdk(this.client),
      server: new KoboServerSdk(this.client),
      form: new KoboFormSdk(this.client),
    }
    this.koboApi = new KoboApiSdk(client)
    this.mealVerification = new MealVerificationClient(client)
    this.activityInfo = new ActivityInfoSdk(client)
    this.mpca = new MpcaSdk(client)
    this.wfpDeduplication = new WfpDeduplicationSdk(client)
    this.user = new UserSdk(client)
    this.access = new AccessSdk(this.client, this.user)
    this.group = new GroupSdk(client)
    this.databaseView = new DatabaseViewSdk(client)
    this.proxy = new ProxySdk(client)
    this.jsonStore = new JsonStoreSdk(client)
    this.hdp = new HdpSdk(client)
    this.cache = new CacheSdk(client)
    this.importData = new ImportFromXlsDataSdk(client)
  }

  readonly proxyRequest = <T = any>(method: Method, url: string, options?: RequestOption) => {
    return this.client.post<T>(`/proxy-request`, {
      responseType: 'blob',
      body: {
        method,
        url,
        body: options?.body,
        headers: options?.headers,
        mapData: (_: any) => _,
      },
    })
  }
  readonly session: SessionSdk
  readonly nfi: NfiMPcaSdk
  readonly koboMeta: KoboMetaSdk
  readonly kobo: {
    answerHistory: KoboAnswerHistorySdk
    typedAnswers: KoboTypedAnswerSdk
    answer: KoboAnswerSdk
    server: KoboServerSdk
    form: KoboFormSdk
  }
  readonly koboApi: KoboApiSdk
  readonly mealVerification: MealVerificationClient
  readonly activityInfo: ActivityInfoSdk
  readonly mpca: MpcaSdk
  readonly wfpDeduplication: WfpDeduplicationSdk
  readonly user: UserSdk
  readonly access: AccessSdk
  readonly group: GroupSdk
  readonly databaseView: DatabaseViewSdk
  readonly proxy: ProxySdk
  readonly jsonStore: JsonStoreSdk
  readonly hdp: HdpSdk
  readonly cache: CacheSdk
  readonly importData: ImportFromXlsDataSdk
}
