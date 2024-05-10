import React, {ReactNode, useMemo} from 'react'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {useI18n} from '@/core/i18n'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {currentProtectionProjects, KoboAnswerId, KoboIndex} from '@infoportal-common'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {SelectStatusBy} from '@/shared/customInput/SelectStatus'

export const useCustomSelectedHeader = (selectedIds: KoboAnswerId[]): ReactNode => {
  const ctx = useDatabaseKoboTableContext()
  const {m} = useI18n()
  return useMemo(() => {
    switch (ctx.form.id) {
      case KoboIndex.byName('shelter_cashForShelter').id: {
        return (
          <>
            <SelectStatusBy
              enum="ShelterCashStatus"
              disabled={!ctx.canEdit}
              sx={{maxWidth: 120, mr: 1}}
              label={m.status}
              onChange={_ => {
                ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'status'})
              }}
            />
            <IpDatepicker
              label={m.paidOn}
              onChange={_ => ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'lastStatusUpdate'})}
            />
          </>
        )
      }
      case KoboIndex.byName('bn_cashForRentRegistration').id: {
        return (
          <>
            <SelectStatusBy
              enum="CashForRentStatus"
              sx={{maxWidth: 120, mr: 1}}
              disabled={!ctx.canEdit}
              placeholder={m.project}
              onChange={_ => {
                ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'status'})
              }}
            />
            <IpDatepicker
              label={m.paidOn}
              onChange={_ => ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'lastStatusUpdate'})}
            />
          </>
        )
      }
      case KoboIndex.byName('ecrec_trainingGrants').id: {
        return (
          <>
            <SelectStatusBy
              enum="CashForEduStatus"
              sx={{maxWidth: 120, mr: 1}}
              label={m.status}
              disabled={!ctx.canEdit}
              onChange={_ => {
                ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'status'})
              }}
            />
            <IpDatepicker
              label={m.paidOn}
              onChange={_ => ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'lastStatusUpdate'})}
            />
          </>
        )
      }
      case KoboIndex.byName('bn_rapidResponse').id:
      case KoboIndex.byName('bn_re').id:
      case KoboIndex.byName('ecrec_cashRegistrationBha').id:
      case KoboIndex.byName('shelter_cashForRepair').id:
      case KoboIndex.byName('ecrec_cashRegistration').id: {
        return (
          <>
            <SelectStatusBy
              enum="CashStatus"
              disabled={!ctx.canEdit}
              sx={{maxWidth: 120, mr: 1}}
              label={m.status}
              onChange={_ => {
                ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'status'})
              }}
            />
            <IpDatepicker
              label={m.paidOn}
              onChange={_ => ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'lastStatusUpdate'})}
            />
          </>
        )
      }
      case KoboIndex.byName('protection_communityMonitoring').id: {
        return (
          <IpSelectSingle
            hideNullOption
            sx={{maxWidth: 200}}
            label={m.project}
            onChange={_ => ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'project'})}
            options={currentProtectionProjects.map(k => ({value: k, children: k}))}
          />
        )
      }
      case KoboIndex.byName('protection_hhs3').id: {
        return (
          <IpSelectMultiple
            sx={{maxWidth: 200}}
            defaultValue={[]}
            label={m.project}
            onChange={_ => ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'projects'})}
            options={currentProtectionProjects.map(k => ({value: k, children: k}))}
          />
        )
      }
    }
  }, [selectedIds, ctx.form.id])
}