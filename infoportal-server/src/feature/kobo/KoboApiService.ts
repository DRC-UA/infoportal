import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from './KoboSdkGenerator'
import {logger, Logger} from '../../helper/Logger'
import {KoboSdk, KoboAnswerParams} from '@infoportal-common'

export class KoboApiService {

  constructor(
    private prisma: PrismaClient,
    private koboSdkGenerator: KoboSdkGenerator = new KoboSdkGenerator(prisma),
    private log: Logger = logger('KoboApiService')
  ) {
  }

  readonly constructSdk = (serverId: string): Promise<KoboSdk> => this.koboSdkGenerator.get(serverId)

  readonly fetchAnswers = async (serverId: string, formId: string, params: KoboAnswerParams = {}) => {
    const sdk = await this.koboSdkGenerator.get(serverId)
    return sdk.v2.getAnswers(formId, params)
  }
}
