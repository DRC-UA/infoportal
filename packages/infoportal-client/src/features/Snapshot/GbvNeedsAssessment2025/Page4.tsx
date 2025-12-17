import {useMemo} from 'react'
import {seq} from '@axanc/ts-utils'

import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useI18n} from '@/core/i18n'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Div, PdfSlide, PdfSlideBody, SlidePanel, SlidePanelTitle} from '@/shared/PdfLayout/PdfSlide'

import Header from './Header'
import {useTranslations} from './hooks'

const Page3 = () => {
  const {m} = useI18n()
  const ctxAnswers = useKoboAnswersContext()
  const fetcher = ctxAnswers.byName('protection_gbv_capacity_needs_assessment_2026')
  const {translateOption, translateField} = useTranslations()

  const data = useMemo(() => seq(fetcher.get?.data ?? []), [fetcher.get])

  return (
    <PdfSlide format="vertical">
      <Header />
      <PdfSlideBody>
        <Div>
          <Div column>
            <SlidePanel>
              <SlidePanelTitle>{m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].areas_staff_training}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={({areas_staff_training}) => areas_staff_training}
                label={translateOption('areas_staff_training')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <SlidePanelTitle>
                {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].training_high_risk_groups_yes}
              </SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={({training_high_risk_groups_yes}) => training_high_risk_groups_yes}
                label={translateOption('training_high_risk_groups_yes')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].manage_staff_burnout}</SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={({manage_staff_burnout}) => manage_staff_burnout}
                label={translateOption('manage_staff_burnout')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>
                {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].strengthen_capacity_respond}
              </SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={({strengthen_capacity_respond}) => strengthen_capacity_respond}
                label={translateOption('strengthen_capacity_respond')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}

export default Page3
