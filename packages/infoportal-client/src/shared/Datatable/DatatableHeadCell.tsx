import {styleUtils} from '@/core/theme'
import {makeStyles} from 'tss-react/mui'
import {IpIconBtn, IpIconBtnProps} from '@/shared'
import {ReactNode} from 'react'

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
    left: 'calc(50% - 15px)',
    top: 3,
    background: styleUtils(t).color.toolbar,
  }
}))

export const DatabaseHeadCell = ({
  children,
  onClick
}: {
  onClick: IpIconBtnProps['onClick']
  children: ReactNode
}) => {
  const {classes, cx} = useStyles()
  return (
    <div className={classes.root}>
      {children}
      <div className={cx(classes.icon, '--db-th-icon')}>
        <IpIconBtn
          onClick={onClick}
          color="primary"
          size="small"
          children="visibility_off"
        />
      </div>
    </div>
  )
}