import React, {useMemo} from 'react'
import {map, seq} from '@axanc/ts-utils'

import {Meal_winterizationPdm} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {SnapshotHeader} from '@/features/Snapshot/SnapshotHeader'
import {Div, SlidePanel, PdfSlide, PdfSlideBody, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {SnapshotLogoPDM} from '@/features/Snapshot/Winterization/Winterization'

export const WinterizationFeedback = () => {
  const ctx = useMealWinterizationContext()
  const {m} = useI18n()

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (record) => seq(record))
  }, [ctx.fetcherAnswers.get])

  return (
    <PdfSlide>
      <SnapshotHeader
        title="Winterization 2024-2025"
        subTitle="Additional Feedback"
        period={ctx.periodFilter}
        logo={SnapshotLogoPDM}
        showDashboardLink={false}
      />
      <PdfSlideBody>
        <Div>
          <Div column sx={{flex: 1}}>
            <SlideTxt>
              At the end of every DRC post-assistance monitoring, we ask households what they perceive their primary
              needs to be, even after receiving assistance.
            </SlideTxt>
            <SlidePanel title={m.mealMonitoringPdm.priorityNeeds}>
              <ChartBarMultipleBy
                data={data ?? seq([])}
                by={(_) => _.needs_community_currently}
                label={Meal_winterizationPdm.options.needs_community_currently}
                limit={9}
              />
            </SlidePanel>
            <SlideTxt>
              Whilst utilities was most commonly reported as the second highest priority need (61.2%) and heating (fuel)
              as the fourth highest (51%) it must be acknowledged that healthcare and medication (71%) and food (53%)
              are highly reported needs, and could be a contributing factor as to why future winterisation assistance as
              a cash modality may be used to reach households other basic needs.
            </SlideTxt>
          </Div>
          <Div column sx={{flex: 1}}>
            <SlidePanel title={m.mealMonitoringPdm.feedback}>
              <ChartPieWidgetBy
                dense
                title={m.mealMonitoringPdm.satisfiedAssistance}
                data={data ?? seq([])}
                filter={(_) => _.satisfied_assistance_provided === 'rcyc' || _.satisfied_assistance_provided === 'rcnt'}
                filterBase={(_) =>
                  _.satisfied_assistance_provided === 'rcyc' ||
                  _.satisfied_assistance_provided === 'rcnr' ||
                  _.satisfied_assistance_provided === 'rcmy' ||
                  _.satisfied_assistance_provided === 'rcdk' ||
                  _.satisfied_assistance_provided === 'rcna' ||
                  _.satisfied_assistance_provided === 'rcnt'
                }
              />
              <ChartPieWidgetBy
                dense
                title={m.mealMonitoringPdm.treated}
                data={data ?? seq([])}
                filter={(_) => _.feel_treated_respect === 'rcyc' || _.feel_treated_respect === 'rcnt'}
                filterBase={(_) =>
                  _.feel_treated_respect === 'rcyc' ||
                  _.feel_treated_respect === 'rcnr' ||
                  _.feel_treated_respect === 'rcmy' ||
                  _.feel_treated_respect === 'rcdk' ||
                  _.feel_treated_respect === 'rcna' ||
                  _.feel_treated_respect === 'rcnt'
                }
              />
              <ChartPieWidgetBy
                dense
                title={m.mealMonitoringPdm.provideInfo}
                data={data ?? seq([])}
                filter={(_) =>
                  _.organization_provide_information === 'yes' || _.organization_provide_information === 'no'
                }
              />
              <ChartPieWidgetBy
                dense
                title={m.mealMonitoringPdm.helpedThermal}
                data={data ?? seq([])}
                filter={(_) =>
                  _.helped_thermal_comfort === 'yes' ||
                  _.helped_thermal_comfort === 'no' ||
                  _.helped_thermal_comfort === 'other'
                }
              />
              <ChartPieWidgetBy
                dense
                title={m.mealMonitoringPdm.satisfiedProcess}
                data={data ?? seq([])}
                filter={(_) => _.satisfied_process === 'ndyl' || _.satisfied_process === 'ndna'}
              />
              <ChartPieWidgetBy
                dense
                title={m.mealMonitoringPdm.feelSafe}
                data={data ?? seq([])}
                filter={(_) => _.feel_safe_travelling === 'rcyc' || _.feel_safe_travelling === 'rcnt'}
                filterBase={(_) =>
                  _.feel_safe_travelling === 'rcyc' ||
                  _.feel_safe_travelling === 'rcnr' ||
                  _.feel_safe_travelling === 'rcmy' ||
                  _.feel_safe_travelling === 'rcdk' ||
                  _.feel_safe_travelling === 'rcna' ||
                  _.feel_safe_travelling === 'rcnt'
                }
              />
              <ChartPieWidgetBy
                dense
                title={m.mealMonitoringPdm.problems}
                data={data ?? seq([])}
                filter={(_) => _.experience_problems === 'yes'}
              />
            </SlidePanel>
            <SlidePanel title={m.mealMonitoringPdm.betterInform}>
              <ChartBarMultipleBy
                data={data ?? seq([])}
                by={(_) => _.better_inform_distribution}
                label={Meal_winterizationPdm.options.better_inform_distribution}
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}
