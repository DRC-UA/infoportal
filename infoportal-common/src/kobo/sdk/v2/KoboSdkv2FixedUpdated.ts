import {ApiClient} from '../../../api-client/ApiClient'
import {KoboAnswerId, KoboId} from '../../mapper'
import {ApiKoboUpdate} from './type/KoboUpdate'
import {chunkify, KoboIndex} from '../../..'
import {Logger} from '../../../types'
import {AxiosError} from 'axios'

export type KoboUpdateDataParamsData = Record<string, string | string[] | number | null | undefined>
export type KoboUpdateDataParams<TData extends KoboUpdateDataParamsData = any> = {
  formId: KoboId,
  submissionIds: KoboAnswerId[],
  data: TData
}

export class KoboSdkv2FixedUpdated {

  static readonly BATCH_SIZE = 20
  static readonly CONCURRENCY = 15

  constructor(
    private api: ApiClient,
    private log: Logger
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
            concurrency: KoboSdkv2FixedUpdated.CONCURRENCY,
            size: KoboSdkv2FixedUpdated.BATCH_SIZE,
            data: params.submissionIds,
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

  private readonly apiCall = (params: KoboUpdateDataParams): Promise<ApiKoboUpdate> => {
    const message = (status: 'Failed' | 'Success', e?: AxiosError) => {
      const name = KoboIndex.searchById(params.formId)?.name ?? params.formId
      const ids = `[${params.submissionIds[0]}, +${params.submissionIds.length - 1}]`
      return `${KoboIndex} to update ${name} ${ids} ${JSON.stringify(params.data)}.` + (e ? ` ERR ${e.status}` : '')
    }
    const {formId, data, submissionIds} = params
    return this.api.patch<ApiKoboUpdate>(`/v2/assets/${formId}/data/bulk/`, {
      body: {
        payload: {
          submission_ids: submissionIds,
          data,
        }
      }
    }).then(_ => {
      this.log.info(message('Success'))
      return _
    }).catch((e: AxiosError) => {
      this.log.error(message('Failed', e))
      throw e
    })
  }
}
