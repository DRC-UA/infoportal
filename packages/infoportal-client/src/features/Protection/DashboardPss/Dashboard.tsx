import {useMemo, type FC} from 'react'
import {match} from '@axanc/ts-utils'
import {format} from 'date-fns'

import {capitalize, groupBy, OblastIndex, Person, Protection_pss} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {today} from '@/features/Mpca/Dashboard/MpcaDashboard'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Page} from '@/shared/Page'
import {Panel, PanelBody, PanelHead} from '@/shared/Panel'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Div, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {usePlurals} from '@/utils'

import {PssContextProvider, usePssContext} from './Context'
import {useOptionsTranslation} from './hooks'

const DashboardPss: FC = () => {
  return (
    <PssContextProvider>
      <PssDashboardWithContext />
    </PssContextProvider>
  )
}

const PssDashboardWithContext: FC = () => {
  const {data, fetcher, filters} = usePssContext()
  const {m, formatLargeNumber} = useI18n()
  const {translateOptions} = useOptionsTranslation('protection_pss')
  const pluralizeSessions = usePlurals(m.plurals.session)
  const pluralizeIndividuals = usePlurals(m.plurals.individuals)
  const pluralizeUniqueIndividuals = usePlurals(m.plurals.uniqueIndividuals)
  const pluralizeSubmissions = usePlurals(m.plurals.submission)
  const filteredIndividualSessions = data?.filtered.filter(({activity}) => activity === 'ais') ?? []
  const clearFilters = () => {
    filters.setFilters({})
    filters.setPeriod({})
  }

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

  const sessionsCounter = useMemo(() => {
    const {pgs, ais, mhpss, community_dialogues_session} = groupBy({
      data: data?.filtered ?? [],
      groups: [
        {
          by: ({activity}) => activity!,
        },
      ],
      finalTransform: (input) => input,
    }).groups

    return {
      pgs: groupBy({
        data: pgs?.filter(({cycle_code}) => cycle_code !== undefined),
        groups: [{by: ({cycle_code}) => cycle_code!}],
        finalTransform: (group) => ({cycle_length: group[0]?.cycle_type}),
      }).transforms.reduce((accum, {cycle_length}) => {
        return match(cycle_length)
          .cases({
            short: accum + 5,
            short_6: accum + 6,
            long: accum + 6,
          })
          .default(0)
      }, 0),
      ais: ais?.reduce((counter, submission) => {
        const sessionsCount = [
          submission.date_session1,
          submission.date_session2,
          submission.date_session3,
          submission.date_session4,
          submission.date_session5,
          submission.date_session6,
          submission.date_session7,
          submission.date_session8,
        ].filter(Boolean).length

        return counter + sessionsCount
      }, 0),
    }
  }, [data?.flatFiltered])

  console.log(sessionsCounter)

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
            tooltip={m.pssDashboardUniqueIndividualsHint}
          >
            {distinctIndividuals.length}
          </SlideWidget>
        </Div>
        <Div responsive>
          <Div column>
            <Panel title="Distinct Individuals">
              <ChartBarSingleBy
                data={data.flatFiltered.flatMap(
                  ({hh_char_hh_det, ...rest}) =>
                    hh_char_hh_det?.map(({code_beneficiary}) => ({
                      ...rest,
                      individualId: code_beneficiary ?? 'not set',
                    })) ?? [{individualId: 'not set'}],
                )}
                by={({individualId}) => individualId}
                label={distinctIndividuals.reduce(
                  (accum, [individualId, {ids}]) => ({
                    ...accum,
                    [individualId ?? 'undefined']: `${individualId}: ${ids.join(' ')}`,
                  }),
                  {},
                )}
              />
            </Panel>
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
                    label={
                      Object.fromEntries(
                        translateOptions('activity').map(({value, label}) => [value, label]),
                      ) as Record<Protection_pss.Option<'activity'>, string>
                    }
                  />
                )}
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
                    label={
                      Object.fromEntries(translateOptions('project').map(({value, label}) => [value, label])) as Record<
                        Protection_pss.Option<'project'>,
                        string
                      >
                    }
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
