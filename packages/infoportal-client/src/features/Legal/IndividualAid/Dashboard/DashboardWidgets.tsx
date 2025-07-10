import type {FC} from 'react'
import {match, Obj} from '@axanc/ts-utils'
import {Box} from '@mui/material'

import {DrcProject, KoboXmlMapper, OblastIndex, Legal_individual_aid, isDate, pluralize} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {SlideWidget, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {AgeGroupTable} from '@/shared'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {makeChartData} from '@/shared/charts/chartHelper'
import {Lazy} from '@/shared/Lazy'
import {MapSvg} from '@/shared/maps/MapSvg'
import {Panel, PanelBody} from '@/shared/Panel'
import {Div} from '@/shared/PdfLayout/PdfSlide'

import {useIndividualAidContext} from './context'

import {civilDocDateFields, hlpDocDateFields} from './constants'

// MEMO: all figures are PEOPLE - those who receive aid, get documents issued etc

const Widgets: FC = () => {
  const {dataFiltered} = useIndividualAidContext()
  const {m} = useI18n()
  // the data is already memoized in the hook called above
  // calculate everything in one Array.prototype.reduce run:
  const {assistances, counselling, docs} = dataFiltered.reduce(
    (result, {number_case}) => ({
      ...result,
      ...(number_case.some(({beneficiary_application_type}) => beneficiary_application_type === 'assistance')
        ? {
            assistances: ++result.assistances,
          }
        : {
            counselling: ++result.counselling,
          }),
      ...(number_case.some((aid) => hlpDocDateFields.some((field) => isDate(aid[field])))
        ? {docs: {...result.docs, hlp: ++result.docs.hlp}}
        : number_case.some((aid) => civilDocDateFields.some((field) => isDate(aid[field])))
          ? {docs: {...result.docs, civil: ++result.docs.civil}}
          : undefined),
      ...number_case.some,
    }),
    {
      assistances: 0,
      counselling: 0,
      docs: {hlp: 0, civil: 0},
      status: {closed: 0, pending: 0},
    },
  )

  return (
    <Div responsive paddingBottom={2}>
      <Div column>
        <Box display="flex" gap={2} mb={2}>
          <SlideWidget icon="person" title={m.individuals}>
            {dataFiltered.length}
          </SlideWidget>
          <SlideWidget icon="cases" title={pluralize(m.legal.aidType.assistance)}>
            {assistances}
          </SlideWidget>
          <SlideWidget icon="question_answer" title={m.legal.aidType.councelling}>
            {counselling}
          </SlideWidget>
        </Box>
        <Box display="flex" gap={2} mb={2}>
          <SlideWidget icon="description" title={m.legal.docsCount.hlp}>
            {docs.hlp}
          </SlideWidget>
          <SlideWidget icon="description" title={m.legal.docsCount.civilDocs}>
            {docs.civil}
          </SlideWidget>
        </Box>
        <SlidePanel>
          <AgeGroupTable
            tableId="individual-legal-aid-age-groups"
            enableDisplacementStatusFilter
            enablePwdFilter
            persons={dataFiltered.flatMap(KoboXmlMapper.Persons.legal_individual_aid)}
          />
        </SlidePanel>
        <SlidePanel title={m.legal.aidStatus}>
          <ChartBarSingleBy
            data={dataFiltered.map(({number_case}) => ({
              status_case: match(number_case[0].status_case)
                .cases({
                  pending: Legal_individual_aid.options.status_case.pending,
                  closed_ready: Legal_individual_aid.options.status_case.closed_ready,
                })
                .default(m.notSpecified),
            }))}
            by={({status_case}) => status_case}
          />
        </SlidePanel>
        <SlidePanel title={m.legal.aidCategory}>
          {/* <ChartBarSingleBy
            data={cases.map(({category_issue}) => ({
              category_issue:
                category_issue === undefined
                  ? m.notSpecified
                  : Legal_individual_aid.options.category_issue[category_issue],
            }))}
            by={({category_issue}) => category_issue}
          /> */}
        </SlidePanel>
        <SlidePanel title={m.project}>
          {/* <ChartBarSingleBy
            data={cases.map(({project}) => ({
              project: DrcProject[Legal_individual_aid.options.project[project!]],
            }))}
            by={({project}) => project}
          /> */}
        </SlidePanel>
      </Div>
      <Div column>
        <Panel title={m.legal.map.title}>
          <PanelBody>
            <Lazy
              deps={[dataFiltered]}
              fn={(data) => {
                const beneficiariesGroupedByOblast = data.groupBy(({oblast}) => OblastIndex.byKoboName(oblast)?.iso!)
                return {
                  data: new Obj(beneficiariesGroupedByOblast)
                    .map((k, v) => [k, makeChartData({value: v.length})])
                    .get(),
                  base: data.length,
                }
              }}
            >
              {({data, base}) => <MapSvg data={data} sx={{mx: 1}} maximumFractionDigits={0} base={base} />}
            </Lazy>
          </PanelBody>
        </Panel>
        <SlidePanel title={m.office}>
          <ChartBarSingleBy
            data={dataFiltered
              .map(({number_case}) => number_case[0].office)
              .compact()
              .map((office) => ({
                office: Legal_individual_aid.options.office[office],
              }))}
            by={({office}) => office}
          />
        </SlidePanel>
        <SlidePanel title={m.legal.registeredBy}>
          <ChartBarSingleBy
            data={dataFiltered
              .map(({number_case}) => number_case[0].first_lawyer)
              .compact()
              .map((first_lawyer) => ({
                first_lawyer: Legal_individual_aid.options.another_lawyer[first_lawyer],
              }))}
            by={({first_lawyer}) => first_lawyer}
          />
        </SlidePanel>
      </Div>
    </Div>
  )
}

export default Widgets
