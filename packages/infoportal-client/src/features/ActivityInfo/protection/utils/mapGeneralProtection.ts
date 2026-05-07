import {match} from '@axanc/ts-utils'

import {groupBy, IKoboMeta, Person, DrcProject} from 'infoportal-common'

import {
  ageSexGroup2AiCodeMapper,
  ageSexReference,
  aiPopulationGroupCode,
  ALERT,
  buildProtectionRequest,
  meta2AiAgeGenderGroups,
  PROGRAM_PREFIXES,
  type Bundle,
  type AiType51aMonitoring,
} from '@/features/ActivityInfo/shared'

import {labelActivities, pickIndicatorByProgram, sharedActivityProps} from './shared'

const mapGeneralProtection = async (data: IKoboMeta[], periodString: string): Promise<Bundle[]> => {
  let i = 0
  const dataFlatByPersonWithIndicator = data.flatMap(({persons, displacement: _dropTopLevelDisplacement, ...rest}) => {
    return persons?.map((person) => ({
      ...rest,
      ...person,
      ageGender: meta2AiAgeGenderGroups(person.age, person.gender!),
      indicator: pickIndicatorByProgram(rest.activity),
      populationGroup: match(person.displacement)
        .cases({
          [Person.DisplacementStatus.Idp]: Person.DisplacementStatus.Idp,
        })
        .default(Person.DisplacementStatus.NonDisplaced),
    }))
  }) as (IKoboMeta &
    Person.Details & {
      ageGender: ReturnType<typeof meta2AiAgeGenderGroups>
    } & {indicator: string} & {
      populationGroup: Person.DisplacementStatus
    })[]
  return await Promise.all(
    groupBy({
      data: dataFlatByPersonWithIndicator,
      groups: [
        {by: ({project}) => project[0]},
        {by: ({indicator}) => indicator!},
        {by: ({oblast}) => oblast},
        {by: ({raion}) => raion!},
        {by: ({hromada}) => hromada!},
        {by: ({settlement}) => settlement!},
        {by: ({populationGroup}) => populationGroup!},
        {by: ({ageGender}) => ageGender!},
        {by: ({disability}) => (disability && Boolean(disability[0]) ? 1 : 0)},
      ],
      finalTransform: async (record, groups) => {
        const [project, indicator, oblast, raion, hromada, settlement, populationGroup, ageGender, disability] =
          groups as [
            DrcProject,
            AiType51aMonitoring.Type['Indicator'],
            string,
            string,
            string,
            string,
            Person.DisplacementStatus,
            keyof typeof ageSexReference,
            '0' | '1',
          ]
        const [_namePart, isoPart] = (settlement as string).split('_')
        const settlementIso = isoPart ?? settlement

        const recordId = `${PROGRAM_PREFIXES.drcprot}${periodString.replace('-', '')}${String(++i).padStart(5, '0')}`
        const activity = {
          Indicator: indicator,
          ...sharedActivityProps({
            project,
            periodString,
            sp: 'PLHUKR26/SP1',
            oblast,
            raion,
            hromada,
            settlement: settlementIso,
          }),
          'Population Group': aiPopulationGroupCode[populationGroup as 'Idp' | 'NonDisplaced'],
          'Age & Sex': ageSexGroup2AiCodeMapper(ageGender),
          ...(disability === '1' && {Disability: 'DSB' as const}),
          'Reached/Delivered - New Non-repeated (Manual)': record.length,
        } as const

        const requestBody = buildProtectionRequest(activity, recordId)

        return {
          activity: labelActivities(activity, record),
          data: record,
          recordId,
          requestBody,
          submit: requestBody.changes.some(({fields}) => {
            return !Object.values(fields).some((value) => {
              console.log(value)
              return (value as string)?.includes && (value as string)?.includes('undefined')
            })
          }),
        }
      },
    }).transforms,
  ).then((result) => result.flat())
}

export {mapGeneralProtection}
