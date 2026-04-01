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
  Gp_case_management,
  insideObjectOut,
} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useAppSettings} from '@/core/context/ConfigContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useFetcher} from '@/shared/hook/useFetcher'

// type PdmData = {
//   oblast?: OblastName
//   project: DrcProject | undefined
//   office?: DrcOffice | undefined
//   persons?: Person.Details[]
//   answers: KoboSubmissionFlat<Gp_case_management.T>
// }

const useGpCaseManagementData = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const schema = useKoboSchemaContext({autoFetch: ['gp_case_management']}).byName.gp_case_management.get
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})
  const answersFetcher = useFetcher(
    async (): Promise<
      Seq<Gp_case_management.T /*{
        office: DrcOffice | undefined
        persons: Person[]
        project: string | undefined
        answers: Gp_case_management.T
        }*/>
    > => {
      return api.kobo.typedAnswers.search.gp_case_management({filters: periodFilter}).then(
        ({data}) => seq(data),
        //   .map((record) => ({
        //   office: match(record.office).cases(Gp_case_management.options.office).default(undefined) as
        //     | DrcOffice
        //     | undefined,
        //   persons: KoboXmlMapper.Persons.gp_case_management(record),
        //   project: record.project ? Gp_case_management.options.project[record.project!] : undefined,
        //   answers: record,
        // })),
      )
      // .then((results) => seq(results.flat()))
    },
  )

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<Gp_case_management.T>({
      oblast: {
        icon: 'place',
        label: m.oblast,
        getValue: ({oblast_provision}) => oblast_provision,
        getOptions: () => DataFilter.buildOptionsFromObject(Gp_case_management.options.oblast_provision),
      },
      office: {
        icon: 'place',
        label: m.office,
        getValue: ({office}) => office,
        getOptions: () => DataFilter.buildOptionsFromObject(Gp_case_management.options.office),
      },
      project: {
        icon: 'business',
        label: m.project,
        getValue: ({project}) => project,
        getOptions: () => DataFilter.buildOptionsFromObject(Gp_case_management.options.project),
      },
    })
  }, [schema, Gp_case_management])

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

export {useGpCaseManagementData}
