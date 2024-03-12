import {Page} from '@/shared/Page'
import React, {useCallback, useMemo, useState} from 'react'
import {useI18n} from '../../../core/i18n'
import {useMpcaContext} from '../MpcaContext'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {UseBNREComputed, useBNREComputed} from '../useBNREComputed'
import {Enum, fnSwitch, Seq, seq} from '@alexandreannic/ts-utils'
import {chain, DrcOffice, DrcProjectHelper, fnTry, groupBy, koboFormTranslation, KoboIndex, Period, toPercent,} from '@infoportal-common'
import {Txt} from 'mui-extension'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {ChartBar} from '@/shared/charts/ChartBar'
import {Lazy} from '@/shared/Lazy'
import {ChartHelperOld, makeChartData} from '@/shared/charts/chartHelperOld'
import {UkraineMap} from '@/shared/UkraineMap/UkraineMap'
import {Box, LinearProgress} from '@mui/material'
import {Sheet} from '@/shared/Sheet/Sheet'
import {ChartLine} from '@/shared/charts/ChartLine'
import {format} from 'date-fns'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {MpcaEntity, MpcaHelper, MpcaProgram, mpcaRowSources} from '@/core/sdk/server/mpca/MpcaEntity'
import {DashboardFilterLabel} from '@/shared/DashboardLayout/DashboardFilterLabel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Panel, PanelBody} from '@/shared/Panel'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {MpcaDashboardDeduplication} from '@/features/Mpca/Dashboard/MpcaDashboardDeduplication'
import {KoboFormSdk} from '@/core/sdk/server/kobo/KoboFormSdk'
import {MpcaDuplicatedCheckPanel} from '@/features/Mpca/Dashboard/MpcaDuplicatedCheck'
import {useSession} from '@/core/Session/SessionContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {WfpDeduplicationStatus} from '@/core/sdk/server/wfpDeduplication/WfpDeduplication'
import {DeduplicationStatusIcon} from '@/features/WfpDeduplication/WfpDeduplicationData'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {appConfig} from '@/conf/AppConfig'

export const today = new Date()

enum AmountType {
  amountUahSupposed = 'amountUahSupposed',
  amountUahDedup = 'amountUahDedup',
  amountUahFinal = 'amountUahFinal',
  amountUahCommitted = 'amountUahCommitted',
}

export enum Currency {
  USD = 'USD',
  UAH = 'UAH',
}

