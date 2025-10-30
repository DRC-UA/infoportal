import {match} from '@axanc/ts-utils'
import {aiLocationMap} from 'activityinfo-sdk/location-map'
import {format} from 'date-fns'
import {UaLocation} from 'ua-location'

import {IKoboMeta, Period, Person} from 'infoportal-common'

import {AiFslType} from '@/features/ActivityInfo/Fslc/aiFslcType'
import {AiProtectionType} from '@/features/ActivityInfo/Protection/aiProtectionType'

export namespace AiMapper {
  export const getPeriodStr = (p: Partial<Period>) => {
    if (!p.start || !p.end) return ''
    const start = format(p.start, 'yyyy-MM')
    const end = format(p.end, 'yyyy-MM')
    return start === end ? start : ''
  }

  export type Location = Pick<AiProtectionType.Type, 'Oblast' | 'Raion' | 'Hromada' | 'Settlement'>

  export const getLocationRecordIdByMeta = async (p: {
    oblast: IKoboMeta['oblast']
    raion: IKoboMeta['raion']
    hromada: IKoboMeta['hromada']
    settlement: IKoboMeta['settlement']
  }) => {
    const oblast = UaLocation.Oblast.findByName(p.oblast!)
    const raion = oblast?.raions?.find((_) => _.en === p.raion)
    const hromada = raion?.hromadas?.find((_) => _.en === p.hromada)
    const settlements = await hromada?.getSettlements()
    const settlement = settlements?.find(({iso}) => p.settlement?.toUpperCase() === iso)

    return locationIsoToRecordId({
      Oblast: oblast?.iso,
      Raion: raion?.iso,
      Hromada: hromada?.iso,
      Settlement: settlement?.iso,
    })
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

  export const mapPopulationGroup = (
    status?: Person.DisplacementStatus,
  ): AiFslType.Type['Population Group'] | undefined => {
    return match(status)
      .cases({
        Idp: 'Internally Displaced',
        NonDisplaced: 'Non-Displaced',
        // Returnee: 'Returnees',
        // Refugee: 'Refugees',
      } as const)
      .default(undefined)
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
      'Adult Women with disability (18-59)': personsWD.filter(
        (_) => _.gender === Person.Gender.Female && _.age! >= 18 && _.age! < 60,
      ).length,
      'Adult Men with disability (18-59)': personsWD.filter(
        (_) => _.gender === Person.Gender.Male && _.age! >= 18 && _.age! < 60,
      ).length,
      'Older Women with disability (60+)': personsWD.filter((_) => _.gender === Person.Gender.Female && _.age! >= 60)
        .length,
      'Older Men with disability (60+)': personsWD.filter((_) => _.gender === Person.Gender.Male && _.age! >= 60)
        .length,
    }
  }
}
