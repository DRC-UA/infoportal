import {DrcProject} from '@infoportal-common'
import {AiTypeGbv} from '@/features/ActivityInfo/Gbv/AiTypeGbv'
import {fnSwitch, PromiseReturn} from '@alexandreannic/ts-utils'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'
import {DrcProjectHelper} from '../../../../../infoportal-common/src/type/Drc'

export namespace AiGbvMapper {

  export type Type = Omit<AiTypeGbv.Type,
    'Reporting Organization' |
    'Response Theme'
  > & AiTypeGbv.TypeSub & {
    answer: Record<string, any>
  }

  const planCode = {
    [DrcProject['UKR-000345 BHA2']]: 'GBV-DRC-00001',
    [DrcProject['UKR-000347 DANIDA']]: 'GBV-DRC-00002',
    [DrcProject['UKR-000355 Danish MFA']]: 'GBV-DRC-00003',
    [DrcProject['UKR-000330 SDC2']]: 'GBV-DRC-00004',
    [DrcProject['UKR-000304 PSPU']]: 'GBV-DRC-00005',
  } as const

  export const mapGbvActivity = (reportingMonth: string) => (res: PromiseReturn<ReturnType<ApiSdk['kobo']['typedAnswers']['searchProtection_gbv']>>) => {
    const data: Type[] = []
    res.data.forEach(d => {
      d.meta.persons!.forEach(ind => {
        data.push({
          answer: d,
          ...AiMapper.getLocation(d),
          ...AiMapper.disaggregatePersons([ind]),
          'Reporting Month': reportingMonth,
          'Plan/Project Code': fnSwitch(DrcProjectHelper.searchByCode(d.project)!, planCode, () => undefined)!,
          'Population Group': AiMapper.mapPopulationGroup(ind.displacement),
          'Indicators': fnSwitch(d.activity!, {
            'pssac': '# of individuals provided with specialized individual or group GBV psychosocial support that meet GBViE standards (not including recreational activities)',
            'wgss': '# of women and girls who received recreational and livelihood skills including vocational education sessions in women and girls safe spaces',
            'ddk': '# of women and girls at risk who received dignity kits',
            'gbvis': '# of individuals reached with awareness-raising activities and GBV-life-saving information',
            'ngbv': '# of non-GBV service providers trained on GBV prevention, risk mitigation and referrals that meet GBViE minimum standards',
            'gbva': '# of GBV service providers trained on GBV prevention and response that meet GBViE minimum standards',
            'gcva': '# of individuals reached with humanitarian cash and voucher assistance for GBV case management and/or other GBV response',
            'glac': '# of individuals at risk supported with GBV specialized legal assistance and counseling',
          }, () => 'TODO') as any,
        })
      })
    })
    return data
  }


}