import {yup} from '../../../helper/Utils'
import {InferType} from 'yup'

export namespace KoboAnswerHistoryHelper {

  export const validation = {
    search: yup.object({
      formId: yup.string().required()
    })
  }

  export type Search = InferType<typeof validation.search>
}