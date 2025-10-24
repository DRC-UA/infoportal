import {useMemo, type FC} from 'react'
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
  const filteredIndividualSessions = data?.filtered.filter(({activity}) => activity === 'ais') ?? []
  const participantsById = useMemo(
    () =>
      Object.entries(
        groupBy({
          data: data?.flatFiltered.compactBy('participant_code') ?? [],
          groups: [
            {
              by: ({participant_code}) => participant_code!,
            },
          ],
          finalTransform: (array) => array[0].participant_code,
        }).groups,
      ).length,
    [data?.flatFiltered],
  )

  if (!data) return null

  return (
    <Page width="lg" loading={fetcher.loading}>
      <DataFilterLayout
        data={data.filtered}
        filters={filters.filters}
        shapes={filters.shape}
        setFilters={filters.setFilters}
        onClear={() => {
          filters.setFilters({})
          filters.setPeriod({})
        }}
        before={
          <>
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
          </>
        }
      />
      <Div column>
        <Div responsive>
          <Div column>
            <Div sx={{alignItems: 'stretch'}}>
              <SlideWidget sx={{flex: 1}} icon="groups" title={pluralizeSessions(data.filtered.length)!}>
                {formatLargeNumber(data.filtered.length)}
              </SlideWidget>
              <SlideWidget sx={{flex: 1}} icon="person" title={pluralizeIndividuals(data.flatFiltered.length)!}>
                {formatLargeNumber(data.flatFiltered.length)}
              </SlideWidget>
            </Div>
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
            <Panel title={translateOptions('activity').find(({value}) => value === 'ais')?.label}>
              <PanelBody>
                <Div sx={{alignItems: 'stretch'}}>
                  <SlideWidget
                    sx={{flex: 1}}
                    icon="group"
                    title={pluralizeSessions(filteredIndividualSessions.length)!}
                  >
                    {formatLargeNumber(filteredIndividualSessions.length)}
                  </SlideWidget>
                  <SlideWidget sx={{flex: 1}} icon="person" title={pluralizeIndividuals(participantsById)!}>
                    {formatLargeNumber(participantsById)}
                  </SlideWidget>
                </Div>
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
