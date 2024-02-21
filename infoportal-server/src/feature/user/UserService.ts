import {PrismaClient} from '@prisma/client'
import {logger, Logger} from '../../helper/Logger'
import {DrcOffice} from '@infoportal-common'

export class UserService {

  constructor(
    private prisma: PrismaClient,
    private log: Logger = logger('UserService'),
  ) {
  }

  readonly getAll = () => {
    return this.prisma.user.findMany({orderBy: {lastConnectedAt: 'desc'}})
  }

  readonly update = ({
    email,
    drcOffice,
  }: {
    email: string,
    drcOffice?: DrcOffice
  }) => {
    return this.prisma.user.update({
      where: {email},
      data: {drcOffice}
    })
  }
}