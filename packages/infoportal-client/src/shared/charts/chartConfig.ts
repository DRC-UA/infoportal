import {alpha, Theme} from '@mui/material'

export const chartConfig = {
  defaultColors: (t: Theme) => [
    t.palette.primary.main,
    alpha(t.palette.primary.light, .3),
    '#008a09',
    'red',
    'orange'
  ]
}