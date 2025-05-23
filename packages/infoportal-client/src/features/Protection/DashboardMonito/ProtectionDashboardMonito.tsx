import React, {lazy, useCallback} from 'react'
import {Obj} from '@axanc/ts-utils'
import {useI18n} from '@/core/i18n'
import {ProtectionMonito} from './ProtectionMonitoContext'
import {ProtectionDashboardMonitoSample} from './ProtectionDashboardMonitoSample'
import {DashboardLayout} from '@/shared/DashboardLayout/DashboardLayout'
import {ProtectionDashboardMonitoDocument} from './ProtectionDashboardMonitoDocument'
import {ProtectionDashboardMonitoLivelihood} from './ProtectionDashboardMonitoLivelihood'
import {Txt} from '@/shared'
import {ProtectionDashboardMonitoHousing} from './ProtectionDashboardMonitoHousing'
import {ProtectionDashboardMonitoDisplacement} from './ProtectionDashboardMonitoDisplacement'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {ProtectionDashboardMonitoFamilyUnity} from './ProtectionDashboardMonitoFamilyUnity'
import {ProtectionDashboardMonitoSafety} from './ProtectionDashboardMonitoSafety'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {ProtectionDashboardMonitoViolence} from './ProtectionDashboardMonitoViolence'
import {ProtectionDashboardMonitoDisability} from '@/features/Protection/DashboardMonito/ProtectionDashboardMonitoDisability'
import {DashboardFilterOptions} from '@/shared/DashboardLayout/DashboardFilterOptions'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {subDays} from 'date-fns'
import {previousPeriodDeltaDays} from '@/features/Safety/IncidentsDashboard/useSafetyIncidentData'
import {IpAlert} from '@/shared/Alert'
import {ProtectionDashboardMonitoPN} from './ProtectionDashboardMonitoPN'
import {Period} from 'infoportal-common'

export const ProtectionDashboardMonito = () => {
  const periodCompare = useCallback(
    (p: Period) => ({
      start: p.start,
      end: subDays(p.end, previousPeriodDeltaDays),
    }),
    [],
  )
  return (
    <ProtectionMonito.Provider periodCompare={periodCompare}>
      <ProtectionDashboardMonitoWCtx />
    </ProtectionMonito.Provider>
  )
}

export const ProtectionDashboardMonitoWCtx = () => {
  const {m} = useI18n()
  const ctx = ProtectionMonito.useContext()
  return (
    <DashboardLayout
      loading={ctx.fetcherData.loading}
      title={m.ukraine}
      subTitle={m.protectionMonitoringDashboard}
      header={
        <DataFilterLayout
          hidePopup
          sx={{mb: 0}}
          onClear={() => {
            ctx.setPeriod(ctx.periodDefault)
            ctx.setFilterOptions({})
          }}
          shapes={ctx.filterShape}
          data={ctx.data}
          filters={ctx.filterOptions}
          setFilters={ctx.setFilterOptions}
          before={
            <DebouncedInput<[Date | undefined, Date | undefined]>
              debounce={800}
              value={[ctx.period.start, ctx.period.end]}
              onChange={([start, end]) => {
                ctx.setPeriod((prev) => ({...prev, start: start ?? undefined, end: end ?? undefined}))
              }}
            >
              {(value, onChange) => (
                <PeriodPicker
                  sx={{mt: 0, mb: 0, mr: 1}}
                  value={value}
                  onChange={onChange}
                  label={[m.start, m.endIncluded]}
                  min={ctx.fetcherPeriod.get?.start}
                  max={ctx.fetcherPeriod.get?.end}
                  fullWidth={false}
                />
              )}
            </DebouncedInput>
          }
          after={
            <DebouncedInput
              debounce={50}
              value={ctx.filterOptions.hhComposition}
              onChange={(_) => ctx.setFilterOptions((prev) => ({...prev, hhComposition: _}))}
            >
              {(value, onChange) => (
                <DashboardFilterOptions
                  icon="wc"
                  value={value ?? []}
                  label={m.protHHS2.hhComposition}
                  options={() => Obj.entries(m.protHHS2._hhComposition).map(([k, v]) => ({value: k, label: v}))}
                  onChange={onChange as any}
                />
              )}
            </DebouncedInput>
          }
        />
      }
      beforeSection={
        <>
          <IpAlert
            id="prot-pm-dashboard"
            color="info"
            deletable="permanent"
            sx={{mb: '-20px', borderRadius: (t) => t.shape.borderRadius + 'px'}}
          >
            <Txt size="big" bold block sx={{lineHeight: 1, mb: 0.5}}>
              {m.protHHS2.descTitle}
            </Txt>
            <Txt block sx={{mb: 0.5}}>
              {m.protHHS2.desc}
            </Txt>
            {m.protHHS2.disclaimer}
          </IpAlert>
        </>
      }
      sections={[
        {icon: 'bar_chart', name: 'sample', title: m.sample, component: () => <ProtectionDashboardMonitoSample />},
        {
          icon: 'explore',
          name: 'displacement',
          title: m.displacement,
          component: () => <ProtectionDashboardMonitoDisplacement />,
        },
        {
          icon: 'family_restroom',
          name: 'family_unity',
          title: m.familyUnity,
          component: () => <ProtectionDashboardMonitoFamilyUnity />,
        },
        {icon: 'home', name: 'housing', title: m.housing, component: () => <ProtectionDashboardMonitoHousing />},
        {
          icon: 'savings',
          name: 'livelihood',
          title: m.livelihoods,
          component: () => <ProtectionDashboardMonitoLivelihood />,
        },
        {
          icon: 'fingerprint',
          name: 'document',
          title: m.protHHS2.registrationAndDocumention,
          component: () => <ProtectionDashboardMonitoDocument />,
        },
        {
          icon: 'rocket_launch',
          name: 'safety',
          title: m.protHHS2.safetyAndSecurity,
          component: () => <ProtectionDashboardMonitoSafety />,
        },
        {
          icon: 'local_police',
          name: 'violence',
          title: m.protHHS2.protectionIncidents,
          component: () => <ProtectionDashboardMonitoViolence />,
        },
        {
          icon: 'healing',
          name: 'disability',
          title: m.protHHS2.disabilityAndHealth,
          component: () => <ProtectionDashboardMonitoDisability />,
        },
        {
          icon: 'traffic',
          name: 'priorityneeds',
          title: m.priorityNeeds,
          component: () => <ProtectionDashboardMonitoPN />,
        },
      ]}
    />
  )
}
