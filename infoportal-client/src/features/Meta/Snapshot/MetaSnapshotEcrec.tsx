import React, {useEffect} from 'react'
import {drcDonorTranlate, DrcProgram, DrcSector, IKoboMeta, KoboMetaStatus, OblastIndex, Period, PeriodHelper, Person} from '@infoportal-common'
import {Div, PdfSlide, PdfSlideBody, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {format} from 'date-fns'
import {useTheme} from '@mui/material'
import {MetaDashboardProvider, useMetaContext} from '@/features/Meta/MetaContext'
import {useI18n} from '@/core/i18n'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Lazy} from '@/shared/Lazy'
import {Obj, seq} from '@alexandreannic/ts-utils'
import {ChartLine} from '@/shared/charts/ChartLine'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {PanelWBody} from '@/shared/Panel/PanelWBody'
import {snapshotColors} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarStacker} from '@/shared/charts/ChartBarStacked'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {MetaSnapshotHeader, MetaSnapshotProps} from './MetaSnapshot'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'

export const MetaSnapshotEcrec = (p: MetaSnapshotProps) => {
  return (
    <MetaDashboardProvider storageKeyPrefix="ss">
      <Cp {...p}/>
    </MetaDashboardProvider>
  )
}

const estimatedSectoralCashAssistanceUsd = 221

export const Cp = ({period}: MetaSnapshotProps) => {
  const t = useTheme()
  const {m, formatLargeNumber} = useI18n()
  const fetcherVet = useKoboAnswersContext().byName('ecrec_vetApplication')
  const {data: ctx, fetcher} = useMetaContext()
  useEffect(() => {
    fetcherVet.fetch()
    ctx.setShapeFilters({sector: [DrcSector.Livelihoods]})
    ctx.setPeriod(period)
  }, [])

  const filteredVet = seq(fetcherVet.get?.data ?? []).filter(_ => PeriodHelper.isDateIn(period, _.date))
  if (!ctx.period.start || !ctx.period.end) return 'Set a period'
  const flatData = ctx.filteredData.flatMap(_ => _.persons?.map(p => ({...p, ..._})) ?? [])
  const filteredCashData = ctx.filteredData.filter(_ => [
    DrcProgram.SectoralCashForAgriculture,
    DrcProgram.SectoralCashForAnimalShelterRepair,
    DrcProgram.SectoralCashForAnimalFeed,
  ].includes(_.activity!))

  return (
    <PdfSlide format="vertical">
      <MetaSnapshotHeader
        period={ctx.period as Period}
        color={appFeaturesIndex.ecrec.color}
        icon={appFeaturesIndex.ecrec.materialIcons}
        subTitle="Livelihoods"
      />
      <PdfSlideBody>
        <Div column>
          <Div column>
            <Div column>
              <Div>
                <SlideWidget sx={{flex: 1}} icon="home" title="Households">
                  {formatLargeNumber(ctx.filteredUniqueData.length)}
                </SlideWidget>
                <SlideWidget sx={{flex: 1}} icon="group" title="Household size">
                  {(ctx.filteredUniquePersons.length / ctx.filteredUniqueData.length).toFixed(2)}
                </SlideWidget>
                <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
                  {formatLargeNumber(ctx.filteredPersons.length)}
                </SlideWidget>
                <SlideWidget sx={{flex: 1}} icon="person_remove" title={m.uniqIndividuals}>
                  {formatLargeNumber(ctx.filteredUniquePersons.length)}
                </SlideWidget>
              </Div>
            </Div>
          </Div>
          <Div>
            <Div column>
              <PanelWBody title="Households reached by Oblast">
                <MapSvgByOblast
                  sx={{mx: 1.5, mt: -1, mb: -1.5}}
                  getOblast={_ => OblastIndex.byName(_.oblast).iso}
                  data={ctx.filteredData}
                  fillBaseOn="value"
                />
              </PanelWBody>
              <PanelWBody title="Donors">
                <ChartBarMultipleBy
                  data={flatData}
                  label={drcDonorTranlate}
                  by={_ => _.donor ?? []}
                />
              </PanelWBody>
              <PanelWBody title={m.ageGroup}>
                <Lazy deps={[ctx.filteredData]} fn={(d) => {
                  const gb = Person.groupByGenderAndGroup(Person.ageGroup.ECHO, true)(d?.flatMap(_ => _.persons ?? [])!)
                  return new Obj(gb).entries().map(([k, v]) => ({key: k, ...v}))
                }}>
                  {_ => <ChartBarStacker data={_} height={157} sx={{mb: -1, mr: -2}}/>}
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
                <Lazy deps={[ctx.filteredData]} fn={(d) => {
                  const gb = d.groupBy(d => format(d.date, 'yyyy-MM'))
                  const gbByCommittedDate = d.groupBy(d => d.lastStatusUpdate ? format(d.lastStatusUpdate!, 'yyyy-MM') : '')
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
                      height={180}
                      hideYTicks={true}
                      data={_ as any}
                      colors={() => snapshotColors(t)}
                      hideLabelToggle
                    />
                  )}
                </Lazy>
              </PanelWBody>
              <PanelWBody title="Activities">
                <ChartBarSingleBy
                  data={ctx.filteredData}
                  by={_ => m.activitiesMerged_[_.activity!]}
                  limit={5}
                />
              </PanelWBody>

              <PanelWBody>
                <SlideWidget title="Estimated Sectoral Cash Provided " sx={{mt: 0, pt: 0}}>
                  ~ ${formatLargeNumber(filteredCashData.filter(_ => _.status === KoboMetaStatus.Committed).length * estimatedSectoralCashAssistanceUsd)}
                </SlideWidget>
                <Lazy deps={[filteredCashData]} fn={(d) => {
                  const supposed = d.groupBy(d => format(d.date, 'yyyy-MM'))
                  const final = d
                    .filter((_: IKoboMeta) => _.status === KoboMetaStatus.Committed)
                    .compactBy('lastStatusUpdate')
                    .groupBy((_: IKoboMeta) => format(_.lastStatusUpdate!, 'yyyy-MM'))
                  return new Obj(supposed)
                    .map((k, v) => [k, {
                      final: seq(v).filter(_ => _.status === KoboMetaStatus.Committed).length * estimatedSectoralCashAssistanceUsd,
                      supposed: final[k].length * estimatedSectoralCashAssistanceUsd,
                    }])
                    .sort(([ka], [kb]) => ka.localeCompare(kb))
                    .entries()
                    .map(([k, v]) => ({
                      name: k,
                      'Estimated amount': v.supposed,
                      'Amount provided': v.final,
                    }))
                }}>
                  {_ => (
                    <ChartLine
                      height={180}
                      data={_ as any}
                      hideLabelToggle
                      distinctYAxis
                    />
                  )}
                </Lazy>
              </PanelWBody>
              <SlideWidget title="">

              </SlideWidget>
            </Div>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}