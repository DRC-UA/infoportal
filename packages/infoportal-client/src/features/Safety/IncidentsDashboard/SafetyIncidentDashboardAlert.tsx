import {mapFor, Obj} from '@axanc/ts-utils'
import {useMemo} from 'react'
import {Box, Theme} from '@mui/material'
import {Lazy} from '@/shared/Lazy'
import {format} from 'date-fns'
import {useI18n} from '@/core/i18n'
import {MapSvgByOblast} from '@/shared/maps/MapSvgByOblast'
import {formatLargeNumber} from '@/core/i18n/localization/en'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Panel, PanelBody, PanelHead} from '@/shared/Panel'
import {ChartLine} from '@/shared/charts/ChartLine'
import {AlertType} from '@/features/Safety/IncidentsDashboard/SafetyIncidentDashboardBody'
import {useSafetyIncidentContext} from '@/features/Safety/IncidentsDashboard/SafetyIncidentContext'

const colors = (t: Theme) => ({
  green: '#99ff99',
  blue: '#4db8ff',
  yellow: '#F2E866',
  red: '#ff3333',
})

export const SafetyIncidentDashboardAlert = () => {
  const {m} = useI18n()
  const {dataFiltered, optionFilter, setOptionFilters} = useSafetyIncidentContext()
  const flatAlertData = useMemo(() => {
    return dataFiltered.flatMap((_) => {
      const res = [
        ...(_.alert_green_num
          ? mapFor(Math.abs(_.alert_green_num ?? 0), () => ({..._, alertType: AlertType.green}))
          : []),
        ...(_.alert_blue_num ? mapFor(Math.abs(_.alert_blue_num ?? 0), () => ({..._, alertType: AlertType.blue})) : []),
        ...(_.alert_yellow_num
          ? mapFor(Math.abs(_.alert_yellow_num ?? 0), () => ({..._, alertType: AlertType.yellow}))
          : []),
        ...(_.alert_red_num ? mapFor(Math.abs(_.alert_red_num ?? 0), () => ({..._, alertType: AlertType.red})) : []),
      ]
      return res
    })
  }, [dataFiltered])

  const sum = useMemo(() => {
    return {
      green: flatAlertData?.count((_) => _.alertType === AlertType.green),
      blue: flatAlertData?.count((_) => _.alertType === AlertType.blue),
      yellow: flatAlertData?.count((_) => _.alertType === AlertType.yellow),
      red: flatAlertData?.count((_) => _.alertType === AlertType.red),
    }
  }, [flatAlertData])

  const handleFilterChange = (alertTypes: AlertType[]) => {
    setOptionFilters((prev) => {
      const newAlertTypes = alertTypes.map(String)
      if (JSON.stringify(prev.alertType) !== JSON.stringify(newAlertTypes)) {
        return {...prev, alertType: newAlertTypes}
      }
      return prev
    })
  }

  return (
    <>
      <Panel>
        <PanelHead
          action={
            <ScRadioGroup<AlertType>
              multiple
              value={(optionFilter.alertType as AlertType[]) || []}
              onChange={handleFilterChange}
              dense
              inline
              sx={{width: '100%'}}
            >
              <ScRadioGroupItem
                hideRadio
                title={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{lineHeight: 1, fontSize: 18, mr: 1.5}}>✅</Box>
                    <Box>{formatLargeNumber(sum.green)}</Box>
                  </Box>
                }
                value={AlertType.green}
              ></ScRadioGroupItem>
              <ScRadioGroupItem
                hideRadio
                title={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{lineHeight: 1, fontSize: 18, mr: 1.5}}>🔷</Box>
                    <Box>{formatLargeNumber(sum.blue)}</Box>
                  </Box>
                }
                value={AlertType.blue}
              ></ScRadioGroupItem>
              <ScRadioGroupItem
                hideRadio
                title={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{lineHeight: 1, fontSize: 18, mr: 1.5}}>⚠️</Box>
                    <Box>{formatLargeNumber(sum.yellow)}</Box>
                  </Box>
                }
                value={AlertType.yellow}
              ></ScRadioGroupItem>
              <ScRadioGroupItem
                hideRadio
                title={
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{lineHeight: 1, fontSize: 18, mr: 1.5}}>🚨</Box>
                    <Box>{formatLargeNumber(sum.red)}</Box>
                  </Box>
                }
                value={AlertType.red}
              ></ScRadioGroupItem>
            </ScRadioGroup>
          }
        >
          {m.safety.alerts}
        </PanelHead>

        <PanelBody>
          <MapSvgByOblast
            sx={{maxWidth: 420, mt: 1, margin: 'auto'}}
            fillBaseOn="value"
            data={flatAlertData?.filter(
              (_) =>
                (optionFilter.alertType || []).length === 0 ||
                (optionFilter.alertType as AlertType[]).includes(_.alertType),
            )}
            total={flatAlertData?.length}
            getOblast={(_) => _.oblastISO}
            value={(_) => true}
          />

          <Lazy
            deps={[flatAlertData]}
            fn={() => {
              const gb = flatAlertData.groupBy((d) => format(d.date, 'yyyy-MM'))
              return new Obj(gb)
                .map((k, v) => [
                  k,
                  {
                    red: v.count((_) => _.alertType === AlertType.red),
                    yellow: v.count((_) => _.alertType === AlertType.yellow),
                    blue: v.count((_) => _.alertType === AlertType.blue),
                    green: v.count((_) => _.alertType === AlertType.green),
                  },
                ])
                .sort(([ka], [kb]) => ka.localeCompare(kb))
                .entries()
                .map(
                  ([k, v]) =>
                    ({
                      name: k,
                      red: v.red,
                      yellow: v.yellow,
                      blue: v.blue,
                      green: v.green,
                    }) as {name: string; red: number; yellow: number; blue: number; green: number},
                )
            }}
          >
            {(_) => (
              <ChartLine
                height={200}
                fixMissingMonths
                data={_ as any}
                translation={{
                  green: m.safety.green,
                  blue: m.safety.blue,
                  yellow: m.safety.yellow,
                  red: m.safety.red,
                }}
                colorsByKey={colors}
              />
            )}
          </Lazy>
        </PanelBody>
      </Panel>
    </>
  )
}
