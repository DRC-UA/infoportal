import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {DashboardPageProps} from './ProtectionDashboardMonito'
import {Lazy} from '@/shared/Lazy'
import {ChartBar} from '@/shared/charts/ChartBar'
import {forceArrayStringInference, Person, Protection_hhs3} from '@infoportal-common'
import {Enum, seq, Seq} from '@alexandreannic/ts-utils'
import {Checkbox} from '@mui/material'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartHelper} from '@/shared/charts/chartHelper'

export const ProtectionDashboardMonitoViolence = ({
  data,
  computed,
}: DashboardPageProps) => {
  const {formatLargeNumber, m} = useI18n()

  const [category, setCategory] = useState({
    has_any_adult_male_member_experienced_violence: true,
    has_any_adult_female_member_experienced_violence: true,
    has_any_boy_member_experienced_violence: true,
    has_any_girl_member_experienced_violence: true,
    has_any_other_member_experienced_violence: true,
  })
  const allChecked = useMemo(() => Enum.values(category).every(_ => _), [category])
  const oneChecked = useMemo(() => !!Enum.values(category).find(_ => _), [category])

  const updateAll = (checked: boolean) => {
    setCategory({
      has_any_adult_male_member_experienced_violence: checked,
      has_any_adult_female_member_experienced_violence: checked,
      has_any_boy_member_experienced_violence: checked,
      has_any_girl_member_experienced_violence: checked,
      has_any_other_member_experienced_violence: checked,
    })
  }

  const groupedIndividualsType = useMemo(() => {
    // Verbose but more performant than functional version
    const res = {
      type: seq() as Seq<Protection_hhs3.T['what_type_of_incidents_took_place_has_any_adult_male_member_experienced_violence']>,
      when: seq() as Seq<Protection_hhs3.T['when_did_the_incidents_occur_has_any_adult_male_member_experienced_violence']>,
      who: seq() as Seq<Protection_hhs3.T['who_were_the_perpetrators_of_the_incident_has_any_adult_male_member_experienced_violence']>,
    }
    data.forEach(_ => {
      res.type.push(...[
        ...category.has_any_adult_male_member_experienced_violence ? [_.what_type_of_incidents_took_place_has_any_adult_male_member_experienced_violence] : [],
        ...category.has_any_adult_female_member_experienced_violence ? [_.what_type_of_incidents_took_place_has_any_adult_female_member_experienced_violence] : [],
        ...category.has_any_boy_member_experienced_violence ? [_.what_type_of_incidents_took_place_has_any_boy_member_experienced_violence] : [],
        ...category.has_any_girl_member_experienced_violence ? [_.what_type_of_incidents_took_place_has_any_girl_member_experienced_violence] : [],
        ...category.has_any_other_member_experienced_violence ? [_.what_type_of_incidents_took_place_has_any_other_member_experienced_violence] : [],
      ])
      res.when.push(...[
        ...category.has_any_adult_male_member_experienced_violence ? [_.when_did_the_incidents_occur_has_any_adult_male_member_experienced_violence] : [],
        ...category.has_any_adult_female_member_experienced_violence ? [_.when_did_the_incidents_occur_has_any_adult_female_member_experienced_violence] : [],
        ...category.has_any_boy_member_experienced_violence ? [_.when_did_the_incidents_occur_has_any_boy_member_experienced_violence] : [],
        ...category.has_any_girl_member_experienced_violence ? [_.when_did_the_incidents_occur_has_any_girl_member_experienced_violence] : [],
        ...category.has_any_other_member_experienced_violence ? [_.when_did_the_incidents_occur_has_any_other_member_experienced_violence] : [],
      ])
      res.who.push(...[
        ...category.has_any_adult_male_member_experienced_violence ? [_.who_were_the_perpetrators_of_the_incident_has_any_adult_male_member_experienced_violence] : [],
        ...category.has_any_adult_female_member_experienced_violence ? [_.who_were_the_perpetrators_of_the_incident_has_any_adult_female_member_experienced_violence] : [],
        ...category.has_any_boy_member_experienced_violence ? [_.who_were_the_perpetrators_of_the_incident_has_any_boy_member_experienced_violence] : [],
        ...category.has_any_girl_member_experienced_violence ? [_.who_were_the_perpetrators_of_the_incident_has_any_girl_member_experienced_violence] : [],
        ...category.has_any_other_member_experienced_violence ? [_.who_were_the_perpetrators_of_the_incident_has_any_other_member_experienced_violence] : [],
      ])
    })
    return res
  }, [data, category])
  return (
    <Div responsive>
      <Div column>
        <Lazy deps={[data, category]} fn={() => {
          const questions = forceArrayStringInference([
            'has_any_adult_male_member_experienced_violence',
            'has_any_adult_female_member_experienced_violence',
            'has_any_boy_member_experienced_violence',
            'has_any_girl_member_experienced_violence',
            'has_any_other_member_experienced_violence',
          ])
          const res = {} as Record<(typeof questions)[0], {value: number, base: 0}>
          questions.forEach(q => {
            res[q] = {value: 0, base: 0}
          })
          const total = {value: 0, base: 0,}
          data.forEach(row => {
            row.persons.forEach(_ => {
              if (_.age) {
                if (_.gender === Person.Gender.Male) {
                  if (_.age >= 18) res.has_any_adult_male_member_experienced_violence.base += 1
                  else res.has_any_boy_member_experienced_violence.base += 1
                } else if (_.gender === Person.Gender.Female) {
                  if (_.age >= 18) res.has_any_adult_female_member_experienced_violence.base += 1
                  else res.has_any_girl_member_experienced_violence.base += 1
                } else {
                  res.has_any_other_member_experienced_violence.base += 1
                }
              } else {
                res.has_any_other_member_experienced_violence.base += 1
              }
              total.base += 1
            })
            questions.forEach(key => {
              if (row[key] === 'yes') {
                total.value += 1
                res[key].value += 1
              }
            })
          })
          return new ChartHelper({total, ...res}).setLabel({
            total: m.selectAll,
            has_any_adult_female_member_experienced_violence: m.adultWomen,
            has_any_adult_male_member_experienced_violence: m.adultMen,
            has_any_boy_member_experienced_violence: m.boy,
            has_any_girl_member_experienced_violence: m.girl,
            has_any_other_member_experienced_violence: m.other,
          }).get()
        }}>
          {_ =>
            <SlidePanel title={m.protHHS2.reportedIncidents}>
              <ChartBar
                data={_}
                labels={{
                  total: <Checkbox indeterminate={!allChecked && oneChecked} checked={allChecked} onChange={() => {
                    updateAll(!allChecked)
                  }}/>,
                  has_any_adult_male_member_experienced_violence: <Checkbox
                    size="small"
                    checked={category.has_any_adult_male_member_experienced_violence}
                    onChange={e => setCategory(prev => ({...prev, has_any_adult_male_member_experienced_violence: e.target.checked}))}
                  />,
                  has_any_adult_female_member_experienced_violence: <Checkbox
                    size="small"
                    checked={category.has_any_adult_female_member_experienced_violence}
                    onChange={e => setCategory(prev => ({...prev, has_any_adult_female_member_experienced_violence: e.target.checked}))}
                  />,
                  has_any_boy_member_experienced_violence: <Checkbox
                    size="small"
                    checked={category.has_any_boy_member_experienced_violence}
                    onChange={e => setCategory(prev => ({...prev, has_any_boy_member_experienced_violence: e.target.checked}))}
                  />,
                  has_any_girl_member_experienced_violence: <Checkbox
                    size="small"
                    checked={category.has_any_girl_member_experienced_violence}
                    onChange={e => setCategory(prev => ({...prev, has_any_girl_member_experienced_violence: e.target.checked}))}
                  />,
                  has_any_other_member_experienced_violence: <Checkbox
                    size="small"
                    checked={category.has_any_other_member_experienced_violence}
                    onChange={e => setCategory(prev => ({...prev, has_any_other_member_experienced_violence: e.target.checked}))}
                  />,
                }}
              />
            </SlidePanel>
          }
        </Lazy>
        <SlidePanel title={m.majorStressFactors}>
          <ChartBarMultipleBy
            data={data}
            filterValue={['unable_unwilling_to_answer']}
            by={_ => _.what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members}
            label={Protection_hhs3.options.what_do_you_think_feel_are_the_major_stress_factors_for_you_and_your_household_members}
          />
        </SlidePanel>
      </Div>
      <Div column>
        <Lazy deps={[groupedIndividualsType.type]} fn={() =>
          ChartHelper.multiple({
            data: groupedIndividualsType.type,
            filterValue: ['unable_unwilling_to_answer']
          }).setLabel(Protection_hhs3.options.what_type_of_incidents_took_place_has_any_adult_male_member_experienced_violence)
            .sortBy.value().get()
        }>
          {_ => (
            <SlidePanel title={m.protHHS2.typeOfIncident}>
              <ChartBar data={_}/>
            </SlidePanel>
          )}
        </Lazy>
        <Lazy deps={[groupedIndividualsType.when]} fn={() =>
          ChartHelper.multiple({
            data: groupedIndividualsType.when,
            // filterValue: ['unable_unwilling_to_answer']
          }).setLabel(Protection_hhs3.options.when_did_the_incidents_occur_has_any_adult_male_member_experienced_violence)
            .sortBy
            .value()
            .get()
        }>
          {_ => (
            <SlidePanel title={m.protHHS2.timelineOfIncident}>
              <ChartBar data={_}/>
            </SlidePanel>
          )}
        </Lazy>
        {/*<Lazy deps={[groupedIndividualsType.who]} fn={() =>*/}
        {/*  chain(ChartTools.multiple({*/}
        {/*    data: groupedIndividualsType.who,*/}
        {/*    filterValue: ['unable_unwilling_to_answer']*/}
        {/*  }))*/}
        {/*    .map(ChartTools.setLabel(ProtHHS_2_1Options.who_were_the_perpetrators_of_the_incident_has_any_adult_male_member_experienced_violence))*/}
        {/*    .map(ChartTools.sortBy.value)*/}
        {/*    .get*/}
        {/*}>*/}
        {/*  {_ => (*/}
        {/*    <SlidePanel title={m.perpetrators}>*/}
        {/*      <HorizontalBarChartGoogle data={_}/>*/}
        {/*    </SlidePanel>*/}
        {/*  )}*/}
        {/*</Lazy>*/}
      </Div>
    </Div>
  )
}