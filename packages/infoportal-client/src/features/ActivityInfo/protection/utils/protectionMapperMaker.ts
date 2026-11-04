import {match} from '@axanc/ts-utils'

import {DrcProject, groupBy, IKoboMeta, Person} from 'infoportal-common'

import {
  activityRecordMaker,
  ageSexGroup2AiCodeMapper,
  ageSexReference,
  aiPopulationGroupCode,
  buildProtectionRequest,
  labelActivities,
  meta2AiAgeGenderGroups,
  pickIndicatorByProgram,
  sharedActivityProps,
  sp1Oblasts,
  type Bundle,
  type AiType51aMonitoring,
} from '@/features/ActivityInfo/shared'

const protectionMapperMaker =
  (prefix: string) =>
  async ({data, period}: {data: IKoboMeta[]; period: string}): Promise<Bundle[]> => {
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
            activity,
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
          const recordId = `${prefix}${period.replace('-', '')}${String(++i).padStart(5, '0')}`
          const activity = {
            Indicator: indicator,
            ...sharedActivityProps({
              project,
              period,
              sp: sp1Oblasts.includes(oblast) ? 'PLHUKR26/SP1' : 'PLHUKR26/SP4',
              oblast,
              raion,
              hromada,
              settlement: settlementIso,
            }),
            'Population Group': aiPopulationGroupCode[populationGroup as 'Idp' | 'NonDisplaced'],
            'Age & Sex': ageSexGroup2AiCodeMapper(ageGender),
            ...(indicator === 'CLPRO/CA14/IN1' && {'Cash: Restriction': 'RES' as const}),
            'Reached/Delivered - New Non-repeated (Manual)': records.length,
          } as const

          const recordsWithDisabilities = records.filter(({disability}) => disability && Boolean(disability[0]))

          return [
            activityRecordMaker({
              activity,
              data: records,
              recordId,
              activityLabelMaker: labelActivities,
              requestBodyBuilder: buildProtectionRequest,
            }),
            ...(recordsWithDisabilities.length
              ? [
                  activityRecordMaker({
                    activity: {
                      ...activity,
                      Disability: 'DSB',
                      'Reached/Delivered - New Non-repeated (Manual)': recordsWithDisabilities.length,
                    },
                    data: recordsWithDisabilities,
                    recordId: `${recordId}dsb`,
                    activityLabelMaker: labelActivities,
                    requestBodyBuilder: buildProtectionRequest,
                  }),
                ]
              : []),
          ]
        },
      }).transforms,
    ).then((result) => result.flat())
  }

export {protectionMapperMaker}
