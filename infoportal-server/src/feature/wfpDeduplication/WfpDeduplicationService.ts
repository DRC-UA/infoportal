import {PrismaClient} from '@prisma/client'
import XlsxPopulate from 'xlsx-populate'
import {DbHelper} from '../../db/DbHelper'
import {UserSession} from '../session/UserSession'
import {AccessService} from '../access/AccessService'
import {AppFeatureId} from '../access/AccessType'
import {seq} from '@alexandreannic/ts-utils'
import {PromisePool} from '@supercharge/promise-pool'
import {appConf} from '../../core/conf/AppConf'
import {WfpDeduplicationHelper} from './WfpDeduplicationType'

export interface WfpDbSearch {
  limit?: number
  offset?: number
  taxId?: string[]
  offices?: string[]
  createdAtStart?: Date
  createdAtEnd?: Date
}

export class WfpDeduplicationService {

  constructor(
    private prisma: PrismaClient,
    private access: AccessService = new AccessService(prisma),
    private conf = appConf,
  ) {
  }

  readonly searchByUserAccess = async (search: WfpDbSearch, user: UserSession) => {
    const accesses = await this.access.searchForUser({featureId: AppFeatureId.wfp_deduplication, user})
    const authorizedOffices = [...new Set(seq(accesses).flatMap(_ => _.params?.filters?.office!).compact())]
    const filteredOffices = (user.admin || authorizedOffices.length === 0)
      ? search.offices
      : authorizedOffices.filter(_ => !search.offices || search.offices.includes(_))
    return this.search({...search, offices: filteredOffices})
  }

  readonly search = async (search: WfpDbSearch = {}) => {
    const where = {
      createdAt: {
        gte: search.createdAtStart,
        lte: search.createdAtEnd,
      },
      office: {in: search.offices},
      beneficiary: {
        taxId: {in: search.taxId}
      },
    }
    const [totalSize, data] = await Promise.all([
      this.prisma.mpcaWfpDeduplication.count({where}),
      this.prisma.mpcaWfpDeduplication.findMany({
        include: {
          beneficiary: {
            select: {
              taxId: true,
            }
          }
        },
        where,
        take: search.limit,
        skip: search.offset,
        orderBy: {
          createdAt: 'desc',
        }
      }),
    ])
    return DbHelper.toPaginate(totalSize)(data.map(WfpDeduplicationHelper.map))
  }

  readonly uploadTaxId = async (filePath: string) => {
    const xls = await XlsxPopulate.fromFileAsync(filePath)
    const data = xls.activeSheet()._rows
      .splice(1)
      .map(_ => ({beneficiaryId: _.cell(1).value() as string, taxId: '' + _.cell(2).value() as string}))
    await PromisePool.for(data).withConcurrency(this.conf.db.maxConcurrency).process((_: any) =>
      this.prisma.mpcaWfpDeduplicationIdMapping.upsert({
        update: _,
        where: {beneficiaryId: _.beneficiaryId},
        create: _,
      })
    )
  }
}