import {match, type Seq} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {DrcProgram, DrcProject, IKoboMeta, insideObjectOut, Person} from 'infoportal-common'

import {
  ageSexGroup2AiCodeMapper,
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
  if (!before && !after) {
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
            insideObjectOut(ageSexReference)[value as ReturnType<typeof ageSexGroup2AiCodeMapper>] ??
              `${ALERT} ${value}`,
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
                'CLPRO/CA7/IN1':
                  'CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities',
                'CLPRO/CA8/IN1':
                  'CLPRO/CA8/IN1 - # of people affected at  risk who were safely referred and connected to appropriate services in  response (PRT)',
                'CLPRO/CA12/IN1':
                  'CLPRO/CA12/IN1 - # of people affected participating in monitoring of  protection situations',
                'CLPRO/CA1/IN3':
                  'CLPRO/CA1/IN3 - # of people who received other forms of general  social support and services (inc. social accompaniment, home-based care,  social rehabilitation) (PRT)',
                'CLPRO/CA2/IN3':
                  'CLPRO/CA2/IN3 - # of individuals who participated in  community-based protection activities (PRT)',
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
  periodString,
  sp,
  oblast: oblastQuery,
  raion: raionQuery,
  hromada: hromadaQuery,
  settlement,
}: {
  project: DrcProject
  periodString: string
  sp: 'PLHUKR26/SP1' | 'PLHUKR26/SP2' | 'PLHUKR26/SP3' | 'PLHUKR26/SP4'
  oblast: string
  raion: string
  hromada: string
  settlement: string
}) => {
  const oblast = UaLocation.Oblast.findByName(oblastQuery)
  const raion = oblast?.raions?.find(({en}) => en === raionQuery)
  const hromada = raion?.hromadas?.find(({en}) => en === hromadaQuery)

  return {
    Project: drc2AiProjectCode(project),
    'Implementing Partner': 'DRC - Danish Refugee Council',
    'Strategic Priority': sp,
    'Reporting Period': periodMapper(periodString),
    'Oblast (Admin1)': oblast?.iso as AiType51aMonitoring.Type['Oblast (Admin1)'],
    'Raion (Admin2)': raion?.iso as AiType51aMonitoring.Type['Raion (Admin2)'],
    'Hromada (Admin3)': hromada?.iso as AiType51aMonitoring.Type['Hromada (Admin3)'],
    'Settlement (Admin4)': settlement,
  } as const
}

const pickIndicatorByProgram = (drcProgram: DrcProgram | undefined) => {
  return match(drcProgram)
    .cases({
      [DrcProgram.CommunityLevelPm]: 'CLPRO/CA2/IN3', // CLPRO/CA2/IN3 - # of individuals who participated in  community-based protection activities (PRT)
      [DrcProgram.Counselling]: 'CLPRO/CA6/IN2', // CLPRO/CA6/IN2 - # of people who received protection information or  counselling (PRT)
      [DrcProgram.LegalAwarenessRaising]: 'CLPRO/CA6/IN2', // CLPRO/CA6/IN2 - # of people who received protection information or  counselling (PRT)
      [DrcProgram.MHPSSActivities]: 'CLPRO/CA7/IN1', // CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities
      [DrcProgram.PGS]: 'CLPRO/CA7/IN1', // CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities
      [DrcProgram.PSS]: 'CLPRO/CA7/IN1', // CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities
      [DrcProgram.PIS]: 'CLPRO/CA7/IN1', // CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities
      [DrcProgram.ProtectionAccompaniment]: 'CLPRO/CA1/IN3', // CLPRO/CA1/IN3 - # of people who received other forms of general  social support and services (inc. social accompaniment, home-based care,  social rehabilitation) (PRT)
      [DrcProgram.ProtectionAwarenessRasing]: 'CLPRO/CA6/IN2', // CLPRO/CA6/IN2 - # of people who received protection information or  counselling (PRT)
      [DrcProgram.ProtectionMonitoring]: 'CLPRO/CA12/IN1', // CLPRO/CA12/IN1 - # of people affected participating in monitoring of  protection situations
      [DrcProgram.Referral]: 'CLPRO/CA8/IN1', // CLPRO/CA8/IN1 - # of people affected at  risk who were safely referred and connected to appropriate services in  response (PRT)
      [DrcProgram.TIA]: 'CLPRO/CA14/IN1', // CLPRO/CA14/IN1 - # of children and caregivers who have been affected by landmine or other explosive weapons received by prevention and/or survivor assistance interventions (cash and vouchers)
    })
    .default(ALERT) as AiType51aMonitoring.Type['Indicator']
}

export {labelActivities, pickIndicatorByProgram, sharedActivityProps}
