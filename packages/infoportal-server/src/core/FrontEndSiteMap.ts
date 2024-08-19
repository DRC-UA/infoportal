import {KoboId} from 'infoportal-common'
import {appConf} from './conf/AppConf'

export class FrontEndSiteMap {
  constructor(private baseUrl = appConf.frontEndBaseUrl) {
  }

  openCfmEntry(formId: KoboId, answerId: string) {
    return this.baseUrl + `/cfm#/entry/${formId}/${answerId}`
  }
}
