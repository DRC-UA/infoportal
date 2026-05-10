import {useState, type FC} from 'react'
import {Obj} from '@axanc/ts-utils'
import {Box, Tabs, Tab, type BoxProps} from '@mui/material'
import {NavLink, Route, Routes} from 'react-router-dom'

import {useI18n} from '@/core/i18n'
import {useReactRouterDefaultRoute} from '@/core/useReactRouterDefaultRoute'
import {appFeaturesIndex} from '@/features/appFeatureId'
import {Layout} from '@/shared/Layout'
import {Sidebar, SidebarItem} from '@/shared/Layout/Sidebar'

import {ProtectionVictimAssistance, ProtectionGeneral, ProtectionGbv, ProtectionLegal} from './protection'

import {AiChildProtection} from './archive/ChildProtection/AiChildProtection'
import {AiGbv} from './archive/Gbv/AiGbv'
import {AiFslc} from './archive/Fslc/AiFslc'
import {AiLegal} from './archive/Legal/AiLegal'
import InterimReport from './archive/InterimReport'
import {AiMineAction} from './archive/MineAction/AiMineAction'
import {AiMpca} from './archive/Mpca/AiMpca'
import {AiProtection} from './archive/Protection/AiProtection'
import {AiSnfi} from './archive/Snfi/AiSnfi'
import {AiWash} from './archive/Wash/AiWash'

const sectionsConfig: Record<
  'victimAssistance' | 'protectionGeneral' | 'protectionGbv' | 'protectionLegal',
  Record<'id' | 'name' | 'path', string> & {Component: FC}
> = {
  protectionGeneral: {
    id: 'protection: general',
    name: '[Protection] General',
    path: 'protection-general',
    Component: ProtectionGeneral,
  },
  protectionGbv: {
    id: 'protection: gbv',
    name: '[Protection] GBV',
    path: 'protection-gbv',
    Component: ProtectionGbv,
  },
  protectionLegal: {
    id: 'protection: legal',
    name: '[Protection] Legal',
    path: 'protection-legal',
    Component: ProtectionLegal,
  },
  victimAssistance: {
    id: 'protection: victim assistance',
    name: '[Protection] Victim Assistance',
    path: 'protection-victim-assistance',
    Component: ProtectionVictimAssistance,
  },
}

export const archivedActivitiesConfig = {
  protectionGeneral: {
    id: 'czd5jf7lqf2zv4r4r',
    subId: 'c4u0d3glqf3085j58',
    name: 'Protection General',
    path: 'protection-general',
    component: <AiProtection />,
  },
  mineAction: {
    id: 'cmnzatklqv1q3s243u',
    name: 'Mine Action',
    path: 'mine-action',
    subId: 'cegbam4lqv1q3s243v',
    component: <AiMineAction />,
  },
  childProtection: {
    name: 'Child Protection',
    path: 'child-protection',
    component: <AiChildProtection />,
  },
  gbv: {
    id: 'c6mrp6dlqv1q7q243w',
    subId: 'cdgpehzlqv1q7q243x',
    name: 'GBV',
    path: 'gbv',
    component: <AiGbv />,
  },
  legal: {
    name: 'Legal Aid',
    path: 'legal',
    component: <AiLegal />,
  },
  wash: {
    id: 'cz86p3tlqc7h66y2',
    name: 'WASH (NFI)',
    path: 'wash-nfi',
    component: <AiWash />,
  },
  mpca: {
    id: 'c9vv9j8lqm633lj1tm',
    name: 'MPCA',
    path: 'mpca',
    component: <AiMpca />,
  },
  snfi: {
    id: 'c95ky7klr95z6ia3v',
    name: 'SNFI',
    path: 'snfi',
    component: <AiSnfi />,
  },
  fslc: {
    id: 'chxr3zlqc5qatg2',
    name: 'FSLC',
    path: 'fslc',
    component: <AiFslc />,
  },
  interim: {
    id: 'interim-reports',
    name: 'Interim 2026 Reports',
    path: 'interim-2026-reports',
    component: <InterimReport />,
  },
}

export const activityInfoIndex = {
  basePath: 'activity-info',
  siteMap: new Obj(archivedActivitiesConfig).map((k, v) => [k, v.path]).get(),
}

const archivePath = 'archive'

const TabContent: FC<{index: number; value: number} & BoxProps> = ({index, value, children, ...rest}) => (
  <Box hidden={index !== value} {...rest}>
    {children}
  </Box>
)

const ActivityInfoSidebar = () => {
  const [activeTab, setActiveTab] = useState(0)
  const activateCurrent = () => setActiveTab(0)
  const activateArchive = () => setActiveTab(1)
  const {m} = useI18n()

  return (
    <Sidebar>
      <Tabs value={activeTab}>
        <Tab label={m.activityInfo.sidebarTabLabels.current} onClick={activateCurrent} />
        <Tab label={m.activityInfo.sidebarTabLabels.archive} onClick={activateArchive} />
      </Tabs>
      <TabContent index={0} value={activeTab}>
        {Obj.values(sectionsConfig).map(({id, path, name}) => (
          <NavLink key={id} to={path}>
            {({isActive}) => <SidebarItem active={isActive}>{name}</SidebarItem>}
          </NavLink>
        ))}
      </TabContent>
      <TabContent index={1} value={activeTab}>
        {Obj.keys(archivedActivitiesConfig).map((k) => (
          <NavLink to={`${archivePath}/${archivedActivitiesConfig[k].path}`} key={k}>
            {({isActive}) => (
              <SidebarItem key={k} active={isActive}>
                {archivedActivitiesConfig[k].name}
              </SidebarItem>
            )}
          </NavLink>
        ))}
      </TabContent>
    </Sidebar>
  )
}

export const ActivityInfo = () => {
  useReactRouterDefaultRoute(sectionsConfig.protectionGeneral.path)

  return (
    <Layout sidebar={<ActivityInfoSidebar />} title={appFeaturesIndex.activity_info.name}>
      <Routes>
        {Obj.values(sectionsConfig).map(({id, path, Component}) => (
          <Route key={id} {...{path, Component}} />
        ))}
        <Route path={archivePath}>
          {Obj.values(archivedActivitiesConfig).map((k) => (
            <Route key={k.path} path={k.path} element={k.component} />
          ))}
        </Route>
      </Routes>
    </Layout>
  )
}
