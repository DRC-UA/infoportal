import {AiProtectionType} from '@/features/ActivityInfo/Protection/aiProtectionType'
import {
  AILocationHelper,
  Bn_re,
  IKoboMeta,
  OblastIndex,
  Period,
  Person,
  Protection_groupSession,
} from 'infoportal-common'
import {fnSwitch} from '@axanc/ts-utils'
import {format} from 'date-fns'
import {AiGbvType} from '@/features/ActivityInfo/Gbv/aiGbvType'
import {aiLocationMap} from 'activityinfo-sdk/location-map'
import {UaLocation} from 'ua-location'

export namespace AiMapper {
  export const getPeriodStr = (p: Partial<Period>) => {
    if (!p.start || !p.end) return ''
    const start = format(p.start, 'yyyy-MM')
    const end = format(p.end, 'yyyy-MM')
    return start === end ? start : ''
  }

  export type Location = Pick<AiProtectionType.Type, 'Oblast' | 'Raion' | 'Hromada' | 'Settlement'>

  export const getLocationRecordIdByMeta = (p: {
    oblast: IKoboMeta['oblast'],
    raion: IKoboMeta['raion'],
    hromada: IKoboMeta['hromada'],
    settlement: IKoboMeta['settlement'],
  }) => {
    const oblast = UaLocation.Oblast.findByName(p.oblast!)
    const raion = oblast?.raions?.find(_ => _.en === p.raion)
    const hromada = raion?.hromadas?.find(_ => _.en === p.hromada)
    return locationIsoToRecordId({
      Oblast: oblast?.iso,
      Raion: raion?.iso,
      Hromada: hromada?.iso,
      Settlement: p.settlement,
    })
  }

  export const getLocationByMeta = async (
    oblast: string,
    raion: string,
    hromada: string,
    settlement?: string,
  ): Promise<Location> => {
    const hromadaLoc = AILocationHelper.findHromada(oblast, raion, hromada)
    return {
      Oblast: AILocationHelper.findOblast(oblast) ?? (('⚠️' + oblast) as any),
      Raion: AILocationHelper.findRaion(oblast, raion)?._5w ?? (('⚠️' + raion) as any),
      Hromada: hromadaLoc ? hromadaLoc.en + '_' + hromadaLoc.iso : (('⚠️' + hromada) as any),
      Settlement: settlement
        ? await AILocationHelper.findSettlementByIso(settlement).then((res) => {
          if (!res)
            return AILocationHelper.findSettlement(oblast, raion, hromada, settlement).then(
              (_) => _?._5w ?? '⚠️' + settlement,
            )
          return Promise.resolve(res._5w)
        })
        : undefined,
    }
  }

  export const locationIsoToRecordId = (_: {
    Oblast?: string
    Raion?: string
    Hromada?: string
    Settlement?: string
  }): any => {
    return {
      Oblast: _.Oblast ? aiLocationMap.oblast[_.Oblast] : undefined,
      Raion: _.Raion ? aiLocationMap.raion[_.Raion] : undefined,
      Hromada: _.Hromada ? aiLocationMap.hromada[_.Hromada] : undefined,
      Settlement: _.Settlement ? aiLocationMap.settlement[_.Settlement] : undefined,
    }
  }

  export const getLocationByKobo = (
    d: Pick<Protection_groupSession.T, 'ben_det_oblast' | 'ben_det_hromada' | 'ben_det_raion'>,
  ): Location => {
    const oblast = OblastIndex.byKoboName(d.ben_det_oblast!)?.name ?? ''
    const raion = AILocationHelper.findRaion(
      oblast,
      Bn_re.options.ben_det_raion[d.ben_det_raion as keyof typeof Bn_re.options.ben_det_raion] ?? d.ben_det_raion,
    )!
    const hromada = AILocationHelper.findHromada(
      oblast,
      raion?.en,
      Bn_re.options.ben_det_hromada[d.ben_det_hromada as keyof typeof Bn_re.options.ben_det_hromada] ??
      d.ben_det_hromada,
    )
    return {
      Oblast: AILocationHelper.findOblast(oblast)! as any, //  @FIXME
      Raion: raion?._5w as any,
      Hromada: hromada ? hromada.en + '_' + hromada.iso : undefined!,
    }
  }

  export const mapPopulationGroup = (
    _?: Person.DisplacementStatus,
  ): AiGbvType.AiTypeActivitiesAndPeople['Population Group'] => {
    return fnSwitch(
      _!,
      {
        Idp: 'Internally Displaced',
        // Returnee: 'Returnees',
      },
      () => 'Non-Displaced',
    )
  }

  export const disaggregatePersons = (
    persons: Person.Details[],
  ): {
    'Adult Men (18-59)': number
    'Adult Women (18-59)': number
    'Boys (0-17)': number
    'Girls (0-17)': number
    'Older Men (60+)': number
    'Older Women (60+)': number
    'Total Individuals Reached': number
    'People with Disability': number
    'Girls with disability (0-17)': number
    'Boys with disability (0-17)': number
    'Adult Women with disability (18-59)': number
    'Adult Men with disability (18-59)': number
    'Older Women with disability (60+)': number
    'Older Men with disability (60+)': number
  } => {
    const personsDefined = persons.filter((_) => !!_.gender && !!_.age)
    const personsWD = personsDefined.filter((_) => _.disability && _.disability.length > 0)
    const disaggregation = Person.groupByGenderAndGroup(Person.ageGroup.UNHCR)(personsDefined)
    return {
      'Adult Men (18-59)': disaggregation['18 - 59'].Male ?? 0,
      'Adult Women (18-59)': disaggregation['18 - 59'].Female ?? 0,
      'Boys (0-17)': disaggregation['0 - 17'].Male ?? 0,
      'Girls (0-17)': disaggregation['0 - 17'].Female ?? 0,
      'Older Men (60+)': disaggregation['60+'].Male ?? 0,
      'Older Women (60+)': disaggregation['60+'].Female ?? 0,
      'Total Individuals Reached': personsDefined.length ?? 0,
      'People with Disability': personsWD.length ?? 0,
      'Girls with disability (0-17)':
        personsWD.filter((_) => _.gender === Person.Gender.Female && _.age! < 18).length ?? 0,
      'Boys with disability (0-17)':
        personsWD.filter((_) => _.gender === Person.Gender.Male && _.age! < 18).length ?? 0,
      'Adult Women with disability (18-59)':
        personsWD.filter((_) => _.gender === Person.Gender.Female && _.age! >= 18 && _.age! < 60).length ?? 0,
      'Adult Men with disability (18-59)':
        personsWD.filter((_) => _.gender === Person.Gender.Male && _.age! >= 18 && _.age! < 60).length ?? 0,
      'Older Women with disability (60+)':
        personsWD.filter((_) => _.gender === Person.Gender.Female && _.age! > 60).length ?? 0,
      'Older Men with disability (60+)':
        personsWD.filter((_) => _.gender === Person.Gender.Male && _.age! > 60).length ?? 0,
    }
  }
}
