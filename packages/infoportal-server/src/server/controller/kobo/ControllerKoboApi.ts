import {NextFunction, Request, Response} from 'express'
import * as yup from 'yup'
import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from '../../../feature/kobo/KoboSdkGenerator'
import {KoboSyncServer} from '../../../feature/kobo/KoboSyncServer'
import {KoboAnswerUtils} from 'infoportal-common'
import axios, {AxiosError} from 'axios'
import {KoboService} from '../../../feature/kobo/KoboService'

export class ControllerKoboApi {

  constructor(
    private pgClient: PrismaClient,
    private koboService = new KoboService(pgClient),
    private syncService = new KoboSyncServer(pgClient),
    private koboSdkGenerator = KoboSdkGenerator.getSingleton(pgClient),
  ) {
  }

  private readonly extractParams = async (req: Request) => {
    const schema = yup.object({
      formId: yup.string().required(),
    })
    return await schema.validate(req.params)
  }

  readonly searchSchemas = async (req: Request, res: Response, next: NextFunction) => {
    const {serverId} = await yup.object({
      serverId: yup.string().required(),
    }).validate(req.body)
    const sdk = await this.koboSdkGenerator.getByServerId(serverId)
    const forms = await sdk.v2.getSchemas()
    res.send(forms)
  }

  readonly handleWebhookNewAnswers = async (req: Request, res: Response, next: NextFunction) => {
    const answer = KoboAnswerUtils.mapAnswer(req.body)
    const formId = req.body._xform_id_string
    await this.syncService.handleWebhookNewAnswers({formId, answer})
    res.send({})
  }

  readonly syncAnswersAll = async (req: Request, res: Response, next: NextFunction) => {
    await this.syncService.syncApiAnswersToDbAll(req.session.user?.email)
    res.send()
  }

  readonly syncAnswersByForm = async (req: Request, res: Response, next: NextFunction) => {
    const {formId} = await this.extractParams(req)
    await this.syncService.syncApiAnswersToDbByForm({formId, updatedBy: req.session.user?.email})
    res.send()
  }

  readonly edit = async (req: Request, res: Response, next: NextFunction) => {
    const {formId} = await this.extractParams(req)
    const answerId = await yup.string().required().validate(req.params.answerId)
    const sdk = await this.koboSdkGenerator.getByFormId(formId)
    const link = await sdk.v2.edit(formId, answerId)

    //   res.send(`
    //   <!DOCTYPE html>
    //   <html>
    //   <head>
    //     <title>Set Cookie and Redirect</title>
    //     <script>
    //       document.addEventListener("DOMContentLoaded", function() {
    //         document.cookie = "kobonaut__eu_kobotoolbox_org=9qjoc9o3ck2c8hkgldp4brz6iviqw8xt; domain=.kobotoolbox.org; path=/; SameSite=Lax; Secure"
    //         window.location.href = '${link.url}'
    //       })
    //     </script>
    //   </head>
    //   <body>
    //     <p>Setting cookie and redirecting...</p>
    //   </body>
    //   </html>
    // `);

    // // TODO Find a way to authenticate
    // // res.header('Authorization', v2.makeAuthorizationHeader(appConf.kobo.token))
    res.cookie('kobonaut__eu_kobotoolbox_org', '9qjoc9o3ck2c8hkgldp4brz6iviqw8xt', {
      domain: '.kobotoolbox.org',
      expires: new Date('2025-07-26T12:04:26.655Z'),
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    })
    res.redirect(link.url)
  }

  readonly getSchema = async (req: Request, res: Response, next: NextFunction) => {
    const {formId} = await this.extractParams(req)
    const form = await this.koboService.getSchema({formId})
    res.send(form)
  }

  readonly getAttachementsWithoutAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {formId} = await this.extractParams(req)
      const {path, fileName} = await yup.object({
        path: yup.string().required(),
        fileName: yup.string().optional(),
      }).validate(req.query)
      const sdk = await this.koboSdkGenerator.getByFormId(formId)
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

  readonly proxy = async (req: Request, res: Response, next: NextFunction) => {
    const body = await yup.object({
      serverId: yup.string().required(),
      url: yup.string().required(),
      method: yup.string().required(),
      body: yup.mixed<any>().optional(),
      headers: yup.mixed<any>().optional(),
    }).validate(req.body)
    const server = await this.koboSdkGenerator.getServerById(body.serverId)
    try {
      const request = await axios.create().request({
        url: body.url,
        method: body.method,
        headers: {
          ...body.headers,
          Authorization: 'Token ' + server.token,
        },
        params: body.body,
      })
      res.send(request.data)
    } catch (e) {
      console.log((e as AxiosError).code)
      next(e)
    }
  }
}
