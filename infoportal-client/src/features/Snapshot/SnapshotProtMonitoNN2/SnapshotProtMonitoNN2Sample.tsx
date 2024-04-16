import React from 'react'
import {Box, useTheme} from '@mui/material'
import {useSnapshotProtMonitoringContext} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlidePanel, SlidePanelTitle, SlideTxt, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {DRCLogo} from '@/shared/logo/logo'
import {ChartBarStacker, commonLegendProps} from '@/shared/charts/ChartBarStacked'
import {UkraineMap} from '@/shared/UkraineMap/UkraineMap'
import {PanelTitle} from '@/shared/Panel'
import {Legend} from 'recharts'
import {ChartPie} from '@/shared/charts/ChartPie'
import {snapshotAlternateColor} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {SnapshotHeader} from '@/features/Snapshot/SnapshotHeader'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Person, Protection_hhs2, Protection_hhs3} from '@infoportal-common'

export const SnapshotProtMonitoNN2Sample = () => {
  const theme = useTheme()
  const {data, computed, period} = useSnapshotProtMonitoringContext()
  const {formatLargeNumber, m} = useI18n()
  return (
    <PdfSlide>
      <SnapshotHeader subTitle="Mykolaiv oblast" period={period} logo={<DRCLogo/>}/>
      <PdfSlideBody>
        <Div>
          <Div column sx={{flex: 3.6}}>
            <SlideTxt>
              This snapshot summarizes the findings of protection monitoring (PM) implemented through household surveys in Mykolaiv Oblast between February and March 2024.
              DRC protection monitoring targeted internally displaced persons (IDPs) and people directly exposed to and affected by the current armed conflict in order to
              understand the protection needs facing affected populations; informing DRC and the protection communities' response.
            </SlideTxt>
            <Box sx={{height: 316, borderRadius: t => t.shape.borderRadius}}>
              <PanelTitle sx={{mb: 3, mt: 1}}>{m.idpOriginOblast}</PanelTitle>
              <UkraineMap data={computed.byOriginOblast}/>
            </Box>
          </Div>

          <Div column sx={{flex: 6}}>
            <Div sx={{flex: 0}}>
              <SlideWidget sx={{flex: 1}} icon="home" title={m.hhs}>
                {formatLargeNumber(data.length)}
              </SlideWidget>
              <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
                {formatLargeNumber(computed.individualsCount)}
              </SlideWidget>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.hhSize}>
                {(computed.individualsCount / data.length).toFixed(1)}
              </SlideWidget>
            </Div>

            <Div>
              <Div column>
                <SlidePanel>
                  <ChartPie
                    outerRadius={60}
                    height={120}
                    width={260}
                    m={{
                      male: m.male,
                      female: m.female,
                      // other: m.other,
                    }}
                    data={{
                      female: computed.byGender.Female,
                      male: computed.byGender.Male,
                    }}
                    colors={{
                      female: theme.palette.primary.main,
                      male: snapshotAlternateColor(theme),
                      // other: theme.palette.divider,
                    }}
                  >
                    <Legend {...commonLegendProps} layout="vertical" verticalAlign="middle" align="right"/>
                  </ChartPie>
                </SlidePanel>
                <SlidePanel>
                  <SlidePanelTitle>{m.protHHS2.hhTypes}</SlidePanelTitle>
                  <ChartBarSingleBy
                    data={data}
                    by={_ => _.what_is_the_type_of_your_household}
                    label={Protection_hhs3.options.what_is_the_type_of_your_household}
                  />
                </SlidePanel>
              </Div>
              <Div column>
                <SlidePanel>
                  <SlidePanelTitle>{m.ageGroup}</SlidePanelTitle>
                  <ChartBarStacker data={computed.ageGroup(Person.ageGroup['DRC'], true)} height={250} colors={t => [
                    snapshotAlternateColor(t),
                    t.palette.primary.main,
                  ]}/>
                </SlidePanel>
                <SlidePanel>
                  <SlidePanelTitle>{m.displacementStatus}</SlidePanelTitle>
                  <ChartBarSingleBy
                    data={data}
                    by={_ => _.do_you_identify_as_any_of_the_following}
                    label={Protection_hhs2.options.do_you_identify_as_any_of_the_following}
                  />
                </SlidePanel>
              </Div>
            </Div>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}