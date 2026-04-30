import {match, type Seq} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {DrcProgram, groupBy, IKoboMeta, insideObjectOut, OblastIndex, Person} from 'infoportal-common'

import {
  ageSexMapper,
  ageSexReference,
  aiPopulationGroupCode,
  aiProjectCode2Name,
  AiType51aMonitoring,
  AiMapper,
  ALERT,
  buildVaRequest,
  drc2AiProjectCode,
  meta2AiAgeGender,
  periodIdReference,
  periodMapper,
  PROGRAM_PREFIXES,
  type Bundle,
} from '@/features/ActivityInfo/shared'

const checkForReplacement = ({before, after}: {before: string | undefined; after: string | undefined}) => {
  if (!before || !after) {
    return
  }

  return before !== after ? `${after} (replacement for original "${before}")` : after
}

const labelActivities = (activity: Bundle['activity'], data: Seq<IKoboMeta & Person.Details>): Bundle['activity'] => {
  return Object.fromEntries(
    Object.entries(activity).map(([key, value]) =>
      match(key)
        .cases({
          Project: [key, aiProjectCode2Name(value as string)],
          'Age & Sex': [
            key,
            insideObjectOut(ageSexReference)[value as ReturnType<typeof ageSexMapper>] ?? `${ALERT} ${value}`,
          ],
          'Reporting Period': [
            key,
            insideObjectOut(periodIdReference)[value as (typeof periodIdReference)[keyof typeof periodIdReference]] ??
              `${ALERT} ${value}`,
          ],
          'Population Group': [
            key,
            checkForReplacement({
              before: data[0].displacement as string | undefined,
              after: insideObjectOut(aiPopulationGroupCode)[value as aiPopulationGroupCode],
            }) ?? `${ALERT} ${value}`,
          ],
          'Oblast (Admin1)': [key, data[0].oblast ?? `${ALERT} ${value}`],
          'Raion (Admin2)': [key, data[0].raion ?? `${ALERT} ${value}`],
          'Hromada (Admin3)': [key, data[0].hromada ?? `${ALERT} ${value}`],
          'Settlement (Admin4)': [key, data[0].settlement ?? `${ALERT} ${value}`],
          'Cash: Restriction': [
            key,
            match(value).cases({RES: 'Restricted', URES: 'Unrestricted'}).default(`${ALERT} ${value}`),
          ],
          Indicator: [
            key,
            match(value)
              .cases({
                'CLPRO/CA14/IN1':
                  'CLPRO/CA14/IN1 - # of children and caregivers who have been affected  by landmine or other explosive weapons received by prevention and/or survivor  assistance interventions (cash and vouchers)',
              })
              .default(`${ALERT} ${value}`),
          ],
        })
        .default([key, value]),
    ),
  )
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
        const [namePart, isoPart] = settlement.split('_')
        const settlementName = namePart ?? settlement
        const settlementIso = isoPart ?? settlement
        const aiLocation = await AiMapper.getLocationRecordIdByMeta({
          oblast,
          raion,
          hromada,
          settlement: settlementIso,
        })

        const activityBase = {
          Project: drc2AiProjectCode(project),
          Indicator: match(drcProgram)
            .cases({[DrcProgram.TIA]: 'CLPRO/CA14/IN1'}) // CLPRO/CA14/IN1 - # of children and caregivers who have been affected by landmine or other explosive weapons received by prevention and/or survivor assistance interventions (cash and vouchers)'
            .default(ALERT as any),
          'Implementing Partner': 'DRC - Danish Refugee Council',
          'Strategic Priority': 'PLHUKR26/SP3', // PLHUKR26/SP3 - SP3: response to strikes
          'Reporting Period': periodMapper(periodStr),
          'Cash: Restriction': 'RES',
          'Oblast (Admin1)': OblastIndex.byName(oblast).iso,
          'Raion (Admin2)': UaLocation.Raion.findByName(raion)?.iso! as AiType51aMonitoring.Type['Raion (Admin2)'],
          'Hromada (Admin3)': UaLocation.Hromada.findByName(hromada)
            ?.iso as AiType51aMonitoring.Type['Hromada (Admin3)'],
          'Settlement (Admin4)': settlementIso?.toUpperCase() ?? '',
        } as const

        return groupBy({
          data: group.flatMap(({persons, displacement: _dropTopLevelDisplacement, ...rest}) => {
            return persons?.map((person) => ({...person, ...rest}))
          }) as (IKoboMeta & Person.Details)[],
          groups: [
            {by: ({displacement}) => displacement!},
            {by: ({gender, age}) => meta2AiAgeGender(age, gender!)!},
            {by: ({disability}) => (disability && Boolean(disability[0]) ? 1 : 0)},
          ],
          finalTransform: (record, [displacement, ageGender, disability]) => {
            const recordId = `${PROGRAM_PREFIXES.drcva}${periodStr.replace('-', '')}${String(++i).padStart(5, '0')}`
            const activity = {
              ...activityBase,
              'Population Group': match(displacement)
                .cases({
                  [Person.DisplacementStatus.Idp]: aiPopulationGroupCode.Idp,
                  [Person.DisplacementStatus.NonDisplaced]: aiPopulationGroupCode.NonDisplaced,
                  [Person.DisplacementStatus.Returnee]: aiPopulationGroupCode.NonDisplaced,
                })
                .default(`${ALERT} - ${displacement}`) as 'c4aty4vmm8k5xgr1vf',
              'Age & Sex': ageSexMapper(ageGender),
              ...(disability === 1 && {Disability: 'DSB' as const}),
              'Reached/Delivered - New Non-repeated (Manual)': record.length,
            } as const
            const requestBody = buildVaRequest(activity, recordId)

            return {
              activity: labelActivities(activity, record),
              data: record,
              recordId,
              requestBody,
              submit: requestBody.changes.some(({fields}) => {
                return !Object.values(fields).some(
                  (value) => (value as string)?.includes && (value as string)?.includes('undefined'),
                )
              }),
            }
          },
        }).transforms
      },
    }).transforms,
  ).then((result) => result.flat())
}

export {mapVictimAssistance}
