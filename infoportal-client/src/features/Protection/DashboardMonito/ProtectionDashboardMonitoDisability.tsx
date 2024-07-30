import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import React from 'react'
import {useI18n} from '@/core/i18n'
import {DashboardPageProps} from './ProtectionDashboardMonito'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarMultipleByKey} from '@/shared/charts/ChartBarMultipleByKey'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Protection_hhs3} from '@infoportal-common'

export const ProtectionDashboardMonitoDisability = ({
  data,
  computed,
}: DashboardPageProps) => {
  const {formatLargeNumber, m} = useI18n()
  return (
    <Div responsive>
      <Div column>
        <SlidePanel>
          <ChartPieWidgetByKey
            property="do_you_have_a_household_member_that_has_a_lot_of_difficulty"
            title={m.protHHS2.hhWithMemberHavingDifficulties}
            filter={_ => !_.includes('no')}
            compare={{before: computed.lastMonth}}
            data={data}
            sx={{mb: 1}}
          />
          <ChartBarMultipleByKey
            property="do_you_have_a_household_member_that_has_a_lot_of_difficulty"
            data={data}
            label={{
              ...Protection_hhs3.options.do_you_have_a_household_member_that_has_a_lot_of_difficulty,
              wg_using_your_usual_language_have_difficulty_communicating: m.protHHS2.wg_using_your_usual_language_have_difficulty_communicating,
              '': m.none,
            }}
            filterValue={['no', 'unable_unwilling_to_answer']}
          />
        </SlidePanel>
        <SlidePanel>
          <ChartPieWidgetByKey
            property="do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov"
            title={m.protHHS2.unregisteredDisability}
            filter={_ => _ !== 'yes_all'}
            compare={{before: computed.lastMonth}}
            filterBase={_ => _ !== 'unable_unwilling_to_answer'}
            data={data}
            sx={{mb: 1}}
          />
          <ChartBarSingleBy data={data} by={_ => _.why_dont_they_have_status} label={Protection_hhs3.options.why_dont_they_have_status}/>
        </SlidePanel>
      </Div>
      <Div column>
        <SlidePanel>
          <ChartPieWidgetByKey
            title={m.protHHS2.barriersToAccessHealth}
            sx={{mb: 2}}
            property="do_you_have_access_to_health_care_in_your_current_location"
            compare={{before: computed.lastMonth}}
            filter={_ => _ !== 'yes'}
            filterBase={_ => _ !== 'unable_unwilling_to_answer'}
            data={data}
          />
          <ChartBarMultipleBy
            data={data}
            by={_ => _.what_are_the_barriers_to_accessing_health_services}
            label={Protection_hhs3.options.what_are_the_barriers_to_accessing_health_services}
            filterValue={['unable_unwilling_to_answer']}
          />
        </SlidePanel>
      </Div>
    </Div>
  )
}