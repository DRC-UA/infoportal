import {useEffect, useMemo, useState, type Dispatch, type SetStateAction} from 'react'
import {match, map, seq, Seq} from '@axanc/ts-utils'
import {Kobo} from 'kobo-sdk'

import {
  DrcOffice,
  DrcProject,
  KoboIndex,
  KoboSubmissionFlat,
  KoboXmlMapper,
  OblastName,
  Period,
  Person,
  Va_tia_pdm,
} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useAppSettings} from '@/core/context/ConfigContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'

export type PdmData = {
  oblast?: OblastName
  project: DrcProject | undefined
  office?: DrcOffice | undefined
  persons?: Person.Details[]
  answers: KoboSubmissionFlat<Va_tia_pdm.T>
}

export interface MealPdmDashboardContext {
  fetcherAnswers: UseFetcher<(filter: Partial<Period>) => Promise<Seq<PdmData>>>
  fetcherPeriod: UseFetcher<() => Promise<Period>>
  periodFilter: Partial<Period>
  setPeriodFilter: Dispatch<SetStateAction<Partial<Period>>>
  answersIndex?: Record<Kobo.SubmissionId, PdmData>
}

const useVaPdmData = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const schema = useKoboSchemaContext({autoFetch: ['va_tia_pdm']}).byName.va_tia_pdm.get
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const periodFetcher = useFetcher(() => api.kobo.answer.getPeriod(KoboIndex.byName('va_tia_pdm').id))
  const answersFetcher = useFetcher(async (): Promise<Seq<PdmData>> => {
    return api.kobo.typedAnswers.search
      .va_tia_pdm({filters: periodFilter})
      .then((_) =>
        seq(_.data).map((record) => ({
          office: match(record.office)
            .cases({
              iev: DrcOffice.Kyiv,
              dnk: DrcOffice.Dnipro,
              hrk: DrcOffice.Kharkiv,
              umy: DrcOffice.Sumy,
              nlv: DrcOffice.Mykolaiv,
              slo: DrcOffice.Sloviansk,
              cej: DrcOffice.Chernihiv,
            })
            .default(undefined),
          persons: KoboXmlMapper.Persons.va_tia_pdm(record),
          project: match(record.project_ID!)
            .cases({
              ukr000350_sida: DrcProject['UKR-000350 SIDA'],
              ukr000372_echo3: DrcProject['UKR-000372 ECHO3'],
              ukr000306_dutch: DrcProject['UKR-000306 Dutch II'],
              ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
              ukr000386_mass_appeal: DrcProject['UKR-000386 Pooled Funds'],
              ukr000388_bha: DrcProject['UKR-000388 BHA'],
              ukr000397_gffo: DrcProject['UKR-000397 GFFO'],
              ukr000423_echo4: DrcProject['UKR-000423 ECHO'],
            })
            .default(() => undefined),
          answers: record,
        })),
      )
      .then((results) => seq(results.flat()))
  })

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<PdmData>({
      office: {
        icon: 'share',
        label: m.office,
        getValue: ({office}) => office,
        getOptions: () =>
          DataFilter.buildOptions(
            seq(answersFetcher.get)
              .flatMap(({office}) => office!)
              .distinct((office) => office)
              .sort(),
          ),
      },
      project: {
        icon: 'business',
        label: m.project,
        getValue: ({project}) => project,
        getOptions: () =>
          DataFilter.buildOptions(
            seq(answersFetcher.get)
              .flatMap(({project}) => project!)
              .distinct((project) => project)
              .sort(),
          ),
      },
      access: {
        icon: 'check_circle',
        getOptions: () =>
          DataFilter.buildOptionsFromObject(Va_tia_pdm.options.scale_challenges_accessing_drc_assistance_no),
        label: m.mealMonitoringPdm.accessibilityInterview,
        getValue: (_) => _.answers.accessibility_interview,
      },
      received: {
        icon: 'check_circle',
        getOptions: () => DataFilter.buildOptionsFromObject(Va_tia_pdm.options.receive_help_drc),
        label: m.mealMonitoringPdm.received,
        getValue: (_) => _.answers.receive_help_drc,
      },
    })
  }, [schema, answersFetcher.get])

  useEffect(() => {
    periodFetcher.fetch()
  }, [])

  useEffect(() => {
    setPeriodFilter(periodFetcher.get ?? {})
  }, [periodFetcher.get])

  useEffect(() => {
    answersFetcher.fetch({force: true, clean: false})
  }, [periodFilter])

  return {
    data: answersFetcher.get ? seq(DataFilter.filterData(answersFetcher.get, filterShape, optionFilter)) : undefined,
    loading: answersFetcher.loading,
    filterShape,
    optionFilter,
    setOptionFilters,
    periodFilter,
    setPeriodFilter,
  }
}

export {useVaPdmData}
