import {IKoboMeta, KoboAnswerMetaData} from 'infoportal-common'

export type KoboMetaOrigin<
  TAnswer extends Record<string, any> = any,
  TTag extends undefined | Record<string, any> = undefined,
> = {
  formId: KoboAnswerMetaData['id']
  uuid: KoboAnswerMetaData['uuid']
  attachments: KoboAnswerMetaData['attachments']
  answers: TAnswer
  date: KoboAnswerMetaData['date']
  submissionTime: KoboAnswerMetaData['submissionTime']
  id: KoboAnswerMetaData['id']
  updatedAt?: KoboAnswerMetaData['updatedAt']
  tags?: TTag | null
}

export type KoboMetaCreate<TTags = any> = Omit<IKoboMeta<TTags>, 'id'>

