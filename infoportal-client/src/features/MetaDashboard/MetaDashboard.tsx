import {useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import React, {useEffect, useState} from 'react'
import {IKoboMeta, KoboIndex, OblastIndex} from '@infoportal-common'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {map, Obj, Seq, seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {Page} from '@/shared/Page'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {today} from '@/features/Mpca/Dashboard/MpcaDashboard'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {useMetaDashboardData} from '@/features/MetaDashboard/useMetaDashboardData'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {UaMapBy} from '@/features/DrcUaMap/UaMapBy'
import {ChartBarMultipleByKey} from '@/shared/charts/ChartBarMultipleByKey'
import {Layout} from '@/shared/Layout'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {format} from 'date-fns'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {Lazy} from '@/shared/Lazy'
import {ChartHelper} from '@/shared/charts/chartHelper'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {PieChart} from 'recharts'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {Box, RadioGroup, useTheme} from '@mui/material'
import {Txt} from 'mui-extension'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {usePersistentState} from '@/shared/hook/usePersistantState'

export const MetaDashboard = () => {
  const {api} = useAppSettings()
  const fetcherKoboMeta = useFetcher(api.koboMeta.search)
  const data = map(fetcherKoboMeta.get, _ => seq(_.data))
  useEffect(() => {
    fetcherKoboMeta.fetch()
  }, [])
  return (
    <Layout title={appFeaturesIndex.metaDashboard.name} loading={fetcherKoboMeta.loading}>
      {data && (
        <_MetaDashboard data={data} loading={fetcherKoboMeta.loading}/>
      )}
    </Layout>
  )
}

export const _MetaDashboard = ({
  data,
  loading,
}: {
  loading?: boolean
  data: Seq<IKoboMeta>
}) => {
  const t = useTheme()
  const {m, formatLargeNumber} = useI18n()
  const ctx = useMetaDashboardData(data)
  const [showProjectsBy, setShowProjectsBy] = usePersistentState<'donor' | 'project'>('donor', {storageKey: 'meta-dashboard-showProject'})
  return (
    <Page width="lg" loading={loading}>
      <DataFilterLayout
        data={ctx.filteredData}
        filters={ctx.filters}
        shapes={ctx.shape}
        setFilters={ctx.setFilters}
        onClear={() => {
          ctx.setFilters({})
          ctx.setPeriod({})
        }}
        before={
          <>
            <PeriodPicker
              defaultValue={[ctx.period.start, ctx.period.end]}
              onChange={([start, end]) => {
                ctx.setPeriod(prev => ({...prev, start, end}))
              }}
              label={[m.start, m.endIncluded]}
              max={today}
            />
          </>
        }
      />
      <Div column>
        <Div>
          <SlideWidget sx={{flex: 1}} icon="electrical_services" title={m._meta.pluggedKobo}>
            <Lazy deps={[ctx.filteredData]} fn={() => {
              return ctx.filteredData.distinct(_ => _.formId).length
            }}>
              {_ => formatLargeNumber(_)}
            </Lazy>
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
            {formatLargeNumber(ctx.filteredData.length)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
            {formatLargeNumber(ctx.filteredData.flatMap(_ => _.persons ?? []).length)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="person" title={m.uniqIndividuals}>
            <Lazy deps={[ctx.filteredData]} fn={() => {
              const wtTax = ctx.filteredData.filter(_ => !_.taxId)
              const wTax = ctx.filteredData.filter(_ => !!_.taxId).distinct(_ => _.taxId)
              return wtTax.flatMap(_ => _.persons ?? []).length + wTax.flatMap(_ => _.persons ?? []).length
            }}>
              {_ => formatLargeNumber(_)}
            </Lazy>
          </SlideWidget>
        </Div>
        <Div>
          <Div column>
            <SlidePanel title={m.ageGroup}>
              <AgeGroupTable tableId="meta-dashboard" persons={ctx.filteredPersons} enableDisplacementStatusFilter/>
            </SlidePanel>
            <SlidePanel title={m.currentOblast}>
              <UaMapBy sx={{mx: 2}} getOblast={_ => OblastIndex.byName(_.oblast).iso} data={ctx.filteredData} fillBaseOn="value"/>
            </SlidePanel>
            <SlidePanel title={m.form}><ChartBarSingleBy data={ctx.filteredData} by={_ => KoboIndex.searchById(_.formId)?.translation ?? _.formId}/></SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <Lazy deps={[ctx.filteredData]} fn={() => {
                return ChartHelper.single({
                  data: ctx.filteredData.map(_ => _.status ?? 'Blank'),
                  percent: true,
                }).get()
              }}>
                {_ => (
                  <Box>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                      <ChartPieWidget value={_.Committed?.value ?? 0} base={1} color={t.palette.success.main}/>
                      <ChartPieWidget value={_.Pending?.value ?? 0} base={1} color={t.palette.warning.main}/>
                      <ChartPieWidget value={_.Rejected?.value ?? 0} base={1} color={t.palette.error.main}/>
                      <ChartPieWidget value={_.Blank?.value ?? 0} base={1} color={t.palette.info.main}/>
                    </Box>
                    <Box sx={{display: 'flex', mt: 1, justifyContent: 'space-between'}}>
                      <Txt block sx={{flex: 1, textAlign: 'center'}}>{m.committed}</Txt>
                      <Txt block sx={{flex: 1, textAlign: 'center'}}> {m.pending}</Txt>
                      <Txt block sx={{flex: 1, textAlign: 'center'}}> {m.rejected}</Txt>
                      <Txt block sx={{flex: 1, textAlign: 'center'}}>{m.blank}</Txt>
                    </Box>
                  </Box>
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
            <SlidePanel>
              <ChartLineBy getX={_ => format(_.date, 'yyyy-MM')} getY={_ => 1} label={m.submissions} data={data}/>
            </SlidePanel>
            <SlidePanel title={m.program}><ChartBarSingleBy data={ctx.filteredData} by={_ => _.activity}/></SlidePanel>
          </Div>
        </Div>
      </Div>
    </Page>
  )
}