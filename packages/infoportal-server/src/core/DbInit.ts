import {FeatureAccessLevel, Prisma, PrismaClient} from '@prisma/client'

import {DrcOffice, KoboIndex} from 'infoportal-common'

import {AppFeatureId, KoboDatabaseFeatureParams} from '../feature/access/AccessType.js'
import {appConf, AppConf} from './conf/AppConf.js'

export const createdBySystem = 'SYSTEM'

export class DbInit {
  constructor(
    private conf: AppConf,
    private prisma: PrismaClient,
  ) {}

  readonly initializeDatabase = async () => {
    if ((await this.prisma.user.count()) > 0) return
    await Promise.all([this.createAccOwner(), this.createAccAdmins(), this.createAccTest(), this.createAccess()])
  }

  private readonly createAccTest = async () => {
    return this.upsertUsers([
      {
        email: 'prot.man.hrk@dummy',
        drcJob: 'Protection Manager',
        drcOffice: DrcOffice.Kharkiv,
        createdBy: createdBySystem,
      },
      {
        email: 'mpca.assist.hrk@dummy',
        drcJob: 'MPCA/NFI Assistant',
        drcOffice: DrcOffice.Kharkiv,
        createdBy: createdBySystem,
      },
      {
        email: 'prot.officer.dnp@dummy',
        drcJob: 'Protection Officer',
        drcOffice: DrcOffice.Dnipro,
        createdBy: createdBySystem,
      },
      {
        email: 'prot.co@dummy',
        drcJob: 'Protection Coordinator',
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
    return this.upsertUsers(
      adminsEmail.map((email) => ({
        email,
        createdBy: createdBySystem,
        admin: true,
      })),
    )
  }

  private readonly createAccOwner = async () => {
    return this.upsertUsers([
      {
        email: this.conf.ownerEmail,
        admin: true,
      },
    ])
  }

  private readonly upsertUsers = async (users: Prisma.UserCreateInput[]) => {
    await Promise.all(
      users.map((_) =>
        this.prisma.user.upsert({
          update: _,
          create: _,
          where: {email: _.email},
        }),
      ),
    )
  }

  private readonly createAccess = async () => {
    await this.prisma.featureAccess.deleteMany({where: {createdBy: createdBySystem}})
    const access: Prisma.FeatureAccessCreateInput[] = [
      {
        createdBy: createdBySystem,
        level: FeatureAccessLevel.Write,
        featureId: AppFeatureId.kobo_database,
        params: KoboDatabaseFeatureParams.create({
          koboFormId: KoboIndex.byName('bn_rapidResponse').id,
          filters: {},
        }),
      },
      {
        createdBy: createdBySystem,
        email: appConf.ownerEmail,
        level: FeatureAccessLevel.Admin,
      },
    ]
    await Promise.all(
      access.map((_) =>
        this.prisma.featureAccess.create({
          data: _,
        }),
      ),
    )
  }
}
