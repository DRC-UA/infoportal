import {AILocationHelper, DrcProject, DrcProjectHelper, Protection_gbv} from '@infoportal-common'
import {AiGbvType} from '@/features/ActivityInfo/Gbv/aiGbvType'
import {fnSwitch} from '@alexandreannic/ts-utils'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {aiInvalidValueFlag} from '@/features/ActivityInfo/shared/AiBundle'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'

export namespace AiGbvMapper {

  export type Type = Omit<AiGbvType.Type,
    'Reporting Organization' |
    'Response Theme'
  > & AiGbvType.TypeSub & {
    answer: Record<string, any>
  }

  const planCode = {
    [DrcProject['UKR-000345 BHA2']]: 'GBV-DRC-00001',
    [DrcProject['UKR-000347 DANIDA']]: 'GBV-DRC-00002',
    [DrcProject['UKR-000355 Danish MFA']]: 'GBV-DRC-00003',
    [DrcProject['UKR-000330 SDC2']]: 'GBV-DRC-00004',
    [DrcProject['UKR-000304 PSPU']]: 'GBV-DRC-00005',
    [DrcProject['UKR-000363 UHF8']]: 'GBV-DRC-00007',
  } as const

  export const mapGbvActivity = (reportingMonth: string) => async (res: ApiPaginate<InferTypedAnswer<'protection_gbv'>>) => {
    const data: Type[] = await Promise.all(res.data
      .filter(_ => _.new_ben !== 'no')
      .filter(_ => !!_.activity && !(_.activity.includes('other') && _.activity.length === 1))
      .flatMap(d => {
        return d.custom.persons!.map(async ind => {
          return ({
            answer: d,
            ...AiMapper.getLocationByKobo(d),
            'Settlement': await AILocationHelper.findSettlementByIso(d.ben_det_hromada_001).then(_ => _?._5w ?? aiInvalidValueFlag + d.ben_det_hromada_001),
            ...AiMapper.disaggregatePersons([ind]),
            'Reporting Month': reportingMonth,
            'Plan/Project Code': fnSwitch(
              DrcProjectHelper.search(Protection_gbv.options.project[d.project!])!,
              planCode,
              () => aiInvalidValueFlag + Protection_gbv.options.project[d.project!] as any
            )!,
            'Population Group': AiMapper.mapPopulationGroup(ind.displacement),
            'Indicators': d.activity?.map(a => fnSwitch(a!, {
              // 'wgss': '# of women and girls who received recreational and livelihood skills including vocational education sessions in women and girls safe spaces',
              'pssac': '# of individuals provided with specialized individual or group GBV psychosocial support that meet GBViE standards (not including recreational activities)',
              'wgss': '# of operational women and girls\' safe spaces',
              'ddk': '# of women and girls at risk who received dignity kits',
              'gbvis': '# of individuals reached with awareness-raising activities and GBV-life-saving information',
              'ngbv': '# of non-GBV service providers trained on GBV prevention, risk mitigation and referrals that meet GBViE minimum standards',
              'gbva': '# of GBV service providers trained on GBV prevention and response that meet GBViE minimum standards',
              'gcva': '# of individuals reached with humanitarian cash and voucher assistance for GBV case management and/or other GBV response',
              'glac': '# of individuals at risk supported with GBV specialized legal assistance and counseling',
              'girl_shine': '# of individuals provided with specialized individual or group GBV psychosocial support that meet GBViE standards (not including recreational activities)',
              'awareness_raising': `# of individuals reached with awareness-raising activities and GBV-life-saving information`,
              'psychosocial_support': `# of individuals provided with specialized individual or group GBV psychosocial support that meet GBViE standards (not including recreational activities)`,
              'education_sessions': `# of women and girls who received recreational and livelihood skills including vocational education sessions in women and girls safe spaces`,
              'training_actors': `# of non-GBV service providers trained on GBV prevention, risk mitigation and referrals that meet GBViE minimum standards`,
              'training_providers': `# of GBV service providers trained on GBV prevention and response that meet GBViE minimum standards`,
              'dignity_kits': `# of women and girls at risk who received dignity kits`,
            }, () => aiInvalidValueFlag)) as any,
          })
        })
      }))
    return data
  }
}