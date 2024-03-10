import {Prisma, PrismaClient} from '@prisma/client'
import {GlobalEvent} from '../../../core/GlobalEvent'
import {KoboMetaBasicneeds} from './KoboMetaMapperBasicneeds'
import {KoboMetaCreate} from './KoboMetaType'
import {logger, Logger} from '../../../helper/Logger'
import {KoboService} from '../KoboService'
import {map, Obj, seq, Seq} from '@alexandreannic/ts-utils'
import {KoboMetaMapperEcrec} from './KoboMetaMapperEcrec'
import {KoboMetaMapperShelter} from './KoboMetaMapperShelter'
import {DrcProgram, IKoboMeta, KoboId, KoboIndex, KoboMetaStatus} from '@infoportal-common'
import {PromisePool} from '@supercharge/promise-pool'
import {appConf} from '../../../core/conf/AppConf'
import {yup} from '../../../helper/Utils'
import {InferType} from 'yup'
import Event = GlobalEvent.Event

export type MetaMapped<TTag extends Record<string, any> = any> = Omit<KoboMetaCreate<TTag>, 'id' | 'uuid' | 'date' | 'updatedAt' | 'formId'>
export type MetaMapperMerge<T extends Record<string, any> = any, TTag extends Record<string, any> = any> = (_: T) => [KoboId, Partial<MetaMapped<TTag>>] | undefined
export type MetaMapperInsert<T extends Record<string, any> = any> = (_: T) => MetaMapped | MetaMapped[] | undefined

class KoboMetaMapper {
  static readonly mappersCreate: Record<KoboId, MetaMapperInsert> = {
    [KoboIndex.byName('bn_re').id]: KoboMetaBasicneeds.bn_re,
    [KoboIndex.byName('bn_rapidResponse').id]: KoboMetaBasicneeds.bn_rrm,
    [KoboIndex.byName('ecrec_cashRegistration').id]: KoboMetaMapperEcrec.cashRegistration,
    [KoboIndex.byName('ecrec_cashRegistrationBha').id]: KoboMetaMapperEcrec.cashRegistrationBha,
    [KoboIndex.byName('shelter_nta').id]: KoboMetaMapperShelter.createNta,
    [KoboIndex.byName('bn_cashForRentRegistration').id]: KoboMetaMapperShelter.createCfRent,
    [KoboIndex.byName('shelter_cashForShelter').id]: KoboMetaMapperShelter.createCfShelter,
  }
  static readonly mappersUpdate: Record<KoboId, MetaMapperMerge> = {
    [KoboIndex.byName('shelter_ta').id]: KoboMetaMapperShelter.updateTa,
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
    this.info('', `Start listening to ${Event.KOBO_FORM_SYNCHRONIZED}`)
    this.event.listen(Event.KOBO_FORM_SYNCHRONIZED, _ => {
      const createMapper = KoboMetaMapper.mappersCreate[_.formId]
      const updateMapper = KoboMetaMapper.mappersUpdate[_.formId]
      if (createMapper) this.syncInsert({formId: _.formId, mapper: createMapper})
      else if (updateMapper) this.syncMerge({formId: _.formId, mapper: updateMapper})
      else this.log.error(`No mapper implemented for ${JSON.stringify(_.formId)}`)
    })
    this.event.listen(Event.WFP_DEDUPLICATION_SYNCHRONIZED, () => {
      this.syncWfpDeduplication()
    })
  }

  private syncWfpDeduplication = async () => {
    // const data = await this.prisma.mpcaWfpDeduplication.findMany()
    // data.
  }

  readonly search = ({filters}: KoboMetaParams.SearchFilter) => {
    return this.prisma.koboMeta.findMany({
      include: {
        persons: true
      },
      where: {
        //   hasSome: filters.activities!
        // }
        ...map(filters.status, _ => ({status: {in: _}})),
        ...map(filters.activities, _ => ({activity: {in: _}}))
      }
    })
  }

  private info = (formId: KoboId, message: string) => this.log.info(`${KoboIndex.searchById(formId)?.translation ?? formId}: ${message}`)

