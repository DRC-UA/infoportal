import React, {lazy, useEffect, useMemo, useState} from 'react'
import {Enum, map, seq, Seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {useProtectionDashboardMonitoData} from './useProtectionDashboardMonitoData'
import {ProtectionDashboardMonitoSample} from './ProtectionDashboardMonitoSample'
import {DashboardLayout} from '@/shared/DashboardLayout/DashboardLayout'
import {ProtectionDashboardMonitoDocument} from './ProtectionDashboardMonitoDocument'
import {ProtectionDashboardMonitoLivelihood} from './ProtectionDashboardMonitoLivelihood'
import {Alert, Txt} from 'mui-extension'
import {ProtectionDashboardMonitoHousing} from './ProtectionDashboardMonitoHousing'
import {ProtectionDashboardMonitoDisplacement} from './ProtectionDashboardMonitoDisplacement'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {ProtectionDashboardMonitoFamilyUnity} from './ProtectionDashboardMonitoFamilyUnity'
import {ProtectionDashboardMonitoSafety} from './ProtectionDashboardMonitoSafety'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {ProtectionDashboardMonitoViolence} from './ProtectionDashboardMonitoViolence'
import {ProtectionDashboardMonitoDisability} from '@/features/Protection/DashboardMonito/ProtectionDashboardMonitoDisability'
import {KoboIndex, KoboProtection_hhs3, Period, Person, Protection_hhs3} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DashboardFilterOptions} from '@/shared/DashboardLayout/DashboardFilterOptions'
import LokiDb from 'lokijs'
import {Messages} from '@/core/i18n/localization/en'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {useFetcher} from '@/shared/hook/useFetcher'

const ProtectionDashboardMonitoPN: any = lazy(() => import('./ProtectionDashboardMonitoPN')
  .then(module => ({
    default: module.ProtectionDashboardMonitoPN,
  })))

type CustomFilterOptionFilters = {
  hhComposition?: (keyof Messages['protHHS2']['_hhComposition'])[]
}

export interface DashboardPageProps {
  periodFilter: Partial<Period>
  optionFilter: CustomFilterOptionFilters & DataFilter.Filter
  data: Seq<KoboProtection_hhs3.T>
  computed: NonNullable<ReturnType<typeof useProtectionDashboardMonitoData>>
}

