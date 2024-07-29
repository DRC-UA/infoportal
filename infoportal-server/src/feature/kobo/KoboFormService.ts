import {KoboForm, Prisma, PrismaClient} from '@prisma/client'
import {KoboApiSchema, KoboId, KoboSdk, KoboSdkv2, UUID} from '@infoportal-common'
import {KoboApiService} from './KoboApiService'
import {seq} from '@alexandreannic/ts-utils'
import {appConf} from '../../core/conf/AppConf'
import {KoboSdkGenerator} from './KoboSdkGenerator'
import {PromisePool} from '@supercharge/promise-pool'

export interface KoboFormCreate {
  uid: string
  serverId: UUID
  uploadedBy: string
}

export class KoboFormService {

  constructor(
    private prisma: PrismaClient,
    private service = new KoboApiService(prisma),
    private koboSdk = new KoboSdkGenerator(prisma),
    private conf = appConf,
  ) {

  }

  static readonly apiToDb = ({
    schema,
    serverId,
    uploadedBy,
  }: {
    schema: KoboApiSchema,
    serverId: UUID
    uploadedBy: string
  }): Prisma.KoboFormUncheckedCreateInput => {
    return {
      name: schema.name,
      id: schema.uid,
      serverId: serverId,
      deploymentStatus: schema.deployment_status,
      uploadedBy: uploadedBy,
    }
  }

  readonly add = async (payload: KoboFormCreate) => {
    const sdk = await this.koboSdk.get()
    const schema = await sdk.v2.getForm(payload.uid)
    const [newFrom,] = await Promise.all([
      this.prisma.koboForm.create({
        data: KoboFormService.apiToDb({
          schema,
          serverId: payload.serverId,
          uploadedBy: payload.uploadedBy,
        })
      }),
      this.service.constructSdk(payload.serverId).then(sdk => this.createHookIfNotExists(sdk, payload.uid))
    ])
    return newFrom
  }

  private createHookIfNotExists = async (sdk: KoboSdk, formId: KoboId) => {
    const hooks = await sdk.v2.getHook(formId)
    if (hooks.data.find(_ => _.name === KoboSdkv2.webHookName)) return
    return sdk.v2.createWebHook(formId, this.conf.baseUrl + `/kobo-api/webhook`)
  }

  readonly registerHooksForAll = async () => {
    const forms = await this.prisma.koboForm.findMany()
    const sdks = await Promise.all(
      seq(forms).distinct(_ => _.serverId).get()
        .map(server => this.service.constructSdk(server.serverId).then(_ => ({
          serverId: server.serverId, sdk: _
        })))
    ).then(_ => seq(_).reduceObject<Record<string, KoboSdk>>(_ => [_.serverId!, _.sdk]))
    await Promise.all(forms.map(async form => this.createHookIfNotExists(sdks[form.serverId], form.id).catch(() => console.log(`Not created ${form.id}`))))
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

  readonly refreshAll = async (params: Omit<KoboFormCreate, 'uid'>) => {
    const sdk = await this.koboSdk.get(params.serverId)
    const [forms, apiFormsIndex] = await Promise.all([
      this.getAll(),
      sdk.v2.getForms().then(_ => _.results).then(_ => {
        console.log(_.length)
        return seq(_).groupByFirst(_ => _.uid)
      }),
    ])
    await PromisePool.withConcurrency(this.conf.db.maxConcurrency).for(forms)
      .handleError(async error => {
        throw error
      })
      .process(form => {
        const schema = apiFormsIndex[form.id]
        const db = KoboFormService.apiToDb({schema, ...params})
        return this.prisma.koboForm.update({
          data: db,
          where: {
            id: form.id
          }
        })
      })
  }
}
