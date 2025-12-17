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
  const {translateOption} = useTranslations()

  const data = useMemo(() => seq(fetcher.get?.data ?? []), [fetcher.get])

  return (
    <PdfSlide format="vertical">
      <Header />
      <PdfSlideBody>
        <Div>
          <Div column>
            <SlidePanel>
              <SlidePanelTitle>
                {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].perspective_effective_system}
              </SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={({perspective_effective_system}) => perspective_effective_system}
                label={translateOption('perspective_effective_system')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>
                {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].access_supervision_support}
              </SlidePanelTitle>
              <ChartBarSingleBy
                data={data}
                by={({access_supervision_support}) => access_supervision_support}
                label={translateOption('access_supervision_support')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].services_survivors_most}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={({services_survivors_most}) => services_survivors_most}
                label={translateOption('services_survivors_most')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>
                {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].effective_training_formats}
              </SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={({effective_training_formats}) => effective_training_formats}
                label={translateOption('effective_training_formats')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
          </Div>
          <Div column>
            <SlidePanel>
              <SlidePanelTitle>{m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].main_challenges_services}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={({main_challenges_services}) => main_challenges_services}
                label={translateOption('main_challenges_services')?.reduce(
                  (labels, {value, label}) => ({...labels, [value]: label}),
                  {} as any,
                )}
              />
            </SlidePanel>
            <SlidePanel>
              <SlidePanelTitle>{m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].main_barriers2025}</SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={({main_barriers2025}) => main_barriers2025}
                label={translateOption('main_barriers2025')?.reduce(
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
