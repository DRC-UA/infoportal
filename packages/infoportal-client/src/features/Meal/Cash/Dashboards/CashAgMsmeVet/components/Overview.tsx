import type {FC} from 'react'

import {Meal_cashPdm, OblastIndex} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {AgeGroupTable} from '@/shared'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody} from '@/shared/Panel'
import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'

import {CashIndividuals} from './CashIndividuals'
import ChartBarWidget from './ChartBarWidget'
import Subtitle from './Subtitle'
import type {OverviewProps} from './types'

const CashOverview: FC<OverviewProps> = ({data, pdmType}) => {
  const {m} = useI18n()

  return (
    <>
      <Subtitle text={m.overview} />
      <Div responsive>
        <Div column>
          <CashIndividuals data={data} />
          <Panel title={m.ageGroup}>
            <PanelBody>
              <AgeGroupTable
                tableId="cash-dashboard"
                persons={data.flatMap(({persons}) => persons).compact()}
                enableDisplacementStatusFilter
                enablePwdFilter
              />
            </PanelBody>
          </Panel>
        </Div>

        <Div column>
          <SlidePanel title={m.mealMonitoringPdm.pdmType}>
            <ChartBarSingleBy data={data} by={({pdmType}) => pdmType} label={Meal_cashPdm.options.pdmtype} />
          </SlidePanel>
          {(pdmType === undefined || pdmType.length === 0 || pdmType.includes('cfg')) && (
            <ChartBarWidget data={data} field={'cfg_type'} />
          )}
        </Div>

        <Div column>
          <Panel savableAsImg expendable title={m.location}>
            <PanelBody>
              <MapSvgByOblast
                sx={{maxWidth: 480, margin: 'auto'}}
                data={data}
                getOblast={({oblast}) => OblastIndex.byName(oblast)?.iso!}
                total={data.length}
              />
            </PanelBody>
          </Panel>
          <SlidePanel title={m.project}>
            <ChartBarSingleBy data={data} by={({project}) => project} includeNullish />
          </SlidePanel>
        </Div>
      </Div>
    </>
  )
}

export default CashOverview
