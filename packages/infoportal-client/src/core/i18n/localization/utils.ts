import {formatDistance, formatDuration as formatDurationFns} from 'date-fns'

import type {AppLang} from '../I18n'

const invalidDate = ''

const isDateValid = (d?: Date): boolean => {
  return !!d && d instanceof Date && !isNaN(d.getTime())
}

const formatDate = (d: Date | undefined, currentLang?: AppLang): string => {
  if (!isDateValid(d)) return invalidDate
  return d!.toLocaleDateString(currentLang)
}

const formatTime = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return d!.toLocaleTimeString()
}

const formatDateTime = (d?: Date): string => {
  if (!isDateValid(d)) return invalidDate
  return formatDate(d) + ' ' + formatTime(d)
}

const dateFromNow: {
  (d: Date): string
  (d?: undefined): undefined
  (d?: Date): string | undefined
} = (d) => {
  return d ? formatDistance(d, new Date(), {addSuffix: true}) : (undefined as any)
}

const formatLargeNumber = (n?: number, options?: Intl.NumberFormatOptions): string => {
  return n !== undefined && n !== null && !isNaN(n) ? n.toLocaleString('en-EN', options) : '-'
}

const formatDuration = formatDurationFns

export {isDateValid, formatDate, formatTime, formatDateTime, dateFromNow, formatLargeNumber, formatDuration}
