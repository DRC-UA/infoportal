import React, {useMemo} from 'react'
import {map, seq} from '@axanc/ts-utils'
import {Box} from '@mui/material'

import {KoboXmlMapper, OblastIndex, Meal_winterizationPdm, DrcOffice, Person} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useMealWinterizationContext} from '@/features/Meal/Winter/MealWinterizationContext'
import {SnapshotHeader} from '@/features/Snapshot/SnapshotHeader'
import {AgeGroupTable, Lazy} from '@/shared'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {Div, SlidePanel, PdfSlide, PdfSlideBody, SlideTxt, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {SnapshotLogoPDM} from '@/features/Snapshot/Winterization/Winterization'
import {Panel, PanelBody} from '@/shared/Panel'

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
        logo={SnapshotLogoPDM}
        showDashboardLink={false}
      />
      <PdfSlideBody>
        <Div>
          <Div column sx={{flex: 1}}>
            <SlideTxt>This snapshot summarizes the ... [ 📢 please help me with wording].</SlideTxt>
            <Div column sx={{flex: 1}}>
              <AgeGroupTable
                sx={{flex: 1}}
                tableId="pdm-dashboard"
                persons={persons}
                enableDisplacementStatusFilter
                enablePwdFilter
              />
              <Box sx={{display: 'flex', gap: 2, mt: 1}}>
                <SlideWidget title={m.avgMale} sx={{flex: 1}}>
                  <Lazy
                    deps={[data]}
                    fn={() => {
                      const values = seq(data)
                        .filter((_) => _.sex === 'male' && typeof _.age === 'number')
                        .map((_) => _.age!)
                      return values.length ? values.sum() / values.length : undefined
                    }}
                  >
                    {(value) => (
                      <Box display="flex" alignItems="center" gap={1}>
                        <span className="material-icons" style={{fontSize: 20, color: '#555'}}>
                          man
                        </span>
                        <strong style={{fontSize: 18}}>{value ? value.toFixed(1) : '–'}</strong>
                      </Box>
                    )}
                  </Lazy>
                </SlideWidget>
                <SlideWidget title={m.avgFemale} sx={{flex: 1}}>
                  <Lazy
                    deps={[data]}
                    fn={() => {
                      const values = seq(data)
                        .filter((_) => _.sex === 'female' && typeof _.age === 'number')
                        .map((_) => _.age!)
                      return values.length ? values.sum() / values.length : undefined
                    }}
                  >
                    {(value) => (
                      <Box display="flex" alignItems="center" gap={1}>
                        <span className="material-icons" style={{fontSize: 20, color: '#555'}}>
                          woman
                        </span>
                        <strong style={{fontSize: 18}}>{value ? value.toFixed(1) : '–'}</strong>
                      </Box>
                    )}
                  </Lazy>
                </SlideWidget>
              </Box>
            </Div>
            <Panel title={m.displacementStatus}>
              <PanelBody>
                <ChartBarSingleBy
                  data={data ?? seq([])}
                  by={(_) => _.status_person}
                  label={Meal_winterizationPdm.options.status_person}
                />
              </PanelBody>
            </Panel>
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
            <Box sx={{height: 316, borderRadius: (t) => t.shape.borderRadius}}>
              <MapSvgByOblast
                sx={{maxWidth: 480, margin: 'auto'}}
                fillBaseOn="value"
                data={data ?? seq([])}
                getOblast={(_) => mapOblast[_.ben_det_oblast!]}
                value={(_) => true}
                base={(_) => _.ben_det_oblast !== undefined}
              />
            </Box>
            <SlidePanel title={m.office} sx={{mt: 1}}>
              <ChartBarSingleBy
                data={data ?? seq([])}
                by={(_) => _.office}
                label={
                  Object.fromEntries(
                    Object.entries({
                      dnipro: DrcOffice.Dnipro,
                      empca: DrcOffice.Kharkiv,
                      mykolaiv: DrcOffice.Mykolaiv,
                      sumy: DrcOffice.Sumy,
                      chernihiv: DrcOffice.Chernihiv,
                      lviv: DrcOffice.Lviv,
                      zaporizhzhya: DrcOffice.Zaporizhzhya,
                      slovyansk: DrcOffice.Sloviansk,
                    }),
                  ) as Record<
                    'dnipro' | 'empca' | 'mykolaiv' | 'sumy' | 'chernihiv' | 'lviv' | 'zaporizhzhya' | 'slovyansk',
                    React.ReactNode
                  >
                }
              />
            </SlidePanel>
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}
