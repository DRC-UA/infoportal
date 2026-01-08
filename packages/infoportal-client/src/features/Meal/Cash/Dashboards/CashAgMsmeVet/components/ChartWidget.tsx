import type {FC} from 'react'

import {useI18n} from '@/core/i18n'
import {SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

import {useTranslations} from '../hooks'

import type {ChartWidgetProps} from './types'

const ChartWidget: FC<ChartWidgetProps> = ({data, field, limitChartHeight}) => {
  const {m} = useI18n()
  const {translateField, translateOption} = useTranslations()

  return (
    <SlidePanel title={translateField && translateField(field)}>
      <ChartBarSingleBy
        data={data}
        by={({answers}) => String(answers[field])}
        label={translateOption(field)?.reduce(
          (labels, {value, label}) => ({...labels, ...{[value]: label}}),
          {} as Record<string, string>,
        )}
        limitChartHeight={limitChartHeight}
        includeNullish
      />
    </SlidePanel>
  )
}

export default ChartWidget
