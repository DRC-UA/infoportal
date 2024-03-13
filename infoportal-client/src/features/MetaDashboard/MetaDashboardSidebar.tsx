import {Sidebar, SidebarBody, SidebarHr, SidebarItem} from '@/shared/Layout/Sidebar'
import {useMetaDashboardContext} from '@/features/MetaDashboard/MetaDashboardContext'
import {Obj, seq} from '@alexandreannic/ts-utils'
import {DebouncedInput} from '@/shared/DebouncedInput'
import React from 'react'
import {today} from '@/features/Mpca/Dashboard/MpcaDashboard'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {useI18n} from '@/core/i18n'
import {FilterLayoutProps} from '@/shared/DataFilter/DataFilterLayout'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {Badge, Box, capitalize, Icon, Switch, useTheme} from '@mui/material'
import {MetaDashboardSidebarSelect} from '@/features/MetaDashboard/MetaDashboardSidebarSelect'
import {IpIconBtn} from '@/shared/IconBtn'
import {SidebarSubSection} from '@/shared/Layout/Sidebar/SidebarSubSection'
import {SidebarTitle, Txt} from 'mui-extension'
import {IpBtn} from '@/shared/Btn'
import {appConfig} from '@/conf/AppConfig'

export const MetaDashboardSidebar = () => {
  const {m, formatLargeNumber} = useI18n()
  const {data: ctx} = useMetaDashboardContext()
  return (
    <Sidebar>
      <SidebarBody>
        <SidebarItem href={appConfig.externalLink.metaDashboardReadMe} icon="description" iconEnd="open_in_new" target="_blank" children="Read Me"/>
        <SidebarHr/>
        <Box sx={{ml: 1}}>
          <SidebarTitle sx={{display: 'block', mb: 1}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              {m.filters}
              <IpBtn
                color="primary"
                size="small"
                onClick={ctx.clearAllFilter}
                children={m.clearAll}
                sx={{marginLeft: 'auto'}}
              />
            </Box>
          </SidebarTitle>
          <SidebarSubSection title={m.submittedAt} keepOpen>
            <Box sx={{px: 1, mt: 1}}>
              <PeriodPicker
                defaultValue={[ctx.period.start, ctx.period.end]}
                onChange={([start, end]) => {
                  ctx.setPeriod(prev => ({...prev, start, end}))
                }}
                label={[m.start, m.endIncluded]}
                max={today}
              />
            </Box>
          </SidebarSubSection>
          <SidebarSubSection title={m.committedAt} keepOpen>
            <Box sx={{px: 1, mt: 1}}>
              <PeriodPicker
                defaultValue={[ctx.periodCommit.start, ctx.period.end]}
                onChange={([start, end]) => {
                  ctx.setPeriodCommit(prev => ({...prev, start, end}))
                }}
                label={[m.start, m.endIncluded]}
                max={today}
              />
            </Box>
          </SidebarSubSection>
          <SidebarSubSection title={m.distinct}>
            <Box sx={{display: 'flex', alignItems: 'center', px: 1}}>
              {m._meta.distinctByTaxId}
              <Switch
                sx={{marginLeft: 'auto'}}
                size="small"
                checked={ctx.customFilters.distinctBy === 'taxId'}
                onChange={e => ctx.setCustomFilters(_ => ({..._, distinctBy: e.currentTarget.checked ? 'taxId' : undefined}))}
              />
            </Box>
          </SidebarSubSection>
          <MetaDashboardSidebarBody
            data={ctx.filteredData}
            filters={ctx.shapeFilters}
            shapes={ctx.shape}
            setFilters={ctx.setShapeFilters}
            onClear={(name?: string) => {
              if (name) {
                ctx.setShapeFilters(_ => ({
                  ..._,
                  [name]: []
                }))
              } else {
                ctx.setShapeFilters({})
                ctx.setPeriod({})
              }
            }}
          />
        </Box>
      </SidebarBody>
    </Sidebar>
  )
}

export const MetaDashboardSidebarBody = (
  props: FilterLayoutProps
) => {
  const t = useTheme()
  const getFilteredOptions = (name: string) => {
    const filtersCopy = {...filters}
    delete filtersCopy[name]
    return DataFilter.filterData(data ?? seq([]), shapes, filtersCopy)
  }

  const {
    shapes,
    filters,
    setFilters,
    data,
    onClear,
  } = props
  return (
    <>
      {Obj.entries(shapes).map(([name, shape]) =>
        <SidebarSubSection title={
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Icon fontSize="small" sx={{visibility: shape.icon ? 'inherit' : 'hidden', color: t.palette.text.secondary, mr: 1}}>{shape.icon}</Icon>
            {capitalize(name)}
            <Badge
              color="primary"
              // anchorOrigin={{
              //   vertical: 'top',
              //   horizontal: 'left',
              variant={filters[name]?.length ?? 0 > 0 ? 'dot' : undefined}
              // badgeContent={filters[name]?.length}
              sx={{color: t.palette.text.secondary, marginLeft: 'auto', mr: .25}}
            >
              <IpIconBtn children="clear" size="small" onClick={() => onClear?.(name)}/>
            </Badge>
          </Box>
        } key={name} defaultOpen={filters[name] !== undefined}>
          {filters[name] !== undefined}
          <DebouncedInput<string[]>
            key={name}
            debounce={50}
            value={filters[name]}
            onChange={_ => setFilters((prev: any) => ({...prev, [name]: _}))}
          >
            {(value, onChange) =>
              <MetaDashboardSidebarSelect
                icon={shape.icon}
                value={value ?? []}
                label={shape.label}
                addBlankOption={shape.addBlankOption}
                options={() => shapes[name].getOptions(() => getFilteredOptions(name))}
                onChange={onChange}
                sx={{mb: .5}}
              />
            }
          </DebouncedInput>
        </SidebarSubSection>
      )}
    </>
  )
}