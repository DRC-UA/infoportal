import {Obj} from '@axanc/ts-utils'
import {Prisma, PrismaClient} from '@prisma/client'
import {addMinutes, parse, subMinutes} from 'date-fns'
import {ApiError} from 'kobo-sdk'
import promiseRetry from 'promise-retry'

import {ApiPaginate, DrcOffice, WfpDeduplicationStatus} from 'infoportal-common'

import {WFPBuildingBlockSdk} from '../../core/externalSdk/wfpBuildingBlock/WfpBuildingBlockSdk.js'
import {
  AssistancePrevented,
  AssistanceProvided,
  WfpFilters,
} from '../../core/externalSdk/wfpBuildingBlock/WfpBuildingBlockType.js'
import {appConf, AppConf} from '../../core/conf/AppConf.js'
import {WfpBuildingBlockClient} from '../../core/externalSdk/wfpBuildingBlock/WfpBuildingBlockClient.js'
import {app, AppLogger} from '../../index.js'

export class WfpDeduplicationUpload {
  private constructor(
    private prisma: PrismaClient,
    private wfpSdk: WFPBuildingBlockSdk,
    private conf: AppConf,
    private log: AppLogger = app.logger('WfpDeduplicationUpload'),
  ) {}

  static readonly construct = async (conf: AppConf, prisma: PrismaClient) => {
    const wfpSdk = new WFPBuildingBlockSdk(
      await new WfpBuildingBlockClient({
        login: appConf.buildingBlockWfp.login,
        password: appConf.buildingBlockWfp.password,
        otpUrl: appConf.buildingBlockWfp.otpURL,
      }).generate(),
    )
    return new WfpDeduplicationUpload(prisma, wfpSdk, conf)
  }

  readonly saveAll = async () => {
    this.log.info('Clear database...')
    await this.prisma.mpcaWfpDeduplication.deleteMany()
    this.log.info('AssistanceProvided...')
    await this.throttledFetchAndRun({
      fetch: (_) =>
        promiseRetry(async (retry, number) => {
          return await this.wfpSdk.getAssistanceProvided(_).catch((e: ApiError) => {
            if (e.details.code === 401) {
              return Promise.reject(e)
            }
            this.log.info('Retry request ' + number)
            return retry(number)
          })
        }),
      runOnBatchedResult: async (batch: AssistanceProvided[]) => {
        this.log.debug(`Processing batch of ${batch.length} requests...`)
        await this.upsertMappingId(batch.map(({beneficiaryId}) => beneficiaryId))
        const {count} = await this.prisma.mpcaWfpDeduplication.createMany({
          data: batch.map(({amount, id, createdAt, expiry, beneficiaryId, validFrom, category}) => {
            return {
              amount: +amount,
              wfpId: id,
              createdAt,
              expiry,
              beneficiaryId,
              status: WfpDeduplicationStatus.NotDeduplicated,
              validFrom,
              category,
            }
          }),
        })
        this.log.debug(`${count} requests stored in mpcaWfpDeduplication table`)
        if (count !== batch.length) this.log.debug('OOPS!')
      },
    })
    this.log.info('AssistancePrevented...')
    await this.throttledFetchAndRun({
      fetch: (wfpFilters) => this.wfpSdk.getAssistancePrevented(wfpFilters),
      runOnBatchedResult: async (res: AssistancePrevented[]) => {
        this.log.debug('Upserting BB beneficiaryId, populating deduplication table...')
        await this.upsertMappingId(res.map(({beneficiaryId}) => beneficiaryId))
        await this.prisma.mpcaWfpDeduplication.createMany({
          data: res.map(({amount, id, message, createdAt, expiry, beneficiaryId, validFrom, category, ...rest}) => {
            const status = (() => {
              if (message.includes('Partially deduplicated')) {
                return WfpDeduplicationStatus.PartiallyDeduplicated
              } else if (message.includes('Deduplicated')) {
                return WfpDeduplicationStatus.Deduplicated
              }

              return WfpDeduplicationStatus.Error
            })()
            const existing = (() => {
              const match = message.match(
                /-\s+Already\s+assisted\s+by\s+(.*?)\s+from\s+(\d{8})\s+to\s+(\d{8})\s+for\s+UAH\s+([\d,.\s]+)\s+for\s+(CASH-\w+)/,
              )
              if (!match) {
                console.warn('No organization found in deduplication message:\n', {
                  amount,
                  id,
                  message,
                  createdAt,
                  expiry,
                  beneficiaryId,
                  validFrom,
                  category,
                  ...rest,
                })

                return {}
              }

              return {
                existingOrga: match![1],
                existingStart: parse(match![2], 'yyyyMMdd', new Date()),
                existingEnd: parse(match![3], 'yyyyMMdd', new Date()),
                existingAmount: parseFloat(match![4].replace(/[.,]00\s*$/g, '').replaceAll(/[,.\s]/g, '')),
              }
            })()

            return {
              amount: +amount,
              wfpId: id,
              createdAt,
              expiry,
              beneficiaryId,
              message,
              status,
              validFrom,
              category,
              ...existing,
            }
          }),
        })
      },
    })
    // this.log.info('mergePartiallyDuplicated')
    // await this.mergePartiallyDuplicated()
    this.log.info('setoblast')
    await this.setOblast()
    this.log.info('clearHumanMistakes')
    await this.clearHumanMistakes()
    this.log.info('Done')
  }

