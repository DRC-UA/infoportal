import type {Request, Response} from 'express'

import {HdpSdk} from '../../core/externalSdk/hdp/HdpSdk.js'

export class ControllerHdp {
  readonly fetchRiskEducation = async (_req: Request, res: Response) => {
    const data = await HdpSdk.fetchAiRiskEducation().then((_) => _.recordset)
    res.send(data)
  }
}
