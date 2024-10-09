import React from 'react'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlideHeader, SlidePanel, SlidePanelTitle, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {Lazy} from '@/shared/Lazy'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {snapShotDefaultPieIndicatorsProps} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Protection_hhs3, toPercent} from 'infoportal-common'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {snapshotProtMonitoNn2Logo} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2'
import {ChartHelper} from '@/shared/charts/chartHelper'

export const SnapshotProtMonitoNN2Safety = () => {
  const ctx = ProtectionMonito.useContext()
  const {formatLargeNumber, m} = useI18n()

  return (
    <PdfSlide>
      <SlideHeader logo={snapshotProtMonitoNn2Logo}>{m.snapshotProtMonito.MainProtectionNeeds}</SlideHeader>
      <PdfSlideBody>
        <Div>
          <Div column>
            <SlideTxt>
              <Lazy deps={[ctx.dataFiltered]} fn={() => {
                return {
                  fearOfShelling: toPercent(ChartHelper.percentage({
                    data: ctx.dataFiltered.map(_ => _.what_are_the_main_factors_that_make_this_location_feel_unsafe).compact(),
                    value: _ => _.includes('bombardment_shelling_or_threat_of_shelling'),
                    base: _ => !_.includes('unable_unwilling_to_answer'),
                  }).percent, 0),
                  barrierToMovement: toPercent(ChartHelper.percentage({
                    data: ctx.dataFiltered.map(_ => _.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area).compact(),
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
                    In addition to the threats posed by shelling attacks and the presence of explosive ordnance, various other factors severely restrict people's freedom of
                    movement. These include challenges related to the accessibility and affordability of transportation, as well as apprehensions regarding conscription.
                    Reports persist regarding heightened concerns over active mobilization for conscription, prompting men to limit their movements as a precautionary measure.
                    Reports persist of substantial stress and declining mental health and well-being, with older individuals and people with disabilities being particularly
                    susceptible to psychological distress.
                  </p>
                }
              </Lazy>
            </SlideTxt>
            <SlidePanel>
              <SlidePanelTitle>{m.majorStressFactors}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={ctx.dataFiltered}
                by={_ => _.what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members}
                label={{
                  ...Protection_hhs3.options.what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members,
                  other_specify: 'Other'
                }}
                filterValue={['unable_unwilling_to_answer']}
                mergeOptions={{
                  lack_of_access_to_employment_opportunities: 'other_specify',
                  missing_family_members: 'other_specify',
                  fear_of_being_sexually_assaulted: 'other_specify',
                  lack_of_access_to_basic_services: 'other_specify',
                  lack_of_access_to_specialized_medical_services: 'other_specify',
                  fear_of_conscription: 'other_specify',
                  displacement_related_stress: 'other_specify'
                }}
              />
            </SlidePanel>
            <SlidePanel>
              <Lazy deps={[ctx.dataFiltered.flatMap(p => p.persons)]} fn={(x) => ChartHelper.percentage({
                data: x.map(_ => _.lackDoc).compact().filter(_ => !_.includes('unable_unwilling_to_answer')),
                value: _ => !_.includes('none'),
              })}>
                {(_, last) => <ChartPieWidget title={m.lackOfPersonalDoc} dense sx={{mb: 1}} value={_.value} base={_.base}/>}
              </Lazy>
              <ChartBarMultipleBy
                data={ctx.dataFiltered.flatMap(p => p.persons)}
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
                compare={{before: ctx.dataPreviousPeriod}}
                data={ctx.dataFiltered}
                {...snapShotDefaultPieIndicatorsProps}
              />
              <ChartBarSingleBy
                data={ctx.dataFiltered}
                finalTransform={_ => Obj.sortManual(_, [
                  '_1_very_unsafe',
                  '_2_unsafe',
                  '_3_safe',
                  '_4_very_safe',
                ])}
                by={_ => _.please_rate_your_sense_of_safety_in_this_location}
                label={Protection_hhs3.options.please_rate_your_sense_of_safety_in_this_location}
                filter={_ => _.please_rate_your_sense_of_safety_in_this_location !== 'unable_unwilling_to_answer'}
              />
              <SlidePanelTitle sx={{mt: 3}}>{m.influencingFactors}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={ctx.dataFiltered}
                mergeOptions={{
                  fighting_between_armed_or_security_actors: 'other_specify',
                  intercommunity_tensions: 'other_specify',
                  criminality: 'other_specify',
                  presence_of_armed_or_security_actors: 'other_specify'
                }}
                by={_ => _.what_are_the_main_factors_that_make_this_location_feel_unsafe}
                label={{
                  ...Protection_hhs3.options.what_are_the_main_factors_that_make_this_location_feel_unsafe,
                  other_specify: 'Other'
                }}
                filterValue={['unable_unwilling_to_answer']}
              />
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                title={m.protHHS2.freedomOfMovement}
                filter={_ => !_.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area!.includes('no')}
                filterBase={_ => !!_.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area && !_.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area.includes(
                  'unable_unwilling_to_answer')}
                compare={{before: ctx.dataPreviousPeriod}}
                data={ctx.dataFiltered}
                {...snapShotDefaultPieIndicatorsProps}
              />
              <ChartBarMultipleBy
                data={ctx.dataFiltered}
                mergeOptions={{
                  reduced_mobility_linked_with_health_issues_or_disability: 'other_specify',
                  lack_of_documentation: 'other_specify',
                  risks_of_sexual_violence_and_exploitation: 'other_specify'
                }}
                by={_ => _.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area}
                label={{
                  ...Protection_hhs3.options.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area,
                  other_specify: 'Other'
                }}
                filterValue={['no', 'unable_unwilling_to_answer']}
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}