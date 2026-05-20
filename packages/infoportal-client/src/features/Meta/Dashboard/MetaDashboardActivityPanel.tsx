import {useMemo, useState, type ChangeEvent} from 'react'
import {fnSwitch, Obj} from '@axanc/ts-utils'
import {Box, Typography, Stack, Switch} from '@mui/material'

import {useI18n} from '@/core/i18n'
import {useMetaContext} from '@/features/Meta/MetaContext'
import {ChartBar} from '@/shared/charts/ChartBar'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Lazy} from '@/shared/Lazy'
import {PanelWBody} from '@/shared/Panel/PanelWBody'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'

export const MetaDashboardActivityPanel = () => {
  const [type, setType] = useState<'sector' | 'activity' | 'modality' | 'nfis'>('sector')
  const {m} = useI18n()
  const {
    data: {filteredData},
  } = useMetaContext()
  const filteredFlatData = useMemo(
    () => filteredData.flatMap(({persons, ...rest}) => persons!.map((person) => ({...rest, persons: [person]}))),
    [filteredData],
  )
  const [dataSource, setDataSource] = useState<'submissions' | 'people'>('submissions')
  const toggleDataSource = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setDataSource(checked ? 'people' : 'submissions')
  }

  const data = dataSource === 'submissions' ? filteredData : filteredFlatData

  return (
    <PanelWBody>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
        <ScRadioGroup value={type} onChange={setType} inline dense>
          <ScRadioGroupItem hideRadio value="sector" title={m.program} />
          <ScRadioGroupItem hideRadio value="activity" title={m.activity} />
          <ScRadioGroupItem hideRadio value="modality" title={m.modality} />
          <ScRadioGroupItem hideRadio value="nfis" title={m.nfis} />
        </ScRadioGroup>
        <Box display="flex" flexDirection="row" gap={1}>
          <Typography>{m.submissions}</Typography>
          <Switch size="small" value={dataSource} color="primary" onChange={toggleDataSource} />
          <Typography>{m.people}</Typography>
        </Box>
      </Stack>

      {fnSwitch(type, {
        sector: <ChartBarSingleBy data={data} by={({sector}) => sector} />,
        activity: <ChartBarSingleBy data={data} by={({activity}) => activity} />,
        modality: <ChartBarSingleBy data={data} by={({modality}) => modality} />,
        nfis: (
          <Lazy
            deps={[data]}
            fn={() => {
              const d = data.map((_) => _.tags).compact()

              return {
                data: new Obj({
                  [m.nfi_.HKF]: {desc: 'HKF', value: d.sum((_) => _.HKF ?? 0)},
                  [m.nfi_.NFKF_KS]: {desc: 'NFKF_KS', value: d.sum((_) => _.NFKF_KS ?? 0)},
                  [m.nfi_.FoldingBed]: {desc: 'FoldingBed', value: d.sum((_) => _.FoldingBed ?? 0)},
                  [m.nfi_.FKS]: {desc: 'FKS', value: d.sum((_) => _.FKS ?? 0)},
                  [m.nfi_.CollectiveCenterKits]: {
                    desc: 'CollectiveCenterKits',
                    value: d.sum((_) => _.CollectiveCenterKits ?? 0),
                  },
                  [m.nfi_.BK]: {desc: 'BK', value: d.sum((_) => _.BK ?? 0)},
                  [m.nfi_.WKB]: {desc: 'WKB', value: d.sum((_) => _.WKB ?? 0)},
                  [m.nfi_.HKMV]: {desc: 'HKMV', value: d.sum((_) => _.HKMV ?? 0)},
                  [m.nfi_.ESK]: {desc: 'ESK', value: d.sum((_) => _.ESK ?? 0)},
                })
                  .sort(([, a], [, b]) => b.value - a.value)
                  .get(),
              }
            }}
          >
            {(_) => <ChartBar data={_.data} />}
          </Lazy>
        ),
      })}
    </PanelWBody>
  )
}
