import {match, seq} from '@axanc/ts-utils'

import {DrcProject, groupBy, IKoboMeta, Person} from 'infoportal-common'

import {
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
}: {
  data: (IKoboMeta & {amount: number})[]
  period: string
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
          ...(disability === '1' && ({Disability: 'DSB'} as const)),
          'Cash: Delivery': paymentKey2AiCodeMapper('Bank transfer - to account - BT_ACC'),
          'Reached/Delivered - Total incl. Repeated (Manual)': record.length,
          'Reached/Delivered - New Non-repeated (Manual)': record.length,
          'USD Amount (Manual)': seq(record.map(({amount}) => amount)).sum() * 0.027,
        } as const

        const requestBody = buildRequest(activity, recordId)

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

/*
const ecrecKoboMapper = async ({
  data,
  period,
}: {
  data: (Ecrec_subsistance.T & {
    formId: Kobo.FormId
    id: Kobo.SubmissionId
  })[]
  period: string
}): Promise<Bundle[]> => {
  let i = 0

  const dataWithIndicator = data.flatMap((answer) => {
    const persons = KoboXmlMapper.Persons.ecrec_subsistance(answer)
    const project = [DrcProjectHelper.search(Ecrec_subsistance.options.back_donor[answer.back_donor!])]
    const oblast = KoboXmlMapper.Location.mapOblast(answer.ben_det_oblast!).name
    const raion = KoboXmlMapper.Location.searchRaion(answer.ben_det_raion).name
    const hromada = KoboXmlMapper.Location.searchHromada(answer.ben_det_hromada).name
    const settlement = answer.ben_det_settlement

    const indicator = pickIndicatorByProgram({
      activity: match(answer.type_assistance)
        .cases({
          agricultural: DrcProgram.SectoralCashForAgriculture,
          mixed: DrcProgram.SectoralCashMixed,
        })
        .default(undefined),
      sector: DrcSector.Livelihoods,
    })

    return persons?.map((person) => ({
      ...person,
      formId: answer.formId,
      project,
      indicator,
      oblast,
      raion,
      hromada,
      settlement,
      ageGender: meta2AiAgeGenderGroups(person.age, person.gender!),
      populationGroup: match(person.displacement)
        .cases({
          [Person.DisplacementStatus.Idp]: Person.DisplacementStatus.Idp,
        })
        .default(Person.DisplacementStatus.NonDisplaced),
      amount: 20960 / persons.length,
    }))
  })

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
          ...(disability === '1' && ({Disability: 'DSB'} as const)),
          'Cash: Delivery': paymentKey2AiCodeMapper('Bank transfer - to account - BT_ACC'),
          'Reached/Delivered - Total incl. Repeated (Manual)': record.length,
          'Reached/Delivered - New Non-repeated (Manual)': record.length,
          'USD Amount (Manual)': seq(record.map(({amount}) => amount)).sum() * 0.027,
        } as const

        const requestBody = buildRequest(activity, recordId)

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
*/
export {ecrecMapper}
