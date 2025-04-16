import type {FC} from 'react'
import {NavLink, generatePath} from 'react-router-dom'

import {KoboFormName} from 'infoportal-common'

import {Sidebar, SidebarBody, SidebarItem} from '@/shared/Layout/Sidebar'
import {useI18n} from '@/core/i18n'
import {SidebarKoboLink} from '@/features/SidebarKoboLink'
import {SidebarSection} from '@/shared/Layout/Sidebar/SidebarSection'

import {hdpIndex} from './constants'

const relatedKoboForms: KoboFormName[] = ['va_bio_tia']

export const HdpSidebar: FC = () => {
  const path = (page: string) => '' + page
  const {m} = useI18n()

  return (
    <Sidebar>
      <SidebarBody>
        <SidebarSection title={m.victimAssistanceTitle}>
          <NavLink to={hdpIndex.victimAssistance.dashboard.path}>
            {({isActive}) => (
              <SidebarItem icon="insights" active={isActive}>
                {m.dashboard}
              </SidebarItem>
            )}
          </NavLink>
          {relatedKoboForms.map((name) => (
            <SidebarKoboLink key={name} name={name} path={generatePath(hdpIndex.victimAssistance.form.path, {name})} />
          ))}
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}