export const MpcaDashboard = () => {
  const {conf} = useAppSettings()
  const ctx = useMpcaContext()
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})
  const {m, formatLargeNumber} = useI18n()
  const [amountType, setAmountType] = usePersistentState<AmountType>(AmountType.amountUahFinal, {storageKey: 'mpca-dashboard-amountType'})
  const [currency, setCurrency] = usePersistentState<Currency>(Currency.USD, {storageKey: 'mpca-dashboard-currency'})

  const mappedData = useMemo(() => ctx.data?.map(_ => {
    if (_.finalDonor === undefined) _.finalDonor = SheetUtils.blank as any
    if (_.finalProject === undefined) _.finalProject = SheetUtils.blank as any
    if (_.oblastIso === undefined) _.oblastIso = SheetUtils.blank as any
    if (_.oblast === undefined) _.oblast = SheetUtils.blank as any
    if (_.office === undefined) _.office = SheetUtils.blank as any
    return _
  }), [ctx.data])

  // useEffect(() => {
  //   if (periodFilter.start || periodFilter.end)
  //     ctx.fetcherData.fetch({force: true}, {filters: periodFilter})
  // }, [periodFilter])

  const filterShape = useMemo(() => {
    const d = mappedData ?? seq([])
    return DataFilter.makeShape<MpcaEntity>({
      source: {
        icon: 'assignment_turned_in',
        label: 'Kobo Form',
        getValue: _ => _.source,
        getOptions: () => Enum.keys(mpcaRowSources).map(_ => SheetUtils.buildCustomOption(_, KoboIndex.byName(_).parsed.name))
      },
      finalDonor: {
        icon: appConfig.icons.donor,
        label: 'Donor',
        getValue: _ => _.finalDonor,
        getOptions: () => DataFilter.buildOptions(d.map(_ => _.finalDonor!).distinct(_ => _).sort())
      },
      finalProject: {
        icon: appConfig.icons.project,
        label: 'Project',
        getValue: _ => _.finalProject,
        getOptions: () => DataFilter.buildOptions(d.map(_ => _.finalProject!).distinct(_ => _).sort()),
      },
      prog: {
        icon: 'groups',
        label: 'Prog',
        getValue: _ => _.prog,
        getOptions: () => DataFilter.buildOptionsFromObject(MpcaProgram, true),
        multiple: true,
      },
      oblast: {
        icon: 'location_on',
        label: 'Oblast',
        getValue: _ => _.oblast,
        getOptions: () => DataFilter.buildOptions(d.map(_ => _.oblast!).distinct(_ => _).sort())
      },
      office: {
        icon: 'business',
        label: 'Office',
        getValue: _ => _.office,
        getOptions: () => DataFilter.buildOptionsFromObject(DrcOffice, true),
      },
      deduplication: {
        icon: appFeaturesIndex.wfp_deduplication.materialIcons,
        label: m.duplication,
        getValue: _ => _.deduplication?.status ?? SheetUtils.blank,
        getOptions: () => [DataFilter.blankOption, ...Enum.values(WfpDeduplicationStatus).map(_ => DataFilter.buildOption(_, <><DeduplicationStatusIcon status={_}/>&nbsp;{_}</>))],
      }
    })
  }, [mappedData])

  const [filters, setFilters] = usePersistentState<DataFilter.InferShape<typeof filterShape>>({}, {storageKey: 'mpca-dashboard-filters'})

  const filteredData = useMemo(() => {
    if (!mappedData) return
    const filteredBy_date = mappedData.filter(d => {
      if (periodFilter?.start && periodFilter.start.getTime() >= d.date.getTime()) return false
      if (periodFilter?.end && periodFilter.end.getTime() <= d.date.getTime()) return false
      return true
    })
    return DataFilter.filterData(filteredBy_date, filterShape, filters)
  }, [mappedData, filters, periodFilter, filterShape])

  const computed = useBNREComputed({data: filteredData})

  const getAmount = useCallback((_: MpcaEntity) => {
    const amount = _[amountType]
    if (!amount) return
    return amount * fnSwitch(currency, {
      [Currency.UAH]: 1,
      [Currency.USD]: conf.uahToUsd,
    })
    // return formatLargeNumber(converted) + ' ' + Currency.UAH
  }, [currency, amountType])

  return (
    <Page width="lg" loading={ctx.fetcherData.loading}>
      <DataFilterLayout
        filters={filters}
        shapes={filterShape}
        setFilters={setFilters}
        onClear={() => {
          setFilters({})
          setPeriodFilter({})
        }}
        before={
          <>
            <PeriodPicker
              defaultValue={[periodFilter.start, periodFilter.end]}
              onChange={([start, end]) => setPeriodFilter(prev => ({...prev, start, end}))}
              label={[m.start, m.endIncluded]}
              max={today}
            />
            <DashboardFilterLabel icon="attach_money" active={true} label={currency}>
              {() => (
                <Box sx={{p: 1}}>
                  <ScRadioGroup value={amountType} onChange={setAmountType} dense sx={{mb: 1}}>
                    <ScRadioGroupItem value={AmountType.amountUahSupposed} title="Estimated" description="Estimated when filling the form"/>
                    <ScRadioGroupItem value={AmountType.amountUahDedup} title="Deduplicated" description="Amount given after WFP deduplication"/>
                    <ScRadioGroupItem value={AmountType.amountUahFinal} title="Reel" description="Deduplicated amount or Estimated if none"/>
                    <ScRadioGroupItem value={AmountType.amountUahCommitted} title="Committed" description="Real amount if committed"/>
                  </ScRadioGroup>
                  <ScRadioGroup value={currency} onChange={setCurrency} inline dense>
                    <ScRadioGroupItem value={Currency.USD} title="USD" sx={{width: '100%'}}/>
                    <ScRadioGroupItem value={Currency.UAH} title="UAH" sx={{width: '100%'}}/>
                  </ScRadioGroup>
                </Box>
              )}
            </DashboardFilterLabel>
          </>
        }
      />
      {computed && filteredData && (
        <_MPCADashboard
          currency={currency}
          amountType={amountType}
          data={filteredData}
          computed={computed}
          getAmount={getAmount}
        />
      )}
    </Page>
  )
}

