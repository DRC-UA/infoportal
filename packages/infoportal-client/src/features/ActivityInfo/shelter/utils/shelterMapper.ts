import {match} from '@axanc/ts-utils'

import {DrcProgram, DrcProject, groupBy, IKoboMeta, Person, ShelterTaPriceLevel} from 'infoportal-common'

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

const cashIndicators = [
  'CLSHL/CA4/IN3', // # of people supported with light repairs (cash and  vouchers)
  'CLSHL/CA4/IN9', // # of people supported through repairs of common  spaces (cash and vouchers)
  'CLSHL/CA6/IN3', // # of people supported with  cash for utilities (cash and vouchers)
  'CLSHL/CA6/IN5', // # of people supported with winter energy (cash and  vouchers)
]

const winterizationIndicators = [
  'CLSHL/CA6/IN3', // # of people supported with  cash for utilities (cash and vouchers)
  'CLSHL/CA6/IN5', // # of people supported with winter energy (cash and  vouchers)
]

const shelterMapper = async ({data, period}: {data: IKoboMeta[]; period: string}): Promise<Bundle[]> => {
  let i = 0

  const dataWithIndicator = data.flatMap(
    ({persons, displacement: _dropTopLevelDisplacement, activity, sector, ...rest}) => {
      const indicator = pickIndicatorByProgram({
        activity: match(activity)
          .cases({
            [DrcProgram.ShelterRepair]: match(rest.tags?.damageLevel)
              .cases({
                [ShelterTaPriceLevel.Heavy]: ShelterTaPriceLevel.Medium,
                [ShelterTaPriceLevel.Medium]: ShelterTaPriceLevel.Medium,
                [ShelterTaPriceLevel.Light]: ShelterTaPriceLevel.Light,
              })
              .default(ShelterTaPriceLevel.Medium),
            [DrcProgram.ShelterCommonSpacesRepair]: match(rest.modality)
              .cases({Cash: 'common-spaces-cash'})
              .default('common-spaces-in-kind'),
          })
          .default(activity),
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
        console.log({ageGender})
        const [_namePart, isoPart] = (settlement as string).split('_')
        const settlementIso = isoPart?.toUpperCase() ?? settlement
        const recordId = `drcsnfi${period.replace('-', '')}${String(++i).padStart(5, '0')}`
        const activity = {
          Indicator: indicator,
          ...(cashIndicators.includes(indicator) && ({'Cash: Restriction': 'RES'} as const)),
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
          ...((ageGender as string) !== 'undefined' && {'Age & Sex': ageSexGroup2AiCodeMapper(ageGender)}),
          'Reached/Delivered - New Non-repeated (Manual)': records.length,
        } as const

        const areThereDisabilities = records.some(({disability}) => disability && Boolean(disability[0]))

        return [
          activityReportMaker({
            activity,
            data: records,
            recordId,
            activityLabelMaker: labelActivities,
            requestBodyBuilder: buildProtectionRequest,
          }),
          ...(areThereDisabilities
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

export {shelterMapper}
