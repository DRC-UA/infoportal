import {AILocationHelper, Bn_Re, DrcProject, OblastIndex, Person, PersonDetails, Protection_groupSession} from '@infoportal-common'
import {fnSwitch, PromiseReturn} from '@alexandreannic/ts-utils'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiTypeGeneralProtection} from '@/features/ActivityInfo/Protection/AiTypeGeneralProtection'
import Gender = Person.Gender
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

export namespace AiProtectionMapper {

  type Type = {
    Oblast: AiTypeGeneralProtection.Type['Oblast']
    Raion: AiTypeGeneralProtection.Type['Raion']
    Hromada: AiTypeGeneralProtection.Type['Hromada']
    'Plan/Project Code': AiTypeGeneralProtection.Type['Plan/Project Code']
    'Reporting Month': AiTypeGeneralProtection.TypeSub['Reporting Month']
    'Population Group': AiTypeGeneralProtection.TypeSub['Population Group']
    'Indicators': AiTypeGeneralProtection.TypeSub['Indicators']
    'Adult Men (18-59)': AiTypeGeneralProtection.TypeSub['Adult Men (18-59)']
    'Adult Women (18-59)': AiTypeGeneralProtection.TypeSub['Adult Women (18-59)']
    'Boys (0-17)': AiTypeGeneralProtection.TypeSub['Boys (0-17)']
    'Girls (0-17)': AiTypeGeneralProtection.TypeSub['Girls (0-17)']
    'Older Men (60+)': AiTypeGeneralProtection.TypeSub['Older Men (60+)']
    'Older Women (60+)': AiTypeGeneralProtection.TypeSub['Older Women (60+)']
    'Total Individuals Reached': AiTypeGeneralProtection.TypeSub['Total Individuals Reached']
    'People with Disability'?: AiTypeGeneralProtection.TypeSub['People with Disability']
    answer: Record<string, any>
  }

  const planCode = Object.freeze({
    [DrcProject['UKR-000298 Novo-Nordisk']]: 'PRT-DRC-00001',
    [DrcProject['UKR-000309 OKF']]: 'PRT-DRC-00002',
    [DrcProject['UKR-000314 UHF4']]: 'PRT-DRC-00003',
    [DrcProject['UKR-000322 ECHO2']]: 'PRT-DRC-00004',
    [DrcProject['UKR-000345 BHA2']]: 'PRT-DRC-00005',
    [DrcProject['UKR-000336 UHF6']]: 'PRT-DRC-00006',
    [DrcProject['UKR-000330 SDC2']]: 'PRT-DRC-00007',
  })

  export const mapHhs = (reportingMonth: string) => (res: PromiseReturn<ReturnType<ApiSdk['kobo']['typedAnswers']['searchProtection_hhs3']>>) => {
    const data: Type[] = []

    res.data.forEach(d => {
      d.persons!.forEach(ind => {
        data.push({
          answer: d,
          Oblast: AILocationHelper.findOblast(OblastIndex.byIso(d.where_are_you_current_living_oblast!).name)!,
          Raion: AILocationHelper.findRaionByIso(d.where_are_you_current_living_raion)?._5w as any,
          Hromada: AILocationHelper.findHromadaByIso(d.where_are_you_current_living_hromada!)?._5w as any,
          ...AiMapper.disaggregatePersons([ind]),
          'Reporting Month': reportingMonth,
          'Plan/Project Code': fnSwitch(d.tags?.projects?.[0]!, planCode, () => undefined)!,
          'Population Group': fnSwitch(d.do_you_identify_as_any_of_the_following!, {
            returnee: 'Returnees',
            idp: 'Internally Displaced',
            non_displaced: 'Non-Displaced',
          }, () => {
            // throw new Error(`Population Group should be defined Group session ${d.id}`)
            return 'Non-Displaced'
          }),
          'Indicators': '# of individuals reached through protection monitoring at the household level',
        })
      })
    })
    return data
  }

