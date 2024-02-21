import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBar} from '@/shared/charts/ChartBar'
import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {DashboardPageProps} from './ProtectionDashboardMonito'
import {Box, Icon} from '@mui/material'
import {Lazy} from '@/shared/Lazy'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {UkraineMap} from '@/shared/UkraineMap/UkraineMap'
import {Enum, Seq} from '@alexandreannic/ts-utils'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {KoboProtection_hhs3, Person, Protection_hhs3} from '@infoportal-common'
import {ChartHelper} from '@/shared/charts/chartHelper'

export const getIdpsAnsweringRegistrationQuestion = (base: Seq<KoboProtection_hhs3.T>) => {
  return base
    .flatMap(_ => _.persons.map(p => ({..._, ...p})))
    .filter(_ => _.do_you_identify_as_any_of_the_following === 'idp')
    .filter(_ =>
      (_.isIdpRegistered && _.isIdpRegistered !== 'unable_unwilling_to_answer')
      || (_.are_you_and_your_hh_members_registered_as_idps && _.are_you_and_your_hh_members_registered_as_idps !== 'unable_unwilling_to_answer')
    )
}

export const ProtectionDashboardMonitoDocument = ({
  data,
  computed,
}: DashboardPageProps) => {
  const {formatLargeNumber, m} = useI18n()
  const [gender, setGender] = useState<Person.Gender[]>([])
  const [ageGroup, setAgeGroup] = useState<(keyof typeof Person.ageGroup.Quick)[]>([])

  const filterPerson = (_: Seq<KoboProtection_hhs3.Person>) => _.filter(_ => gender.length === 0 || gender.includes(_.gender!))
    .filter(_ => {
      if (ageGroup.length === 0) return true
      return !!ageGroup.find(g => Person.filterByAgegroup(Person.ageGroup.Quick, g)(_))
    })

  const filteredPersons = useMemo(() => {
    return filterPerson(data.flatMap(_ => _.persons))
  }, [gender, data, ageGroup])

  const filteredPersonsLastMonth = useMemo(() => {
    return filterPerson(computed.lastMonth.flatMap(_ => _.persons))
  }, [gender, computed.lastMonth, ageGroup])

  return (
    <>
      <Div responsive alignItems="flex-start">
        <Div column sx={{flex: 1}}>
          <SlidePanel title={m.protHHSnapshot.maleWithoutIDPCert}>
            <Div>
              <Lazy deps={[data, computed.lastMonth]} fn={d => ChartHelperOld.percentage({
                data: getIdpsAnsweringRegistrationQuestion(d),
                value: _ => _.isIdpRegistered !== 'yes' && _.are_you_and_your_hh_members_registered_as_idps !== 'yes_all'
              })}>
                {(d, l) => (
                  <ChartPieWidget sx={{flex: 1}} title={m.all} value={d.value} base={d.base} evolution={d.percent - l.percent}/>
                )}
              </Lazy>
              <Lazy deps={[data, computed.lastMonth]} fn={d => ChartHelperOld.percentage({
                data: getIdpsAnsweringRegistrationQuestion(d).filter(_ => _.age && _.age >= 18 && _.age <= 60 && _.gender && _.gender === Person.Gender.Male),
                value: _ => _.isIdpRegistered !== 'yes' && _.are_you_and_your_hh_members_registered_as_idps !== 'yes_all'
              })}>
                {(d, l) => (
                  <ChartPieWidget sx={{flex: 1}} title={m.protHHSnapshot.male1860} value={d.value} base={d.base} evolution={d.percent - l.percent}/>
                )}
              </Lazy>
            </Div>
          </SlidePanel>
          <Lazy deps={[computed.flatData]} fn={() => ChartHelperOld.byCategory({
            data: computed.flatData,
            categories: computed.categoryOblasts('where_are_you_current_living_oblast'),
            filter: _ => !_.lackDoc?.includes('none'),
            filterBase: _ => _.lackDoc !== undefined,
            filterZeroCategory: true,
          })}>
            {_ =>
              <SlidePanel title={m.protHHS2.missingDocumentationByOblastPopulation}>
                <UkraineMap data={_} fillBaseOn="percent" sx={{mx: 2}}/>
              </SlidePanel>
            }
          </Lazy>
          <SlidePanel>
            <ChartPieWidgetByKey
              data={data}
              compare={{before: computed.lastMonth}}
              property="have_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation"
              title={m.protHHS2.accessBarriersToObtainDocumentation}
              filter={_ => !_.includes('no')}
              filterBase={_ => !_.includes('unable_unwilling_to_answer')}
              sx={{mb: 2}}
            />
            <ChartBarMultipleBy
              data={data}
              by={_ => _.have_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation}
              label={Protection_hhs3.options.have_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation}
              filterValue={[
                'no',
                'unable_unwilling_to_answer',
              ]}
            />
          </SlidePanel>
        </Div>
        <Div column sx={{flex: 1}}>
          <SlidePanel title={m.lackOfPersonalDoc}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
              <Box sx={{mb: 1, display: 'flex', alignItems: 'center'}}>
                <Icon color="disabled" sx={{mr: 1}}>filter_alt</Icon>
                <ScRadioGroup<Person.Gender> value={gender} onChange={_ => setGender(_)} multiple inline dense>
                  {Enum.values(Person.Gender).map(_ =>
                    <ScRadioGroupItem hideRadio key={_} value={_} title={_}/>
                  )}
                </ScRadioGroup>
              </Box>
              <ScRadioGroup<any> value={ageGroup} onChange={_ => setAgeGroup(_)} multiple inline dense sx={{mb: 1}}>
                {Enum.keys(Person.ageGroup.Quick).map(_ =>
                  <ScRadioGroupItem hideRadio key={_} value={_} title={_}/>
                )}
              </ScRadioGroup>
            </Box>
            <Lazy deps={[filteredPersons, filteredPersonsLastMonth]} fn={(x) => ChartHelperOld.percentage({
              data: x.map(_ => _.lackDoc).compact().filter(_ => !_.includes('unable_unwilling_to_answer')),
              value: _ => !_.includes('none'),
            })}>
              {(_, last) => <ChartPieWidget dense sx={{mb: 2}} evolution={(_?.percent ?? 1) - (last?.percent ?? 1)} value={_.value} base={_.base}/>}
            </Lazy>
            <Lazy deps={[filteredPersons]} fn={() => ChartHelper.multiple({
              data: (() => filteredPersons.map(_ => _.lackDoc).compact())(),
              filterValue: ['none', 'unable_unwilling_to_answer'],
            }).setLabel(Protection_hhs3.options.does_lack_doc).sortBy.value().get()}>
              {_ => <ChartBar data={_}/>}
            </Lazy>
          </SlidePanel>
          <SlidePanel>
            <ChartPieWidgetByKey
              compare={{before: computed.lastMonth}}
              title={m.lackOfHousingDoc}
              property="what_housing_land_and_property_documents_do_you_lack"
              filterBase={_ => !_.includes('unable_unwilling_to_answer')}
              filter={_ => !_.includes('none')}
              data={data}
              sx={{mb: 2}}
            />
            <ChartBarMultipleBy
              data={data}
              by={_ => _.what_housing_land_and_property_documents_do_you_lack}
              filterValue={['unable_unwilling_to_answer', 'none']}
              label={{
                ...Protection_hhs3.options.what_housing_land_and_property_documents_do_you_lack,
                construction_stage_substituted_with_bti_certificate_following_completion_of_construction: 'Construction stage',
                document_issues_by_local_self_government_proving_that_the_house_was_damaged_destroyed: 'Document issued by local self-government proving a damaged house',
                cost_estimation_certificate_state_commission_issued_when_personal_request_is_made: 'Cost estimation certificate - state commission',
                document_issues_by_police_state_emergency_service_proving_that_the_house_was_damaged_destroyedfor_ukrainian_state_control_areas: 'Document issued by authority proving a damaged house',
              }}
            />
          </SlidePanel>

        </Div>
      </Div>
    </>
  )
}