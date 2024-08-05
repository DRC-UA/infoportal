import React from 'react'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlideHeader, SlidePanel, SlidePanelTitle, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {Lazy} from '@/shared/Lazy'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {chain, Protection_hhs3} from '@infoportal-common'
import {ChartBar} from '@/shared/charts/ChartBar'
import {snapShotDefaultPieIndicatorsProps} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {Enum} from '@alexandreannic/ts-utils'
import {snapshotProtMonitoNn2Logo} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2'

export const SnapshotProtMonitoNN2Livelihood = () => {
  const ctx = ProtectionMonito.useContext()
  const {formatLargeNumber, m} = useI18n()
  
  return (
    <PdfSlide>
      <SlideHeader logo={snapshotProtMonitoNn2Logo}>{m.snapshotProtMonito.livelihood}</SlideHeader>
      <PdfSlideBody>
        <Div>
          <Div column>
            <SlideTxt>
              <Lazy deps={[ctx.dataFiltered, ctx.dataPreviousPeriod]} fn={d => ChartHelperOld.percentage({
                value: _ => _.including_yourself_are_there_members_of_your_household_who_are_out_of_work_and_seeking_employment === 'yes',
                data: d,
                base: _ => _ !== undefined,
              })}>
                {_ =>
                  <p>
                    The primary reasons for unemployment remain unchanged from previous reports, with a shortage of job opportunities identified as the key factor. To address gaps
                    in meeting basic needs, individuals are resorting to depending on external support, cutting back on expenses related to food and healthcare and depleting
                    savings, a situation that may be exacerbated by Resolution 332 introducing changes in payment of IDP benefits.
                  </p>
                }
              </Lazy>
            </SlideTxt>
            <Div>
              <SlidePanel sx={{flex: 1}}>
                <Lazy deps={[ctx.dataFiltered, ctx.dataPreviousPeriod]} fn={d => ChartHelperOld.percentage({
                  value: _ => _.including_yourself_are_there_members_of_your_household_who_are_out_of_work_and_seeking_employment === 'yes',
                  data: d,
                  base: _ => _ !== undefined,
                })}>
                  {(_, last) => <ChartPieWidget
                    title={m.hhOutOfWork}
                    value={_.value}
                    base={_.base} evolution={_.percent - last.percent}
                    {...snapShotDefaultPieIndicatorsProps}
                    sx={{mb: 0}}
                  />}
                </Lazy>
              </SlidePanel>

              <SlidePanel sx={{flex: 1}}>
                <Lazy deps={[ctx.dataFiltered, ctx.dataPreviousPeriod]} fn={d => ChartHelperOld.percentage({
                  value: _ => _.are_there_gaps_in_meeting_your_basic_needs === 'yes_somewhat' || _.are_there_gaps_in_meeting_your_basic_needs === 'yes_a_lot',
                  data: d,
                })}>
                  {(_, last) => <ChartPieWidget
                    title={m.hhWithGapMeetingBasicNeeds}
                    value={_.value}
                    base={_.base}
                    evolution={_.percent - last.percent}
                    {...snapShotDefaultPieIndicatorsProps}
                    sx={{mb: 0}}
                  />}
                </Lazy>
              </SlidePanel>
            </Div>
            <SlidePanel>
              <SlidePanelTitle>{m.monthlyIncomePerHH}</SlidePanelTitle>
              <Lazy deps={[ctx.dataFiltered]} fn={() => {
                const income = chain(ChartHelperOld.single({
                  filterValue: ['no_income', 'unable_unwilling_to_answer'],
                  data: ctx.dataFiltered.map(_ => _.what_is_the_average_month_income_per_household).compact(),
                }))
                  .map(ChartHelperOld.setLabel(Protection_hhs3.options.what_is_the_average_month_income_per_household))
                  .map(ChartHelperOld.sortBy.custom(Object.keys(Protection_hhs3.options.what_is_the_average_month_income_per_household)))
                  .get()

                const hhSize = ChartHelperOld.sumByCategory({
                  data: ctx.dataFiltered,
                  categories: {
                    // no_income: _ => _.what_is_the_average_month_income_per_household === 'no_income',
                    up_to_3000_UAH: _ => _.what_is_the_average_month_income_per_household === 'up_to_3000_UAH',
                    between_3001_6000_UAH: _ => _.what_is_the_average_month_income_per_household === 'between_3001_6000_UAH',
                    between_6001_9000_UAH: _ => _.what_is_the_average_month_income_per_household === 'between_6001_9000_UAH',
                    between_9001_12000_UAH: _ => _.what_is_the_average_month_income_per_household === 'between_9001_12000_UAH',
                    between_12001_15000_UAH: _ => _.what_is_the_average_month_income_per_household === 'between_12001_15000_UAH',
                    more_than_15000_UAH: _ => _.what_is_the_average_month_income_per_household === 'more_than_15000_UAH',
                  },
                  filter: _ => _.ben_det_hh_size ?? 0,
                })
                return {income, hhSize}
              }}>
                {res => <ChartBar data={res.income} descs={Enum.transform(res.hhSize, (k, _) => [k, m.protHHSnapshot.avgHhSize(_.value / (_.base ?? 1))])}/>}
              </Lazy>
            </SlidePanel>
          </Div>
          <Div column>


            <SlidePanel>
              <SlidePanelTitle>{m.protHHS2.mainSourceOfIncome}</SlidePanelTitle>
              <ChartBarMultipleBy
                by={_ => _.what_are_the_main_sources_of_income_of_your_household}
                label={Protection_hhs3.options.what_are_the_main_sources_of_income_of_your_household}
                data={ctx.dataFiltered}
                filterValue={['unable_unwilling_to_answer']}
                limit={4}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.protHHS2.unemploymentFactors}</SlidePanelTitle>
              <ChartBarMultipleBy
                by={_ => _.what_are_the_reasons_for_being_out_of_work}
                label={{
                  ...Protection_hhs3.options.what_are_the_reasons_for_being_out_of_work,
                  other_specify: 'Other'
                }}
                data={ctx.dataFiltered}
                mergeOptions={{
                  lack_of_information_about_job_market: 'other_specify',
                  lack_of_experience: 'other_specify',
                  mine_containment: 'other_specify',
                  physical_impairment_limitations: 'other_specify',
                  housework_caring_for_children: 'other_specify',
                }}
                filterValue={['unable_unwilling_to_answer']}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.copyingMechanisms}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={ctx.dataFiltered}
                mergeOptions={{
                  selling_off_household_productive_assets: 'other_specify',
                  no_coping_strategy: 'other_specify',
                  borrowing_money: 'other_specify',
                  selling_off_received_humanitarian_assistance: 'other_specify'
                }}
                by={_ => _.what_are_the_strategies_that_your_household_uses_to_cope_with_these_challenges}
                label={{
                  ...Protection_hhs3.options.what_are_the_strategies_that_your_household_uses_to_cope_with_these_challenges,
                  reducing_consumption_of_food: m.protHHS2.reducing_consumption_of_food,
                  other_specify: 'Other'
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