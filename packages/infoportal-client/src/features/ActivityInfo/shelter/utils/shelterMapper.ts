import {match} from '@axanc/ts-utils'

import {DrcProgram, DrcProject, groupBy, IKoboMeta, Person, ShelterTaPriceLevel} from 'infoportal-common'

import {
  ageSexGroup2AiCodeMapper,
  ageSexReference,
  aiPopulationGroupCode,
  buildProtectionRequest,
  meta2AiAgeGenderGroups,
  labelActivities,
  pickIndicatorByProgram,
  sharedActivityProps,
  type Bundle,
  type AiType51aMonitoring,
} from '@/features/ActivityInfo/shared'

const shelterMapper = async ({data, period}: {data: IKoboMeta[]; period: string}): Promise<Bundle[]> => {
  let i = 0

  const dataWithIndicator = data.flatMap(
    ({persons, displacement: _dropTopLevelDisplacement, activity, sector, ...rest}) => {
      return persons?.map((person) => ({
        ...rest,
        ...person,
        activity,
        sector,
        ageGender: meta2AiAgeGenderGroups(person.age, person.gender!),
        indicator: pickIndicatorByProgram({
          activity:
            activity === DrcProgram.ShelterRepair
              ? match(rest.tags?.damageLevel)
                  .cases({
                    [ShelterTaPriceLevel.Heavy]: ShelterTaPriceLevel.Medium,
                    [ShelterTaPriceLevel.Medium]: ShelterTaPriceLevel.Medium,
                    [ShelterTaPriceLevel.Light]: ShelterTaPriceLevel.Light,
                  })
                  .default(ShelterTaPriceLevel.Medium)
              : activity,
          sector,
        }),
        populationGroup: match(person.displacement)
          .cases({
            [Person.DisplacementStatus.Idp]: Person.DisplacementStatus.Idp,
          })
          .default(Person.DisplacementStatus.NonDisplaced),
      }))
    },
  ) as (IKoboMeta &
    Person.Details & {
      ageGender: ReturnType<typeof meta2AiAgeGenderGroups>
    } & {indicator: string} & {
      populationGroup: Person.DisplacementStatus
    })[]

  return await Promise.all(
    groupBy({
      data: dataWithIndicator,
      groups: [
        {by: ({project}) => project[0]},
        {by: ({indicator}) => indicator!},
        {by: ({oblast}) => oblast},
        {by: ({raion}) => raion!},
        {by: ({hromada}) => hromada!},
        {by: ({settlement}) => settlement?.toUpperCase()!},
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
        const settlementIso = isoPart?.toUpperCase() ?? settlement
        const recordId = `drcsnfi${period.replace('-', '')}${String(++i).padStart(5, '0')}`
        const activity = {
          Indicator: indicator,
          ...sharedActivityProps({
            project,
            period,
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
              return (value as string)?.includes && (value as string)?.includes('undefined')
            })
          }),
        }
      },
    }).transforms,
  ).then((result) => result.flat())
}

export {shelterMapper}
