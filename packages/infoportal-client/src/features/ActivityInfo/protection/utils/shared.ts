import {match, type Seq} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {DrcProgram, DrcProject, DrcSector, IKoboMeta, insideObjectOut, Person} from 'infoportal-common'

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

const sp1Oblasts = ['Khersonska', 'Mykolaivska', 'Zaporizka', 'Dnipropetrovska', 'Kharkivska', 'Sumska', 'Chernihivska']

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
                'CLPRO/CA23/IN2':
                  'CLPRO/CA23/IN2 - # of affected-people directly receiving targeted,  life-saving information and guidance to prevent and respond to GBV Risks via  mobile teams',
                'CLPRO/CA26/IN1':
                  'CLPRO/CA26/IN1 - # of affected women and  girls supported through provision of dignity kits',
                'CLPRO/CA28/IN1':
                  'CLPRO/CA28/IN1 - # of affected women and  girls supported through skill-building , recreational, or livelihood  (including vocatinal education) activities',
                'CLPRO/CA30/IN1':
                  'CLPRO/CA30/IN1 - # of non-GBV humanitarian  or frontline workers across sectors receiving capacity strengthening,  including training, refresher courses, orientations or other support',
                'CLPRO/CA5/IN2':
                  'CLPRO/CA5/IN2 - # of people affected receiving legal assistance or  legal counselling (PRT)',
                'CLPRO/CA5/IN3':
                  'CLPRO/CA5/IN3 - # of people affected  receiving house, land and property support (PRT)',
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
  period,
  sp,
  oblast: oblastQuery,
  raion: raionQuery,
  hromada: hromadaQuery,
  settlement,
}: {
  project: DrcProject
  period: string
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
    'Reporting Period': periodMapper(period),
    'Oblast (Admin1)': oblast?.iso as AiType51aMonitoring.Type['Oblast (Admin1)'],
    'Raion (Admin2)': raion?.iso as AiType51aMonitoring.Type['Raion (Admin2)'],
    'Hromada (Admin3)': hromada?.iso as AiType51aMonitoring.Type['Hromada (Admin3)'],
    // Weirdly settlement may === 'null' (string) in Individual Legal Aid form:
    ...(!['null', 'undefined'].includes(settlement) && {'Settlement (Admin4)': settlement}),
  } as const
}

const pickIndicatorByProgram = ({activity, sector}: {activity: DrcProgram | undefined; sector: DrcSector}) => {
  return match(sector)
    .cases({
      [DrcSector.GeneralProtection]: match(activity)
        .cases({
          [DrcProgram.AwarenessRaisingSession]: 'CLPRO/CA6/IN2', // CLPRO/CA6/IN2 - # of people who received protection information or  counselling (PRT)
          [DrcProgram.CommunityLevelPm]: 'CLPRO/CA2/IN3', // CLPRO/CA2/IN3 - # of individuals who participated in  community-based protection activities (PRT)
          [DrcProgram.Counselling]: 'CLPRO/CA6/IN2', // CLPRO/CA6/IN2 - # of people who received protection information or  counselling (PRT)
          [DrcProgram.MHPSSActivities]: 'CLPRO/CA7/IN1', // CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities
          [DrcProgram.PGS]: 'CLPRO/CA7/IN1', // CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities
          [DrcProgram.PSS]: 'CLPRO/CA7/IN1', // CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities
          [DrcProgram.PIS]: 'CLPRO/CA7/IN1', // CLPRO/CA7/IN1 - # of people affected benefitting from age-, gender-  and disability-sensitive psychosocial support through group or individiual  activities
          [DrcProgram.ProtectionAccompaniment]: 'CLPRO/CA1/IN3', // CLPRO/CA1/IN3 - # of people who received other forms of general  social support and services (inc. social accompaniment, home-based care,  social rehabilitation) (PRT)
          [DrcProgram.ProtectionMonitoring]: 'CLPRO/CA12/IN1', // CLPRO/CA12/IN1 - # of people affected participating in monitoring of  protection situations
          [DrcProgram.Referral]: 'CLPRO/CA8/IN1', // CLPRO/CA8/IN1 - # of people affected at  risk who were safely referred and connected to appropriate services in  response (PRT)
        })
        .default(activity) as AiType51aMonitoring.Type['Indicator'],
      [DrcSector.Legal]: match(activity)
        .cases({
          [DrcProgram.AwarenessRaisingSession]: 'CLPRO/CA6/IN2', // CLPRO/CA6/IN2 - # of people who received protection information or  counselling (PRT)
          [DrcProgram.LegalAid]: 'CLPRO/CA5/IN2', // CLPRO/CA5/IN2 - # of people affected receiving legal assistance or  legal counselling (PRT)
          [DrcProgram.LegalCounselling]: 'CLPRO/CA5/IN2', // CLPRO/CA5/IN2 - # of people affected receiving legal assistance or  legal counselling (PRT)
          [DrcProgram.LegalAssistanceCivil]: 'CLPRO/CA5/IN2', // CLPRO/CA5/IN2 - # of people affected receiving legal assistance or  legal counselling (PRT)
          [DrcProgram.LegalAssistanceCivilDocs]: 'CLPRO/CA5/IN2', // CLPRO/CA5/IN2 - # of people affected receiving legal assistance or  legal counselling (PRT)
          [DrcProgram.LegalAssistanceHlp]: 'CLPRO/CA5/IN3', // CLPRO/CA5/IN3 - # of people affected  receiving house, land and property support (PRT)
          [DrcProgram.LegalAssistanceHlpDocs]: 'CLPRO/CA5/IN3', // CLPRO/CA5/IN3 - # of people affected  receiving house, land and property support (PRT)
        })
        .default(activity) as AiType51aMonitoring.Type['Indicator'],
      [DrcSector.VA]: match(activity)
        .cases({
          [DrcProgram.TIA]: 'CLPRO/CA14/IN1', // CLPRO/CA14/IN1 - # of children and caregivers who have been affected by landmine or other explosive weapons received by prevention and/or survivor assistance interventions (cash and vouchers)
        })
        .default(activity) as AiType51aMonitoring.Type['Indicator'],
      [DrcSector.GBV]: match(activity)
        .cases({
          [DrcProgram.AwarenessRaisingSession]: 'CLPRO/CA23/IN2', // CLPRO/CA23/IN2 - # of affected-people directly receiving targeted,  life-saving information and guidance to prevent and respond to GBV Risks via  mobile teams
          [DrcProgram.CapacityBuilding]: 'CLPRO/CA30/IN1', // CLPRO/CA30/IN1 - # of non-GBV humanitarian  or frontline workers across sectors receiving capacity strengthening,  including training, refresher courses, orientations or other support,
          [DrcProgram.DignityKits]: 'CLPRO/CA26/IN1', // CLPRO/CA26/IN1 - # of affected women and  girls supported through provision of dignity kits
          [DrcProgram.WGSS]: 'CLPRO/CA28/IN1', // CLPRO/CA28/IN1 - # of affected women and  girls supported through skill-building , recreational, or livelihood  (including vocatinal education) activities
          // [DrcProgram.PSS]: '',
        })
        .default(activity) as AiType51aMonitoring.Type['Indicator'],
    })
    .default(undefined)
}

export {labelActivities, pickIndicatorByProgram, sharedActivityProps, sp1Oblasts}
