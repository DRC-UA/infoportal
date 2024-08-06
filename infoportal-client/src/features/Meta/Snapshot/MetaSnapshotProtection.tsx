import React, {useEffect} from 'react'
import {drcDonorTranlate, DrcSector, OblastIndex, Period, Person, WgDisability} from '@infoportal-common'
import {Div, PdfSlide, PdfSlideBody, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {format} from 'date-fns'
import {useTheme} from '@mui/material'
import {MetaDashboardProvider, useMetaContext} from '@/features/Meta/MetaContext'
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
import {MetaSnapshotHeader, MetaSnapshotProps} from './MetaSnapshot'

export const MetaSnapshotProtection = (p: MetaSnapshotProps) => {
  return (
    <MetaDashboardProvider storageKeyPrefix="ss-prot">
      <Cp {...p}/>
    </MetaDashboardProvider>
  )
}

export const Cp = ({period}: MetaSnapshotProps) => {
  const {data: ctx, fetcher} = useMetaContext()
  useEffect(() => {
    ctx.setShapeFilters({sector: [DrcSector.Protection]})
    ctx.setPeriod(period)
  }, [])
  const t = useTheme()
  const {m, formatLargeNumber} = useI18n()
  if (!ctx.period.start || !ctx.period.end) return 'Set a period'
  const dataFilteredFlat = ctx.filteredData.flatMap(_ => _.persons?.map(p => ({..._, ...p})) ?? [])
  const dataFilteredPm = ctx.filteredData.filter(_ => m.activitiesMerged_[_.activity!] === 'Protection Monitoring')
  const dataFilteredPmIndividuals = dataFilteredPm.flatMap(_ => _.persons ?? [])
  const dataFilteredActivities = ctx.filteredData.filter(_ => m.activitiesMerged_[_.activity!] !== 'Protection Monitoring')
  const dataFilteredActivitiesIndividuals = dataFilteredActivities.flatMap(_ => _.persons ?? [])
  return (
    <PdfSlide format="vertical">
      <MetaSnapshotHeader period={ctx.period as Period}/>
      <PdfSlideBody>
        <Div column>
          <Div column>
            <Div column>
              <Div>
                <SlideWidget sx={{flex: 1}} icon="group_work" title="Sessions">
                  {formatLargeNumber(dataFilteredActivities.length)}
                </SlideWidget>
                <SlideWidget sx={{flex: 1}} icon="groups" title="Group size">
                  {(dataFilteredActivitiesIndividuals.length / dataFilteredActivities.length).toFixed(2)}
                </SlideWidget>
                <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
                  {formatLargeNumber(dataFilteredActivitiesIndividuals.length)}
                </SlideWidget>
                <SlideWidget sx={{flex: 1}} icon="person_search" title="Ind. reached via PM">
                  {formatLargeNumber(dataFilteredPmIndividuals.length)}
                </SlideWidget>
              </Div>
            </Div>
          </Div>
          <Div>
            <Div column>
              <PanelWBody title="PoCs reached by Oblast">
                <MapSvgByOblast
                  sx={{mx: 1.5, mt: -1, mb: -1.5}}
                  getOblast={_ => OblastIndex.byName(_.oblast).iso}
                  data={dataFilteredFlat}
                  fillBaseOn="value"
                />
              </PanelWBody>
              <PanelWBody title={m.ageGroup}>
                <Lazy deps={[ctx.filteredData]} fn={(d) => {
                  const gb = Person.groupByGenderAndGroup(Person.ageGroup.ECHO)(d?.flatMap(_ => _.persons ?? [])!)
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
                      pm: v.filter(_ => m.activitiesMerged_[_.activity!] === 'Protection Monitoring').length,
                      activities: v.filter(_ => m.activitiesMerged_[_.activity!] !== 'Protection Monitoring').length,
                      // committed: gbByCommittedDate[k]?.filter(_ => _.status === KoboMetaStatus.Committed).length
                    }])
                    .sort(([ka], [kb]) => ka.localeCompare(kb))
                    .entries()
                    .map(([k, v]) => ({
                      name: k,
                      'Protection Monitoring': v.pm,
                      'Assistance': v.activities,
                      // 'Assistance': v.committed,
                    }))
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
              <PanelWBody title="Individuals by activities">
                <ChartBarSingleBy
                  data={dataFilteredFlat}
                  by={_ => m.activitiesMerged_[_.activity!]}
                  limit={5}
                />
              </PanelWBody>
              <PanelWBody title="Individuals by donors">
                <ChartBarMultipleBy
                  data={dataFilteredFlat}
                  label={drcDonorTranlate}
                  by={_ => _.donor ?? []}
                />
              </PanelWBody>
            </Div>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}