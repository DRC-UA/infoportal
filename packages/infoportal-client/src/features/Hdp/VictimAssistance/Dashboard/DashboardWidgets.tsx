import {useMemo, useState, type FC} from 'react'
import {seq} from '@axanc/ts-utils'
import {format} from 'date-fns'

import {OblastIndex, Va_bio_tia, KoboXmlMapper} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {AgeGroupTable} from '@/shared'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'

import {useVictimAssistanceContext} from './Context'

export const DashboardWidgets: FC = () => {
  const {m, formatLargeNumber} = useI18n()
  const ctx = useVictimAssistanceContext()
  const [mapType, setMapType] = useState<'assistance' | 'incidents'>('assistance')

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
          <Panel title={m.hdp.location}>
            <PanelBody>
              <ScRadioGroup value={mapType} onChange={setMapType} dense inline sx={{mb: 2}}>
                <ScRadioGroupItem dense hideRadio value="assistance" title={m.hdp.assistance} />
                <ScRadioGroupItem dense hideRadio value="incidents" title={m.hdp.incidents} />
              </ScRadioGroup>
              <MapSvgByOblast
                sx={{maxWidth: 480, margin: 'auto'}}
                fillBaseOn="value"
                data={ctx.dataFiltered}
                getOblast={(row) =>
                  OblastIndex.byKoboName(row[mapType === 'assistance' ? 'place_oblast' : 'loc_oblast'])?.iso!
                }
                value={(_) => true}
                base={(row) => row[mapType === 'assistance' ? 'place_oblast' : 'loc_oblast'] !== undefined}
              />
            </PanelBody>
          </Panel>
          <Panel title={m.displacementStatus}>
            <PanelBody>
              {ctx.dataFiltered && (
                <ChartBarSingleBy
                  data={ctx.dataFiltered}
                  by={(_) =>
                    Array.from(
                      new Set(
                        seq(_.tia_assesment)
                          .map((_) => _.res_stat)
                          .compact()
                          .get(),
                      ),
                    ).join(', ')
                  }
                  label={Va_bio_tia.options.res_stat}
                  includeNullish
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
  )
}
