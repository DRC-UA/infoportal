import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'
import React, {useEffect, useMemo, useState} from 'react'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {OblastIndex, Period, PeriodHelper, Protection_coc} from 'infoportal-common'
import {fnSwitch, Obj, seq} from '@axanc/ts-utils'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody, PanelTitle} from '@/shared/Panel'
import {Divider, Grid, Icon, useTheme} from '@mui/material'
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
import {Datatable} from '@/shared/Datatable/Datatable'
import {drcUaStaffs} from '@/features/Protection/DashboardPsea/drcUaStaffs'
import {drcUaStaffsEmailCompleted} from '@/features/Protection/DashboardPsea/drcUaStaffsEmailCompleted'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'

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

  const filterShape = useMemo(
    () =>
      DataFilter.makeShape<InferTypedAnswer<'protection_coc'>>({
        office: {
          icon: conf.icons.oblast,
          getValue: (_) => _.office_staff_trained,
          getOptions: () =>
            Obj.entries(Protection_coc.options.office_staff_trained).map(([k, v]) => DataFilter.buildOption(k, v)),
          label: m.office,
        },
        modality: {
          icon: 'desktop_windows',
          getValue: (_) => _.modality_training,
          getOptions: () =>
            Obj.entries(Protection_coc.options.modality_training).map(([k, v]) => DataFilter.buildOption(k, v)),
          label: m.modality,
        },
        category: {
          icon: appConfig.icons.program,
          getValue: (_) => _.training_topic,
          getOptions: () =>
            Obj.entries(Protection_coc.options.training_topic).map(([k, v]) => DataFilter.buildOption(k, v)),
          label: m.category,
        },
        duration: {
          icon: 'schedule',
          getValue: (_) => _.duration_training,
          getOptions: () =>
            Obj.entries(Protection_coc.options.duration_training).map(([k, v]) => DataFilter.buildOption(k, v)),
          label: m.duration,
        },
      }),
    [m],
  )

  const data = seq(fetcherCoc.get?.data ?? [])
  const dataFiltered = useMemo(() => {
    return DataFilter.filterData(data, filterShape, optionFilter).filter((_) =>
      PeriodHelper.isDateIn(period, _.date_training),
    )
  }, [data, filterShape, optionFilter, period])
  const participants = useMemo(() => dataFiltered.flatMap((_) => _.training_participants ?? []), [data])

  const {listDone, listNotIdentified} = useMemo(() => {
    let listNotIdentified: string[] = []
    const arr = [
      ...drcUaStaffsEmailCompleted,
      ...dataFiltered
        .flatMap((_) =>
          _.training_participants?.map((participants) => {
            if (participants.staff_email) return participants.staff_email
            if (participants.staff_name) {
              let match = drcUaStaffs.find(
                (_) =>
                  _.fullName.replaceAll(/\s/g, '').toLowerCase() ===
                  participants.staff_name?.replaceAll(/\s/g, '').toLowerCase(),
              )?.email
              if (!match) {
                const names = participants.staff_name.split(' ').map((_) => _.toLowerCase())
                match = drcUaStaffs.find((_) => {
                  const sanitizedName = _.fullName.replaceAll(/\s/g, '').toLowerCase()
                  return names.every((_) => sanitizedName.includes(_))
                })?.email
              }
              if (!match) listNotIdentified.push(participants.staff_name)
              return match
            }
          }),
        )
        .filter((_) => _ !== undefined),
    ]
    return {
      listDone: new Set(arr),
      listNotIdentified,
    }
  }, [dataFiltered])

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
            value={[period.start, period.end]}
            onChange={([start, end]) => {
              setPeriod((prev) => ({...prev, start: start ?? undefined, end: end ?? undefined}))
            }}
            label={[m.start, m.endIncluded]}
            max={new Date()}
            fullWidth={false}
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
          <Panel sx={{height: '100%', mb: 0, display: 'flex', alignItems: 'center', pl: 2}}>
            <ChartPieWidget
              title="Participation rate"
              value={listDone.size}
              base={drcUaStaffs.length}
              showValue
              showBase
            />
          </Panel>
        </Grid>
        <Grid item xs={6} md={3}>
          <SlideWidget sx={{flex: 1}} icon="home" title={m._protection.avgParticipants}>
            {(participants.length / dataFiltered.length).toFixed(1)}
          </SlideWidget>
        </Grid>
      </Grid>
      <Div>
        <Div column>
          <PanelWBody title={m._protection.training}>
            <ChartLineByDate curves={{[m.date]: (_) => _.date_training}} data={dataFiltered} height={188} />
          </PanelWBody>
          <Panel>
            <Datatable
              id="psea-staffs"
              data={drcUaStaffs}
              columns={[
                {
                  id: 'status',
                  head: m.status,
                  width: 0,
                  type: 'select_one',
                  render: (_) => {
                    if (listDone.has(_.email)) {
                      return {
                        label: <Icon color="success">check_circle</Icon>,
                        tooltip: m._protection.pseaTrainingDone,
                        value: m._protection.pseaTrainingDone,
                        option: (
                          <>
                            <Icon color="success">check_circle</Icon> {m._protection.pseaTrainingDone}
                          </>
                        ),
                      }
                    }
                    return {
                      label: <Icon color="disabled">schedule</Icon>,
                      tooltip: m._protection.pseaTrainingWaiting,
                      value: m._protection.pseaTrainingWaiting,
                      option: (
                        <>
                          <Icon color="disabled">schedule</Icon> {m._protection.pseaTrainingWaiting}
                        </>
                      ),
                    }
                  },
                },
                {
                  type: 'string',
                  id: 'fullName',
                  head: m.name,
                  renderQuick: (_) => _.fullName,
                },
                {
                  type: 'string',
                  id: 'email',
                  head: m.email,
                  renderQuick: (_) => _.email,
                },
                {
                  type: 'select_one',
                  id: 'job',
                  head: m.drcJob,
                  renderQuick: (_) => _.job,
                },
                {
                  type: 'select_one',
                  id: 'office',
                  head: m.office,
                  renderQuick: (_) => _.office,
                },
              ]}
            />
          </Panel>
          <PanelWBody>
            {listNotIdentified.length} staffs have not be automatically identified by their name. Better to update Kobo
            submissions and set their email.
            <ul>
              {listNotIdentified.map((_) => (
                <li>{_}</li>
              ))}
            </ul>
          </PanelWBody>
        </Div>
        <Div column sx={{maxWidth: 360}}>
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
                inperson: dataFiltered.filter((_) => _.modality_training === 'inperson').length,
                online: dataFiltered.filter((_) => _.modality_training === 'online').length,
              }}
              colors={{
                inperson: t.palette.primary.main,
                online: snapshotAlternateColor(t),
              }}
            >
              <Legend
                {...commonLegendProps}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                style={{marginLeft: '10px'}}
              />
            </ChartPie>
          </Panel>

          <Panel>
            <MapSvgByOblast
              sx={{mx: 2}}
              data={dataFiltered}
              fillBaseOn="value"
              getOblast={(_) => {
                return OblastIndex.byName(
                  fnSwitch(
                    _.office_staff_trained!,
                    {
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
                    },
                    () => undefined,
                  ),
                )!.iso
              }}
            />
          </Panel>
          <PanelWBody title={m.category}>
            <ChartBarSingleBy
              data={dataFiltered}
              by={(_) => _.training_topic}
              label={Protection_coc.options.training_topic}
            />
          </PanelWBody>
          <PanelWBody title={m.duration}>
            <ChartBarSingleBy
              data={dataFiltered}
              by={(_) => _.duration_training}
              label={Protection_coc.options.duration_training}
            />
          </PanelWBody>
          <Panel>
            <PanelBody>
              <PanelTitle>{m._protection.participantsByLevel}</PanelTitle>
              <ChartBarSingleBy
                data={participants}
                by={(_) => {
                  const l = _.staff_position?.toLowerCase() ?? ''
                  if (['assistant', 'assistance'].find((_) => l.includes(_))) return 'Assistant'
                  if (['team leader', 'team lead', 'tl'].find((_) => l.includes(_))) return 'Team Leader'
                  if (['officer'].find((_) => l.includes(_))) return 'Officer'
                  if (['manager'].find((_) => l.includes(_))) return 'Manager'
                  if (['spesialist', 'specialist'].find((_) => l.includes(_))) return 'Specialist'
                  if (['coordinator', 'coordination'].find((_) => l.includes(_))) return 'Coordinator'
                  return m.notSpecified
                }}
                label={Protection_coc.options.duration_training}
              />
            </PanelBody>
            <Divider />
            <PanelBody>
              <PanelTitle>{m._protection.participantsBySector}</PanelTitle>
              <ChartBarSingleBy
                data={participants}
                limit={8}
                by={(_) => {
                  const l = _.staff_position?.toLowerCase() ?? ''
                  if (
                    ['shelter', 'cash and voucher', 'mpca', 'nfi', 'ecrec', 'economic recovery'].find((_) =>
                      l.includes(_),
                    )
                  )
                    return 'Shelter/Basic Needs/EcRec'
                  if (
                    ['case management', 'lawyer', 'protection', 'pss', 'gbv', 'legal', 'gender based violence'].find(
                      (_) => l.includes(_),
                    )
                  )
                    return 'Protection'
                  if (
                    [
                      'im specialist',
                      'emergancy',
                      'eore',
                      'victim assistance',
                      'va ',
                      'nts',
                      'hdp',
                      'demining',
                      'hma',
                      'im gis',
                    ].find((_) => l.includes(_))
                  )
                    return 'HDP'
                  if (['driver', 'fleet'].find((_) => l.includes(_))) return 'Fleet'
                  if (['safety'].find((_) => l.includes(_))) return 'Safety'
                  if (['finance', 'accountant'].find((_) => l.includes(_))) return 'Finance'
                  if (
                    [
                      'meal',
                      'monitoring, evaluation, accountability and learning',
                      'cfm',
                      'information management',
                    ].find((_) => l.includes(_))
                  )
                    return 'MEAL/IM'
                  if (['supply', 'supply chain'].find((_) => l.includes(_))) return 'Supply Chain'
                  if (['hr', 'recruitment'].find((_) => l.includes(_))) return 'HR'
                  if (['partnership'].find((_) => l.includes(_))) return 'Partnership'
                  if (['ecrec', 'economic recovery'].find((_) => l.includes(_))) return 'ECREC'
                  if (['interpretor', 'translator'].find((_) => l.includes(_))) return 'Translator'
                  if (['support'].find((_) => l.includes(_))) return 'Support'
                  if (['communications'].find((_) => l.includes(_))) return 'Support'
                  if (['administration'].find((_) => l.includes(_))) return 'Admin'
                  if (['graphic designer'].find((_) => l.includes(_))) return 'Com'
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
