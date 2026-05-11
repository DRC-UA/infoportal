import {match, type Seq} from '@axanc/ts-utils'
import {UaLocation} from 'ua-location'

import {
  DrcProgram,
  DrcProject,
  DrcSector,
  IKoboMeta,
  insideObjectOut,
  Person,
  ShelterTaPriceLevel,
} from 'infoportal-common'

import {ActivityInfoSdk} from '@/core/sdk/server/activity-info/ActiviftyInfoSdk'

import {ALERT} from './constants'
import {AiType51aMonitoring, Bundle} from './types'

const buildRequest = (a: AiType51aMonitoring.Type, recordId: string, parentRecordId: string | null = null) => {
  const {options} = AiType51aMonitoring

  return [
    {
      formId: 'co9uppxmms4u30z1ppd',
      recordId,
      parentRecordId,
      fields: {
        crjesiymkemx9z5q20: a['Project']
          ? 'cki8ts9mms4u30z1ppl' + ':' + options['2.2_Projects'][a['Project']!]
          : undefined,
        cu0zp4hmfc8b4us14k: a['Indicator']
          ? 'c4oosjxmms4u30z1po8' + ':' + options['1.3_Indicators'][a['Indicator']!]
          : undefined,
        c6z4q95mlhxfad84yg: a['Implementing Partner']
          ? 'cezl1y0mms4u30z1poo' + ':' + options['2.1_Partners'][a['Implementing Partner']!]
          : undefined,
        cqd43w0mna8oo3q3tu1: a['Donor']
          ? 'cezl1y0mms4u30z1poo' + ':' + options['2.1_Partners'][a['Donor']!]
          : undefined,
        ckken0mmmoy70rn52rx: a['Global Sector']
          ? 'c16dgctmluvh4121c0f' + ':' + options['G2.4C_Global_Clusters_Sectors'][a['Global Sector']!]
          : undefined,
        cehz88xmna5yojalqe: a['Strategic Priority']
          ? 'c2oqsn2mms4u30z1pow' + ':' + options['1.2_Logframe_Entities'][a['Strategic Priority']!]
          : undefined,
        cq7shsqmkfa9qrnbja: a['Reporting Period']
          ? 'c9umo4zmms4u30z1pom' + ':' + options['Operation_Time_Periods'][a['Reporting Period']!]
          : undefined,
        cwrq9ajmmoyl5nm52s6: a['Cash: Restriction']
          ? 'cbrh939mmktje0r3q8i' + ':' + options['Global_Cash_Restriction'][a['Cash: Restriction']!]
          : undefined,
        c3qow3mkep7nv513us: a['Oblast (Admin1)']
          ? 'cgj58hlmms4u30z1ppf' + ':' + options['Operation_Location_Admin1'][a['Oblast (Admin1)']!]
          : undefined,
        cgz15q5mkep96by13uu: a['Raion (Admin2)']
          ? 'co2lbowmms4u30z1pp3' + ':' + options['Operation_Location_Admin2'][a['Raion (Admin2)']!]
          : undefined,
        c8k4ckgmnafypuoaoi: a['Hromada (Admin3)']
          ? 'csu4204mn7lzgxcz35' + ':' + options['Operation_Location_Admin3'][a['Hromada (Admin3)']!]
          : undefined,
        coi9s8pmnag4pv6aok: a['Settlement (Admin4)']
          ? 'cx60wmrmn7m1v6bz3c' + ':' + options['Operation_Location_Admin4'][a['Settlement (Admin4)']!]
          : undefined,
        cez268lmnag6fd0aom: a['Collective Site']
          ? 'cd5wyikmn7q402a3s7d' + ':' + options['Operation_Location_Sites_Collective_Sites'][a['Collective Site']!]
          : undefined,
        cayuombmnageb6qaoq: a['Education Facility']
          ? 'csbdgetmn7pxpa34lw' +
            ':' +
            options['Operation_Location_Sites_Education_Facilities'][a['Education Facility']!]
          : undefined,
        ct87ocrmnaggzd0aor: a['Health Facility']
          ? 'cdzw5ygmn7pu5g4191' + ':' + options['Operation_Location_Sites_Health_Facilities'][a['Health Facility']!]
          : undefined,
        cir2x9xmoa7bc1dpk: a['Health Facility (Other)'],
        cgmnxb3mnaglzgiaot: a['Transit Centre']
          ? 'cbogrn0mn7q3eq64lx' + ':' + options['Operation_Location_Sites_Transit_Centres'][a['Transit Centre']!]
          : undefined,
        c6dowjymnagw1rmap2: a['Health Site Type']
          ? 'c4cmmf8mn7ylwsi1m9r' + ':' + options['Operation_Site_Types_Health'][a['Health Site Type']!]
          : undefined,
        c1pbo1cmkepe9ny13v0: a['Population Group']
          ? 'c4zk43vmms4u30z1po7' + ':' + options['Operation_Population_Types'][a['Population Group']!]
          : undefined,
        cugmnitmkepcpni13uy: a['Age & Sex']
          ? 'c27ard5mms4u30z1pp7' + ':' + options['Operation_Combination_Ages_Sexes'][a['Age & Sex']!]
          : undefined,
        cti2dzimkepfjvs13v2: a['Disability']
          ? 'ccctq99mluvh4121byz' + ':' + options['Global_Disabilities'][a['Disability']!]
          : undefined,
        ce596f1mnagr2h7aoy: a['Education Learning Modality']
          ? 'ci5fi3rmn81wduq1ma0' +
            ':' +
            options['Operation_Education_Learning_Modalities'][a['Education Learning Modality']!]
          : undefined,
        cs56snrmnag9an5aoo: a['Education Level']
          ? 'cmmgqgsmn80kxdz4ou' + ':' + options['Operation_Site_Types_Education'][a['Education Level']!]
          : undefined,
        c42j285mnagsqpfap0: a['Health Accreditation Type']
          ? 'cvmtdismn83088h1bi' +
            ':' +
            options['Operation_Health_Accreditation_Types'][a['Health Accreditation Type']!]
          : undefined,
        cvllgmemnahcq78ap4: a['WASH Recipient Type']
          ? 'c4or1ofmn80qpcw1m9x' + ':' + options['Operation_Recipient_Types_WASH'][a['WASH Recipient Type']!]
          : undefined,
        cwl8s4mmmoyy3ys52sd: a['Cash: Conditionality Type']
          ? 'clquca5mms4u30z1ppw' +
            ':' +
            options['Operation_Cash_Conditionality_Types'][a['Cash: Conditionality Type']!]
          : undefined,
        cnj5mjfmmoz1aj652sf: a['Cash: Delivery']
          ? 'cu1jf6vmms4u30z1pos' + ':' + options['Operation_Cash_Delivery'][a['Cash: Delivery']!]
          : undefined,
        cf1cc5dmnahgbcqap5: a['Cash: Pilot Type']
          ? 'c9n8iebmn81ghfd4ox' + ':' + options['Operation_Cash_Pilot_Types'][a['Cash: Pilot Type']!]
          : undefined,
        cj9v8eemnahqdr2ap8: a['Cash: Recipient Type']
          ? 'c5m0u6wmn8126kp3t85' + ':' + options['Operation_Recipient_Types_CVA'][a['Cash: Recipient Type']!]
          : undefined,
        cyz6phumnagpa03aow: a['Payment Frequency']
          ? 'ctc2o7bmn835c0l4oy' + ':' + options['Operation_Payment_Frequencies'][a['Payment Frequency']!]
          : undefined,
        c4ybaccmnipzzvu1683: a['Frequency']
          ? 'csq26brmniptm5q391' + ':' + options['Operation_Food_Frequencies'][a['Frequency']!]
          : undefined,
        caods5gmmozb2yy52sj: a['Project Target (External Calc)'],
        czfu9tnmj0jm5hvfv: a['Previous Periodic Measure (External Calc)'],
        c200nr6mj0j6i89fq: a['Reached/Delivered - Total incl. Repeated (Manual)'],
        c27qt22mj0jhkhhfr: a['Reached/Delivered - Total incl. Repeated (External Calc)'],
        ctdr9mymncwrd3g5b7: a['Reached/Delivered - New Non-repeated (Manual)'],
        cqs5ekwmncwru275b8: a['Reached/Delivered - New Non-repeated (External Calc)'],
        cypk86zmmozfbpz52so: a['Previous Cumulative Measure (External Calc)'],
        cy5kbi0mmozif8j52ss: a['Cumulative Measure (External Calc)'],
        cqpzxh8mncwupww5bc: a['USD Amount (Manual)'],
        codt66vmncww8w45bd: a['USD Amount (External Calc)'],
        csqw7qvmncx51r45bi: a['Number of Months (Manual)'],
        ccb3tyfmncx5n725bj: a['Number of Months (External Calc)'],
        cho6421mncx8wan5bn: a['Description (Manual)'],
        cys3yzmmncxade75bo: a['Description (External Calc)'],
        cvhfc2mnit0zwt36n: a['Kilocalories (Manual)'],
        cxxyxfgmnit1tq436o: a['Kilocalories (External Calc)'],
      },
    },
  ]
}

