import {useProtectionContext} from '@/features/Protection/Context/ProtectionContext'
import {Page} from '@/shared/Page'
import {Panel, PanelBody, PanelHead} from '@/shared/Panel'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import React from 'react'
import {today} from '@/features/Mpca/Dashboard/MpcaDashboard'
import {useI18n} from '@/core/i18n'
import {Lazy} from '@/shared/Lazy'
import {DisplacementStatus, groupBy, KoboIndex, OblastIndex, OblastName} from '@infoportal-common'
import {Sheet} from '@/shared/Sheet/Sheet'
import {Enum} from '@alexandreannic/ts-utils'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {AiViewAnswers} from '@/features/ActivityInfo/shared/ActivityInfoActions'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {format} from 'date-fns'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {ProtectionOverviewFilterCustom} from '@/features/Protection/Overview/ProtectionOverviewFilterCustom'
import {Divider} from '@mui/material'

export const ProtectionOverview = () => {
  const ctx = useProtectionContext()
  const {m, formatLargeNumber} = useI18n()
  if (!ctx.data) return
  const data = ctx.data
  console.log(data)
  return (
    <Page width="lg">
      <DataFilterLayout
        data={data.filtered}
        filters={ctx.filters.filters}
        shapes={ctx.filters.shape}
        setFilters={ctx.filters.setFilters}
        onClear={() => {
          ctx.filters.setCustom({})
          ctx.filters.setFilters({})
          ctx.filters.setPeriod({})
        }}
        before={
          <>
            <PeriodPicker
              defaultValue={[ctx.filters.period.start, ctx.filters.period.end]}
              onChange={([start, end]) => {
                ctx.filters.setPeriod(prev => ({...prev, start, end}))
              }}
              label={[m.start, m.endIncluded]}
              max={today}
            />
          </>
        }
        after={
          <ProtectionOverviewFilterCustom/>
        }
      />
      <Div column>
        <Div responsive>
          <Div column>
            <Div sx={{alignItems: 'stretch'}}>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
                {formatLargeNumber(data.filtered.length)}
              </SlideWidget>
              <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
                {formatLargeNumber(data.flatFiltered.length)}
              </SlideWidget>
            </Div>
            <Panel title={m.submissions}>
              <ChartLineBy
                sx={{mt: 1}}
                data={ctx.data.filtered}
                getX={_ => format(_.date, 'yyyy-MM')}
                getY={_ => 1}
                label={m.count}
              />
            </Panel>
            <Panel title={m.form}>
              <PanelBody>
                <ChartBarSingleBy
                  data={data.filtered}
                  by={_ => KoboIndex.searchById(_.formId)?.translation}
                />
              </PanelBody>
              <Divider/>
              <PanelHead>{m.activity}</PanelHead>
              <PanelBody>
                {data.flatFiltered && (
                  <ChartBarSingleBy
                    data={data.filtered}
                    by={_ => _.activity!}
                  />
                )}
              </PanelBody>
            </Panel>
            <Panel title={m.project}>
              <PanelBody>
                {data.flatFiltered && (
                  <ChartBarMultipleBy
                    data={data.filtered}
                    by={_ => _.project!}
                  />
                )}
              </PanelBody>
            </Panel>
          </Div>
          <Div column>
            <Panel title={m.individuals}>
              <PanelBody>
                <MapSvgByOblast
                  sx={{maxWidth: 480, margin: 'auto'}}
                  fillBaseOn="value"
                  getOblast={_ => OblastIndex.byName(_.oblast)?.iso!}
                  data={ctx.data.flatFiltered}/>
              </PanelBody>
            </Panel>
            <Panel title={m.ageGroup}>
              <PanelBody>
                <AgeGroupTable tableId="protection-dashboard" persons={data.flatFiltered} enableDisplacementStatusFilter/>
              </PanelBody>
            </Panel>
            <Panel title={m.displacementStatus}>
              <PanelBody>
                <ChartBarSingleBy
                  data={data.flatFiltered}
                  by={_ => _.displacement}
                  label={DisplacementStatus}
                />
              </PanelBody>
            </Panel>
          </Div>
        </Div>
        <Lazy deps={[data.flatFiltered]} fn={() => {
          if (!data.flatFiltered) return
          const res: {
            oblast: OblastName
            raion: string
            hromada: string
            protection_gbv?: number
            protection_pss?: number
            protection_hhs2_1?: number
            protection_groupSession?: number
            data: {
              protection_gbv?: any[]
              protection_pss?: any[]
              protection_hhs2_1?: any[]
              protection_groupSession?: any[]
            }
          }[] = []
          groupBy({
            data: data.flatFiltered,
            groups: [
              {by: _ => _.oblast!},
              {by: _ => _.raion!},
              {by: _ => _.hromada!},
            ],
            finalTransform: (grouped, [
              oblast,
              raion,
              hromada
            ]) => {
              const countByForm = grouped.groupBy(_ => _.formId as string)
              res.push({
                oblast,
                raion,
                hromada,
                ...Enum.mapValues(countByForm, _ => _.length),
                data: countByForm,
              })
            }
          }).groups
          return res
        }}>
          {res => (
            <Panel>
              <Sheet
                showExportBtn
                defaultLimit={500}
                id="protection-by-loc"
                data={res}
                columns={[
                  {type: 'select_one', id: 'oblast', head: 'oblast', renderExport: _ => _.oblast, render: _ => _.oblast, renderValue: _ => _.oblast},
                  {type: 'select_one', id: 'raion', head: 'raion', renderExport: _ => _.raion, render: _ => _.raion, renderValue: _ => _.raion},
                  {type: 'select_one', id: 'hromada', head: 'hromada', renderExport: _ => _.hromada, render: _ => _.hromada, renderValue: _ => _.hromada},
                  {type: 'number', id: 'protection_gbv', head: 'gbv', renderExport: _ => _.protection_gbv, render: _ => _.protection_gbv, renderValue: _ => _.protection_gbv},
                  {type: 'number', id: 'protection_pss', head: 'pss', renderExport: _ => _.protection_pss, render: _ => _.protection_pss, renderValue: _ => _.protection_pss},
                  {
                    type: 'number',
                    id: 'protection_hhs2_1',
                    head: 'hhs',
                    renderExport: _ => _.protection_hhs2_1,
                    render: _ => _.protection_hhs2_1,
                    renderValue: _ => _.protection_hhs2_1
                  },
                  {
                    type: 'number',
                    id: 'protection_groupSession',
                    head: 'groupSession',
                    renderExport: _ => _.protection_groupSession,
                    render: _ => _.protection_groupSession,
                    renderValue: _ => _.protection_groupSession
                  },
                  {
                    id: 'actions', head: '', width: 120, renderExport: false, render: _ => (
                      <>
                        <AiViewAnswers answers={_.data.protection_gbv ?? []}/>
                        <AiViewAnswers answers={_.data.protection_pss ?? []}/>
                        <AiViewAnswers answers={_.data.protection_hhs2_1 ?? []}/>
                        <AiViewAnswers answers={_.data.protection_groupSession ?? []}/>
                      </>
                    )
                  },
                ]}
              />
            </Panel>
          )}
        </Lazy>
      </Div>
    </Page>
  )
}