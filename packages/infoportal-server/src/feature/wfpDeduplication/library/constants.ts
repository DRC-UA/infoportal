const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
const DEDUPLICATION_FIELDS = [
  'Tax ID',
  'Results',
  'Loaded - Organization',
  'Loaded - Category',
  'Loaded - Distribution Currency',
  'Deduplicated - Amount',
  'Loaded - Start Date (YYYYMMDD)',
  'Loaded - End Date (YYYYMMDD)',
  'Existing - Organization',
  'Existing - Category',
  'Existing - Amount',
  'Existing - Load',
  'Existing - Start',
  'Existing - End',
  'Deduplication Type',
  'Reason',
] as const
const TRANSACTION_FIELDS = [
  'Tax ID',
  'Results',
  'Organization',
  'Category',
  'Distribution Currency',
  'Amount',
  'Start Date (YYYYMMDD)',
  'End Date (YYYYMMDD)',
  'Reason',
] as const

export {UUID_REGEX, DEDUPLICATION_FIELDS, TRANSACTION_FIELDS}
