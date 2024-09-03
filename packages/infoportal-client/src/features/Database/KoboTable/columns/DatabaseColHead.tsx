import {styleUtils} from '@/core/theme'
import {ReactNode} from 'react'
import {makeStyles} from 'tss-react/mui'
import {IpIconBtn} from '@/shared'

const useStyles = makeStyles()((t) => ({
  root: {
    width: '100%',
    '&:hover .--db-th-icon': {
      opacity: 1,
    }
  },
  icon: {
    transition: t.transitions.create('opacity'),
    opacity: 0,
    position: 'absolute',
    left: -2,
    top: 3,
    background: styleUtils(t).color.toolbar,
  }
}))

export const DatabaseColHead = ({children}: {children: ReactNode}) => {
  const {classes, cx} = useStyles()
  return (
    <div className={classes.root}>
      {children}
      <div className={cx(classes.icon, '--db-th-icon')}>
        <IpIconBtn
          size="small"
          children="visibility_off"
        />
      </div>
    </div>
  )
}