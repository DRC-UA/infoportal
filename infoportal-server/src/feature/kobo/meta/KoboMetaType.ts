import {IKoboMeta} from '@infoportal-common'
import {KoboAnswerMetaData} from '../../connector/kobo/KoboClient/type/KoboAnswer'

export type KoboMetaOrigin<
  TAnswer extends Record<string, any> = any,
  TTag extends undefined | Record<string, any> = undefined,
> = {
  formId: KoboAnswerMetaData['id']
  uuid: KoboAnswerMetaData['uuid']
  answers: TAnswer
  date: KoboAnswerMetaData['date']
  id: KoboAnswerMetaData['id']
  updatedAt?: KoboAnswerMetaData['updatedAt']
  tags?: TTag | null
}

export type KoboMetaCreate<TTags = any> = Omit<IKoboMeta<TTags>, 'id'>

