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
import {Txt} from 'mui-extension'
import {Datatable} from '@/shared/Datatable/Datatable'

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
    <Datatable<Access>
      defaultLimit={100}
      id="access"
      getRenderRowKey={_ => _.id}
      loading={fetcherData.loading}
      header={header}
      data={fetcherData.get}
      columns={[
        {
          width: 80,
          id: 'createdAt',
          type: 'date',
          head: m.createdAt,
          render: _ => {
            return {
              label: <Txt color="hint">{formatDate(_.createdAt)}</Txt>,
              value: _.createdAt,
            }
          }
        },
        {
          id: 'drcJob',
          head: m.drcJob,
          renderQuick: _ => _.drcJob,
          type: 'select_one',
          options: () => seq(fetcherData.get?.map(_ => _.drcJob)).distinct(_ => _).compact().map(_ => ({value: _, label: _}))
        },
        {
          id: 'drcOffice',
          head: m.drcOffice,
          renderQuick: _ => _.drcOffice,
          type: 'select_one',
          options: () => seq(fetcherData.get?.map(_ => _.drcOffice)).distinct(_ => _).compact().map(_ => ({value: _, label: _}))
        },
        {
          id: 'email',
          head: m.email,
          renderQuick: _ => _.email,
        },
        {
          id: 'group',
          type: 'select_one',
          head: m.group,
          renderQuick: _ => _.groupName ?? SheetUtils.blank,
        },
        {
          width: 90,
          id: 'level',
          head: m.accessLevel,
          type: 'select_one',
          options: () => Enum.keys(AccessLevel).map(_ => ({value: _, label: _})),
          render: row => {
            if (!!row.groupName) return {value: undefined, label: ''}
            if (isAdmin)
              return {
                value: row.level,
                label: (
                  <IpSelectSingle
                    value={row.level}
                    onChange={_ => _update.call(row.id, {level: _ as AccessLevel})}
                    hideNullOption
                    disabled={!!row.groupName}
                    options={Enum.keys(AccessLevel).map(_ => ({value: _, children: _}))}/>
                )
              }
            return {value: row.level, label: row.level}
          }
        },
        {
          id: 'params',
          head: m.filter,
          renderQuick: _ => _.params,
          type: 'string'
        },
        ...isAdmin ? [{
          id: 'actions',
          width: 0,
          head: '',
          align: 'right',
          renderQuick: (_: Access) => {
            return (
              <TableIconBtn
                loading={asyncRemove.loading[_.id]}
                onClick={() => asyncRemove.call(_.id).then(() => onRemoved?.(_.id))}
                children="delete"/>
            )
          }
        } as const] : [],
      ]}
    />
  )
}