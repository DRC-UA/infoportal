import {KoboIndex} from 'infoportal-common'

const EXCLUDED_COLUMNS_MAP: Map<string, string[]> = new Map([
  [KoboIndex.byName('va_bio_tia').id, ['case_status', 'date_paid']],
])

export {EXCLUDED_COLUMNS_MAP}
