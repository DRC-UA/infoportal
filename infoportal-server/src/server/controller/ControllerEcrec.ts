import {Controller} from './Controller'
import {NextFunction, Request, Response} from 'express'
import {EcrecSdk} from '../../feature/connector/ecrec/EcrecSdk'

export class ControllerEcrec extends Controller {

  constructor(
    private sdk: EcrecSdk
  ) {
    super({errorKey: 'ecrec'})
  }

  readonly index = async (req: Request, res: Response, next: NextFunction) => {
    res.send({})
  }
}
