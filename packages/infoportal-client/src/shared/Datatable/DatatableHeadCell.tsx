import type {FC, ReactNode} from 'react'
import {Icon, Tooltip} from '@mui/material'

import {IpBtn, IpIconBtnProps} from '@/shared'

export const DatabaseHeadCell: FC<{onClick: IpIconBtnProps['onClick']; children: ReactNode}> = ({
  children,
  onClick,
}) => (
  <Tooltip
    placement="top"
    title={
      <div style={{display: 'flex', alignItems: 'center'}}>
        <IpBtn sx={{minWidth: 30}} size="small" variant="contained" color="primary" onClick={onClick}>
          <Icon fontSize="small">visibility_off</Icon>
        </IpBtn>
        &nbsp;
        {children}
      </div>
    }
  >
    <div style={{width: '100%'}}>{children}</div>
  </Tooltip>
)
