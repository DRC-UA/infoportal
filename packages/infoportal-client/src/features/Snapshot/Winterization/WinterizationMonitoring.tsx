import React, {useMemo} from 'react'
import {map, seq} from '@axanc/ts-utils'

import {Meal_winterizationPdm} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {SnapshotHeader} from '@/features/Snapshot/SnapshotHeader'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Div, SlidePanel, PdfSlide, PdfSlideBody} from '@/shared/PdfLayout/PdfSlide'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {SnapshotLogoPDM} from '@/features/Snapshot/Winterization/Winterization'

export const WinterizationMonitoring = () => {
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
            <SlidePanel title={m.mealMonitoringPdm.pdmType}>
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={(_) => _.pdmtype}
                label={Meal_winterizationPdm.options.pdmtype}
              />
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                title={m.mealMonitoringPdm.cashOrKind}
                filter={(_) => _.cash_modality_inkind === 'yes'}
                data={data ?? seq([])}
                sx={{mb: 1}}
              />
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={(_) => _.cash_modality_inkind}
                label={Meal_winterizationPdm.options.cash_modality_inkind}
              />
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                title={m.mealMonitoringPdm.spent}
                filter={(_) => _.spent_cash_assistance_received === 'yes'}
                data={data ?? seq([])}
                sx={{mb: 1}}
              />
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={(_) => _.spent_cash_assistance_received}
                label={Meal_winterizationPdm.options.amount_cash_received_correspond}
              />
            </SlidePanel>
          </Div>
          <Div column sx={{flex: 1}}>
            <SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.fuelCommon}>
                <ChartBarMultipleBy
                  data={data ?? seq([])}
                  by={(_) => _.type_fuel_most}
                  label={Meal_winterizationPdm.options.type_fuel_most}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.manage}>
                <ChartBarSingleBy
                  data={data ?? seq([])}
                  by={(_) => _.manage_solid_fuel}
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
