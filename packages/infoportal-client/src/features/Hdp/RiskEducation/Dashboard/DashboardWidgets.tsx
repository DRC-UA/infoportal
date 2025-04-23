import type {FC} from 'react'

import {useI18n} from '@/core/i18n'
import {Map} from '@/shared/maps/Map'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'

import type {DashboardWidgetsProps} from './types'

const DashboardWidgets: FC<DashboardWidgetsProps> = ({data}) => {
  const {m, formatLargeNumber} = useI18n()
  const sessionsNumber = data.length
  const individualsReached = data.reduce((accumulator, {grand_total}) => (grand_total ?? 0) + accumulator, 0)
  const pwdReached = data.reduce(
    (
      accumulator,
      {
        females_adults_disabilities,
        males_adults_disabilities,
        females_children_disabilities,
        males_children_disabilities,
        beneficiaries_disabilities,
      },
    ) =>
      (females_adults_disabilities ?? 0) +
      (males_adults_disabilities ?? 0) +
      (females_children_disabilities ?? 0) +
      (males_children_disabilities ?? 0) +
      (beneficiaries_disabilities ?? 0) +
      accumulator,
    0,
  )

  return (
    <Div responsive>
      <Div column>
        <Div sx={{alignItems: 'stretch'}}>
          <SlideWidget sx={{flex: 1}} icon="cast" title={m.riskEducation.sessionsNumber}>
            {formatLargeNumber(sessionsNumber)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="group" title={m.riskEducation.individualsReached}>
            {formatLargeNumber(individualsReached)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="accessible" title={m.PwD}>
            {pwdReached}
          </SlideWidget>
        </Div>
      </Div>
      <Div column>
        <Map
          data={data}
          getOblast={({admin1_main_code}) => admin1_main_code}
          getSettlement={({admin4_main_code}) => admin4_main_code}
        />
      </Div>
    </Div>
  )
}

export {DashboardWidgets}
