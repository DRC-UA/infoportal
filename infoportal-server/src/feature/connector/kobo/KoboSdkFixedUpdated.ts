import {ApiClient} from '../../../core/client/ApiClient'
import {appConf} from '../../../core/conf/AppConf'
import {KoboAnswerId, KoboId} from '@infoportal-common'
import {chunkify} from '../../../helper/Utils'

export type KoboUpdateDataParams<TData extends any = any> = {
  formId: KoboId,
  submissionIds: KoboAnswerId[],
  data: TData
}

export class KoboSdkFixedUpdated {

  constructor(
    private api: ApiClient,
    private conf = appConf
  ) {
  }

  private queues: Map<KoboId, KoboUpdateDataParams[]> = new Map()
  private locks: Map<KoboId, Promise<void>> = new Map()

  async enqueue(params: KoboUpdateDataParams): Promise<void> {
    if (!this.queues.has(params.formId)) {
      this.queues.set(params.formId, [])
    }
    this.queues.get(params.formId)!.push(params)
    await this.processQueue(params.formId)
  }

  private async processQueue(formId: KoboId): Promise<void> {
    if (this.locks.get(formId)) {
      return this.locks.get(formId)
    }
    const processing = (async () => {
      while (this.queues.get(formId)!.length > 0) {
        const params = this.queues.get(formId)!.shift()!
        try {
          await chunkify({
            data: params.submissionIds,
            size: 20,
            fn: ids => this.apiCall({...params, submissionIds: ids}),
          })
        } catch (e) {
          this.locks.delete(formId)
        }
      }
    })()
    this.locks.set(formId, processing)
    await processing
    this.locks.delete(formId)
  }

  private readonly apiCall = ({formId, data, submissionIds}: KoboUpdateDataParams) => {
    return this.api.patch(`/v2/assets/${formId}/data/bulk/`, {
      body: {
        payload: {
          submission_ids: submissionIds,
          data,
        }
      }
    })
  }
}