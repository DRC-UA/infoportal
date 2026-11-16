import {match} from '@axanc/ts-utils'

import {DrcProject, groupBy, IKoboMeta, Person} from 'infoportal-common'

import {
  activityReportMaker,
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

const washMapper = async ({data, period}: {data: IKoboMeta[]; period: string}): Promise<Bundle[]> => {
  let i = 0

  const dataWithIndicator = data.flatMap(
    ({persons, displacement: _dropTopLevelDisplacement, activity, sector, ...rest}) => {
      const indicator = pickIndicatorByProgram({
        activity,
        sector,
      })

      return persons?.map((person) => ({
        ...rest,
        ...person,
        activity,
        sector,
        ageGender: meta2AiAgeGenderGroups(person.age, person.gender!),
        indicator,
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
      indicator: string
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
      ],
      finalTransform: async (records, groups) => {
        const [project, indicator, oblast, raion, hromada, settlement, populationGroup, ageGender] = groups as [
          DrcProject,
          AiType51aMonitoring.Type['Indicator'],
          string,
          string,
          string,
          string,
          Person.DisplacementStatus,
          keyof typeof ageSexReference,
        ]
        const [_namePart, isoPart] = (settlement as string).split('_')
        const settlementIso = isoPart?.toUpperCase() ?? settlement
        const recordId = `drcwash${period.replace('-', '')}${String(++i).padStart(5, '0')}`
        const activity = {
          Indicator: indicator,
          ...sharedActivityProps({
            project,
            period,
            sp: 'PLHUKR26/SP1', // populationGroup === 'Idp' ? 'PLHUKR26/SP2' : 'PLHUKR26/SP1',
            oblast,
            raion,
            hromada,
            settlement: settlementIso,
          }),
          'Population Group': aiPopulationGroupCode[populationGroup as 'Idp' | 'NonDisplaced'],
          'Age & Sex': ageSexGroup2AiCodeMapper(ageGender),
          'Reached/Delivered - New Non-repeated (Manual)': records.length,
        } as const

        const areDisabilities = records.some(({disability}) => disability && Boolean(disability[0]))

        return [
          activityReportMaker({
            activity,
            data: records,
            recordId,
            activityLabelMaker: labelActivities,
            requestBodyBuilder: buildProtectionRequest,
          }),
          ...(areDisabilities
            ? [
                activityReportMaker({
                  activity,
                  data: records,
                  recordId,
                  activityLabelMaker: labelActivities,
                  requestBodyBuilder: buildProtectionRequest,
                  disabilities: true,
                }),
              ]
            : []),
        ]
      },
    }).transforms,
  ).then((result) => result.flat())
}

export {washMapper}