export const _MPCADashboard = ({
  data,
  computed,
  currency,
  getAmount,
  amountType,
}: {
  getAmount: (_: MpcaEntity) => number | undefined
  amountType: AmountType
  currency: Currency
  data: Seq<MpcaEntity>
  computed: NonNullable<UseBNREComputed>
}) => {
  const {session} = useSession()
  const {m, formatDate, formatLargeNumber} = useI18n()

  const totalAmount = useMemo(() => data.sum(_ => getAmount(_) ?? 0), [data, getAmount])

  const displayAmount = (_: number) => formatLargeNumber(_, {maximumFractionDigits: 0}) + ' ' + currency
  return (
    <>
      <Div column>
        <Div responsive>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="person" title="Beneficiaries">
              <Lazy deps={[data]} fn={() => data.sum(_ => _.hhSize ?? 0)}>
                {_ => formatLargeNumber(_)}
              </Lazy>
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="how_to_reg" title="Duplications checked with WFP">
              {formatLargeNumber(computed.deduplications.length)}
            </SlideWidget>
          </Div>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="content_copy" title="Multiple time assisted">
              {formatLargeNumber(Enum.keys(computed.multipleTimeAssisted).length)}
              <Txt color="hint" sx={{ml: 1}}>{toPercent(Enum.keys(computed.multipleTimeAssisted).length / data.length)}</Txt>
            </SlideWidget>
            <SlidePanel sx={{flex: 1}}>
              <ChartPieWidget showValue showBase value={computed.preventedAssistance.length} base={computed.deduplications.length} title="Prevented assistances"/>
            </SlidePanel>
          </Div>
          {/*<SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>*/}
          {/*  {formatLargeNumber(computed?.flatData.length)}*/}
          {/*</SlideWidget>*/}
        </Div>
        <Div sx={{alignItems: 'flex-start'}} responsive>
          <Div column>
            <SlidePanel BodyProps={{sx: {pt: 0}}}>
              <SlideWidget title="Total amount">
                {displayAmount(totalAmount)}
              </SlideWidget>
              <Lazy deps={[data, getAmount]} fn={() => {
                const gb = data.groupBy(d => format(d.date, 'yyyy-MM'))
                return new Enum(gb)
                  .transform((k, v) => [k, seq(v).sum(_ => (getAmount(_) ?? 0))])
                  .sort(([ka], [kb]) => ka.localeCompare(kb))
                  .entries()
                  .map(([k, v]) => ({name: k, [m.amount]: v}))
              }}>
                {_ => (
                  <ChartLine
                    data={_ as any}
                    height={190}
                    hideLabelToggle
                  />
                )}
              </Lazy>
            </SlidePanel>
            <MpcaDashboardDeduplication data={data}/>
            <SlidePanel title={m.form}>
              <Lazy deps={[data]} fn={() => chain(ChartHelperOld.single({
                data: data.map(_ => _.source),
              })).map(ChartHelperOld.setLabel(new Enum(koboFormTranslation).transform((k, v) => [k, KoboFormSdk.parseFormName(v).name]).get() as any)).get()}>
                {_ => <ChartBar data={_}/>}
              </Lazy>
            </SlidePanel>
            <SlidePanel title={m.program}>
              <Lazy deps={[data]} fn={() => ChartHelperOld.multiple({
                data: data.map(_ => _.prog),
              })}>
                {_ => <ChartBar data={_}/>}
              </Lazy>
            </SlidePanel>
            {/*<SlidePanel title={m.submissionTime}>*/}
            {/*  <KoboLineChartDate*/}
            {/*    height={190}*/}
            {/*    data={data}*/}
            {/*    curves={{*/}
            {/*      'date': _ => _.date,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</SlidePanel>*/}
            <Panel title={m.disaggregation}>
              <PanelBody>
                <AgeGroupTable tableId="mpca-dashboard-ag" persons={computed.persons}/>
              </PanelBody>
            </Panel>
          </Div>
          {/*// POFU data Cghernihiv donestk lvivi zapo*/}
          <Div column>
            {/*<SlidePanel title={m.location}>*/}
            {/*  <Lazy deps={[data]} fn={() => ChartTools.byCategory({*/}
            {/*    data,*/}
            {/*    categories: new Enum(OblastIndex.oblastByISO).transform((k, v) => [k, (_: Mpca) => _.oblastIso === k]).get(),*/}
            {/*    filter: _ => true,*/}
            {/*  })}>*/}
            {/*    {_ => <UkraineMap data={_} base={data.length} sx={{mx: 2}}/>}*/}
            {/*  </Lazy>*/}
            {/*</SlidePanel>*/}
            {/*<SlidePanel title={`${m.mpca.assistanceByLocation}`}>*/}
            {/*  <Lazy deps={[data, currency, getAmount]} fn={() => {*/}
            {/*    const by = data.groupBy(_ => _.oblastIso)*/}
            {/*    return new Enum(by).transform((k, v) => [OblastIndex.findByIso(k)!, {value: v.sum(x => getAmount(x) ?? 0)}]).get()*/}
            {/*  }}>*/}
            {/*    {_ => <HorizontalBarChartGoogle data={_}/>}*/}
            {/*  </Lazy>*/}
            {/*</SlidePanel>*/}
            <SlidePanel title={`${m.mpca.assistanceByLocation}`}>
              <Lazy deps={[data, currency, getAmount]} fn={() => {
                const by = data.groupBy(_ => _.oblastIso!)
                return new Enum(by).transform((k, v) => [k, makeChartData({value: seq(v).sum(x => getAmount(x) ?? 0)})]).get()
              }}>
                {_ => <UkraineMap data={_} sx={{mx: 2}} maximumFractionDigits={0} base={totalAmount}/>}
              </Lazy>
            </SlidePanel>
            <SlidePanel title={m.donor}>
              <Lazy deps={[data]} fn={() => ChartHelperOld.single({
                data: data.map(_ => _.finalDonor ?? ''),
              })}>
                {_ => <ChartBar data={_}/>}
              </Lazy>
            </SlidePanel>
            <SlidePanel title={m.project}>
              <Lazy deps={[data]} fn={() => ChartHelperOld.single({
                data: data.map(_ => _.finalProject ?? SheetUtils.blank),
              })}>
                {_ => <ChartBar data={_}/>}
              </Lazy>
            </SlidePanel>
          </Div>
        </Div>
        {(session.admin || session.drcJob === 'Finance Manager') && (
          <Div>
            <Div column>
              <MpcaDuplicatedCheckPanel data={data}/>
            </Div>
          </Div>
        )}
        <Div>
          <Div column>
            <Panel title="Budget Tracker (UAH)">
              <Lazy deps={[data, getAmount]} fn={() => {
                const gb = groupBy({
                  data,
                  groups: [
                    {by: _ => _.finalProject ?? SheetUtils.blank,},
                    {by: _ => _.office ?? SheetUtils.blank,},
                  ],
                  finalTransform: _ => _,
                })
                return [...MpcaHelper.projects, SheetUtils.blank].flatMap(project => {
                  const donor = project === SheetUtils.blank ? SheetUtils.blank : DrcProjectHelper.donorByProject[project]
                  const resOffices = seq([...Enum.values(DrcOffice), SheetUtils.blank,]).map(office => {
                    const d = gb[project]?.[office] ?? seq()
                    return {
                      project,
                      office,
                      donor,
                      availableAmount: project !== SheetUtils.blank && office !== SheetUtils.blank
                        ? MpcaHelper.budgets[project]?.[office]
                        : undefined,
                      committedAmount: d.sum(_ => _[amountType] ?? 0),
                      individuals: d.sum(_ => _.persons?.length ?? 0),
                      rows: d.length,
                    }
                  })
                  return [
                    ...resOffices, {
                      project,
                      donor,
                      availableAmount: resOffices.sum(_ => _.availableAmount ?? 0),
                      office: 'Total',
                      committedAmount: resOffices.sum(_ => _.committedAmount),
                      individuals: resOffices.sum(_ => _.individuals),
                      rows: resOffices.sum(_ => _.rows),
                    }
                  ]
                })
              }}>
                {_ =>
                  <Sheet
                    id="mpca-dashboard-helper"
                    defaultLimit={200}
                    rowsPerPageOptions={[200, 1000]}
                    data={_}
                    columns={[
                      {width: 0, id: 'donor', head: m.donor, type: 'select_one', render: _ => _.donor},
                      {width: 0, id: 'project', head: m.project, type: 'select_one', render: _ => _.project},
                      {
                        width: 0, id: 'office', head: m.office, type: 'select_one',
                        renderValue: _ => _.office,
                        render: _ => {
                          if (_.office === 'Total') return <b>Total</b>
                          return _.office
                        }
                      },
                      {
                        width: 0,
                        id: 'total',
                        head: 'Committed',
                        type: 'number',
                        renderValue: _ => _.committedAmount,
                        render: _ => formatLargeNumber(_.committedAmount, {maximumFractionDigits: 0})
                      },
                      {
                        width: 0,
                        id: 'buget',
                        head: 'Budget available',
                        type: 'number',
                        renderValue: _ => _.availableAmount,
                        render: _ => formatLargeNumber(_.availableAmount, {maximumFractionDigits: 0})
                      },
                      {
                        width: 0,
                        id: 'target_ratio',
                        head: 'Rest',
                        type: 'number',
                        tooltip: _ => `${formatLargeNumber(_.committedAmount)} / ${formatLargeNumber(_.availableAmount)}`,
                        renderValue: _ => {
                          if (_.availableAmount) return _.availableAmount - _.committedAmount
                          return -_.committedAmount
                        },
                        render: _ => {
                          if (_.availableAmount === undefined || (_.office === 'Total' && _.availableAmount === 0)) return
                          const percent = fnTry(() => _.committedAmount / _.availableAmount!).fnCatch(() => 0)
                          return <>
                            <Box component="span" sx={{display: 'flex', justifyContent: 'space-between'}}>
                              <span>{formatLargeNumber(_.availableAmount - _.committedAmount, {maximumFractionDigits: 0})}</span>
                              <span>{toPercent(percent)}</span>
                            </Box>
                            <LinearProgress value={percent * 100} variant="determinate"/>
                          </>
                        }
                      },
                    ]}
                  />
                }
              </Lazy>
            </Panel>
          </Div>
        </Div>
        {/*<Div>*/}
        {/*  <Div column>*/}
        {/*    <SlidePanel title={m.ageGroup}>*/}
        {/*      <AAStackedBarChart data={computed.ageGroup} height={270} colors={t => [*/}
        {/*        t.palette.primary.main,*/}
        {/*        t.palette.info.main,*/}
        {/*        t.palette.divider,*/}
        {/*      ]}/>*/}
        {/*    </SlidePanel>*/}
        {/*<SlidePanel title={m.program}>*/}
        {/*  <Lazy deps={[data]} fn={() => ChartTools.multiple({*/}
        {/*    data: data.map(_ => _.back_prog_type).compact().map(_ => _.map(x => x.split('_')[0]))*/}
        {/*  })}>*/}
        {/*    {_ => <HorizontalBarChartGoogle data={_}/>}*/}
        {/*  </Lazy>*/}
        {/*</SlidePanel>*/}
        {/*<SlidePanel title={m.donor}>*/}
        {/*  <Lazy deps={[data]} fn={() => ChartTools.single({*/}
        {/*    data: data.map(_ => _.back_donor).compact().map(_ => _.split('_')[0])*/}
        {/*  })}>*/}
        {/*    {_ => <HorizontalBarChartGoogle data={_}/>}*/}
        {/*  </Lazy>*/}
        {/*</SlidePanel>*/}
        {/*</Div>*/}
        {/*<Div column>*/}
        {/*  <SlidePanel title={m.HHsLocation}>*/}
        {/*    <Lazy deps={[data]} fn={() => ChartTools.groupBy({*/}
        {/*      data,*/}
        {/*      groupBy: _ => _.ben_det_oblast ? BNREOblastToISO[_.ben_det_oblast] : undefined,*/}
        {/*      filter: _ => true*/}
        {/*    })}>*/}
        {/*      {_ => <UkraineMap data={_}/>}*/}
        {/*    </Lazy>*/}
        {/*  </SlidePanel>*/}
        {/*</Div>*/}
        {/*</Div>*/}
      </Div>
    </>
  )
}