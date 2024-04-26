import {ApiClient} from '../ApiClient'
import {KoboId, UUID} from '@infoportal-common'
import {MpcaPayment, MpcaPaymentUpdate} from './MpcaPayment'

export class MpcaPaymentSdk {
  constructor(private client: ApiClient) {
  }

  readonly create = (answersIds: KoboId[]) => {
    return this.client.put<Record<keyof MpcaPayment, any>>(`/mpca-payment`, {body: {answersIds}}).then(MpcaPayment.mapEntity)
  }

  readonly update = (id: UUID, update: MpcaPaymentUpdate) => {
    return this.client.post<Record<keyof MpcaPayment, any>>(`/mpca-payment/${id}`, {body: update}).then(MpcaPayment.mapEntity)
  }

  readonly getAll = () => {
    return this.client.get<Record<keyof MpcaPayment, any>[]>(`/mpca-payment`).then(_ => _.map(MpcaPayment.mapEntity))
  }

  readonly get = (id: UUID) => {
    return this.client.get<Record<keyof MpcaPayment, any>>(`/mpca-payment/${id}`).then(MpcaPayment.mapEntity)
  }
}
