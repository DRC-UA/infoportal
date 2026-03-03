import {useEffect, useMemo, useState} from 'react'
import {match, seq, Seq} from '@axanc/ts-utils'

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
  insideObjectOut,
} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useAppSettings} from '@/core/context/ConfigContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher} from '@/shared/hook/useFetcher'

type PdmData = {
  oblast?: OblastName
  project: DrcProject | undefined
  office?: DrcOffice | undefined
  persons?: Person.Details[]
  answers: KoboSubmissionFlat<Va_tia_pdm.T>
}

const projectCases = {
  ukr000350_sida: DrcProject['UKR-000350 SIDA'],
  ukr000372_echo3: DrcProject['UKR-000372 ECHO3'],
  ukr000306_dutch: DrcProject['UKR-000306 Dutch II'],
  ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
  ukr000386_mass_appeal: DrcProject['UKR-000386 Pooled Funds'],
  ukr000388_bha: DrcProject['UKR-000388 BHA'],
  ukr000397_gffo: DrcProject['UKR-000397 GFFO'],
  ukr000423_echo4: DrcProject['UKR-000423 ECHO'],
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
      .then(({data}) =>
        seq(data).map((record) => ({
          office: match(record.office).cases(Va_tia_pdm.options.office).default(undefined) as DrcOffice | undefined,
          persons: KoboXmlMapper.Persons.va_tia_pdm(record),
          project: match(record.project_ID!)
            .cases(projectCases)
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
        getValue: ({office}) => match(office).cases(insideObjectOut(Va_tia_pdm.options.office)).default(undefined),
        getOptions: () => DataFilter.buildOptionsFromObject(Va_tia_pdm.options.office),
      },
      project: {
        icon: 'business',
        label: m.project,
        getValue: ({project}) => match(project).cases(insideObjectOut(projectCases)).default(undefined),
        getOptions: () => DataFilter.buildOptionsFromObject(Va_tia_pdm.options.project_ID),
      },
      access: {
        icon: 'check_circle',
        label: m.mealMonitoringPdm.accessibilityInterview,
        getValue: ({answers}) => answers.accessibility_interview,
        getOptions: () => DataFilter.buildOptionsFromObject(Va_tia_pdm.options.receive_help_drc),
      },
      received: {
        icon: 'check_circle',
        label: m.mealMonitoringPdm.received,
        getValue: ({answers}) => answers.receive_help_drc,
        getOptions: () => DataFilter.buildOptionsFromObject(Va_tia_pdm.options.receive_help_drc),
      },
    })
  }, [schema, Va_tia_pdm])

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
    data: seq(DataFilter.filterData(answersFetcher.get ?? [], filterShape, optionFilter)),
    loading: answersFetcher.loading,
    filterShape,
    optionFilter,
    setOptionFilters,
    periodFilter,
    setPeriodFilter,
  }
}

export {useVaPdmData}
