import {HdpSdk} from '../../feature/connector/hdp/HdpSdk'
import {NextFunction, Request, Response} from 'express'

export class ControllerHdp {

  readonly fetchRiskEducation = async (req: Request, res: Response, next: NextFunction) => {
    const data = await HdpSdk.fetchAiRiskEducation()
    res.send(data)
  }
}