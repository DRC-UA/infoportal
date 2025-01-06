import {NextFunction, Request, Response} from 'express'
import {ProxyService} from '../../feature/proxy/ProxyService'
import {PrismaClient} from '@prisma/client'

export class ControllerProxy {
  constructor(
    private prisma: PrismaClient,
    private service = new ProxyService(prisma),
  ) {}

  readonly create = async (req: Request, res: Response, next: NextFunction) => {
    const body = await ProxyService.schema.create.validate(req.body)
    const data = await this.service.create(body)
    res.send(data)
  }

  readonly update = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = await ProxyService.schema.id.validate(req.params)
    const body = await ProxyService.schema.update.validate(req.body)
    const data = await this.service.update(id, body)
    res.send(data)
  }

  readonly delete = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = await ProxyService.schema.id.validate(req.params)
    await this.service.delete(id)
    res.send()
  }

  readonly search = async (req: Request, res: Response, next: NextFunction) => {
    const data = await this.service.search()
    res.send(data)
  }
}
