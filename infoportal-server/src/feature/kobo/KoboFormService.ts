import {KoboForm, PrismaClient} from '@prisma/client'
import {KoboId, UUID} from '@infoportal-common'
import {KoboApiService} from './KoboApiService'
import {KoboSdk} from '../connector/kobo/KoboClient/KoboSdk'
import {seq} from '@alexandreannic/ts-utils'

export interface KoboFormCreate {
  id: string
  name: string
  serverId: UUID
  uploadedBy: string
}

export class KoboFormService {

  constructor(
    private prisma: PrismaClient,
    private service = new KoboApiService(prisma),
  ) {

  }

  readonly create = async (payload: KoboFormCreate) => {
    const [newFrom,] = await Promise.all([
      this.prisma.koboForm.create({
        data: payload
      }),
      this.service.constructSdk(payload.serverId).then(sdk => this.createHookIfNotExists(sdk, payload.id))
    ])
  }

  private createHookIfNotExists = async (sdk: KoboSdk, formId: KoboId) => {
    const hooks = await sdk.getHook(formId)
    if (hooks.data.find(_ => _.name === KoboSdk.hookName)) return
    return sdk.createHook(formId)
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
}
