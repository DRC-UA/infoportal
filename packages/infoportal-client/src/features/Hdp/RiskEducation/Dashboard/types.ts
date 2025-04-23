import type {Dispatch} from 'react'
import type {Seq} from '@axanc/ts-utils'

import type {Period, RiskEducationDirectSession} from 'infoportal-common'

interface DashboardFiltersProps {
  period: Partial<Period>
  setPeriod: Dispatch<SetStateAction<Partial<Period>>>
}

interface DashboardWidgetsProps {
  data: Seq<RiskEducationDirectSession>
}

export type {DashboardFiltersProps, DashboardWidgetsProps}
