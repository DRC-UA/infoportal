import {isDate} from 'date-fns'

import {CashStatus, Ecrec_subsistance, KoboTagStatus, PeriodHelper, type Period} from 'infoportal-common'

const filterCallbackMaker =
  (period: Partial<Period>) =>
  ({tags}: Ecrec_subsistance.T & {tags: KoboTagStatus<CashStatus>}) => {
    return (
      tags?.status === 'Paid' && isDate(tags?.lastStatusUpdate) && PeriodHelper.isDateIn(period, tags.lastStatusUpdate)
    )
  }

export {filterCallbackMaker}
