import {Page} from '@/shared/Page'
import {CfmData, CfmDataOrigin, CfmStatusIconLabel, useCfmContext} from '@/features/Cfm/CfmContext'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import React, {useMemo, useState} from 'react'
import {KoboIndex, KoboMealCfmStatus, Meal_cfmInternal, Period, PeriodHelper} from 'infoportal-common'
import {Panel, PanelBody} from '@/shared/Panel'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Div} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {today} from '@/features/Mpca/Dashboard/MpcaDashboard'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Obj, seq} from '@axanc/ts-utils'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {appConfig} from '@/conf/AppConfig'
import {ChartLineBy} from '@/shared/charts/ChartLineBy'
import {format} from 'date-fns'
import {Txt} from '@/shared/Txt'
import {AppAvatar} from '@/shared/AppAvatar'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {KoboXmlMapper} from 'infoportal-common'

const feedbacTypeLabel = {
  apprec_com: `Appreciation or compliments`,
  request_info: `Request for information`,
  request_assistance: `Request for support or assistance`,
  non_s_feedback: `Non-sensitive programmatic feedback`,
  sen_feedback: `Sensitive - Protection issue reported`,
  coc: `Sensitive CoC violation by DRC staff and representatives`,
  violation_other: `Sensitive - Seriously violation by other humanitarian actor (non-DRC staff)`,
  sen_safety: `Sensitive - Safety and security threat.`,
} as const

