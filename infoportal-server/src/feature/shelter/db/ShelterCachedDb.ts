import {PrismaClient} from '@prisma/client'
import {ApiPaginate, ApiPaginateHelper, KoboIndex, Period, PeriodHelper, UUID} from '@infoportal-common'
import {GlobalEvent} from '../../../core/GlobalEvent'
import {MemoryDatabase, MemoryDatabaseInterface} from '../../../core/MemoryDatabase'
import {ShelterDbService} from './ShelterDbService'
import {ShelterEntity} from './ShelterDbType'
import {seq} from '@alexandreannic/ts-utils'

export class ShelterCachedDb {
  private static instance: ShelterCachedDb

  static constructSingleton = (
    prisma: PrismaClient,
    service: ShelterDbService = new ShelterDbService(prisma),
  ) => {
    if (!ShelterCachedDb.instance) {
      const mem = MemoryDatabase.getCache()
      const cache = mem.register({
        name: 'shelter',
        fetch: () => service.search(),
        getId: _ => seq([_.ta?.id, _.nta?.id]).compact().get(),
      })
      this.instance = new ShelterCachedDb(cache)
    }
    return ShelterCachedDb.instance
  }

  private constructor(
    private meme: MemoryDatabaseInterface<ShelterEntity, UUID>,
    private koboEvent: GlobalEvent.Class = GlobalEvent.Class.getInstance(),
  ) {
    this.koboEvent.listen(GlobalEvent.Event.KOBO_FORM_SYNCHRONIZED, async (_) => {
      if ([KoboIndex.byName('shelter_ta').id, KoboIndex.byName('shelter_ta').id].includes(_.formId)) {
        this.meme.clear()
      }
    })
    this.koboEvent.listen(GlobalEvent.Event.KOBO_ANSWER_EDITED, async (_) => {
      if ([KoboIndex.byName('shelter_ta').id, KoboIndex.byName('shelter_ta').id].includes(_.formId)) {
        this.meme.clear()
      }
    })
    this.koboEvent.listen(GlobalEvent.Event.KOBO_TAG_EDITED, async (eventParams) => {
      switch (eventParams.formId) {
        case KoboIndex.byName('shelter_ta').id: {
          eventParams.answerIds.forEach(id => {
            this.meme.update(id, prev => {
              prev.ta!.tags = {
                ...prev.ta?.tags ?? {},
                ...eventParams.tags,
              }
              return prev
            })
          })
          break
        }
        case KoboIndex.byName('shelter_nta').id: {
          eventParams.answerIds.forEach(id => {
            this.meme.update(id, prev => {
              prev.nta!.tags = {
                ...prev.nta?.tags ?? {},
                ...eventParams.tags,
              }
              return prev
            })
          })
          break
        }
      }
    })
    this.refresh = this.meme.refresh
    this.warmUp = this.meme.warmUp
  }

  readonly refresh: typeof this.meme.refresh
  readonly warmUp: typeof this.meme.warmUp

  readonly search = async (period: Partial<Period> = {}): Promise<ApiPaginate<ShelterEntity>> => {
    return ApiPaginateHelper.make()(await this.meme.get().then(res =>
      res.filter(_ => PeriodHelper.isDateIn(period, _.nta?.submissionTime ?? _.ta?.submissionTime))
    ))
  }
}