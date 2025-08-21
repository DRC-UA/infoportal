import {seq} from '@axanc/ts-utils'
import {PrismaClient} from '@prisma/client'
import XlsxPopulate from 'xlsx-populate'

import {ApiPaginateHelper, getDrcSuggestion, type WfpDeduplication, type ApiPaginate} from 'infoportal-common'

import {UserSession} from '../session/UserSession.js'
import {AccessService} from '../access/AccessService.js'
import {AppFeatureId} from '../access/AccessType.js'
import {PromisePool} from '@supercharge/promise-pool'
import {appConf} from '../../core/conf/AppConf.js'
import {GlobalEvent} from '../../core/GlobalEvent.js'

const {Event} = GlobalEvent

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
    private event = GlobalEvent.Class.getInstance(),
  ) {}

  readonly searchByUserAccess = async (query: WfpDbSearch, user: UserSession) => {
    const accesses = await this.access.searchForUser({featureId: AppFeatureId.wfp_deduplication, user})
    const authorizedOffices = [
      ...new Set(
        seq(accesses)
          .flatMap((_) => _.params?.filters?.office!)
          .compact(),
      ),
    ]
    const filteredOffices =
      user.admin || authorizedOffices.length === 0
        ? query.offices
        : authorizedOffices.filter((office) => !query.offices || query.offices.includes(office))
    return this.search({...query, offices: filteredOffices})
  }

  readonly search = async ({createdAtStart, createdAtEnd, offices, taxId, limit, offset}: WfpDbSearch = {}): Promise<
    ApiPaginate<WfpDeduplication>
  > => {
    const where = {
      createdAt: {
        gte: createdAtStart,
        lte: createdAtEnd,
      },
      office: {in: offices},
      beneficiary: {
        taxId: {in: taxId},
      },
    }
    const [totalSize, data] = await Promise.all([
      this.prisma.mpcaWfpDeduplication.count({where}),
      this.prisma.mpcaWfpDeduplication.findMany({
        include: {
          beneficiary: {
            select: {
              taxId: true,
            },
          },
        },
        where,
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ])
    return ApiPaginateHelper.wrap(totalSize)(
      data.map((record: any): WfpDeduplication => {
        record.suggestion = getDrcSuggestion(record)
        record.taxId = record.beneficiary.taxId
        return record
      }),
    )
  }

  readonly uploadTaxId = async (filePath: string) => {
    const xls = await XlsxPopulate.fromFileAsync(filePath)
    const data = xls
      .activeSheet()
      ._rows.splice(1)
      .map((_) => ({beneficiaryId: _.cell(1).value() as string, taxId: ('' + _.cell(2).value()) as string}))
    await PromisePool.for(data)
      .withConcurrency(this.conf.db.maxConcurrency)
      .process((_: any) =>
        this.prisma.mpcaWfpDeduplicationIdMapping.upsert({
          update: _,
          where: {beneficiaryId: _.beneficiaryId},
          create: _,
        }),
      )
    this.event.emit(Event.WFP_DEDUPLICATION_SYNCHRONIZED)
  }
}
