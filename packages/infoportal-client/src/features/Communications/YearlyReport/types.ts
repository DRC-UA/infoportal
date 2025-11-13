import type {Seq} from '@axanc/ts-utils'

import type {DrcSector, OblastName} from 'infoportal-common'

import {AiMapper} from '@/features/ActivityInfo/shared/AiMapper'

import type {DatatableOptions} from '@/shared/Datatable/util/datatableType'

type YearlyReportDataRecord = {
  sector: DrcSector
  oblast: OblastName
  indicator: string
  beneficiaries: ReturnType<typeof AiMapper.disaggregatePersons>
  totalPaid?: number
}

type UseOptionsBuilder = (params: {
  data: Seq<any> // TODO: get rid of "any" for Seq<YearlyReportDataRecord>
  options: (keyof YearlyReportDataRecord)[]
}) => Record<keyof YearlyReportDataRecord, () => DatatableOptions[]>

export type {YearlyReportDataRecord, UseOptionsBuilder}
