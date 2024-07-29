import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'
import React, {useEffect, useMemo, useState} from 'react'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {OblastIndex, Period, PeriodHelper, Protection_coc} from '@infoportal-common'
import {fnSwitch, Obj, seq} from '@alexandreannic/ts-utils'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody, PanelTitle} from '@/shared/Panel'
import {Divider, Grid, useTheme} from '@mui/material'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {snapshotAlternateColor} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {Legend} from 'recharts'
import {commonLegendProps} from '@/shared/charts/ChartBarStacked'
import {ChartPie} from '@/shared/charts/ChartPie'
import {useI18n} from '@/core/i18n'
import {ChartLineByDate} from '@/shared/charts/ChartLineByDate'
import {PanelWBody} from '@/shared/Panel/PanelWBody'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {appConfig} from '@/conf/AppConfig'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'

export const ProtectionDashboardPsea = () => {
  const {api, conf} = useAppSettings()
  const t = useTheme()
  const {m} = useI18n()

  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const [period, setPeriod] = useState<Partial<Period>>({})

  const fetcherCoc = useFetcher(api.kobo.typedAnswers.search.protection_coc)
  useEffect(() => {
    fetcherCoc.fetch()
  }, [])

  const filterShape = useMemo(() => DataFilter.makeShape<InferTypedAnswer<'protection_coc'>>({
    office: {
      icon: conf.icons.oblast,
      getValue: _ => _.office_staff_trained,
      getOptions: () => Obj.entries(Protection_coc.options.office_staff_trained).map(([k,v]) => DataFilter.buildOption(k ,v)),
      label: m.office,
    },
    modality: {
      icon: 'desktop_windows',
      getValue: _ => _.modality_training,
      getOptions: () => Obj.entries(Protection_coc.options.modality_training).map(([k,v]) => DataFilter.buildOption(k ,v)),
      label: m.modality,
    },
    category: {
      icon: appConfig.icons.program,
      getValue: _ => _.training_topic,
      getOptions: () => Obj.entries(Protection_coc.options.training_topic).map(([k,v]) => DataFilter.buildOption(k ,v)),
      label: m.category,
    },
    duration: {
      icon: 'schedule',
      getValue: _ => _.duration_training,
      getOptions: () => Obj.entries(Protection_coc.options.duration_training).map(([k,v]) => DataFilter.buildOption(k ,v)),
      label: m.duration,
    },
  }), [m])

  const data = seq(fetcherCoc.get?.data ?? [])
  const dataFiltered = useMemo(() => {
    return DataFilter.filterData(data, filterShape, optionFilter).filter(_ => PeriodHelper.isDateIn(period, _.date_training))
  }, [data, filterShape, optionFilter, period])
  const participants = useMemo(() => dataFiltered.flatMap(_ => _.training_participants ?? []), [data])

  return (
    <Page loading={fetcherCoc.loading}>
      <DataFilterLayout
        shapes={filterShape}
        filters={optionFilter}
        onClear={() => {
          setOptionFilters({})
          setPeriod({})
        }}
        setFilters={setOptionFilters}
        before={
          <PeriodPicker
            sx={{marginTop: '-6px'}}
            value={[period.start, period.end]}
            onChange={([start, end]) => {
              setPeriod(prev => ({...prev, start: start ?? undefined, end: end ?? undefined}))
            }}
            label={[m.start, m.endIncluded]}
            max={new Date()}
          />
        }
      />
      <Grid container sx={{mb: 2, alignItems: 'stretch'}} columnSpacing={2}>
        <Grid item xs={6} md={3}>
          <SlideWidget sx={{flex: 1}} icon="storage" title={m._protection.trainings}>
            {dataFiltered.length}
          </SlideWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <SlideWidget sx={{flex: 1}} icon="person" title={m._protection.participants}>
            {participants.length}
          </SlideWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <SlideWidget sx={{flex: 1}} icon="home" title={m._protection.avgParticipants}>
            {(participants.length / dataFiltered.length).toFixed(1)}
          </SlideWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <Panel sx={{height: '100%', mb: 0, display: 'flex', alignItems: 'center', pl: 2}}>
            <ChartPieWidgetBy title="# Women" data={participants} filter={_ => _.staff_gender === 'female'}/>
          </Panel>
        </Grid>
      </Grid>
      <Div>
        <Div column>
          <PanelWBody title={m._protection.training}>
            <ChartLineByDate curves={{[m.date]: _ => _.date_training}} data={dataFiltered} height={188}/>
          </PanelWBody>
        </Div>
        <Div column sx={{maxWidth: 260}}>
          <Panel title={m.modality}>
            <ChartPie
              outerRadius={80}
              height={220}
              sx={{my: 3, margin: 'auto'}}
              width={260}
              m={{
                inperson: m.inPerson,
                online: m.online,
              }}
              data={{
                inperson: dataFiltered.filter(_ => _.modality_training === 'inperson').length,
                online: dataFiltered.filter(_ => _.modality_training === 'online').length,
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
      <Div>
        <Div column>
          <PanelWBody>
            <MapSvgByOblast
              data={dataFiltered}
              sx={{mb: 2}}
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
            <ChartBarSingleBy
              data={dataFiltered}
              by={_ => _.office_staff_trained}
              label={Protection_coc.options.office_staff_trained}
            />
          </PanelWBody>
        </Div>
        <Div column>
          <PanelWBody title={m.category}>
            <ChartBarSingleBy data={dataFiltered} by={_ => _.training_topic} label={Protection_coc.options.training_topic}/>
          </PanelWBody>
          <PanelWBody title={m.duration}>
            <ChartBarSingleBy data={dataFiltered} by={_ => _.duration_training} label={Protection_coc.options.duration_training}/>
          </PanelWBody>
          <Panel>
            <PanelBody>
              <PanelTitle>{m._protection.participantsByLevel}</PanelTitle>
              <ChartBarSingleBy
                data={participants}
                by={_ => {
                  const l = _.staff_position?.toLowerCase() ?? ''
                  if (['assistant', 'assistance'].find(_ => l.includes(_))) return 'Assistant'
                  if (['team leader', 'team lead', 'tl'].find(_ => l.includes(_))) return 'Team Leader'
                  if (['officer'].find(_ => l.includes(_))) return 'Officer'
                  if (['manager'].find(_ => l.includes(_))) return 'Manager'
                  if (['spesialist', 'specialist'].find(_ => l.includes(_))) return 'Specialist'
                  if (['coordinator', 'coordination'].find(_ => l.includes(_))) return 'Coordinator'
                  return m.notSpecified
                }}
                label={Protection_coc.options.duration_training}
              />
            </PanelBody>
            <Divider/>
            <PanelBody>
              <PanelTitle>{m._protection.participantsBySector}</PanelTitle>
              <ChartBarSingleBy
                data={participants}
                limit={8}
                by={_ => {
                  const l = _.staff_position?.toLowerCase() ?? ''
                  if (['shelter', 'cash and voucher', 'mpca', 'nfi', 'ecrec', 'economic recovery'].find(_ => l.includes(_))) return 'Shelter/Basic Needs/EcRec'
                  if (['case management', 'lawyer', 'protection', 'pss', 'gbv', 'legal', 'gender based violence'].find(_ => l.includes(_))) return 'Protection'
                  if (['im specialist', 'emergancy', 'eore', 'victim assistance', 'va ', 'nts', 'hdp', 'demining', 'hma', 'im gis'].find(_ => l.includes(_))) return 'HDP'
                  if (['driver', 'fleet'].find(_ => l.includes(_))) return 'Fleet'
                  if (['safety'].find(_ => l.includes(_))) return 'Safety'
                  if (['finance', 'accountant'].find(_ => l.includes(_))) return 'Finance'
                  if (['meal', 'monitoring, evaluation, accountability and learning', 'cfm', 'information management'].find(_ => l.includes(_))) return 'MEAL/IM'
                  if (['supply', 'supply chain'].find(_ => l.includes(_))) return 'Supply Chain'
                  if (['hr', 'recruitment'].find(_ => l.includes(_))) return 'HR'
                  if (['partnership'].find(_ => l.includes(_))) return 'Partnership'
                  if (['ecrec', 'economic recovery'].find(_ => l.includes(_))) return 'ECREC'
                  if (['interpretor', 'translator'].find(_ => l.includes(_))) return 'Translator'
                  if (['support'].find(_ => l.includes(_))) return 'Support'
                  if (['communications'].find(_ => l.includes(_))) return 'Support'
                  if (['administration'].find(_ => l.includes(_))) return 'Admin'
                  if (['graphic designer'].find(_ => l.includes(_))) return 'Com'
                  // if (['team leader', 'team lead', 'tl'].find(_ => l.includes(_))) return 'Team Leader'
                  // if (['officer'].find(_ => l.includes(_))) return 'Officer'
                  // if (['manager'].find(_ => l.includes(_))) return 'Manager'
                  // if (['spesialist', 'specialist'].find(_ => l.includes(_))) return 'Specialist'
                  // if (['coordinator'].find(_ => l.includes(_))) return 'Coordinator'
                  return m.other
                }}
              />
            </PanelBody>
          </Panel>
        </Div>
      </Div>
    </Page>
  )
}