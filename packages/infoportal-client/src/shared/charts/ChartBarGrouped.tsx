import type {ReactNode, ComponentProps} from 'react'
import {Box, Typography, useTheme} from '@mui/material'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type BarProps,
  type LabelListProps,
} from 'recharts'

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
  layout?: 'horizontal' | 'vertical'
  barChartProps?: ComponentProps<typeof BarChart>
  barProps?: Partial<Record<string, Pick<BarProps, 'stackId'>>>
  barLabelProps?: Record<string, LabelListProps<{}>>
}

export const ChartBarVerticalGrouped = ({
  data,
  height = 640,
  width = '100%',
  showGrid = true,
  showLegend = true,
  layout = 'horizontal',
  barChartProps,
  barProps,
  barLabelProps,
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
        <BarChart data={flattened} layout={layout} barCategoryGap={10} barGap={2} {...barChartProps}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" syncWithTicks />}
          {layout === 'vertical' ? (
            <>
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" tick={false} hide={true} />
            </>
          ) : (
            <>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
            </>
          )}
          <Tooltip
            content={({active, payload, ...rest}) => {
              if (!active || !payload?.length) return null
              return (
                <Box
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    p: 1,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    boxShadow: 2,
                  }}
                >
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
                        <Typography variant="caption">
                          {item.value}
                          {meta?.base && ` / ${meta.base} (${toPercent(item.value / meta.base)})`}
                        </Typography>
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
              {...(barProps ? barProps[key] : {})}
            >
              {barLabelProps ? (
                <LabelList {...barLabelProps[key]}>{barLabelProps[key]?.content as ReactNode}</LabelList>
              ) : null}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
