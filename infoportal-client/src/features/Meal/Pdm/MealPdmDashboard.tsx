import React, {useMemo, useState} from 'react'
import {map, seq, Seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {KoboAnswerFlat, Meal_pdmStandardised, OblastIndex} from '@infoportal-common'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {Page} from '@/shared/Page'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useMealPdmContext} from '@/features/Meal/Pdm/MealPdmContext'
import {UaMapBy} from '@/features/DrcUaMap/UaMapBy'
import {appConfig} from '@/conf/AppConfig'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {Panel, PanelBody} from '@/shared/Panel'

export interface DashboardPageProps {
  filters: Record<string, string[]>
  data: Seq<KoboAnswerFlat<Meal_pdmStandardised.T>>
}

const mapOblast = OblastIndex.koboOblastIndexIso

export const MealPdmDashboard = () => {
  const ctx = useMealPdmContext()
  const ctxSchema = useKoboSchemaContext()
  const schema = ctxSchema.byName.meal_pdmStandardised.get!
  const langIndex = ctxSchema.langIndex
  const {m, formatDateTime, formatDate} = useI18n()
  const [optionFilter, setOptionFilters] = useState<Record<string, string[] | undefined>>({})

  const filterShape = useMemo(() => {
    return DataFilter.makeShape<KoboAnswerFlat<Meal_pdmStandardised.T>>({
      oblast: {
        icon: 'location_on',
        getOptions: () => schema.schemaHelper.getOptionsByQuestionName('ben_det_oblast').map(_ => ({value: _.name, label: _.label[langIndex]})),
        label: m.oblast,
        getValue: _ => _.ben_det_oblast,
      },
      office: {
        icon: 'share',
        getOptions: () => schema.schemaHelper.getOptionsByQuestionName('office').map(_ => ({value: _.name, label: _.label[langIndex]})),
        label: m.office,
        getValue: _ => _.office,
      },
      pdmtype: {
        icon: appConfig.icons.project,
        getOptions: () => schema.schemaHelper.getOptionsByQuestionName('pdmtype').map(_ => ({value: _.name, label: _.label[langIndex]})),
        label: m.activity,
        getValue: _ => _.pdmtype,
      },
    })
  }, [schema])

  const data = useMemo(() => {
    console.log('ctx', ctx.fetcherAnswers.get)
    return map(ctx.fetcherAnswers.get, _ => seq(DataFilter.filterData(_, filterShape, optionFilter)))
  }, [ctx.fetcherAnswers.get, optionFilter, filterShape])

  return (
    <Page
      width="lg"
      loading={ctx.fetcherAnswers.loading}
    >
      <DataFilterLayout
        shapes={filterShape}
        filters={optionFilter}
        setFilters={setOptionFilters}
        before={
          <DebouncedInput<[Date | undefined, Date | undefined]>
            debounce={400}
            value={[ctx.periodFilter.start, ctx.periodFilter.end]}
            onChange={([start, end]) => ctx.setPeriodFilter(prev => ({...prev, start, end}))}
          >
            {(value, onChange) => <PeriodPicker
              sx={{marginTop: '-6px'}}
              defaultValue={value ?? [undefined, undefined]}
              onChange={onChange}
              min={ctx.fetcherPeriod.get?.start}
              max={ctx.fetcherPeriod.get?.end}
            />}
          </DebouncedInput>
        }
      />
      {data && (
        <>
          <Div responsive>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel>
                <UaMapBy
                  fillBaseOn="value"
                  data={data}
                  getOblast={_ => mapOblast[_.ben_det_oblast!]}
                  value={_ => true}
                  base={_ => _.ben_det_oblast !== undefined}
                />
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy title={m.mealMonitoringPdm.pdmType} filter={_ => _.pdmtype === 'carep'} data={data} sx={{mb: 1}}/>
                <ChartBarSingleBy data={data} by={_ => _.pdmtype} label={Meal_pdmStandardised.options.pdmtype}/>
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy title={m.mealMonitoringPdm.officeResponsible} filter={_ => _.office === 'mykolaiv'} data={data} sx={{mb: 1}}/>
                <ChartBarSingleBy data={data} by={_ => _.office} label={Meal_pdmStandardised.options.office}/>
              </SlidePanel>
              <SlidePanel>
                <ChartPieWidgetBy title={m.mealMonitoringPdm.interview} filter={_ => _.type_interview === 'remote'} data={data} sx={{mb: 1}}/>
                <ChartBarSingleBy data={data} by={_ => _.type_interview} label={Meal_pdmStandardised.options.type_interview}/>
              </SlidePanel>
              <Panel title={m.ageGroup}>
                <PanelBody>
                  <AgeGroupTable tableId="pdm-dashboard" persons={data.flatMap(_ => _.persons)} enableDisplacementStatusFilter enableOnlyPwdFilter/>
                </PanelBody>
              </Panel>
              <SlidePanel title={m.mealMonitoringPdm.feedback}>
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedAmount}
                  data={data}
                  filter={_ => _.satisfied_cash_amount === 'yes' || _.satisfied_cash_amount === 'no'}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.assistanceEnough}
                  data={data}
                  filter={_ => _.assistance_enough === 'yes'}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.satisfiedProcess}
                  data={data}
                  filter={_ => _.rate_quality_assistance === 'rtvs' || _.rate_quality_assistance === 'rtds'}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.treated}
                  data={data}
                  filter={_ => _.feel_treated_respect === 'rcyc' || _.feel_treated_respect === 'rcmy'}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.provideInfo}
                  data={data}
                  filter={_ => _.organization_provide_information === 'yes'}
                />
                <ChartPieWidgetBy
                  dense
                  title={m.mealMonitoringPdm.problems}
                  data={data}
                  filter={_ => _.experience_problems === 'yes'}
                />
              </SlidePanel>
            </Div>
            <Div column sx={{maxHeight: '50%'}}>
              <SlidePanel>
                <ChartPieWidgetBy title={m.mealMonitoringPdm.stay} filter={_ => _.planning_staying_repaired === 'yes'} data={data} sx={{mb: 1}}/>
                <ChartBarSingleBy data={data} by={_ => _.planning_staying_repaired} label={Meal_pdmStandardised.options.planning_staying_repaired}/>
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.priorityNeeds}>
                <ChartBarMultipleBy data={data} by={_ => _.needs_community_currently} label={Meal_pdmStandardised.options.needs_community_currently}/>
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.assistanceReceive}>
                <ChartBarSingleBy data={data} by={_ => _.assistance_delivered} label={Meal_pdmStandardised.options.assistance_delivered}/>
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.assistancePrefer}>
                <ChartBarSingleBy data={data} by={_ => _.receive_shelter_assistance} label={Meal_pdmStandardised.options.receive_shelter_assistance}/>
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.timeToTake}>
                <ChartBarSingleBy data={data} by={_ => _.time_registered_assistance} label={Meal_pdmStandardised.options.time_registered_assistance}/>
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.betterInform}>
                <ChartBarSingleBy data={data} by={_ => _.better_inform_distribution} label={Meal_pdmStandardised.options.better_inform_distribution}/>
              </SlidePanel>
            </Div>
          </Div>
        </>
      )}
    </Page>
  )
}