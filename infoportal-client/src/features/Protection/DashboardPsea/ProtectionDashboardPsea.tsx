import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'
import React, {useEffect} from 'react'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {OblastIndex, Protection_coc} from '@infoportal-common'
import {fnSwitch, seq} from '@alexandreannic/ts-utils'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {Box, useTheme} from '@mui/material'
import {Div} from '@/shared/PdfLayout/PdfSlide'
import {snapshotAlternateColor} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {Legend} from 'recharts'
import {commonLegendProps} from '@/shared/charts/ChartBarStacked'
import {ChartPie} from '@/shared/charts/ChartPie'
import {useI18n} from '@/core/i18n'

export const ProtectionDashboardPsea = () => {
  const {api} = useAppSettings()
  const t = useTheme()
  const {m} = useI18n()

  const fetcherCoc = useFetcher(api.kobo.typedAnswers.search.protection_coc)
  useEffect(() => {
    fetcherCoc.fetch()
  }, [])

  const data = seq(fetcherCoc.get?.data ?? [])

  return (
    <Page loading={fetcherCoc.loading}
      // width="lg"
    >
      <Div>
        <Div column>
          <Panel>
            <PanelBody>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <MapSvgByOblast
                  sx={{flex: 3, pr: 2}}
                  data={data}
                  fillBaseOn="value"
                  getOblast={_ => {
                    return OblastIndex.byName(fnSwitch(_.office_staff_trained!, {
                      dnipro: 'Dnipropetrovska',
                      lviv: 'Lvivska',
                      kharkiv: 'Kharkivska',
                      sloviansk: 'Donetska',
                      mykolaiv: 'Mykolaivska',
                      kyiv: 'Kyiv',
                      ivankiv: 'Kyivska',
                      kherson: 'Khersonska',
                      sumy: 'Sumska',
                      chernihiv: 'Chernihivska',
                      ichna: 'Chernihivska',
                    }, () => undefined))!.iso
                  }}
                />
                <Box sx={{flex: 2, maxWidth: 180}}>
                  <ChartBarSingleBy
                    data={data}
                    by={_ => _.office_staff_trained}
                    label={Protection_coc.options.office_staff_trained}
                  />
                </Box>
              </Box>
            </PanelBody>
          </Panel>
        </Div>
        <Div column sx={{maxWidth: 260}}>
          <Panel title="aha">
            <ChartPie
              outerRadius={80}
              height={220}
              sx={{my: 1, margin: 'auto'}}
              width={260}
              m={{
                inperson: m.inPerson,
                online: m.online,
              }}
              data={{
                inperson: data.filter(_ => _.modality_training === 'inperson').length,
                online: data.filter(_ => _.modality_training === 'online').length,
              }}
              colors={{
                inperson: t.palette.primary.main,
                online: snapshotAlternateColor(t),
              }}
            >
              <Legend {...commonLegendProps} layout="horizontal" verticalAlign="bottom" align="center"/>
            </ChartPie>
          </Panel>
        </Div>
      </Div>

      <ChartBarSingleBy data={data} by={_ => _.modality_training} label={Protection_coc.options.modality_training}/>
      <ChartBarSingleBy data={data} by={_ => _.training_topic} label={Protection_coc.options.training_topic}/>
      <ChartBarSingleBy data={data} by={_ => _.duration_training} label={Protection_coc.options.duration_training}/>
    </Page>
  )
}