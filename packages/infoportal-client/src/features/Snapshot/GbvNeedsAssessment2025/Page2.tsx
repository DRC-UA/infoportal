import {useMemo} from 'react'
import {seq} from '@axanc/ts-utils'

import {OblastIndex, Protection_gbv_capacity_needs_assessment_2026 as GbvAssessmentNeeds} from 'infoportal-common'

import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useI18n} from '@/core/i18n'
import {DRCLogo} from '@/shared/logo/logo'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {PdfSlide, PdfSlideBody, SlidePanel, SlidePanelTitle} from '@/shared/PdfLayout/PdfSlide'

import Header from './Header'

export const snapshotGbvMonitoLogo = <DRCLogo />

const Page2 = () => {
  const {m} = useI18n()
  const ctxAnswers = useKoboAnswersContext()
  const fether = ctxAnswers.byName('protection_gbv_capacity_needs_assessment_2026')

  const data = useMemo(() => seq(fether.get?.data ?? []), [fether.get?.data])

  return (
    <PdfSlide format="vertical">
      <Header />
      <PdfSlideBody>
        <SlidePanel>
          <MapSvgByOblast
            sx={{mx: 2, mb: 2, mt: 1}}
            legend={false}
            getOblast={(_) => OblastIndex.byKoboName(_.oblast)?.iso!}
            data={data}
          />
          <SlidePanelTitle sx={{mb: 2}}>{m.gbvNeedsAssessmentSnapshot.mykolaiv[2025].mapLegendTitle}</SlidePanelTitle>
          <ChartBarSingleBy data={data} by={(_) => _.raion} label={GbvAssessmentNeeds.options.raion} />
        </SlidePanel>
      </PdfSlideBody>
    </PdfSlide>
  )
}

export default Page2
