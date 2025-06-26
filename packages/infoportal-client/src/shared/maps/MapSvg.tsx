import {OblastIndex, OblastISO, toPercent} from 'infoportal-common'
import {map, Obj, seq} from '@axanc/ts-utils'
import {MapSvgPaths, ukraineSvgPath} from './mapSvgPaths'
import {alpha, Box, BoxProps, darken, useTheme} from '@mui/material'
import {useMemo} from 'react'
import {Txt} from '@/shared/Txt'
import {formatLargeNumber} from '@/core/i18n/localization/en'

// viewBox="22.138577 52.380834 40.220623 44.387017"
// width="612.47321"
// height="408.0199"

const minAlpha = 0.05
const maxAlpha = 0.8
const medianAlpha = minAlpha + (maxAlpha - minAlpha) / 2

const computeFill = (value: number, min: number, max: number) => {
  if (max - min === 0) return 1
  return value > 0 ? ((maxAlpha - minAlpha) * (value - min)) / (max - min) + minAlpha : undefined
}

const getTitle = ({
  oblast,
  figure,
  maximumFractionDigits,
}: {
  oblast: string
  figure:
    | {
        value: number
        base?: number
        fill?: number
        percent?: number
      }
    | undefined
  maximumFractionDigits?: number
}) => {
  if (!figure) return `${oblast}\n0`

  let title = `${oblast}\n${formatLargeNumber(figure.value, {maximumFractionDigits})}`
  if (figure.base && figure.base !== 100) {
    title += ` / ${formatLargeNumber(figure.base, {maximumFractionDigits})}`
  }
  title += ` - ${toPercent(figure.percent)}`

  return title
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
  data?: Partial<{[key in keyof MapSvgPaths]: {value: number; base?: number}}>
} & Pick<BoxProps, 'sx'>) => {
  const theme = useTheme()

  const filteredData = useMemo(() => {
    return omitValueLt ? new Obj(data).filter((k, v) => !!v && v.value >= omitValueLt).get() : data
  }, [data])

  const {max, min, maxPercent, minPercent} = useMemo(() => {
    const _data = seq(Obj.values(filteredData)).compact().get()
    const values = _data.map((_) => _!.value ?? 0)
    // TODO _data.map create invalid array length
    const percents =
      (_data[0] && _data[0].base !== undefined) || base !== undefined
        ? _data.map((_) => {
            const b = (base ?? _.base) || 1
            if (!b) {
              return 0
            } else {
              return (_.value ?? 0) / b
            }
          })
        : undefined
    return {
      max: Math.max(...values),
      min: Math.min(...values),
      // maxPercent: 1,
      // minPercent: 0,
      ...(percents && {
        maxPercent: Math.max(...percents),
        minPercent: Math.min(...percents),
      }),
    }
  }, [filteredData])

  const generateColor = (fill: number | undefined) => {
    if (fill) {
      if (fill < medianAlpha) {
        return alpha(theme.palette.primary.main, map(fill * 2, (_) => Math.max(_, 0))!)
      } else {
        return darken(theme.palette.primary.main, map((fill - 0.5) * 2, (_) => Math.max(_, 0))!)
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
          {Obj.keys(ukraineSvgPath).map((iso) => {
            const res = filteredData[iso]
              ? (() => {
                  const value = filteredData[iso]!.value
                  const _base = base ?? filteredData[iso]!.base
                  const percent = _base ? value / _base : undefined
                  const fill =
                    percent && fillBaseOn === 'percent' && maxPercent && minPercent !== undefined
                      ? computeFill(percent, minPercent, maxPercent)
                      : computeFill(value, min, max)
                  return {value, base: _base, fill, percent}
                })()
              : undefined
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
                  transition: (t) => t.transitions.create('fill'),
                  '&:hover': {
                    fill: (t) => t.palette.action.hover,
                  },
                }}
              >
                {map(OblastIndex.byIso(iso as any).name, (oblast) => (
                  <title>{getTitle({oblast, figure: res, maximumFractionDigits})}</title>
                ))}
              </Box>
            )
          })}
        </g>
      </Box>
      {legend && (
        <Box sx={{width: '25%', position: 'absolute', bottom: '15%', left: theme.spacing()}}>
          <Box
            sx={{
              height: 10,
              borderRadius: '2px',
              // boxShadow: t => t.shadows[1],
              background: `linear-gradient(90deg, ${generateColor(minAlpha)} 0%, ${theme.palette.primary.main} 50%, ${generateColor(maxAlpha)} 100%)`,
            }}
          />
          <Txt color="hint" sx={{fontSize: '.75em', display: 'flex', justifyContent: 'space-between'}}>
            {fillBaseOn === 'percent' ? (
              <>
                <Box>{toPercent(minPercent, 0)}</Box> <Box>{toPercent(maxPercent, 0)}</Box>
              </>
            ) : (
              <>
                <Box>{formatLargeNumber(min, {maximumFractionDigits})}</Box>{' '}
                <Box>{formatLargeNumber(max, {maximumFractionDigits})}</Box>
              </>
            )}
          </Txt>
        </Box>
      )}
      {title && (
        <Txt
          block
          sx={{mt: 0, mr: '-16px', ml: '-16px', width: 'calc(100% + 32px)', textAlign: 'center'}}
          size="small"
          color="disabled"
        >
          {title}
        </Txt>
      )}
    </Box>
  )
}
