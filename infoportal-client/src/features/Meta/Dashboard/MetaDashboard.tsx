import React from 'react'
import {add, DisplacementStatus, KoboIndex, KoboMetaStatus, OblastIndex} from '@infoportal-common'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {useI18n} from '@/core/i18n'
import {Page} from '@/shared/Page'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarMultipleByKey} from '@/shared/charts/ChartBarMultipleByKey'
import {format} from 'date-fns'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Lazy} from '@/shared/Lazy'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {Box, Grid, useTheme} from '@mui/material'
import {Txt} from 'mui-extension'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {useMetaContext} from '@/features/Meta/MetaContext'
import {Panel, PanelBody} from '@/shared/Panel'
import {Obj, seq} from '@alexandreannic/ts-utils'
import {ChartLine} from '@/shared/charts/ChartLine'
import {Map} from '@/shared/maps/Map'
import {PanelWBody} from '@/shared/Panel/PanelWBody'
import {ChartBar} from '@/shared/charts/ChartBar'
import {MetaDashboardActivityPanel} from '@/features/Meta/Dashboard/MetaDashboardActivityPanel'

export const MetaDashboard = () => {
  const t = useTheme()
  const {m, formatLargeNumber} = useI18n()
  const [showProjectsBy, setShowProjectsBy] = usePersistentState<'donor' | 'project'>('donor', {storageKey: 'meta-dashboard-showProject'})
  const {data: ctx, fetcher} = useMetaContext()
  return (
      <Page width="lg" loading={fetcher.loading}>
        <Grid container sx={{mb: 2}} columnSpacing={2}>
          <Grid item xs={6} md={4} lg={2}>
            <SlideWidget sx={{flex: 1}} icon="electrical_services" title={m._meta.pluggedKobo}>
              <Lazy deps={[ctx.filteredData]} fn={() => {
                return ctx.filteredData.distinct(_ => _.formId).length
              }}>
                {_ => formatLargeNumber(_)}
              </Lazy>
            </SlideWidget>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SlideWidget sx={{flex: 1}} icon="storage" title={m.submissions}>
              {formatLargeNumber(ctx.filteredData.length)}
            </SlideWidget>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SlideWidget sx={{flex: 1}} icon="home" title={m.hhs}>
              {formatLargeNumber(ctx.filteredUniqueData.length)}
            </SlideWidget>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SlideWidget sx={{flex: 1}} icon="group" title={m.hhSize}>
              {(ctx.filteredUniquePersons.length / ctx.filteredUniqueData.length).toFixed(2)}
            </SlideWidget>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
              {formatLargeNumber(ctx.filteredPersons.length)}
            </SlideWidget>
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <SlideWidget sx={{flex: 1}} icon="person" title={m.uniqIndividuals}>
              {formatLargeNumber(ctx.filteredUniquePersons.length)}
            </SlideWidget>
          </Grid>
        </Grid>
        <Div responsive>
          <Div column>
            <Map
                data={ctx.filteredData}
                getSettlement={_ => _.settlement}
                getOblast={_ => OblastIndex.byName(_.oblast).iso}
            />
            <SlidePanel title={m.ageGroup}>
              <AgeGroupTable tableId="meta-dashboard" persons={ctx.filteredPersons} enableDisplacementStatusFilter enablePwdFilter/>
            </SlidePanel>
            <Panel title={m.displacementStatus}>
              <PanelBody>
                <ChartBarSingleBy
                    data={ctx.filteredPersons}
                    by={_ => _.displacement}
                    label={DisplacementStatus}
                />
              </PanelBody>
            </Panel>
            <SlidePanel title={m.form}>
              <ChartBarSingleBy data={ctx.filteredData} by={_ => KoboIndex.searchById(_.formId)?.translation ?? _.formId}/>
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <Lazy deps={[ctx.filteredData]} fn={() => {
                const group = ctx.filteredData.groupByAndApply(_ => _.status ?? 'Blank', _ => _.length)
                return {
                  group,
                  total: seq(Obj.values(group)).sum(),
                }
              }}>
                {_ => (
                    <Box>
                      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Div responsive>
                          <Div>
                            <ChartPieWidget
                                dense sx={{flex: 1}} color={t.palette.success.main}
                                title={<Txt size="small">{m.committed}</Txt>}
                                value={_.group.Committed ?? 0} base={_.total}
                            />
                            <ChartPieWidget
                                dense sx={{flex: 1}} color={t.palette.warning.main}
                                title={<Txt size="small">{m.pending}</Txt>}
                                value={_.group.Pending ?? 0} base={_.total}
                            />
                          </Div>
                          <Div>
                            <ChartPieWidget
                                dense sx={{flex: 1}} color={t.palette.error.main}
                                title={<Txt size="small">{m.rejected}</Txt>}
                                value={_.group.Rejected ?? 0} base={_.total}
                            />
                            <ChartPieWidget
                                dense sx={{flex: 1}} color={t.palette.info.main}
                                title={<Txt size="small">{m.blank}</Txt>}
                                value={_.group.Blank ?? 0} base={_.total}
                            />
                          </Div>
                        </Div>
                      </Box>
                    </Box>
                )}
              </Lazy>
            </SlidePanel>
            <SlidePanel>
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
                    .map(([k, v]) => ({name: k, [m.submissionTime]: v.count, [m.committed]: v.committed}))
              }}>
                {_ => (
                    <ChartLine
                        hideYTicks
                        height={200}
                        data={_ as any}
                        colors={() => [t.palette.primary.main, t.palette.success.main]}
                        hideLabelToggle
                    />
                )}
              </Lazy>
            </SlidePanel>
            <SlidePanel>
              <ScRadioGroup value={showProjectsBy} onChange={setShowProjectsBy} inline dense>
                <ScRadioGroupItem hideRadio value="donoor" title={m.donor}/>
                <ScRadioGroupItem hideRadio value="project" title={m.project}/>
              </ScRadioGroup>
              {showProjectsBy === 'project' ? (
                  <ChartBarMultipleByKey data={ctx.filteredData} property="project"/>
              ) : (
                  <ChartBarMultipleByKey data={ctx.filteredData} property="donor"/>
              )}
            </SlidePanel>
            <SlidePanel title={m.program}><ChartBarSingleBy data={ctx.filteredData} by={_ => _.activity}/></SlidePanel>
            <Lazy deps={[ctx.filteredData]} fn={() => {
              const d = ctx.filteredData.map(_ => _.tags).compact()
              const total = d.sum(_ => {
                return add(
                    _.HKF,
                    _.NFKF_KS,
                    _.FoldingBed,
                    _.FKS,
                    _.CollectiveCenterKits,
                    _.BK,
                    _.WKB,
                    _.HKMV,
                    _.ESK,
                )
              })
              return {
                total,
                data: new Obj({
                  [m.nfi_.HKF]: {desc: 'HKF', value: d.sum(_ => _.HKF ?? 0)},
                  [m.nfi_.NFKF_KS]: {desc: 'NFKF_KS', value: d.sum(_ => _.NFKF_KS ?? 0)},
                  [m.nfi_.FoldingBed]: {desc: 'FoldingBed', value: d.sum(_ => _.FoldingBed ?? 0)},
                  [m.nfi_.FKS]: {desc: 'FKS', value: d.sum(_ => _.FKS ?? 0)},
                  [m.nfi_.CollectiveCenterKits]: {desc: 'CollectiveCenterKits', value: d.sum(_ => _.CollectiveCenterKits ?? 0)},
                  [m.nfi_.BK]: {desc: 'BK', value: d.sum(_ => _.BK ?? 0)},
                  [m.nfi_.WKB]: {desc: 'WKB', value: d.sum(_ => _.WKB ?? 0)},
                  [m.nfi_.HKMV]: {desc: 'HKMV', value: d.sum(_ => _.HKMV ?? 0)},
                  [m.nfi_.ESK]: {desc: 'ESK', value: d.sum(_ => _.ESK ?? 0)},
                }).sort(([, a], [, b]) => b.value - a.value).get()
              }
            }}>
              {_ => (
                  <PanelWBody title={`Most distributed NFIs (${formatLargeNumber(_.total)} kits)`}>
                    <ChartBar data={_.data}/>
                  </PanelWBody>
              )}
            </Lazy>
            <MetaDashboardActivityPanel/>
          </Div>
        </Div>
      </Page>
  )
}