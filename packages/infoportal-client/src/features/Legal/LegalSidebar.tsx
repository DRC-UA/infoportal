import type {FC} from 'react'
import {NavLink} from 'react-router-dom'

import {useI18n} from '@/core/i18n'
import {SidebarKoboLink} from '@/features/SidebarKoboLink'
import {Sidebar, SidebarBody, SidebarItem, SidebarSection} from '@/shared/Layout/Sidebar'

import {pages} from './config'

const LegalSidebar: FC = () => {
  const {m} = useI18n()

  return (
    <Sidebar>
      <SidebarBody>
        <SidebarSection title={m.legal.individualAid}>
          <NavLink to={pages.individualLegalAid.dashboard.path}>
            {({isActive}) => (
              <SidebarItem icon="insights" active={isActive}>
                {m.dashboard}
              </SidebarItem>
            )}
          </NavLink>
          <SidebarKoboLink name={'legal_individual_aid'} path={pages.individualLegalAid.data.path} />
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}

export default LegalSidebar
