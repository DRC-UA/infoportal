import {match} from '@axanc/ts-utils'

import {DrcProject} from 'infoportal-common'

import {AiType51aMonitoring} from './types'
import {ALERT} from './constants'

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
        cgmnxb3mnaglzgiaot: a['Transit Centre']
          ? 'cbogrn0mn7q3eq64lx' + ':' + options['Operation_Location_Sites_Transit_Centres'][a['Transit Centre']!]
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
        c6dowjymnagw1rmap2: a['Health Site Type']
          ? 'c4cmmf8mn7ylwsi1m9r' + ':' + options['Operation_Site_Types_Health'][a['Health Site Type']!]
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
        c1pbo1cmkepe9ny13v0: a['Population Group']
          ? 'c4zk43vmms4u30z1po7' + ':' + options['Operation_Population_Types'][a['Population Group']!]
          : undefined,
        cugmnitmkepcpni13uy: a['Age & Sex']
          ? 'c27ard5mms4u30z1pp7' + ':' + options['Operation_Combination_Ages_Sexes'][a['Age & Sex']!]
          : undefined,
        cti2dzimkepfjvs13v2: a['Disability']
          ? 'ccctq99mluvh4121byz' + ':' + options['Global_Disabilities'][a['Disability']!]
          : undefined,
        ctdr9mymncwrd3g5b7: a['Reached/Delivered - New Non-repeated (Manual)'],
      },
    },
  ]
}

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

const drcToAiProject = (project?: DrcProject): AiType51aMonitoring.Type['Project'] => {
  return match(project)
    .cases({
      [DrcProject['UKR-000461 UHF']]: '00263',
      [DrcProject['UKR-000457 DMFA']]: '00256',
      [DrcProject['UKR-000426 SDC']]: '00255',
      [DrcProject['UKR-000424 Dutch MFA']]: '00261',
      [DrcProject['UKR-000423 ECHO4']]: '00139',
      [DrcProject['UKR-000397 GFFO']]: '00260',
      [DrcProject['UKR-000388 BHA']]: '00251',
      [DrcProject['UKR-000372 ECHO3']]: '00262',
      [DrcProject['UKR-000355 Danish MFA']]: '00257',
      [DrcProject['UKR-000350 SIDA']]: '00254',
      [DrcProject['UKR-000270 Pooled Funds']]: '00259',
    } as const)
    .default(`${ALERT} ${project}` as '00139')
}

const periodMapper = (period: string) =>
  match(period)
    .cases(periodIdReference)
    .default(ALERT as (typeof periodIdReference)[keyof typeof periodIdReference])

const ageSexReference = {
  Girls: 'cyvv3hombf0xwnehw9 > cw38kqnmbf11mexhwb',
  'Adult Women': 'cyvv3hombf0xwnehw9 > cqklumpmmat7nkgy',
  'Elderly Women': 'cyvv3hombf0xwnehw9 > cblbhipmmat7nkg23',
  Boys: 'c2ijk1rmbf0xwnfhwa > cw38kqnmbf11mexhwb',
  'Adult Men': 'c2ijk1rmbf0xwnfhwa > cqklumpmmat7nkgy',
  'Elderly Men': 'c2ijk1rmbf0xwnfhwa > cblbhipmmat7nkg23',
} as const

const ageSexMapper = (group: keyof typeof ageSexReference) =>
  match(group)
    .cases(ageSexReference)
    .default(ALERT as (typeof ageSexReference)[keyof typeof ageSexReference])

export {ageSexMapper, buildRequest, buildVaRequest, drcToAiProject, periodMapper}