const buildVaRequest = (
  a: Partial<AiType51aMonitoring.Type>,
  recordId: string,
  parentRecordId: string | null = null,
) => {
  const {options} = AiType51aMonitoring

  return ActivityInfoSdk.wrapRequest([
    {
      formId: 'co9uppxmms4u30z1ppd',
      recordId,
      parentRecordId,
      fields: {
        crjesiymkemx9z5q20: a['Project'] ? 'cki8ts9mms4u30z1ppl' + ':' + options['2.2_Projects'][a['Project']!] : ALERT,
        cu0zp4hmfc8b4us14k: a['Indicator']
          ? 'c4oosjxmms4u30z1po8' + ':' + options['1.3_Indicators'][a['Indicator']!]
          : ALERT,
        c6z4q95mlhxfad84yg: a['Implementing Partner']
          ? 'cezl1y0mms4u30z1poo' + ':' + options['2.1_Partners'][a['Implementing Partner']!]
          : ALERT,
        cehz88xmna5yojalqe: a['Strategic Priority']
          ? 'c2oqsn2mms4u30z1pow' + ':' + options['1.2_Logframe_Entities'][a['Strategic Priority']!]
          : ALERT,
        cq7shsqmkfa9qrnbja: a['Reporting Period']
          ? 'c9umo4zmms4u30z1pom' + ':' + options['Operation_Time_Periods'][a['Reporting Period']!]
          : ALERT,
        cwrq9ajmmoyl5nm52s6: a['Cash: Restriction']
          ? 'cbrh939mmktje0r3q8i' + ':' + options['Global_Cash_Restriction'][a['Cash: Restriction']!]
          : undefined,
        c3qow3mkep7nv513us: a['Oblast (Admin1)']
          ? 'cgj58hlmms4u30z1ppf' + ':' + options['Operation_Location_Admin1'][a['Oblast (Admin1)']!]
          : ALERT,
        cgz15q5mkep96by13uu: a['Raion (Admin2)']
          ? 'co2lbowmms4u30z1pp3' + ':' + options['Operation_Location_Admin2'][a['Raion (Admin2)']!]
          : ALERT,
        c8k4ckgmnafypuoaoi: a['Hromada (Admin3)']
          ? 'csu4204mn7lzgxcz35' + ':' + options['Operation_Location_Admin3'][a['Hromada (Admin3)']!]
          : ALERT,
        coi9s8pmnag4pv6aok: a['Settlement (Admin4)']
          ? 'cx60wmrmn7m1v6bz3c' + ':' + options['Operation_Location_Admin4'][a['Settlement (Admin4)']]
          : undefined,
        c1pbo1cmkepe9ny13v0: a['Population Group']
          ? 'c4zk43vmms4u30z1po7' + ':' + options['Operation_Population_Types'][a['Population Group']!]
          : ALERT,
        cugmnitmkepcpni13uy: a['Age & Sex']
          ? 'c27ard5mms4u30z1pp7' + ':' + options['Operation_Combination_Ages_Sexes'][a['Age & Sex']!]
          : ALERT,
        cti2dzimkepfjvs13v2: a['Disability']
          ? 'ccctq99mluvh4121byz' + ':' + options['Global_Disabilities'][a['Disability']!]
          : undefined,
        ctdr9mymncwrd3g5b7: a['Reached/Delivered - New Non-repeated (Manual)'],
      },
    },
  ])
}

