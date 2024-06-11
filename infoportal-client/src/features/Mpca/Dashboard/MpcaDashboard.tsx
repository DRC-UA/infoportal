import {Page} from '@/shared/Page'
import React, {useCallback, useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {useMpcaContext} from '../MpcaContext'
import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {UseBNREComputed, useBNREComputed} from '../useBNREComputed'
import {fnSwitch, Obj, Seq, seq} from '@alexandreannic/ts-utils'
import {DrcOffice, KoboIndex, MpcaEntity, OblastIndex, Period, toPercent, WfpDeduplicationStatus,} from '@infoportal-common'
import {Txt} from 'mui-extension'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Lazy} from '@/shared/Lazy'
import {makeChartData} from '@/shared/charts/chartHelperOld'
import {MapSvg} from '@/shared/maps/MapSvg'
import {Box} from '@mui/material'
import {ChartLine} from '@/shared/charts/ChartLine'
import {format} from 'date-fns'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {DashboardFilterLabel} from '@/shared/DashboardLayout/DashboardFilterLabel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Panel, PanelBody} from '@/shared/Panel'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {MpcaDashboardDeduplication} from '@/features/Mpca/Dashboard/MpcaDashboardDeduplication'
import {MpcaDuplicatedCheckPanel} from '@/features/Mpca/Dashboard/MpcaDuplicatedCheck'
import {useSession} from '@/core/Session/SessionContext'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {DeduplicationStatusIcon} from '@/features/WfpDeduplication/WfpDeduplicationData'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {appConfig} from '@/conf/AppConfig'
import {MpcaBudgetTracker} from '@/features/Mpca/Dashboard/MpcaBudgetTracker'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'

export const today = new Date()

export enum MpcaAmountType {
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
  const [amountType, setAmountType] = usePersistentState<MpcaAmountType>(MpcaAmountType.amountUahFinal, {storageKey: 'mpca-dashboard-amountType'})
  const [currency, setCurrency] = usePersistentState<Currency>(Currency.USD, {storageKey: 'mpca-dashboard-currency'})

  const mappedData = ctx.data

