import type {FC} from 'react'
import {Box, Card} from '@mui/material'

import {Meal_ecrec_agMsmeVetPam} from 'infoportal-common'

import {Div} from '@/shared/PdfLayout/PdfSlide'

import ChartWidget from './ChartWidget'
import Subtitle from './Subtitle'
import type {PdmSectionProps} from './types'

const SufficiencyMsme: FC<PdmSectionProps> = ({data, title}) => (
  <Box mt={2}>
    <Subtitle text={title} />
    <Div responsive>
      <Div column>
        <Card>
          {(
            ['enrol_vocational_center', 'enrol_vocational_center_no'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            [
              'training_completed',
              'training_no_reason',
              'training_type',
              'training_type_other',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            [
              'skills_usage',
              'skills_usage_method',
              'skills_usage_method_other',
              'skills_usage_method_no',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            [
              'believe_skills_improve',
              'believe_skills_improve_no',
              'believe_increase',
              'believe_increase_no',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(['conf_using_skills', 'conf_using_skills_not'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
        <Card>
          {(['job_started_vocational', 'job_started_vocational_no'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
        <Card>
          {(
            [
              'worked_other_12m',
              'job_type',
              'job_continuation',
              'job_duration',
              'hours_per_week',
              'income_earned',
              'monthly_income',
              'expenses_made',
              'income_sufficiency',
              'income_sufficiency_no',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(
            [
              'recommendation',
              'recommendation_explain',
              'income_vet',
              'income_vet_explain',
              'contacted_pay_amount_vet',
              'contacted_pay_amount_vet_tax_local',
              'platforms_search_job',
              'platforms_search_job_other',
              'barriers_finding_job',
              'barriers_finding_job_other',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
      </Div>
    </Div>
  </Box>
)

export default SufficiencyMsme
