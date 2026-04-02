import type {Request, Response} from 'express'
import {yup} from 'src/helper/Utils.js'

import {EsriService} from '../../feature/esri/EsriService.js'

export class ControllerEsri {
  #service: EsriService

  constructor() {
    this.#service = new EsriService()
  }

  readonly listfeatureLayers = async (_request: Request, response: Response) => {
    const data = await this.#service.listSurveyFeatureLayers()
    response.send(data)
  }

  readonly getFeatureLayer = async (request: Request, response: Response) => {
    const {url} = await yup
      .object({
        url: yup.string().required(),
      })
      .validate(request.body)
    const data = await this.#service.getFeatureLayer({url})
    response.send(data)
  }
}