  export const mapGroupSession = (reportingMonth: string) => (res: PromiseReturn<ReturnType<ApiSdk['kobo']['typedAnswers']['searchProtection_groupSession']>>) => {
    const data: Type[] = []

    res.data.forEach(d => {
      const project = fnSwitch(d.project!, {
        bha: DrcProject['UKR-000345 BHA2'],
        echo: DrcProject['UKR-000322 ECHO2'],
        novo: DrcProject['UKR-000298 Novo-Nordisk'],
        okf: DrcProject['UKR-000309 OKF'],
        uhf4: DrcProject['UKR-000314 UHF4'],
        uhf6: DrcProject['UKR-000336 UHF6'],
      }, () => undefined)
      d.hh_char_hh_det!.forEach(ind => {
        data.push({
          answer: d,
          ...AiMapper.getLocation(d),
          ...AiMapper.disaggregatePersons([{
            age: ind.hh_char_hh_det_age,
            gender: fnSwitch(ind.hh_char_hh_det_gender!, {
              female: Gender.Female,
              male: Gender.Male,
              other: Gender.Other,
            }, () => undefined)
          }]),
          'Reporting Month': reportingMonth,
          'Plan/Project Code': fnSwitch(project!, planCode, () => undefined)!,
          'Population Group': fnSwitch(ind.hh_char_hh_det_status!, {
            returnee: 'Returnees',
            idp: 'Internally Displaced',
            'non-displaced': 'Non-Displaced',
          }, () => {
            // throw new Error(`Population Group should be defined Group session ${d.id}`)
            return 'Non-Displaced'
          }),
          // 'Indicators': '# of persons who participated in awareness raising activities - GP',
          'Indicators': '# of individuals who participated in awareness raising activities on Protection',
        })
      })
    })
    return data
  }

  export const mapCommunityMonitoring = (reportingMonth: string) => (res: PromiseReturn<ReturnType<ApiSdk['kobo']['typedAnswers']['searchProtection_communityMonitoring']>>) => {
    const data: Type[] = []
    res.data.forEach(d => {
      switch (d.activity) {
        case 'kll': {
          data.push({
            answer: d,
            ...AiMapper.getLocation(d),
            ...AiMapper.disaggregatePersons([{
              age: d.informant_age,
              gender: fnSwitch(d.informant_gender!, {
                female: Gender.Female,
                male: Gender.Male,
                other: Gender.Other,
              }, () => undefined)
            }]),
            'Reporting Month': reportingMonth,
            'Plan/Project Code': fnSwitch(d.tags?.project!, planCode, () => undefined)!,
            'Population Group': fnSwitch(d.informant_status!, {
              returnee: 'Returnees',
              idp: 'Internally Displaced',
              'non-displaced': 'Non-Displaced',
            }, () => {
              return 'Non-Displaced'
              // throw new Error(`Population Group should be defined Community Monitoring ${d.id}`)
            }),
            'Indicators': '# of interviews conducted with key informants through community level protection monitoring',
            // 'Indicators': '# of key informants reached through community level protection monitoring',
          })
          break
        }
        case 'fgd': {
          d.hh_char_hh_det!.forEach(ind => {
            data.push({
              answer: d,
              ...AiMapper.getLocation(d),
              ...AiMapper.disaggregatePersons([{
                age: ind.hh_char_hh_det_age,
                gender: fnSwitch(ind.hh_char_hh_det_gender!, {
                  female: Gender.Female,
                  male: Gender.Male,
                  other: Gender.Other,
                }, () => undefined)
              }]),
              'Reporting Month': reportingMonth,
              'Plan/Project Code': fnSwitch(d.tags?.project!, planCode, () => undefined)!,
              'Population Group': fnSwitch(ind.hh_char_hh_det_status!, {
                returnee: 'Returnees',
                idp: 'Internally Displaced',
                'non-displaced': 'Non-Displaced',
              }, () => {
                return 'Non-Displaced'
                // throw new Error(`Population Group should be defined Community Monitoring ${d.id}`)
              }),
              // 'Indicators': '# of key informants reached through community level protection monitoring',
              'Indicators': '# of interviews conducted with key informants through community level protection monitoring',
            })
          })
          break
        }
      }
    })
    return data
  }
}

