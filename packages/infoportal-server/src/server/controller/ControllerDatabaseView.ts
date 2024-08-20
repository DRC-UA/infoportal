import {DatabaseViewColVisibility, DatabaseViewVisibility, PrismaClient} from '@prisma/client'
import {yup} from '../../helper/Utils'
import {NextFunction, Request, Response} from 'express'

export class ControllerDatabaseView {

  static readonly schema = {
    update: yup.object({
      name: yup.string().required(),
      colName: yup.string().required(),
      width: yup.number().optional(),
      visibility: yup.mixed<DatabaseViewVisibility>().optional(),
    }),
    columnUpdate: yup.object({
      viewName: yup.string().required(),
      colName: yup.string().required(),
      width: yup.number().optional(),
      visibility: yup.mixed<DatabaseViewColVisibility>().optional(),
    })
  }

  constructor(private prisma: PrismaClient) {
  }

  readonly update = () => {

  }

  readonly columnUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const body = await ControllerDatabaseView.schema.columnUpdate.validate(req.body)
    const view = await this.prisma.databaseView.findFirst({where: {name: body.viewName}})
    if (!view) {
      // this.prisma.databaseView.
    }
  }
}