import {useEffect, type FC} from 'react'
import {Obj} from '@axanc/ts-utils'
import {NavLink, Route, Routes} from 'react-router-dom'

import {useI18n, type Messages} from '@/core/i18n'
import {Layout} from '@/shared/Layout'
import {Sidebar, SidebarItem} from '@/shared/Layout/Sidebar'

import {YearlyReport} from './YearlyReport'

export const commsConfig: Record<
  'yearlyReport',
  {id: string; name: keyof Messages['communications']['subPages']; path: string; component: FC}
> = {
  yearlyReport: {
    id: 'afceb740ff0e441e157',
    name: 'yearlyReport',
    path: '/yearly-report',
    component: YearlyReport,
  } as const,
} as const

const CommunicationsSidebar = () => {
  const {m} = useI18n()

  return (
    <Sidebar>
      {Obj.keys(commsConfig).map((key) => (
        <NavLink to={commsConfig[key].path} key={key}>
          {({isActive}) => (
            <SidebarItem key={key} active={isActive}>
              {m.communications.subPages[commsConfig[key].name].title}
            </SidebarItem>
          )}
        </NavLink>
      ))}
    </Sidebar>
  )
}

const Communications = () => {
  const {m} = useI18n()

  useEffect(() => {
    // redirect to Yearly Report by default
    if (window.location.hash === '') {
      window.location.replace(`communications#${commsConfig.yearlyReport.path}`)
    }
  }, [])

  return (
    <Layout sidebar={<CommunicationsSidebar />} title={m.communications.title}>
      <Routes>
        {Obj.values(commsConfig).map((k) => (
          <Route key={k.path} path={k.path} Component={k.component} />
        ))}
      </Routes>
    </Layout>
  )
}

export {Communications}
