import {AppConf, appConf} from './core/conf/AppConf'
import {Server} from './server/Server'
import {ServiceStats} from './server/services/ServiceStats'
import {Services} from './server/services'
import {PrismaClient} from '@prisma/client'
import {MpcaPaymentService} from './feature/mpca/mpcaPayment/MpcaPaymentService'
import {DbInit} from './db/DbInit'
import {logger} from './helper/Logger'
// import {washRMM} from './feature/connector/activity-info/generatedModel/washRMM'
import {ScheduledTask} from './scheduledTask/ScheduledTask'
import {MpcaCachedDb} from './feature/mpca/db/MpcaCachedDb'
import {ShelterCachedDb} from './feature/shelter/db/ShelterCachedDb'
import {KoboMetaService} from './feature/kobo/meta/KoboMetaService'

const initServices = (
  // koboClient: KoboSdk,
  // ecrecSdk: EcrecSdk,
  // legalaidSdk: LegalaidSdk,
  prisma: PrismaClient
): Services => {
  // const ecrec = new ServiceEcrec(ecrecSdk)
  // const legalAid = new ServiceLegalAid(legalaidSdk)
  // const nfi = new ServiceNfi(koboClient)
  const mpcaPayment = new MpcaPaymentService(prisma)
  const stats = new ServiceStats(
    // ecrec,
    // legalAid,
    // nfi,
  )
  return {
    // ecrec,
    // legalAid,
    // nfi,
    stats,
    mpcaPayment,
  }
}

const startApp = async (conf: AppConf) => {
  const prisma = new PrismaClient({
    // log: ['query']
  })
  const services = initServices(
    // koboSdk,
    // ecrecAppSdk,
    // legalAidSdk,
    prisma,
  )
  const init = async () => {
    const log = logger('')
    log.info(`Starting... v5.0`)

    log.info(`Initialize database ${conf.db.url.split('@')[1]}...`)
    await new DbInit(conf, prisma).initializeDatabase()
    log.info(`Database initialized.`)

    // process.exit()
    // await KoboMigrateHHS2({
    //   prisma,
    //   serverId: koboServerId.prod,
    //   oldFormId: KoboIndex.byName('protectionHh_2').id,
    //   newFormId: KoboIndex.byName('protectionHh_2_1').id,
    // }).run()

    // try {
    //   await new KoboService(prisma).generateXLSForHHS({
    //     // start: new Date(2023, 5, 1),
    //     // end: new Date(2023, 6, 1),
    // })
    // } catch (e) {
    //   console.error(e)
    // }

    // const wfpSdk = new WFPBuildingBlockSdk(await new WfpBuildingBlockClient({
    //   login: appConf.buildingBlockWfp.login,
    //   password: appConf.buildingBlockWfp.password,
    //   otpUrl: appConf.buildingBlockWfp.otpURL,
    // }).generate())
    // await new WfpDeduplicationUpload(prisma, wfpSdk).saveAll()

    // const ecrecAppSdk = new EcrecSdk(new EcrecClient(appConf.ecrecApp))
    // const legalAidSdk = new LegalaidSdk(new ApiClient({
    //   baseUrl: 'https://api.lau-crm.org.ua',
    //   headers: {
    //     'x-auth-token': appConf.legalAid.apiToken,
    //   }
    // }))

    // console.log(`Master ${process.pid} is running`)
    // const core = conf.production ? os.cpus().length : 1
    // for (let i = 0; i < core; i++) {
    //   cluster.fork()
    // }
    // cluster.on('exit', (worker, code, signal) => {
    //   console.log(`Worker ${worker.process.pid} died`)
    // })
    new KoboMetaService(prisma).start()
    if (conf.production) {
      new ScheduledTask(prisma).start()
      MpcaCachedDb.constructSingleton(prisma).warmUp()
      ShelterCachedDb.constructSingleton(prisma).warmUp()
    }
  }

  const start = () => {
    new Server(
      conf,
      prisma,
      // ecrecAppSdk,
      // legalAidSdk,
      services,
    ).start()
  }
  // if (cluster.isPrimary) {
  init()
  // } else {
  start()
  // }
}

// runAi.washRMM()
startApp(appConf)
