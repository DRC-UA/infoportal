import {match, type Seq} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {DrcProgram, DrcProject, IKoboMeta, insideObjectOut, OblastIndex, Person} from 'infoportal-common'

import {
  ageSexMapper,
  ageSexReference,
  aiPopulationGroupCode,
  aiProjectCode2Name,
  ALERT,
  drc2AiProjectCode,
  periodIdReference,
  periodMapper,
  type AiType51aMonitoring,
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
                'CLPRO/CA6/IN2':
                  'CLPRO/CA6/IN2 - # of people who received protection information or  counselling (PRT)',
              })
              .default(`${ALERT} ${value}`),
          ],
        })
        .default([key, value]),
    ),
  )
}

const sharedActivityProps = ({
  project,
  drcProgram,
  periodString,
  sp,
  oblast,
  raion,
  hromada,
  settlement,
}: {
  project: DrcProject
  drcProgram: DrcProgram
  periodString: string
  sp: 'PLHUKR26/SP1' | 'PLHUKR26/SP2' | 'PLHUKR26/SP3' | 'PLHUKR26/SP4'
  oblast: string
  raion: string
  hromada: string
  settlement: string
}) =>
  ({
    Project: drc2AiProjectCode(project),
    Indicator: match(drcProgram)
      .cases({
        [DrcProgram.TIA]: 'CLPRO/CA14/IN1', // CLPRO/CA14/IN1 - # of children and caregivers who have been affected by landmine or other explosive weapons received by prevention and/or survivor assistance interventions (cash and vouchers)
        [DrcProgram.Counselling]: 'CLPRO/CA6/IN2', // CLPRO/CA6/IN2 - # of people who received protection information or  counselling (PRT)
      })
      .default(ALERT as any),
    'Implementing Partner': 'DRC - Danish Refugee Council',
    'Strategic Priority': sp,
    'Reporting Period': periodMapper(periodString),
    'Oblast (Admin1)': OblastIndex.byName(oblast)?.iso,
    'Raion (Admin2)': UaLocation.Raion.findByName(raion)?.iso as AiType51aMonitoring.Type['Raion (Admin2)'],
    'Hromada (Admin3)': UaLocation.Hromada.findByName(hromada)?.iso as AiType51aMonitoring.Type['Hromada (Admin3)'],
    'Settlement (Admin4)': settlement,
  }) as const

export {labelActivities, sharedActivityProps}
