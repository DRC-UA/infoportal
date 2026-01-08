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
          {(['cash_received_msme', 'cash_not_received_reason'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
        <Card>
          {(['cash_usage', 'cash_usage_other'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(['cash_sufficient', 'cash_not_sufficient_reason'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
        <Card>
          {(
            [
              'business_improvement',
              'improvements_noticed',
              'improvements_noticed_other',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(['challenges_faced', 'challenges_faced_other'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map(
            (field) => (
              <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
            ),
          )}
        </Card>
      </Div>
      <Div column>
        <Card>
          {(
            [
              'training_attended',
              'training_not_attended_reason',
              'training_satisfaction',
              'training_satisfaction_bad',
              'training_expectations_met',
              'training_expectations_not_met_reason',
              'training_relevance',
              'training_relevance_improvement',
              'training_format_suitability',
              'training_format_suitability_reason',
              'training_duration_sufficient',
              'training_duration_additional_needed',
              'training_valuable_part',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            [
              'revenue_generated',
              'no_revenue_reason',
              'monthly_costs',
              'net_income',
              'no_net_income_reason',
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
              'recommendation_likelihood',
              'recommendation_explain_msme',
              'employed_individuals',
              'employed_individuals_no',
              'how_employed_individuals',
              'income_msme',
              'income_msme_explain',
              'contacted_pay_amount_msme',
              'contacted_pay_amount_msme_tax_local',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            ['recommendation_likelihood', 'recommendation_explain_msme'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            [
              'employed_individuals',
              'employed_individuals_no',
              'how_employed_individuals',
            ] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]
          ).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(['income_msme', 'income_msme_explain'] satisfies (keyof Meal_ecrec_agMsmeVetPam.T)[]).map((field) => (
            <ChartWidget key={field} data={data} field={field} limitChartHeight={456} />
          ))}
        </Card>
        <Card>
          {(
            [
              'contacted_pay_amount_msme',
              'contacted_pay_amount_msme_tax_local',
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
