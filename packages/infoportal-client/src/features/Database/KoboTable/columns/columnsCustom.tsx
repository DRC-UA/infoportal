import {match, Obj, seq} from '@axanc/ts-utils'
import {Kobo} from 'kobo-sdk'

import {
  Bn_rapidResponse,
  Bn_rapidResponse2,
  Bn_re,
  Cbp_pre_post,
  currentProtectionProjects,
  DrcProgram,
  DrcProject,
  Ecrec_cashRegistration,
  Ecrec_msmeGrantEoi,
  Ecrec_vet2_dmfa,
  Ecrec_vet_bha388,
  KoboBaseTags,
  KoboEcrec_cashRegistration,
  KoboIndex,
  KoboSubmissionFlat,
  KoboTagStatus,
  KoboXmlMapper,
  Protection_gbv,
  Protection_pfa_training_test,
  ProtectionHhsTags,
  safeArray,
} from 'infoportal-common'

import {KoboUpdateContext} from '@/core/context/KoboUpdateContext'
import {Messages} from '@/core/i18n/localization/en'
import {KoboMappedAnswer} from '@/core/sdk/server/kobo/KoboMapper'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {StateStatusIcon, SelectStatusBy, SelectStatusConfig} from '@/shared/customInput/SelectStatus'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {KoboEditModalOption} from '@/shared/koboEdit/KoboUpdateModal'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {TableEditCellBtn} from '@/shared/TableEditCellBtn'

