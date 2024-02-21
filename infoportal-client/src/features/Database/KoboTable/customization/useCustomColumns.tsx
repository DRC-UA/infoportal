import {KoboAnswer, KoboMappedAnswer} from '@/core/sdk/server/kobo/Kobo'
import {CashStatus, currentProtectionProjects, KoboGeneralMapping, DrcProject, Ecrec_cashRegistration, KoboEcrec_cashRegistration, KoboIndex, ProtectionHhsTags} from '@infoportal-common'
import React, {useMemo} from 'react'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {map, Obj} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {SelectCashStatus} from '@/shared/customInput/SelectStatus'
import {DatatableColumn} from '@/shared/Datatable/util/datatableType'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {SelectShelterCashStatus, ShelterCashStatus} from '@/shared/customInput/SelectStatus'

export const useCustomColumns = (): DatatableColumn.Props<KoboMappedAnswer>[] => {
  const ctx = useDatabaseKoboTableContext()
  const {m} = useI18n()
  return useMemo(() => {
    const individualsBreakdown: DatatableColumn.Props<any>[] = [
      {
        id: 'custom_children',
        head: m.children,
        type: 'number',
        width: 20,
        renderQuick: (row: {custom: KoboGeneralMapping.IndividualBreakdown}) => row.custom.childrenCount,
      },
      {
        id: 'custom_adult',
        head: m.adults + ' 18+',
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
            label: row.custom.disabilities.map(_ => Ecrec_cashRegistration.options.hh_char_dis_select[_]).join(' | '),
          }
        }
      },
    ]
    const paymentStatus: DatatableColumn.Props<any> = ({
      id: 'custom_status',
      head: m.status,
      type: 'select_one',
      width: 120,
      options: () => SheetUtils.buildOptions(Obj.keys(CashStatus), true),
      render: (row: KoboEcrec_cashRegistration.T) => {
        return {
          value: row.tags?.status,
          label: (
            <SelectCashStatus
              disabled={!ctx.canEdit}
              value={row.tags?.status}
              placeholder={m.project}
              onChange={_ => ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key: 'status'})}
            />
          )
        }
      }
    })
    const paymentStatusShelter: DatatableColumn.Props<any> = ({
      id: 'custom_status',
      head: m.status,
      type: 'select_one',
      width: 120,
      options: () => SheetUtils.buildOptions(Obj.keys(ShelterCashStatus), true),
      render: (row: any) => {
        return {
          value: row.tags?.status,
          label: (
            <SelectShelterCashStatus
              disabled={!ctx.canEdit}
              value={row.tags?.status}
              placeholder={m.project}
              onChange={_ => ctx.asyncUpdateTag.call({answerIds: [row.id], value: _, key: 'status'})}
            />
          )
        }
      }
    })

    const extra: Record<string, DatatableColumn.Props<any>[]> = {
      [KoboIndex.byName('shelter_nta').id]: [...individualsBreakdown,],
      [KoboIndex.byName('bn_cashForRentRegistration').id]: [...individualsBreakdown,],
      [KoboIndex.byName('bn_cashForRentApplication').id]: [...individualsBreakdown,],
      [KoboIndex.byName('bn_re').id]: [
        // paymentStatus,
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('shelter_cashForShelter').id]: [
        paymentStatusShelter,
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('ecrec_cashRegistration').id]: [
        paymentStatus,
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('ecrec_cashRegistrationBha').id]: [
        paymentStatus,
        ...individualsBreakdown,
      ],
      [KoboIndex.byName('protection_communityMonitoring').id]: [
        {
          id: 'tags_project',
          head: m.project,
          type: 'select_multiple',
          width: 200,
          options: () => SheetUtils.buildOptions(Obj.keys(DrcProject), true),
          render: (row: KoboAnswer<any, ProtectionHhsTags>) => {
            return {
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
          type: 'select_multiple',
          width: 200,
          options: () => SheetUtils.buildOptions(Obj.keys(DrcProject), true),
          render: (row: KoboAnswer<any, ProtectionHhsTags>) => {
            return {
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
          render: (row: KoboAnswer<any, ProtectionHhsTags>) => {
            return {
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
          render: (row: KoboAnswer<any, ProtectionHhsTags>) => {
            return {
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
      ]
    }
    return extra[ctx.form.id] ?? []
  }, [ctx.form.id])
}