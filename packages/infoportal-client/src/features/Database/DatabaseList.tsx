import {KoboForm} from '@/core/sdk/server/kobo/Kobo'
import {useI18n} from '@/core/i18n'
import {useNavigate} from 'react-router'
import {Page, PageTitle} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {KoboFormSdk} from '@/core/sdk/server/kobo/KoboFormSdk'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import React from 'react'
import {Txt} from '@/shared/Txt'
import {Datatable} from '@/shared/Datatable/Datatable'
import {Icon, useTheme} from '@mui/material'
import {databaseIndex} from '@/features/Database/databaseIndex'

export const DatabaseList = ({
  forms,
}: {
  forms?: KoboForm[]
}) => {
  const {formatDate, m} = useI18n()
  const navigate = useNavigate()
  const t = useTheme()
  return (
    <Page width="md">
      {forms && forms.length > 0 && (
        <>
          <PageTitle>{m.selectADatabase}</PageTitle>
          <Panel>
            <Datatable
              defaultLimit={200}
              id="kobo-index"
              data={forms}
              columns={[
                {
                  id: 'status',
                  type: 'select_one',
                  width: 0,
                  head: m.status,
                  styleHead: {maxWidth: 0,},
                  align: 'center',
                  render: _ => {
                    return {
                      label: _.deploymentStatus === 'archived' ? (
                        <Icon
                          fontSize="small"
                          color="disabled"
                        >archive</Icon>
                      ) : _.deploymentStatus === 'deployed' ? (
                        <Icon
                          fontSize="small"
                          sx={{color: t.palette.success.light}}
                          color="success"
                        >fiber_manual_record</Icon>
                      ) : undefined,
                      value: _.deploymentStatus,
                      option: _.deploymentStatus,
                    }
                  },
                },
                {
                  id: 'id',
                  type: 'string',
                  head: m.id,
                  renderQuick: _ => _.id,
                },
                {
                  id: 'name',
                  type: 'select_one',
                  head: m.name,
                  render: _ => {
                    return {
                      label: <Txt bold>{KoboFormSdk.parseFormName(_.name)?.name}</Txt>,
                      value: KoboFormSdk.parseFormName(_.name)?.name,
                    }
                  },
                },
                {
                  id: 'program',
                  type: 'select_one',
                  head: m.program,
                  renderQuick: _ => KoboFormSdk.parseFormName(_.name)?.program
                },
                {
                  id: 'donors',
                  head: m.donor,
                  renderQuick: _ => KoboFormSdk.parseFormName(_.name)?.donors?.join(',')
                },
                {
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
                  id: 'updatedAt',
                  type: 'date',
                  head: m.updatedAt,
                  render: _ => {
                    return {
                      label: <Txt color="hint">{formatDate(_.updatedAt)}</Txt>,
                      value: _.updatedAt,
                    }
                  }
                },
                {
                  id: 'actions',
                  width: 0,
                  styleHead: {maxWidth: 0,},
                  align: 'right',
                  head: '',
                  renderQuick: _ =>
                    <TableIconBtn
                      color="primary"
                      onClick={() => navigate(databaseIndex.siteMap.database.absolute(_.serverId, _.id))}
                      children="chevron_right"
                    />
                },
              ]}/>
          </Panel>
        </>
      )}
    </Page>
  )
}
