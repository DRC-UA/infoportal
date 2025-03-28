import mssql, {type ConnectionPool} from 'mssql'

import {appConf, AppConf} from '../../conf/AppConf.js'

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
    const sql = await pool.connect()
    return await sql.query`
      SELECT *
      FROM external_migrate.undp_rmm_re_direct_session
    `
    console.log(result)
    return result.recordset
  }
}