const buildProtectionRequest = buildVaRequest

const periodIdReference = {
  '2026-01': 'ceziu41mkuup1ew6',
  '2026-02': 'c9tac54mkuup1ew7',
  '2026-03': 'c9rip8hmkuup1ew8',
  '2026-04': 'ctmksedmkuup1ew9',
  '2026-05': 'cq3n7lnmkuup1ewa',
  '2026-06': 'c2ogk23mkuup1ewb',
  '2026-07': 'cun1nprmkuup1exc',
  '2026-08': 'c4w2v8dmkuup1exd',
  '2026-09': 'cd4tu1rmkuup1exe',
  '2026-10': 'c8oilgcmkuup1exf',
  '2026-11': 'c1fdeokmkuup1exg',
  '2026-12': 'c5ao7ximkuup1exh',
} as const

const drc2AiProjectCode = (project?: DrcProject): AiType51aMonitoring.Type['Project'] => {
  return match(project)
    .cases({
      [DrcProject['UKR-000461 UHF']]: '00263',
      [DrcProject['UKR-000457 DMFA']]: '00256',
      [DrcProject['UKR-000426 SDC']]: '00255',
      [DrcProject['UKR-000424 Dutch MFA']]: '00261',
      [DrcProject['UKR-000423 ECHO4']]: '00139',
      [DrcProject['UKR-000399 SDC3']]: '00253',
      [DrcProject['UKR-000397 GFFO']]: '00260',
      [DrcProject['UKR-000388 BHA']]: '00251',
      [DrcProject['UKR-000372 ECHO3']]: '00262',
      [DrcProject['UKR-000355 Danish MFA']]: '00257',
      [DrcProject['UKR-000350 SIDA']]: '00254',
      [DrcProject['UKR-000270 Pooled Funds']]: '00259',
    } as const)
    .default(`${ALERT} ${project}` as '00139')
}

