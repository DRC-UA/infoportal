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

  const KeyFigureWidget = ({icon, title, value}: {icon: string; title: string; value: React.ReactNode}) => {
    return (
      <SlideWidget title={title} sx={{flex: 1}}>
        <Box display="flex" alignItems="center" gap={1}>
          <span className="material-icons" style={{fontSize: 20, color: '#555'}}>
            {icon}
          </span>
          <strong style={{fontSize: 18}}>{value}</strong>
        </Box>
      </SlideWidget>
    )
  }

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
      // {
      //   icon: 'fingerprint',
      //   label: m.uniqIndividuals,
      //   valueFn: () => {
      //     const values = seq(data)
      //       .map((_) => _.unique_number)
      //       .compact()
      //     return values.distinct((_) => _).length
      //   },
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
        subTitle="Post Assistance Monitoring Results"
        period={ctx.periodFilter}
        logo={SnapshotLogoPDM}
        showDashboardLink={false}
      />
      <PdfSlideBody>
        <Div>
          <Div column sx={{flex: 1}}>
            <SlideTxt>
              DRC Ukraine interviewed 2,684 households across 9 Oblasts and 20 Raions of Ukraine to
              assess the impact of cash for utilities and cash for fuel programming funded by ECHO, UHF, and SDC. The
              larger sample size was utilised to ensure sampling was representative at a Hromada level, to ensure DRC
              had a more granular understanding of the value of this approach to winterisation support. As part of the
              post-assistance monitoring, DRC asked additional questions related to the preference of assistance
              modality, as well as anticipated needs for winter 2025/26.{' '}
            </SlideTxt>
            <SlidePanel>
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
            </SlidePanel>
            <SlideTxt>
              DRC will use this data to contribute to a larger needs assessment, with additional data to triangulate
              findings and provide a better understanding of service provision and market availability to be collected
              in May 2025.
            </SlideTxt>
          </Div>
          <Div>
            <Div column sx={{flex: 1}}>
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
                <Box sx={{height: 250}}>
                  <MapSvgByOblast
                    sx={{maxWidth: 350, mx: 'auto', transform: 'scale(0.9)'}}
                    fillBaseOn="value"
                    data={data ?? seq([])}
                    getOblast={(_) => mapOblast[_.ben_det_oblast!]}
                    value={(_) => true}
                    base={(_) => _.ben_det_oblast !== undefined}
                  />
                </Box>
              </Div>
              <Box sx={{display: 'flex', gap: 2, mt: 1}}>
                <KeyFigureWidget icon="person" title={m.households} value={formatLargeNumber(persons.length)} />
                <KeyFigureWidget
                  icon="man"
                  title={m.avgMale}
                  value={
                    <Lazy
                      deps={[data]}
                      fn={() => {
                        const values = seq(data)
                          .filter((_) => _.sex === 'male' && typeof _.age === 'number')
                          .map((_) => _.age!)
                        return values.length ? values.sum() / values.length : undefined
                      }}
                    >
                      {(value) => (value ? value.toFixed(1) : '–')}
                    </Lazy>
                  }
                />
                <KeyFigureWidget
                  icon="woman"
                  title={m.avgFemale}
                  value={
                    <Lazy
                      deps={[data]}
                      fn={() => {
                        const values = seq(data)
                          .filter((_) => _.sex === 'female' && typeof _.age === 'number')
                          .map((_) => _.age!)
                        return values.length ? values.sum() / values.length : undefined
                      }}
                    >
                      {(value) => (value ? value.toFixed(1) : '–')}
                    </Lazy>
                  }
                />
              </Box>
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
          </Div>
        </Div>
      </PdfSlideBody>
    </PdfSlide>
  )
}
