import {PanelBody} from '@/shared/Panel'
import {Box, Icon, Switch} from '@mui/material'
import {Txt} from 'mui-extension'
import {PanelFoot} from '@/shared/Panel/PanelFoot'
import {IpBtn} from '@/shared/Btn'
import {DashboardFilterLabel} from '@/shared/DashboardLayout/DashboardFilterLabel'
import React, {ReactNode, useEffect, useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'
import {ProtectionCustomFilter} from '@/features/Protection/Context/useProtectionFilter'
import {useProtectionContext} from '@/features/Protection/Context/ProtectionContext'
import {Obj} from '@alexandreannic/ts-utils'
import {IpIconBtn} from '@/shared/IconBtn'
import {appConfig} from '@/conf/AppConfig'

const Row = ({
  title,
  desc,
  action,
  icon,
}: {
  title: string
  desc: string
  action?: ReactNode
  icon: string
}) => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center', '&:not(:last-of-type)': {mb: 2}}}>
      <Icon color="disabled" sx={{mr: 1}}>{icon}</Icon>
      <Box sx={{flex: 1}}>
        <Txt block>{title}</Txt>
        <Txt block color="hint">{desc}</Txt>
      </Box>
      {action}
    </Box>
  )
}

export const ProtectionOverviewFilterCustom = () => {
  const {m} = useI18n()
  const {conf} = useAppSettings()
  const ctx = useProtectionContext()
  const [innerFilter, setInnerFilter] = useState<ProtectionCustomFilter>({})

  useEffect(() => {
    setInnerFilter(ctx.filters.custom)
  }, [ctx.filters.custom])

  const hasActiveFilter = useMemo(() => {
    return Obj.entries(ctx.filters.custom).filter(([k, v]) => v).length > 0
  }, [ctx.filters.custom])

  return (
    <DashboardFilterLabel icon="filter_alt" label={m.custom} active={hasActiveFilter}>
      {(opened, close) => (
        <>
          <PanelBody>
            <Row
              icon="join_inner"
              title={m._protection.filterEchoReporting}
              desc={m._protection.filterEchoReportingDetails(conf.other.protection.echoDuplicationEstimationPercent)}
              action={
                <Switch sx={{ml: 1}} checked={innerFilter.echo ?? false} onChange={(e, checked) => setInnerFilter(_ => ({..._, echo: checked}))}/>
              }
            />
            <Row
              icon={appConfig.icons.disability}
              title={m._protection.filterEchoReportingDisability}
              desc={m._protection.filterEchoReportingDisabilityDetails(conf.other.protection.echoDisabilityEstimationPercent)}
              action={
                <Switch sx={{ml: 1}} checked={innerFilter.echoDisability ?? false} onChange={(e, checked) => setInnerFilter(_ => ({..._, echoDisability: checked}))}/>
              }
            />
          </PanelBody>
          <PanelFoot>
            <IpBtn onClick={() => ctx.filters.setCustom(innerFilter)}>{m.apply}</IpBtn>
            <IpBtn onClick={close}>{m.close}</IpBtn>
            <IpIconBtn children="filter_alt_off" onClick={() => ctx.filters.setCustom({})} tooltip={m.clear}/>
          </PanelFoot>
        </>
      )}
    </DashboardFilterLabel>
  )
}