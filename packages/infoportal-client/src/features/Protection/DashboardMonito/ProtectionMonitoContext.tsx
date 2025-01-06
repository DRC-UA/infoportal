import React, {ReactNode, useCallback, useContext as reactUseContext, useEffect, useMemo, useState} from 'react'
import {
  KoboIndex,
  KoboProtection_hhs3,
  OblastISO,
  Period,
  PeriodHelper,
  Person,
  Protection_hhs3,
} from 'infoportal-common'
import {map, Obj, Seq, seq} from '@alexandreannic/ts-utils'
import {ukraineSvgPath} from '@/shared/maps/mapSvgPaths'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {ChartHelper} from '@/shared/charts/chartHelper'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useI18n} from '@/core/i18n'
import {Messages} from '@/core/i18n/localization/en'
import {UseFetcher, useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'

export namespace ProtectionMonito {
  export type HookParams = ReturnType<typeof useData>
  export type ProviderParams = HookParams & {
    fetcherData: UseFetcher<() => Promise<ApiPaginate<InferTypedAnswer<'protection_hhs3'>>>>
    fetcherPeriod: UseFetcher<() => Promise<Period>>
  }
  export type Data = InferTypedAnswer<'protection_hhs3'>
  export type DataFlat = Omit<InferTypedAnswer<'protection_hhs3'>, 'persons'> &
    InferTypedAnswer<'protection_hhs3'>['persons'][0]
  type CustomFilterOptionFilters = {
    hhComposition?: (keyof Messages['protHHS2']['_hhComposition'])[]
  }
  export type Filters = CustomFilterOptionFilters & DataFilter.InferShape<ReturnType<typeof getFilterShape>>

  const getOption = (data: Seq<Data>, p: keyof Data, option: keyof typeof Protection_hhs3.options = p as any) => {
    return data
      .flatMap((_) => _[p] as any)
      .distinct((_) => _)
      .compact()
      .map((_: any) => ({value: _, label: (Protection_hhs3.options[option] as any)[_]}))
      .sortByString((_) => _.label ?? '', 'a-z')
  }

  export const getFilterShape = (m: Messages) => {
    return DataFilter.makeShape<Data>({
      staff_to_insert_their_DRC_office: {
        getValue: (_) => _.staff_to_insert_their_DRC_office,
        icon: 'business',
        label: m.drcOffice,
        getOptions: (getData) => getOption(getData(), 'staff_to_insert_their_DRC_office'),
      },
      where_are_you_current_living_oblast: {
        getValue: (_) => _.where_are_you_current_living_oblast,
        getOptions: (getData) =>
          getOption(getData(), 'where_are_you_current_living_oblast', 'what_is_your_area_of_origin_oblast'),
        icon: 'location_on',
        label: m.currentOblast,
      },
      what_is_your_area_of_origin_oblast: {
        getValue: (_) => _.what_is_your_area_of_origin_oblast,
        getOptions: (getData) => getOption(getData(), 'what_is_your_area_of_origin_oblast'),
        icon: 'explore',
        label: m.originOblast,
      },
      type_of_site: {
        getValue: (_) => _.type_of_site,
        getOptions: (getData) => getOption(getData(), 'type_of_site'),
        icon: 'location_city',
        label: m.typeOfSite,
      },
      hh_sex_1: {
        getValue: (_) => _.persons?.[0]?.gender,
        getOptions: () => DataFilter.buildOptionsFromObject(Person.Gender),
        icon: 'female',
        label: m.respondent,
      },
      do_you_identify_as_any_of_the_following: {
        getValue: (_) => _.do_you_identify_as_any_of_the_following,
        getOptions: (getData) => getOption(getData(), 'do_you_identify_as_any_of_the_following'),
        icon: 'directions_run',
        label: m.poc,
      },
      what_is_the_type_of_your_household: {
        getValue: (_) => _.what_is_the_type_of_your_household,
        getOptions: (getData) => getOption(getData(), 'what_is_the_type_of_your_household'),
        icon: 'people',
        label: m.hhType,
      },
      do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household: {
        multiple: true,
        getValue: (_) => _.do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household,
        getOptions: (getData) =>
          getOption(getData(), 'do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household'),
        icon: 'support',
        label: m.protHHS2.specificNeedsToHHS,
        skipOption: ['unable_unwilling_to_answer', 'other_specify'],
      },
    })
  }

  type UseData = {
    data?: Seq<InferTypedAnswer<'protection_hhs3'>>
    filterDefault?: Filters
    periodDefault?: Partial<Period>
    periodCompare?: (p: Period) => Period | undefined
  }

  const useData = ({data = seq(), periodDefault = {}, periodCompare, filterDefault = {}}: UseData) => {
    const {m} = useI18n()
    const [filterOptions, setFilterOptions] = useState<Filters>(filterDefault)
    const [period, setPeriod] = useState<Partial<Period>>(periodDefault)
    const filterShape = getFilterShape(m)

    useEffect(() => {
      if (!period.start && !period.end) setPeriod(periodDefault)
    }, [filterDefault])

    const ageGroup = useCallback(
      (data: Seq<InferTypedAnswer<'protection_hhs3'>>, ageGroup: Person.AgeGroup, hideOther?: boolean) => {
        const gb = Person.groupByGenderAndGroup(ageGroup)(data?.flatMap((_) => _.persons)!)
        return new Obj(gb).entries().map(([k, v]) => ({key: k, ...v}))
      },
      [data],
    )

    const dataInPeriod = useMemo(() => {
      return data.filter((_) => PeriodHelper.isDateIn(period, _.date))
    }, [data, period])

    const dataFiltered = useMemo(() => {
      const {hhComposition, ...basicFilters} = filterOptions
      const filtered = seq(DataFilter.filterData(dataInPeriod, filterShape, basicFilters as any)) as Seq<Data>
      if (hhComposition && hhComposition.length > 0)
        return filtered.filter(
          (d) =>
            !!d.persons?.find((p) => {
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
            }),
        )
      return filtered
    }, [dataInPeriod, filterOptions])

    return useMemo(() => {
      const dataPreviousPeriod =
        map(period.start, period.end, periodCompare, (start, end, compareFn) => {
          const compare = compareFn({start, end})
          if (compare && compare.start.getDate() < compare.end.getDate())
            return data.filter((_) => PeriodHelper.isDateIn(compare, _.date))
        }) ?? seq()
      const dataFlat = data.flatMap((_) => _.persons.map((p) => ({..._, ...p})))
      const dataFlatFiltered = dataFiltered.flatMap((_) => _.persons.map((p) => ({..._, ...p})))
      const dataFlatPreviousPeriod = dataPreviousPeriod.flatMap((_) => _.persons.map((p) => ({..._, ...p})))
      const dataIdps = dataFiltered.filter((_) => _.do_you_identify_as_any_of_the_following === 'idp')

      const categoryOblasts = (
        column:
          | 'where_are_you_current_living_oblast'
          | 'what_is_your_area_of_origin_oblast' = 'where_are_you_current_living_oblast',
      ) =>
        Obj.keys(ukraineSvgPath).reduce(
          (acc, isoCode) => ({...acc, [isoCode]: (_: KoboProtection_hhs3.T): boolean => _[column] === isoCode}),
          {} as Record<OblastISO, (_: KoboProtection_hhs3.T) => boolean>,
        )

      const byCurrentOblast = ChartHelper.byCategory({
        categories: categoryOblasts('where_are_you_current_living_oblast'),
        data: dataFiltered,
        filter: (_) => true,
      }).get()

      const byOriginOblast = ChartHelper.byCategory({
        categories: categoryOblasts('what_is_your_area_of_origin_oblast'),
        data: dataFiltered,
        filter: (_) => true,
      }).get()

      const idpsByCurrentOblast = ChartHelper.byCategory({
        categories: categoryOblasts('where_are_you_current_living_oblast'),
        data: dataIdps,
        filter: (_) => true,
      }).get()

      const idpsByOriginOblast = ChartHelper.byCategory({
        categories: categoryOblasts('what_is_your_area_of_origin_oblast'),
        data: dataIdps,
        filter: (_) => true,
      }).get()

      return {
        filterShape,
        filterOptions,
        setFilterOptions: setFilterOptions,
        period,
        setPeriod,
        periodDefault,
        periodCompare,
        data,
        dataFiltered,
        dataPreviousPeriod,
        dataFlat,
        dataByGender: dataFlat.groupByAndApply(
          (_) => _.gender ?? Person.Gender.Other,
          (_) => _.length,
        ),
        dataIdps: dataIdps,
        categoryOblasts,
        ageGroup,
        dataFlatFiltered,
        dataFlatPreviousPeriod,
        byCurrentOblast,
        byOriginOblast,
        idpsByOriginOblast,
        idpsByCurrentOblast,
      }
    }, [dataFiltered, periodCompare])
  }

  const Context = React.createContext({} as any)

  export const useContext = () => reactUseContext<ProviderParams>(Context)

  export const Provider = ({
    filterDefault,
    periodDefault,
    periodCompare,
    children,
  }: Omit<UseData, 'data'> & {
    children: ReactNode
  }) => {
    const {api} = useAppSettings()
    const fetcherData = useFetcher(api.kobo.typedAnswers.search.protection_hhs3)
    const fetcherPeriod = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('protection_hhs3').id))

    useEffect(() => {
      fetcherData.fetch()
    }, [])
    useEffect(() => {
      if (!periodDefault) fetcherPeriod.fetch()
    }, [periodDefault])

    const ctx = useData({
      filterDefault,
      periodCompare,
      periodDefault: periodDefault ?? fetcherPeriod.get,
      data: seq(fetcherData.get?.data),
    })

    return (
      <Context.Provider
        value={{
          fetcherData,
          fetcherPeriod,
          ...ctx,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}
