import React from 'react'
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend} from 'recharts'
import {Box, Typography, useTheme} from '@mui/material'
import {toPercent} from 'infoportal-common'

export interface GroupedBarChartBar {
  key: string
  label: string
  value: number
  base?: number
  color?: string
  desc?: string
}

export interface ChartBarGrouped {
  category: string
  bars: GroupedBarChartBar[]
}

interface Props {
  data: ChartBarGrouped[]
  height?: number | string
  width?: number | string
  showGrid?: boolean
  showLegend?: boolean
}

export const ChartBarVerticalGrouped = ({
  data,
  height = 640,
  width = '100%',
  showGrid = true,
  showLegend = true,
}: Props) => {
  const theme = useTheme()

  const allKeys = Array.from(new Set(data.flatMap((group) => group.bars.map((bar) => bar.key))))

  const flattened = data.map((group) => {
    const entry: Record<string, any> = {name: group.category}
    group.bars.forEach((bar) => {
      entry[bar.key] = bar.value
    })
    return entry
  })

  const barMeta: Record<string, {label: string; base?: number; desc?: string; color?: string}> = Object.fromEntries(
    data
      .flatMap((group) => group.bars)
      .map((bar) => [
        bar.key,
        {
          label: bar.label,
          base: bar.base,
          desc: bar.desc,
          color: bar.color,
        },
      ]),
  )

  return (
    <Box sx={{position: 'relative', height, width}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={flattened} barCategoryGap={10} barGap={2}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip
            content={({active, payload}) => {
              if (!active || !payload?.length) return null
              return (
                <Box sx={{backgroundColor: 'white', p: 1, border: '1px solid #ccc', borderRadius: 1, boxShadow: 2}}>
                  {payload.map((item: any) => {
                    const meta = barMeta[item.dataKey as string]
                    return (
                      <Box key={item.dataKey} sx={{mb: 0.5}}>
                        <Typography fontWeight="bold">{meta.label}</Typography>
                        {meta.desc && (
                          <Typography variant="caption" color="text.secondary">
                            {meta.desc}
                          </Typography>
                        )}
                        {meta.base != null && (
                          <Typography variant="caption">
                            {`${item.value} / ${meta.base} (${toPercent(item.value / meta.base)})`}
                          </Typography>
                        )}
                      </Box>
                    )
                  })}
                </Box>
              )
            }}
          />
          {showLegend && <Legend />}
          {allKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              name={barMeta[key]?.label || key}
              fill={barMeta[key]?.color || theme.palette.primary.main}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
