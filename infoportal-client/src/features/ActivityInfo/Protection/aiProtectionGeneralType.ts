import {fnSwitch} from '@alexandreannic/ts-utils'
import {DrcProject, Protection_hhs2} from '@infoportal-common'
import {AiTypeProtectionRmm} from '@/features/ActivityInfo/Protection/aiProtectionGeneralInterface'
import {KoboAnswer} from '@/core/sdk/server/kobo/Kobo'

export namespace AiProtectionGeneralType {

  export enum Status {
    'Returnees' = 'Returnees',
    'Non-Displaced' = 'Non-Displaced',
    'IDPs' = 'IDPs',
  }

  export type Data = Pick<AiTypeProtectionRmm.FormParams,
    'Oblast' |
    'Raion' |
    'Hromada' |
    'Plan Code'
  > & Pick<AiTypeProtectionRmm.FormParams['subActivities'][0],
    'Reporting Month' |
    'Collective Centre' |
    'Population Group' |
    'Protection Indicators' |
    'Total Individuals Reached' |
    'Girls' |
    'Boys' |
    'Adult Women' |
    'Adult Men' |
    'Elderly Women' |
    'Elderly Men' |
    'People with disability'
  > & {
    answer: KoboAnswer<any>
  }

  export const mapStatus = (s: (keyof typeof Protection_hhs2.options['do_you_identify_as_any_of_the_following']) | undefined): any => fnSwitch(s!, {
    returnee: 'Returnees',
    non_displaced: 'Non-Displaced',
    idp: 'IDPs',
    refugee: 'Non-Displaced',
  }, _ => 'Non-Displaced')

  export const planCode = Object.freeze({
    [DrcProject['UKR-000269 ECHO1']]: 'GP-DRC-00001',
    [DrcProject['UKR-000298 Novo-Nordisk']]: 'GP-DRC-00002',
    [DrcProject['UKR-000284 BHA']]: 'GP-DRC-00003',
    [DrcProject['UKR-000309 OKF']]: 'GP-DRC-00004',
    [DrcProject['UKR-000314 UHF4']]: 'GP-DRC-00005',
    [DrcProject['UKR-000322 ECHO2']]: 'GP-DRC-00006',
    [DrcProject['UKR-000304 PSPU']]: 'GP-DRC-00007',
    [DrcProject['UKR-000345 BHA2']]: 'GP-DRC-00008',
    [DrcProject['UKR-000336 UHF6']]: 'GP-DRC-00009',
    [DrcProject['UKR-000330 SDC2']]: 'GP-DRC-00010',
  })

  // export const planCode: Partial<Record<DrcDonor, AiProtectionHhs.GET<'Plan Code'>>> = {
  //   // [Donor.ECHO_UKR000322]: 'GP-DRC-00001',//ECHO
  //   [DrcDonor.NovoNordisk]: 'GP-DRC-00002',//Novo Nordisk ------
  //   [DrcDonor.BHA]: 'GP-DRC-00003',//BHA OK
  //   [DrcDonor.OKF]: 'GP-DRC-00004',//OKF ------
  //   [DrcDonor.UHF]: 'GP-DRC-00005',//UHF
  //   [DrcDonor.ECHO]: 'GP-DRC-00006',//ECHO
  //   // [Donor.D] MoF: 'GP-DRC-00007',//Danish
  // }
}