export const CfmDashboard = () => {
  const ctx = useCfmContext()
  const [period, setPeriod] = useState<Partial<Period>>({})
  const {m, formatLargeNumber} = useI18n()

  const shape = useMemo(() => {
    const d = ctx.mappedData ?? seq([])
    return DataFilter.makeShape<CfmData>({
      office: {
        icon: 'forum',
        label: m.category,
        getValue: (_) => _.category ?? DataFilter.blank,
        getOptions: () =>
          d
            .flatMap((_) => _.category!)
            .distinct((_) => _)
            .sort()
            .map((_) => DataFilter.buildOption(_ ?? DataFilter.blank, feedbacTypeLabel[_])),
      },
      source: {
        icon: 'share',
        label: m.origin,
        getValue: (_) => _.origin,
        getOptions: () => DataFilter.buildOptionsFromObject(CfmDataOrigin),
      },
      status: {
        icon: 'check_circle',
        label: m.status,
        getValue: (_) => _.tags?.status,
        getOptions: () =>
          Obj.keys(KoboMealCfmStatus).map((_) =>
            DataFilter.buildOption(_, <CfmStatusIconLabel status={KoboMealCfmStatus[_]} />),
          ),
      },
      benefOrigin: {
        icon: 'person',
        label: m._cfm.benefOrigin,
        getValue: (_) => _.benef_origin,
        getOptions: (d) =>
          DataFilter.buildOptions(
            d()
              .map((_) => _.benef_origin)
              .distinct((_) => _)
              .compact()
              .get(),
            true,
          ),
      },
      oblast: {
        icon: appConfig.icons.oblast,
        label: m.oblast,
        getValue: (_) => _.oblast,
        getOptions: () =>
          DataFilter.buildOptions(
            d
              .flatMap((_) => _.oblast!)
              .distinct((_) => _)
              .sort(),
          ),
      },
      raion: {
        label: m.raion,
        getValue: (_) => _.ben_det_raion ?? DataFilter.blank,
        getOptions: (get) =>
          get()
            .flatMap((_) => _.ben_det_raion!)
            .distinct((_) => _)
            .sort()
            .map((_: any) => DataFilter.buildOption(_ ?? DataFilter.blank, KoboXmlMapper.Location.getRaionLabel(_))),
      },
      hromada: {
        label: m.hromada,
        getValue: (_) => _.ben_det_hromada ?? DataFilter.blank,
        getOptions: (get) =>
          get()
            .flatMap((_) => _.ben_det_hromada!)
            .distinct((_) => _)
            .sort()
            .map((_: any) => DataFilter.buildOption(_ ?? DataFilter.blank, KoboXmlMapper.Location.getHromadaLabel(_))),
      },
      project: {
        label: m.project,
        getValue: (_) => _.tags?.project ?? _.project ?? DataFilter.blank,
        getOptions: (get) =>
          get()
            .flatMap((entry) => entry.tags?.project)
            .distinct((entry) => entry)
            .sort()
            .map((_: any) => DataFilter.buildOption(_ ?? DataFilter.blank, _)),
      },
      program: {
        label: m.program,
        getValue: (_) => _.tags?.program ?? DataFilter.blank,
        getOptions: (get) =>
          get()
            .flatMap((_) => _.tags?.program!)
            .distinct((_) => _)
            .sort()
            .map((_: any) => DataFilter.buildOption(_ ?? DataFilter.blank, _)),
      },
    })
  }, [ctx.mappedData])

  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof shape>>(
    {},
    {storageKey: 'cfm-dashboard-filters'},
  )

  const filteredByDateData = useMemo(() => {
    return ctx.mappedData.filter((_) => PeriodHelper.isDateIn(period, _.submissionTime))
  }, [period, ctx.mappedData])

  const filteredData = useMemo(() => {
    return DataFilter.filterData(filteredByDateData, shape, filters)
  }, [filteredByDateData, filters])

  return (
    <Page width="lg" loading={ctx.fetching}>
      <DataFilterLayout
        filters={filters}
        shapes={shape}
        data={filteredByDateData}
        setFilters={setFilters}
        onClear={() => {
          setFilters({})
          setPeriod({})
        }}
        before={
          <>
            <PeriodPicker
              value={[period.start, period.end]}
              defaultValue={[period.start, period.end]}
              onChange={([start, end]) => {
                setPeriod((prev) => ({...prev, start, end}))
              }}
              label={[m.start, m.endIncluded]}
              max={today}
              fullWidth={false}
            />
          </>
        }
      />
      <Div responsive>
        <Div column>
          <Panel title={`${m.data} (${formatLargeNumber(filteredData.length)})`}>
            <ChartLineBy
              sx={{mt: 1}}
              data={filteredData}
              getX={(_) => format(_.submissionTime!, 'yyyy-MM')}
              getY={(_) => 1}
              label={m.count}
            />
          </Panel>
          <Panel savableAsImg expendable title={m._cfm.requestByOblast}>
            <PanelBody>
              <MapSvgByOblast
                sx={{maxWidth: 480, margin: 'auto'}}
                fillBaseOn="value"
                data={filteredData}
                value={(_) => true}
                getOblast={(_) => _.oblastIso!}
                base={(_) => _.oblastIso !== undefined}
              />
            </PanelBody>
          </Panel>
          <Panel savableAsImg expendable title={m._cfm.benefOrigin}>
            <PanelBody>
              <ChartBarSingleBy
                data={filteredData}
                by={(_) => _.benef_origin}
                label={Meal_cfmInternal.options.benef_origin}
              />
            </PanelBody>
          </Panel>
          <Panel savableAsImg expendable title={m._cfm.mainFp}>
            <PanelBody>
              <ChartBarSingleBy
                data={filteredData}
                by={(_) => _.tags?.focalPointEmail}
                limit={10}
                label={filteredData.reduceObject((_) => [
                  _.tags?.focalPointEmail,
                  <>
                    <AppAvatar size={24} sx={{verticalAlign: 'middle', mr: 0.5}} email={_.tags?.focalPointEmail} />
                    {_.tags?.focalPointEmail}
                  </>,
                ])}
              />
              <Txt sx={{mt: 1}} block color="hint">
                [...]
              </Txt>
            </PanelBody>
          </Panel>
        </Div>
        <Div column>
          <Panel>
            <PanelBody>
              <ChartPieWidgetBy
                title={m._cfm.dataComingFromExternalForm}
                showBase
                showValue
                data={filteredData}
                filter={(_) => _.formId === KoboIndex.byName('meal_cfmExternal').id}
              />
            </PanelBody>
          </Panel>
          <Panel savableAsImg expendable title={m.status}>
            <PanelBody>
              <ChartBarSingleBy
                data={filteredData}
                by={(_) => _.tags?.status}
                label={Obj.mapValues(KoboMealCfmStatus, (_) => (
                  <CfmStatusIconLabel status={_} />
                ))}
              />
            </PanelBody>
          </Panel>
          <Panel savableAsImg expendable title={m.category}>
            <PanelBody>
              <ChartBarSingleBy data={filteredData} by={(_) => _.category} label={feedbacTypeLabel} />
            </PanelBody>
          </Panel>
          <Panel savableAsImg expendable title={m.program}>
            <PanelBody>
              <ChartBarSingleBy data={filteredData} by={(_) => _.tags?.program} />
            </PanelBody>
          </Panel>
          <Panel savableAsImg expendable title={m.project}>
            <PanelBody>
              <ChartBarSingleBy data={filteredData} by={(_) => _.project} />
            </PanelBody>
          </Panel>
        </Div>
      </Div>
    </Page>
  )
}
