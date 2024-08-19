import {FeatureAccessLevel, Prisma, PrismaClient} from '@prisma/client'
import {appConf, AppConf} from '../core/conf/AppConf'
import {AppFeatureId, KoboDatabaseFeatureParams} from '../feature/access/AccessType'
import {DrcJob, DrcOffice, koboIndex, KoboIndex} from 'infoportal-common'
import {DbHelperProtectionHhs} from './koboForm/DbHelperProtectionHhs'

export const createdBySystem = 'SYSTEM'

export class DbInit {


  constructor(
    private conf: AppConf,
    private prisma: PrismaClient
  ) {
  }

  readonly initializeDatabase = async () => {
    // await Promise.all([
    //   this.migrateHhs2(),
    //   this.fixKoboForms(),
    //   this.createAccOwner(),
    //   this.createAccAdmins(),
    //   this.createAccTest(),
    //   this.createServer(),
    //   this.createAccess(),
    // ])
  }

  private readonly fixKoboForms = async () => {
    return Promise.all([
      // new DbHelperBNRE(this.prisma).assignMissingSettlement(),
      new DbHelperProtectionHhs(this.prisma).assignDonorsForHhs(),
    ])
  }

  private readonly createAccTest = async () => {
    return this.upsertUsers([
      {
        email: 'prot.man.hrk@dummy',
        drcJob: DrcJob['Protection Manager'],
        drcOffice: DrcOffice.Kharkiv,
        createdBy: createdBySystem,
      },
      {
        email: 'mpca.assist.hrk@dummy',
        drcJob: DrcJob['MPCA/NFI Assistant'],
        drcOffice: DrcOffice.Kharkiv,
        createdBy: createdBySystem,
      },
      {
        email: 'prot.officer.dnp@dummy',
        drcJob: DrcJob['Protection Officer'],
        drcOffice: DrcOffice.Dnipro,
        createdBy: createdBySystem,
      },
      {
        email: 'prot.co@dummy',
        drcJob: DrcJob['Protection Coordinator'],
        createdBy: createdBySystem,
      },
      {
        email: 'noaccess@dummy',
        createdBy: createdBySystem,
      },
    ])
  }

  private readonly createAccAdmins = async () => {
    const adminsEmail = [
      'julian.zakrzewski@drc.ngo',
      'alix.journoud@drc.ngo',
      'katrina.zacharewski@drc.ngo',
      'isabel.pearson@drc.ngo',
    ]
    return this.upsertUsers(adminsEmail.map(email => ({
      email,
      createdBy: createdBySystem,
      admin: true
    })))
  }

  private readonly createAccOwner = async () => {
    return this.upsertUsers([
      {
        email: this.conf.ownerEmail,
        admin: true
      }
    ])
  }

  private readonly upsertUsers = async (users: Prisma.UserCreateInput[]) => {
    await Promise.all(users.map(_ =>
      this.prisma.user.upsert({
        update: _,
        create: _,
        where: {email: _.email},
      })
    ))
  }

  private readonly createAccess = async () => {
    await this.prisma.featureAccess.deleteMany({where: {createdBy: createdBySystem}})
    const access: Prisma.FeatureAccessCreateInput[] = [
      // {
      //   createdBy: createdBySystem,
      //   email: 'romane.breton@drc.ngo',
      //   featureId: AppFeature.kobo_database,
      //   level: FeatureAccessLevel.Admin,
      //   params: KoboDatabaseFeatureParams.create({
      //     koboFormId: KoboIndex.byName('protectionHh_2_1').id,
      //   }),
      // },
      {
        createdBy: createdBySystem,
        level: FeatureAccessLevel.Write,
        featureId: AppFeatureId.kobo_database,
        params: KoboDatabaseFeatureParams.create({
          koboFormId: KoboIndex.byName('bn_rapidResponse').id,
          filters: {}
        }),
      },
      {
        createdBy: createdBySystem,
        email: appConf.ownerEmail,
        level: FeatureAccessLevel.Admin,
      }
    ]
    await Promise.all(access.map(_ => this.prisma.featureAccess.create({
      data: _
    })))
  }

  private readonly createServer = async () => {
    const serversCount = await this.prisma.koboServer.count()
    if (serversCount < 2) {
      return Promise.all([
        this.prisma.koboServer.create({
          data: {
            id: koboIndex.drcUa.server.prod,
            url: 'https://kobo.humanitarianresponse.info',
            urlV1: 'https://kc-eu.kobotoolbox.org',
            token: appConf.kobo.token,
          }
        }),
        this.prisma.koboServer.create({
          data: {
            id: koboIndex.drcUa.server.dev,
            url: 'https://kf.kobotoolbox.org',
            urlV1: 'https://kc.kobotoolbox.org',
            token: 'TODO',
          }
        })
      ])
    }
  }
}


