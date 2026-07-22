import type {FC} from 'react'

import {useI18n} from '@/core/i18n'
import {SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {useKoboTranslations} from '@/utils'

import type {ChartWidgetProps} from './types'

const ChartBarWidget: FC<ChartWidgetProps> = ({data, field, limitChartHeight}) => {
  const {m} = useI18n()
  const {translateField, translateLabels} = useKoboTranslations('meal_ecrec_agMsmeVetPam')

  return (
    <SlidePanel title={translateField(field)}>
      {Array.isArray(data?.[0]?.answers[field]) ? (
        <ChartBarMultipleBy
          data={data}
          by={({answers}) => answers[field] as any}
          label={translateLabels(field)}
          limitChartHeight={limitChartHeight}
          includeNullish
        />
      ) : (
        <ChartBarSingleBy
          data={data}
          by={({answers}) => String(answers[field])}
          label={translateLabels(field)}
          limitChartHeight={limitChartHeight}
          includeNullish
        />
      )}
    </SlidePanel>
  )
}

export default ChartBarWidget
