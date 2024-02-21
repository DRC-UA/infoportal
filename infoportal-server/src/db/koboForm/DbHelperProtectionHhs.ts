import {PrismaClient} from '@prisma/client'
import {DbKoboFormHelper} from './Helper'
import {Enum, map} from '@alexandreannic/ts-utils'
import {endOfDay, endOfMonth, parse, startOfMonth} from 'date-fns'
import {DrcProject, KoboIndex} from '@infoportal-common'
import {Protection_hhs} from '../../script/output/kobo/Protection_hhs'

type Office = typeof Protection_hhs.options['staff_to_insert_their_DRC_office']

export interface ProtectionHhsTags {
  projects?: DrcProject[]
  ai?: DrcProject,
  ipt?: DrcProject[]
}

/**
 * From Romane reporting file
 */
// export enum Donor {
//   'BHA_UKR000284' = 'BHA UKR-000284',
//   'OKF_UKR000309' = 'OKF UKR-000309',
//   'ECHO_UKR000322' = 'ECHO UKR-000322',
//   'UHF_IV_UKR000314' = 'UHF IV UKR-000314',
//   'NN2_UKR000298' = 'NN2 UKR-000298',
// }

type ReportingmDonorMap = Partial<Record<
  keyof Office,
  Partial<Record<DrcProject, {ai?: number, ipt?: number}>>>
>

const reportingUntilUHF4Approval: ReportingmDonorMap = {
  'lviv': {
    [DrcProject['UKR-000309 OKF']]: {ai: 1, ipt: 1,},
  },
  'chernihiv': {
    [DrcProject['UKR-000314 UHF4']]: {ipt: 1, ai: 1},
  },
  'sumy': {
    [DrcProject['UKR-000314 UHF4']]: {ipt: 1, ai: 1},
  },
  'dnipro': {
    [DrcProject['UKR-000314 UHF4']]: {ipt: 1, ai: 1},
  },
  'kharkiv': {
    [DrcProject['UKR-000314 UHF4']]: {ipt: .5, ai: .5},
    [DrcProject['UKR-000336 UHF6']]: {ipt: .5, ai: .5},
  },
  'mykolaiv': {
    [DrcProject['UKR-000314 UHF4']]: {ai: 1, ipt: 1},
  },
}

const reporting202309: ReportingmDonorMap = {
  'lviv': {
    [DrcProject['UKR-000309 OKF']]: {ai: 1, ipt: 1,},
  },
  'chernihiv': {
    [DrcProject['UKR-000314 UHF4']]: {ipt: 1, ai: 1},
  },
  'dnipro': {
    [DrcProject['UKR-000314 UHF4']]: {ipt: 1, ai: 1},
  },
  'kharkiv': {
    [DrcProject['UKR-000284 BHA']]: {ipt: 1},
    [DrcProject['UKR-000314 UHF4']]: {ai: 1, ipt: 1},
  },
  'mykolaiv': {
    [DrcProject['UKR-000314 UHF4']]: {ai: 1, ipt: 1},
    [DrcProject['UKR-000274 Novo-Nordisk']]: {ipt: 1},
  },
}

const reporting: Record<string, ReportingmDonorMap> = {
  '2023-06': reportingUntilUHF4Approval,
  '2023-07': reportingUntilUHF4Approval,
  '2023-08': reportingUntilUHF4Approval,
  // '2023-09': reporting202309,
}

export interface DbProtectionHhs2Tags {
  reportingAiDonor?: DrcProject
  reportingIptDonor?: DrcProject
}

export class DbHelperProtectionHhs {

  constructor(private prisma: PrismaClient) {
  }

  readonly assignDonorsForHhs = async (months: (keyof typeof reporting)[] = [
    '2023-06',
    '2023-07',
    '2023-08',
  ]) => {
    return Promise.all(months.map(this.assignDonor))
  }

  readonly assignDonor = async (month: keyof typeof reporting) => {
    const start = startOfMonth(parse(month, 'yyyy-MM', new Date()))
    const end = endOfDay(endOfMonth(parse(month, 'yyyy-MM', new Date())))
    const data = await this.prisma.koboAnswers.findMany({
      where: {
        formId: KoboIndex.byName('protection_hhs2_1').id,
        end: {
          gte: start,
          lt: end,
        },
      }
    }).then(_ => _.map(DbKoboFormHelper.setTagPropertyTsType<Protection_hhs.T>()))
    await Promise.all(data
      .filter(_ => !!_.answers.staff_to_insert_their_DRC_office)
      .map(_ => {
        if (!reporting[month]) {
          return
        }
        return map(reporting[month][_.answers.staff_to_insert_their_DRC_office!], reporting => {
          const donor: {ipt: DrcProject[], ai?: DrcProject} = {ipt: []}
          Enum.entries(reporting).forEach(([k, v], donorIndex) => {
            if (v.ipt === 1)
              donor.ipt.push(k)
            else if (v.ipt === .5) {
              if (+_.id % 2 === donorIndex) {
                donor.ipt.push(k)
              }
            }
            if (v.ai === 1)
              donor.ai = k
            else if (v.ai === .5) {
              if (+_.id % 2 === donorIndex) {
                donor.ai = k
              }
            }
          })
          return this.prisma.koboAnswers.update({
            where: {
              id: _.id,
            },
            data: {tags: donor}
          })
        })
      }))
  }
}
