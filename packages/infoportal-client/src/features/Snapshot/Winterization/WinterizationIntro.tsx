import {useMemo} from 'react'
import {map, seq} from '@axanc/ts-utils'
import {Box} from '@mui/material'

import {KoboXmlMapper, OblastIndex, Meal_winterizationPdm} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {SnapshotHeader} from '@/features/Snapshot/SnapshotHeader'
import {snapshotProtMonitoNn2Logo} from '@/features/Snapshot/SnapshotProtMonitoNN2/SnapshotProtMonitoNN2'
import {AgeGroupTable, Lazy} from '@/shared'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Panel, PanelBody, PanelTitle} from '@/shared/Panel'
import {Div, SlidePanel, PdfSlide, PdfSlideBody, SlideTxt, SlideWidget} from '@/shared/PdfLayout/PdfSlide'

export const WinterizationIntro = () => {
  const ctx = useMealWinterizationContext()
  const {formatLargeNumber, m} = useI18n()

  const mapOblast = OblastIndex.koboOblastIndexIso

  const data = useMemo(() => {
    return map(ctx.fetcherAnswers.get, (record) => seq(record))
  }, [ctx.fetcherAnswers.get])

  const keyFigures = useMemo(
    () => [
      {
        icon: 'location_on',
        label: m.coveredOblasts,
        valueFn: () => {
          const values = seq(data)
            .map((_) => _.ben_det_oblast)
            .compact()
          return values.distinct((_) => _).length
        },
      },
      {
        icon: 'location_on',
        label: m.coveredRaions,
        valueFn: () => {
          const values = seq(data)
            .map((_) => _.ben_det_raion)
            .compact()
          return values.distinct((_) => _).length
        },
      },
      {
        icon: 'fingerprint',
        label: m.uniqIndividuals,
        valueFn: () => {
          const values = seq(data)
            .map((_) => _.unique_number)
            .compact()
          return values.distinct((_) => _).length
        },
      },
    ],
    [data],
  )

  const persons = useMemo(() => {
    return data ? data.flatMap((entry) => KoboXmlMapper.Persons.winter_pdm(entry) ?? []) : []
  }, [data])

  return (
    <PdfSlide>
      <SnapshotHeader
        title="Winterization 2024-2025"
        subTitle="PDM"
        period={ctx.periodFilter}
        dashBoardHref="https://infoportal-ua.drc.ngo/meal#/winterization/dashboard"
        logo={snapshotProtMonitoNn2Logo}
      />
      <PdfSlideBody>
        <Div>
          <Div column sx={{flex: 1}}>
            <SlideTxt>This snapshot summarizes the ... [ 📢 please help me with wording].</SlideTxt>
            <Box sx={{height: 316, borderRadius: (t) => t.shape.borderRadius}}>
              <PanelTitle sx={{mb: 3, mt: 1}}>Oblasts Covered</PanelTitle>
              <MapSvgByOblast
                sx={{maxWidth: 480, margin: 'auto'}}
                fillBaseOn="value"
                data={data ?? seq([])}
                getOblast={(_) => mapOblast[_.ben_det_oblast!]}
                value={(_) => true}
                base={(_) => _.ben_det_oblast !== undefined}
              />
            </Box>
          </Div>
          <Div column sx={{flex: 1}}>
            <Div sx={{flex: 1}}>
              {keyFigures.map(({label, valueFn, icon}) => (
                <SlideWidget key={label} title={label} sx={{flex: 1}}>
                  <Lazy deps={[data]} fn={valueFn}>
                    {(value) => (
                      <Box display="flex" alignItems="center" gap={1}>
                        <span className="material-icons" style={{fontSize: 20, color: '#555'}}>
                          {icon}
                        </span>
                        <strong style={{fontSize: 18}}>{formatLargeNumber(value)}</strong>
                      </Box>
                    )}
                  </Lazy>
                </SlideWidget>
              ))}
            </Div>
            <Div column sx={{flex: 1}}>
              <AgeGroupTable
                sx={{flex: 1}}
                tableId="pdm-dashboard"
                persons={persons}
                enableDisplacementStatusFilter
                enablePwdFilter
              />
              <SlidePanel title={m.project}>
                <ChartBarSingleBy
                  data={data ?? seq([])}
                  by={(_) => _.donor}
                  label={Meal_winterizationPdm.options.donor}
                />
              </SlidePanel>
              <SlidePanel title={m.mealMonitoringPdm.pdmType}>
                <ChartBarSingleBy
                  data={data ?? seq([])}
                  by={(_) => _.pdmtype}
                  label={Meal_winterizationPdm.options.pdmtype}
                />
              </SlidePanel>
            </Div>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}
