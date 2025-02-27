import React, {useMemo} from 'react'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlideHeader, SlidePanel, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {snapShotDefaultPieIndicatorsProps} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {Lazy} from '@/shared/Lazy'
import {Person, Protection_hhs3, toPercent} from 'infoportal-common'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartHelper} from '@/shared/charts/chartHelper'
import {Obj, seq} from '@axanc/ts-utils'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {Box} from '@mui/material'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'
import {Utils} from '@/utils/utils'
import {snapshotProtMonitoNn2Logo} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2'
import {ChartBarMultipleByKey} from '@/shared/charts/ChartBarMultipleByKey'

export const SnapshotProtMonitoNN2Needs = () => {
  const ctx = ProtectionMonito.useContext()
  const {formatLargeNumber, m} = useI18n()

  const mostSelected = useMemo(() => {
    const byCategory = ChartHelper.single({
      data: ctx.dataFiltered
        .flatMap((_) => [_.what_is_your_1_priority, _.what_is_your_2_priority, _.what_is_your_3_priority])
        .filter((_) => _ !== 'unable_unwilling_to_answer' && _ !== 'none')
        .compact(),
    }).get()
    const sorted = Obj.entries(byCategory)
      .sort(([a, av], [b, bv]) => bv.value - av.value)
      .splice(0, 4)
      .map(([label, value]) => ({label, value}))
    return {
      byCategory: sorted,
      total: seq(Obj.values(byCategory)).sum((_) => _.value),
    }
  }, [ctx.dataFiltered])

  return (
    <PdfSlide>
      <SlideHeader logo={snapshotProtMonitoNn2Logo}>{m.snapshotProtMonito.basicNeeds}</SlideHeader>
      <PdfSlideBody>
        <Div>
          <Div column>
            <SlideTxt>
              <Lazy
                deps={[ctx.dataFiltered]}
                fn={() => {
                  return {
                    healthPn: toPercent(
                      ChartHelper.percentage({
                        data: ctx.dataFiltered,
                        value: (_) =>
                          !!(
                            _.what_is_your_1_priority?.includes('health_1_2') ||
                            _.what_is_your_2_priority?.includes('health_1_2') ||
                            _.what_is_your_3_priority?.includes('health_1_2')
                          ),
                      }).percent,
                      0,
                    ),
                    damagedAcc: toPercent(
                      ChartHelper.percentage({
                        data: ctx.dataFiltered
                          .map((_) => _.what_is_the_general_condition_of_your_accommodation)
                          .compact(),
                        value: (_) => _ !== 'sound_condition',
                        base: (_) => _ !== 'unable_unwilling_to_answer',
                      }).percent,
                      0,
                    ),
                  }
                }}
              >
                {(_) => (
                  <p
                  // dangerouslySetInnerHTML={{
                  // __html: m.snapshotProtMonito.nn2.needs(_)
                  >
                    {/* <b>{_.healthPn}</b> of respondents indicated health as a priority need. <b>{_.damagedAcc}</b> of respondents reported damage to their accommodation. Significant
                    challenges in accessing the
                    compensation mechanism for damaged and destroyed property are still being reported, including due to the lack of essential ownership documents. */}
                    Barriers to access healthcare, including due to a lack of available (specialized) health care
                    services, continue to be significantly reported, particularly affecting persons with reduced
                    mobility, while the lack of available and affordable transportation further compounds the challenges
                    faced by vulnerable populations in reaching essential services.
                  </p>
                )}
              </Lazy>
            </SlideTxt>
            <SlidePanel title="Priority Needs">
              <Box sx={{display: 'flex', flexWrap: 'wrap', m: -1}}>
                {mostSelected.byCategory.map((_) => (
                  <Box key={_.label} sx={{flex: '1 1 50%', m: 0, p: 1}}>
                    <ChartPieWidget
                      dense
                      value={_.value.value}
                      base={mostSelected.total}
                      title={Utils.clearParenthesis(Protection_hhs3.options.what_is_your_1_priority[_.label])}
                      showValue
                    />
                  </Box>
                ))}
              </Box>
            </SlidePanel>
            {/*<SlidePanel>*/}
            {/*<ChartPieWidgetBy*/}
            {/*  {...snapShotDefaultPieProps}*/}
            {/*  title={m.protHHS2.barriersToAccessHealth}*/}
            {/*  compare={{before: ctx.lastMonth}}*/}
            {/*  filter={_ => _.do_you_have_access_to_health_care_in_your_current_location !== 'yes'}*/}
            {/*  filterBase={_ => _.do_you_have_access_to_health_care_in_your_current_location !== 'unable_unwilling_to_answer'}*/}
            {/*  data={ctx.dataFiltered}*/}
            {/*/>*/}
            {/*<ChartBarMultipleBy*/}
            {/*  by={_ => _.what_are_the_barriers_to_accessing_health_services}*/}
            {/*  label={Protection_hhs3.options.what_are_the_barriers_to_accessing_health_services}*/}
            {/*  data={ctx.dataFiltered}*/}
            {/*  filterValue={['unable_unwilling_to_answer']}*/}
            {/*  limit={5}*/}
            {/*/>*/}
            {/*</SlidePanel>*/}
            {/*<SlidePanel>*/}
            {/*  <ChartPieWidgetBy*/}
            {/*    {...snapShotDefaultPieProps}*/}
            {/*    title={m.protHHS2.unregisteredDisability}*/}
            {/*    filter={_ => _.do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov !== 'yes_all'}*/}
            {/*    compare={{before: ctx.lastMonth}}*/}
            {/*    filterBase={_ => _.do_you_or_anyone_in_your_household_have_a_disability_status_from_the_gov !== 'unable_unwilling_to_answer'}*/}
            {/*    data={ctx.dataFiltered}*/}
            {/*  />*/}
            {/*  <ChartBarSingleBy*/}
            {/*    data={ctx.dataFiltered}*/}
            {/*    by={_ => _.why_dont_they_have_status}*/}
            {/*    filter={_ => _.why_dont_they_have_status !== 'unable_unwilling_to_answer'}*/}
            {/*    label={{*/}
            {/*      ...Protection_hhs3.options.why_dont_they_have_status,*/}
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
              <Lazy deps={[ctx.dataFiltered]} fn={() => ctx.dataFiltered.flatMap((_) => _.persons)}>
                {(_) => (
                  <>
                    <ChartPieWidgetBy
                      title={m.protHHS2.hhWithMemberHavingDifficulties}
                      data={_}
                      filter={(_) => _.disability !== undefined}
                      sx={{mb: 1}}
                      {...snapShotDefaultPieIndicatorsProps}
                    />
                    <ChartBarMultipleByKey
                      // filter={_ => _.disability !== undefined}
                      property="disability"
                      data={_}
                      label={{
                        See: `Seeing, even if wearing glasses`,
                        Hear: `Hearing, even if using a hearing aid`,
                        Walk: `Walking or climbing steps`,
                        Rem: `Remembering or concentrating`,
                        Care: `Self-care, such as washing all over or dressing`,
                        Comm: `Using your usual language`,
                        None: '',
                      }}
                      filterValue={[Person.WgDisability.None]}
                    />
                  </>
                )}
              </Lazy>
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <ChartPieWidgetBy
                compare={{before: ctx.dataPreviousPeriod}}
                title={m.protHHS2.mainConcernsRegardingHousing}
                filter={(_) => !_.what_are_your_main_concerns_regarding_your_accommodation?.includes('none')}
                data={ctx.dataFiltered}
                sx={{mb: 1}}
                {...snapShotDefaultPieIndicatorsProps}
              />
              <ChartBarMultipleBy
                by={(_) => _.what_are_your_main_concerns_regarding_your_accommodation}
                label={Protection_hhs3.options.what_are_your_main_concerns_regarding_your_accommodation}
                data={ctx.dataFiltered}
                filterValue={['unable_unwilling_to_answer', 'none']}
              />
            </SlidePanel>
            {/* <SlidePanel> */}
            {/* <SlidePanelTitle>{m.accommodationCondition}</SlidePanelTitle>
              <ChartBarSingleBy
                data={ctx.dataFiltered}
                by={_ => _.what_is_the_general_condition_of_your_accommodation}
                label={Protection_hhs3.options.what_is_the_general_condition_of_your_accommodation}
                sortBy={ChartHelperOld.sortBy.custom([
                  'sound_condition',
                  'partially_damaged',
                  'severely_damaged',
                  'destroyed',
                  'unfinished',
                ])}
                filter={_ => _.what_is_the_general_condition_of_your_accommodation !== 'unable_unwilling_to_answer'}
              />
            </SlidePanel> */}
            <SlidePanel>
              <ChartPieWidgetByKey
                title={m.protHHS2.barriersToAccessHealth}
                sx={{mb: 2}}
                property="do_you_have_access_to_health_care_in_your_current_location"
                compare={{before: ctx.dataPreviousPeriod}}
                filter={(_) => _ !== 'yes'}
                filterBase={(_) => _ !== 'unable_unwilling_to_answer'}
                data={ctx.dataFiltered}
                {...snapShotDefaultPieIndicatorsProps}
              />
              <ChartBarMultipleBy
                data={ctx.dataFiltered}
                by={(_) => _.what_are_the_barriers_to_accessing_health_services}
                label={{
                  ...Protection_hhs3.options.what_are_the_barriers_to_accessing_health_services,
                  other_specify: 'Other',
                }}
                filterValue={['unable_unwilling_to_answer']}
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}
