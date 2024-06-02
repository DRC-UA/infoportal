import {NextFunction, Request, Response} from 'express'
import * as yup from 'yup'
import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from '../../../feature/kobo/KoboSdkGenerator'
import {KoboApiService} from '../../../feature/kobo/KoboApiService'
import {KoboSyncServer} from '../../../feature/kobo/KoboSyncServer'
import {KoboAnswerUtils} from '@infoportal-common'

const apiAnswersFiltersValidation = yup.object({
  start: yup.date(),
  end: yup.date(),
})

export class ControllerKoboApi {

  constructor(
    private pgClient: PrismaClient,
    private apiService = new KoboApiService(pgClient),
    private syncService = new KoboSyncServer(pgClient),
    private koboSdkGenerator = new KoboSdkGenerator(pgClient),
  ) {

  }

  private readonly extractParams = async (req: Request) => {
    const schema = yup.object({
      id: yup.string().required(),
      formId: yup.string().required(),
    })
    return await schema.validate(req.params)
  }

  readonly getForms = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = await yup.object({
      id: yup.string().required(),
    }).validate(req.params)
    const sdk = await this.koboSdkGenerator.get(id)
    const forms = await sdk.v2.getForms()
    res.send(forms)
  }

  readonly answersWebHook = async (req: Request, res: Response, next: NextFunction) => {
    const answer = KoboAnswerUtils.mapAnswer(req.body)
    const formId = req.body._xform_id_string
    await this.syncService.handleWebhook({formId, answer})
    res.send({})
  }

  readonly synchronizeAllAnswersFromKoboServer = async (req: Request, res: Response, next: NextFunction) => {
    await this.syncService.syncAllApiAnswersToDb(req.session.user?.email)
    res.send()
  }

  readonly synchronizeAnswersFromKoboServer = async (req: Request, res: Response, next: NextFunction) => {
    const {id, formId} = await this.extractParams(req)
    await this.syncService.syncApiForm({serverId: id, formId, updatedBy: req.session.user?.email})
    res.send()
  }

  readonly getAnswers = async (req: Request, res: Response, next: NextFunction) => {
    const {id, formId} = await this.extractParams(req)
    const filters = await apiAnswersFiltersValidation.validate(req.query)
    const answers = await this.apiService.fetchAnswers(id, formId, filters)
    // .then(res => ({
    // ...res,
    // data: res.data.map(answers => KoboAnswerUtils.removeGroup(answers))
    // }))
    res.send(answers)
  }

  readonly edit = async (req: Request, res: Response, next: NextFunction) => {
    const {id, formId} = await this.extractParams(req)
    const answerId = await yup.string().required().validate(req.params.answerId)
    const sdk = await this.koboSdkGenerator.get(id)
    const link = await sdk.v2.edit(formId, answerId)
    // TODO Find a way to authenticate
    // res.header('Authorization', v2.makeAuthorizationHeader(appConf.kobo.token))
    // res.cookie('kobonaut__eu_kobotoolbox_org', '')
    res.redirect(link.url)
  }

  readonly getSchema = async (req: Request, res: Response, next: NextFunction) => {
    const {id, formId} = await this.extractParams(req)
    const sdk = await this.koboSdkGenerator.get(id)
    const form = await sdk.v2.getForm(formId)
    res.send(form)
  }

  readonly getAttachementsWithoutAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = await yup.object({id: yup.string().required()}).validate(req.params)
      const {path, fileName} = await yup.object({
        path: yup.string().required(),
        fileName: yup.string().optional(),
      }).validate(req.query)
      const sdk = await this.koboSdkGenerator.get(id)
      const img = await sdk.v2.getAttachement(path)
      if (!fileName) {
        res.set('Content-Type', 'image/jpeg')
        res.set('Content-Length', img.length)
      } else {
        res.set(`Content-Disposition`, `inline; filename="${fileName}"`)
      }
      res.send(img)
    } catch (e) {
      res.send(undefined)
      // next(e)
    }
  }
}
