import React, {useEffect, useMemo} from 'react'
import {drcDonorTranlate, KoboMetaStatus, OblastIndex, Period, Person, WgDisability} from '@infoportal-common'
import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import {Div, PdfSlide, PdfSlideBody, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {format, subDays} from 'date-fns'
import {Box, CircularProgress, Icon, useTheme} from '@mui/material'
import {Txt} from 'mui-extension'
import {periodToString} from '@/features/Snapshot/SnapshotPeriod'
import {DRCLogo} from '@/shared/logo/logo'
import {useMetaContext} from '@/features/Meta/MetaContext'
import {useI18n} from '@/core/i18n'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Lazy} from '@/shared/Lazy'
import {Obj} from '@alexandreannic/ts-utils'
import {ChartLine} from '@/shared/charts/ChartLine'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {PanelWBody} from '@/shared/Panel/PanelWBody'
import {snapshotColors} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarStacker} from '@/shared/charts/ChartBarStacked'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'

export const MetaSnapshotHeader = ({period}: {period: Period}) => {
  const asString = useMemo(() => periodToString(period), [period])
  return (
    <Box sx={{
      px: 2,
      py: 1,
      borderBottom: t => `1px solid ${t.palette.divider}`,
      mb: 0,
      display: 'flex',
      alignItems: 'center'
    }}>
      <Box>
        <Txt bold sx={{fontSize: '1.6em', fontWeight: '700'}} color="primary">
          Activities Snapshot
          <Box sx={{display: 'inline', fontWeight: 'lighter'}}> - Ukraine</Box>
        </Txt>
        <Txt color="hint" sx={{fontSize: '1.1em', display: 'flex', alignItems: 'center'}}>
          <Icon fontSize="small" sx={{mr: 1}}>date_range</Icon> {asString.start}
          {asString.end !== asString.start && (
            <>&nbsp;-&nbsp;{asString.end}</>
          )}
        </Txt>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
        <DRCLogo/>
      </Box>
    </Box>
  )
}

export const MetaSnapshotVert = () => {
  const {data: ctx, fetcher} = useMetaContext()
  const t = useTheme()
  const {m, formatLargeNumber} = useI18n()
  useEffect(() => {
    ctx.setPeriod({
      start: new Date(2024, 0, 1),
      end: subDays(new Date(2024, 7, 1), 1),
    })
  }, [])
  if (!ctx.period.start || !ctx.period.end) return 'Set a period'
  return (
    <Pdf>
      {fetcher.loading && (
        <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}}/>
      )}
      <PdfSlide format="vertical">
        <MetaSnapshotHeader period={ctx.period as Period}/>
        <PdfSlideBody>
          <Div column>
            <Div column>
              <Div column>
                <Div>
                  <SlideWidget sx={{flex: 1}} icon="home" title={m.hhs}>
                    {formatLargeNumber(ctx.filteredUniqueData.length)}
                  </SlideWidget>
                  <SlideWidget sx={{flex: 1}} icon="group" title={m.hhSize}>
                    {(ctx.filteredUniquePersons.length / ctx.filteredUniqueData.length).toFixed(2)}
                  </SlideWidget>
                  <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
                    {formatLargeNumber(ctx.filteredPersons.length)}
                  </SlideWidget>
                  <SlideWidget sx={{flex: 1}} icon="person_search" title={m.uniqIndividuals}>
                    {formatLargeNumber(ctx.filteredUniquePersons.length)}
                  </SlideWidget>
                </Div>
              </Div>
            </Div>
            <Div>
              <Div column>
                <PanelWBody title="Registrations by Oblast">
                  <MapSvgByOblast
                    sx={{mx: 1.5, mt: -1, mb: -1.5}}
                    getOblast={_ => OblastIndex.byName(_.oblast).iso}
                    data={ctx.filteredData}
                    fillBaseOn="value"
                  />
                </PanelWBody>
                <PanelWBody title={m.ageGroup}>
                  <Lazy deps={[ctx.filteredData]} fn={(d) => {
                    const gb = Person.groupByGenderAndGroup(Person.ageGroup.ECHO, true)(d?.flatMap(_ => _.persons ?? [])!)
                    return new Obj(gb).entries().map(([k, v]) => ({key: k, ...v}))
                  }}>
                    {_ => <ChartBarStacker data={_} height={156} sx={{mb: -1, mr: -2}}/>}
                  </Lazy>
                </PanelWBody>
                <Div>
                  <Div column>
                    <PanelWBody sx={{mb: 0}}>
                      <ChartPieWidgetBy
                        dense
                        title="Females"
                        data={ctx.filteredUniquePersons}
                        filter={_ => _.gender === Person.Gender.Female}
                      />
                    </PanelWBody>
                  </Div>
                  <Div column>
                    <PanelWBody sx={{mb: 0}}>
                      <ChartPieWidgetBy
                        dense
                        title={<span style={{textTransform: 'none'}}>PwDs</span>}
                        data={ctx.filteredUniquePersons}
                        filter={_ => (_.disability ?? []).length > 0}
                      />
                    </PanelWBody>
                  </Div>
                </Div>
                <PanelWBody title="Main difficulties">
                  <ChartBarMultipleBy
                    data={ctx.filteredPersons}
                    filterValue={[WgDisability.None]}
                    by={_ => _.disability}
                    limit={3}
                    label={m.disability_}
                  />
                </PanelWBody>
                <PanelWBody title={m.displacementStatus}>
                  <ChartBarSingleBy
                    data={ctx.filteredPersons}
                    by={_ => _.displacement}
                    label={{
                      Idp: 'IDP',
                      Returnee: 'Returnee',
                      Refugee: 'Refugee',
                      NonDisplaced: 'Non-displaced',
                    }}
                  />
                </PanelWBody>
              </Div>
              <Div column>
                <PanelWBody>
                  <Lazy deps={[ctx.filteredData]} fn={() => {
                    const gb = ctx.filteredData.groupBy(d => format(d.date, 'yyyy-MM'))
                    const gbByCommittedDate = ctx.filteredData.groupBy(d => d.lastStatusUpdate ? format(d.lastStatusUpdate!, 'yyyy-MM') : '')
                    return new Obj(gb)
                      .map((k, v) => [k, {
                        count: v.length,
                        committed: gbByCommittedDate[k]?.filter(_ => _.status === KoboMetaStatus.Committed).length
                      }])
                      .sort(([ka], [kb]) => ka.localeCompare(kb))
                      .entries()
                      .map(([k, v]) => ({'Assistance': v.committed, name: k, 'Registration': v.count,}))
                  }}>
                    {_ => (
                      <ChartLine
                        height={200}
                        sx={{mb: -1.5}}
                        hideYTicks={true}
                        data={_ as any}
                        colors={() => snapshotColors(t)}
                        hideLabelToggle
                      />
                    )}
                  </Lazy>
                </PanelWBody>
                <PanelWBody title="Programs">
                  <ChartBarSingleBy
                    data={ctx.filteredData}
                    by={_ => _.sector}
                  />
                </PanelWBody>
                <PanelWBody title="Donors">
                  <ChartBarMultipleBy
                    data={ctx.filteredData}
                    label={drcDonorTranlate}
                    by={_ => _.donor ?? []}
                  />
                </PanelWBody>
              </Div>
            </Div>
          </Div>
        </PdfSlideBody>
      </PdfSlide>
    </Pdf>
  )
}