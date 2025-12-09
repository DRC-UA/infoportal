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
import {Switch, useTheme} from '@mui/material'

export const DashboardWidgets: FC = () => {
  const {m, formatLargeNumber} = useI18n()
  const ctx = useVictimAssistanceContext()
  const theme = useTheme()
  const [mapType, setMapType] = useState<'assistance' | 'incidents'>('assistance')
  const [showReceivedCash, setShowReceivedCash] = useState(false)

  const persons = useMemo(() => {
    return ctx.dataFiltered.flatMap((row) =>
      showReceivedCash
        ? KoboXmlMapper.Persons.va_bio_tia_receivedCash(row)
        : KoboXmlMapper.Persons.va_bio_tia(row.tia_assesment),
    )
  }, [ctx.dataFiltered, showReceivedCash])

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
          <Panel
            title={
              <Div sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>{m.ageGroup}</span>
                <Div sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <span
                    style={{
                      fontSize: 13,
                      color: showReceivedCash ? theme.palette.error.main : theme.palette.text.secondary,
                      fontWeight: showReceivedCash ? 600 : 400,
                    }}
                  >
                    {m.hdp.receivedCashAssistance}
                  </span>
                  <Switch
                    size="small"
                    checked={showReceivedCash}
                    onChange={() => setShowReceivedCash((prev) => !prev)}
                    sx={{
                      '& .MuiSwitch-thumb': {
                        backgroundColor: showReceivedCash ? theme.palette.error.main : theme.palette.primary.main,
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: theme.palette.action.active,
                      },
                    }}
                  />
                </Div>
              </Div>
            }
          >
            <PanelBody>
              <AgeGroupTable tableId="protection-dashboard" persons={persons} enableDisplacementStatusFilter />
            </PanelBody>
          </Panel>

          <Panel title={m.project}>
            <PanelBody>
              {ctx.dataFiltered && (
                <ChartBarMultipleBy
                  data={seq(
                    ctx.dataFiltered
                      .map(({tia_assesment}) => tia_assesment)
                      .compact()
                      .flat(),
                  )}
                  by={({project}) => (Array.isArray(project) ? project : [project])}
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
                data={ctx.dataFiltered.flatMap(({tia_assesment}) => tia_assesment).compact()}
                getOblast={({oblast, case_oblast}) =>
                  OblastIndex.byKoboName(mapType === 'assistance' ? oblast : case_oblast)?.iso!
                }
                value={(_) => true}
                base={({oblast, case_oblast}) => (mapType === 'assistance' ? oblast : case_oblast) !== undefined}
              />
            </PanelBody>
          </Panel>
          <Panel title={m.displacementStatus}>
            <PanelBody>
              {ctx.dataFiltered && (
                <ChartBarSingleBy
                  data={seq(ctx.dataFiltered).flatMap((row) =>
                    seq(row.tia_assesment)
                      .map((tia) => tia.res_stat)
                      .map((res_stat) => ({res_stat}))
                      .get(),
                  )}
                  by={({res_stat}) => res_stat}
                  label={Va_bio_tia.options.add_res_stat}
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
