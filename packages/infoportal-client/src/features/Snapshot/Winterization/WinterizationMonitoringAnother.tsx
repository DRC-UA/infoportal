import React, {useMemo} from 'react'
import {map, seq} from '@axanc/ts-utils'

import {Meal_winterizationPdm, Protection_gbvSocialProviders} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {SnapshotHeader} from '@/features/Snapshot/SnapshotHeader'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Div, SlidePanel, PdfSlide, PdfSlideBody, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {SnapshotLogoPDM} from '@/features/Snapshot/Winterization/Winterization'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'

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
        subTitle="Post Assistance Monitoring Results"
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
            <SlideTxt>
              Critically, findings showed that the majority of households felt that the assistance was sufficient for
              the winter season, with 86% of beneficiaries reporting it to last them over 5 months, the majority of the
              coldest winter months. In order to triangulate this finding, DRC asked if this was enough in the
              beneficiaries opinion for the house winter season (93%).{' '}
            </SlideTxt>
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
            <SlideTxt>
              Furthermore, 83% of households reported access to basic facilities, however the 17% without basic access
              need to be considered for additional support in the coming winter season, as a cash modality may need to
              be tailored to suit their needs.
            </SlideTxt>
          </Div>
          <Div column sx={{flex: 1}}>
            <SlideTxt>
              The majority of individuals reported that seasoned wood was the most common heating fuel in their area.
            </SlideTxt>
            <SlidePanel title={m.mealMonitoringPdm.fuelCommon}>
              <ChartBarMultipleBy
                data={data ?? seq([])}
                by={(_) => _.type_fuel_most}
                label={Meal_winterizationPdm.options.type_fuel_most}
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
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}
