import React, {type FC, useMemo} from 'react'

import {Cs_tracker, OblastISO} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Panel} from '@/shared/Panel'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'

import {usePeacebuildingContext} from './Context'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Txt} from '@/shared'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {seq} from '@axanc/ts-utils'
import {ChartBarVertical} from '@/shared/charts/ChartBarVertical'

export const DashboardWidgets: FC = () => {
  const {m, formatLargeNumber} = useI18n()
  const ctx = usePeacebuildingContext()

  const officeToOblast: Record<string, OblastISO> = {
    sumy: 'UA59',
    kharkiv: 'UA63',
    chernihiv: 'UA74',
    mykolaiv: 'UA48',
    kyiv: 'UA80',
    dnipro: 'UA12',
    kherson: 'UA65',
    ivankiv: 'UA32',
    sloviansk: 'UA14',
  }

  type OrgKey = keyof typeof Cs_tracker.options.organisation

  const chartDataParticipantsByOrg = useMemo(() => {
    return (Object.keys(Cs_tracker.options.organisation) as OrgKey[]).map((key) => {
      const label = Cs_tracker.options.organisation[key]
      const total = ctx.dataFiltered.reduce((sum, row) => {
        const value = row[`participants_${key}_num` as keyof Cs_tracker.T]
        return sum + (typeof value === 'number' ? value : 0)
      }, 0)
      return {name: label, participants: total}
    })
  }, [ctx.dataFiltered])

  const chartDataBySector = useMemo(() => {
    type SectorKey = keyof typeof Cs_tracker.options.sector_team

    return (Object.keys(Cs_tracker.options.sector_team) as SectorKey[]).map((key) => ({
      name: Cs_tracker.options.sector_team[key],
      value: ctx.dataFiltered.reduce((sum, row) => {
        const value = row[`${key}_num` as keyof Cs_tracker.T]
        return sum + (typeof value === 'number' ? value : 0)
      }, 0),
    }))
  }, [ctx.dataFiltered])

  const totalParticipants = ctx.dataFiltered.reduce((acc, row) => acc + (row.total_participants || 0), 0)
  const userCount = ctx.fetcherUsers.get ?? 0
  const percentTrained = userCount > 0 ? ((totalParticipants / userCount) * 100).toFixed(1) : null

  const preScores = ctx.dataPrePost.filter((row) => row.complete_training === 'before').map((row) => row.cal_score_num)
  const postScores = ctx.dataPrePost.filter((row) => row.complete_training === 'after').map((row) => row.cal_score_num)

  const avg = (arr: number[]) => (arr.length === 0 ? 0 : arr.reduce((sum, val) => sum + val, 0) / arr.length)
  const avgPre = avg(preScores)
  const avgPost = avg(postScores)
  const progress = avgPost - avgPre

  return (
    <Div column>
      <Div responsive>
        <Div column>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="group" title={m.individualsTrained}>
              <>
                {formatLargeNumber(totalParticipants)}
                {percentTrained && (
                  <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.text.secondary}}>
                    ({percentTrained}%)
                  </Txt>
                )}
              </>
            </SlideWidget>
          </Div>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="female" title={m.female}>
              {(() => {
                const totalFemale = ctx.dataFiltered.reduce((acc, row) => acc + (row.participants_female || 0), 0)
                const totalAll = ctx.dataFiltered.reduce((acc, row) => acc + (row.total_participants || 0), 0)
                const percent = totalAll > 0 ? ((totalFemale / totalAll) * 100).toFixed(1) : '0'
                return (
                  <>
                    {formatLargeNumber(totalFemale)}
                    <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.primary.main}}>({percent}%)</Txt>
                  </>
                )
              })()}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="male" title={m.male}>
              {(() => {
                const totalMale = ctx.dataFiltered.reduce((acc, row) => acc + (row.participants_male || 0), 0)
                const totalAll = ctx.dataFiltered.reduce((acc, row) => acc + (row.total_participants || 0), 0)
                const percent = totalAll > 0 ? ((totalMale / totalAll) * 100).toFixed(1) : '0'
                return (
                  <>
                    {formatLargeNumber(totalMale)}
                    <Txt sx={{ml: 0.5, fontSize: '0.7em', color: (t) => t.palette.primary.main}}>({percent}%)</Txt>
                  </>
                )
              })()}
            </SlideWidget>
          </Div>
          <Panel title={m.trainingTrends}>
            <ChartLineBy
              data={seq(ctx.dataFiltered)}
              getX={(row) => row.training_date?.toISOString().slice(0, 10) ?? 'Unknown'}
              getY={(row) => row.total_participants || 0}
              label={m.participants}
              height={220}
            />
          </Panel>
          <Div sx={{alignItems: 'stretch', mt: 2}}>
            <Div sx={{alignItems: 'stretch', mt: 2}}>
              <SlideWidget sx={{flex: 1}} icon="school" title={m.trainingOfTrainers}>
                <Div sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Txt sx={{fontSize: '1em', fontWeight: 500}}>
                    8{' '}
                    <Txt component="span" sx={{fontWeight: 500}}>
                      {m.trained}
                    </Txt>
                  </Txt>
                  <Txt sx={{fontSize: '0.7em', color: (t) => t.palette.text.secondary}}>
                    5 {m.facilitated} ({((5 / 8) * 100).toFixed(1)}%)
                  </Txt>
                </Div>
              </SlideWidget>
            </Div>
          </Div>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="wifi" title={m.onlineTraining}>
              {formatLargeNumber(ctx.dataFiltered.filter((_) => _.training_format === 'online').length)}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="wifi_off" title={m.offlineTraining}>
              {formatLargeNumber(ctx.dataFiltered.filter((_) => _.training_format === 'offline').length)}
            </SlideWidget>
          </Div>
          <SlidePanel title={m.byDuration}>
            <ChartBarSingleBy
              data={ctx.dataFiltered}
              by={(_) => _.training_duration}
              label={Cs_tracker.options.training_duration}
            />
          </SlidePanel>
          <SlideWidget title={m.progress} icon="trending_up" sx={{fontSize: '1em'}}>
            <Div sx={{textAlign: 'center'}}>
              <Txt>
                {m.avgBefore}:&nbsp;
                <Txt component="span" sx={{color: (t) => t.palette.text.secondary}}>
                  {avgPre.toFixed(1)}
                </Txt>
                &nbsp;/ {m.avgAfter}:&nbsp;
                <Txt component="span" sx={{color: (t) => t.palette.primary.main}}>
                  {avgPost.toFixed(1)}
                </Txt>
              </Txt>
              <Txt
                sx={{
                  mt: 0.5,
                  color: progress > 0 ? 'success.main' : progress < 0 ? 'error.main' : 'text.secondary',
                  fontSize: '1.1em',
                  fontWeight: 500,
                }}
              >
                {progress > 0 ? '+' : ''}
                {progress.toFixed(1)} {m.points}
              </Txt>
            </Div>
          </SlideWidget>
        </Div>
        <Div column>
          <Panel title={m.participantsLoc}>
            <MapSvgByOblast
              sx={{maxWidth: 500, mt: 5, margin: 'auto'}}
              data={ctx.dataFiltered}
              getOblast={(row) => officeToOblast[row.location?.toLowerCase() || '']}
              fillBaseOn="value"
              value={(_) => true}
            />
          </Panel>
          <Panel title={m.byOrganisation}>
            <ChartBarVertical
              data={chartDataParticipantsByOrg}
              sx={{mt: 2}}
              height={250}
              colors={(theme) => [theme.palette.primary.dark]}
              hideLegends
              showGrid
              axes={{
                y: {
                  tick: {fontSize: 12},
                },
                x: {
                  tick: {fontSize: 12},
                },
              }}
              slotProps={{
                Tooltip: {
                  formatter: (value: any) => [`${value} ${m.participants}`],
                },
              }}
            />
          </Panel>
          <Panel title={m.team}>
            <ChartBarVertical
              data={chartDataBySector}
              height={280}
              colors={(theme) => [theme.palette.primary.light]}
              hideLegends
              showGrid
              axes={{
                y: {
                  tick: {fontSize: 12},
                },
                x: {
                  tick: {fontSize: 12},
                },
              }}
              slotProps={{
                Tooltip: {
                  formatter: (value: any) => [`${value} ${m.participants}`],
                },
              }}
            />
          </Panel>
        </Div>
      </Div>
    </Div>
  )
}
