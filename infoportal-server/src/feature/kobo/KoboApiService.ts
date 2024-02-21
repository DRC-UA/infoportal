import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from './KoboSdkGenerator'
import {KoboAnswerParams} from '../connector/kobo/KoboClient/type/KoboAnswer'
import {logger, Logger} from '../../helper/Logger'
import {KoboSdk} from '../connector/kobo/KoboClient/KoboSdk'

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
    return sdk.getAnswers(formId, params)
  }
}
