import {Div, SlidePanel, SlidePanelTitle} from '@/shared/PdfLayout/PdfSlide'
import React from 'react'
import {useI18n} from '@/core/i18n'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Protection_hhs3} from 'infoportal-common'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'
import {Obj} from '@alexandreannic/ts-utils'

export const ProtectionDashboardMonitoSafety = () => {
  const ctx = ProtectionMonito.useContext()
  const {formatLargeNumber, m} = useI18n()
  return (
    <Div responsive>
      <Div column>
        <SlidePanel>
          <ChartPieWidgetByKey
            sx={{mb: 1}}
            title={m.protHHS2.poorSenseOfSafety}
            property="please_rate_your_sense_of_safety_in_this_location"
            filter={_ => _ === '_2_unsafe' || _ === '_1_very_unsafe'}
            filterBase={_ => _ !== 'unable_unwilling_to_answer'}
            compare={{before: ctx.dataPreviousPeriod}}
            data={ctx.dataFiltered}
          />
          <MapSvgByOblast
            sx={{mx: 2}}
            data={ctx.dataFiltered}
            getOblast={_ => _.where_are_you_current_living_oblast as any}
            value={_ => _.please_rate_your_sense_of_safety_in_this_location === '_1_very_unsafe'
              || _.please_rate_your_sense_of_safety_in_this_location === '_2_unsafe'}
            base={_ => _.please_rate_your_sense_of_safety_in_this_location !== 'unable_unwilling_to_answer' &&
              _.please_rate_your_sense_of_safety_in_this_location !== undefined}
          />
          <SlidePanelTitle>{m.details}</SlidePanelTitle>
          <ChartBarSingleBy
            data={ctx.dataFiltered}
            finalTransform={_ => Obj.sortManual(_, [
              '_1_very_unsafe',
              '_2_unsafe',
              '_3_safe',
              '_4_very_safe',
            ])}
            label={Protection_hhs3.options.please_rate_your_sense_of_safety_in_this_location}
            by={_ => _.please_rate_your_sense_of_safety_in_this_location}
            filter={_ => _.please_rate_your_sense_of_safety_in_this_location !== 'unable_unwilling_to_answer'}
          />
          <SlidePanelTitle sx={{mt: 4}}>{m.influencingFactors}</SlidePanelTitle>
          <ChartBarMultipleBy
            data={ctx.dataFiltered}
            label={Protection_hhs3.options.what_are_the_main_factors_that_make_this_location_feel_unsafe}
            by={_ => _.what_are_the_main_factors_that_make_this_location_feel_unsafe}
            filterValue={['unable_unwilling_to_answer']}
          />
        </SlidePanel>
      </Div>
      <Div column>
        <SlidePanel>
          <ChartPieWidgetByKey
            sx={{mb: 1}}
            title={m.protHHS2.poorRelationshipWithHostCommunity}
            property="how_would_you_describe_the_relationship_between_member_of_the_host_community"
            filter={_ => _ === '_2_bad' || _ === '_1_very_bad'}
            filterBase={_ => _ !== 'unable_unwilling_to_answer'}
            compare={{before: ctx.dataPreviousPeriod}}
            data={ctx.dataFiltered}
          />
          <MapSvgByOblast
            sx={{mx: 2}}
            data={ctx.dataFiltered}
            getOblast={_ => _.where_are_you_current_living_oblast as any}
            value={_ => _.how_would_you_describe_the_relationship_between_member_of_the_host_community === '_2_bad'
              || _.how_would_you_describe_the_relationship_between_member_of_the_host_community === '_1_very_bad'}
            base={_ => _.how_would_you_describe_the_relationship_between_member_of_the_host_community !== 'unable_unwilling_to_answer' &&
              _.how_would_you_describe_the_relationship_between_member_of_the_host_community !== undefined}
          />
          <SlidePanelTitle>{m.details}</SlidePanelTitle>
          <ChartBarSingleBy
            data={ctx.dataFiltered}
            finalTransform={_ => Obj.sortManual(_, [
              '_1_very_bad',
              '_2_bad',
              '_3_acceptable',
              '_4_good',
              '_5_very_good',
            ])}
            label={Protection_hhs3.options.how_would_you_describe_the_relationship_between_member_of_the_host_community}
            by={_ => _.how_would_you_describe_the_relationship_between_member_of_the_host_community}
            filter={_ => _.how_would_you_describe_the_relationship_between_member_of_the_host_community !== 'unable_unwilling_to_answer'}
          />
          <SlidePanelTitle sx={{mt: 4}}>{m.influencingFactors}</SlidePanelTitle>
          <ChartBarMultipleBy
            data={ctx.dataFiltered}
            by={_ => _.what_factors_are_affecting_the_relationship_between_communities_in_this_location}
            filterValue={['unable_unwilling_to_answer']}
            label={Protection_hhs3.options.what_factors_are_affecting_the_relationship_between_communities_in_this_location}
          />
        </SlidePanel>
        <SlidePanel>
          <ChartPieWidgetByKey
            sx={{mb: 1}}
            title={m.protHHS2.freedomOfMovement}
            property="do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area"
            filter={_ => !_.includes('no')}
            filterBase={_ => !_.includes('unable_unwilling_to_answer')}
            compare={{before: ctx.dataPreviousPeriod}}
            data={ctx.dataFiltered}
          />
          <ChartBarMultipleBy
            data={ctx.dataFiltered}
            by={_ => _.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area}
            filterValue={['no', 'unable_unwilling_to_answer']}
            label={Protection_hhs3.options.do_you_or_your_household_members_experience_any_barriers_to_movements_in_and_around_the_area}
          />
        </SlidePanel>
      </Div>
    </Div>
  )
}