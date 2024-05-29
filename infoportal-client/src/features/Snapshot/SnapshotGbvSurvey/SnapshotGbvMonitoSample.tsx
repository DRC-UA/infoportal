import React, {useEffect, useMemo} from 'react'
import {useTheme} from '@mui/material'
import {Div, PdfSlide, PdfSlideBody, SlidePanel, SlidePanelTitle} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {DRCLogo} from '@/shared/logo/logo'
import {useAppSettings} from '@/core/context/ConfigContext'
import {OblastIndex, Protection_gbvSocialProviders} from '@infoportal-common'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import GbvSurveyHeader from '@/features/Snapshot/SnapshotGbvSurvey/GbvSurveyHeader'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {seq} from '@alexandreannic/ts-utils'
import {UaMapBy} from '@/features/DrcUaMap/UaMapBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

export const snapshotGbvMonitoLogo = (
  <DRCLogo/>
)

export const SnapshotMonitoSample = () => {
  const theme = useTheme()
  const {conf} = useAppSettings()
  const {formatLargeNumber, m} = useI18n()
  const ctxAnswers = useKoboAnswersContext()

  useEffect(() => {
    ctxAnswers.byName.fetch({}, 'protection_gbvSocialProviders')
  }, [])

  const data = useMemo(() => {
    return seq(ctxAnswers.byName.get('protection_gbvSocialProviders')?.data ?? [])
  }, [ctxAnswers.byName])

  return (
    <PdfSlide>
      <GbvSurveyHeader/>
      <PdfSlideBody>
        <Div>
          <Div column>
            <div>
              <SlidePanelTitle>{m.protection_gbv_survey.priorityNeeds}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={_ => _.priority_training_needs}
                label={{
                  ...Protection_gbvSocialProviders.options.priority_training_needs,
                  working_older_people: `Working with older people at risk`,
                  survivors_sexual_violence: `Working with people of sexual violence`,
                  supervision_skills_gbv: `Supervision skills for GBV case managers`,
                  survivors_intimate_partner: `Working with people of intimate partner`,
                  psychosocial_group_intervention: `Psychosocial group intervention`,
                  diverse_sexual_orientation: `Persons with a diverse sexual orientation and gender identity`,
                  working_persons_disabilities: `Working with persons with disabilities`,
                }}
              />
            </div>
          </Div>
          <Div column>
            <SlidePanel>
              <UaMapBy sx={{mx: 2, mb: 2, mt: 1}} legend={false} getOblast={_ => OblastIndex.byName('Mykolaivska').iso} data={data}/>
              <SlidePanelTitle>{m.protection_gbv_survey.community}</SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={_ => _.raion_mykolaiv_working}
                label={Protection_gbvSocialProviders.options.raion_mykolaiv_working}/>
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}