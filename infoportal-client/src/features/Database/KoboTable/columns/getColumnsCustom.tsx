import {KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {
  Bn_rapidResponse,
  Bn_re,
  currentProtectionProjects,
  DrcProgram,
  DrcProject,
  Ecrec_cashRegistration,
  KoboAnswerFlat,
  KoboAnswerId,
  KoboBaseTags,
  KoboEcrec_cashRegistration,
  KoboGeneralMapping,
  KoboId,
  KoboIndex,
  KoboTagStatus,
  Protection_gbv,
  ProtectionHhsTags,
  safeArray,
} from '@infoportal-common'
import React from 'react'
import {Obj} from '@alexandreannic/ts-utils'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {OptionLabelTypeCompact, SelectStatusBy, SelectStatusConfig} from '@/shared/customInput/SelectStatus'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {TableEditCellBtn} from '@/shared/TableEditCellBtn'
import {KoboEditModalOption} from '@/shared/koboEdit/KoboEditModal'
import {Messages} from '@/core/i18n/localization/en'
import {KoboEditTagsContext} from '@/core/context/KoboEditTagsContext'

export const getColumnsCustom = ({
  selectedIds,
  m,
  formId,
  getRow = _ => _ as unknown as KoboMappedAnswer,
  // openEditAnswer,
  openEditTag,
  // asyncUpdateAnswerById,
  asyncUpdateTagById,
  canEdit,
}: {
  canEdit?: boolean
  formId: KoboId
  getRow?: (_: any) => any,
  selectedIds: KoboAnswerId[]
  // openEditAnswer: KoboEditAnswersContext['open']
  openEditTag: KoboEditTagsContext['open']
  // asyncUpdateAnswerById: KoboEditAnswersContext['asyncUpdateById']
  asyncUpdateTagById: KoboEditTagsContext['asyncUpdateById']
  m: Messages,
}): DatatableColumn.Props<KoboMappedAnswer>[] => {
  // const ctx = useDatabaseKoboTableContext()
  // const ctxEditTag = useKoboEditTagContext()
  // const {m} = useI18n()
  const getSelectMultipleTagSubHeader = ({tag, options, type = 'select_one'}: {
    type?: 'select_one' | 'select_multiple',
    tag: string,
    options: string [] | KoboEditModalOption[]
  }) => selectedIds.length > 0 && <TableEditCellBtn onClick={() => openEditTag({
    formId: formId,
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
      renderQuick: (row: any) => (getRow(row) as {custom: KoboGeneralMapping.IndividualBreakdown}).custom?.childrenCount,
    },
    {
      id: 'custom_adult',
      head: m.adults + ' 18 ≤ age < 60',
      type: 'number',
      width: 20,
      renderQuick: (row: any) => (getRow(row) as {custom: KoboGeneralMapping.IndividualBreakdown}).custom?.adultCount,
    },
    {
      id: 'custom_elderly',
      head: m.elderly + ' 60+',
      type: 'number',
      width: 20,
      renderQuick: (row: any) => (getRow(row) as {custom: KoboGeneralMapping.IndividualBreakdown}).custom?.elderlyCount,
    },
    {
      id: 'custom_disabilitiesCount',
      head: m.PwDs,
      type: 'number',
      width: 20,
      renderQuick: (row: any) => (getRow(row) as {custom: KoboGeneralMapping.IndividualBreakdown}).custom?.disabilitiesCount,
    },
    {
      id: 'custom_disabilities',
      head: m.disabilities,
      type: 'select_multiple',
      options: () => Obj.entries(Ecrec_cashRegistration.options.hh_char_dis_select).map(([k, v]) => DatatableUtils.buildCustomOption(k, v)),
      render: (_: any) => {
        const row: {custom: KoboGeneralMapping.IndividualBreakdown} = getRow(_)
        return {
          value: getRow(row).custom?.disabilities,
          label: getRow(row).custom?.disabilities.join(' | '),
        }
      }
    },
  ]
  const lastStatusUpdate = ({
    showIf
  }: {
    showIf?: (_: KoboAnswerFlat<any, any>) => boolean
  } = {}): DatatableColumn.Props<any> => ({
    id: 'lastStatusUpdate',
    width: 129,
    head: m.paidOn,
    type: 'date',
    subHeader: selectedIds.length > 0 && <TableEditCellBtn onClick={() => openEditTag({
      formId: formId,
      answerIds: selectedIds,
      type: 'date',
      tag: 'lastStatusUpdate',
    })}/>,
    render: (_: any) => {
      const row: KoboAnswerFlat<{}, KoboBaseTags & KoboTagStatus> = getRow(_)
      if (showIf && !showIf(row)) return {label: '', value: undefined}
      const date = row.tags?.lastStatusUpdate ? new Date(row.tags?.lastStatusUpdate) : undefined
      return {
        value: date,
        label: <IpDatepicker
          value={date}
          onChange={_ => {
            asyncUpdateTagById.call({
              formId: formId,
              answerIds: [row.id],
              value: _,
              tag: 'lastStatusUpdate'
            })
          }}
        />
      }
    }
  })
  const getPaymentStatusByEnum = ({
    enumerator = 'CashStatus',
    tag = 'status',
    width = 120,
    showIf,
  }: {
    width?: number
    enumerator?: SelectStatusConfig.EnumStatus
    tag?: string
    showIf?: (_: KoboAnswerFlat<any, any>) => boolean
  } = {}): DatatableColumn.Props<any>[] => {
    return [
      {
        id: tag,
        head: m.status,
        type: 'select_one',
        width,
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
        options: () => DatatableUtils.buildOptions(Obj.keys(SelectStatusConfig.enumStatus[enumerator]), true),
        render: (_: any) => {
          const row: KoboAnswerFlat<{}, any> = getRow(_)
          if (showIf && !showIf(row)) return {label: '', value: undefined}
          return {
            export: row.tags?.[tag],
            value: row.tags?.[tag],
            label: (
              <SelectStatusBy
                enum={enumerator}
                disabled={!canEdit}
                value={row.tags?.[tag]}
                placeholder={m.project}
                onChange={_ => {
                  asyncUpdateTagById.call({
                    formId: formId,
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
      lastStatusUpdate({
        // showIf Always show because for BNRE, teams submit submission after having delivered the kits. So this is needed to report correct date.
      }),
    ]
  }

  // const paymentStatusShelter = (): DatatableColumn.Props<any>[] => {
  //   return [
  //     {
  //       id: 'custom_status',
  //       head: m.status,
  //       type: 'select_one',
  //       width: 120,
  //       options: () => DatatableUtils.buildOptions(Obj.keys(ShelterCashStatus), true),
  //       render: (row: any) => {
  //         return {
  //           export: row.tags?.status ?? DatatableUtils.blank,
  //           value: row.tags?.status,
  //           label: (
  //             <SelectStatusBy
  //               enum="ShelterCashStatus"
  //               disabled={!canEdit}
  //               value={row.tags?.status}
  //               placeholder={m.project}
  //               onChange={_ => {
  //                 asyncUpdateById.call({
  //                   formId: formId,
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
      renderQuick: (_: any) => {
        const row: KoboAnswerFlat<Protection_gbv.T, any> = getRow(_)
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
      renderQuick: _ => getRow(_).custom.vulnerability,
    },
    {
      id: 'eligibility_score',
      head: m.vulnerability,
      type: 'select_one',
      renderQuick: _ => {
        return getRow(_).custom.eligibility ? 'Yes' : 'No'
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
      ...getPaymentStatusByEnum({enumerator: 'CashForRentStatus'}),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('bn_cashForRentApplication').id]: [
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('bn_rapidResponse').id]: [
      ...getPaymentStatusByEnum({
        showIf: (_: KoboAnswerFlat<Bn_rapidResponse.T>) => !!(_.back_prog_type ?? _.back_prog_type_l)?.find(_ => /mpca|cf|csf/.test(_))
      }),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('bn_re').id]: [
      ...getPaymentStatusByEnum({
        showIf: (_: KoboAnswerFlat<Bn_re.T>) => !!_.back_prog_type?.find(_ => /mpca|cf|csf/.test(_))
      }),
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
      ...getPaymentStatusByEnum({enumerator: 'ShelterCashStatus'}),
    ],
    [KoboIndex.byName('shelter_cashForShelter').id]: [
      ...getPaymentStatusByEnum({enumerator: 'ShelterCashStatus'}),
      // ...paymentStatusShelter(),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('ecrec_cashRegistration').id]: [
      ...getPaymentStatusByEnum(),
      ...individualsBreakdown,
      ...ecrecScore,
      {
        id: 'program',
        head: m.program,
        type: 'select_multiple',
        options: () => DatatableUtils.buildOptions([
          DrcProgram.SectoralCashForAgriculture,
          DrcProgram.SectoralCashForAnimalFeed,
          DrcProgram.SectoralCashForAnimalShelterRepair,
        ], true),
        render: _ => {
          const programs = KoboEcrec_cashRegistration.getProgram(getRow(_))
          return {
            value: programs,
            label: programs.join(' | '),
            title: programs.join(' | '),
          }
        }
      },
    ],
    [KoboIndex.byName('ecrec_cashRegistrationBha').id]: [
      ...getPaymentStatusByEnum(),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('ecrec_vetEvaluation').id]: [
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('ecrec_vetApplication').id]: [
      ...getPaymentStatusByEnum({width: 188, enumerator: 'VetApplicationStatus'}),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('protection_communityMonitoring').id]: [
      {
        id: 'tags_project',
        head: m.project,
        type: 'select_multiple',
        width: 200,
        subHeader: selectedIds.length > 0 && <TableEditCellBtn onClick={() => openEditTag({
          formId: formId,
          answerIds: selectedIds,
          type: 'select_one',
          tag: 'project',
          options: currentProtectionProjects,
        })}/>,
        options: () => DatatableUtils.buildOptions(Obj.keys(DrcProject), true),
        render: (_) => {
          const row: KoboAnswerFlat<any, ProtectionHhsTags> = getRow(_)
          return {
            export: row.tags?.project ?? DatatableUtils.blank,
            tooltip: row.tags?.project,
            value: row.tags?.project ?? DatatableUtils.blank,
            label: (
              <IpSelectSingle
                disabled={!canEdit}
                hideNullOption
                value={row.tags?.project}
                placeholder={m.project}
                onChange={_ => {
                  asyncUpdateTagById.call({
                    formId: formId,
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
        options: () => DatatableUtils.buildOptions(Obj.keys(DrcProject), true),
        render: (_: any) => {
          const row: KoboAnswerFlat<any, ProtectionHhsTags> = getRow(_)
          return {
            export: row.tags?.project ?? DatatableUtils.blank,
            tooltip: row.tags?.project,
            value: row.tags?.project ?? DatatableUtils.blank,
            label: (
              <IpSelectSingle
                hideNullOption
                disabled={!canEdit}
                value={row.tags?.project}
                placeholder={m.project}
                onChange={_ => {
                  asyncUpdateTagById.call({
                    formId: formId,
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
        options: () => DatatableUtils.buildOptions(Obj.keys(DrcProject), true),
        render: (_: any) => {
          const row: KoboAnswerFlat<any, ProtectionHhsTags> = getRow(_)
          const safeProjects = safeArray(row.tags?.projects)
          return {
            export: safeProjects.join(' | ') ?? DatatableUtils.blank,
            tooltip: safeProjects,
            value: safeProjects.length === 0 ? [DatatableUtils.blank] : safeProjects,
            label: (
              <IpSelectMultiple
                disabled={!canEdit}
                value={safeProjects}
                onChange={_ => {
                  asyncUpdateTagById.call({
                    formId: formId,
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
  return extra[formId] ?? []
}