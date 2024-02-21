import {NextFunction, Request, Response} from 'express'
import * as y from 'yup'
import {MpcaPaymentService} from '../../feature/mpca/mpcaPayment/MpcaPaymentService'

export class ControllerMpcaPayment {

  constructor(
    private service: MpcaPaymentService
  ) {

  }

  readonly create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = y.object({
        answersIds: y.array().of(y.string().required()).required()
      })
      const body = await schema.validate(req.body)
      const tool = this.service.create(body.answersIds)
      res.send(tool)
    } catch (e) {
      next(e)
    }
  }

  readonly update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = await y.object({
        id: y.string().required()
      }).validate(req.params)
      const body = await y.object({
        name: y.string().optional(),
        budgetLineMPCA: y.string().optional(),
        budgetLineCFR: y.string().optional(),
        budgetLineStartUp: y.string().optional(),
        headOfOperation: y.string().optional(),
        cashAndVoucherAssistanceAssistant: y.string().optional(),
        financeAndAdministrationOfficer: y.string().optional(),
        city: y.string().optional(),
      }).validate(req.body)
      const tool = this.service.update(id, body)
      res.send(tool)
    } catch (e) {
      next(e)
    }
  }

  readonly get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params
      const data = await this.service.getById(id)
      res.send(data)
    } catch (e) {
      next(e)
    }
  }

  readonly getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.service.getAll()
      res.send(data)
    } catch (e) {
      next(e)
    }
  }

}