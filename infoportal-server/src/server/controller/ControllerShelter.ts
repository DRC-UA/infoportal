import {PrismaClient} from '@prisma/client'
import {NextFunction, Request, Response} from 'express'
import * as yup from 'yup'
import {ShelterCachedDb} from '../../feature/shelter/db/ShelterCachedDb'
import {ShelterDbService} from '../../feature/shelter/db/ShelterDbService'

export class ControllerShelter {

  constructor(
    private prisma: PrismaClient,
    private cache: ShelterCachedDb = ShelterCachedDb.constructSingleton(prisma),
    private service: ShelterDbService = new ShelterDbService(prisma),
  ) {
  }

  readonly refresh = async (req: Request, res: Response, next: NextFunction) => {
    await this.service.refreshForms()
    await this.cache.refresh()
    res.send()
  }

  readonly search = async (req: Request, res: Response, next: NextFunction) => {
    const body = await yup.object({
      // filters: yup.object({
      start: yup.date(),
      end: yup.date(),
      // })
    }).validate(req.body)
    const data = await this.cache.search(body)
    res.send(data)
  }
}