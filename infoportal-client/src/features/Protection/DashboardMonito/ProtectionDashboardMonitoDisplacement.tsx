import {Div, SlidePanel, SlidePanelTitle} from '@/shared/PdfLayout/PdfSlide'
import React, {useState} from 'react'
import {useI18n} from '@/core/i18n'
import {DashboardPageProps} from './ProtectionDashboardMonito'
import {Box, Divider, Icon} from '@mui/material'
import {Lazy} from '@/shared/Lazy'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {UkraineMap} from '@/shared/UkraineMap/UkraineMap'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {ChartLineByDate} from '@/shared/charts/ChartLineByDate'
import {Protection_hhs3} from '@infoportal-common'
import {Enum} from '@alexandreannic/ts-utils'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartHelper} from '@/shared/charts/chartHelper'

// do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area
// what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members
export const ProtectionDashboardMonitoDisplacement = ({
  data,
  computed,
}: DashboardPageProps) => {
  const {m} = useI18n()
  const [intentionFilters, setIntentionFilters] = useState<Record<string, any>>({})
  return (
    <Div responsive>
      <Div column>
        <SlidePanel title={m.idpPopulationByOblast}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <UkraineMap sx={{flex: 1}} data={computed.idpsByOriginOblast} base={computed.idps.length} title={m.originOblast}/>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <Icon color="disabled" fontSize="large" sx={{mx: 1}}>arrow_forward</Icon>
              <Icon color="disabled" fontSize="large" sx={{mx: 1}}>arrow_forward</Icon>
              <Icon color="disabled" fontSize="large" sx={{mx: 1}}>arrow_forward</Icon>
            </Box>
            <UkraineMap sx={{flex: 1}} data={computed.byCurrentOblast} base={computed.idps.length} legend={false} title={m.currentOblast}/>
          </Box>
        </SlidePanel>
        <SlidePanel title={m.displacementAndReturn}>
          <ChartLineByDate
            data={data}
            start={new Date(2022, 0, 1)}
            curves={{
              [m.departureFromAreaOfOrigin]: _ => _.when_did_you_leave_your_area_of_origin,
              [m.returnToOrigin]: _ => _.when_did_you_return_to_your_area_of_origin,
            }}
            label={[m.departureFromAreaOfOrigin, m.returnToOrigin]}
            // translations={{
            //   when_did_you_leave_your_area_of_origin: m.departureFromAreaOfOrigin,
            //   when_did_you_return_to_your_area_of_origin: m.returnToOrigin,
            end={computed.end}
          />
        </SlidePanel>
        <SlidePanel>
          <ChartPieWidgetByKey
            showValue showBase
            title={m.protHHS2.hhsAffectedByMultipleDisplacement}
            data={data}
            property="have_you_been_displaced_prior_to_your_current_displacement"
            filter={_ => _ === 'yes_after_february_24_2022'}
            filterBase={_ => _ !== 'unable_unwilling_to_answer'}
          />
          <Lazy deps={[data]} fn={() => ChartHelper.byCategory({
            data,
            categories: computed.categoryOblasts('where_are_you_current_living_oblast'),
            filter: _ => _.have_you_been_displaced_prior_to_your_current_displacement === 'yes_after_february_24_2022',
            filterBase: _ => _.have_you_been_displaced_prior_to_your_current_displacement && _.have_you_been_displaced_prior_to_your_current_displacement !== 'unable_unwilling_to_answer'
          }).get()
          }>
            {_ => <UkraineMap omitValueLt={5} data={_} sx={{mx: 2}} fillBaseOn="percent"/>}
          </Lazy>
        </SlidePanel>
        <SlidePanel title={m.protHHS2.reasonForLeaving}>
          <ChartBarMultipleBy
            data={data}
            by={_ => _.why_did_you_leave_your_area_of_origin}
            label={Protection_hhs3.options.why_did_you_leave_your_area_of_origin}
            filterValue={['unable_unwilling_to_answer']}
          />
        </SlidePanel>
      </Div>
      <Div column>
        <SlidePanel>
          <Lazy deps={[data, computed.lastMonth]} fn={(d) => ChartHelperOld.percentage({
            value: _ => _.did_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns?.includes('none') === false,
            data: d,
            base: _ => _.did_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns !== undefined
              && !_.did_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns.includes('unable_unwilling_to_answer'),
          })}>
            {(_, last) => (
              <ChartPieWidget sx={{mb: 1}} value={_.value} base={_.base} evolution={_.percent - last.percent} title={m.protHHS2.safetyOrSecurityConcernsDuringDisplacement}/>
            )}
          </Lazy>
          <ChartBarMultipleBy
            data={data}
            filterValue={['unable_unwilling_to_answer', 'none', 'other_specify']}
            by={_ => _.did_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns}
            label={Protection_hhs3.options.did_you_or_any_member_of_your_household_on_your_displacement_journey_experience_safety_or_security_concerns}
          />
        </SlidePanel>
        <SlidePanel title={m.intentions}>
          <ChartBarSingleBy
            data={data}
            filter={_ => _.what_are_your_households_intentions_in_terms_of_place_of_residence !== 'unable_unwilling_to_answer'}
            by={_ => _.what_are_your_households_intentions_in_terms_of_place_of_residence}
            checked={intentionFilters}
            onToggle={_ => setIntentionFilters(prev => ({...prev, [_]: prev[_] ? !prev[_] : true}))}
            label={{
              ...Protection_hhs3.options.what_are_your_households_intentions_in_terms_of_place_of_residence,
              return_to_the_area_of_origin: m.returnToThePlaceOfHabitualResidence
            }}
          />
          <Lazy deps={[data, intentionFilters]} fn={() => {
            return data.filter(_ => {
              const checked = Enum.entries(intentionFilters).filter(([, v]) => !!v).map(([k]) => k)
              return checked.length === 0 || checked.includes(_.what_are_your_households_intentions_in_terms_of_place_of_residence!)
            })
          }}>
            {filteredData => (
              <>
                <Divider sx={{mt: 3, mb: 3, mx: -2}}/>
                <SlidePanelTitle>{m.protHHS2.factorToHelpIntegration}</SlidePanelTitle>
                <ChartBarMultipleBy
                  data={filteredData}
                  filterValue={['unable_unwilling_to_answer']}
                  by={_ => _.what_factors_would_be_key_to_support_your_successful_integration_into_the_local_community}
                  label={Protection_hhs3.options.what_factors_would_be_key_to_support_your_successful_integration_into_the_local_community}
                />
                <SlidePanelTitle sx={{mt: 4}}>{m.protHHS2.factorToReturn}</SlidePanelTitle>
                <ChartBarMultipleBy
                  data={filteredData}
                  filterValue={['unable_unwilling_to_answer']}
                  by={_ => _.what_would_be_the_deciding_factor_in_your_return_to_your_area_of_origin}
                  label={Protection_hhs3.options.what_would_be_the_deciding_factor_in_your_return_to_your_area_of_origin}
                />
                <SlidePanelTitle sx={{mt: 4}}>{m.protHHS2.reasonForRelocate}</SlidePanelTitle>
                <ChartBarMultipleBy
                  data={filteredData}
                  filterValue={['unable_unwilling_to_answer']}
                  by={_ => _.why_are_planning_to_relocate_from_your_current_place_of_residence}
                  label={Protection_hhs3.options.why_are_planning_to_relocate_from_your_current_place_of_residence}
                />
              </>
            )}
          </Lazy>
        </SlidePanel>
      </Div>
    </Div>
  )
}