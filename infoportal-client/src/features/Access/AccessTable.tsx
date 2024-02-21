import {Sheet} from '@/shared/Sheet/Sheet'
import {Access, AccessLevel} from '@/core/sdk/server/access/Access'
import React, {ReactNode, useEffect} from 'react'
import {useI18n} from '@/core/i18n'
import {UUID} from '@infoportal-common'
import {useAsync, UseAsyncMultiple} from '@/shared/hook/useAsync'
import {Enum, seq} from '@alexandreannic/ts-utils'
import {useAppSettings} from '@/core/context/ConfigContext'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {UseFetcher} from '@/shared/hook/useFetcher'

export const AccessTable = ({
  isAdmin,
  header,
  onRemoved,
  renderParams = _ => JSON.stringify(_),
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

  useEffect(() => {
    fetcherData.fetch({force: true, clean: false})
  }, [_update.callIndex])

  return (
    <Sheet<Access>
      defaultLimit={100}
      id="access"
      getRenderRowKey={_ => _.id}
      loading={fetcherData.loading}
      header={header}
      data={fetcherData.get}
      columns={[
        {
          width: 80,
          head: m.createdAt,
          id: 'date',
          type: 'date',
          render: _ => formatDate(_.createdAt),
          tooltip: _ => formatDateTime(_.createdAt),
          renderValue: _ => _.createdAt,
        },
        {
          id: 'drcJob',
          head: m.drcJob,
          render: _ => _.drcJob,
          type: 'select_one',
          options: () => seq(fetcherData.get?.map(_ => _.drcJob)).distinct(_ => _).compact().map(_ => ({value: _, label: _}))
        },
        {
          id: 'drcOffice',
          head: m.drcOffice,
          render: _ => _.drcOffice,
          type: 'select_one',
          options: () => seq(fetcherData.get?.map(_ => _.drcOffice)).distinct(_ => _).compact().map(_ => ({value: _, label: _}))
        },
        {
          id: 'email',
          head: m.email,
          render: _ => _.email,
        },
        {
          id: 'group',
          type: 'select_one',
          head: m.group,
          render: _ => _.groupName ?? SheetUtils.blank,
        },
        {
          width: 90,
          id: 'level',
          head: m.accessLevel,
          type: 'select_one',
          options: () => Enum.keys(AccessLevel).map(_ => ({value: _, label: _})),
          render: row => {
            if (!!row.groupName) return
            if (isAdmin) return (
              <IpSelectSingle
                hideNullOption
                disabled={!!row.groupName}
                value={row.level}
                onChange={_ => _update.call(row.id, {level: _ as AccessLevel})}
                options={Enum.keys(AccessLevel).map(_ => ({value: _, children: _}))}
              />
            )
            return row.level
          },
        },
        {
          id: 'params',
          head: m.filter,
          render: _ => renderParams(_.params),
          type: 'string'
        },
        ...isAdmin ? [{
          id: 'actions',
          width: 0,
          head: '',
          align: 'right',
          render: (_: Access) => (
            <TableIconBtn loading={asyncRemove.loading[_.id]} onClick={() => asyncRemove.call(_.id).then(() => onRemoved?.(_.id))} children="delete"/>
          ),
        } as const] : [],
      ]}
    />
  )
}