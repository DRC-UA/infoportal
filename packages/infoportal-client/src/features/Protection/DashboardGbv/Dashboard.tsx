import type {FC} from 'react'
import {Icon, Box, Typography} from '@mui/material'
import {FilterAlt} from '@mui/icons-material'
import {seq} from '@axanc/ts-utils'

import {capitalize, OblastIndex, toPercent} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {Page} from '@/shared'
import {ChartBarVerticalGrouped} from '@/shared/charts/ChartBarGrouped'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {usePlurals} from '@/utils'

import {useTranslations, useGbvConceptsFilters} from './hooks'
import {colorByQuestion, groupTrainingsByTopic, meanCounter, sanitizeTests} from './utils'
import type {Scores} from './types'

const GbvConceptsDashboard: FC = () => {
  const {count, data, filters, setFilters, loading, shape, period, setPeriod, stats} = useGbvConceptsFilters()
  const {m, formatLargeNumber} = useI18n()
  const {translateOption, translateField} = useTranslations()
  const clearFilters = () => {
    setPeriod({})
    setFilters({})
  }
  const pluralizeSubmissions = usePlurals(m.plurals.submission)
  const testsByTopic = groupTrainingsByTopic(data)

  return (
    <Page width="lg" loading={loading}>
      <DataFilterLayout
        data={data}
        filters={filters}
        shapes={shape}
        setFilters={setFilters}
        onClear={clearFilters}
        before={
          <PeriodPicker
            value={[period?.start, period?.end]}
            defaultValue={[period?.start, period?.end]}
            onChange={([start, end]) => {
              setPeriod((prev) => ({...prev, start, end}))
            }}
            label={[m.start, m.endIncluded]}
            max={new Date()}
            fullWidth={false}
          />
        }
      />
      <Div sx={{alignItems: 'stretch'}} mb={2}>
        <SlideWidget sx={{flex: 1}} icon="checklist" title={pluralizeSubmissions(data?.length ?? 0)!}>
          {formatLargeNumber(count)}
        </SlideWidget>
        <SlideWidget
          sx={{flex: 1}}
          icon={<FilterAlt color="disabled" sx={{mr: 1}} fontSize="large" />}
          title="Filtered sumissions"
        >
          {formatLargeNumber(data?.length)}
        </SlideWidget>
        <SlideWidget sx={{flex: 1}} icon={<FilterAlt color="disabled" sx={{mr: 1}} fontSize="large" />} title="PRE">
          {formatLargeNumber(stats?.no?.length)}
        </SlideWidget>
        <SlideWidget sx={{flex: 1}} icon={<FilterAlt color="disabled" sx={{mr: 1}} fontSize="large" />} title="POST">
          {formatLargeNumber(stats?.yes?.length)}
        </SlideWidget>
      </Div>
      <Div responsive>
        <Div column>
          <Panel title={m.project}>
            <PanelBody>
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={({project_code}) => project_code!}
                includeNullish
                label={translateOption('project_code')?.reduce(
                  (result, {value, label}) => ({
                    ...result,
                    [value]: label,
                  }),
                  {} as Record<string, string>,
                )}
              />
            </PanelBody>
          </Panel>
          <Panel title={m.topic}>
            <PanelBody>
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={({topic}) => topic!}
                includeNullish
                label={translateOption('topic')?.reduce(
                  (result, {value, label}) => ({
                    ...result,
                    [value]: label,
                  }),
                  {} as Record<string, string>,
                )}
              />
            </PanelBody>
          </Panel>
          <Panel title={m.gbvPrePostDahsboard.widgets.scoresByTopic.title}>
            {testsByTopic &&
              Object.entries(testsByTopic).map(([topic, figures]) => {
                const scores = seq(
                  Object.values(figures)
                    .map(sanitizeTests)
                    .filter((tests) => !(tests as {issues?: true}).issues) as Scores[],
                )
                const meanFigures = meanCounter(scores)

                return (
                  <PanelBody key={topic}>
                    <Typography mb={2}>
                      {translateOption('topic')?.find(({value}) => value === topic)?.label ??
                        'Topic subject not specified'}
                    </Typography>
                    {scores.length > 0 ? (
                      <ChartBarVerticalGrouped
                        height={140}
                        layout="vertical"
                        showLegend={false}
                        barChartProps={{barCategoryGap: 15, barGap: 2}}
                        barProps={(({pre, post}) => {
                          const key = pre < post ? 'post' : 'pre'

                          return {
                            [key]: {stackId: key},
                            difference: {stackId: key},
                          }
                        })(figures)}
                        barLabelProps={Object.keys(meanFigures).reduce(
                          (accum, key) => ({
                            ...accum,
                            [key]: {
                              position: key === 'difference' ? 'insideRight' : 'insideLeft',
                              style: {fill: '#fff'},
                              content:
                                key === 'difference'
                                  ? `${m.pssDashboard.prePostWidget[key as keyof typeof meanFigures]} ${toPercent(meanFigures.difference / Math.max(meanFigures.post, meanFigures.pre))}`
                                  : `${m.pssDashboard.prePostWidget[key as keyof typeof meanFigures]}: ${meanFigures[key as keyof typeof meanFigures].toFixed(2)}`,
                            },
                          }),
                          {},
                        )}
                        data={[
                          {
                            category: translateField ? translateField(topic) : topic,
                            bars: Object.entries(meanCounter(scores)).map(([key, value]) => ({
                              key,
                              label: key,
                              value,
                              color: colorByQuestion[key],
                            })),
                          },
                        ]}
                      />
                    ) : (
                      <Box
                        sx={{
                          textAlign: 'center',
                          mt: 2,
                          color: (t) => t.palette.text.disabled,
                        }}
                      >
                        <Icon sx={{fontSize: '3em !important'}}>block</Icon>
                        <Box>{m.missingOrFaulty}</Box>
                      </Box>
                    )}
                  </PanelBody>
                )
              })}
          </Panel>
        </Div>
        <Div column>
          <Panel title={m.gbvPrePostDahsboard.widgets.map.title}>
            <PanelBody>
              <MapSvgByOblast
                data={data ?? seq([])}
                fillBaseOn="value"
                total={data?.length}
                getOblast={({oblast_training}) =>
                  oblast_training ? OblastIndex.byName(capitalize(oblast_training))?.iso! : undefined
                }
              />
            </PanelBody>
          </Panel>
        </Div>
      </Div>
    </Page>
  )
}

export default GbvConceptsDashboard