const aiProjectCode2Name = (project?: string): string => {
  return match(project)
    .cases({
      '00263': 'HUKR26-PRO-SHL-CWG-WSH-00263 - UKR-000461 UHF',
      '00262': 'HUKR26-PRO-00262 - UKR-000372 ECHO',
      '00261': 'HUKR26-PRO-FSL-00261 - UKR-000424 Dutch MFA',
      '00260': 'HUKR26-PRO-00260 - UKR-000397 GFFO',
      '00259': 'HUKR26-PRO-SHL-CWG-00259 - UKR-000270 Pooled Funds',
      '00258': 'HUKR26-CWG-SHL-00258 - UKR-000385 Pooled Funds',
      '00257': 'HUKR26-FSL-SHL-PRO-00257 - UKR-000355 DMFA',
      '00256': 'HUKR26-CWG-PRO-SHL-WSH-FSL-00256 - UKR-000457 DMFA',
      '00255': 'HUKR26-PRO-FSL-00255 - UKR-000426 SDC',
      '00254': 'HUKR26-FSL-PRO-00254 - UKR-000350 SIDA',
      '00253': 'HUKR26-SHL-CWG-00253 - UKR-000399 SDC',
      '00252': 'HUKR26-CWG-SHL-00252 - UKR-000441 UHF',
      '00251': 'HUKR26-PRO-FSL-00251 - UKR-000388 BHA',
      '00139': 'HUKR26-CWG-SHL-PRO-00139 - UKR-000423 ECHO',
    } as const)
    .default(`${ALERT} ${project}`)
}

enum aiPopulationGroupCode {
  Idp = 'cjds00nmbflt9ei1744',
  NonDisplaced = 'c4aty4vmm8k5xgr1vf',
}

const periodMapper = (period: string) => {
  return match(period)
    .cases(periodIdReference)
    .default(ALERT as (typeof periodIdReference)[keyof typeof periodIdReference])
}

