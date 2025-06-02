import {useState} from 'react'
import {Obj, seq} from '@axanc/ts-utils'
import {format, isAfter, compareAsc} from 'date-fns'
import {Box, FormControlLabel, Grid2, Switch, Typography, useTheme} from '@mui/material'

import {KoboIndex, KoboMetaStatus, OblastIndex, Person} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {MetaDashboardActivityPanel} from '@/features/Meta/Dashboard/MetaDashboardActivityPanel'
import {useMetaContext} from '@/features/Meta/MetaContext'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {ChartBarMultipleByKey} from '@/shared/charts/ChartBarMultipleByKey'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarVertical} from '@/shared/charts/ChartBarVertical'
import {CustomAvgHHSizeTooltip} from '@/shared/charts/CustomTooltips'
import {ChartLine} from '@/shared/charts/ChartLine'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {Lazy} from '@/shared/Lazy'
import {Map} from '@/shared/maps/Map'
import {Page} from '@/shared/Page'
import {Panel, PanelBody} from '@/shared/Panel'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Txt} from '@/shared/Txt'

export const MetaDashboard = () => {
  const t = useTheme()
  const {m, formatLargeNumber} = useI18n()
  const [showProjectsBy, setShowProjectsBy] = usePersistentState<'donor' | 'project'>('donor', {
    storageKey: 'meta-dashboard-showProject',
  })
  const {data: ctx, fetcher} = useMetaContext()
  const [showNullishDisplacementStatus, setShowNullishDisplacementStatus] = useState(true)
  const handleDisplacementAdornmentClick = () => setShowNullishDisplacementStatus((prev) => !prev)
  const avgHHSize = (ctx.filteredUniquePersons.length / ctx.filteredUniqueData.length).toFixed(2)

  return (
    <Page width="lg" loading={fetcher.loading}>
      <Grid2 container sx={{mb: 2}} columnSpacing={2}>
        <Grid2 size={{xs: 6, md: 4, lg: 2}}>
          <SlideWidget sx={{flex: 1}} icon="electrical_services" title={m._meta.pluggedKobo}>
            <Lazy
              deps={[ctx.filteredData]}
              fn={() => {
                return ctx.filteredData.distinct((_) => _.formId).length
              }}
            >
              {(_) => formatLargeNumber(_)}
            </Lazy>
          </SlideWidget>
        </Grid2>
        <Grid2 size={{xs: 6, md: 4, lg: 2}}>
          <SlideWidget sx={{flex: 1}} icon="storage" title={m.submissions}>
            {formatLargeNumber(ctx.filteredData.length)}
          </SlideWidget>
        </Grid2>
        <Grid2 size={{xs: 6, md: 4, lg: 2}}>
          <SlideWidget sx={{flex: 1}} icon="home" title={m.hhs}>
            {formatLargeNumber(ctx.filteredUniqueData.length)}
          </SlideWidget>
        </Grid2>
        <Grid2 size={{xs: 6, md: 4, lg: 2}}>
          <SlideWidget sx={{flex: 1}} icon="group" title={m.hhSize}>
            {avgHHSize}
          </SlideWidget>
        </Grid2>
        <Grid2 size={{xs: 6, md: 4, lg: 2}}>
          <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
            {formatLargeNumber(ctx.filteredPersons.length)}
          </SlideWidget>
        </Grid2>
        <Grid2 size={{xs: 6, md: 4, lg: 2}}>
          <SlideWidget sx={{flex: 1}} icon="person" title={m.uniqIndividuals}>
            {formatLargeNumber(ctx.filteredUniquePersons.length)}
          </SlideWidget>
        </Grid2>
      </Grid2>
      <Div responsive>
        <Div column>
          <Map
            data={ctx.filteredData}
            getSettlement={(_) => _.settlement}
            getOblast={(_) => OblastIndex.byName(_.oblast).iso}
          />
          <SlidePanel title={m.ageGroup}>
            <AgeGroupTable
              tableId="meta-dashboard"
              persons={ctx.filteredPersons}
              enableDisplacementStatusFilter
              enablePwdFilter
            />
            <Box display="flex" gap={2} mt={2}>
              <SlideWidget icon="equalizer" title={m.avgAge}>
                {Person.averageAge(ctx.filteredPersons)}
              </SlideWidget>
              <SlideWidget icon="man" title={m.male}>
                {Person.averageAge(ctx.filteredPersons, Person.Gender.Male)}
              </SlideWidget>
              <SlideWidget icon="woman" title={m.female}>
                {Person.averageAge(ctx.filteredPersons, Person.Gender.Female)}
              </SlideWidget>
            </Box>
          </SlidePanel>
          <Panel
            title={
              <Typography sx={{fontSize: '1.3rem', fontWeight: 500}}>
                {m.avgHHSize}: <strong>{avgHHSize}</strong>
              </Typography>
            }
          >
            <PanelBody>
              <ChartBarVertical
                hideLegends
                showGrid
                height={140}
                axes={{
                  y: {domain: [1], tick: {fill: t.palette.text.primary}},
                  x: {tick: {fill: t.palette.text.primary}},
                }}
                extraKeys={[m.households]}
                slotProps={{
                  CartesianGrid: {
                    strokeDasharray: '5 5',
                    strokeOpacity: 0.4,
                  },
                  Tooltip: {
                    content: CustomAvgHHSizeTooltip,
                  },
                }}
                data={Object.entries(ctx.filteredData.groupBy(({date}) => format(date, 'yyyy-MM')))
                  .map(([name, value]) => ({
                    name,
                    [m.households]: value.length,
                    [m.avgHHSize]: Number(
                      (value.reduce((accum, current) => accum + (current.personsCount || 0), 0) / value.length).toFixed(
                        2,
                      ),
                    ),
                  }))
                  .sort(({name: d1}, {name: d2}) => compareAsc(d1, d2))}
              />
              {Object.entries(ctx.shapeFilters)
                .filter(([, values]) => !!values?.length)
                .map(([label, values]) => (
                  <Typography fontSize="small">
                    {label}: {values?.reduce((accum, current) => `${accum}, ${current}`)}
                  </Typography>
                ))}
            </PanelBody>
          </Panel>
          <Panel
            title={m.displacementStatus}
            slots={{
              titleEndAdornment: FormControlLabel,
            }}
            slotProps={{
              titleEndAdornment: {
                control: <Switch checked={showNullishDisplacementStatus} size="small" />,
                label: m.includeNotSpecified,
                onChange: handleDisplacementAdornmentClick,
                labelPlacement: 'start',
              },
            }}
          >
            <PanelBody>
              <ChartBarSingleBy
                data={ctx.filteredPersons}
                by={(_) => _.displacement}
                includeNullish={showNullishDisplacementStatus}
                label={{
                  ...Person.DisplacementStatus,
                  null: m.notSpecified,
                  undefined: m.notSpecified,
                }}
              />
            </PanelBody>
          </Panel>
          <SlidePanel title={m.form}>
            <ChartBarSingleBy
              data={ctx.filteredData}
              by={(_) => KoboIndex.searchById(_.formId)?.translation ?? _.formId}
            />
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel>
            <Lazy
              deps={[ctx.filteredData]}
              fn={() => {
                const group = ctx.filteredData.groupByAndApply(
                  (_) => _.status ?? 'Blank',
                  (_) => _.length,
                )
                return {
                  group,
                  total: seq(Obj.values(group)).sum(),
                }
              }}
            >
              {(_) => (
                <Box>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Div responsive>
                      <Div>
                        <ChartPieWidget
                          dense
                          sx={{flex: 1}}
                          color={t.palette.success.main}
                          title={<Txt size="small">{m.committed}</Txt>}
                          value={_.group.Committed ?? 0}
                          base={_.total}
                        />
                        <ChartPieWidget
                          dense
                          sx={{flex: 1}}
                          color={t.palette.warning.main}
                          title={<Txt size="small">{m.pending}</Txt>}
                          value={_.group.Pending ?? 0}
                          base={_.total}
                        />
                      </Div>
                      <Div>
                        <ChartPieWidget
                          dense
                          sx={{flex: 1}}
                          color={t.palette.error.main}
                          title={<Txt size="small">{m.rejected}</Txt>}
                          value={_.group.Rejected ?? 0}
                          base={_.total}
                        />
                        <ChartPieWidget
                          dense
                          sx={{flex: 1}}
                          color={t.palette.info.main}
                          title={<Txt size="small">{m.blank}</Txt>}
                          value={_.group.Blank ?? 0}
                          base={_.total}
                        />
                      </Div>
                    </Div>
                  </Box>
                </Box>
              )}
            </Lazy>
          </SlidePanel>
          <SlidePanel>
            <Lazy
              deps={[ctx.filteredData]}
              fn={() => {
                const gb = ctx.filteredData
                  .filter(({date}) => isAfter(date, '2013-12-31')) // filter out the dates before DRC start in Ukraine
                  .groupBy((d) => format(d.date, 'yyyy-MM'))
                const gbByCommittedDate = ctx.filteredData.groupBy((d) =>
                  d.lastStatusUpdate ? format(d.lastStatusUpdate!, 'yyyy-MM') : '',
                )
                const months = seq([...Obj.keys(gb), ...Obj.keys(gbByCommittedDate)])
                  .distinct((_) => _)
                  .sort()
                return months.map((month) => ({
                  name: month,
                  [m.submissionTime]: gb[month]?.length ?? 0,
                  [m.committed]:
                    gbByCommittedDate[month]?.filter((_) => _.status === KoboMetaStatus.Committed).length ?? 0,
                }))
              }}
            >
              {(_) => (
                <ChartLine
                  fixMissingMonths
                  hideYTicks
                  height={200}
                  data={_ as any}
                  colors={() => [t.palette.primary.main, t.palette.success.main]}
                  hideLabelToggle
                />
              )}
            </Lazy>
          </SlidePanel>
          <SlidePanel>
            <ScRadioGroup value={showProjectsBy} onChange={setShowProjectsBy} inline dense>
              <ScRadioGroupItem hideRadio value="donor" title={m.donor} />
              <ScRadioGroupItem hideRadio value="project" title={m.project} />
            </ScRadioGroup>
            <ChartBarMultipleByKey data={ctx.filteredData} property={showProjectsBy} />
          </SlidePanel>
          <MetaDashboardActivityPanel />
        </Div>
      </Div>
    </Page>
  )
}
