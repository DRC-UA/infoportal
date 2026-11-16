import {match, seq} from '@axanc/ts-utils'

import {DrcProject, groupBy, IKoboMeta, Person} from 'infoportal-common'

import {
  activityReportMaker,
  ageSexGroup2AiCodeMapper,
  ageSexReference,
  aiPopulationGroupCode,
  ALERT,
  buildRequest,
  meta2AiAgeGenderGroups,
  labelActivities,
  paymentKey2AiCodeMapper,
  pickIndicatorByProgram,
  sharedActivityProps,
  type Bundle,
  type AiType51aMonitoring,
} from '@/features/ActivityInfo/shared'

const ecrecMapper = async ({
  data,
  period,
  uah2usd,
}: {
  data: (IKoboMeta & {amount: number})[]
  period: string
  uah2usd: number
}): Promise<Bundle[]> => {
  let i = 0

  const dataWithIndicator = data.flatMap(
    ({persons, displacement: _dropTopLevelDisplacement, activity, sector, amount, ...rest}) => {
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
        amount: amount / persons.length,
      }))
    },
  ) as (IKoboMeta &
    Person.Details & {
      ageGender: ReturnType<typeof meta2AiAgeGenderGroups>
      indicator: string
      populationGroup: Person.DisplacementStatus
      amount: number
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
        const recordId = `drcfslc${period.replace('-', '')}${String(++i).padStart(5, '0')}`
        const activity = {
          Indicator: indicator,
          ...sharedActivityProps({
            project,
            period,
            sp: 'PLHUKR26/SP4',
            oblast,
            raion,
            hromada,
            settlement: settlementIso,
          }),
          'Population Group': aiPopulationGroupCode[populationGroup as 'Idp' | 'NonDisplaced'],
          'Cash: Restriction': 'URES',
          'Age & Sex': ageSexGroup2AiCodeMapper(ageGender),
          'Cash: Delivery': paymentKey2AiCodeMapper('Bank transfer - to account - BT_ACC'),
          'Reached/Delivered - Total incl. Repeated (Manual)': records.length,
          'Reached/Delivered - New Non-repeated (Manual)': records.length,
          'USD Amount (Manual)': seq(records.map(({amount}) => amount)).sum() * uah2usd,
        } as const

        const areThereDisabilities = records.some(({disability}) => disability && Boolean(disability[0]))

        return [
          activityReportMaker({
            activity,
            data: records,
            recordId,
            activityLabelMaker: labelActivities,
            requestBodyBuilder: buildRequest,
          }),
          ...(areThereDisabilities
            ? [
                activityReportMaker({
                  activity,
                  data: records,
                  recordId,
                  activityLabelMaker: labelActivities,
                  requestBodyBuilder: buildRequest,
                  currencyRate: uah2usd,
                  disabilities: true,
                }),
              ]
            : []),
        ]
      },
    }).transforms,
  ).then((result) => result.flat())
}

export {ecrecMapper}
