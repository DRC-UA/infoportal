import type {Request, Response, NextFunction} from 'express'

import {HdpSdk} from '../../core/externalSdk/hdp/HdpSdk.js'

export class ControllerHdp {
  #hdp: HdpSdk

  constructor() {
    this.#hdp = new HdpSdk()
  }

  readonly fetchAiRiskEducation = async (_req: Request, res: Response) => {
    const data = await this.#hdp.fetchAiRiskEducation().then((_) => _.recordset)
    res.send(data)
  }

  readonly fetchRiskEducation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.#hdp.fetchRiskEducation(req.query.filters as any).then((_) => _.recordset)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
