import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from './KoboSdkGenerator'
import {app, AppLogger} from '../../index'
import {KoboAnswerParams, KoboSdk} from 'infoportal-common'

export class KoboApiService {

  constructor(
    private prisma: PrismaClient,
    private koboSdkGenerator: KoboSdkGenerator = KoboSdkGenerator.getSingleton(prisma),
    private log: AppLogger = app.logger('KoboApiService')
  ) {
  }

  readonly fetchAnswers = async (formId: string, params: KoboAnswerParams = {}) => {
    const sdk = await this.koboSdkGenerator.getByFormId(formId)
    return sdk.v2.getAnswers(formId, params)
  }
}
