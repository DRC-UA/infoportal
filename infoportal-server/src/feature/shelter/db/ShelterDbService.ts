import {PrismaClient} from '@prisma/client'
import {KoboMappedAnswersService} from '../../kobo/KoboMappedAnswersService'
import {appConf} from '../../../core/conf/AppConf'
import {KoboSyncServer} from '../../kobo/KoboSyncServer'
import {ShelterEntity, ShelterTaPriceLevel} from './ShelterDbType'
import {KoboAnswerId} from '../../connector/kobo/KoboClient/type/KoboAnswer'
import {Enum, fnSwitch, Seq, seq} from '@alexandreannic/ts-utils'
import {DrcOffice, KoboIndex, OblastIndex} from '@infoportal-common'
import {ShelterContractorPrices} from './ShelterContractor'

export class ShelterDbService {

  constructor(
    private prisma: PrismaClient,
    private kobo: KoboMappedAnswersService = new KoboMappedAnswersService(prisma),
    private koboSync: KoboSyncServer = new KoboSyncServer(prisma),
    private conf = appConf
  ) {
  }

  readonly refreshForms = async () => {
    await Promise.all([
      this.koboSync.syncApiForm({formId: KoboIndex.byName('shelter_ta').id}),
      this.koboSync.syncApiForm({formId: KoboIndex.byName('shelter_ta').id}),
    ])
  }

  readonly search = async (): Promise<Seq<ShelterEntity>> => {
    const [
      ta,
      nta,
    ] = await Promise.all([
      this.kobo.searchShelter_Ta().then(_ => _.data),
      this.kobo.searchShelter_Nta().then(_ => _.data),
    ])

    const index: Record<KoboAnswerId, Omit<ShelterEntity, 'id'>> = {} as any

    nta.forEach(d => {
      if (!index[d.id]) index[d.id] = {}
      const oblast = OblastIndex.byKoboName(d.ben_det_oblast)
      index[d.id].nta = d
      index[d.id].oblastIso = oblast?.iso
      index[d.id].oblast = oblast?.name
      index[d.id].office = fnSwitch(d.back_office!, {
        cej: DrcOffice.Chernihiv,
        dnk: DrcOffice.Dnipro,
        hrk: DrcOffice.Kharkiv,
        umy: DrcOffice.Sumy,
        nlv: DrcOffice.Mykolaiv,
      }, () => undefined) ?? ''
    })

    ta.forEach(d => {
      const refId = d.nta_id ? d.nta_id.replaceAll(/[^\d]/g, '') : d.id
      if (!index[refId]) index[refId] = {}
      const price = ShelterContractorPrices.compute({
        answer: d,
        contractor1: d.tags?.contractor1,
        contractor2: d.tags?.contractor2,
      })
      const nta = index[refId].nta
      const priceLevel = () => {
        if (!price || typeof price !== 'number') return
        if (nta?.dwelling_type === 'house') {
          if (price < 100000) return ShelterTaPriceLevel.Light
          if (price >= 100000 && price <= 200000) return ShelterTaPriceLevel.Medium
          return ShelterTaPriceLevel.Heavy
        } else if (nta?.dwelling_type === 'apartment') {
          if (price < 40000) return ShelterTaPriceLevel.Light
          if (price >= 40000 && price <= 80000) return ShelterTaPriceLevel.Medium
          return ShelterTaPriceLevel.Heavy
        }
      }
      index[refId].ta = {
        ...d,
        _price: price,
        _priceLevel: priceLevel()
      }
    })

    return seq(Enum.entries(index))
      // .filter(([k, v]) => !!v.nta)
      .map(([k, v]) => ({id: k, ...v}))
      .sort((a, b) => {
        if (!a.nta) return -1
        if (!b.nta) return 1
        return a.nta.submissionTime?.getTime() - b.nta?.submissionTime.getTime()
      }) as Seq<ShelterEntity>
  }
}
