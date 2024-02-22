import React from 'react'
import {useSnapshotProtMonitoringContext} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlideHeader, SlidePanel, SlidePanelTitle, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {snapShotDefaultPieProps} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {Lazy} from '@/shared/Lazy'
import {Protection_hhs2, toPercent} from '@infoportal-common'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

export const SnapshotProtMonitoNN2Needs = () => {
  const {data, computed, period} = useSnapshotProtMonitoringContext()
  const {formatLargeNumber, m} = useI18n()

  return (
    <PdfSlide>
      <SlideHeader>{m.snapshotProtMonito.basicNeeds}</SlideHeader>
      <PdfSlideBody>
        <Div>
          <Div column>
            <SlideTxt>
              <Lazy deps={[data]} fn={() => {
                return {
                  healthPn: toPercent(ChartHelperOld.percentage({
                    data,
                    value: _ => !!(_.what_is_your_1_priority?.includes('health_1_2')
                      || _.what_is_your_2_priority?.includes('health_1_2')
                      || _.what_is_your_3_priority?.includes('health_1_2')),
                  }).percent, 0),
                  damagedAcc: toPercent(ChartHelperOld.percentage({
                    data: data.map(_ => _.what_is_the_general_condition_of_your_accommodation).compact(),
                    value: _ => _ !== 'sound_condition',
                    base: _ => _ !== 'unable_unwilling_to_answer',
                  }).percent, 0)
                }
              }}>
                {_ =>
                  <p
                    // dangerouslySetInnerHTML={{
                    // __html: m.snapshotProtMonito.nn2.needs(_)
                  >
                    <b>{_.healthPn}</b> of respondents indicated health as a priority need. <b>{_.damagedAcc}</b> of respondents reported damage to their accommodation. Significant
                    challenges in accessing the
                    compensation mechanism for damaged and destroyed property are still being reported, including due to the lack of essential ownership documents.
                  </p>
                }
              </Lazy>
            </SlideTxt>
            <SlidePanel>
              <ChartPieWidgetBy
                {...snapShotDefaultPieProps}
                title={m.protHHS2.barriersToAccessHealth}
                compare={{before: computed.lastMonth}}
                filter={_ => _.do_you_have_access_to_health_care_in_your_current_location !== 'yes'}
                filterBase={_ => _.do_you_have_access_to_health_care_in_your_current_location !== 'unable_unwilling_to_answer'}
                data={data}
              />
              <ChartBarMultipleBy
                by={_ => _.what_are_the_barriers_to_accessing_health_services}
                label={Protection_hhs2.options.what_are_the_barriers_to_accessing_health_services}
                data={data}
                filterValue={['unable_unwilling_to_answer']}
                limit={5}
              />
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                {...snapShotDefaultPieProps}
                title={m.protHHS2.unregisteredDisability}
                filter={_ => _.do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov !== 'yes_all'}
                compare={{before: computed.lastMonth}}
                filterBase={_ => _.do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov !== 'unable_unwilling_to_answer'}
                data={data}
              />
              <ChartBarSingleBy
                data={data}
                by={_ => _.why_dont_they_have_status}
                filter={_ => _.why_dont_they_have_status !== 'unable_unwilling_to_answer'}
                label={{
                  ...Protection_hhs2.options.why_dont_they_have_status,
                  status_registration_not_requested: 'Disability status not applied for',
                  status_registration_rejected_not_meeting_the_criteria_as_per_ukrainian_procedure: 'Status registration rejected',
                }}
                mergeOptions={{
                  delays_in_registration_process: 'other_specify',
                  unaware_ofnot_familiar_with_the_procedure: 'other_specify',
                }}
              />
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <ChartPieWidgetBy
                {...snapShotDefaultPieProps}
                compare={{before: computed.lastMonth}}
                title={m.protHHS2.mainConcernsRegardingHousing}
                filter={_ => !_.what_are_your_main_concerns_regarding_your_accommodation?.includes('none')}
                data={data}
                sx={{mb: 1}}
              />
              <ChartBarMultipleBy
                by={_ => _.what_are_your_main_concerns_regarding_your_accommodation}
                label={Protection_hhs2.options.what_are_your_main_concerns_regarding_your_accommodation}
                data={data}
                filterValue={['unable_unwilling_to_answer', 'none']}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.accommodationCondition}</SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={_ => _.what_is_the_general_condition_of_your_accommodation}
                label={Protection_hhs2.options.what_is_the_general_condition_of_your_accommodation}
                sortBy={ChartHelperOld.sortBy.custom([
                  'sound_condition',
                  'partially_damaged',
                  'severely_damaged',
                  'destroyed',
                  'unfinished',
                ])}
                filter={_ => _.what_is_the_general_condition_of_your_accommodation !== 'unable_unwilling_to_answer'}
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}