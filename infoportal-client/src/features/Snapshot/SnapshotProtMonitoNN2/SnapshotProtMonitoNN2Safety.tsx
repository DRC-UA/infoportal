import React from 'react'
import {useSnapshotProtMonitoringContext} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlideHeader, SlidePanel, SlidePanelTitle, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {Lazy} from '@/shared/Lazy'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {snapShotDefaultPieProps} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Protection_hhs2, Protection_hhs3, toPercent} from '@infoportal-common'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'

export const SnapshotProtMonitoNN2Safety = () => {
  const {data, computed, period} = useSnapshotProtMonitoringContext()
  const {formatLargeNumber, m} = useI18n()

  return (
    <PdfSlide>
      <SlideHeader>{m.snapshotProtMonito.MainProtectionNeeds}</SlideHeader>
      <PdfSlideBody>
        <Div>
          <Div column>
            <SlideTxt>
              <Lazy deps={[data]} fn={() => {
                return {
                  fearOfShelling: toPercent(ChartHelperOld.percentage({
                    data: data.map(_ => _.what_are_the_main_factors_that_make_this_location_feel_unsafe).compact(),
                    value: _ => _.includes('bombardment_shelling_or_threat_of_shelling'),
                    base: _ => !_.includes('unable_unwilling_to_answer'),
                  }).percent, 0),
                  barrierToMovement: toPercent(ChartHelperOld.percentage({
                    data: data.map(_ => _.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area).compact(),
                    value: _ => !_.includes('no'),
                    base: _ => !_.includes('unable_unwilling_to_answer'),
                  }).percent, 0),
                }
              }}>
                {_ =>
                  <p
                    //   dangerouslySetInnerHTML={{
                    //   __html: m.snapshotProtMonito.nn2.safety(_)
                    // }}
                  >
                    <b>33%</b> of respondents indicated a poor sense of safety mainly due to shelling and UXOs contamination. Reports indicate challenges with the functionality of
                    the air alert system, particularly in frontline communities. Additionally, the absence of operational and accessible bomb shelters forces residents to seek
                    refuge in unreliable home basements. There are ongoing reports of considerable stress and deteriorating mental health and well-being, with older individuals and
                    those with disabilities being particularly vulnerable to experiencing psychological distress.
                  </p>
                }
              </Lazy>
            </SlideTxt>
            <SlidePanel>
              <SlidePanelTitle>{m.majorStressFactors}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={_ => _.what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members}
                label={{
                  ...Protection_hhs2.options.what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members,
                  other_specify: 'Other'
                }}
                filterValue={['unable_unwilling_to_answer']}
                mergeOptions={{
                  lack_of_access_to_employment_opportunities: 'other_specify',
                  missing_family_members: 'other_specify',
                  fear_of_being_sexually_assaulted: 'other_specify',
                }}
              />
            </SlidePanel>
            <SlidePanel>
              <Lazy deps={[data.flatMap(p => p.persons)]} fn={(x) => ChartHelperOld.percentage({
                data: x.map(_ => _.lackDoc).compact().filter(_ => !_.includes('unable_unwilling_to_answer')),
                value: _ => !_.includes('none'),
              })}>
                {(_, last) => <ChartPieWidget title={m.lackOfPersonalDoc} dense sx={{mb: 1}} value={_.value} base={_.base}/>}
              </Lazy>
              <ChartBarMultipleBy
                data={data.flatMap(p => p.persons)}
                filterValue={['none']}
                by={_ => _.lackDoc}
                label={Protection_hhs3.options.does_lack_doc}
                base="percentOfTotalChoices"
              />
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <ChartPieWidgetBy
                title={m.protHHS2.poorSenseOfSafety}
                filter={_ => _.please_rate_your_sense_of_safety_in_this_location === '_2_unsafe' || _.please_rate_your_sense_of_safety_in_this_location === '_1_very_unsafe'}
                filterBase={_ => _.please_rate_your_sense_of_safety_in_this_location !== 'unable_unwilling_to_answer'}
                compare={{before: computed.lastMonth}}
                data={data}
                {...snapShotDefaultPieProps}
              />
              <ChartBarSingleBy
                data={data}
                sortBy={ChartHelperOld.sortBy.custom([
                  '_1_very_unsafe',
                  '_2_unsafe',
                  '_3_safe',
                  '_4_very_safe',
                ])}
                by={_ => _.please_rate_your_sense_of_safety_in_this_location}
                label={Protection_hhs2.options.please_rate_your_sense_of_safety_in_this_location}
                filter={_ => _.please_rate_your_sense_of_safety_in_this_location !== 'unable_unwilling_to_answer'}
              />
              <SlidePanelTitle sx={{mt: 3}}>{m.influencingFactors}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={_ => _.what_are_the_main_factors_that_make_this_location_feel_unsafe}
                label={Protection_hhs2.options.what_are_the_main_factors_that_make_this_location_feel_unsafe}
                filterValue={['unable_unwilling_to_answer']}
              />
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                title={m.protHHS2.freedomOfMovement}
                filter={_ => !_.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area!.includes('no')}
                filterBase={_ => !!_.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area && !_.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area.includes(
                  'unable_unwilling_to_answer')}
                compare={{before: computed.lastMonth}}
                data={data}
                {...snapShotDefaultPieProps}
              />
              <ChartBarMultipleBy
                data={data}
                by={_ => _.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area}
                label={Protection_hhs2.options.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area}
                filterValue={['no', 'unable_unwilling_to_answer']}
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}