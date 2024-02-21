import {KoboForm, PrismaClient} from '@prisma/client'
import {KoboId} from '../connector/kobo/KoboClient/type/KoboAnswer'
import {UUID} from '@infoportal-common'

export interface KoboFormCreate {
  id: string
  name: string
  serverId: UUID
  uploadedBy: string
}

export class KoboFormService {

  constructor(
    private prisma: PrismaClient,
  ) {

  }

  readonly create = async (payload: KoboFormCreate) => {
    return this.prisma.koboForm.create({
      data: payload
    })
  }

  readonly get = async (id: KoboId): Promise<KoboForm | undefined> => {
    return await this.prisma.koboForm.findFirst({where: {id}}) ?? undefined
  }

  readonly getAll = async (): Promise<KoboForm[]> => {
    return this.prisma.koboForm.findMany({
      include: {
        server: true
      }
    })
  }
}
