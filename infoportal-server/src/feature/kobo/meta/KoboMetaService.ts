import {Prisma, PrismaClient} from '@prisma/client'
import {GlobalEvent} from '../../../core/GlobalEvent'
import {KoboMetaBasicneeds} from './KoboMetaMapperBasicneeds'
import {KoboMetaCreate} from './KoboMetaType'
import {logger, Logger} from '../../../helper/Logger'
import {KoboService} from '../KoboService'
import {duration, map, Obj, seq, Seq} from '@alexandreannic/ts-utils'
import {KoboMetaMapperEcrec} from './KoboMetaMapperEcrec'
import {KoboMetaMapperShelter} from './KoboMetaMapperShelter'
import {DrcProgram, IKoboMeta, KoboId, KoboIndex, KoboMetaStatus} from '@infoportal-common'
import {PromisePool} from '@supercharge/promise-pool'
import {appConf} from '../../../core/conf/AppConf'
import {yup} from '../../../helper/Utils'
import {InferType} from 'yup'
import {KoboMetaMapperProtection} from './KoboMetaMapperProtection'
import {SytemCache} from '../../../helper/IpCache'
import {app} from '../../../index'
import Event = GlobalEvent.Event

export type MetaMapped<TTag extends Record<string, any> = any> = Omit<KoboMetaCreate<TTag>, 'koboId' | 'id' | 'uuid' | 'date' | 'updatedAt' | 'formId'>
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
    [KoboIndex.byName('protection_pss').id]: KoboMetaMapperProtection.pss,
    [KoboIndex.byName('protection_gbv').id]: KoboMetaMapperProtection.gbv,
    [KoboIndex.byName('protection_hhs3').id]: KoboMetaMapperProtection.hhs,
    [KoboIndex.byName('protection_groupSession').id]: KoboMetaMapperProtection.groupSession,
    [KoboIndex.byName('protection_communityMonitoring').id]: KoboMetaMapperProtection.communityMonitoring,
  }
  static readonly mappersUpdate: Record<KoboId, MetaMapperMerge> = {
    [KoboIndex.byName('shelter_ta').id]: KoboMetaMapperShelter.updateTa,
  }
}

export namespace KoboMetaParams {
  export const schemaSearchFilter = yup.object({
    status: yup.array().of(yup.mixed<KoboMetaStatus>().defined()).optional(),
    activities: yup.array().of(yup.mixed<DrcProgram>().defined()).optional(),
  }).optional()
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
      setTimeout(() => {
        // Wait for the database to be rebuilt before clear the cache
        app.cache.clear(SytemCache.Meta)
      }, duration(1, 'minute'))
    })
    this.event.listen(Event.WFP_DEDUPLICATION_SYNCHRONIZED, () => {
      this.syncWfpDeduplication()
    })
  }

  private syncWfpDeduplication = async () => {
    // const data = await this.prisma.mpcaWfpDeduplication.findMany()
    // data.
  }

  readonly search = app.cache.request({
    key: SytemCache.Meta,
    cacheIf: (params) => {
      return params === undefined || Object.keys(params).length === 0
    },
    fn: async (params: KoboMetaParams.SearchFilter = {}) => {
      const meta = await this.prisma.koboMeta.findMany({
        where: {
          ...map(params?.status, _ => ({status: {in: _}})),
          ...map(params?.activities, _ => ({activity: {in: _}}))
        },
        orderBy: {
          date: 'desc',
        }
      })
      const persons = await this.prisma.koboPerson.findMany({
        where: {
          koboAnswerId: {
            in: meta.map(_ => _.koboId)
          }
        }
      }).then(_ => seq(_).groupBy(_ => _.koboAnswerId))
      const res: IKoboMeta[] = meta.map(_ => {
        let imeta: IKoboMeta = _ as any
        imeta.persons = persons[_.koboId] as any ?? []
        return imeta
      })
      return res
    }
  })

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
        return seq(res.flatMap(({meta, ..._}) => meta.map(m => ({..._, meta: m}))))
          .filter(_ => _.meta?.uuid === undefined || _.uuid !== _.meta.uuid || _.updatedAt?.getTime() !== _.meta.updatedAt?.getTime())
          .map(mapper)
          .compact()
      }
    )

    this.info(formId, `Update ${updates.length}...`)
    await PromisePool
      .withConcurrency(this.conf.db.maxConcurrency)
      .for(updates)
      .process(async ([koboId, {persons, ...update}]) => {
        return this.prisma.koboMeta.update({
          where: {id: koboId},
          data: update,

        })
      })
    this.info(formId, `Update ${updates.length}... COMPLETED`)
  }

  static readonly makeMetaId = (koboId: KoboId, activity: DrcProgram) => koboId + activity

  private syncInsert = async ({
    formId,
    mapper,
  }: {
    formId: KoboId
    mapper: MetaMapperInsert,
  }) => {
    this.info(formId, `Fetch Kobo answers...`)
    const koboAnswers: Seq<KoboMetaCreate> = await this.prisma.koboAnswers.findMany({
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
            // id: KoboMetaService.makeMetaId(r.id, _.activity!),
            koboId: r.id,
            uuid: r.uuid,
            formId: r.formId,
            updatedAt: r.updatedAt ?? undefined,
            date: r.date ?? undefined,
            ..._,
          }
        })
      })
    })

    this.info(formId, `Fetch Kobo answers... ${koboAnswers.length} fetched.`)

    const handleCreate = async () => {
      this.info(formId, `Handle create (${koboAnswers.length})...`)
      const persons = koboAnswers.distinct(_ => _.koboId).flatMap(_ => {
        const res: Prisma.KoboPersonUncheckedCreateInput[] = _.persons?.map(ind => ({
          ...ind,
          disability: ind.disability ?? [],
          koboAnswerId: _.koboId
        })) ?? []
        return res
      })
      await Promise.all([
        this.prisma.koboMeta.createMany({
          data: seq(koboAnswers.map(_ => {
            delete _['persons']
            return _
          })),
          skipDuplicates: true,
        }),
        await this.prisma.koboPerson.createMany({
          data: persons
        })
      ])
      return koboAnswers
    }

    await Promise.all([
      this.prisma.koboMeta.deleteMany({where: {formId}}),
      this.prisma.koboPerson.deleteMany({
        where: {
          koboAnswerId: {
            in: koboAnswers.map(_ => _.koboId)
          }
        }
      })
    ])
    await handleCreate()
    this.info(formId, `Handle create (${koboAnswers.length})... CREATED!`)
    return {}
  }

  readonly sync = () => {
    app.cache.clear(SytemCache.Meta)
    const keys = Obj.keys(KoboMetaMapper.mappersCreate)
    keys.forEach((formId, i) => {
      this.event.emit(GlobalEvent.Event.KOBO_FORM_SYNCHRONIZED, {formId, index: i, total: keys.length - 1})
    })
    setTimeout(() => {
      // Wait for the database to be rebuilt before clear the cache
      app.cache.clear(SytemCache.Meta)
    }, duration(5, 'minute'))
  }
}