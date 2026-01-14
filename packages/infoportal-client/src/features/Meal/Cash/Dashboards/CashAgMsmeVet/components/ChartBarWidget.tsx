import type {FC} from 'react'

import {useI18n} from '@/core/i18n'
import {SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'

import {useTranslations} from '../hooks'

import type {ChartWidgetProps} from './types'

const ChartBarWidget: FC<ChartWidgetProps> = ({data, field, limitChartHeight}) => {
  const {m} = useI18n()
  const {translateField, translateOption} = useTranslations()

  return (
    <SlidePanel title={translateField && translateField(field)}>
      {Array.isArray(data?.[0]?.answers[field]) ? (
        <ChartBarMultipleBy
          data={data}
          by={({answers}) => answers[field] as any}
          label={translateOption(field)?.reduce(
            (labels, {value, label}) => ({...labels, ...{[value]: label}}),
            {} as Record<string, string>,
          )}
          limitChartHeight={limitChartHeight}
          includeNullish
        />
      ) : (
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
      )}
    </SlidePanel>
  )
}

export default ChartBarWidget
