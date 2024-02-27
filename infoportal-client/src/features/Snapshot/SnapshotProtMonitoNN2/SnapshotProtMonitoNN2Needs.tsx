import React, {useMemo} from 'react'
import {useSnapshotProtMonitoringContext} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlideHeader, SlidePanel, SlidePanelTitle, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {snapShotDefaultPieProps} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {Lazy} from '@/shared/Lazy'
import {Protection_hhs2, Protection_hhs3, toPercent} from '@infoportal-common'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartHelper} from '@/shared/charts/chartHelper'
import {Obj, seq} from '@alexandreannic/ts-utils'
import {Panel, PanelBody} from '@/shared/Panel'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {Box} from '@mui/material'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'
import {ChartBarMultipleByKey} from '@/shared/charts/ChartBarMultipleByKey'

export const SnapshotProtMonitoNN2Needs = () => {
  const {data, computed, period} = useSnapshotProtMonitoringContext()
  const {formatLargeNumber, m} = useI18n()

  const mostSelected = useMemo(() => {
    const byCategory = ChartHelper.single({
      data: data.flatMap(_ => [_.what_is_your_1_priority, _.what_is_your_2_priority, _.what_is_your_3_priority]).filter(_ => _ !== 'unable_unwilling_to_answer' && _ !== 'none').compact()
    }).get()
    const sorted = Obj.entries(byCategory).sort(([a, av], [b, bv]) => bv.value - av.value).splice(0, 4).map(([label, value]) => ({label, value}))
    return {
      byCategory: sorted,
      total: seq(Obj.values(byCategory)).sum(_ => _.value)
    }
  }, [data])

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
                    {/* <b>{_.healthPn}</b> of respondents indicated health as a priority need. <b>{_.damagedAcc}</b> of respondents reported damage to their accommodation. Significant
                    challenges in accessing the
                    compensation mechanism for damaged and destroyed property are still being reported, including due to the lack of essential ownership documents. */}
                    Shelter concerns have risen during the winter season with significant challenges related to heating , especially in frontline communities, with a substantial
                    shortfall in essential heating appliances and the shortages of solid fuel. Persons with reduced mobility continue to face disproportionate barriers to accessing
                    essential services, including healthcare, due to a lack of specialized transportation and a lack of financial resources.
                  </p>
                }
              </Lazy>
            </SlideTxt>
            <SlidePanel title="Priority Needs">
              <Box sx={{display: 'flex', flexWrap: 'wrap', m: -1}}>
                {mostSelected.byCategory.map(_ =>
                  <Box key={_.label} sx={{flex: '1 1 50%', m: 0, p: 1}}>
                    <ChartPieWidget dense value={_.value.value} base={mostSelected.total} title={Protection_hhs3.options.what_is_your_1_priority[_.label]} showValue/>
                  </Box>
                )}
              </Box>
            </SlidePanel>
            {/*<SlidePanel>*/}
            {/*<ChartPieWidgetBy*/}
            {/*  {...snapShotDefaultPieProps}*/}
            {/*  title={m.protHHS2.barriersToAccessHealth}*/}
            {/*  compare={{before: computed.lastMonth}}*/}
            {/*  filter={_ => _.do_you_have_access_to_health_care_in_your_current_location !== 'yes'}*/}
            {/*  filterBase={_ => _.do_you_have_access_to_health_care_in_your_current_location !== 'unable_unwilling_to_answer'}*/}
            {/*  data={data}*/}
            {/*/>*/}
            {/*<ChartBarMultipleBy*/}
            {/*  by={_ => _.what_are_the_barriers_to_accessing_health_services}*/}
            {/*  label={Protection_hhs2.options.what_are_the_barriers_to_accessing_health_services}*/}
            {/*  data={data}*/}
            {/*  filterValue={['unable_unwilling_to_answer']}*/}
            {/*  limit={5}*/}
            {/*/>*/}
            {/*</SlidePanel>*/}
            {/*<SlidePanel>*/}
            {/*  <ChartPieWidgetBy*/}
            {/*    {...snapShotDefaultPieProps}*/}
            {/*    title={m.protHHS2.unregisteredDisability}*/}
            {/*    filter={_ => _.do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov !== 'yes_all'}*/}
            {/*    compare={{before: computed.lastMonth}}*/}
            {/*    filterBase={_ => _.do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov !== 'unable_unwilling_to_answer'}*/}
            {/*    data={data}*/}
            {/*  />*/}
            {/*  <ChartBarSingleBy*/}
            {/*    data={data}*/}
            {/*    by={_ => _.why_dont_they_have_status}*/}
            {/*    filter={_ => _.why_dont_they_have_status !== 'unable_unwilling_to_answer'}*/}
            {/*    label={{*/}
            {/*      ...Protection_hhs2.options.why_dont_they_have_status,*/}
            {/*      status_registration_not_requested: 'Disability status not applied for',*/}
            {/*      status_registration_rejected_not_meeting_the_criteria_as_per_ukrainian_procedure: 'Status registration rejected',*/}
            {/*    }}*/}
            {/*    mergeOptions={{*/}
            {/*      delays_in_registration_process: 'other_specify',*/}
            {/*      unaware_ofnot_familiar_with_the_procedure: 'other_specify',*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</SlidePanel>*/}
            <SlidePanel>
              <ChartPieWidgetByKey
                property="do_you_have_a_household_member_that_has_a_lot_of_difficulty"
                title={m.protHHS2.hhWithMemberHavingDifficulties}
                filter={_ => !_.includes('no')}
                data={data}
                sx={{mb: 1}}
              />
              <ChartBarMultipleByKey
                property="do_you_have_a_household_member_that_has_a_lot_of_difficulty"
                data={data}
                label={{
                  ...Protection_hhs3.options.do_you_have_a_household_member_that_has_a_lot_of_difficulty,
                  wg_using_your_usual_language_have_difficulty_communicating: m.protHHS2.wg_using_your_usual_language_have_difficulty_communicating,
                }}
                filterValue={['no', 'unable_unwilling_to_answer']}
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