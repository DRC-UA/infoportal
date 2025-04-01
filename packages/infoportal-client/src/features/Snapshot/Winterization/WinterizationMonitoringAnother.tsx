import React, {useMemo} from 'react'
import {map, seq} from '@axanc/ts-utils'

import {Meal_winterizationPdm} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {SnapshotHeader} from '@/features/Snapshot/SnapshotHeader'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Div, SlidePanel, PdfSlide, PdfSlideBody} from '@/shared/PdfLayout/PdfSlide'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {SnapshotLogoPDM} from '@/features/Snapshot/Winterization/Winterization'

export const WinterizationMonitoringAnother = () => {
  const ctx = useMealWinterizationContext()
  const {m} = useI18n()

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (record) => seq(record))
  }, [ctx.fetcherAnswers.get])

  return (
    <PdfSlide>
      <SnapshotHeader
        title="Winterization 2024-2025"
        subTitle="PDM"
        period={ctx.periodFilter}
        logo={SnapshotLogoPDM}
        showDashboardLink={false}
      />
      <PdfSlideBody>
        <Div>
          <Div column sx={{flex: 1}}>
            <SlidePanel title={m.mealMonitoringPdm.longCover}>
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={(_) => _.enough_hh_winter_season_cover}
                label={Meal_winterizationPdm.options.time_elapsed_registration}
              />
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                title={m.mealMonitoringPdm.isEnough}
                filter={(_) => _.enough_hh_winter_season === 'yes'}
                data={data ?? seq([])}
                sx={{mb: 1}}
              />
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={(_) => _.enough_hh_winter_season}
                label={Meal_winterizationPdm.options.any_member_household}
              />
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                title={m.mealMonitoringPdm.access}
                filter={(_) => _.access_basic_facilities === 'yes'}
                data={data ?? seq([])}
                sx={{mb: 1}}
              />
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={(_) => _.access_basic_facilities}
                label={Meal_winterizationPdm.options.any_member_household}
              />
            </SlidePanel>
          </Div>
          <Div column sx={{flex: 1}}>
            <SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  title={m.mealMonitoringPdm.inAdvance}
                  filter={(_) => _.informed_amount_cash_receive === 'yes'}
                  data={data ?? seq([])}
                  sx={{mb: 1}}
                />
                <ChartBarSingleBy
                  data={data ?? seq([])}
                  by={(_) => _.informed_amount_cash_receive}
                  label={Meal_winterizationPdm.options.were_informed_timeframe}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy
                  title={m.mealMonitoringPdm.assistanceCorrespond}
                  filter={(_) => _.amount_received_correspond === 'yes'}
                  data={data ?? seq([])}
                  sx={{mb: 1}}
                />
                <ChartBarSingleBy
                  data={data ?? seq([])}
                  by={(_) => _.amount_received_correspond}
                  label={Meal_winterizationPdm.options.were_informed_timeframe}
                />
              </SlidePanel>
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}
