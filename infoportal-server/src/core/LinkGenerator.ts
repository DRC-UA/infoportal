import {KoboId} from '@infoportal-common'
import {appConf} from './conf/AppConf'

export class SiteMap {
  constructor(private baseUrl = appConf.frontEndBaseUrl) {

  }

  openCfmEntry(formId: KoboId, answerId: string) {
    return this.baseUrl + `/cfm#/entry/${formId}/${answerId}`
  }
}

export const generateEntryLink = (formId: KoboId, answerId: string): string => {
  return `https://infoportal-ua.drc.ngo/cfm#/entry/${formId}/${answerId}`
}