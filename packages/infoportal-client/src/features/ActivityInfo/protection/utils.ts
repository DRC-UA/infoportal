import {match} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {DrcProgram, groupBy, IKoboMeta, OblastIndex, Person} from 'infoportal-common'

import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'
import {
  ageSexMapper,
  AiType51aMonitoring,
  ALERT,
  buildVaRequest,
  drcToAiProject,
  periodMapper,
  type AiTableData,
} from '@/features/ActivityInfo/shared'

type Bundle = AiTableData<AiType51aMonitoring.Type>

const ageGenderMatcher = (age: number | undefined, gender: Person.Gender) => {
  if (age === undefined) return undefined
  if (age > 0 && age < 18) {
    return match(gender)
      .cases({
        [Person.Gender.Male]: 'Boys' as const,
        [Person.Gender.Female]: 'Girls' as const,
      })
      .default(undefined)
  }
  if (age >= 18 && age < 60) {
    return match(gender)
      .cases({
        [Person.Gender.Male]: 'Adult Men' as const,
        [Person.Gender.Female]: 'Adult Women' as const,
      })
      .default(undefined)
  }
  if (age >= 60) {
    return match(gender)
      .cases({
        [Person.Gender.Male]: 'Elderly Men' as const,
        [Person.Gender.Female]: 'Elderly Women' as const,
      })
      .default(undefined)
  }
}

const mapVictimAssistance = async (data: IKoboMeta[], periodStr: string): Promise<Bundle[]> => {
  let i = 0

  return await Promise.all(
    groupBy({
      data,
      groups: [
        {by: ({formId}) => formId},
        {by: ({activity}) => activity!},
        {by: ({project}) => project[0]},
        {by: ({oblast}) => oblast},
        {by: ({raion}) => raion!},
        {by: ({hromada}) => hromada!},
        {by: ({settlement}) => settlement!},
      ],
      finalTransform: async (group, [_formId, drcProgram, project, oblast, raion, hromada, settlement]) => {
        const activityBase = {
          Project: drcToAiProject(project),
          // 'Coordination Entity': 'CLPRO - Protection Cluster',
          Indicator: match(drcProgram)
            .cases({[DrcProgram.TIA]: 'CLPRO/CA14/IN1'}) // CLPRO/CA14/IN1 - # of children and caregivers who have been affected by landmine or other explosive weapons received by prevention and/or survivor assistance interventions (cash and vouchers)'
            .default(ALERT as any),
          'Implementing Partner': 'DRC - Danish Refugee Council',
          'Strategic Priority': 'PLHUKR26/SP1', // PLHUKR26/SP1 - SP1: Front-line response
          'Reporting Period': periodMapper(periodStr),
          'Cash: Restriction': 'RES',
          'Oblast (Admin1)': OblastIndex.byName(oblast).iso,
          'Raion (Admin2)': UaLocation.Raion.findByName(raion)?.iso! as AiType51aMonitoring.Type['Raion (Admin2)'],
          'Hromada (Admin3)': UaLocation.Hromada.findByName(hromada)
            ?.iso as AiType51aMonitoring.Type['Hromada (Admin3)'],
          'Settlement (Admin4)': settlement!,
        } as const

        return groupBy({
          data: group.flatMap(({persons, ...rest}) => persons?.map((person) => ({...person, ...rest}))) as (IKoboMeta &
            Person.Details)[],
          groups: [
            {by: ({displacement}) => displacement!},
            {by: ({gender, age}) => ageGenderMatcher(age, gender!)!},
            {by: ({disability}) => (disability && disability.length && disability.length > 0 ? 1 : 0)},
          ],
          finalTransform: (record, [displacement, ageGender, disability]) => {
            const recordId = `DRC-PROT-${periodStr}-${String(++i).padStart(5, '0')}`
            const activity = {
              ...activityBase,
              'Population Group': match(displacement)
                .cases({
                  [Person.DisplacementStatus.NonDisplaced]: 'c4zk43vmms4u30z1po7',
                  [Person.DisplacementStatus.Idp]: '',
                  [Person.DisplacementStatus.Refugee]: '',
                  [Person.DisplacementStatus.Returnee]: 'c4zk43vmms4u30z1po7',
                })
                .default(ALERT),
              'Age & Sex': ageSexMapper(ageGender),
              ...(disability === 1 && {Disability: 'DSB'}),
              'Reached/Delivered - New Non-repeated (Manual)': record.length,
            } as const
            const requestBody = ActivityInfoSdk.wrapRequest(buildVaRequest(activity, recordId))

            return {
              activity,
              data: record,
              recordId,
              requestBody,
              submit: requestBody.changes.some(
                ({fields}) => !Object.values(fields).some((value) => (value as string)?.includes('undefined')),
              ),
            }
          },
        }).transforms
      },
    }).transforms,
  ).then((result) => result.flat())
}

export {mapVictimAssistance, type Bundle}
