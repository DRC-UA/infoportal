import {match, Obj} from '@axanc/ts-utils'

import {
  groupBy,
  DrcProgram,
  KoboMetaStatus,
  Period,
  PeriodHelper,
  KoboEcrec_cashRegistration,
  KoboIndex,
  DrcSector,
  Ecrec_small_scale,
  Ecrec_cashRegistration,
  type IKoboMeta,
  Ecrec_msmeGrantReg,
  Ecrec_vet2_dmfa,
} from 'infoportal-common'

import type {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

import type {YearlyReportDataRecord} from './types'

export namespace YearlyReportMapper {
  export const request =
    (api: ApiSdk) =>
    async (period: Partial<Period>): Promise<[YearlyReportDataRecord[]]> =>
      Promise.all([metaRequest(api, period)])

  const activityIndicatorMap = {
    // General Protection
    [DrcProgram.Counselling]: '# of individuals who received protection counselling',
    [DrcProgram.FGD]: '# of key informants reached through community level protection monitoring',
    [DrcProgram.PGS]: '# of individuals who received individual or group-based psychosocial support',
    [DrcProgram.MHPSSActivities]: '# of individuals who received individual or group-based psychosocial support',
    [DrcProgram.ProtectionMonitoring]: '# of individuals reached through protection monitoring at the household level',
    [DrcProgram.CommunityLevelPm]: '# of key informants reached through community level protection monitoring',
    [DrcProgram.AwarenessRaisingSession]:
      '# of individuals reached with awareness-raising activities and GBV-lifesaving information',
    [DrcProgram.Referral]:
      '# of individuals with specific needs referred to specialized services and assistance (Internal/External referrals)',
    // Mine Action (VA, incl. Child Protection)
    [DrcProgram.TIA]: '# EO survivors who received cash assistance (SADD) [incl. Child Protection sector]',
    // GBV
    [DrcProgram.WGSS]:
      '# of women and girls who participated in skill-building, recreational, or livelihood (including vocational education) activities in women and girls safe spaces',
    [DrcProgram.DignityKits]: '# of women and girls at risk who received dignity kits',
    [DrcProgram.PSS]:
      '# of individuals provided with specialized individual or group GBV psychosocial support that meet GBViE minimum standards (not including recreational activities)',
    [DrcProgram.CapacityBuilding]:
      '# of GBV service providers trained to deliver services in accordance with the GBViE minimum standards',
    // FSLC
    [DrcProgram.SectoralCashForAgriculture]:
      '# of individuals provided with emergency agriculture inputs, contributing to their food consumption > Multi purpose Agricultural grants or vouchers > Cash/Voucher',
    [DrcProgram.SectoralCashForAnimalShelterRepair]:
      '# of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock shelter/barnes > Cash/Voucher',
    [DrcProgram.SectoralCashForAnimalFeed]:
      '# of individuals provided with emergency livestock inputs, contributing to their food consumption > Livestock health > Cash/Voucher',
    [DrcProgram.MSME]:
      '# of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Emergency business grants > Cash/Voucher',
    [DrcProgram.VET]:
      '# of individuals provided with livelihoods assets restoration support, assistance in establishing small business, and skills enhancing employability > Vocational and reskilling training > Service',
    // Legal:
    [DrcProgram.LegalAssistanceHlpDocs]: '# of individuals who successfully secured HLP documentation',
    [DrcProgram.LegalAssistanceHlp]: '# of individuals who received legal assistance on HLP issues',
    [DrcProgram.LegalAssistanceCivilDocs]: '# of individuals who successfully secured civil documentation',
    [DrcProgram.LegalAssistanceCivil]: '# of individuals who received legal assistance',
    [DrcProgram.LegalCounselling]: '# of individuals who received protection counselling',
    // MPCA
    [DrcProgram.MPCA]: '# individuals assisted with [Rapid] MPC',
    // Wash (NFI)
    [DrcProgram.NFI]: '# of individuals benefiting from hygiene kit/items distribution (in-kind)',
    [DrcProgram.HygieneKit]: '# of individuals benefiting from hygiene kit/items distribution (in-kind)',
    // Shelter and NFI
    [DrcProgram.ESK]: '# supported with emergency shelter kits > in-kind',
    [DrcProgram.CashForFuel]: '# supported with winter energy > cash-voucher',
    [DrcProgram.CashForUtilities]: '# supported with cash for utilities > cash-voucher',
    [DrcProgram.CashForRent]: '# received rental support (RMI) > cash-voucher',
    [DrcProgram.CashForRepair]: '# supported with light repairs > cash-voucher',
  } as const

  const activityMapper = ({activity, ...rest}: IKoboMeta): IKoboMeta & {indicator?: string} => {
    return {
      indicator: activity ? match<DrcProgram>(activity).cases(activityIndicatorMap).default(undefined) : undefined,
      activity,
      ...rest,
    }
  }

  const metaRequest = async (api: ApiSdk, period: Partial<Period>): Promise<YearlyReportDataRecord[]> => {
    const searchFilters = {filters: {...period}}
    const data = await api.koboMeta
      .search({
        activities: Obj.keys(activityIndicatorMap),
        status: [KoboMetaStatus.Committed],
      })
      .then(({data}) => data.filter((record) => PeriodHelper.isDateIn(period, record.lastStatusUpdate)))
      .then((data) => data.map(activityMapper))

    const mpcaKoboIdToAmountDict = await api.mpca.search({}).then((record) =>
      record.data
        .filter(({activity, status, lastStatusUpdate}) => {
          if (activity !== DrcProgram.MPCA) return false
          if (status !== KoboMetaStatus.Committed) return false
          return lastStatusUpdate && PeriodHelper.isDateIn(period, lastStatusUpdate)
        })
        .reduce(
          (accum, {koboId, amountUahFinal}) => ({
            ...accum,
            [koboId]: amountUahFinal ?? 0,
          }),
          {} as Record<string, number>,
        ),
    )

    const ecrecKoboIdToAmountDict = (
      await Promise.all([
        api.kobo.typedAnswers.search.ecrec_subsistance(searchFilters).then(({data}) => data),
        api.kobo.typedAnswers.search.ecrec_small_scale(searchFilters).then(({data}) => data),
        api.kobo.typedAnswers.search.ecrec_vet_bha388(searchFilters).then(({data}) => data),
        api.kobo.typedAnswers.search.ecrec_cashRegistration(searchFilters).then(({data}) => data),
        api.kobo.typedAnswers.search.ecrec_msmeGrantReg(searchFilters).then(({data}) => data),
        api.kobo.typedAnswers.search.ecrec_vet2_dmfa(searchFilters).then(({data}) => data),
      ])
    )
      .flat()
      .reduce(
        (result, current) => ({
          ...result,
          [current.id]: match((current as unknown as {formId: string}).formId)
            .cases({
              [KoboIndex.byName('ecrec_subsistance').id]: 21000,
              [KoboIndex.byName('ecrec_small_scale').id]: Number((current as Ecrec_small_scale.T).cal_amount ?? 0),
              [KoboIndex.byName('ecrec_vet_bha388').id]: 20875, // ~ average, taken from spreadsheet
              [KoboIndex.byName('ecrec_cashRegistration').id]: KoboEcrec_cashRegistration.getProgram(
                current as Ecrec_cashRegistration.T,
              ).reduce(
                (total, program) =>
                  total +
                  match(program)
                    .cases({
                      SectoralCashForAgriculture: 7500,
                      SectoralCashForAnimalFeed: 12000,
                      SectoralCashForAnimalShelterRepair: 15000,
                    })
                    .default(0),
                0,
              ),
              [KoboIndex.byName('ecrec_msmeGrantReg').id]: (current as Ecrec_msmeGrantReg.T).amount_payment ?? 0,
              [KoboIndex.byName('ecrec_vet2_dmfa').id]: (current as Ecrec_vet2_dmfa.T).cost_training ?? 0,
            })
            .default(0),
        }),
        {} as Record<number, number>,
      )

    return groupBy({
      data,
      groups: [{by: ({sector}) => sector}, {by: ({oblast}) => oblast}, {by: ({indicator}) => indicator!}],
      finalTransform: (group, [sector, oblast, indicator]) => {
        const totalPaid = group.every(
          ({formId, activity}) => formId === KoboIndex.byName('bn_rapidResponse2').id && activity === DrcProgram.MPCA,
        )
          ? group
              .map(({koboId}) => koboId)
              .reduce((accum, koboId) => {
                return accum + (mpcaKoboIdToAmountDict[koboId] ?? 0)
              }, 0)
          : undefined

        const totalEcrecPaid =
          sector === DrcSector.Livelihoods
            ? group.reduce((sum, {koboId}) => {
                return sum + Number(ecrecKoboIdToAmountDict[Number(koboId)] ?? 0)
              }, 0)
            : undefined

        const totalShelterPaid =
          sector === DrcSector.Shelter
            ? group.reduce((sum, {activity}) => {
                return (
                  sum +
                  match(activity)
                    .cases({
                      [DrcProgram.CashForFuel]: 21000,
                      [DrcProgram.CashForUtilities]: 18000,
                    })
                    .default(0)
                )
              }, 0)
            : undefined

        return {
          sector,
          oblast,
          indicator,
          beneficiaries: AiMapper.disaggregatePersons(group.flatMap((_) => _.persons).compact()),
          totalPaid: totalPaid ?? totalEcrecPaid ?? totalShelterPaid, // groups can not have paiments in different activities
        }
      },
    }).transforms
  }
}
