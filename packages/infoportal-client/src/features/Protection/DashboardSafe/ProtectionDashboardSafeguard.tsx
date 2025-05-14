import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'
import React, {useEffect, useMemo, useState} from 'react'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {OblastIndex, Period, PeriodHelper} from 'infoportal-common'
import {fnSwitch, seq} from '@axanc/ts-utils'
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
import {Safeguarding_psea} from 'infoportal-common'
import {drcUaStaffsEmailCompleted} from '@/features/Protection/DashboardSafe/partnerStaffsEmailCompleted'
import {drcUaStaffs} from '@/features/Protection/DashboardSafe/PartnerStaffs'

export const ProtectionDashboardSafeguard = () => {
  const {api, conf} = useAppSettings()
  const t = useTheme()
  const {m} = useI18n()

  const [optionFilter, setOptionFilters] = useState<DataFilter.InferShape<typeof filterShape>>({})
  const [period, setPeriod] = useState<Partial<Period>>({})

  const fetcherSafe = useFetcher(api.kobo.typedAnswers.search.safeguarding_psea)
  const fetcherUsers = useFetcher(api.user.search)

  useEffect(() => {
    fetcherSafe.fetch()
    fetcherUsers.fetch()
  }, [])

  const filterShape = useMemo(
    () =>
      DataFilter.makeShape<InferTypedAnswer<'safeguarding_psea'>>({
        oblast: {
          icon: 'location_on',
          multiple: true,
          getValue: (_) => _.implementation_area,
          getOptions: () => DataFilter.buildOptionsFromObject(Safeguarding_psea.options.implementation_area),
          label: m.oblast,
        },
        modality: {
          icon: 'desktop_windows',
          getValue: (_) => _.training_format,
          getOptions: () => DataFilter.buildOptionsFromObject(Safeguarding_psea.options.training_format),
          label: m.modality,
        },
        category: {
          icon: appConfig.icons.program,
          getValue: (_) => _.name_partner_organisation,
          getOptions: () => DataFilter.buildOptionsFromObject(Safeguarding_psea.options.name_partner_organisation),
          label: m.partnerName,
        },
      }),
    [m],
  )

  const data = seq(fetcherSafe.get?.data ?? [])
  const dataFiltered = useMemo(() => {
    return DataFilter.filterData(data, filterShape, optionFilter).filter((_) =>
      PeriodHelper.isDateIn(period, _.date_training),
    )
  }, [data, filterShape, optionFilter, period])
  const participants = useMemo(() => dataFiltered.flatMap((_) => _.participant ?? []), [data])

  const {listDone, listNotIdentified} = useMemo(() => {
    let listNotIdentified: string[] = []
    const arr = [
      ...drcUaStaffsEmailCompleted,
      ...dataFiltered
        .flatMap((_) =>
          _.participant?.map((participants) => {
            if (participants.email_participant) return participants.email_participant
            if (participants.name_participant) {
              let match = drcUaStaffs.find(
                (_) =>
                  _.fullName.replaceAll(/\s/g, '').toLowerCase() ===
                  participants.name_participant?.replaceAll(/\s/g, '').toLowerCase(),
              )?.email
              if (!match) {
                const names = participants.name_participant.split(' ').map((_) => _.toLowerCase())
                match = drcUaStaffs.find((_) => {
                  const sanitizedName = _.fullName.replaceAll(/\s/g, '').toLowerCase()
                  return names.every((_) => sanitizedName.includes(_))
                })?.email
              }
              if (!match) listNotIdentified.push(participants.name_participant)
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
    <Page loading={fetcherSafe.loading}>
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
      <Grid container sx={{mb: 2, alignItems: 'stretch'}} columnSpacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <SlideWidget sx={{flex: 1}} icon="storage" title={m._protection.trainings}>
            {dataFiltered.length}
          </SlideWidget>
        </Grid>
        <Grid item xs={12} md={6}>
          <SlideWidget sx={{flex: 1}} icon="person" title={m._protection.participants}>
            {participants.length}
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
                  id: 'nameOrg',
                  head: m.organisation,
                  renderQuick: (_) => _.nameOrg,
                },
              ]}
            />
          </Panel>
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
                inperson: dataFiltered.filter((_) => _.training_format === 'offline').length,
                online: dataFiltered.filter((_) => _.training_format === 'online').length,
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
                const oblastKey = _.implementation_area![0]!
                const oblastName = fnSwitch(
                  oblastKey,
                  {
                    cherkaska: 'Cherkaska',
                    chernivetska: 'Chernivetska',
                    dnipropetrovska: 'Dnipropetrovska',
                    donetska: 'Donetska',
                    'ivano-frankivska': 'Ivano-Frankivska',
                    kharkivska: 'Kharkivska',
                    kirovohradska: 'Kirovohradska',
                    luhanska: 'Luhanska',
                    mykolaivska: 'Mykolaivska',
                    lvivska: 'Lvivska',
                    odeska: 'Odeska',
                    poltavska: 'Poltavska',
                    rivnenska: 'Rivnenska',
                    sevastopilska: 'Sevastopol',
                    ternopilska: 'Ternopilska',
                    vinnytska: 'Vinnytska',
                    kyivska: 'Kyivska',
                    volynska: 'Volynska',
                    khersonska: 'Khersonska',
                    khmelnytska: 'Khmelnytska',
                    sumska: 'Sumska',
                    chernihivska: 'Chernihivska',
                    zakarpatska: 'Zakarpatska',
                    zaporizka: 'Zaporizka',
                    zhytomyrska: 'Zhytomyrska',
                  },
                  () => undefined,
                )

                return OblastIndex.byName(oblastName!)!.iso
              }}
            />
          </Panel>
          <Panel>
            <PanelBody>
              <PanelTitle>{m._protection.participantsByLevel}</PanelTitle>
              <ChartBarSingleBy
                data={participants}
                by={(_) => {
                  const l = _.position_participant?.toLowerCase() ?? ''
                  if (['assistant', 'assistance'].find((_) => l.includes(_))) return 'Assistant'
                  if (['team leader', 'team lead', 'tl'].find((_) => l.includes(_))) return 'Team Leader'
                  if (['officer'].find((_) => l.includes(_))) return 'Officer'
                  if (['manager'].find((_) => l.includes(_))) return 'Manager'
                  if (['spesialist', 'specialist'].find((_) => l.includes(_))) return 'Specialist'
                  if (['coordinator', 'coordination'].find((_) => l.includes(_))) return 'Coordinator'
                  return m.notSpecified
                }}
                // label={m.cancel}
              />
            </PanelBody>
            <Divider />
            <PanelBody>
              <PanelTitle>{m._protection.participantsBySector}</PanelTitle>
              <ChartBarSingleBy
                data={participants}
                limit={8}
                by={(_) => {
                  const l = _.position_participant?.toLowerCase() ?? ''
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
