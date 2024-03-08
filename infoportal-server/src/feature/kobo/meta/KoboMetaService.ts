import {Prisma, PrismaClient} from '@prisma/client'
import {GlobalEvent} from '../../../core/GlobalEvent'
import {KoboAnswerFlat} from '../../connector/kobo/KoboClient/type/KoboAnswer'
import {koboFormsId} from '../../../core/conf/KoboFormsId'
import {KoboMetaBasicneeds} from './KoboMetaMapperBasicneeds'
import {KoboMetaCreate, KoboMetaOrigin} from './KoboMetaType'
import {logger, Logger} from '../../../helper/Logger'
import {KoboService} from '../KoboService'
import {map, seq} from '@alexandreannic/ts-utils'
import {KoboMetaMapperEcrec} from './KoboMetaMapperEcrec'
import {KoboMetaMapperShelter} from './KoboMetaMapperShelter'
import {DrcProgram, KoboId, KoboMetaStatus} from '@infoportal-common'
import {PromisePool} from '@supercharge/promise-pool'
import {appConf} from '../../../core/conf/AppConf'
import {yup} from '../../../helper/Utils'
import {InferType} from 'yup'
import Event = GlobalEvent.Event

type UpdateMapper = (_: KoboAnswerFlat<any>) => [KoboId, Partial<Omit<KoboMetaCreate, 'id'>>] | undefined
type CreateMapper = (_: KoboAnswerFlat<any>) => KoboMetaCreate | undefined

class KoboMetaMapper {
  static readonly mappersCreate: Record<KoboId, CreateMapper> = {
    [koboFormsId.prod.bn_re]: KoboMetaBasicneeds.bn_re,
    [koboFormsId.prod.bn_rapidResponse]: KoboMetaBasicneeds.bn_rrm,
    [koboFormsId.prod.ecrec_cashRegistration]: KoboMetaMapperEcrec.cashRegistration,
    [koboFormsId.prod.ecrec_cashRegistrationBha]: KoboMetaMapperEcrec.cashRegistrationBha,
    [koboFormsId.prod.shelter_NTA]: KoboMetaMapperShelter.createNta,
  }
  static readonly mappersUpdate: Record<KoboId, UpdateMapper> = {
    [koboFormsId.prod.shelter_TA]: KoboMetaMapperShelter.updateTa,
  }
}

export namespace KoboMetaParams {
  export const schemaSearchFilter = yup.object({
    filters: yup.object({
      status: yup.array().of(yup.mixed<KoboMetaStatus>().defined()).optional(),
      activities: yup.array().of(yup.mixed<DrcProgram>().defined()).optional(),
    })
  })
  export type SearchFilter = InferType<typeof schemaSearchFilter>
}

export class KoboMetaService {

  constructor(
    private prisma: PrismaClient,
    private kobo = new KoboService(prisma),
    private event = GlobalEvent.Class.getInstance(),
    private conf = appConf,
    private log: Logger = logger('KoboMetaService'),
  ) {
  }

  readonly start = () => {
    this.log.info(`Start listening to ${Event.KOBO_FORM_SYNCHRONIZED}`)
    this.event.listen(Event.KOBO_FORM_SYNCHRONIZED, _ => {
      const createMapper = KoboMetaMapper.mappersCreate[_.formId]
      const updateMapper = KoboMetaMapper.mappersUpdate[_.formId]
      if (createMapper) this.synchronize({formId: _.formId, mapper: createMapper})
      else if (updateMapper) this.synchronizeUpdate({formId: _.formId, mapper: updateMapper})
      else this.log.error(`No mapper implemented for ${JSON.stringify(_.formId)}`)
    })
  }

  readonly search = ({filters}: KoboMetaParams.SearchFilter) => {
    return this.prisma.koboMeta.findMany({
      include: {
        persons: true
      },
      where: {
        // activity: {
        //   hasSome: filters.activities!
        // }
        ...map(filters.status, _ => ({status: {in: _}})),
        ...map(filters.activities, _ => ({activity: {hasSome: _}}))
      }
    })
  }

  private synchronizeUpdate = async ({
    formId,
    mapper,
  }: {
    formId: KoboId
    mapper: UpdateMapper,
  }) => {
    this.log.info(`Fetch Kobo answers...`)
    const updates = await this.prisma.koboAnswers.findMany({
      where: {formId},
      include: {
        meta: {
          select: {
            uuid: true,
            updatedAt: true,
            id: true,
          }
        }
      }
    }).then(res => {
        return seq(res)
          .filter(_ => _.meta?.uuid === undefined || _.uuid !== _.meta.uuid || _.updatedAt?.getTime() !== _.meta.updatedAt?.getTime())
          .map(mapper)
          .compact()
      }
    )
    // this.log.info(`Clean persons ${updates.length}...`)
    // await this.prisma.koboPerson.deleteMany({
    //   where: {
    //     id: {
    //       in: updates.map(_ => _[1].id).compact()
    //     }
    //   }
    // })
    this.log.info(`Update ${updates.length}...`)
    await PromisePool
      .withConcurrency(this.conf.db.maxConcurrency)
      .for(updates)
      .process(async ([koboId, {persons, ...update}]) => {
        console.log(koboId, update)
        return this.prisma.koboMeta.update({
          where: {id: koboId},
          data: update,
          // data: {
          // ...update,
          // persons: {
          // createMany: {
          //   data: seq(persons).compact()
          // },
          // }
          // },
        })
      })
    this.log.info(`Update ${updates.length}... COMPLETED`)
  }

