import {PrismaClient} from '@prisma/client'
import {yup} from '../../helper/Utils'
import {InferType} from 'yup'
import {UUID} from '@infoportal-common'
import {format} from 'date-fns'
import {AppFeatureId} from '../access/AccessType'

export type GroupCreateParams = InferType<typeof GroupService.createSchema>
export type GroupUpdateParams = InferType<typeof GroupService.updateSchema>

export class GroupService {

  constructor(private prisma: PrismaClient) {
  }

  static readonly createSchema = yup.object({
    name: yup.string().optional(),
    desc: yup.string().optional(),
  })

  static readonly updateSchema = yup.object({
    name: yup.string().required()
  })

  readonly create = (body: GroupCreateParams) => {
    return this.prisma.group.create({
      data: {
        name: body.name ?? `New group ${format(new Date(), 'yyyy-MM-dd')}`,
        desc: body.desc,
      },
    })
  }

  readonly update = (id: UUID, body: GroupUpdateParams) => {
    return this.prisma.group.update({
      where: {
        id,
      },
      data: body,
    })
  }

  readonly remove = (id: UUID) => {
    return this.prisma.group.delete({
      where: {
        id
      },
    })
  }

  readonly getByFeature = (featureId: AppFeatureId) => {
    return this.prisma.group.findMany({
      select: {
        accesses: true,
      },
      where: {
        accesses: {
          some: {featureId}
        }
      }
    })
  }

  readonly search = ({featureId}: {featureId?: UUID}) => {
    return this.prisma.group.findMany({
      include: {
        items: true
      },
      where: {
        accesses: {
          every: {featureId}
        }
      },
      orderBy: {createdAt: 'desc'}
    })
  }
}