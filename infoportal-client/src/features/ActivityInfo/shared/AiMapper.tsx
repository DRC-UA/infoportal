import {AiTypeGeneralProtection} from '@/features/ActivityInfo/Protection/AiTypeGeneralProtection'
import {AILocationHelper, Bn_Re, DisplacementStatus, OblastIndex, Person, PersonDetails, Protection_groupSession} from '@infoportal-common'
import {fnSwitch} from '@alexandreannic/ts-utils'

export namespace AiMapper {

  export type Location = Pick<AiTypeGeneralProtection.Type, 'Oblast' | 'Raion' | 'Hromada'>

  export const getLocation = (d: Pick<Protection_groupSession.T, 'ben_det_oblast' | 'ben_det_hromada' | 'ben_det_raion'>): Location => {
    const oblast = OblastIndex.byKoboName(d.ben_det_oblast!).name
    const raion = AILocationHelper.findRaion(oblast, Bn_Re.options.ben_det_raion[d.ben_det_raion as keyof typeof Bn_Re.options.ben_det_raion] ?? d.ben_det_raion)!
    const hromada = AILocationHelper.findHromada(oblast,
      raion?.en,
      Bn_Re.options.ben_det_hromada[d.ben_det_hromada as keyof typeof Bn_Re.options.ben_det_hromada] ?? d.ben_det_hromada)
    return {
      Oblast: AILocationHelper.findOblast(oblast)!,
      Raion: raion?._5w as any,
      Hromada: hromada?._5w as any,
    }
  }

  export const mapPopulationGroup = (_?: DisplacementStatus): AiTypeGeneralProtection.TypeSub['Population Group'] => {
    return fnSwitch(_!, {
      Idp: 'Internally Displaced',
      Returnee: 'Returnees',
    }, () => 'Non-Displaced')
  }

  export const disaggregatePersons = (persons: PersonDetails[]): {
    'Adult Men (18-59)': number
    'Adult Women (18-59)': number
    'Boys (0-17)': number
    'Girls (0-17)': number
    'Older Men (60+)': number
    'Older Women (60+)': number
    'Total Individuals Reached': number
    'People with Disability': number
    'Girls with disability (0-17)': number,
    'Boys with disability (0-17)': number,
    'Adult Women with disability (18-59)': number,
    'Adult Men with disability (18-59)': number,
    'Older Women with disability (60+)': number,
    'Older Men with disability (60+)': number
  } => {
    const personsDefined = persons.filter(_ => !!_.gender && !!_.age)
    const disaggregation = Person.groupByGenderAndGroup(Person.ageGroup.UNHCR)(personsDefined)
    return {
      'Adult Men (18-59)': disaggregation['18 - 59'].Male ?? 0,
      'Adult Women (18-59)': disaggregation['18 - 59'].Female ?? 0,
      'Boys (0-17)': disaggregation['0 - 17'].Male ?? 0,
      'Girls (0-17)': disaggregation['0 - 17'].Female ?? 0,
      'Older Men (60+)': disaggregation['60+'].Male ?? 0,
      'Older Women (60+)': disaggregation['60+'].Female ?? 0,
      'Total Individuals Reached': personsDefined.length ?? 0,
      'People with Disability': personsDefined.filter(_ => _.disability).length ?? 0,
      'Girls with disability (0-17)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Female && _.age! < 18).length ?? 0,
      'Boys with disability (0-17)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Male && _.age! < 18).length ?? 0,
      'Adult Women with disability (18-59)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Female && _.age! >= 18 && _.age! < 60).length ?? 0,
      'Adult Men with disability (18-59)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Male && _.age! >= 18 && _.age! < 60).length ?? 0,
      'Older Women with disability (60+)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Female && _.age! > 60).length ?? 0,
      'Older Men with disability (60+)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Male && _.age! > 60).length ?? 0,
    }
  }
}