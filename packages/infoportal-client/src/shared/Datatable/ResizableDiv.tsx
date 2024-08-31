import React, {useEffect, useRef} from 'react'
import {BoxProps} from '@mui/material'
import {makeStyles} from 'tss-react/mui'
import debounce from 'lodash.debounce'

const useStyles = makeStyles()((t) => ({
  root: {
    resize: 'horizontal',
    overflow: 'hidden',
    position: 'relative',
    minWidth: '100%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    borderRight: `2px solid transparent`,
    '&:after': {
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease, top 0.3s ease, bottom 0.3s ease' as any,
      content: '" "',
      width: 1,
      display: 'block',
      position: 'absolute',
      top: 4,
      bottom: 4,
      right: 0,
      background: 'transparent',
    },
    '&:hover:after': {
      top: 0,
      bottom: 0,
      background: t.palette.primary.main,
      boxShadow: `0 0px 3px 1px ${t.palette.primary.main}`,
    }
  }
}))

export const ResizableDiv = ({
  initialWidth,
  id,
  style,
  debounceTime = 1200,
  onResize,
  ...props
}: Pick<BoxProps, 'style' | 'children'> & {
  id: string
  debounceTime?: number
  initialWidth?: number
  onResize?: (id: string, newWidth: number) => void
}) => {
  const {classes} = useStyles()
  const divRef = useRef(null)
  const initialRender = useRef(true)

  useEffect(() => {
    if (!onResize) return
    initialRender.current = true
    const handleResize = debounce((entries) => {
      if (initialRender.current) {
        initialRender.current = false
        return
      }
      for (let entry of entries) {
        onResize(id, entry.contentRect.width)
      }
    }, debounceTime)

    const resizeObserver = new ResizeObserver(handleResize)
    const currentDiv = divRef.current

    if (currentDiv) {
      resizeObserver.observe(currentDiv)
    }

    return () => {
      if (currentDiv) {
        resizeObserver.unobserve(currentDiv)
      }
      handleResize.cancel()
    }
  }, [onResize])

  return (
    <div
      ref={divRef}
      style={{
        width: initialWidth
      }}
      className={classes.root}
      {...props}
    />
  )
}