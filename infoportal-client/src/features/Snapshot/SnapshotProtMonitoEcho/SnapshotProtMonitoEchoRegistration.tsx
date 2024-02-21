import React from 'react'
import {useSnapshotProtMonitoringContext} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoContext'
import {Div, PdfSlide, PdfSlideBody, SlideHeader, SlidePanel, SlidePanelTitle, SlideTxt} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {Lazy} from '@/shared/Lazy'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {getIdpsAnsweringRegistrationQuestion} from '@/features/Protection/DashboardMonito/ProtectionDashboardMonitoDocument'
import {chain, OblastIndex, Person, Protection_Hhs2} from '@infoportal-common'
import {ChartBar} from '@/shared/charts/ChartBar'
import {snapShotDefaultPieProps} from '@/features/Snapshot/SnapshotProtMonitoEcho/SnapshotProtMonitoEcho'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'

export const SnapshotProtMonitoEchoRegistration = () => {
  const {data, computed, period} = useSnapshotProtMonitoringContext()
  const {formatLargeNumber, m} = useI18n()
  return (
    <PdfSlide>
      <SlideHeader>{m.protHHSnapshot.titles.document}</SlideHeader>
      <PdfSlideBody>
        <Div>
          <Div column>
            <Lazy deps={[data]} fn={() => {
              const z = ChartHelperOld.byCategory({
                categories: computed.categoryOblasts('where_are_you_current_living_oblast'),
                data: computed.flatData,
                filter: _ => !!_.lackDoc && (_.lackDoc.includes('passport') || _.lackDoc.includes('tin')),
              })
              return z[OblastIndex.byName('Kharkivska').iso]
            }}>
              {_ =>
                <SlideTxt>
                  Significant challenges in accessing the compensation mechanism for damaged and destroyed property are still being reported, including due to a lack of required
                  documentation. While a low level of awareness on land and property rights has been identified, requests for legal awareness and assistance on HLP-related issues
                  (including obtaining property documentation and applying for compensation) have become more widespread, especially along frontline areas and the Russian border.
                </SlideTxt>
              }
            </Lazy>
            <SlidePanel>
              <SlidePanelTitle sx={{mb: 1}}>{m.protHHSnapshot.maleWithoutIDPCert}</SlidePanelTitle>
              <Div>
                <Lazy deps={[data, computed.lastMonth]} fn={d => ChartHelperOld.percentage({
                  data: getIdpsAnsweringRegistrationQuestion(d),
                  value: _ => _.isIdpRegistered !== 'yes' && _.are_you_and_your_hh_members_registered_as_idps !== 'yes_all'
                })}>
                  {(d, l) => (
                    <ChartPieWidget
                      title={m.all}
                      value={d.value}
                      base={d.base}
                      evolution={d.percent - l.percent}
                      {...snapShotDefaultPieProps}
                      sx={{
                        ...snapShotDefaultPieProps.sx,
                        flex: 1,
                        mb: 0,
                      }}
                    />
                  )}
                </Lazy>
                <Lazy deps={[data, computed.lastMonth]} fn={d => ChartHelperOld.percentage({
                  data: getIdpsAnsweringRegistrationQuestion(d).filter(_ => _.age && _.age >= 18 && _.age <= 60 && _.gender && _.gender === Person.Gender.Male),
                  value: _ => _.isIdpRegistered !== 'yes' && _.are_you_and_your_hh_members_registered_as_idps !== 'yes_all'
                })}>
                  {(d, l) => (
                    <ChartPieWidget
                      title={m.protHHSnapshot.male1860}
                      value={d.value}
                      base={d.base}
                      evolution={d.percent - l.percent}
                      {...snapShotDefaultPieProps}
                      sx={{
                        ...snapShotDefaultPieProps.sx,
                        flex: 1,
                        mb: 0,
                      }}
                    />
                  )}
                </Lazy>
              </Div>
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetByKey
                compare={{before: computed.lastMonth}}
                title={m.protHHS2.accessBarriersToObtainDocumentation}
                property="have_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation"
                filter={_ => !_.includes('no')}
                filterBase={_ => !_.includes('unable_unwilling_to_answer')}
                data={data}
                {...snapShotDefaultPieProps}
              />
              <ChartBarMultipleBy
                data={data}
                by={_ => _.have_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation}
                label={Protection_Hhs2.options.have_you_experienced_any_barriers_in_obtaining_or_accessing_identity_documentation_and_or_hlp_documentation}
                mergeOptions={{
                  distrust_of_public_institutions_and_authorities: 'other_specify',
                  discrimination: 'other_specify',
                  distance_or_cost_of_transportation: 'other_specify',
                }}
                filterValue={[
                  'no',
                  'unable_unwilling_to_answer',
                ]}
              />
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <Lazy deps={[data, computed.lastMonth]} fn={(x) => ChartHelperOld.percentage({
                data: x.flatMap(_ => _.persons).map(_ => _.lackDoc).compact(),
                value: _ => !_.includes('none')
              })}>
                {(_, last) => <ChartPieWidget
                  title={m.lackOfPersonalDoc}
                  value={_.value}
                  base={_.base}
                  {...snapShotDefaultPieProps}
                />}
              </Lazy>
              <Lazy deps={[data]} fn={() => chain(ChartHelperOld.multiple({
                data: data.flatMap(_ => _.persons).map(_ => _.lackDoc).compact(),
                filterValue: ['none', 'unable_unwilling_to_answer'],
              }))
                .map(ChartHelperOld.setLabel(Protection_Hhs2.options.does_1_lack_doc))
                .map(ChartHelperOld.sortBy.value)
                .get()}>
                {_ => <ChartBar data={_}/>}
              </Lazy>
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetByKey
                hideEvolution
                compare={{before: computed.lastMonth}}
                title={m.lackOfHousingDoc}
                property="what_housing_land_and_property_documents_do_you_lack"
                filterBase={_ => !_.includes('unable_unwilling_to_answer')}
                filter={_ => !_.includes('none')}
                data={data}
                {...snapShotDefaultPieProps}
              />
              {/*<ChartPieWidgetBy*/}
              {/*  hideEvolution*/}
              {/*  compare={{before: computed.lastMonth}}*/}
              {/*  title={m.lackOfHousingDoc}*/}
              {/*  filterBase={_ => !_.what_housing_land_and_property_documents_do_you_lack.includes('unable_unwilling_to_answer')}*/}
              {/*  filter={_ => !_.what_housing_land_and_property_documents_do_you_lack.includes('none')}*/}
              {/*  data={data}*/}
              {/*  {...snapShotDefaultPieProps}*/}
              {/*/>*/}
              <ChartBarMultipleBy
                data={data}
                by={_ => _.what_housing_land_and_property_documents_do_you_lack}
                filterValue={['unable_unwilling_to_answer', 'none']}
                mergeOptions={{
                  cost_estimation_certificate_state_commission_issued_when_personal_request_is_made: 'other_specify',
                  inheritance_certificate: 'other_specify',
                  // death_certificate_of_predecessor: 'other_specify',
                  document_issues_by_police_state_emergency_service_proving_that_the_house_was_damaged_destroyedfor_ukrainian_state_control_areas: 'document_issues_by_local_self_government_proving_that_the_house_was_damaged_destroyed',
                  informatsiyna_dovidka_informational_extract_on_damaged_property: 'other_specify',
                  death_declaration_certificate_by_ambulance_or_police_of_predecessor: 'other_specify',
                  construction_stage_substituted_with_bti_certificate_following_completion_of_construction: 'other_specify',
                  inheritance_will: 'other_specify',
                }}
                label={{
                  ...Protection_Hhs2.options.what_housing_land_and_property_documents_do_you_lack,
                  construction_stage_substituted_with_bti_certificate_following_completion_of_construction: 'Construction stage',
                  document_issues_by_local_self_government_proving_that_the_house_was_damaged_destroyed: 'Document issued by authority',
                  // document_issues_by_local_self_government_proving_that_the_house_was_damaged_destroyed: 'Document issued by local self-government proving a damaged house',
                  cost_estimation_certificate_state_commission_issued_when_personal_request_is_made: 'Cost estimation certificate - state commission',
                  // document_issues_by_police_state_emergency_service_proving_that_the_house_was_damaged_destroyedfor_ukrainian_state_control_areas: 'Document issued by authority proving a damaged house',
                }}
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}