export const getColumnsCustom = ({
  selectedIds,
  m,
  formId,
  getRow = (_) => _ as unknown as any,
  ctxUpdate,
  canEdit,
}: {
  canEdit?: boolean
  formId: Kobo.FormId
  getRow?: (_: any) => any
  selectedIds: Kobo.SubmissionId[]
  ctxUpdate: KoboUpdateContext
  m: Messages
}): DatatableColumn.Props<KoboMappedAnswer>[] => {
  const getSelectMultipleTagSubHeader = ({
    tag,
    options,
    type = 'select_one',
  }: {
    type?: 'select_one' | 'select_multiple'
    tag: string
    options: string[] | KoboEditModalOption[]
  }) =>
    selectedIds.length > 0 && (
      <TableEditCellBtn
        onClick={() =>
          ctxUpdate.openById({
            target: 'tag',
            params: {
              formId: formId,
              answerIds: selectedIds,
              type,
              tag,
              options,
            },
          })
        }
      />
    )

  const scoring_ecrec: DatatableColumn.Props<any>[] = [
    {
      id: 'vulnerability_ecrec_vet',
      head: m.vulnerability,
      type: 'number',
      render: (
        row: KoboSubmissionFlat<Ecrec_vet_bha388.T | Ecrec_vet2_dmfa.T, any> & {
          custom: KoboXmlMapper.Breakdown
        },
      ) => {
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
          income: 0,
        }
        scoring.householdSize_bha += match('' + row.number_people!)
          .cases({
            1: 2,
            2: 1,
            3: 2,
            4: 3,
          })
          .default(() => 0)
        if (row.number_people! >= 5) scoring.householdSize_bha += 5

        if (row.res_stat === 'displaced') {
          if (['more_24m', '12_24m'].includes(row.long_displaced!)) scoring.residenceStatus += 2
          else if (['less_3m', '3_6m', '6_12m'].includes(row.long_displaced!)) scoring.residenceStatus += 3
        }
        const disabilitiesCount =
          row.family_member?.filter((member) => ['one', 'two', 'fri'].includes(member.dis_level!)).length || 0
        scoring.pwd += disabilitiesCount === 1 ? 1 : disabilitiesCount >= 2 ? 3 : 0

        scoring.chronic_disease += row.many_chronic_diseases! === 1 ? 1 : row.many_chronic_diseases! >= 2 ? 3 : 0

        if (row.single_parent === 'yes') scoring.singleParent += 2

        if (row.elderly_people === 'yes') {
          if (row.many_elderly_people! >= 2) scoring.elderly += 3
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
          else if (row.number_people !== 0 && row.household_income / row.number_people! < minimumWageUah)
            scoring.income += 3
        }

        const total = seq(Obj.values(scoring)).sum()
        return {
          value: total,
          export: total,
          label: (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <span style={{display: 'inline-block', width: '100%'}}>{total}</span>
              <TableIcon
                color="disabled"
                sx={{ml: 0.5}}
                tooltip={
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
                }
              >
                help
              </TableIcon>
            </div>
          ),
        }
      },
    },
  ]

  const individualsBreakdown: DatatableColumn.Props<any>[] = [
    {
      id: 'custom_children',
      head: m.minors + ' < 18',
      type: 'number',
      width: 20,
      renderQuick: (row: any) => (getRow(row) as {custom: KoboXmlMapper.Breakdown}).custom?.childrenCount,
    },
    {
      id: 'custom_adult',
      head: m.adults + ' 18 ≤ age < 60',
      type: 'number',
      width: 20,
      renderQuick: (row: any) => (getRow(row) as {custom: KoboXmlMapper.Breakdown}).custom?.adultCount,
    },
    {
      id: 'custom_elderly',
      head: m.elderly + ' 60+',
      type: 'number',
      width: 20,
      renderQuick: (row: any) => (getRow(row) as {custom: KoboXmlMapper.Breakdown}).custom?.elderlyCount,
    },
    {
      id: 'custom_disabilitiesCount',
      head: m.PwDs,
      type: 'number',
      width: 20,
      renderQuick: (row: any) => (getRow(row) as {custom: KoboXmlMapper.Breakdown}).custom?.disabilitiesCount,
    },
    {
      id: 'custom_disabilities',
      head: m.disabilities,
      type: 'select_multiple',
      options: () =>
        Obj.entries(Ecrec_cashRegistration.options.hh_char_dis_select).map(([k, v]) =>
          DatatableUtils.buildCustomOption(k, v),
        ),
      render: (_: any) => {
        const row: {custom: KoboXmlMapper.Breakdown} = getRow(_)
        return {
          value: getRow(row).custom?.disabilities,
          label: getRow(row).custom?.disabilities.join(' | '),
        }
      },
    },
    {
      id: 'hohh_age',
      width: 0,
      head: m.hohhAge,
      type: 'number',
      renderQuick: (row: any) => (getRow(row) as {custom: KoboXmlMapper.Breakdown}).custom?.persons[0]?.age,
    },
  ]
  const lastStatusUpdate = ({
    showIf,
  }: {
    showIf?: (_: KoboSubmissionFlat<any, any>) => boolean
  } = {}): DatatableColumn.Props<any> => ({
    id: 'lastStatusUpdate',
    width: 129,
    head: m.paidOn,
    type: 'date',
    subHeader: selectedIds.length > 0 && (
      <TableEditCellBtn
        onClick={() =>
          ctxUpdate.openById({
            target: 'tag',
            params: {
              formId: formId,
              answerIds: selectedIds,
              type: 'date',
              tag: 'lastStatusUpdate',
            },
          })
        }
      />
    ),
    render: (_: any) => {
      const row: KoboSubmissionFlat<{}, KoboBaseTags & KoboTagStatus> = getRow(_)
      if (showIf && !showIf(row)) return {label: '', value: undefined}
      const date = row.tags?.lastStatusUpdate ? new Date(row.tags?.lastStatusUpdate) : undefined
      return {
        value: date,
        label: (
          <IpDatepicker
            value={date}
            onChange={(_) => {
              ctxUpdate.asyncUpdateById.tag.call({
                formId: formId,
                answerIds: [row.id],
                value: _,
                tag: 'lastStatusUpdate',
              })
            }}
          />
        ),
      }
    },
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
          options: Obj.values(SelectStatusConfig.enumStatus[enumerator]).map((_) => ({
            value: _,
            label: _,
            before: (
              <StateStatusIcon
                sx={{alignSelf: 'center', mr: 1}}
                type={SelectStatusConfig.customStatusToStateStatus[enumerator][_]}
              />
            ),
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
                onChange={(_) => {
                  ctxUpdate.asyncUpdateById.tag.call({
                    formId: formId,
                    answerIds: [row.id],
                    value: _,
                    tag: tag,
                  })
                }}
              />
            ),
          }
        },
      },
      lastStatusUpdate({
        // showIf Always show because for BNRE, teams submit submission after having delivered the kits. So this is needed to report correct date.
      }),
    ]
  }

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
            return (
              count +
              (participant.hh_char_hh_new_ben === 'yes' &&
              participant.hh_char_hh_det_age !== undefined &&
              participant.hh_char_hh_det_gender !== undefined
                ? 1
                : 0)
            )
          }, 0)
        }
        return 0
      },
    },
  ]
  const ecrecScore: DatatableColumn.Props<any>[] = [
    {
      id: 'vulnerability_sore',
      head: m.vulnerability,
      type: 'number',
      renderQuick: (_) => getRow(_).custom.vulnerability,
    },
    {
      id: 'eligibility_score',
      head: m.vulnerability,
      type: 'select_one',
      renderQuick: (_) => {
        return getRow(_).custom.eligibility ? 'Yes' : 'No'
      },
    },
  ]

  const custom: Record<string, DatatableColumn.Props<any>[]> = {
    [KoboIndex.byName('ecrec_vet_bha388').id]: [...scoring_ecrec],
    [KoboIndex.byName('ecrec_vet2_dmfa').id]: [...scoring_ecrec],
    [KoboIndex.byName('shelter_nta').id]: [...individualsBreakdown],
    [KoboIndex.byName('bn_cashForRentRegistration').id]: [
      ...getPaymentStatusByEnum({enumerator: 'CashForRentStatus'}),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('bn_cashForRentApplication').id]: [...individualsBreakdown],
    [KoboIndex.byName('bn_rapidResponse').id]: [
      ...getPaymentStatusByEnum({
        showIf: (_: KoboSubmissionFlat<Bn_rapidResponse.T>) =>
          !!(_.back_prog_type ?? _.back_prog_type_l)?.find((_) => /mpca|cf|csf/.test(_)),
      }),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('bn_rapidResponse2').id]: [
      ...getPaymentStatusByEnum({
        showIf: (_: KoboSubmissionFlat<Bn_rapidResponse2.T>) => !!_.back_prog_type?.includes('mpca'),
      }),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('bn_re').id]: [
      ...getPaymentStatusByEnum({
        showIf: (_: KoboSubmissionFlat<Bn_re.T>) => !!_.back_prog_type?.find((_) => /mpca|cf|csf/.test(_)),
      }),
      ...individualsBreakdown,
      {
        id: 'eligibility_summary_esk2',
        head: m.mpca.eskAllowance,
        type: 'number',
        renderQuick: (row: KoboSubmissionFlat<Bn_re.T, any>) => {
          return row.estimate_sqm_damage !== undefined ? (row.estimate_sqm_damage <= 15 ? 1 : 2) : undefined
        },
      },
    ],
    [KoboIndex.byName('protection_gbv').id]: [...beneficiaries],
    [KoboIndex.byName('protection_pss').id]: [...beneficiaries],
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
        options: () =>
          DatatableUtils.buildOptions(
            [
              DrcProgram.SectoralCashForAgriculture,
              DrcProgram.SectoralCashForAnimalFeed,
              DrcProgram.SectoralCashForAnimalShelterRepair,
            ],
            true,
          ),
        render: (_) => {
          const programs = KoboEcrec_cashRegistration.getProgram(getRow(_))
          return {
            value: programs,
            label: programs.join(' | '),
            title: programs.join(' | '),
          }
        },
      },
    ],
    [KoboIndex.byName('ecrec_cashRegistrationBha').id]: [
      ...getPaymentStatusByEnum(),
      ...individualsBreakdown,
      ...ecrecScore,
    ],
    [KoboIndex.byName('ecrec_vetEvaluation').id]: [...individualsBreakdown],
    [KoboIndex.byName('ecrec_vetApplication').id]: [
      ...getPaymentStatusByEnum({width: 188, enumerator: 'VetApplicationStatus'}),
      ...individualsBreakdown,
    ],
    [KoboIndex.byName('ecrec_msmeGrantEoi').id]: [
      {
        id: 'vulnerability',
        head: m.vulnerability,
        type: 'number',
        render: (row: KoboSubmissionFlat<Ecrec_msmeGrantEoi.T, any> & {custom: KoboXmlMapper.Breakdown}) => {
          const minimumWageUah = 7100
          const scoring = {
            householdSize: 0,
            residenceStatus: 0,
            pwd: 0,
            singleParent: 0,
            elderly: 0,
            pregnantLactating: 0,
            income: 0,
          }
          scoring.householdSize += match(row.ben_det_hh_size)
            .cases({
              1: 2,
              2: 0,
              3: 2,
              4: 3,
              5: 5,
            })
            .default(() => 0)

          if (row.ben_det_res_stat === 'idp') {
            scoring.residenceStatus += 3
          }

          const disabilitiesCount =
            row.hh_char_hh_det?.filter((member) => member.hh_char_hh_det_dis_select?.includes('diff_none')).length || 0
          scoring.pwd += disabilitiesCount === 1 ? 1 : disabilitiesCount >= 2 ? 3 : 0

          if (['single', 'widow', 'div_sep'].includes(row.ben_det_res_stat!) && row.custom.childrenCount > 0) {
            scoring.singleParent += 2
          }

          const elderlyCount = row.hh_char_hh_det?.filter((member) => member.calc_o60 === 'yes').length || 0
          scoring.elderly += elderlyCount === 1 ? 1 : elderlyCount >= 2 ? 3 : 0

          const pregnantOrLactatingCount =
            row.hh_char_hh_det?.filter((member) => member.calc_preg === 'yes').length || 0
          scoring.pregnantLactating += pregnantOrLactatingCount === 1 ? 1 : pregnantOrLactatingCount >= 2 ? 3 : 0

          if (row.ben_det_income !== undefined) {
            if (row.ben_det_income < minimumWageUah) scoring.income += 5
            else if (row.ben_det_income < minimumWageUah * 2) scoring.income += 3
          }

          const total = seq(Obj.values(scoring)).sum()
          return {
            value: total,
            export: total,
            label: (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{display: 'inline-block', width: '100%'}}>{total}</span>
                <TableIcon
                  color="disabled"
                  sx={{ml: 0.5}}
                  tooltip={
                    <ul>
                      <li>Size of household: {scoring.householdSize}</li>
                      <li>Residence Status: {scoring.residenceStatus}</li>
                      <li>PWD: {scoring.pwd}</li>
                      <li>Single Parent: {scoring.singleParent}</li>
                      <li>Elderly: {scoring.elderly}</li>
                      <li>Pregnant/Lactating woman: {scoring.pregnantLactating}</li>
                      <li>Income: {scoring.income}</li>
                    </ul>
                  }
                >
                  help
                </TableIcon>
              </div>
            ),
          }
        },
      },
    ],
    [KoboIndex.byName('protection_pfa_training_test').id]: [
      {
        id: 'score_protection_pfa_training_test',
        head: m.scoring,
        type: 'number',
        render: (
          row: KoboSubmissionFlat<Protection_pfa_training_test.T, any> & {
            custom: KoboXmlMapper.Breakdown
          },
        ) => {
          const scoring = {
            objectives_pfa: 0,
            everyone_stressful_situatuon: 0,
            automatic_reactions_situation: 0,
            pfa_counselling_psychotherapy: 0,
            technique_active_listening: 0,
            key_elements_pfa: 0,
            more_help_better: 0,
            prevent_further_harm: 0,
          }
          if (row.objectives_pfa?.some((objective) => objective === 'all')) scoring.objectives_pfa += 1
          if (row.everyone_stressful_situatuon! === 'false') scoring.everyone_stressful_situatuon += 1
          if (row.automatic_reactions_situation?.some((situation) => situation === 'fight_flight'))
            scoring.automatic_reactions_situation += 1
          if (row.pfa_counselling_psychotherapy! === 'false') scoring.pfa_counselling_psychotherapy += 1
          const requiredTechniques = ['body_language', 'noding', 'paraphrasing', 'asking_questions'] as const
          if (requiredTechniques.every((technique) => row.technique_active_listening?.includes(technique))) {
            scoring.technique_active_listening += 1
          }
          if (row.key_elements_pfa! === 'safety_help_person') scoring.key_elements_pfa += 1
          if (row.more_help_better! === 'no') scoring.more_help_better += 1
          if (row.prevent_further_harm?.some((prevent) => prevent === 'all')) scoring.prevent_further_harm += 1

          const total = seq(Obj.values(scoring)).sum()
          return {
            value: total,
            export: total,
            label: (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{display: 'inline-block', width: '100%'}}>{total}</span>
                <TableIcon
                  color="disabled"
                  sx={{ml: 0.5}}
                  tooltip={
                    <ul>
                      <li>1: {scoring.objectives_pfa}</li>
                      <li>2: {scoring.everyone_stressful_situatuon}</li>
                      <li>3: {scoring.automatic_reactions_situation}</li>
                      <li>4: {scoring.pfa_counselling_psychotherapy}</li>
                      <li>5: {scoring.technique_active_listening}</li>
                      <li>6: {scoring.key_elements_pfa}</li>
                      <li>7: {scoring.more_help_better}</li>
                      <li>8: {scoring.prevent_further_harm}</li>
                    </ul>
                  }
                >
                  help
                </TableIcon>
              </div>
            ),
          }
        },
      },
    ],
    [KoboIndex.byName('protection_communityMonitoring').id]: [
      {
        id: 'tags_project',
        head: m.project,
        type: 'select_multiple',
        width: 200,
        subHeader: selectedIds.length > 0 && (
          <TableEditCellBtn
            onClick={() =>
              ctxUpdate.openById({
                target: 'tag',
                params: {
                  formId: formId,
                  answerIds: selectedIds,
                  type: 'select_one',
                  tag: 'project',
                  options: currentProtectionProjects,
                },
              })
            }
          />
        ),
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
                onChange={(_) => {
                  ctxUpdate.asyncUpdateById.tag.call({
                    formId: formId,
                    answerIds: [row.id],
                    value: _,
                    tag: 'project',
                  })
                }}
                options={currentProtectionProjects.map((k) => ({value: k, children: k}))}
              />
            ),
          }
        },
      },
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
                onChange={(_) => {
                  ctxUpdate.asyncUpdateById.tag.call({
                    formId: formId,
                    answerIds: [row.id],
                    value: _,
                    tag: 'project',
                  })
                }}
                options={currentProtectionProjects.map((k) => ({value: k, children: k}))}
              />
            ),
          }
        },
      },
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
                onChange={(_) => {
                  ctxUpdate.asyncUpdateById.tag.call({
                    formId: formId,
                    answerIds: [row.id],
                    value: _,
                    tag: 'projects',
                  })
                }}
                options={currentProtectionProjects.map((k) => ({value: k, children: k}))}
              />
            ),
          }
        },
      },
    ],
    [KoboIndex.byName('cbp_pre_post').id]: [
      {
        id: 'score_cbp_pre_post',
        head: m.scoring,
        type: 'number',
        render: (
          row: KoboSubmissionFlat<Cbp_pre_post.T, any> & {
            custom: KoboXmlMapper.Breakdown
          },
        ) => {
          const scoring = {
            // Humantiarian Principles and Protection Mainstreaming
            humanitarian_principles: 0,
            impartiality_means: 0,
            protection_responsibility_organisations: 0,
            protection_mainstreaming_described: 0,
            elements_protection_mainstreaming: 0,
            affected_population_information: 0,

            // Safe referrals
            referral_considered_safe: 0,
            guiding_principles_referrals: 0,
            correct_referral_process: 0,
            service_mapping_identifies: 0,
            not_promise_anything: 0,
            referrals_personal_data: 0,

            // Advocacy
            what_advocacy: 0,
            effective_advocacy_requires: 0,
            problem_tree_advocacy: 0,
            advocacy_goal: 0,
            difference_goal_objectives: 0,
            power_mapping_advocacy: 0,
            get_message_influence: 0,

            // PFA
            elements_define_pfa: 0,
            everyone_stressful_situatuon: 0,
            automatic_reactions_situation: 0,
            pfa_counselling_psychotherapy: 0,
            technique_active_listening: 0,
            key_elements_pfa: 0,
            more_help_better: 0,
            prevent_further_harm: 0,
            practised_providing_pfa: 0,
            feel_confident_pfa: 0,
            relevant_skills_pfa: 0,

            // PSEAH
            sex_anyone_over_16: 0,
            idp_same_standards_sexual: 0,
            anything_recipients_assistance: 0,
            afterwork_nobody_business: 0,
            sex_with_sexworkers: 0,
            sexual_exploitation_abuse: 0,
            sexual_relations_beneficiary: 0,
            volunteer_power_influence: 0,
            witnessed_sexual_comment: 0,
          }
          if (row.topic! === 'hum_pri_pro_main') {
            if (row.humanitarian_principles! === 'hum_imp_neu_ind') scoring.humanitarian_principles += 1
            if (row.impartiality_means! === 'true') scoring.impartiality_means += 1
            if (row.protection_responsibility_organisations! === 'false')
              scoring.protection_responsibility_organisations += 1
            if (row.protection_mainstreaming_described! === 'incorporating')
              scoring.protection_mainstreaming_described += 1
            if (row.elements_protection_mainstreaming! === 'prioritise_safety')
              scoring.elements_protection_mainstreaming += 1
            if (row.affected_population_information! === 'false') scoring.affected_population_information += 1
          } else if (row.topic === 'safe_referrals') {
            if (row.referral_considered_safe! === 'based_needs') scoring.referral_considered_safe += 1
            if (row.guiding_principles_referrals?.some((guiding) => guiding === 'all'))
              scoring.guiding_principles_referrals += 1
            if (row.correct_referral_process! === 'ser_map_pri_ref') scoring.correct_referral_process += 1
            if (row.service_mapping_identifies! === 'true') scoring.service_mapping_identifies += 1
            if (row.not_promise_anything! === 'true') scoring.not_promise_anything += 1
            if (row.referrals_personal_data! === 'basic_personal_data') scoring.referrals_personal_data += 1
          } else if (row.topic === 'advocacy') {
            if (row.what_advocacy! === 'means_change') scoring.what_advocacy += 1
            if (row.effective_advocacy_requires! === 'true') scoring.effective_advocacy_requires += 1
            if (row.problem_tree_advocacy! === 'identify_visualize') scoring.problem_tree_advocacy += 1
            if (row.advocacy_goal! === 'true') scoring.advocacy_goal += 1
            if (row.difference_goal_objectives! === 'big_change') scoring.difference_goal_objectives += 1
            if (row.power_mapping_advocacy! === 'identify_key') scoring.power_mapping_advocacy += 1
            if (row.get_message_influence?.some((message) => message === 'all')) scoring.get_message_influence += 1
          } else if (row.topic === 'pfa') {
            if (row.elements_define_pfa?.some((elements) => elements === 'all')) scoring.elements_define_pfa += 1
            if (row.everyone_stressful_situatuon! === 'false') scoring.everyone_stressful_situatuon += 1
            if (row.automatic_reactions_situation?.some((reactions) => reactions === 'all'))
              scoring.automatic_reactions_situation += 1
            if (row.pfa_counselling_psychotherapy! === 'false') scoring.pfa_counselling_psychotherapy += 1
            if (
              row.technique_active_listening?.includes('body_language') &&
              row.technique_active_listening.includes('noding') &&
              row.technique_active_listening.includes('paraphrasing') &&
              row.technique_active_listening.includes('asking_questions')
            )
              scoring.technique_active_listening += 1
            if (row.key_elements_pfa! === 'look_listen_link') scoring.key_elements_pfa += 1
            if (row.more_help_better! === 'no') scoring.more_help_better += 1
            if (row.prevent_further_harm?.some((prevent_further_harm) => prevent_further_harm === 'all'))
              scoring.prevent_further_harm += 1
            if (['strongly_agree', 'agree'].includes(row.practised_providing_pfa!)) scoring.practised_providing_pfa += 1
            if (['strongly_agree', 'agree'].includes(row.feel_confident_pfa!)) scoring.feel_confident_pfa += 1
            if (['strongly_agree', 'agree'].includes(row.relevant_skills_pfa!)) scoring.relevant_skills_pfa += 1
          } else if (row.topic === 'pseah') {
            if (row.sex_anyone_over_16! === 'no') scoring.sex_anyone_over_16 += 1
            if (row.idp_same_standards_sexual! === 'yes') scoring.idp_same_standards_sexual += 1
            if (row.anything_recipients_assistance! === 'no') scoring.anything_recipients_assistance += 1
            if (row.afterwork_nobody_business! === 'no') scoring.afterwork_nobody_business += 1
            if (row.sex_with_sexworkers! === 'no') scoring.sex_with_sexworkers += 1
            if (row.sexual_exploitation_abuse! === 'yes') scoring.sexual_exploitation_abuse += 1
            if (row.sexual_relations_beneficiary! === 'yes') scoring.sexual_relations_beneficiary += 1
            if (row.volunteer_power_influence! === 'yes') scoring.volunteer_power_influence += 1
            if (row.witnessed_sexual_comment! === 'no') scoring.witnessed_sexual_comment += 1
          }

          const total = seq(Obj.values(scoring)).sum()
          return {
            value: total,
            export: total,
            label: (
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{display: 'inline-block', width: '100%'}}>{total}</span>
              </div>
            ),
          }
        },
      },
    ],
  }

  return custom[formId] ?? []
}
