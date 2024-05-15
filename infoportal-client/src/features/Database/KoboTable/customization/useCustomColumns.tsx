import {KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {
  Bn_Re,
  currentProtectionProjects,
  DrcProject,
  Ecrec_cashRegistration,
  KoboAnswer,
  KoboAnswerFlat,
  KoboBaseTags,
  safeArray,
  KoboGeneralMapping,
  KoboIndex,
  KoboTagStatus,
  ProtectionHhsTags, Protection_gbv,
} from '@infoportal-common'
import React, {useMemo} from 'react'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {map, Obj} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {SelectStatusBy, SelectStatusConfig, ShelterCashStatus} from '@/shared/customInput/SelectStatus'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {Utils} from '@/utils/utils'

export const useCustomColumns = (): DatatableColumn.Props<KoboMappedAnswer>[] => {
  const ctx = useDatabaseKoboTableContext()
  const {m} = useI18n()
  return useMemo(() => {
    const individualsBreakdown: DatatableColumn.Props<any>[] = [
      {
        id: 'custom_children',
        head: m.minors + ' < 18',
        type: 'number',
        width: 20,
        renderQuick: (row: {custom: KoboGeneralMapping.IndividualBreakdown}) => row.custom.childrenCount,
      },
      {
        id: 'custom_adult',
        head: m.adults + ' 18 ≤ age < 60',
        type: 'number',
        width: 20,
        renderQuick: (row: {custom: KoboGeneralMapping.IndividualBreakdown}) => row.custom.adultCount,
      },
      {
        id: 'custom_elderly',
        head: m.elderly + ' 60+',
        type: 'number',
        width: 20,
        renderQuick: (row: {custom: KoboGeneralMapping.IndividualBreakdown}) => row.custom.elderlyCount,
      },
      {
        id: 'custom_disabilitiesCount',
        head: m.PwDs,
        type: 'number',
        width: 20,
        renderQuick: (row: {custom: KoboGeneralMapping.IndividualBreakdown}) => row.custom.disabilitiesCount,
      },
      {
        id: 'custom_disabilities',
        head: m.disabilities,
        type: 'select_multiple',
        options: () => Obj.entries(Ecrec_cashRegistration.options.hh_char_dis_select).map(([k, v]) => DatatableUtils.buildCustomOption(k, v)),
        render: (row: {custom: KoboGeneralMapping.IndividualBreakdown}) => {
          return {
            value: row.custom.disabilities,
            label: row.custom.disabilities.join(' | '),
          }
        }
      },
    ]
    const lastStatusUpdate: DatatableColumn.Props<any> = {
      id: 'lastStatusUpdate',
      width: 129,
      head: m.paidOn,
      type: 'date',
      render: (row: KoboAnswerFlat<{}, KoboBaseTags & KoboTagStatus>) => {
        return {
          export: row.tags?.lastStatusUpdate,
          value: row.tags?.lastStatusUpdate,
          label: <IpDatepicker
            value={row.tags?.lastStatusUpdate}
            onChange={_ => ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key: 'lastStatusUpdate'})}
          />
        }
      }
    }
    const paymentStatus = (
      enumerator: SelectStatusConfig.EnumStatus = 'CashStatus',
      key: string = 'status'
    ): DatatableColumn.Props<any>[] => {
      return [
        {
          id: 'custom_status',
          head: m.status,
          type: 'select_one',
          width: 120,
          options: () => SheetUtils.buildOptions(Obj.keys(SelectStatusConfig.enumStatus[enumerator]), true),
          render: (row: KoboAnswerFlat<{}, any>) => {
            return {
              export: row.tags?.[key],
              value: row.tags?.[key],
              label: (
                <SelectStatusBy
                  enum={enumerator}
                  disabled={!ctx.canEdit}
                  value={row.tags?.[key]}
                  placeholder={m.project}
                  onChange={_ => {
                    ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key})
                    // ctx.asyncUpdateTag.call({answerIds: [row.id], value: new Date(), key: 'lastStatusUpdate'})
                  }}
                />
              )
            }
          }
        },
        lastStatusUpdate,
      ]
    }

    const paymentStatusEcrec = (
      enumerator: SelectStatusConfig.EnumStatus = 'CashForEduStatus',
      key: string = 'status'
    ): DatatableColumn.Props<any>[] => {
      return [
        {
          id: 'custom_status',
          head: m.status,
          type: 'select_one',
          width: 120,
          options: () => SheetUtils.buildOptions(Obj.keys(SelectStatusConfig.enumStatus[enumerator]), true),
          render: (row: KoboAnswer<{}, any>) => {
            return {
              export: row.tags?.[key],
              value: row.tags?.[key],
              label: (
                <SelectStatusBy
                  enum={enumerator}
                  disabled={!ctx.canEdit}
                  value={row.tags?.[key]}
                  placeholder={m.project}
                  onChange={_ => {
                    ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key})
                    // ctx.asyncUpdateTag.call({answerIds: [row.id], value: new Date(), key: 'lastStatusUpdate'})
                  }}
                />
              )
            }
          }
        },
        lastStatusUpdate,
      ]
    }

    const paymentStatusShelter = (): DatatableColumn.Props<any>[] => {
      return [
        {
          id: 'custom_status',
          head: m.status,
          type: 'select_one',
          width: 120,
          options: () => SheetUtils.buildOptions(Obj.keys(ShelterCashStatus), true),
          render: (row: any) => {
            return {
              export: row.tags?.status ?? DatatableUtils.blank,
              value: row.tags?.status,
              label: (
                <SelectStatusBy
                  enum="ShelterCashStatus"
                  disabled={!ctx.canEdit}
                  value={row.tags?.status}
                  placeholder={m.project}
                  onChange={_ => {
                    ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key: 'status'})
                    // ctx.asyncUpdateTag.call({answerIds: [row.id], value: new Date(), key: 'lastStatusUpdate'})
                  }}
                />
              )
            }
          }
        },
        lastStatusUpdate,
      ]
    }
    const beneficiaries: DatatableColumn.Props<any>[] = [
      {
        id: 'beneficiaries',
        head: m.beneficiaries,
        type: 'number',
        renderQuick: (row: KoboAnswerFlat<Protection_gbv.T, any>) => {
          if (row.new_ben === 'yes') {
            return row.numb_part || 0
          } else if (row.new_ben === 'bno' && row.hh_char_hh_det) {
            return row.hh_char_hh_det.reduce((count, participant) => {
              return count + (participant.hh_char_hh_new_ben === 'yes' ? 1 : 0)
            }, 0)
          }
          return 0
        }
      }
    ]
    const ecrecScore: DatatableColumn.Props<any>[] = [
      {
        id: 'vulnerability_sore',
        head: m.vulnerability,
        type: 'number',
        renderQuick: _ => _.custom.vulnerability,
      },
      {
        id: 'eligibility_score',
        head: m.vulnerability,
        type: 'select_one',
        renderQuick: _ => {
          return _.custom.eligibility ? 'Yes' : 'No'
        },
      },
    ]

    // const validatedAt: DatatableColumn.Props<any> = () => {
    //   return {
    //     id: 'Paid on',
    //     head: m.paidOn,
    //     type: 'date',
    //     render: (_: KoboAnswer<any, KoboBaseTags & TagWithStatus>) => {
    //       return {
    //         value: _.tags?.validatedAt,
    //         label: <DatePicker
    //           value={_.tags?.validatedAt}
    //           onChange={_ => ctx.asyncUpdateTag.call({answerIds: [_.id], value: _, key: 'validatedAt'})}
    //         />
    //       }
    //     }
    //   }
    // }

    const extra: Record<string, DatatableColumn.Props<any>[]> = {
      [KoboIndex.byName('shelter_nta').id]: [
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('bn_cashForRentRegistration').id]: [
        ...paymentStatus('CashForRentStatus'),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('bn_cashForRentApplication').id]: [
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('bn_rapidResponse').id]: [
        ...paymentStatus(),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('bn_re').id]: [
        ...paymentStatus(),
        ...individualsBreakdown,
        {
          id: 'eligibility_summary_esk2',
          head: m.mpca.eskAllowance,
          type: 'number',
          renderQuick: (row: KoboAnswerFlat<Bn_Re.T, any>) => {
            return row.estimate_sqm_damage !== undefined ? (row.estimate_sqm_damage <= 15 ? 1 : 2) : undefined
          }
        }
      ],
      [KoboIndex.byName('protection_gbv').id]: [
        ...beneficiaries
      ],
      [KoboIndex.byName('protection_pss').id]: [
        ...beneficiaries
      ],
      [KoboIndex.byName('shelter_cashForRepair').id]: [
        ...paymentStatusShelter(),
      ],
      [KoboIndex.byName('shelter_cashForShelter').id]: [
        ...paymentStatusShelter(),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('ecrec_cashRegistration').id]: [
        ...paymentStatus(),
        ...individualsBreakdown,
        ...ecrecScore,
      ],
      [KoboIndex.byName('ecrec_cashRegistrationBha').id]: [
        ...paymentStatus(),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('ecrec_trainingGrants').id]: [
        ...paymentStatusEcrec(),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('protection_communityMonitoring').id]: [
        {
          id: 'tags_project',
          head: m.project,
          type: 'select_multiple',
          width: 200,
          options: () => SheetUtils.buildOptions(Obj.keys(DrcProject), true),
          render: (row: KoboAnswerFlat<any, ProtectionHhsTags>) => {
            return {
              export: row.tags?.project ?? DatatableUtils.blank,
              tooltip: row.tags?.project,
              value: row.tags?.project ?? SheetUtils.blank,
              label: (
                <IpSelectSingle
                  disabled={!ctx.canEdit}
                  hideNullOption
                  value={row.tags?.project}
                  placeholder={m.project}
                  onChange={_ => ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key: 'project'})}
                  options={currentProtectionProjects.map(k => ({value: k, children: k}))}
                />
              )
            }
          }
        }
      ],
      [KoboIndex.byName('shelter_north').id]: [
        {
          id: 'tags_project',
          head: m.project,
          type: 'select_one',
          width: 200,
          options: () => SheetUtils.buildOptions(Obj.keys(DrcProject), true),
          render: (row: KoboAnswerFlat<any, ProtectionHhsTags>) => {
            return {
              export: row.tags?.project ?? DatatableUtils.blank,
              tooltip: row.tags?.project,
              value: row.tags?.project ?? SheetUtils.blank,
              label: (
                <IpSelectSingle
                  hideNullOption
                  disabled={!ctx.canEdit}
                  value={row.tags?.project}
                  placeholder={m.project}
                  onChange={_ => ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key: 'project'})}
                  options={currentProtectionProjects.map(k => ({value: k, children: k}))}
                />
              )
            }
          }
        }
      ],
      [KoboIndex.byName('protection_hhs2_1').id]: [
        {
          id: 'tags_project',
          head: m.project,
          type: 'select_multiple',
          width: 200,
          options: () => SheetUtils.buildOptions(Obj.keys(DrcProject), true),
          render: (row: KoboAnswerFlat<any, ProtectionHhsTags>) => {
            return {
              export: row.tags?.projects?.join(' | ') ?? DatatableUtils.blank,
              tooltip: row.tags?.projects,
              value: map(row.tags?.projects, p => p.length === 0 ? undefined : p) ?? [SheetUtils.blank],
              label: (
                <IpSelectMultiple
                  disabled={!ctx.canEdit}
                  value={row.tags?.projects ?? []}
                  onChange={_ => ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key: 'projects'})}
                  options={currentProtectionProjects.map(k => ({value: k, children: k}))}
                />
              )
            }
          }
        }
      ],
      [KoboIndex.byName('protection_hhs3').id]: [
        {
          id: 'tags_project',
          head: m.project,
          type: 'select_multiple',
          width: 200,
          options: () => SheetUtils.buildOptions(Obj.keys(DrcProject), true),
          render: (row: KoboAnswerFlat<any, ProtectionHhsTags>) => {
            const safeProjects = safeArray(row.tags?.projects)
            return {
              export: safeProjects.join(' | ') ?? DatatableUtils.blank,
              tooltip: safeProjects,
              value: safeProjects.length === 0 ? [SheetUtils.blank] : safeProjects,
              label: (
                <IpSelectMultiple
                  disabled={!ctx.canEdit}
                  value={safeProjects}
                  onChange={_ => ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key: 'projects'})}
                  options={currentProtectionProjects.map(k => ({value: k, children: k}))}
                />
              )
            }
          }
        }
      ]
    }
    return extra[ctx.form.id] ?? []
  }, [ctx.form.id])
}