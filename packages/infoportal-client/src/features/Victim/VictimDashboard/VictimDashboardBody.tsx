import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import React, {useMemo} from 'react'
import {useI18n} from '@/core/i18n'
import {useVictimContext} from '@/features/Victim/VictimContext'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {format} from 'date-fns'
import {Panel, PanelBody} from '@/shared/Panel'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {seq} from '@alexandreannic/ts-utils'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {OblastIndex, Va_bio_tia, KoboXmlMapper} from 'infoportal-common'
import {AgeGroupTable} from '@/shared'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'

export const VictimDashboardBody = () => {
  const {m, formatLargeNumber} = useI18n()
  const ctx = useVictimContext()

  const persons = useMemo(() => {
    return ctx.dataFiltered.flatMap((row) => KoboXmlMapper.Persons.va_bio_tia(row) ?? [])
  }, [ctx.dataFiltered])

  const {numInjuredVictims, numDeadVictims} = useMemo(() => {
    return ctx.dataFiltered.reduce(
      (totals, row) => {
        if (row.bio_injured_dead === 'injured') {
          totals.numInjuredVictims += 1
        } else if (row.bio_injured_dead === 'dead') {
          totals.numDeadVictims += 1
        }
        return totals
      },
      {numInjuredVictims: 0, numDeadVictims: 0},
    )
  }, [ctx.dataFiltered])

  return (
    <>
      <Div column>
        <Div responsive>
          <Div column>
            <Div sx={{alignItems: 'stretch'}}>
              <SlideWidget sx={{flex: 1}} icon="group" title={m.submissions}>
                {formatLargeNumber(ctx.dataFiltered.length)}
              </SlideWidget>
              <SlideWidget sx={{flex: 1}} icon="person" title={m.injured}>
                {numInjuredVictims}
              </SlideWidget>
              <SlideWidget sx={{flex: 1}} icon="person" title={m.dead}>
                {numDeadVictims}
              </SlideWidget>
            </Div>
            <Panel title={m.submissions}>
              <ChartLineBy
                sx={{mt: 1}}
                data={ctx.dataFiltered}
                getX={(_) => format(_.date, 'yyyy-MM')}
                getY={(_) => 1}
                label={m.count}
              />
            </Panel>
            <Panel title={m.ageGroup}>
              <PanelBody>
                <AgeGroupTable tableId="protection-dashboard" persons={persons} enableDisplacementStatusFilter />
              </PanelBody>
            </Panel>
            <Panel title={m.project}>
              <PanelBody>
                {ctx.dataFiltered && (
                  <ChartBarMultipleBy
                    data={ctx.dataFiltered}
                    by={(_) =>
                      seq(_.tia_assesment)
                        .flatMap((tia) => (Array.isArray(tia.project) ? tia.project : [tia.project]))
                        .compact()
                        .get()
                    }
                    label={Va_bio_tia.options.project}
                  />
                )}
              </PanelBody>
            </Panel>
          </Div>
          <Div column>
            <Panel title={m.mpca.assistanceByLocation}>
              <PanelBody>
                <MapSvgByOblast
                  sx={{maxWidth: 480, margin: 'auto'}}
                  fillBaseOn="value"
                  data={ctx.dataFiltered}
                  getOblast={(_) => OblastIndex.byKoboName(_.place_oblast)?.iso!}
                  value={(_) => true}
                  base={(_) => _.place_oblast !== undefined}
                />
              </PanelBody>
            </Panel>
            <Panel title={m.disability}>
              <PanelBody>
                {ctx.dataFiltered && (
                  <ChartBarSingleBy
                    data={ctx.dataFiltered}
                    by={(_) =>
                      Array.from(
                        new Set(
                          seq(_.tia_assesment)
                            .map((_) => _.cash_disability_status)
                            .compact()
                            .get(),
                        ),
                      ).join(', ')
                    }
                    label={Va_bio_tia.options.cash_disability_status}
                  />
                )}
              </PanelBody>
            </Panel>
            <Panel title={m.assistance}>
              <PanelBody>
                {ctx.dataFiltered && (
                  <ChartBarMultipleBy
                    data={ctx.dataFiltered}
                    by={(_) =>
                      seq(_.tia_assesment)
                        .flatMap((tia) => {
                          if (!tia.type_assistance) return []
                          return Array.isArray(tia.type_assistance) ? tia.type_assistance : [tia.type_assistance]
                        })
                        .compact()
                        .distinct((x) => x)
                        .get()
                    }
                    label={Va_bio_tia.options.type_assistance}
                  />
                )}
              </PanelBody>
            </Panel>
          </Div>
        </Div>
      </Div>
    </>
  )
}