  private synchronize = async ({
    formId,
    mapper,
  }: {
    formId: KoboId
    mapper: CreateMapper,
  }) => {
    this.log.info(`Fetch Kobo answers...`)
    const remoteAnswers: KoboMetaOrigin[] = await this.prisma.koboAnswers.findMany({
      select: {
        formId: true,
        uuid: true,
        answers: true,
        date: true,
        id: true
      },
      where: {formId}
    })
    const remoteIdsIndex = remoteAnswers.reduce((map, curr) => map.set(curr.id, curr), new Map<KoboId, KoboMetaOrigin>())

    this.log.info(`Fetch Kobo answers... ${remoteAnswers.length} fetched.`)

    this.log.info(`Fetch Meta answers...`)
    const localAnswersIndex = await this.prisma.koboMeta.findMany({where: {formId}, select: {id: true, uuid: true, updatedAt: true}}).then(_ => {
      return _.reduce((map, {id, ...curr}) => map.set(id, curr), new Map<KoboId, {uuid: string, updatedAt?: Date | null}>())
    })
    this.log.info(`Fetch Meta answers... ${localAnswersIndex.size} fetched.`)

    const handleDelete = async () => {
      const idsToDelete = [...localAnswersIndex.keys()].filter(_ => !remoteIdsIndex.has(_))
      this.log.info(`Handle delete (${idsToDelete.length})...`)
      await this.prisma.koboMeta.deleteMany({where: {formId, id: {in: idsToDelete}}})
      return idsToDelete
    }

    const handleCreate = async () => {
      const notInsertedAnswers = seq(remoteAnswers).filter(_ => !localAnswersIndex.has(_.id)).map(mapper).compact()
      this.log.info(`Handle create (${notInsertedAnswers.length})...`)
      const persons = notInsertedAnswers.flatMap(_ => {
        const res: Prisma.KoboPersonUncheckedCreateInput[] = _.persons?.map(ind => ({
          ...ind,
          disability: ind.disability ?? [],
          metaId: _.id
        })) ?? []
        delete _['persons']
        return res
      })
      await this.prisma.koboMeta.createMany({
        data: seq(notInsertedAnswers),
        skipDuplicates: true,
      })
      await this.prisma.koboPerson.createMany({
        data: persons
      })
      return notInsertedAnswers
    }

    const handleUpdate = async () => {
      const answersToUpdate = seq(Array.from(localAnswersIndex.entries())).map(([id, meta]) => {
        const match = remoteIdsIndex.get(id)
        if (match === undefined) return false
        const hasBeenUpdated = match.uuid !== meta.uuid || match.updatedAt?.getTime() !== meta.updatedAt?.getTime()
        return hasBeenUpdated ? match : undefined
      }).compact()
      this.log.info(`Handle update (${answersToUpdate.length})...`)
      await Promise.all(answersToUpdate.map(mapper).compact().map(a => {
        const {persons, ...answer} = a
        return this.prisma.koboMeta.update({
          where: {
            id: a.id,
          },
          data: {
            persons: {
              createMany: {data: persons ?? []}
            },
            ...answer
          }
        })
      }))
      return answersToUpdate
    }

    const answersIdsDeleted = await handleDelete()
    const answersCreated = await handleCreate()
    const answersUpdated = await handleUpdate()
    return {
      // answersIdsDeleted,
      // answersCreated,
      // answersUpdated,
    }

    // const current = await this.prisma.koboMeta.findMany()
    // current.map(_ => _.answerUuid)
    // const remoteIdsIndex: Map<KoboId, KoboUnified> = current.reduce((map, answer) => map.set(rest.id, answer), new Map())
    //
    //
    // this.log.info('Synchronizing meta database...')
    // console.log({
    //   answersIdsDeleted,
    //   answersUpdated,
    //   answersCreated,
    // })
    // const mapper = KoboUnifiedMapper.map[formId]
    // await this.prisma.koboMeta.deleteMany({
    //   where: {
    //     id: {in: answersIdsDeleted}
    //   }
    // })
    // await this.prisma.koboMeta.createMany({
    //   data: answersCreated.map(mapper),
    // })
    // await Promise.all(answersUpdated.map(a => {
    //   return this.prisma.koboMeta.updateMany({
    //     where: {id: a.id},
    //     data: answersCreated.map(mapper),
    //   })
    // }))
    // this.log.info('Synchronizing meta database... COMPLETED')
  }

}