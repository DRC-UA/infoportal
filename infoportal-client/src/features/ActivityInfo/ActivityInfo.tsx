import {Layout} from '@/shared/Layout'
import {HashRouter as Router, NavLink, Route, Routes} from 'react-router-dom'
import React, {ReactNode} from 'react'
import {AiWash} from '@/features/ActivityInfo/Wash/AiWash'
import {AiMpca} from '@/features/ActivityInfo/Mpca/AiMpca'
import {Sidebar, SidebarItem} from '@/shared/Layout/Sidebar'
import {Enum} from '@alexandreannic/ts-utils'
import {AiSnfi} from '@/features/ActivityInfo/Snfi/AiSnfi'
import {AiProtection} from '@/features/ActivityInfo/Protection/AiProtection'
import {AiFslc} from '@/features/ActivityInfo/Fslc/AiFslc'
import {AiGbv} from '@/features/ActivityInfo/Gbv/AiGbv'
import {appFeaturesIndex} from '@/features/appFeatureId'

export const activitiesConfig = {
  'protection_general': {
    id: 'czd5jf7lqf2zv4r4r',
    subId: 'c4u0d3glqf3085j58',
    name: 'Protection',
    path: '/protection_general',
    componnent: <AiProtection/>,
  },
  'gbv': {
    id: 'c6mrp6dlqv1q7q243w',
    subId: 'cdgpehzlqv1q7q243x',
    name: 'GBV',
    path: '/gbc',
    componnent: <AiGbv/>,
  },
  'wash': {
    id: 'cz86p3tlqc7h66y2',
    name: 'WASH (NFI)',
    path: '/wash_nfi',
    componnent: <AiWash/>,
  },
  'mpca': {
    id: 'c9vv9j8lqm633lj1tm',
    name: 'MPCA',
    path: '/mpca',
    componnent: <AiMpca/>,
  },
  'snfi': {
    id: 'c95ky7klr95z6ia3v',
    name: 'SNFI',
    path: '/snfi',
    componnent: <AiSnfi/>,
  },
  'fslc': {
    id: 'chxr3zlqc5qatg2',
    name: 'FSLC',
    path: '/fslc',
    componnent: <AiFslc/>,
  },
}

export const activityInfoIndex = {
  basePath: '/activity-info',
  siteMap: new Enum(activitiesConfig).transform((k, v) => [k, v.path]).get()
}

const ActivityInfoSidebar = () => {
  return (
    <Sidebar>
      {Enum.keys(activitiesConfig).map(k =>
        <NavLink to={activitiesConfig[k].path} key={k}>
          {({isActive, isPending}) => (
            <SidebarItem key={k} active={isActive}>{activitiesConfig[k].name}</SidebarItem>
          )}
        </NavLink>
      )}
    </Sidebar>
  )
}

export const ActivityInfo = () => {
  return (
    <Router>
      <Layout sidebar={<ActivityInfoSidebar/>} title={appFeaturesIndex.activity_info.name}>
        <Routes>
          {Enum.values(activitiesConfig).map(k =>
            <Route key={k.path} path={k.path} element={k.componnent}/>
          )}
        </Routes>
      </Layout>
    </Router>
  )
}