  private readonly upsertMappingId = async (ids: string[]) => {
    await Promise.all(
      ids.map((beneficiaryId) =>
        this.prisma.mpcaWfpDeduplicationIdMapping.upsert({
          create: {beneficiaryId},
          where: {beneficiaryId, taxId: undefined},
          update: {beneficiaryId},
        }),
      ),
    )
  }

  private readonly mergePartiallyDuplicated = async () => {
    const partiallyDuplicated = await this.prisma.mpcaWfpDeduplication.findMany({
      where: {
        status: WfpDeduplicationStatus.PartiallyDeduplicated,
      },
    })
    await Promise.all(
      partiallyDuplicated.map(async (_) => {
        return this.prisma.mpcaWfpDeduplication
          .findMany({
            where: {
              status: WfpDeduplicationStatus.NotDeduplicated,
              beneficiaryId: _.beneficiaryId,
              createdAt: {gt: subMinutes(_.createdAt, 20), lt: addMinutes(_.createdAt, 20)},
            },
          })
          .then(async (res) => {
            if (res.length !== 1)
              console.error(
                `Problem when searching matching entry ${_.beneficiaryId} at ${_.createdAt}, found ${res.length} entries.`,
              )
            if (res.length > 0)
              return await this.prisma.mpcaWfpDeduplication
                .update({
                  data: {amount: res[0].amount},
                  where: {id: _.id},
                })
                .then(() => res[0].id)
            else return await Promise.resolve(undefined)
          })
          .then(async (deprecatedId) => {
            if (deprecatedId)
              return await this.prisma.mpcaWfpDeduplication
                .delete({where: {id: deprecatedId}})
                .catch(() => Promise.resolve(undefined))
            return await Promise.resolve(undefined)
          })
      }),
    )
  }

  private readonly throttledFetchAndRun = async <T, R>({
    fetch,
    batchSize = 500,
    runOnBatchedResult,
  }: {
    batchSize?: number
    fetch: (_: WfpFilters) => Promise<ApiPaginate<T>>
    runOnBatchedResult: (batch: T[]) => R
  }): Promise<R[]> => {
    let offset = 0
    const r: R[] = []
    for (;;) {
      const res = await fetch({limit: batchSize, offset})
      if (res.data.length > 0) {
        r.push(runOnBatchedResult(res.data))
        offset += res.data.length
      } else {
        break
      }
    }
    return r
  }

  private clearHumanMistakes = async () => {
    return this.prisma.mpcaWfpDeduplication.deleteMany({
      where: {fileName: 'DRC Ukraine_BB_Data submission_CEJ_20230731.xlsx.gpg'},
    })
  }

  private setOblast = async () => {
    const officeMapping: Record<string, DrcOffice> = {
      HRK: DrcOffice.Kharkiv,
      NLV: DrcOffice.Mykolaiv,
      CEJ: DrcOffice.Chernihiv,
      DNK: DrcOffice.Dnipro,
      CWC: DrcOffice.Lviv,
      NLK: DrcOffice.Mykolaiv,
      LWO: DrcOffice.Lviv,
      CHJ: DrcOffice.Chernihiv,
      UMY: DrcOffice.Sumy,
      SLO: DrcOffice.Sloviansk,
    }
    const possibleOffices = Obj.keys(officeMapping)
    const files = await this.throttledFetchAndRun({
      fetch: this.wfpSdk.getImportFiles,
      runOnBatchedResult: (batch) => batch,
    }).then((response) => response.flatMap((file) => file))

    let offset = 0

    for (const file of files) {
      this.log.debug(`Update ${file.finishedAt} ${file.fileName}`)
      const office = possibleOffices.find((oblastCode) => file.fileName.includes(oblastCode))
      if (!office) console.warn(`Oblast not found for filename ${file.fileName}`)
      const rowsCount = file.additionalInfo.rowCount
      const rows = await this.prisma.mpcaWfpDeduplication.findMany({
        select: {id: true, beneficiaryId: true},
        orderBy: [
          {createdAt: 'desc'},
          {wfpId: 'asc'}, // Use wfpId as secondary sort when createdAt are same for a number of records
          {id: 'asc'}, // Final tie-breaker with UUID
        ],
        skip: offset,
        take: rowsCount,
      })
      const officeValue = office ? officeMapping[office] : null
      if (rows.length > 0) {
        await this.prisma.$executeRaw`
            UPDATE "MpcaWfpDeduplication"
            SET "office"     = ${officeValue},
                "fileName"   = ${file.fileName},
                "fileUpload" = ${new Date(file.finishedAt)}
            WHERE "id" IN (${Prisma.join(rows.map((_) => _.id))})
        `
      }
      offset += rowsCount
    }
  }
}
