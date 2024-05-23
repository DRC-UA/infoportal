import {NextFunction, Request, Response} from 'express'
import * as yup from 'yup'
import {ObjectSchema} from 'yup'
import {PrismaClient} from '@prisma/client'
import {KoboService} from '../../../feature/kobo/KoboService'
import {Period} from '@infoportal-common'
import {KoboId} from '../../../feature/connector/kobo/KoboClient/type/KoboAnswer'
import {validateApiPaginate} from '../../../core/Type'

export interface KoboAnswersFilters extends Partial<Period> {
  ids?: KoboId[]
  filterBy?: {
    column: string
    value: (string | null | undefined)[]
    type?: 'array'
  }[]
}

const answersFiltersValidation: ObjectSchema<KoboAnswersFilters> = yup.object({
  start: yup.date().optional(),
  end: yup.date().optional(),
  ids: yup.array().of(yup.string().required()).optional(),
  filterBy: yup.array(yup.object({
    column: yup.string().required(),
    value: yup.array().of(yup.string().nullable().optional()).required(),
    type: yup.mixed<'array'>().oneOf(['array']).optional(),
  }))
})

export class ControllerKoboAnswer {

  constructor(
    private pgClient: PrismaClient,
    private service = new KoboService(pgClient)
  ) {
  }

  readonly updateAnswers = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.session.user?.email ?? 'unknown'
    const params = await yup.object({
      formId: yup.string().required(),
    }).validate(req.params)
    const body = await yup.object({
      answerIds: yup.array().of(yup.string().required()).required(),
      question: yup.string().required(),
      answer: yup.mixed<any>(),
    }).validate(req.body)
    const data = await this.service.updateAnswers({...params, ...body, authorEmail: email})
    res.send(data)
  }

  readonly updateTag = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.session.user?.email ?? 'unknown'
    const params = await yup.object({
      formId: yup.string().required(),
    }).validate(req.params)
    const body = await yup.object({
      answerIds: yup.array().of(yup.string().required()).required(),
      tags: yup.mixed().required(),
    }).validate(req.body)

    const data = await this.service.updateTags({...params, ...body, authorEmail: email})
    res.send()
  }

  /** TODO need to handle public access */
  readonly search = async (req: Request, res: Response, next: NextFunction) => {
    const {formId} = req.params
    const filters = await answersFiltersValidation.validate(req.body)
    const paginate = await validateApiPaginate.validate(req.body)
    const answers = await this.service.searchAnswers({formId, filters, paginate})
    res.send(answers)
  }

  readonly searchByUserAccess = async (req: Request, res: Response, next: NextFunction) => {
    const {formId} = req.params
    const user = req.session.user
    const filters = await answersFiltersValidation.validate(req.body)
    const paginate = await validateApiPaginate.validate(req.body)
    const answers = await this.service.searchAnswersByUsersAccess({formId, filters, paginate, user})
    res.send(answers)
  }
}
