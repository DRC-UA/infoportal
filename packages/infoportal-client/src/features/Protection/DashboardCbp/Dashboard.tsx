import {useMemo, type FC} from 'react'
import {match, seq, Obj} from '@axanc/ts-utils'
import {Badge, Box, Icon, Tooltip, Typography} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import {format} from 'date-fns'

import {capitalize, groupBy, OblastIndex, toPercent} from 'infoportal-common'

import {formatLargeNumber, useI18n} from '@/core/i18n'
import {today} from '@/features/Mpca/Dashboard/MpcaDashboard'
import {Page} from '@/shared'
import {ChartBarVerticalGrouped} from '@/shared/charts/ChartBarGrouped'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody, PanelHead} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {usePlurals} from '@/utils'

import {PssContextProvider, useCbpContext} from './Context'
import {useTranslations} from './hooks'

const baseColors = ['#6b0606', '#a12222', '#cf5959']

const DashboardCbp: FC = () => (
  <PssContextProvider>
    <PssDashboardWithContext />
  </PssContextProvider>
)

const PssDashboardWithContext: FC = () => {
  const {data, fetcher, filters} = useCbpContext()
  const {m, currentLang} = useI18n()
  const {translateOption, translateField} = useTranslations()
  const clearFilters = () => [filters.setFilters, filters.setPeriod].forEach((callback) => callback({}))
  const prePostTranslatedLabels = translateOption('complete_training')?.map(({label}) => label)
  const pluralizeSubmission = usePlurals(m.plurals.submissionLocative)
  const pluralizePreTest = usePlurals(m.plurals.preTest)
  const pluralizePostTest = usePlurals(m.plurals.postTest)
  const groupsByTopic = useMemo(
    () =>
      groupBy({
        data: data?.scored ?? [],
        groups: [{by: ({topic}) => topic!}],
        finalTransform: (chunk) =>
          chunk.map(
            ({
              complete_training,
              unique_code,
              cal_total_advocacy,
              cal_total_group_facilitation_skills,
              cal_total_hum_pri_pro_mai,
              cal_total_leadership_self_organization,
              cal_total_pfa,
              cal_total_protection_risks_analysis,
              cal_total_pseah,
              cal_total_roles_responsibilities_cbs,
              cal_total_safe_referrals,
            }) => ({
              type: translateOption('complete_training')?.find(({value}) => value === complete_training)?.label,
              unique_code,
              cal_total_advocacy,
              cal_total_group_facilitation_skills,
              cal_total_hum_pri_pro_mai,
              cal_total_leadership_self_organization,
              cal_total_pfa,
              cal_total_protection_risks_analysis,
              cal_total_pseah,
              cal_total_roles_responsibilities_cbs,
              cal_total_safe_referrals,
            }),
          ),
      }).groups,
    [data?.scored],
  )

  const prePostResults = Obj.entries(groupsByTopic)
    .map(([topic, group]) => ({
      topic,
      scores: groupBy({
        data: group,
        groups: [{by: ({type}) => type!}],
        finalTransform: (group, [type]) => {
          const key = match(topic)
            .cases({
              hum_pri_pro_main: 'cal_total_hum_pri_pro_mai' as const,
              safe_referrals: 'cal_total_safe_referrals' as const,
              advocacy: 'cal_total_advocacy' as const,
              pfa: 'cal_total_pfa' as const,
              pseah: 'cal_total_pseah' as const,
              group_facilitation_skills: 'cal_total_group_facilitation_skills' as const,
              roles_responsibilities_cbs: 'cal_total_roles_responsibilities_cbs' as const,
              leadership_self_organization: 'cal_total_leadership_self_organization' as const,
              protection_risks_analysis: 'cal_total_protection_risks_analysis' as const,
            })
            .exhaustive()
          const filteredGroup = group.filter((record) => !isNaN(Number(record[key]))) // filter not convertable to numbers entries out

          return {
            type,
            value:
              filteredGroup.length > 0
                ? filteredGroup.reduce((a, b) => a + Number(b[key]), 0) / filteredGroup.length
                : 0,
          }
        },
      }).transforms,
    }))
    .map(({topic, scores}) => {
      const values = scores.reduce(
        (accum, {type, value}) => ({...accum, [type]: value}),
        {} as Partial<Record<string, number>>,
      )
      const progress = scores.every(({type}) => prePostTranslatedLabels?.includes(type))
        ? Math.abs(Obj.values(values)[0]! - Obj.values(values)[1]!)
        : 0

      return {
        topic,
        scores: [
          ...scores,
          {
            type: 'progress',
            value: progress,
            fraction: progress / Math.min(Obj.values(values)[0]!, Obj.values(values)[1]!),
          },
        ],
      }
    })

  const chartTitleSupnote = (count: number, lang: typeof currentLang) =>
    match(lang)
      .cases({
        uk: `Ґрунтується на ${count} ${pluralizeSubmission(count)?.toLowerCase()}`,
        en: `Based on ${count} ${pluralizeSubmission(count)?.toLocaleLowerCase()}`,
      })
      .exhaustive()
  const colorByQuestion: Record<string, string> = Object.fromEntries(
    [...(prePostTranslatedLabels ?? []), 'progress'].map((q, i) => [q, baseColors[i % baseColors.length]]),
  )

  const avgProgress = toPercent(
    prePostResults
      .flatMap(({scores}) => scores.map((score) => (score as {fraction: number}).fraction))
      .filter((fraction) => fraction !== undefined)
      .reduce((a, b) => a + b, 0) / prePostResults.length,
  )

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
        <Div responsive>
          <Div column>
            <Panel title={m.topic}>
              <PanelBody>
                <ChartBarSingleBy
                  data={data.scored}
                  by={({topic}) => topic}
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
            <PanelHead>{m.cbpDashboard.prePostTestScores}</PanelHead>
            <SlideWidget
              sx={{flex: 1}}
              icon={<TrendingUpIcon color="disabled" sx={{mr: 1}} fontSize="large" />}
              title={m.cbpDashboard.avgProgress}
            >
              {avgProgress}
            </SlideWidget>
            <Panel>
              <PanelBody>
                {prePostResults.map(({topic, scores}) =>
                  scores.length < 3 || scores.reduce((sum, {value}) => sum + value, 0) === 0 ? (
                    <Box key={topic} sx={{'& + &': {mt: 2}}}>
                      <Typography>{translateOption('topic')?.find(({value}) => value === topic)?.label}</Typography>
                      <ChartBarSingleBy data={seq([])} by={({topic}) => topic} />
                    </Box>
                  ) : (
                    <Box key={topic} sx={{'& + &': {mt: 2}}}>
                      <Tooltip
                        title={chartTitleSupnote(
                          data.scored.filter(({topic: searchedTopic}) => topic === searchedTopic).length,
                          currentLang,
                        )}
                        placement="top-end"
                      >
                        <Badge
                          badgeContent={
                            <Icon fontSize="small" sx={{ml: 2}}>
                              info
                            </Icon>
                          }
                        >
                          <Typography display="inline-block">
                            {translateOption('topic')?.find(({value}) => value === topic)?.label!}
                          </Typography>
                        </Badge>
                      </Tooltip>
                      <ChartBarVerticalGrouped
                        height={140}
                        layout="vertical"
                        showLegend={false}
                        barChartProps={{barCategoryGap: 15, barGap: 2}}
                        barProps={((scores) => {
                          const min = scores
                            .filter(({type}) => prePostTranslatedLabels?.includes(type))
                            .reduce((min, current) => (min.value > current.value ? current : min), scores[0])

                          return {
                            [min.type]: {stackId: min.type},
                            progress: {stackId: min.type},
                          }
                        })(scores)}
                        barLabelProps={Object.values(scores).reduce((accum, {type: key, value}) => {
                          const noDiff = scores.filter(({type}) => prePostTranslatedLabels?.includes(type))

                          return {
                            ...accum,
                            [key]: {
                              position: key === 'progresss' ? 'insideRight' : 'insideLeft',
                              style: {fill: '#fff'},
                              content:
                                key === 'progress'
                                  ? `${m.cbpDashboard.progressLabel} ${toPercent(value / Math.min(...noDiff.map(({value}) => value)))}`
                                  : `${key}: ${value.toFixed(2)}`,
                            },
                          }
                        }, {})}
                        data={[
                          {
                            category: translateField ? translateField(topic) : topic,
                            bars: scores.map(({type, value}) => ({
                              key: type,
                              label: type,
                              value: Number(value!.toFixed(2)),
                              color: colorByQuestion[type],
                            })),
                          },
                        ]}
                      />
                    </Box>
                  ),
                )}
              </PanelBody>
            </Panel>
          </Div>
          <Div column>
            <Panel title={m.cbpDashboard.mapTitle}>
              <PanelBody>
                <MapSvgByOblast
                  sx={{maxWidth: 480, margin: 'auto'}}
                  fillBaseOn="value"
                  total={data.filtered.length}
                  getOblast={({location}) => OblastIndex.byName(capitalize(location!))?.iso!}
                  data={data.filtered}
                />
              </PanelBody>
            </Panel>
            <Panel title={m.cbpDashboard.timelineTitle(data.scored.length)}>
              <ChartLineBy
                sx={{mt: 1}}
                data={data.scored}
                getX={({date}) => format(date!, 'yyyy-MM')}
                getY={() => 1}
                label={m.count}
              />
            </Panel>
            <PanelHead>{m.cbpDashboard.discrepancies.title}</PanelHead>
            <Div sx={{alignItems: 'stretch'}}>
              <SlideWidget sx={{flex: 1}} icon="checklist" title={pluralizePreTest(data.counter.pre.size)!}>
                {formatLargeNumber(data.counter.pre.size)}
              </SlideWidget>
              <SlideWidget sx={{flex: 1}} icon="checklist" title={pluralizePostTest(data.counter.post.size)!}>
                {formatLargeNumber(data.counter.post.size)}
              </SlideWidget>
            </Div>
            <Div sx={{alignItems: 'stretch'}}>
              <Panel sx={{flex: 1}}>
                <PanelHead>{m.cbpDashboard.discrepancies.preList}</PanelHead>
                <PanelBody>
                  <Box sx={{maxHeight: 220, overflowY: 'auto'}}>
                    {[...data.counter.pre.difference(data.counter.post)].map((id) => (
                      <div key={id}>{id}</div>
                    ))}
                  </Box>
                </PanelBody>
              </Panel>
              <Panel sx={{flex: 1}}>
                <PanelHead>{m.cbpDashboard.discrepancies.postList}</PanelHead>
                <PanelBody>
                  <Box sx={{maxHeight: 220, overflowY: 'auto'}}>
                    {[...data.counter.post.difference(data.counter.pre)].map((id) => (
                      <div key={id}>{id}</div>
                    ))}
                  </Box>
                </PanelBody>
              </Panel>
            </Div>
          </Div>
        </Div>
      </Div>
    </Page>
  )
}

export {DashboardCbp}
