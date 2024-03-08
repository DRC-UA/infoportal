import {DisplacementStatus, DrcDonor, DrcOffice, DrcProgram, DrcProject, DrcSector, IKoboMeta, OblastName, PersonDetails, UUID} from '@infoportal-common'
import {KoboAnswerMetaData, KoboId} from '../../connector/kobo/KoboClient/type/KoboAnswer'

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
  tags?: TTag
}

export type KoboMetaCreate<TTags = any> = IKoboMeta<TTags>
