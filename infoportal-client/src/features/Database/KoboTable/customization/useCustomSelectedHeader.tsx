import {ReactNode, useMemo} from 'react'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {useI18n} from '@/core/i18n'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {KoboAnswerId} from '@/core/sdk/server/kobo/Kobo'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {currentProtectionProjects, KoboIndex} from '@infoportal-common'
import {SelectCashStatus, SelectShelterCashStatus} from '@/shared/customInput/SelectStatus'

export const useCustomSelectedHeader = (selectedIds: KoboAnswerId[]): ReactNode => {
  const ctx = useDatabaseKoboTableContext()
  const {m} = useI18n()
  return useMemo(() => {
    switch (ctx.form.id) {
      case KoboIndex.byName('shelter_cashForShelter').id: {
        return (
          <SelectShelterCashStatus
            disabled={!ctx.canEdit}
            sx={{maxWidth: 120}}
            placeholder={m.project}
            onChange={_ => ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'status'})}
          />
        )
      }
      case KoboIndex.byName('ecrec_cashRegistrationBha').id:
      case KoboIndex.byName('ecrec_cashRegistration').id: {
        return (
          <SelectCashStatus
            disabled={!ctx.canEdit}
            sx={{maxWidth: 120}}
            placeholder={m.project}
            onChange={_ => ctx.asyncUpdateTag.call({answerIds: selectedIds, value: _, key: 'status'})}
          />
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
      case KoboIndex.byName('protection_hhs2_1').id: {
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