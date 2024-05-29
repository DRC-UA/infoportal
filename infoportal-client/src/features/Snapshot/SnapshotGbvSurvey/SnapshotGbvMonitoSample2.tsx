import React, {useEffect, useMemo} from 'react'
import {useTheme} from '@mui/material'
import {Div, PdfSlide, PdfSlideBody, SlidePanel, SlidePanelTitle} from '@/shared/PdfLayout/PdfSlide'
import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Protection_gbvSocialProviders} from '@infoportal-common'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {seq} from '@alexandreannic/ts-utils'
import {ChartPieWidgetBy} from '@/shared/charts/ChartPieWidgetBy'
import GbvSurveyHeader from '@/features/Snapshot/SnapshotGbvSurvey/GbvSurveyHeader'

export const SnapshotMonitoSample2 = () => {
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
            <SlidePanel>
              <SlidePanelTitle sx={{mb: 1}}>{m.protection_gbv_survey.modality}</SlidePanelTitle>
              <Div>
                <ChartPieWidgetBy sx={{flex: 1}} title="On going" dense data={data} filter={_ => _.preferred_modality_training === 'ongoing'}/>
                <ChartPieWidgetBy sx={{flex: 1}} title="Once off block" dense data={data} filter={_ => _.preferred_modality_training === 'once_block'}/>
              </Div>
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                dense
                title={m.protection_gbv_survey.believe}
                data={data}
                filter={_ => _.consider_mental_health === 'necessary' || _.consider_mental_health === 'very_necessary'}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.protection_gbv_survey.overwhelm}</SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={_ => _.feel_overwhelmed_workload}
                label={Protection_gbvSocialProviders.options.feel_overwhelmed_workload}/>
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.protection_gbv_survey.preferences}</SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={_ => _.training_model}
                label={{
                  ...Protection_gbvSocialProviders.options.training_model,
                  hybrid: 'Hybrid (mix of in-person and online)',
                }}
              />
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <SlidePanelTitle>{m.protection_gbv_survey.departments}</SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={_ => _.department}
                label={Protection_gbvSocialProviders.options.department}/>
            </SlidePanel>
            <SlidePanel>
              <ChartPieWidgetBy
                dense
                title={m.protection_gbv_survey.respondents}
                data={data}
                filter={_ => _.interested_training_families_gbv === 'yes'}
              />
              {/*<ChartBarSingleBy*/}
              {/*  data={data}*/}
              {/*  by={_ => _.interested_training_families_gbv}*/}
              {/*  label={Protection_gbvSocialProviders.options.interested_training_families_gbv}*/}
              {/*/>*/}
              <SlidePanelTitle sx={{mt: 2}}>{m.protection_gbv_survey.topic}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={_ => _.interested_training_families_gbv_yes}
                label={{
                  ...Protection_gbvSocialProviders.options.interested_training_families_gbv_yes,
                  theory_prevent_violence_against_women: `Prevent violence against women and girls`,
                  ensuring_women_safety: `Ensuring women's and children's safety`,
                  ensuring_safety_women: `Ensuring the safety of women and girls`,
                  guidance_engaging_men: `Guidance on engaging men`,
                }}>
              </ChartBarMultipleBy>
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}