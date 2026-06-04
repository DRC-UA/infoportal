import {seq} from '@axanc/ts-utils'
import {PrismaClient, type UctWfpDeduplication} from '@prisma/client'
import {PromisePool} from '@supercharge/promise-pool'
import csvtojson from 'csvtojson'
import XlsxPopulate from 'xlsx-populate'
import {validate as validateUuid} from 'uuid'

import {ApiPaginateHelper, DrcOffice, groupBy, type ApiPaginate} from 'infoportal-common'

import {appConf} from '../../core/conf/AppConf.js'
import {GlobalEvent} from '../../core/GlobalEvent.js'

import {AccessService} from '../access/AccessService.js'
import {AppFeatureId} from '../access/AccessType.js'
import {UserSession} from '../session/UserSession.js'

import {csvFile2DbAdapter} from './library/index.js'

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

  readonly search = async ({offices, taxId, limit, offset}: WfpDbSearch = {}): Promise<
    ApiPaginate<UctWfpDeduplication>
  > => {
    const where = {
      drcOffice: {in: offices},
      taxId: {in: taxId},
    }
    const [totalSize, data] = await Promise.all([
      this.prisma.uctWfpDeduplication.count({where}),
      this.prisma.uctWfpDeduplication.findMany({
        where,
        take: limit,
        skip: offset,
      }),
    ])

    return ApiPaginateHelper.wrap(totalSize)(data.reverse())
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

  readonly uploadDeduplications: (args: {office: DrcOffice; files: Express.Multer.File[]}) => Promise<{count: number}> =
    async ({office, files}) => {
      const uploadBatch: Omit<UctWfpDeduplication, 'id'>[] = []

      for (const file of files) {
        const csvFile = await csvtojson().fromFile(file.path)
        const uuid = file.originalname.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)?.[0]
        const isUuidValis = validateUuid(uuid)

        if (!isUuidValis || uuid === undefined) throw "the file name doesn't contain valid UUID"

        const deduplicatedRecords = [...new Set(csvFile.map((record) => JSON.stringify(record)))].map((record) =>
          JSON.parse(record),
        ) // BB may return files with multiple identical records, wich fail to pass unique fileName, taxID pair constraint

        uploadBatch.push(
          ...csvFile2DbAdapter({
            drcOffice: office,
            batchId: uuid,
            fileName: file.originalname,
            records: deduplicatedRecords,
          }),
        )
      }

      const uploadBatchOrderedById = groupBy({
        data: uploadBatch,
        groups: [{by: ({taxId}) => taxId}],
        finalTransform: (group) => {
          if (group.length === 1) return group

          group.sort(({result}) => (result === 'Deduplicated - see deduplication report.' ? 1 : 0))

          return group
        },
      }).transforms.flat()

      return await this.prisma.uctWfpDeduplication.createMany({data: uploadBatchOrderedById})
    }
}
