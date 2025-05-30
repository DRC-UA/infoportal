import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type YAxisProps,
  type XAxisProps,
  type TooltipProps,
  type CartesianGridProps,
} from 'recharts'
import {Box, useTheme, type BoxProps, type Theme} from '@mui/material'

import {commonLegendProps} from '@/shared/charts/ChartBarStacked'
import {chartConfig} from '@/shared/charts/chartConfig'

export interface ChartBarVerticalProps extends BoxProps {
  colors?: (t: Theme) => string[]
  height?: number | string
  width?: number | string
  data: ({name: string} | Record<string, number>)[]
  hideYTicks?: boolean
  hideLegends?: boolean
  axes?: {
    x?: XAxisProps
    y?: YAxisProps
  }
  showGrid?: boolean
  extraKeys?: string[]
  slotProps?: {
    Tooltip?: TooltipProps<number | string, string>
    CartesianGrid?: CartesianGridProps
  }
}

export const ChartBarVertical = ({
  width,
  height,
  hideYTicks,
  hideLegends,
  sx,
  data,
  colors = chartConfig.defaultColors,
  axes,
  showGrid = false,
  extraKeys = [],
  slotProps,
  ...boxProps
}: ChartBarVerticalProps) => {
  const theme = useTheme()
  height = height ?? width ?? 340
  width = width ?? '100%'
  const bars = Object.keys(data[0] ?? {}).filter((key) => !['name', ...extraKeys].includes(key))

  return (
    <Box sx={{position: 'relative', height, width, ...sx}} {...boxProps}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={500} height={300} data={data}>
          {showGrid && <CartesianGrid {...slotProps?.CartesianGrid} />}
          <XAxis dataKey="name" {...axes?.x} />
          <YAxis interval={1} hide={hideYTicks} {...axes?.y} />
          <Tooltip {...slotProps?.Tooltip} />
          {!hideLegends && <Legend {...commonLegendProps} />}
          {bars.map((_, i) => (
            <Bar key={_} dataKey={_} fill={colors(theme)[i]} label={axes?.y?.label} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
