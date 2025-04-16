import mssql from 'mssql'

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
    this.#pool.connect()
  }

  async fetchAiRiskEducation(): Promise<any> {
    return await this.#pool.request().query`SELECT * FROM external_migrate.undp_rmm_re_direct_session`
  }

  // TODO: provide proper types
  async fetchRiskEducation(filters: any): Promise<any> {
    const request = this.#pool.request()
    request.input('month', mssql.Int, filters.month || '02')
    request.input('year', mssql.Int, filters.year || '2025')

    return await request.query`
      SELECT * FROM external_migrate.undp_rmm_re_direct_session
        WHERE DATEPART(month, session_date) = @month
        AND DATEPART(year, session_date) = @year;
    `
  }
}
