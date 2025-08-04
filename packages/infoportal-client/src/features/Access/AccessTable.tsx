import {Access, AccessLevel} from '@/core/sdk/server/access/Access'
import React, {ReactNode, useEffect, useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {UUID} from 'infoportal-common'
import {useAsync, UseAsyncMultiple} from '@/shared/hook/useAsync'
import {Obj, seq} from '@axanc/ts-utils'
import {useAppSettings} from '@/core/context/ConfigContext'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {UseFetcher} from '@/shared/hook/useFetcher'
import {Txt} from '@/shared/Txt'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Box, Tooltip} from '@mui/material'

export const AccessTable = ({
  isAdmin,
  header,
  onRemoved,
  renderParams = (_) => JSON.stringify(_),
  fetcherData,
  asyncRemove,
}: {
  isAdmin?: boolean
  fetcherData: UseFetcher<() => Promise<Access[]>>
  asyncRemove: UseAsyncMultiple<(_: UUID) => Promise<any>>
  renderParams?: (_: any) => ReactNode
  onRemoved?: (_: UUID) => void
  // data: Access[] | undefined
  header?: ReactNode
}) => {
  const {m, formatDate, formatDateTime} = useI18n()
  const {api} = useAppSettings()
  const _update = useAsync(api.access.update, {requestKey: ([id]) => id})
  const drcJobs = useFetcher(api.user.fetchDrcJobs)
  const groupFetcher = useFetcher(api.group.search)

  useEffect(() => {
    groupFetcher.fetch()
    drcJobs.fetch()
    fetcherData.fetch({force: true, clean: false})
  }, [_update.callIndex])

  const groupMemberRoles = useMemo(() => {
    const map: Record<string, string[]> = {}

    for (const group of groupFetcher.get ?? []) {
      const roles: string[] = []

      for (const item of group.items ?? []) {
        const jobs = Array.isArray(item.drcJob) ? item.drcJob : item.drcJob ? [item.drcJob] : []
        const office = item.drcOffice ?? ''

        for (const job of jobs) {
          const label = office ? `${job} (${office})` : job
          roles.push(label)
        }
      }

      map[group.name] = Array.from(new Set(roles)).sort()
    }

    return map
  }, [groupFetcher.get])

  return (
    <Datatable<Access>
      defaultLimit={100}
      id="access"
      getRenderRowKey={(_) => _.id}
      loading={fetcherData.loading}
      header={header}
      data={fetcherData.get}
      columns={[
        {
          width: 80,
          id: 'createdAt',
          type: 'date',
          head: m.createdAt,
          render: (_) => {
            return {
              label: <Txt color="hint">{formatDate(_.createdAt)}</Txt>,
              value: _.createdAt,
            }
          },
        },
        {
          id: 'drcJob',
          head: m.drcJob,
          renderQuick: (_) => _.drcJob,
          type: 'select_one',
          options: () => drcJobs.get?.map((job) => ({value: job, label: job})) || [],
        },
        {
          id: 'drcOffice',
          head: m.drcOffice,
          renderQuick: (_) => _.drcOffice,
          type: 'select_one',
          options: () =>
            seq(fetcherData.get?.map((_) => _.drcOffice))
              .distinct((_) => _)
              .compact()
              .map((_) => ({value: _, label: _})),
        },
        {
          id: 'email',
          head: m.email,
          renderQuick: (_) => _.email,
        },
        {
          id: 'group',
          type: 'select_one',
          head: m.group,
          render: (row) => {
            const groupName = row.groupName
            if (!groupName) return {value: undefined, label: DatatableUtils.blank}

            const roles = groupMemberRoles[groupName]
            const tooltipText = roles?.join('\n')

            return {
              value: groupName,
              label: (
                <Tooltip
                  title={<Box sx={{whiteSpace: 'pre-wrap', maxWidth: 300}}>{tooltipText}</Box>}
                  arrow
                  placement="top"
                >
                  <span>{groupName}</span>
                </Tooltip>
              ),
            }
          },
        },
        {
          width: 90,
          id: 'level',
          head: m.accessLevel,
          type: 'select_one',
          options: () => Obj.keys(AccessLevel).map((_) => ({value: _, label: _})),
          render: (row) => {
            if (!!row.groupName) return {value: undefined, label: ''}
            if (isAdmin)
              return {
                value: row.level,
                label: (
                  <IpSelectSingle<AccessLevel>
                    value={row.level}
                    placeholder=""
                    onChange={(_) => _update.call(row.id, {level: _ as AccessLevel})}
                    hideNullOption
                    disabled={!!row.groupName}
                    options={Obj.keys(AccessLevel)}
                  />
                ),
              }
            return {value: row.level, label: row.level}
          },
        },
        {
          id: 'params',
          head: m.filter,
          render: (_) => {
            return {
              label: renderParams(_.params),
              value: _.params,
            }
          },
        },
        ...(isAdmin
          ? [
              {
                id: 'actions',
                width: 0,
                head: '',
                align: 'right',
                renderQuick: (_: Access) => {
                  return (
                    <TableIconBtn
                      loading={asyncRemove.loading[_.id]}
                      onClick={() => asyncRemove.call(_.id).then(() => onRemoved?.(_.id))}
                      children="delete"
                    />
                  )
                },
              } as const,
            ]
          : []),
      ]}
    />
  )
}
