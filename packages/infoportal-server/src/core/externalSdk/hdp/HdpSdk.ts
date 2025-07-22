import {isValid, parseISO} from 'date-fns'
import mssql from 'mssql'

import type {RiskEducationDirectSession, RiskEducationDirectSessionResponseData} from 'infoportal-common'

import {appConf} from '../../conf/AppConf.js'

export class HdpSdk {
  #pool: mssql.ConnectionPool

  constructor() {
    this.#pool = new mssql.ConnectionPool({
      password: appConf.dbAzureHdp.password,
      user: appConf.dbAzureHdp.user,
      port: appConf.dbAzureHdp.port,
      database: appConf.dbAzureHdp.schema,
      server: appConf.dbAzureHdp.host,
    })
    // this.#pool.connect()
  }

  async fetchAiRiskEducation(): Promise<any> {
    return await this.#pool.request().query`SELECT * FROM external_migrate.undp_rmm_re_direct_session`
  }

  // TODO: provide proper filter types
  async fetchRiskEducation(filters: any): Promise<RiskEducationDirectSessionResponseData> {
    const request = this.#pool.request()
    const {start, end} = filters?.period

    request.input('start', mssql.DateTime, isValid(parseISO(start)) ? start : null)
    request.input('end', mssql.DateTime, isValid(parseISO(end)) && end)
    request.input('office', filters?.office ? `${filters.office.join(', ')}` : null)

    return await request.query<RiskEducationDirectSession>`
      SELECT * FROM external_migrate.info_portal_re_direct_session
        WHERE (@start IS NULL OR session_date >= @start)
        AND (@end IS NULL OR session_date <= @end)
        AND (@office IS NULL OR office_name_short IN (@office));
    `
  }
}
