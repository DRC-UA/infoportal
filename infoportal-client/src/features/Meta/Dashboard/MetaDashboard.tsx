import React from 'react'
import {DisplacementStatus, KoboIndex, KoboMetaStatus, OblastIndex} from '@infoportal-common'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {useI18n} from '@/core/i18n'
import {Page} from '@/shared/Page'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {UaMapBy} from '@/features/DrcUaMap/UaMapBy'
import {ChartBarMultipleByKey} from '@/shared/charts/ChartBarMultipleByKey'
import {format} from 'date-fns'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Lazy} from '@/shared/Lazy'
import {ChartHelper} from '@/shared/charts/chartHelper'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {Box, useTheme} from '@mui/material'
import {Txt} from 'mui-extension'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {useMetaContext} from '@/features/Meta/MetaContext'
import {Panel, PanelBody} from '@/shared/Panel'
import {Obj} from '@alexandreannic/ts-utils'
import {ChartLine} from '@/shared/charts/ChartLine'


export const MetaDashboard = () => {
  const t = useTheme()
  const {m, formatLargeNumber} = useI18n()
  const [showProjectsBy, setShowProjectsBy] = usePersistentState<'donor' | 'project'>('donor', {storageKey: 'meta-dashboard-showProject'})
  const {data: ctx, fetcher} = useMetaContext()
  return (
    <Page width="lg" loading={fetcher.loading}>
      {/*<DataFilterLayout*/}
      {/*  data={ctx.filteredData}*/}
      {/*  filters={ctx.shapeFilters}*/}
      {/*  shapes={ctx.shape}*/}
      {/*  setFilters={ctx.setShapeFilters}*/}
      {/*  onClear={() => {*/}
      {/*    ctx.setShapeFilters({})*/}
      {/*    ctx.setPeriod({})*/}
      {/*  }}*/}
      {/*  before={*/}
      {/*    <>*/}
      {/*      <PeriodPicker*/}
      {/*        defaultValue={[ctx.period.start, ctx.period.end]}*/}
      {/*        onChange={([start, end]) => {*/}
      {/*          ctx.setPeriod(prev => ({...prev, start, end}))*/}
      {/*        }}*/}
      {/*        label={[m.start, m.endIncluded]}*/}
      {/*        max={today}*/}
      {/*      />*/}
      {/*    </>*/}
      {/*  }*/}
      {/*/>*/}
      <Div column>
        <Div>
          <SlideWidget sx={{flex: 1}} icon="electrical_services" title={m._meta.pluggedKobo}>
            <Lazy deps={[ctx.filteredData]} fn={() => {
              return ctx.filteredData.distinct(_ => _.formId).length
            }}>
              {_ => formatLargeNumber(_)}
            </Lazy>
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="storage" title={m.submissions}>
            {formatLargeNumber(ctx.filteredData.length)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="home" title={m.hhs}>
            {formatLargeNumber(ctx.filteredUniqueData.length)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="group" title={m.hhSize}>
            {(ctx.filteredUniquePersons.length / ctx.filteredUniqueData.length).toFixed(2)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
            {formatLargeNumber(ctx.filteredPersons.length)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="person" title={m.uniqIndividuals}>
            {formatLargeNumber(ctx.filteredUniquePersons.length)}
          </SlideWidget>
        </Div>
        <Div>
          <Div column>
            <SlidePanel title={m.ageGroup}>
              <AgeGroupTable tableId="meta-dashboard" persons={ctx.filteredPersons} enableDisplacementStatusFilter/>
            </SlidePanel>
            <SlidePanel title={m.currentOblast}>
              <UaMapBy sx={{mx: 2, maxWidth: 480, margin: 'auto'}} getOblast={_ => OblastIndex.byName(_.oblast).iso} data={ctx.filteredData} fillBaseOn="value"/>
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
                return ChartHelper.single({
                  data: ctx.filteredData.map(_ => _.status ?? KoboMetaStatus.Blank),
                  percent: true,
                }).get()
              }}>
                {_ => (
                  <Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                      <ChartPieWidget dense sx={{flex: 1}} title={<Txt size="small">{m.committed}</Txt>} value={_.Committed?.value ?? 0} base={1} color={t.palette.success.main}/>
                      <ChartPieWidget dense sx={{flex: 1}} title={<Txt size="small">{m.pending}</Txt>} value={_.Pending?.value ?? 0} base={1} color={t.palette.warning.main}/>
                      <ChartPieWidget dense sx={{flex: 1}} title={<Txt size="small">{m.rejected}</Txt>} value={_.Rejected?.value ?? 0} base={1} color={t.palette.error.main}/>
                      <ChartPieWidget dense sx={{flex: 1}} title={<Txt size="small">{m.blank}</Txt>} value={_.Blank?.value ?? 0} base={1} color={t.palette.info.main}/>
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
          </Div>
        </Div>
      </Div>
    </Page>
  )
}