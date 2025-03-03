import {PrismaClient} from '@prisma/client'
import {FixKoboMigration} from './20250113-fixKoboMigration'
import {KoboIndex, Shelter_ta, UUID} from 'infoportal-common'
import {duration, Progress, seq} from '@axanc/ts-utils'
import {Kobo} from 'kobo-sdk'
import {PromisePool} from '@supercharge/promise-pool'
import {addHours, subHours} from 'date-fns'
import {koboSdkDrc} from '../index'

export class ShelterRepair {
  constructor(
    private prisma = new PrismaClient(),
    private backup = FixKoboMigration.getBackupDbClient(),
  ) {}

  private readonly getNewNta = () => {
    return this.prisma.koboAnswers.findMany({
      select: {
        submissionTime: true,
        id: true,
      },
      where: {
        deletedAt: null,
        formId: KoboIndex.byName('shelter_nta').id,
      },
    })
  }

  private readonly getOriginNta = (): Promise<{id: string; submissionTime: Date}[]> => {
    return this.backup
      .then((_) =>
        _.query(
          `
              SELECT id, "submissionTime"
              FROM "KoboAnswers"
              WHERE "formId" = $1
                AND "deletedAt" IS NULL;
          `,
          [KoboIndex.byName('shelter_nta').id],
        ),
      )
      .then((_) => _.rows)
  }

  readonly run = async () => {
    console.log('Build indexes...')
    const [newNta, originNta] = await Promise.all([this.getNewNta(), this.getOriginNta()])
    console.log('Build indexes... Done!')

    console.log('Fetching ta...')
    const ta = await this.prisma.koboAnswers
      .findMany({
        select: {id: true, answers: true},
        where: {formId: KoboIndex.byName('shelter_ta').id, deletedAt: null},
      })
      .then((_) =>
        _.filter((_) => {
          return !(_.answers as any).nta_id || +(_.answers as any).nta_id > 92041680
        }),
      )
    console.log('Assign... ' + ta.length, 'Check ' + newNta.length, originNta.length)

    let done = 0
    const progress = new Progress(ta.length)
    setInterval(() => console.log('> ' + progress.snapshot(done)), duration(5, 'second'))
    await PromisePool.withConcurrency(10)
      .for(ta)
      .handleError((e) => {
        throw e
      })
      .process(async (submission) => {
        try {
          const mapped = Shelter_ta.map(submission.answers as any)
          const origin = originNta.filter((_) => _.id === mapped.nta_id!)
          if (!origin) {
            throw new Error(`No match for ${mapped.nta_id}`)
          }
          if (origin.length > 1) {
            throw new Error(`Too much matches for ${mapped.nta_id}`)
          }
          if (origin.length === 1) {
            const newNtaId = newNta.find(
              (_) => _.submissionTime.getTime() === subHours(origin[0].submissionTime, 7).getTime(),
            )
            if (!newNtaId) throw new Error('Not found')
            // console.log('UPDATE', mapped.nta_id, '=>', newNtaId.id, 'for', submission.id)
            await koboSdkDrc.v2.submission.update({
              formId: KoboIndex.byName('shelter_ta').id,
              submissionIds: [submission.id],
              data: {
                nta_id: newNtaId.id,
              },
            })
            done++
          } else {
            console.log('Not found' + submission.id)
          }
        } catch (error: any) {
          done++
          console.log(error.message)
        }
      })
  }
}