  const filterShape = useMemo(() => {
    const d = mappedData ?? seq([])
    return DataFilter.makeShape<MpcaEntity>({
      source: {
        icon: appConfig.icons.koboForm,
        label: m.kobo,
        getValue: _ => _.formId,
        getOptions: () => d.map(_ => _.formId).distinct(_ => _).map(_ => DataFilter.buildOption(_, KoboIndex.searchById(_)?.translation))
      },
      prog: {
        icon: appConfig.icons.program,
        label: m.program,
        getValue: _ => _.activity,
        getOptions: () => DataFilter.buildOptions(d.map(_ => _.activity!).distinct(_ => _), false),
      },
      finalDonor: {
        icon: appConfig.icons.donor,
        label: m.donor,
        getValue: _ => _.donor ?? DataFilter.blank,
        getOptions: () => DataFilter.buildOptions(d.flatMap(_ => _.donor).distinct(_ => _), true),
        multiple: true,
      },
      finalProject: {
        icon: appConfig.icons.project,
        label: m.project,
        getValue: _ => _.project ?? DataFilter.blank,
        getOptions: () => DataFilter.buildOptions(d.flatMap(_ => _.project).distinct(_ => _), true),
        multiple: true,
      },
      office: {
        icon: 'business',
        label: m.office,
        getValue: _ => _.office,
        getOptions: () => DataFilter.buildOptionsFromObject(DrcOffice, false),
      },
      deduplication: {
        icon: appFeaturesIndex.wfp_deduplication.materialIcons,
        label: m.duplication,
        getValue: _ => _.deduplication?.status ?? SheetUtils.blank,
        getOptions: () => [DataFilter.blankOption, ...Obj.values(WfpDeduplicationStatus).map(_ => DataFilter.buildOption(_, <><DeduplicationStatusIcon status={_}/>&nbsp;{_}</>))],
      },
      oblast: {
        icon: 'location_on',
        label: m.oblast,
        getValue: _ => _.oblast,
        getOptions: () => DataFilter.buildOptions(d.map(_ => _.oblast!).distinct(_ => _).sort())
      },
      raion: {
        label: m.raion,
        getValue: _ => _.raion,
        getOptions: (get) => get().map(_ => _.raion).compact()
          .distinct(_ => _)
          .sort().map(_ => DataFilter.buildOption(_))
      },
      hromada: {
        label: m.hromada,
        getValue: _ => _.hromada,
        getOptions: (get) => get()
          .map(_ => _.hromada)
          .compact()
          .distinct(_ => _)
          .sort()
          .sort().map(_ => DataFilter.buildOption(_))
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
        data={mappedData}
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
                    <ScRadioGroupItem value={MpcaAmountType.amountUahSupposed} title="Estimated" description="Estimated when filling the form"/>
                    <ScRadioGroupItem value={MpcaAmountType.amountUahDedup} title="Deduplicated" description="Amount given after WFP deduplication"/>
                    <ScRadioGroupItem value={MpcaAmountType.amountUahFinal} title="Reel" description="Deduplicated amount or Estimated if none"/>
                    <ScRadioGroupItem value={MpcaAmountType.amountUahCommitted} title="Committed" description="Real amount if committed"/>
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
  data: Seq<MpcaEntity>
  getAmount: (_: MpcaEntity) => number | undefined
  amountType: MpcaAmountType
  currency: Currency
  computed: NonNullable<UseBNREComputed>
}) => {
  const {session} = useSession()
  const {m, formatDate, formatLargeNumber} = useI18n()
  const [showProjectsBy, setShowProjectsBy] = usePersistentState<'donor' | 'project'>('donor', {storageKey: 'meta-dashboard-showProject'})

  const totalAmount = useMemo(() => data.sum(_ => getAmount(_) ?? 0), [data, getAmount])

  const displayAmount = (_: number) => formatLargeNumber(_, {maximumFractionDigits: 0}) + ' ' + currency
  return (
    <>
      <Div column>
        <Div responsive>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="person" title="Beneficiaries">
              <Lazy deps={[data]} fn={() => data.sum(_ => _.personsCount ?? 0)}>
                {_ => formatLargeNumber(_)}
              </Lazy>
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="how_to_reg" title="Duplications checked with WFP">
              {formatLargeNumber(computed.deduplications.length)}
            </SlideWidget>
          </Div>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="content_copy" title="Multiple time assisted">
              {formatLargeNumber(Obj.keys(computed.multipleTimeAssisted).length)}
              <Txt color="hint" sx={{ml: 1}}>{toPercent(Obj.keys(computed.multipleTimeAssisted).length / data.length)}</Txt>
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
                return new Obj(gb)
                  .map((k, v) => [k, {
                    count: v.length,
                    amount: seq(v).sum(_ => (getAmount(_) ?? 0))
                  }])
                  .sort(([ka], [kb]) => ka.localeCompare(kb))
                  .entries()
                  .map(([k, v]) => ({name: k, [m.submissionTime]: v.count, [m.amount]: v.amount}))
              }}>
                {_ => (
                  <ChartLine
                    hideYTicks
                    height={200}
                    data={_ as any}
                    hideLabelToggle
                    distinctYAxis
                  />
                )}
              </Lazy>
            </SlidePanel>
            <MpcaDashboardDeduplication data={data}/>
            <SlidePanel title={m.form}>
              <Lazy deps={[data]} fn={() => data.map(_ => ({form: KoboIndex.searchById(_.formId)?.translation}))}>
                {res => <ChartBarSingleBy data={res} by={_ => _.form}/>}
              </Lazy>
            </SlidePanel>
            <SlidePanel title={m.program}>
              <ChartBarSingleBy data={data} by={_ => _.activity}/>
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
          </Div>
          {/*// POFU data Cghernihiv donestk lvivi zapo*/}
          <Div column>
            {/*<SlidePanel title={m.location}>*/}
            {/*  <Lazy deps={[data]} fn={() => ChartTools.byCategory({*/}
            {/*    data,*/}
            {/*    categories: new Obj(OblastIndex.oblastByISO).map((k, v) => [k, (_: Mpca) => _.oblastIso === k]).get(),*/}
            {/*    filter: _ => true,*/}
            {/*  })}>*/}
            {/*    {_ => <MapSvg data={_} base={data.length} sx={{mx: 2}}/>}*/}
            {/*  </Lazy>*/}
            {/*</SlidePanel>*/}
            {/*<SlidePanel title={`${m.mpca.assistanceByLocation}`}>*/}
            {/*  <Lazy deps={[data, currency, getAmount]} fn={() => {*/}
            {/*    const by = data.groupBy(_ => _.oblastIso)*/}
            {/*    return new Obj(by).map((k, v) => [OblastIndex.findByIso(k)!, {value: v.sum(x => getAmount(x) ?? 0)}]).get()*/}
            {/*  }}>*/}
            {/*    {_ => <HorizontalBarChartGoogle data={_}/>}*/}
            {/*  </Lazy>*/}
            {/*</SlidePanel>*/}
            <SlidePanel title={`${m.mpca.assistanceByLocation}`}>
              <Lazy deps={[data, currency, getAmount]} fn={() => {
                const by = data.groupBy(_ => OblastIndex.byName(_.oblast).iso)
                return new Obj(by).map((k, v) => [k, makeChartData({value: seq(v).sum(x => getAmount(x) ?? 0)})]).get()
              }}>
                {_ => <MapSvg data={_} sx={{maxWidth: 480, margin: 'auto'}} maximumFractionDigits={0} base={totalAmount}/>}
              </Lazy>
            </SlidePanel>
            <Panel title={m.disaggregation}>
              <PanelBody>
                <AgeGroupTable tableId="mpca-dashboard-ag" persons={computed.persons}/>
              </PanelBody>
            </Panel>
            <SlidePanel>
              <ScRadioGroup value={showProjectsBy} onChange={setShowProjectsBy} inline dense>
                <ScRadioGroupItem hideRadio value="donoor" title={m.donor}/>
                <ScRadioGroupItem hideRadio value="project" title={m.project}/>
              </ScRadioGroup>
              {showProjectsBy === 'project' ? (
                <ChartBarMultipleBy data={data} by={_ => _.project}/>
              ) : (
                <ChartBarMultipleBy data={data} by={_ => _.donor}/>
              )}
            </SlidePanel>
          </Div>
        </Div>
        <Div>
          <Div column>
            <Panel title="Budget Tracker (UAH)">
              <MpcaBudgetTracker data={data} getAmount={getAmount} amountType={amountType}/>
            </Panel>
          </Div>
        </Div>
        {(session.admin || session.drcJob === 'Finance Manager') && (
          <Div>
            <Div column>
              <MpcaDuplicatedCheckPanel data={data}/>
            </Div>
          </Div>
        )}
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
        {/*      {_ => <MapSvg data={_}/>}*/}
        {/*    </Lazy>*/}
        {/*  </SlidePanel>*/}
        {/*</Div>*/}
        {/*</Div>*/}
      </Div>
    </>
  )
}