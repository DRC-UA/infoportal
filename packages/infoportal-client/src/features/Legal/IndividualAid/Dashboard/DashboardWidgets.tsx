import type {FC} from 'react'
import {seq, match, Obj} from '@axanc/ts-utils'
import {Box} from '@mui/material'

import {DrcProject, KoboXmlMapper, OblastIndex, Legal_individual_aid} from 'infoportal-common'

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

const Widgets: FC = () => {
  const {dataFiltered} = useIndividualAidContext()
  const {m} = useI18n()
  const cases = dataFiltered.map(({number_case}) => number_case).flat()

  return (
    <Div responsive paddingBottom={2}>
      <Div column>
        <Box display="flex" gap={2} mb={2}>
          <SlideWidget icon="groups" title={m.individuals}>
            {dataFiltered.length}
          </SlideWidget>
          <SlideWidget icon="cases" title={m.legal.allCasesCountTitle}>
            {cases.length}
          </SlideWidget>
        </Box>
        <SlidePanel>
          <AgeGroupTable
            tableId="individual-legal-aid-age-groups"
            enableDisplacementStatusFilter
            enablePwdFilter
            persons={dataFiltered.map(KoboXmlMapper.Persons.legal_individual_aid)}
          />
        </SlidePanel>
        <SlidePanel title={m.legal.caseType.title}>
          <ChartBarSingleBy
            data={seq(cases).map(({beneficiary_application_type: case_type}) => ({
              case_type: match(case_type)
                .cases({
                  assistance: m.legal.caseType.assistance,
                  counselling: m.legal.caseType.councelling,
                })
                .default(m.notSpecified),
            }))}
            by={({case_type}) => case_type}
          />
        </SlidePanel>
        <SlidePanel title={m.legal.caseStatus}>
          <ChartBarSingleBy
            data={seq(cases).map(({status_case}) => ({
              status_case: match(status_case)
                .cases({
                  pending: Legal_individual_aid.options.status_case.pending,
                  closed_ready: Legal_individual_aid.options.status_case.closed_ready,
                })
                .default(m.notSpecified),
            }))}
            by={({status_case}) => status_case}
          />
        </SlidePanel>
        <SlidePanel title={m.legal.caseCategory}>
          <ChartBarSingleBy
            data={seq(cases).map(({category_issue}) => ({
              category_issue:
                category_issue === undefined
                  ? m.notSpecified
                  : Legal_individual_aid.options.category_issue[category_issue],
            }))}
            by={({category_issue}) => category_issue}
          />
        </SlidePanel>
        <SlidePanel title={m.project}>
          <ChartBarSingleBy
            data={seq(cases).map(({project}) => ({
              project: DrcProject[Legal_individual_aid.options.project[project!]],
            }))}
            by={({project}) => project}
          />
        </SlidePanel>
      </Div>
      <Div column>
        <Panel title={m.legal.map.title}>
          <PanelBody>
            <Lazy
              deps={[dataFiltered]}
              fn={(data) => {
                const beneficiariesGroupedByOblast = seq(data).groupBy(
                  ({oblast}) => OblastIndex.byKoboName(oblast)?.iso!,
                )
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
            data={seq(cases)
              .map(({office}) => office)
              .compact()
              .map((office) => ({
                office: Legal_individual_aid.options.office[office],
              }))}
            by={({office}) => office}
          />
        </SlidePanel>
        <SlidePanel title={m.legal.registeredBy}>
          <ChartBarSingleBy
            data={seq(cases)
              .map(({first_lawyer}) => first_lawyer)
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
