import React, {useMemo} from 'react'
import {map, seq} from '@axanc/ts-utils'

import {Meal_winterizationPdm} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {SnapshotHeader} from '@/features/Snapshot/SnapshotHeader'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Div, SlidePanel, PdfSlide, PdfSlideBody, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
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
        subTitle=" Post Assistance Monitoring Results"
        period={ctx.periodFilter}
        logo={SnapshotLogoPDM}
        showDashboardLink={false}
      />
      <PdfSlideBody>
        <Div>
          <Div column sx={{flex: 1}}>
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
            <SlideTxt>
              Findings showed that the majority of households had a preference for cash modality. Of the 182 who
              preferred in kind, 51 were based in Chernihiv. Of those who preferred in-kind, 181/182 of these
              individuals received cash for solid fuel.
            </SlideTxt>
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
          <Div column sx={{flex: 1}}>
            <SlideTxt>
              Of the 204 individuals who were unable to buy solid fuel (9.1%), the majority of individuals reported that
              this was because they had to spend the money on something else, or they used the money to purchase
              electricity or gas. It is important to flag that in Mykolaiv, the sub-Shelter Cluster informed that for
              community cohesion, all individuals would receive the same cash value (distributed as cash for fuel)
              regardless on what the modality was used for.
            </SlideTxt>
            <SlidePanel title={m.mealMonitoringPdm.manage}>
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={(_) => _.manage_solid_fuel}
                label={Meal_winterizationPdm.options.were_informed_timeframe}
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
                label={Meal_winterizationPdm.options.barriers_pwd_join}
              />
            </SlidePanel>
            <SlideTxt>
              Only 9 individuals reported that the assistance had not helped to improve the thermal comfort of their
              home during the winter season.
            </SlideTxt>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}