  private syncMerge = async ({
    formId,
    mapper,
  }: {
    formId: KoboId
    mapper: MetaMapperMerge,
  }) => {
    this.info(formId, `Fetch Kobo answers...`)
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
    // this.info(formId, `Clean persons ${updates.length}...`)
    // await this.prisma.koboPerson.deleteMany({
    //   where: {
    //     id: {
    //       in: updates.map(_ => _[1].id).compact()
    //     }
    //   }
    // })
    this.info(formId, `Update ${updates.length}...`)
    await PromisePool
      .withConcurrency(this.conf.db.maxConcurrency)
      .for(updates)
      .process(async ([koboId, {persons, ...update}]) => {
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
    this.info(formId, `Update ${updates.length}... COMPLETED`)
  }

  private syncInsert = async ({
    formId,
    mapper,
  }: {
    formId: KoboId
    mapper: MetaMapperInsert,
  }) => {
    this.info(formId, `Fetch Kobo answers...`)
    const koboAnswers: Seq<IKoboMeta> = await this.prisma.koboAnswers.findMany({
      select: {
        formId: true,
        uuid: true,
        answers: true,
        date: true,
        id: true,
        tags: true,
        updatedAt: true,
      },
      where: {formId}
    }).then(res => {
      return seq(res).flatMap(r => {
        const m = [mapper(r)].flat()
        return seq(m).compact().map(_ => {
          return {
            id: r.id,
            uuid: r.uuid,
            formId: r.formId,
            updatedAt: r.updatedAt ?? undefined,
            date: r.date ?? undefined,
            ..._,
          }
        })
      })
    })
    const koboAnswerIdsIndex = koboAnswers.reduce((map, curr) => map.set(curr.id, curr), new Map<KoboId, IKoboMeta>())

    this.info(formId, `Fetch Kobo answers... ${koboAnswers.length} fetched.`)

    this.info(formId, `Fetch Meta answers...`)
    const metaIndex = await this.prisma.koboMeta.findMany({where: {formId}, select: {id: true, uuid: true, updatedAt: true}}).then(_ => {
      return _.reduce((map, {id, ...curr}) => map.set(id, curr), new Map<KoboId, {uuid: string, updatedAt?: Date | null}>())
    })
    this.info(formId, `Fetch Meta answers... ${metaIndex.size} fetched.`)

    const handleDelete = async () => {
      const idsToDelete = [...metaIndex.keys()].filter(_ => !koboAnswerIdsIndex.has(_))
      this.info(formId, `Handle delete (${idsToDelete.length})...`)
      await this.prisma.koboMeta.deleteMany({where: {formId, id: {in: idsToDelete}}})
      return idsToDelete
    }

    const handleCreate = async () => {
      const notInsertedAnswers = koboAnswers.filter(_ => !metaIndex.has(_.id))
      this.info(formId, `Handle create (${notInsertedAnswers.length})...`)
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
      const answersToUpdate = seq(Array.from(metaIndex.entries())).map(([id, meta]) => {
        const match = koboAnswerIdsIndex.get(id)
        if (match === undefined) return
        const hasBeenUpdated = match.uuid !== meta.uuid || match.updatedAt?.getTime() !== meta.updatedAt?.getTime()
        return hasBeenUpdated ? match : undefined
      }).compact()
      this.info(formId, `Handle update (${answersToUpdate.length})...`)
      await Promise.all(answersToUpdate.map(a => {
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
    // const koboAnswerIdsIndex: Map<KoboId, KoboUnified> = current.reduce((map, answer) => map.set(rest.id, answer), new Map())
    //
    //
    // this.info(formId, 'Synchronizing meta database...')
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
    // this.info(formId, 'Synchronizing meta database... COMPLETED')
  }

  readonly sync = () => {
    Obj.keys(KoboMetaMapper.mappersCreate).forEach(formId => {
      this.event.emit(GlobalEvent.Event.KOBO_FORM_SYNCHRONIZED, {formId})
    })
  }

}