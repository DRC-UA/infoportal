import {useMemo, type FC} from 'react'
import {format} from 'date-fns'

import {capitalize, groupBy, OblastIndex, Person, Protection_pss} from 'infoportal-common'

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
import {useTranslations, useSessionsCounter} from './hooks'
import {colorByQuestion, prePostSummaryBuilder} from './utils'

const DashboardPss: FC = () => (
  <PssContextProvider>
    <PssDashboardWithContext />
  </PssContextProvider>
)

const PssDashboardWithContext: FC = () => {
  const {data, fetcher, filters} = usePssContext()
  const {m, formatLargeNumber} = useI18n()
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

  const distinctIndividuals = useMemo(
    () =>
      Object.entries(
        groupBy({
          data:
            data?.flatFiltered
              .flatMap(({hh_char_hh_det, id}) => hh_char_hh_det?.map((char) => ({...char, id})) ?? [])
              .filter(({code_beneficiary}) => Boolean(code_beneficiary)) ?? [],
          groups: [
            {
              by: ({code_beneficiary}) => code_beneficiary!,
            },
          ],
          finalTransform: (input) => ({occurrences: input.length, ids: input?.map(({id}) => id)}),
        }).groups,
      ),
    [data?.flatFiltered],
  )

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
            title={`${pluralizeUniqueIndividuals(distinctIndividuals.length)}*`}
            tooltip={m.pssDashboard.uniqueIndividualsHint}
          >
            {distinctIndividuals.length}
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
              <PanelBody sx={{display: 'flex'}}>
                {prePostTests &&
                  Object.entries(prePostTests).map(([field, figures]) => {
                    return (
                      <ChartBarVerticalGrouped
                        key={field}
                        height={400}
                        showLegend={false}
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
                    )
                  })}
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
