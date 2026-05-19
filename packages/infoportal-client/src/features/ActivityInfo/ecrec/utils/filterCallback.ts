import {isDate} from 'date-fns'

import {Ecrec_subsistance, PeriodHelper, type Period} from 'infoportal-common'

const filterCallbackMaker =
  (period: Partial<Period>) =>
  ({status, date_payment}: Ecrec_subsistance.T) => {
    return status === 'paid' && isDate(date_payment) && PeriodHelper.isDateIn(period, date_payment)
  }
export {filterCallbackMaker}
