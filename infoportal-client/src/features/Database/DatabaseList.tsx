import {KoboForm} from '@/core/sdk/server/kobo/Kobo'
import {useI18n} from '@/core/i18n'
import {useNavigate} from 'react-router'
import {Page, PageTitle} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {Sheet} from '@/shared/Sheet/Sheet'
import {KoboFormSdk} from '@/core/sdk/server/kobo/KoboFormSdk'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import React from 'react'
import {Txt} from 'mui-extension'
import {databaseIndex} from '@/features/Database/databaseIndex'

export const DatabaseList = ({
  forms,
}: {
  forms?: KoboForm[]
}) => {
  const {formatDate, m} = useI18n()
  const navigate = useNavigate()
  return (
    <Page width="md">
      {forms && forms.length > 0 && (
        <>
          <PageTitle>{m.selectADatabase}</PageTitle>
          <Panel>
            <Sheet defaultLimit={200} id="kobo-index" onClickRows={_ => navigate(databaseIndex.siteMap.database.absolute(_.serverId, _.id))} data={forms} columns={[
              {
                id: 'name',
                type: 'string',
                head: m.name,
                renderValue: _ => KoboFormSdk.parseFormName(_.name)?.name,
                render: _ => <Txt bold>{KoboFormSdk.parseFormName(_.name)?.name}</Txt>,
              },
              {id: 'program', type: 'select_one', head: m.program, render: _ => KoboFormSdk.parseFormName(_.name)?.program},
              {
                id: 'donors',
                head: m.donor,
                render: _ => KoboFormSdk.parseFormName(_.name)?.donors?.join(',')
              },
              {id: 'createdAt', type: 'date', head: m.createdAt, render: _ => <Txt color="hint">{formatDate(_.createdAt)}</Txt>},
              {id: 'updatedAt', type: 'date', head: m.updatedAt, render: _ => <Txt color="hint">{formatDate(_.updatedAt)}</Txt>},
              {
                id: 'actions', width: 0, align: 'right', head: '', render: _ => <>
                  <TableIconBtn color="primary">chevron_right</TableIconBtn>
                </>
              },
            ]}/>
          </Panel>
        </>
      )}
    </Page>
  )
}
