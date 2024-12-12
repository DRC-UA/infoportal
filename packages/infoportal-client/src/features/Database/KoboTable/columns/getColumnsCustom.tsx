import {KoboMappedAnswer} from '@/core/sdk/server/kobo/KoboMapper'
import {
  Bn_rapidResponse,
  Bn_rapidResponse2,
  Bn_re,
  currentProtectionProjects,
  DrcProgram,
  DrcProject,
  Ecrec_cashRegistration,
  Ecrec_msmeGrantEoi,
  KoboSubmissionFlat,
  KoboBaseTags,
  KoboEcrec_cashRegistration,
  KoboGeneralMapping,
  KoboIndex,
  KoboTagStatus,
  Protection_gbv,
  ProtectionHhsTags,
  safeArray,
  Ecrec_vet_bha388,
} from 'infoportal-common'
import React from 'react'
import {fnSwitch, Obj, seq} from '@alexandreannic/ts-utils'
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
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {Kobo} from 'kobo-sdk'

export const getColumnsCustom = ({
  selectedIds,
  m,
  formId,
  getRow = _ => _ as unknown as any,
  // openEditAnswer,
  openEditTag,
  // asyncUpdateAnswerById,
  asyncUpdateTagById,
  canEdit,
}: {
  canEdit?: boolean
  formId: Kobo.FormId
  getRow?: (_: any) => any,
  selectedIds: Kobo.SubmissionId[]
  openEditTag: KoboEditTagsContext['open']
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
    {
      id: 'hohh_age',
      width: 0,
      head: m.hohhAge,
      type: 'number',
      renderQuick: (row: any) => (getRow(row) as {custom: KoboGeneralMapping.IndividualBreakdown}).custom?.persons[0]?.age,
    }
  ]
  const lastStatusUpdate = ({
    showIf
  }: {
    showIf?: (_: KoboSubmissionFlat<any, any>) => boolean
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
      const row: KoboSubmissionFlat<{}, KoboBaseTags & KoboTagStatus> = getRow(_)
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
    showIf?: (_: KoboSubmissionFlat<any, any>) => boolean
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
          const row: KoboSubmissionFlat<{}, any> = getRow(_)
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
        const row: KoboSubmissionFlat<Protection_gbv.T, any> = getRow(_)
        if (row.new_ben === 'yes') {
          return row.numb_part || 0
        } else if (row.new_ben === 'bno' && row.hh_char_hh_det) {
          return row.hh_char_hh_det.reduce((count, participant) => {
            return count + (participant.hh_char_hh_new_ben === 'yes' && participant.hh_char_hh_det_age !== undefined && participant.hh_char_hh_det_gender !== undefined ? 1 : 0)
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
        showIf: (_: KoboSubmissionFlat<Bn_rapidResponse.T>) => !!(_.back_prog_type ?? _.back_prog_type_l)?.find(_ => /mpca|cf|csf/.test(_))
      }),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('bn_rapidResponse2').id]: [
      ...getPaymentStatusByEnum({
        showIf: (_: KoboSubmissionFlat<Bn_rapidResponse2.T>) => !!(_.back_prog_type)?.includes('mpca')
      }),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('bn_re').id]: [
      ...getPaymentStatusByEnum({
        showIf: (_: KoboSubmissionFlat<Bn_re.T>) => !!_.back_prog_type?.find(_ => /mpca|cf|csf/.test(_))
      }),
      ...individualsBreakdown,
      {
        id: 'eligibility_summary_esk2',
        head: m.mpca.eskAllowance,
        type: 'number',
        renderQuick: (row: KoboSubmissionFlat<Bn_re.T, any>) => {
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
      ...ecrecScore,
    ],
    [KoboIndex.byName('ecrec_vetEvaluation').id]: [
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('ecrec_vetApplication').id]: [
      ...getPaymentStatusByEnum({width: 188, enumerator: 'VetApplicationStatus'}),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('ecrec_msmeGrantEoi').id]: [
      {
        id: 'vulnerability',
        head: m.vulnerability,
        type: 'number',
        render: (row: KoboSubmissionFlat<Ecrec_msmeGrantEoi.T, any> & {custom: KoboGeneralMapping.IndividualBreakdown}) => {
          const minimumWageUah = 7100
          const scoring = {
            householdSize: 0,
            residenceStatus: 0,
            pwd: 0,
            singleParent: 0,
            elderly: 0,
            pregnantLactating: 0,
            income: 0
          }
          scoring.householdSize += fnSwitch(row.ben_det_hh_size!, {
            1: 2,
            2: 0,
            3: 2,
            4: 3,
            5: 5
          }, () => 0)

          if (row.ben_det_res_stat === 'idp') {
            scoring.residenceStatus += 3
          }

          const disabilitiesCount = row.hh_char_hh_det?.filter(member => member.hh_char_hh_det_dis_select?.includes('diff_none')).length || 0
          scoring.pwd += disabilitiesCount === 1 ? 1 : disabilitiesCount >= 2 ? 3 : 0

          if (['single', 'widow', 'div_sep'].includes(row.ben_det_res_stat!) && row.custom.childrenCount > 0) {
            scoring.singleParent += 2
          }

          const elderlyCount = row.hh_char_hh_det?.filter(member => member.calc_o60 === 'yes').length || 0
          scoring.elderly += elderlyCount === 1 ? 1 : elderlyCount >= 2 ? 3 : 0

          const pregnantOrLactatingCount = row.hh_char_hh_det?.filter(member => member.calc_preg === 'yes').length || 0
          scoring.pregnantLactating += pregnantOrLactatingCount === 1 ? 1 : pregnantOrLactatingCount >= 2 ? 3 : 0

          if (row.ben_det_income !== undefined) {
            if (row.ben_det_income < minimumWageUah) scoring.income += 5
            else if (row.ben_det_income < minimumWageUah * 2) scoring.income += 3
          }

          const total = seq(Obj.values(scoring)).sum()
          return {
            value: total,
            label: (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{display: 'inline-block', width: '100%'}}>{total}</span>
                <TableIcon color="disabled" sx={{ml: .5}} tooltip={
                  <ul>
                    <li>Size of household: {scoring.householdSize}</li>
                    <li>Residence Status: {scoring.residenceStatus}</li>
                    <li>PWD: {scoring.pwd}</li>
                    <li>Single Parent: {scoring.singleParent}</li>
                    <li>Elderly: {scoring.elderly}</li>
                    <li>Pregnant/Lactating woman: {scoring.pregnantLactating}</li>
                    <li>Income: {scoring.income}</li>
                  </ul>
                }>help</TableIcon>
              </div>
            )
          }
        }
      }
    ], 
    [KoboIndex.byName('ecrec_vet_bha388').id]: [
      {
        id: 'vulnerability_vet_bha388',
        head: m.vulnerability,
        type: 'number',
        render: (row: KoboSubmissionFlat<Ecrec_vet_bha388.T, any> & { custom: KoboGeneralMapping.IndividualBreakdown }) => {
          const minimumWageUah = 8000
          const scoring = {
            householdSize_bha: 0,
            residenceStatus: 0,
            pwd: 0,
            chronic_disease: 0,
            singleParent: 0,
            elderly: 0,
            pregnantLactating: 0,
            ex_combatants: 0,
            income: 0
          }
          scoring.householdSize_bha += fnSwitch('' + row.number_people!, {
            1: 2,
            2: 0,
            3: 2,
            4: 3,
          }, () => 0)
          if (row.number_people! >= 5) scoring.householdSize_bha += 5

          if (row.res_stat === 'displaced') {
            if (['more_24m', '12_24m'].includes(row.long_displaced!)) scoring.residenceStatus += 2
            else if (['less_3m', '3_6m', '6_12m'].includes(row.long_displaced!)) scoring.residenceStatus += 1
          }
          const disabilitiesCount = row.family_member?.filter(member => ['one', 'two', 'fri'].includes(member.dis_level!)).length || 0
          scoring.pwd += disabilitiesCount === 1 ? 1 : disabilitiesCount >= 2 ? 3 : 0

          scoring.chronic_disease += row.many_chronic_diseases! === 1 ? 1 : row.many_chronic_diseases! >= 2 ? 3 : 0

          if (row.single_parent === 'yes') scoring.singleParent += 2

          if (row.elderly_people === 'yes') {
            if (row.many_elderly_people! >= 2) scoring.elderly += 2
            else if (row.many_elderly_people === 1) scoring.elderly += 1
          }

          if (row.household_pregnant_that_breastfeeding === 'yes') {
            if (row.many_pregnant_that_breastfeeding! >= 2) scoring.pregnantLactating += 3
            else if (row.many_pregnant_that_breastfeeding === 1) scoring.pregnantLactating += 1
          }
          if (row.household_contain_excombatants === 'yes') {
            if (row.many_excombatants! >= 2) scoring.ex_combatants += 3
            else if (row.many_excombatants === 1) scoring.ex_combatants += 1
          }

          if (row.household_income !== undefined) {
            if (row.household_income < minimumWageUah) scoring.income += 5
            else if (row.number_people !== 0 && row.household_income / row.number_people! < minimumWageUah) scoring.income += 3;
          }

          const total = seq(Obj.values(scoring)).sum()
          return {
            value: total,
            label: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ display: 'inline-block', width: '100%' }}>{total}</span>
                <TableIcon color="disabled" sx={{ ml: .5 }} tooltip={
                  <ul>
                    <li>Size of household: {scoring.householdSize_bha}</li>
                    <li>Residence Status: {scoring.residenceStatus}</li>
                    <li>PWD: {scoring.pwd}</li>
                    <li>People with a chronic disease: {scoring.chronic_disease}</li>
                    <li>Single Parent: {scoring.singleParent}</li>
                    <li>Elderly: {scoring.elderly}</li>
                    <li>Pregnant/Lactating woman: {scoring.pregnantLactating}</li>
                    <li>Ex-combatants: {scoring.ex_combatants}</li>
                    <li>Income: {scoring.income}</li>
                  </ul>
                }>help</TableIcon>
              </div>
            )
          }
        }
      }
    ], 
      // {
      //   id: 'Eligibility',
      //   head: m.eligibility,
      //   type: 'select_one',
      //   width: 125,
      //   subHeader: selectedIds.length > 0 && (
      //     <TableEditCellBtn
      //       onClick={() => openEditTag({
      //         formId: formId,
      //         answerIds: selectedIds,
      //         type: 'select_one',
      //         options: [
      //           {value: 'yes', label: 'Yes'},
      //           {value: 'no', label: 'No'},
      //         ],
      //         tag: 'eligibility',
      //       })}
      //     />
      //   ),
      //   options: () => DatatableUtils.buildOptions(['yes', 'no']),
      //   render: (row: KoboSubmissionFlat<any, any>) => {
      //     const eligibilityCriteria = [
      //       {label: 'Employing up to 20 people', condition: row.many_people_employ === '20_more_people'},
      //       {label: 'Minimum 3 years experience', condition: row.experience_business === 'more_five_years'},
      //       {label: 'Commitment to recruit for 6 months', condition: row.recruiting_idp_6mout === 'yes'},
      //       {label: 'Business plan informed by market research', condition: row.plan_inoformed_market_research === 'yes'},
      //       {label: 'No other livelihoods support in the last 2 years', condition: row.received_any_assistance_ngo === 'no'}
      //     ]
      //
      //     const allCriteriaMet = eligibilityCriteria.every(criteria => criteria.condition)
      //     const initialEligibilityValue = row.tags?.eligibility ?? (allCriteriaMet ? 'yes' : 'no')
      //     const [eligibilityValue, setEligibilityValue] = useState<string>(initialEligibilityValue)
      //
      //     useEffect(() => {
      //       setEligibilityValue(initialEligibilityValue)
      //     }, [row.tags?.eligibility])
      //
      //     return {
      //       value: eligibilityValue,
      //       label: (
      //         <div style={{display: 'flex', alignItems: 'center'}}>
      //           <IpSelectSingle
      //             value={eligibilityValue}
      //             options={[
      //               {value: 'yes', children: 'Yes'},
      //               {value: 'no', children: 'No'},
      //             ]}
      //             onChange={(value, event) => {
      //               const newValue = value || ''
      //               setEligibilityValue(newValue)
      //               asyncUpdateTagById.call({
      //                 formId: formId,
      //                 answerIds: [row.id],
      //                 tag: 'eligibility',
      //                 value: newValue,
      //               }).then(() => {
      //                 // Update the state with the new value if necessary
      //                 setEligibilityValue(newValue)
      //               })
      //             }}
      //           />
      //           <Tooltip title={
      //             <ul>
      //               {eligibilityCriteria.map(criteria => (
      //                 <li key={criteria.label}>{criteria.label}: {criteria.condition ? 'Yes' : 'No'}</li>
      //               ))}
      //             </ul>
      //           }>
      //             <IconButton>
      //               <InfoIcon/>
      //             </IconButton>
      //           </Tooltip>
      //         </div>
      //       )
      //     }
      //   }
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
          const row: KoboSubmissionFlat<any, ProtectionHhsTags> = getRow(_)
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
          const row: KoboSubmissionFlat<any, ProtectionHhsTags> = getRow(_)
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
          const row: KoboSubmissionFlat<any, ProtectionHhsTags> = getRow(_)
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