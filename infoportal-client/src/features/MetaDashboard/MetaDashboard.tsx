import {useFetcher} from '@/shared/hook/useFetcher'
import {useAppSettings} from '@/core/context/ConfigContext'
import React, {useEffect} from 'react'
import {KoboIndex, KoboUnified, OblastIndex} from '@infoportal-common'
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

export const MetaDashboard = () => {
  const {api} = useAppSettings()
  const fetcherKoboUnified = useFetcher(api.koboUnified.search)
  const data = map(fetcherKoboUnified.get, _ => seq(_.data))
  useEffect(() => {
    fetcherKoboUnified.fetch()
  }, [])
  if (!data) return <></>
  return (
    <Layout>
      <_MetaDashboard data={data} loading={fetcherKoboUnified.loading}/>
    </Layout>
  )
}

export const _MetaDashboard = ({
  data,
  loading,
}: {
  loading?: boolean
  data: Seq<KoboUnified>
}) => {
  const {m, formatLargeNumber} = useI18n()
  const ctx = useMetaDashboardData(data)
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
          <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
            {formatLargeNumber(ctx.filteredData.length)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
            {formatLargeNumber(ctx.filteredPersons.length)}
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
          </Div>
          <Div column>
            <SlidePanel>
              <ChartLineBy getX={_ => format(_.date, 'yyyy-MM')} getY={_ => 1} label={m.submissions} data={data}/>
            </SlidePanel>
            <SlidePanel title={m.form}><ChartBarSingleBy data={ctx.filteredData} by={_ => KoboIndex.searchById(_.formId)?.translation ?? _.formId}/></SlidePanel>
            <SlidePanel title={m.program}><ChartBarMultipleByKey data={ctx.filteredData} property="activity"/></SlidePanel>
            <SlidePanel title={m.project}><ChartBarMultipleByKey data={ctx.filteredData} property="project"/></SlidePanel>
          </Div>
        </Div>
      </Div>
    </Page>
  )
}