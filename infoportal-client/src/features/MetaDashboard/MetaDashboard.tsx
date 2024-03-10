import {useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import React, {useEffect} from 'react'
import {IKoboMeta, KoboIndex, OblastIndex} from '@infoportal-common'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {map, Seq, seq} from '@alexandreannic/ts-utils'
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
  const {m, formatLargeNumber} = useI18n()
  const ctx = useMetaDashboardData(data)
  return (
    <Page width="lg" loading={loading}>
      {JSON.stringify(loading)}
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
              <ChartLineBy getX={_ => format(_.date, 'yyyy-MM')} getY={_ => 1} label={m.submissions} data={data}/>
            </SlidePanel>
            <SlidePanel title={m.program}><ChartBarSingleBy data={ctx.filteredData} by={_ => _.activity}/></SlidePanel>
            <SlidePanel title={m.project}><ChartBarMultipleByKey data={ctx.filteredData} property="project"/></SlidePanel>
            <SlidePanel title={m.status}><ChartBarSingleBy data={ctx.filteredData} by={_ => _.status}/></SlidePanel>
          </Div>
        </Div>
      </Div>
    </Page>
  )
}