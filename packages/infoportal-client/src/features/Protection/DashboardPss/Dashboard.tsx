import {Fragment, type FC} from 'react'
import {format} from 'date-fns'
import {Box, Typography, useTheme} from '@mui/material'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'

import {capitalize, OblastIndex, Person, Protection_pss, toPercent} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {today} from '@/features/Mpca/Dashboard/MpcaDashboard'
import {Page, Txt} from '@/shared'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {ChartBarVerticalGrouped} from '@/shared/charts/ChartBarGrouped'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {usePlurals} from '@/utils'

import {PssContextProvider, usePssContext} from './Context'
import {useStats, useTranslations, useSessionsCounter} from './hooks'
import {colorByQuestion, prePostSummaryBuilder} from './utils'

const LegendColorSample: FC<{background: string}> = ({background}) => <Box sx={{width: 30, background}}></Box>
const LegendItem: FC<{color: string; label: string}> = ({color, label}) => (
  <Box display="flex" gap={1}>
    <LegendColorSample background={color} />
    <Txt>{label}</Txt>
  </Box>
)

const DashboardPss: FC = () => (
  <PssContextProvider>
    <PssDashboardWithContext />
  </PssContextProvider>
)

const PssDashboardWithContext: FC = () => {
  const {data, fetcher, filters} = usePssContext()
  const {m, formatLargeNumber} = useI18n()
  const theme = useTheme()
  const {translateOption, translateField} = useTranslations()
  const pluralizeIndividuals = usePlurals(m.plurals.individuals)
  const pluralizeUniqueIndividuals = usePlurals(m.plurals.uniqueIndividuals)
  const pluralizeSubmissions = usePlurals(m.plurals.submission)
  const translateActivityOptions = (sessionType: Protection_pss.T['activity']): string => {
    return (
      translateOption('activity')?.find(({value}) => value === sessionType)?.label ??
      `Missing translation for the "${sessionType}" option`
    )
  }
  const sessionsCounter = useSessionsCounter(data)
  const clearFilters = () => [filters.setFilters, filters.setPeriod].forEach((callback) => callback({}))
  const {improvements, individuals} = useStats(data?.flatFiltered)

  const prePostTests = prePostSummaryBuilder(data?.filtered)

  if (!data) return null

  return (
    <Page width="lg" loading={fetcher.loading}>
      <DataFilterLayout
        data={data.filtered}
        filters={filters.filters}
        shapes={filters.shape}
        setFilters={filters.setFilters}
        onClear={clearFilters}
        before={
          <PeriodPicker
            value={[filters.period.start, filters.period.end]}
            defaultValue={[filters.period.start, filters.period.end]}
            onChange={([start, end]) => {
              filters.setPeriod((prev) => ({...prev, start, end}))
            }}
            label={[m.start, m.endIncluded]}
            max={today}
            fullWidth={false}
          />
        }
      />
      <Div column>
        <Div sx={{alignItems: 'stretch'}}>
          <SlideWidget sx={{flex: 1}} icon="checklist" title={pluralizeSubmissions(data.filtered.length)!}>
            {formatLargeNumber(data.filtered.length)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="person" title={pluralizeIndividuals(data.flatFiltered.length)!}>
            {formatLargeNumber(data.flatFiltered.length)}
          </SlideWidget>
          <SlideWidget
            sx={{flex: 1}}
            icon="person"
            title={`${pluralizeUniqueIndividuals(individuals)}*`}
            tooltip={m.pssDashboard.uniqueIndividualsHint}
          >
            {individuals}
          </SlideWidget>
        </Div>
        <Txt>{m.pssDashboard.sessionsCounterTitle}</Txt>
        <Div sx={{alignItems: 'stretch'}}>
          <SlideWidget sx={{flex: 1}} icon="groups" title={translateActivityOptions('pgs')}>
            {formatLargeNumber(sessionsCounter.pgs)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="group" title={translateActivityOptions('ais')}>
            {formatLargeNumber(sessionsCounter.ais)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="groups" title={translateActivityOptions('mhpss')}>
            {formatLargeNumber(sessionsCounter.mhpss)}
          </SlideWidget>
          <SlideWidget sx={{flex: 1}} icon="groups" title={translateActivityOptions('community_dialogues_session')}>
            {formatLargeNumber(sessionsCounter.community_dialogues_session)}
          </SlideWidget>
        </Div>
        <Div responsive>
          <Div column>
            <Panel title={m.submissions}>
              <ChartLineBy
                sx={{mt: 1}}
                data={data.filtered}
                getX={({date}) => format(date!, 'yyyy-MM')}
                getY={() => 1}
                label={m.count}
              />
            </Panel>
            <Panel title={m.activity}>
              <PanelBody>
                {data.filtered && (
                  <ChartBarSingleBy
                    data={data.filtered}
                    by={({activity}) => activity!}
                    label={translateOption('activity')?.reduce(
                      (result, {value, label}) => ({
                        ...result,
                        [value]: label,
                      }),
                      {} as Record<string, string>,
                    )}
                  />
                )}
              </PanelBody>
            </Panel>
            <Panel title={m.pssDashboard.sessionsAttendanceWidgetTitle}>
              <PanelBody>
                {data.filtered && (
                  <ChartBarMultipleBy
                    data={data.filtered.flatMap(({hh_char_hh_det}) => hh_char_hh_det ?? []) ?? []}
                    by={({hh_char_hh_session}) => hh_char_hh_session!}
                    label={translateOption('hh_char_hh_session')?.reduce(
                      (result, {value, label}) => ({
                        ...result,
                        [value]: label,
                      }),
                      {} as Record<string, string>,
                    )}
                  />
                )}
              </PanelBody>
            </Panel>
            <Panel title={m.pssDashboard.prePostWidget.title}>
              <PanelBody>
                <Div sx={{display: 'flex', flexDirection: 'column', mb: 2}}>
                  {prePostTests &&
                    Object.entries(prePostTests).map(([field, figures]) => {
                      return (
                        <Fragment key={field}>
                          <Typography>{translateField && translateField(field)}</Typography>
                          <ChartBarVerticalGrouped
                            height={140}
                            layout="vertical"
                            showLegend={false}
                            barChartProps={{barCategoryGap: 15, barGap: 2}}
                            barProps={(({pre, post}) => {
                              const key = pre < post ? 'pre' : 'post'

                              return {
                                [key]: {stackId: key},
                                difference: {stackId: key},
                              }
                            })(figures)}
                            barLabelProps={Object.keys(figures).reduce(
                              (accum, key) => ({
                                ...accum,
                                [key]: {
                                  position: key === 'difference' ? 'insideRight' : 'insideLeft',
                                  style: {fill: '#fff'},
                                  content:
                                    key === 'difference'
                                      ? `${m.pssDashboard.prePostWidget[key as keyof typeof figures]} ${toPercent(figures.difference / Math.max(figures.post, figures.pre))}`
                                      : m.pssDashboard.prePostWidget[key as keyof typeof figures],
                                },
                              }),
                              {},
                            )}
                            data={[
                              {
                                category: translateField ? translateField(field) : field,
                                bars: Object.entries(figures).map(([name, value]) => ({
                                  key: name,
                                  label: m.pssDashboard.prePostWidget[name as keyof typeof figures],
                                  value,
                                  color: colorByQuestion[name],
                                })),
                              },
                            ]}
                          />
                        </Fragment>
                      )
                    })}
                </Div>
                <Box display="flex" gap={4}>
                  <LegendItem color={colorByQuestion.pre} label={m.pssDashboard.prePostWidget.pre} />
                  <LegendItem color={colorByQuestion.post} label={m.pssDashboard.prePostWidget.post} />
                  <LegendItem color={colorByQuestion.difference} label={m.pssDashboard.prePostWidget.difference} />
                </Box>
              </PanelBody>
            </Panel>
            <Panel title={m.pssDashboard.inprovementStatsWidget.titleGeneral}>
              <PanelBody sx={{flexDirection: 'row', display: 'flex', gap: 2, paddingRight: 5}}>
                <ChartPieWidget
                  sx={{flex: 1}}
                  color={theme.palette.success.main}
                  title={<Txt size="small">{m.pssDashboard.inprovementStatsWidget.labels.improved}</Txt>}
                  value={improvements.general.positive}
                  base={improvements.base}
                />
                <ChartPieWidget
                  sx={{flex: 1}}
                  color={theme.palette.warning.main}
                  title={<Txt size="small">{m.pssDashboard.inprovementStatsWidget.labels.notImproved}</Txt>}
                  value={improvements.general.negative}
                  base={improvements.base}
                />
              </PanelBody>
            </Panel>
            <Panel title={m.pssDashboard.inprovementStatsWidget.titleDistress}>
              <PanelBody sx={{flexDirection: 'row', display: 'flex', gap: 2, paddingRight: 5}}>
                <ChartPieWidget
                  sx={{flex: 1}}
                  color={theme.palette.success.main}
                  title={<Txt size="small">{m.pssDashboard.inprovementStatsWidget.labels.improved}</Txt>}
                  value={improvements.distress.positive}
                  base={improvements.base}
                />
                <ChartPieWidget
                  sx={{flex: 1}}
                  color={theme.palette.warning.main}
                  title={<Txt size="small">{m.pssDashboard.inprovementStatsWidget.labels.notImproved}</Txt>}
                  value={improvements.distress.negative}
                  base={improvements.base}
                />
              </PanelBody>
            </Panel>
            <Panel title={m.pssDashboard.inprovementStatsWidget.titleCoping}>
              <PanelBody sx={{flexDirection: 'row', display: 'flex', gap: 2, paddingRight: 5}}>
                <ChartPieWidget
                  sx={{flex: 1}}
                  color={theme.palette.success.main}
                  title={<Txt size="small">{m.pssDashboard.inprovementStatsWidget.labels.improved}</Txt>}
                  value={improvements.coping.positive}
                  base={improvements.base}
                />
                <ChartPieWidget
                  sx={{flex: 1}}
                  color={theme.palette.warning.main}
                  title={<Txt size="small">{m.pssDashboard.inprovementStatsWidget.labels.notImproved}</Txt>}
                  value={improvements.coping.negative}
                  base={improvements.base}
                />
              </PanelBody>
            </Panel>
            <Panel title={m.pssDashboard.inprovementStatsWidget.titleWho5}>
              <PanelBody sx={{flexDirection: 'row', display: 'flex', gap: 2, paddingRight: 5}}>
                <ChartPieWidget
                  sx={{flex: 1}}
                  color={theme.palette.success.main}
                  title={<Txt size="small">{m.pssDashboard.inprovementStatsWidget.labels.improved}</Txt>}
                  value={improvements.who5.positive}
                  base={improvements.base}
                />
                <ChartPieWidget
                  sx={{flex: 1}}
                  color={theme.palette.warning.main}
                  title={<Txt size="small">{m.pssDashboard.inprovementStatsWidget.labels.notImproved}</Txt>}
                  value={improvements.who5.negative}
                  base={improvements.base}
                />
              </PanelBody>
            </Panel>
          </Div>
          <Div column>
            <Panel title={m.individualsCount}>
              <PanelBody>
                <MapSvgByOblast
                  sx={{maxWidth: 480, margin: 'auto'}}
                  fillBaseOn="value"
                  total={data.flatFiltered.length}
                  getOblast={({ben_det_oblast}) => OblastIndex.byName(capitalize(ben_det_oblast!))?.iso!}
                  data={data.flatFiltered}
                />
              </PanelBody>
            </Panel>
            <Panel title={m.ageGroup}>
              <PanelBody>
                <AgeGroupTable
                  tableId="protection-dashboard"
                  persons={data.flatFiltered}
                  enableDisplacementStatusFilter
                  enablePwdFilter
                />
              </PanelBody>
            </Panel>
            <Panel title={m.displacementStatus}>
              <PanelBody>
                <ChartBarSingleBy
                  data={data.flatFiltered}
                  by={(_) => _.displacement}
                  label={Person.DisplacementStatus}
                />
              </PanelBody>
            </Panel>
            <Panel title={m.project}>
              <PanelBody>
                {data.filtered && (
                  <ChartBarSingleBy
                    data={data.filtered}
                    by={({project}) => project!}
                    label={translateOption('project')?.reduce(
                      (result, {value, label}) => ({
                        ...result,
                        [value]: label,
                      }),
                      {} as Record<string, string>,
                    )}
                  />
                )}
              </PanelBody>
            </Panel>
          </Div>
        </Div>
      </Div>
    </Page>
  )
}

export {DashboardPss}
