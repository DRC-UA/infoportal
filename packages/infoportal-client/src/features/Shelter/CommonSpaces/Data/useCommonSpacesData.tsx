import {useEffect, useMemo, useState} from 'react'
import {KoboIndex, Period, PeriodHelper} from 'infoportal-common'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {Shelter_commonSpaces} from 'infoportal-common/kobo/generated/Shelter_commonSpaces'
import {useI18n} from '@/core/i18n'
import {seq} from '@axanc/ts-utils'
import {CommonSpacesEntity} from '@/features/Shelter/CommonSpaces/Data/CommonSpacesEntity'
import {appConfig} from '@/conf/AppConfig'

export const useCommonSpacesData = () => {
  const {m} = useI18n()
  const ans = useKoboAnswersContext().byName('shelter_commonSpaces')
  const schemaCtx = useKoboSchemaContext()
  const schema = schemaCtx.byName.shelter_commonSpaces.get
  const form = KoboIndex.byName('shelter_commonSpaces')

  useEffect(() => {
    if (!schema) schemaCtx.fetchByName('shelter_commonSpaces')
    if (!ans.get?.data) ans.fetch({})
  }, [schema, ans.get?.data])

  const data = (seq(ans.get?.data) ?? []) as unknown as CommonSpacesEntity[]

  const [periodSubmission, setPeriodSubmission] = useState<Partial<Period>>({})
  const [periodWorkDone, setPeriodWorkDone] = useState<Partial<Period>>({})

  const filterShape = useMemo(
    () =>
      DataFilter.makeShape<CommonSpacesEntity>({
        office: {
          icon: 'business',
          label: m.office,
          getValue: (_) => _.office,
          getOptions: () =>
            schema
              ? schema.helper
                  .getOptionsByQuestionName('office')
                  .map((o) => ({value: o.name, label: schema.translate.choice('office', o.name)}))
              : [],
        },
        project: {
          icon: appConfig.icons.project,
          label: m.project,
          getValue: (_) => _.project,
          getOptions: () =>
            schema
              ? schema.helper
                  .getOptionsByQuestionName('project')
                  .map((o) => ({value: o.name, label: schema.translate.choice('project', o.name)}))
              : [],
        },
        oblast: {
          icon: 'location_on',
          label: m.oblast,
          getValue: (_) => _.ben_det_oblast,
          getOptions: () =>
            schema
              ? schema.helper
                  .getOptionsByQuestionName('ben_det_oblast')
                  .map((o) => ({value: o.name, label: schema.translate.choice('ben_det_oblast', o.name)}))
              : [],
        },
        raion: {
          icon: 'location_on',
          label: m.raion,
          getValue: (_) => _.ben_det_raion,
          getOptions: () =>
            schema
              ? schema.helper
                  .getOptionsByQuestionName('ben_det_raion')
                  .map((o) => ({value: o.name, label: schema.translate.choice('ben_det_raion', o.name)}))
              : [],
        },
        hromada: {
          label: m.hromada,
          getValue: (_) => _.ben_det_hromada,
          getOptions: () =>
            schema
              ? schema.helper
                  .getOptionsByQuestionName('ben_det_hromada')
                  .map((o) => ({value: o.name, label: schema.translate.choice('ben_det_hromada', o.name)}))
              : [],
        },
        status: {
          icon: 'task_alt',
          label: m._shelter.progressStatus,
          getValue: (_) => _.status,
          getOptions: () =>
            Object.entries(Shelter_commonSpaces.options.status).map(([value, label]) => ({value, label})),
        },
        modality: {
          icon: 'handshake',
          label: m.modality,
          getValue: (_) => _.modality_assistance,
          getOptions: () =>
            Object.entries(Shelter_commonSpaces.options.modality_assistance).map(([value, label]) => ({value, label})),
        },
      }),
    [schema, m],
  )

  const [filters, setFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const hasRange = (p: Partial<Period>) => !!p.start || !!p.end

  const filteredByDate = useMemo(() => {
    return data.filter((row) => {
      const submitDate = row.reporting_date ?? (row.submissionTime ? new Date(row.submissionTime) : undefined)
      const okSubmit = hasRange(periodSubmission) ? PeriodHelper.isDateIn(periodSubmission, submitDate) : true
      const okWorkDone = hasRange(periodWorkDone) ? PeriodHelper.isDateIn(periodWorkDone, row.work_done) : true
      return okSubmit && okWorkDone
    })
  }, [data, periodSubmission, periodWorkDone])

  const dataFiltered = useMemo(
    () => DataFilter.filterData(filteredByDate, filterShape, filters),
    [filteredByDate, filterShape, filters],
  )

  const refetchAll = async () => {
    await Promise.all([schemaCtx.fetchByName('shelter_commonSpaces'), ans.fetch({force: true, clean: false})])
  }

  const kpi = useMemo(() => {
    const s = seq(filteredByDate)
    const households = s.sum((_) => _.occupied_apartments ?? 0)
    const persons = s.sum((_) => _.individuals ?? 0)
    const hhSize = households ? persons / households : 0
    return {households, persons, hhSize}
  }, [filteredByDate])

  return {
    form,
    schema,
    answers: ans,
    data,
    filteredByDate,
    dataFiltered,
    filterShape,
    filters,
    setFilters,
    periodSubmission,
    setPeriodSubmission,
    periodWorkDone,
    setPeriodWorkDone,
    selectedIds,
    setSelectedIds,
    refetchAll,
    kpi,
  }
}
