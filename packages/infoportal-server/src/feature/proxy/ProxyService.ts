import {PrismaClient} from '@prisma/client'
import {yup} from '../../helper/Utils'
import {InferType} from 'yup'
import {UUID} from 'infoportal-common'

export class ProxyService {
  constructor(private prisma: PrismaClient) {}

  static readonly schema = {
    create: yup
      .object({
        name: yup.string().required(),
        slug: yup.string().required(),
        url: yup.string().required(),
        expireAt: yup.date().optional(),
        createdBy: yup.string().optional(),
      })
      .required(),
    update: yup.object({
      name: yup.string().optional(),
      slug: yup.string().optional(),
      url: yup.string().optional(),
      expireAt: yup.date().optional(),
      disabled: yup.boolean().optional(),
    }),
    id: yup.object({
      id: yup.string().required(),
    }),
  }

  readonly create = (body: InferType<typeof ProxyService.schema.create>) => {
    return this.prisma.proxy.create({data: body})
  }

  readonly update = (id: UUID, body: InferType<typeof ProxyService.schema.update>) => {
    return this.prisma.proxy.update({where: {id}, data: body})
  }

  readonly delete = (id: UUID) => {
    return this.prisma.proxy.delete({where: {id}})
  }

  readonly search = () => {
    return this.prisma.proxy.findMany()
  }
}
