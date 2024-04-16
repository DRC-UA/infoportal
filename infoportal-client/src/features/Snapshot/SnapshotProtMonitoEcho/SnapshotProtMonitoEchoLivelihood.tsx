import React from 'react'
import {useSnapshotProtMonitoringContext} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlideHeader, SlidePanel, SlidePanelTitle, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {Lazy} from '@/shared/Lazy'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {Protection_hhs2} from '@infoportal-common'
import {snapShotDefaultPieProps} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'

export const SnapshotProtMonitoEchoLivelihood = () => {
  const {data, computed, period} = useSnapshotProtMonitoringContext()
  const {formatLargeNumber, m} = useI18n()

  return (
    <PdfSlide>
      <SlideHeader>{m.snapshotProtMonito.livelihood}</SlideHeader>
      <PdfSlideBody>
        <Div>
          <Div column>
            <SlideTxt>
              <Lazy deps={[data, computed.lastMonth]} fn={d => ChartHelperOld.percentage({
                value: _ => _.including_yourself_are_there_members_of_your_household_who_are_out_of_work_and_seeking_employment === 'yes',
                data: d,
                base: _ => _ !== undefined,
              })}>
                {_ =>
                  <p
                    // dangerouslySetInnerHTML={{
                    // __html: m.snapshotProtMonito.echo.livelihood({
                    //   outOfWork: toPercent(_.percent, 0),
                  >
                    The primary reasons for unemployment remain unchanged from previous reports, with a shortage of job opportunities identified as the key factor.
                    To address gaps in meeting basic needs, individuals are resorting to depleting savings and cutting back on expenses related to food and healthcare, a situation
                    that may be exacerbated by Resolution 332.
                  </p>
                }
              </Lazy>
            </SlideTxt>

            <Div>
              <SlidePanel sx={{flex: 1}}>
                <Lazy deps={[data, computed.lastMonth]} fn={d => ChartHelperOld.percentage({
                  value: _ => _.including_yourself_are_there_members_of_your_household_who_are_out_of_work_and_seeking_employment === 'yes',
                  data: d,
                  base: _ => _ !== undefined,
                })}>
                  {(_, last) => <ChartPieWidget
                    title={m.hhOutOfWork}
                    value={_.value}
                    base={_.base} evolution={_.percent - last.percent}
                    {...snapShotDefaultPieProps}
                    sx={{mb: 0}}
                  />}
                </Lazy>
              </SlidePanel>

              <SlidePanel sx={{flex: 1}}>
                <Lazy deps={[data, computed.lastMonth]} fn={d => ChartHelperOld.percentage({
                  value: _ => _.are_there_gaps_in_meeting_your_basic_needs === 'yes_somewhat' || _.are_there_gaps_in_meeting_your_basic_needs === 'yes_a_lot',
                  data: d,
                })}>
                  {(_, last) => <ChartPieWidget
                    title={m.hhWithGapMeetingBasicNeeds}
                    value={_.value}
                    base={_.base}
                    evolution={_.percent - last.percent}
                    {...snapShotDefaultPieProps}
                    sx={{mb: 0}}
                  />}
                </Lazy>
              </SlidePanel>
            </Div>

            {/* <SlidePanel>
              <SlidePanelTitle>{m.monthlyIncomePerHH}</SlidePanelTitle>
              <Lazy deps={[data]} fn={() => {
                const income = chain(ChartHelperOld.single({
                  filterValue: ['no_income', 'unable_unwilling_to_answer'],
                  data: data.map(_ => _.what_is_the_average_month_income_per_household).compact(),
                }))
                  .map(ChartHelperOld.setLabel(Protection_hhs2.options.what_is_the_average_month_income_per_household))
                  .map(ChartHelperOld.sortBy.custom(Object.keys(Protection_hhs2.options.what_is_the_average_month_income_per_household)))
                  .get()

                const hhSize = ChartHelperOld.sumByCategory({
                  data,
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
                {res => <ChartBar data={res.income} descs={Obj.mapValues(res.hhSize, _ => m.protHHSnapshot.avgHhSize(_.value / (_.base ?? 1)))}/>}
              </Lazy>
            </SlidePanel> */}
            <SlidePanel title={m.copyingMechanisms}>
              <ChartBarMultipleBy
                data={data}
                by={_ => _.what_are_the_strategies_that_your_household_uses_to_cope_with_these_challenges}
                label={{
                  ...Protection_hhs2.options.what_are_the_strategies_that_your_household_uses_to_cope_with_these_challenges,
                  reducing_consumption_of_food: m.protHHS2.reducing_consumption_of_food,
                }}
                filterValue={['unable_unwilling_to_answer']}
              />
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <SlidePanelTitle>{m.protHHS2.mainSourceOfIncome}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={_ => _.what_are_the_main_sources_of_income_of_your_household}
                label={Protection_hhs2.options.what_are_the_main_sources_of_income_of_your_household}
                filterValue={['unable_unwilling_to_answer']}
                limit={4}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.protHHS2.unemploymentFactors}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={_ => _.what_are_the_reasons_for_being_out_of_work}
                label={Protection_hhs2.options.what_are_the_reasons_for_being_out_of_work}
                filterValue={['unable_unwilling_to_answer']}
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}