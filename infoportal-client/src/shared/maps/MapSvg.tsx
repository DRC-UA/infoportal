import {OblastIndex, OblastISO, toPercent} from '@infoportal-common'
import {Enum, map, seq} from '@alexandreannic/ts-utils'
import {MapSvgPaths, ukraineSvgPath} from './mapSvgPaths'
import {alpha, Box, BoxProps, darken, useTheme} from '@mui/material'
import {useMemo} from 'react'
import {Txt} from 'mui-extension'
import {formatLargeNumber} from '@/core/i18n/localization/en'

// viewBox="22.138577 52.380834 40.220623 44.387017"
// width="612.47321"
// height="408.0199"

const minAlpha = .05
const maxAlpha = .8
const medianAlpha = minAlpha + (maxAlpha - minAlpha) / 2

const computeFill = (value: number, min: number, max: number) => {
  if (max - min === 0) return
  return value > 0 ? (maxAlpha - minAlpha) * (value - min) / (max - min) + minAlpha : undefined
}

export const MapSvg = ({
  data = {} as any,
  omitValueLt = 0,
  base,
  fillBaseOn,
  onSelect,
  legend = true,
  title,
  maximumFractionDigits,
  sx,
}: {
  maximumFractionDigits?: number
  omitValueLt?: number
  legend?: boolean
  title?: string
  onSelect?: (oblast: OblastISO) => void
  base?: number
  fillBaseOn?: 'percent' | 'value'
  data?: Partial<{ [key in keyof MapSvgPaths]: {value: number, base?: number} }>
} & Pick<BoxProps, 'sx'>) => {
  const theme = useTheme()

  const filteredData = useMemo(() => {
    return omitValueLt ? new Enum(data).filter((k, v) => !!v && v.value >= omitValueLt).get() : data
  }, [data])


  const {max, min, maxPercent, minPercent} = useMemo(() => {
    const _data = seq(Enum.values(filteredData)).compact().get()
    const values = _data.map(_ => _!.value ?? 0)
    // TODO _data.map create invalid array length
    const percents = ((_data[0] && _data[0].base !== undefined) || base !== undefined) ? _data.map(_ => {
      const b = (base ?? _.base) || 1
      if (!b) {
        return 0
      } else {
        return (_.value ?? 0) / b
      }
    }) : undefined
    return {
      max: Math.max(...values),
      min: Math.min(...values),
      // maxPercent: 1,
      // minPercent: 0,
      ...percents && {
        maxPercent: Math.max(...percents),
        minPercent: Math.min(...percents),
      }
    }
  }, [filteredData])

  const generateColor = (fill: number | undefined) => {
    if (fill) {
      if (fill < medianAlpha) {
        return alpha(theme.palette.primary.main, map(fill * 2, _ => Math.max(_, 0))!)
      } else {
        return darken(theme.palette.primary.main, map((fill - .5) * 2, _ => Math.max(_, 0))!)
      }
    }

    return theme.palette.divider
  }

  return (
    <Box sx={{...sx, position: 'relative'}}>
      <Box
        component="svg"
        preserveAspectRatio="xMidYMin slice"
        // style={{width: '100%',}}
        viewBox="0 0 612 408"
      >
        <g stroke={theme.palette.background.paper} strokeWidth="1">
          {Enum.keys(ukraineSvgPath).map(iso => {
            const res = filteredData[iso] ? (() => {
              const value = filteredData[iso]!.value
              const _base = base ?? filteredData[iso]!.base
              const percent = _base ? value / _base : undefined
              const fill = (percent && fillBaseOn === 'percent' && maxPercent && minPercent !== undefined)
                ? computeFill(percent, minPercent, maxPercent)
                : computeFill(value, min, max)
              return {value, base: _base, fill, percent}
            })() : undefined
            return (
              <Box
                onClick={() => {
                  onSelect?.(iso)
                }}
                component="path"
                key={iso}
                d={ukraineSvgPath[iso].d}
                fill={generateColor(res?.fill)}
                sx={{
                  transition: t => t.transitions.create('fill'),
                  '&:hover': {
                    fill: t => t.palette.action.hover,
                  }
                }}
              >
                {map(OblastIndex.byIso(iso as any).name, _ => (
                  <title>
                    {_}
                    {'\n'}
                    {res ? (
                      <>
                        {formatLargeNumber(res.value, {maximumFractionDigits})}
                        {res.base && res.base !== 100 && ' / ' + formatLargeNumber(res.base, {maximumFractionDigits})} - {toPercent(res.percent)}
                      </>
                    ) : 0}
                  </title>
                ))}
              </Box>
            )
          })}
        </g>
      </Box>
      {legend && (
        <Box sx={{width: '25%', position: 'absolute', bottom: '15%', left: theme.spacing(),}}>
          <Box sx={{
            height: 10,
            borderRadius: '2px',
            // boxShadow: t => t.shadows[1],
            background: `linear-gradient(90deg, ${generateColor(minAlpha)} 0%, ${theme.palette.primary.main} 50%, ${generateColor(maxAlpha)} 100%)`
          }}/>
          <Txt color="hint" sx={{fontSize: '.75em', display: 'flex', justifyContent: 'space-between',}}>
            {fillBaseOn === 'percent' ? (
              <><Box>{toPercent(minPercent, 0)}</Box> <Box>{toPercent(maxPercent, 0)}</Box></>
            ) : (
              <><Box>{formatLargeNumber(min, {maximumFractionDigits})}</Box> <Box>{formatLargeNumber(max, {maximumFractionDigits})}</Box></>
            )}
          </Txt>
        </Box>
      )}
      {title && (
        <Txt block sx={{mt: 0, mr: '-16px', ml: '-16px', width: 'calc(100% + 32px)', textAlign: 'center'}} size="small" color="disabled">
          {title}
        </Txt>
      )}
    </Box>
  )
}
