import {KoboFormName, KoboIndex} from 'infoportal-common'
import {Tooltip} from '@mui/material'
import {NavLink} from 'react-router-dom'
import {SidebarItem} from '@/shared/Layout/Sidebar'
import React from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {DatabaseTable} from '@/features/Database/KoboTable/DatabaseKoboTable'
import {appConfig} from '@/conf/AppConfig'
import {SidebarItemProps} from '@/shared/Layout/Sidebar/SidebarItem'

export const SidebarKoboLink = ({
  name,
  path,
  size,
}: {
  size?: SidebarItemProps['size']
  path: string
  name: KoboFormName
}) => {
  const shortName = KoboIndex.byName(name).parsed.name
  return (
    <Tooltip title={name} placement="right">
      <NavLink to={path}>
        {({isActive, isPending}) => (
          <SidebarItem size={size} active={isActive} icon={appConfig.icons.koboFormLink}>
            {shortName}
          </SidebarItem>
        )}
      </NavLink>
    </Tooltip>
  )
}

export const getKoboFormRouteProps = ({name, path}: {name: KoboFormName; path: string}) => {
  return {
    path,
    element: (
      <Page width="full">
        <Panel>
          <DatabaseTable formId={KoboIndex.byName(name).id} />
        </Panel>
      </Page>
    ),
  }
}
