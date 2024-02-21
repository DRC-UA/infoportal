import React from 'react'
import {makeStyles} from 'tss-react/mui'
import {Tooltip} from '@mui/material'

const useStyles = makeStyles<{url: string, size: number, tooltipSize?: number}>()((t, {url, size, tooltipSize}) => ({
  common: {
    display: 'inline-block',
    backgroundImage: `url(${url})`,
    borderRadius: '6px',
  },
  root: {
    backgroundColor: t.palette.divider,
    '&:hover': {
      transform: 'scale(1.2)',
      boxShadow: t.shadows[4],
    },
    backgroundSize: 'cover',
    verticalAlign: 'middle',
    transition: t.transitions.create('all'),
    height: size,
    width: size,
  },
  tooltip: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: tooltipSize,
    width: tooltipSize,
  }
}))

export const TableImg = ({
  url,
  size = 30,
  tooltipSize,
}: {
  tooltipSize?: number | null
  size?: number
  url: string
}) => {
  const {classes, cx} = useStyles({url, size, tooltipSize: tooltipSize ?? undefined})
  return url ? (
    <Tooltip enterDelay={340} placement="bottom" title={tooltipSize && <div className={cx(classes.common, classes.tooltip)}/>}>
      <a href={url} target="_blank">
        <div className={cx(classes.root, classes.common)}/>
      </a>
    </Tooltip>
  ) : (
    <></>
  )
}