const ageSexReference = {
  Girls: 'cyvv3hombf0xwnehw9 > cw38kqnmbf11mexhwb',
  'Adult Women': 'cyvv3hombf0xwnehw9 > cqklumpmmat7nkgy',
  'Elderly Women': 'cyvv3hombf0xwnehw9 > cblbhipmmat7nkg23',
  Boys: 'c2ijk1rmbf0xwnfhwa > cw38kqnmbf11mexhwb',
  'Adult Men': 'c2ijk1rmbf0xwnfhwa > cqklumpmmat7nkgy',
  'Elderly Men': 'c2ijk1rmbf0xwnfhwa > cblbhipmmat7nkg23',
} as const

const ageSexGroup2AiCodeMapper = (group: keyof typeof ageSexReference) => {
  return match(group)
    .cases(ageSexReference)
    .default(ALERT as (typeof ageSexReference)[keyof typeof ageSexReference])
}

const meta2AiAgeGenderGroups = (age: number | undefined, gender: Person.Gender) => {
  if (age === undefined) {
    return
  }
  if (age > 0 && age < 18) {
    return match(gender)
      .cases({
        [Person.Gender.Male]: 'Boys' as const,
        [Person.Gender.Female]: 'Girls' as const,
      })
      .default('Girls' as const)
  }
  if (age >= 18 && age < 60) {
    return match(gender)
      .cases({
        [Person.Gender.Male]: 'Adult Men' as const,
        [Person.Gender.Female]: 'Adult Women' as const,
      })
      .default('Adult Women' as const)
  }
  if (age >= 60) {
    return match(gender)
      .cases({
        [Person.Gender.Male]: 'Elderly Men' as const,
        [Person.Gender.Female]: 'Elderly Women' as const,
      })
      .default('Elderly Women' as const)
  }
}
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
                'CLSHL/CA4/IN4': 'CLSHL/CA4/IN4 - # of people supported with  light repairs (in-kind)',
                'CLSHL/CA4/IN6': 'CLSHL/CA4/IN6 - # of people supported with  medium repairs (in-kind)',
                'CLSHL/CA4/IN8': 'CLSHL/CA4/IN8 - # of people supported with  heavy repairs (in-kind)',
                'CLSHL/CA4/IN3': 'CLSHL/CA4/IN3 - # of people supported with light repairs (cash and  vouchers)',
                'CLSHL/CA6/IN3': 'CLSHL/CA6/IN3 - # of people supported with  cash for utilities (cash and vouchers)',
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

const pickIndicatorByProgram = ({
  activity,
  sector,
}: {
  activity: DrcProgram | ShelterTaPriceLevel | undefined
  sector: DrcSector
}) => {
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
      [DrcSector.Shelter]: match(activity)
        .cases({
          [ShelterTaPriceLevel.Light]: 'CLSHL/CA4/IN4', // CLSHL/CA4/IN4 - # of people supported with  light repairs (in-kind)
          [ShelterTaPriceLevel.Medium]: 'CLSHL/CA4/IN6', // CLSHL/CA4/IN6 - # of people supported with  medium repairs (in-kind)
          [ShelterTaPriceLevel.Heavy]: 'CLSHL/CA4/IN8', // CLSHL/CA4/IN8 - # of people supported with  heavy repairs (in-kind)
          [DrcProgram.CashForRepair]: 'CLSHL/CA4/IN3', // CLSHL/CA4/IN3 - # of people supported with light repairs (cash and  vouchers)
          [DrcProgram.CashForUtilities]: 'CLSHL/CA6/IN3', // CLSHL/CA6/IN3 - # of people supported with  cash for utilities (cash and vouchers)
        })
        .default(activity) as AiType51aMonitoring.Type['Indicator'],
    })
    .default(undefined)
}

export {
  labelActivities,
  pickIndicatorByProgram,
  sharedActivityProps,
  sp1Oblasts,
  ageSexGroup2AiCodeMapper,
  ageSexReference,
  aiPopulationGroupCode,
  aiProjectCode2Name,
  buildRequest,
  buildVaRequest,
  buildProtectionRequest,
  drc2AiProjectCode,
  meta2AiAgeGenderGroups,
  periodIdReference,
  periodMapper,
}