export const ProtectionDashboardMonito = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const _period = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('protection_hhs3').id))
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})

  const req = (filter?: Partial<Period>) => api.kobo.typedAnswers.searchProtection_hhs3({
    filters: {
      start: filter?.start,
      end: filter?.end,
    }
  }).then(_ => seq(_.data))

  const _answers = useFetcher(req)

  useEffect(() => {
    _period.fetch()
    _answers.fetch()
  }, [])

  useEffect(() => {
    if (_period.get) setPeriodFilter(_period.get)
  }, [_period.get])

  useEffect(() => {
    if (periodFilter.start?.getTime() !== _period.get?.start.getTime() || periodFilter.end?.getTime() !== _period.get?.end.getTime())
      _answers.fetch({force: true, clean: false}, periodFilter)
  }, [periodFilter])

  const getOption = (p: keyof KoboProtection_hhs3.T, option: keyof typeof Protection_hhs3.options = p as any) => () => {
    return _answers.get
      ?.flatMap(_ => _[p] as any)
      .distinct(_ => _)
      .compact()
      .map((_: any) => ({value: _, label: (Protection_hhs3.options[option] as any)[_]}))
      .sortByString(_ => _.label ?? '', 'a-z')
  }

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<KoboProtection_hhs3.T>({
      staff_to_insert_their_DRC_office: {
        getValue: _ => _.staff_to_insert_their_DRC_office,
        icon: 'business',
        label: m.drcOffice,
        getOptions: getOption('staff_to_insert_their_DRC_office'),
      },
      where_are_you_current_living_oblast: {
        getValue: _ => _.where_are_you_current_living_oblast,
        getOptions: getOption('where_are_you_current_living_oblast', 'what_is_your_area_of_origin_oblast'),
        icon: 'location_on',
        label: m.currentOblast
      },
      what_is_your_area_of_origin_oblast: {
        getValue: _ => _.what_is_your_area_of_origin_oblast,
        getOptions: getOption('what_is_your_area_of_origin_oblast'),
        icon: 'explore',
        label: m.originOblast,
      },
      type_of_site: {
        getValue: _ => _.type_of_site,
        getOptions: getOption('type_of_site'),
        icon: 'location_city',
        label: m.typeOfSite
      },
      hh_sex_1: {
        getValue: _ => _.persons?.[0]?.gender,
        getOptions: () => DataFilter.buildOptionsFromObject(Person.Gender),
        icon: 'female',
        label: m.respondent
      },
      do_you_identify_as_any_of_the_following: {
        getValue: _ => _.do_you_identify_as_any_of_the_following,
        getOptions: getOption('do_you_identify_as_any_of_the_following'),
        icon: 'directions_run',
        label: m.poc
      },
      what_is_the_type_of_your_household: {
        getValue: _ => _.what_is_the_type_of_your_household,
        getOptions: getOption('what_is_the_type_of_your_household'),
        icon: 'people',
        label: m.hhType,
      },
      do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household: {
        multiple: true,
        getValue: _ => _.do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household,
        getOptions: getOption('do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household'),
        icon: 'support',
        label: m.protHHS2.specificNeedsToHHS,
        skipOption: ['unable_unwilling_to_answer', 'other_specify']
      }
    })
  }, [_answers.get])

  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape> & CustomFilterOptionFilters>({})

  const database = useMemo(() => {
    if (!_answers.get) return
    const loki = new LokiDb(KoboIndex.byName('protection_hhs3').id, {
      persistenceMethod: 'memory',
    })
    const table = loki.addCollection('data', {
      indices: [
        'staff_to_insert_their_DRC_office',
        'where_are_you_current_living_oblast',
        'what_is_your_area_of_origin_oblast',
        'type_of_site',
        'do_you_identify_as_any_of_the_following',
        'what_is_the_type_of_your_household',
        'do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household',
      ]
    })
    _answers.get.forEach(_ => {
      table.insert({..._})
    })
    return table
  }, [_answers.get])

  const data: Seq<KoboProtection_hhs3.T> | undefined = useMemo(() => {
    return map(database, _ => {
      const {hhComposition, ...basicFilters} = optionFilter
      const filtered = seq(DataFilter.filterDataFromLokiJs(_ as any, filterShape, basicFilters as any)) as Seq<KoboProtection_hhs3.T>
      if (hhComposition && hhComposition.length > 0)
        return filtered.filter(d => !!d.persons?.find(p => {
          if (!p.age) return false
          if (p.gender === Person.Gender.Female) {
            if (hhComposition.includes('girl') && p.age < 17) return true
            if (hhComposition.includes('olderFemale') && p.age > 60) return true
            if (hhComposition.includes('adultFemale')) return true
          }
          if (p.gender === Person.Gender.Male) {
            if (hhComposition.includes('boy') && p.age < 17) return true
            if (hhComposition.includes('olderMale') && p.age > 60) return true
            if (hhComposition.includes('adultMale')) return true
          }
          return false
        }))
      return filtered
    })
  }, [database, optionFilter])

  const computed = useProtectionDashboardMonitoData({data: data})

  return (
    <DashboardLayout
      loading={_answers.loading}
      title={m.ukraine}
      subTitle={m.protectionMonitoringDashboard}
      header={
        <DataFilterLayout
          hidePopup
          sx={{mb: 0}}
          onClear={() => {
            setPeriodFilter({})
            setOptionFilters({})
          }}
          shapes={filterShape}
          filters={optionFilter}
          setFilters={setOptionFilters}
          before={
            <DebouncedInput<[Date | undefined, Date | undefined]>
              debounce={800}
              value={[periodFilter.start, periodFilter.end]}
              onChange={([start, end]) => {
                setPeriodFilter(prev => ({...prev, start: start ?? undefined, end: end ?? undefined}))
              }}
            >
              {(value, onChange) => <PeriodPicker
                sx={{marginTop: '-6px'}}
                value={value}
                onChange={onChange}
                label={[m.start, m.endIncluded]}
                min={_period.get?.start}
                max={_period.get?.end}
              />}
            </DebouncedInput>
          }
          after={
            <DebouncedInput
              debounce={50}
              value={optionFilter.hhComposition}
              onChange={_ => setOptionFilters(prev => ({...prev, hhComposition: _}))}
            >
              {(value, onChange) =>
                <DashboardFilterOptions
                  icon="wc"
                  value={value ?? []}
                  label={m.protHHS2.hhComposition}
                  options={() => Enum.entries(m.protHHS2._hhComposition).map(([k, v]) => ({value: k, label: v}))}
                  onChange={onChange as any}
                />
              }
            </DebouncedInput>
          }
        />
      }
      beforeSection={
        <>
          <Alert type="info" deletable persistentDelete sx={{mb: '-20px', borderRadius: t => t.shape.borderRadius + 'px'}}>
            <Txt size="big" bold block sx={{lineHeight: 1, mb: .5}}>{m.protHHS2.descTitle}</Txt>
            <Txt block sx={{mb: .5}}>{m.protHHS2.desc}</Txt>
            {m.protHHS2.disclaimer}
          </Alert>
        </>
      }
      sections={(() => {
        if (!data || !computed) return []
        const panelProps: DashboardPageProps = data && computed && {
          periodFilter,
          optionFilter,
          data,
          computed,
        }
        return [
          {icon: 'bar_chart', name: 'sample', title: m.sample, component: () => <ProtectionDashboardMonitoSample {...panelProps}/>},
          {icon: 'explore', name: 'displacement', title: m.displacement, component: () => <ProtectionDashboardMonitoDisplacement {...panelProps}/>},
          {icon: 'family_restroom', name: 'family_unity', title: m.familyUnity, component: () => <ProtectionDashboardMonitoFamilyUnity {...panelProps}/>},
          {icon: 'home', name: 'housing', title: m.housing, component: () => <ProtectionDashboardMonitoHousing {...panelProps}/>},
          {icon: 'savings', name: 'livelihood', title: m.livelihoods, component: () => <ProtectionDashboardMonitoLivelihood {...panelProps}/>},
          {icon: 'fingerprint', name: 'document', title: m.protHHS2.registrationAndDocumention, component: () => <ProtectionDashboardMonitoDocument {...panelProps}/>},
          {icon: 'rocket_launch', name: 'safety', title: m.protHHS2.safetyAndSecurity, component: () => <ProtectionDashboardMonitoSafety {...panelProps}/>},
          {icon: 'local_police', name: 'violence', title: m.protHHS2.protectionIncidents, component: () => <ProtectionDashboardMonitoViolence {...panelProps}/>},
          {icon: 'healing', name: 'disability', title: m.protHHS2.disabilityAndHealth, component: () => <ProtectionDashboardMonitoDisability {...panelProps}/>},
          {
            icon: 'traffic',
            name: 'priorityneeds',
            title: m.priorityNeeds,
            component: () => <ProtectionDashboardMonitoPN {...panelProps}/>
          },
        ]
      })()}/>
  )
}
