import {Obj, match} from '@axanc/ts-utils'
import {Currency, Deduplication, type UctWfpDeduplication} from '@prisma/client'

import type {DrcOffice} from 'infoportal-common'

import {DEDUPLICATION_FIELDS, TRANSACTION_FIELDS} from './constants.js'

const parseCurrency = (currency: string): Currency => {
  switch (currency) {
    case 'USD':
      return Currency.USD
    case 'EUR':
      return Currency.EUR
    case 'UAH':
      return Currency.UAH
    default:
      throw new Error(`Unsupported currency: ${currency}`)
  }
}

const csvFile2DbAdapter = ({
  drcOffice,
  batchId,
  fileName,
  records: rawRecords,
}: {
  drcOffice: DrcOffice
  batchId: string
  fileName: string
  records: (
    | Record<(typeof DEDUPLICATION_FIELDS)[number], string>
    | Record<(typeof TRANSACTION_FIELDS)[number], string>
  )[]
}): Omit<UctWfpDeduplication, 'id' | 'uploadedAt'>[] => {
  const records = rawRecords.filter((record) => !Obj.values(record).every((value) => value === '')) // get rid of empty rows, causing 500

  if (!records || records.length === 0) return []

  const sharedFields = {
    drcOffice,
    batchId,
    fileName,
  }

  if (Obj.keys(records[0]).every((field) => DEDUPLICATION_FIELDS.includes(field))) {
    const deduplicationRecords = records as Record<(typeof DEDUPLICATION_FIELDS)[number], string>[]
    return deduplicationRecords.map((record) => ({
      ...sharedFields,
      taxId: record['Tax ID'],
      result: record['Results'],
      status: match('Results')
        .cases({
          ['Success - loaded' as string]: Deduplication.Eligible,
          ['Deduplicated - see deduplication report.' as string]: Deduplication.Deduplicated,
        })
        .default(null) as Deduplication,
      organisation: record['Existing - Organization'],
      deduplicationType: record['Deduplication Type'] || null,
      category: record['Existing - Category'],
      currency: parseCurrency(record['Loaded - Distribution Currency']),
      amount: Number(record['Deduplicated - Amount']),
      startDate: record['Existing - Start'],
      endDate: record['Existing - End'],
      reason: `Supported with ${record['Existing - Amount']}. WFP reason: ${record['Reason']}`,
    }))
  }

  if (Obj.keys(records[0]).every((field) => TRANSACTION_FIELDS.includes(field))) {
    const transactionRecords = records as Record<(typeof TRANSACTION_FIELDS)[number], string>[]
    return transactionRecords.map((record) => ({
      ...sharedFields,
      taxId: record['Tax ID'],
      result: record['Results'],
      status: match(record['Results'])
        .cases({
          ['Success - loaded']: Deduplication.Eligible,
          ['Deduplicated - see deduplication report.']: Deduplication.Deduplicated,
        })
        .default(null) as Deduplication,
      organisation: record['Organization'],
      deduplicationType: null,
      category: record['Category'],
      currency: parseCurrency(record['Distribution Currency']),
      amount: Number(record['Amount']),
      startDate: record['Start Date (YYYYMMDD)'],
      endDate: record['End Date (YYYYMMDD)'],
      reason: null,
    }))
  }

  throw new Error('The input data is not recognised as neither Deduplication nor Transaction result')
}

export {csvFile2DbAdapter}
