import {useMemo} from 'react'
import {seq} from '@axanc/ts-utils'

import {useI18n} from '@/core/i18n'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {DRCLogo} from '@/shared/logo/logo'
import {Div, PdfSlide, PdfSlideBody, SlidePanelTitle} from '@/shared/PdfLayout/PdfSlide'

import Header from './Header'
import {useTranslations} from './hooks'

export const snapshotGbvMonitoLogo = <DRCLogo />

const Page1 = () => {
  const {m} = useI18n()
  const ctxAnswers = useKoboAnswersContext()
  const fether = ctxAnswers.byName('protection_gbv_capacity_needs_assessment_2026')
  const {translateOption, translateField} = useTranslations()

  const data = useMemo(() => seq(fether.get?.data ?? []), [fether.get?.data])

  const translatedTopicLabels = translateOption('areas_staff_training')?.reduce(
    (labels, option) => ({...labels, [option.value]: option.label}),
    {} as any,
  )

  return (
    <PdfSlide format="vertical">
      <Header />
      <PdfSlideBody>
        <Div>
          <Div column>
            <div>
              <SlidePanelTitle sx={{marginBlock: 2}}>
                {m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].priorityTrainingTitle}
              </SlidePanelTitle>
              <ChartBarMultipleBy
                data={data}
                by={({areas_staff_training}) => areas_staff_training}
                label={translatedTopicLabels}
              />
            </div>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}

export default Page1
