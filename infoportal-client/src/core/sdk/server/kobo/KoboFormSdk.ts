import {ApiClient} from '../ApiClient'
import {KoboForm, KoboFormHelper} from './Kobo'
import {DeploymentStatus, KoboId, UUID} from '@infoportal-common'

export interface KoboFormCreate {
  name: string
  serverId: UUID
  uid: KoboId
  deploymentStatus: DeploymentStatus
}

interface KoboParsedFormName {
  name: string
  program?: string
  donors?: string[]
}

export class KoboFormSdk {

  constructor(private client: ApiClient) {
  }

  /**@deprecated*/
  static readonly parseFormName = (name: string): KoboParsedFormName => {
    const match = name?.match(/^\[(.*?)]\s*(?:\{(.*?)})?\s*(.*)$/)
    if (match) {
      const [, sector, donors, formName] = match
      return {
        program: sector,
        name: formName,
        donors: donors?.split(','),
      }
    }
    return {
      name,
    }
  }

  readonly create = (body: KoboFormCreate): Promise<KoboForm> => {
    return this.client.put(`/kobo/form`, {body})
  }

  readonly get = (formId: string): Promise<KoboForm> => {
    return this.client.get(`/kobo/form/${formId}`).then(KoboFormHelper.map)
  }

  readonly getAll = (): Promise<KoboForm[]> => {
    return this.client.get(`/kobo/form`).then(_ => _.map(KoboFormHelper.map))
  }
}
