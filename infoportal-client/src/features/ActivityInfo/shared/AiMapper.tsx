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
    'Adult Men (18-59)'?: number
    'Adult Women (18-59)'?: number
    'Boys (0-17)'?: number
    'Girls (0-17)'?: number
    'Older Men (60+)'?: number
    'Older Women (60+)'?: number
    'Total Individuals Reached'?: number
    'People with Disability'?: number
    'Girls with disability (0-17)'?: number,
    'Boys with disability (0-17)'?: number,
    'Adult Women with disability (18-59)'?: number,
    'Adult Men with disability (18-59)'?: number,
    'Older Women with disability (60+)'?: number,
    'Older Men with disability (60+)'?: number
  } => {
    const personsDefined = persons.filter(_ => !!_.gender && !!_.age)
    const disaggregation = Person.groupByGenderAndGroup(Person.ageGroup.UNHCR)(personsDefined)
    return {
      'Adult Men (18-59)': disaggregation['18 - 59'].Male,
      'Adult Women (18-59)': disaggregation['18 - 59'].Female,
      'Boys (0-17)': disaggregation['0 - 17'].Male,
      'Girls (0-17)': disaggregation['0 - 17'].Female,
      'Older Men (60+)': disaggregation['60+'].Male,
      'Older Women (60+)': disaggregation['60+'].Female,
      'Total Individuals Reached': personsDefined.length,
      'People with Disability': personsDefined.filter(_ => _.disability).length,
      'Girls with disability (0-17)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Female && _.age! < 18).length,
      'Boys with disability (0-17)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Male && _.age! < 18).length,
      'Adult Women with disability (18-59)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Female && _.age! >= 18 && _.age! < 60).length,
      'Adult Men with disability (18-59)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Male && _.age! >= 18 && _.age! < 60).length,
      'Older Women with disability (60+)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Female && _.age! > 60).length,
      'Older Men with disability (60+)': personsDefined.filter(_ => _.disability && _.gender === Person.Gender.Male && _.age! > 60).length,
    }
  }
}