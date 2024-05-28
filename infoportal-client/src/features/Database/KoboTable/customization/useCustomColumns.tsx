import {KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {
  Bn_re,
  currentProtectionProjects,
  DrcProject,
  Ecrec_cashRegistration,
  KoboAnswerFlat,
  KoboAnswerId,
  KoboBaseTags,
  KoboGeneralMapping,
  KoboIndex,
  KoboTagStatus,
  Protection_gbv,
  ProtectionHhsTags,
  safeArray,
} from '@infoportal-common'
import React, {useMemo} from 'react'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {map, Obj} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {OptionLabelTypeCompact, SelectStatusBy, SelectStatusConfig} from '@/shared/customInput/SelectStatus'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {useKoboEditTagContext} from '@/core/context/KoboEditTagsContext'
import {TableEditCellBtn} from '@/shared/TableEditCellBtn'
import {KoboEditModalOption} from '@/shared/koboEdit/KoboEditModal'

export const useCustomColumns = ({selectedIds}: {selectedIds: KoboAnswerId[]}): DatatableColumn.Props<KoboMappedAnswer>[] => {
  const ctx = useDatabaseKoboTableContext()
  const ctxEditTag = useKoboEditTagContext()
  const {m} = useI18n()
  return useMemo(() => {
    const getSelectMultipleTagSubHeader = ({tag, options, type = 'select_one'}: {
      type?: 'select_one' | 'select_multiple',
      tag: string,
      options: string [] | KoboEditModalOption[]
    }) => selectedIds.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.open({
      formId: ctx.form.id,
      answerIds: selectedIds,
      type,
      tag,
      options,
    })}/>

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
      subHeader: selectedIds.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.open({
        formId: ctx.form.id,
        answerIds: selectedIds,
        type: 'date',
        tag: 'lastStatusUpdate',
      })}/>,
      render: (row: KoboAnswerFlat<{}, KoboBaseTags & KoboTagStatus>) => {
        const date = row.tags?.lastStatusUpdate ? new Date(row.tags?.lastStatusUpdate) : undefined
        return {
          value: date,
          label: <IpDatepicker
            value={date}
            onChange={_ => {
              ctxEditTag.asyncUpdateById.call({
                formId: ctx.form.id,
                answerIds: [row.id],
                value: _,
                tag: 'lastStatusUpdate'
              })
            }}
          />
        }
      }
    }
    const getPaymentStatusByEnum = (
      enumerator: SelectStatusConfig.EnumStatus = 'CashStatus',
      tag: string = 'status'
    ): DatatableColumn.Props<any>[] => {
      return [
        {
          id: tag,
          head: m.status,
          type: 'select_one',
          width: 120,
          subHeader: getSelectMultipleTagSubHeader({
            tag,
            options: Obj.values(SelectStatusConfig.enumStatus[enumerator]).map(_ => ({
              value: _,
              label: _,
              before: <OptionLabelTypeCompact
                sx={{alignSelf: 'center', mr: 1}}
                type={SelectStatusConfig.statusType[enumerator][_]}
              />
            })),
          }),
          options: () => SheetUtils.buildOptions(Obj.keys(SelectStatusConfig.enumStatus[enumerator]), true),
          render: (row: KoboAnswerFlat<{}, any>) => {
            return {
              export: row.tags?.[tag],
              value: row.tags?.[tag],
              label: (
                <SelectStatusBy
                  enum={enumerator}
                  disabled={!ctx.canEdit}
                  value={row.tags?.[tag]}
                  placeholder={m.project}
                  onChange={_ => {
                    ctxEditTag.asyncUpdateById.call({
                      formId: ctx.form.id,
                      answerIds: [row.id],
                      value: _,
                      tag: tag
                    })
                  }}
                />
              )
            }
          }
        },
        lastStatusUpdate,
      ]
    }

    // const paymentStatusShelter = (): DatatableColumn.Props<any>[] => {
    //   return [
    //     {
    //       id: 'custom_status',
    //       head: m.status,
    //       type: 'select_one',
    //       width: 120,
    //       options: () => SheetUtils.buildOptions(Obj.keys(ShelterCashStatus), true),
    //       render: (row: any) => {
    //         return {
    //           export: row.tags?.status ?? DatatableUtils.blank,
    //           value: row.tags?.status,
    //           label: (
    //             <SelectStatusBy
    //               enum="ShelterCashStatus"
    //               disabled={!ctx.canEdit}
    //               value={row.tags?.status}
    //               placeholder={m.project}
    //               onChange={_ => {
    //                 ctxEditTag.asyncUpdateById.call({
    //                   formId: ctx.form.id,
    //                   answerIds: [row.id],
    //                   value: _,
    //                   tag: 'status'
    //                 })
    //               }}
    //             />
    //           )
    //         }
    //       }
    //     },
    //     lastStatusUpdate,
    //   ]
    // }
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
        ...getPaymentStatusByEnum('CashForRentStatus'),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('bn_cashForRentApplication').id]: [
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('bn_rapidResponse').id]: [
        ...getPaymentStatusByEnum(),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('bn_re').id]: [
        ...getPaymentStatusByEnum(),
        ...individualsBreakdown,
        {
          id: 'eligibility_summary_esk2',
          head: m.mpca.eskAllowance,
          type: 'number',
          renderQuick: (row: KoboAnswerFlat<Bn_re.T, any>) => {
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
        // ...paymentStatusShelter(),
        ...getPaymentStatusByEnum('ShelterCashStatus'),
      ],
      [KoboIndex.byName('shelter_cashForShelter').id]: [
        ...getPaymentStatusByEnum('ShelterCashStatus'),
        // ...paymentStatusShelter(),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('ecrec_cashRegistration').id]: [
        ...getPaymentStatusByEnum(),
        ...individualsBreakdown,
        ...ecrecScore,
      ],
      [KoboIndex.byName('ecrec_cashRegistrationBha').id]: [
        ...getPaymentStatusByEnum(),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('ecrec_trainingGrants').id]: [
        ...getPaymentStatusByEnum('CashForEduStatus'),
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('protection_communityMonitoring').id]: [
        {
          id: 'tags_project',
          head: m.project,
          type: 'select_multiple',
          width: 200,
          subHeader: selectedIds.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.open({
            formId: ctx.form.id,
            answerIds: selectedIds,
            type: 'select_one',
            tag: 'project',
            options: currentProtectionProjects,
          })}/>,
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
                  onChange={_ => {
                    ctxEditTag.asyncUpdateById.call({
                      formId: ctx.form.id,
                      answerIds: [row.id],
                      value: _,
                      tag: 'project'
                    })
                  }}
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
          subHeader: getSelectMultipleTagSubHeader({tag: 'project', options: currentProtectionProjects}),
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
                  onChange={_ => {
                    ctxEditTag.asyncUpdateById.call({
                      formId: ctx.form.id,
                      answerIds: [row.id],
                      value: _,
                      tag: 'project'
                    })
                  }}
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
          subHeader: getSelectMultipleTagSubHeader({tag: 'projects', options: currentProtectionProjects}),
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
                  onChange={_ => {
                    ctxEditTag.asyncUpdateById.call({
                      formId: ctx.form.id,
                      answerIds: [row.id],
                      value: _,
                      tag: 'projects'
                    })
                  }}
                  options={currentProtectionProjects.map(k => ({value: k, children: k}))}
                />
              )
            }
          }
        }
      ]
    }
    return extra[ctx.form.id] ?? []
  }, [ctx.form.id, selectedIds])
}