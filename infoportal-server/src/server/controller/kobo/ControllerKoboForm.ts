import {NextFunction, Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
import {KoboFormService} from '../../../feature/kobo/KoboFormService'
import * as yup from 'yup'

export class ControllerKoboForm {

  constructor(
    private pgClient: PrismaClient,
    private service = new KoboFormService(pgClient)
  ) {
  }

  readonly create = async (req: Request, res: Response, next: NextFunction) => {
    const body = await yup.object({
      name: yup.string().required(),
      serverId: yup.string().required(),
      uid: yup.string().required(),
    }).validate(req.body)
    const {uid, ...payload} = body
    const data = await this.service.create({...payload, id: uid, uploadedBy: req.session.user?.email!})
    res.send(data)
  }

  readonly getAll = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.service.getAll()
    res.send(data)
  }

  readonly get = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = await yup.object({
      id: yup.string().required(),
    }).validate(req.params)
    const data = await this.service.get(id)
    res.send(data)
  }
}
