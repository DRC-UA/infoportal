import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import React, {useEffect, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {useSession} from '@/core/Session/SessionContext'
import {IpIconBtn} from '@/shared/IconBtn'
import {Panel} from '@/shared/Panel'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {Txt} from '@/shared/Txt'
import {Autocomplete, Box, Switch, TextField} from '@mui/material'
import {useRouter} from 'next/router'
import {seq} from '@axanc/ts-utils'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Datatable} from '@/shared/Datatable/Datatable'
import {AppAvatar} from '@/shared/AppAvatar'
import {Controller, useForm} from 'react-hook-form'
import {IpInput} from '@/shared/Input/Input'
import {Modal} from '@/shared'
import {DrcJob, DrcOffice} from 'infoportal-common'

export const AdminUsers = () => {
  const {api, conf} = useAppSettings()
  const {session, setSession} = useSession()
  const _connectAs = useFetcher(api.session.connectAs)
  const _users = useFetcher(api.user.search)
  const {m, formatDate, formatDateTime} = useI18n()
  const router = useRouter()

  const [showDummyAccounts, setShowDummyAccounts] = useState(false)

  const _editForm = useForm<{
    name?: string
    drcJob?: DrcJob
    drcOffice?: DrcOffice
  }>({
    mode: 'onChange',
  })

  useEffect(() => {
    _users.fetch({clean: false}, {includeDummy: showDummyAccounts})
  }, [showDummyAccounts])

  const connectAs = async (email: string) => {
    const session = await _connectAs.fetch({force: true, clean: true}, email)
    await router.push('/')
    setSession(session)
  }

  const filteredData = _users.get

  return (
    <Page width="lg">
      <Panel>
        <Datatable
          loading={_users.loading}
          id="users"
          showExportBtn
          header={
            <Box sx={{display: 'flex', alignItems: 'center', marginLeft: 'auto'}}>
              <Txt sx={{fontSize: '1rem'}} color="hint">
                {m.showDummyAccounts}
              </Txt>
              <Switch value={showDummyAccounts} onChange={(e) => setShowDummyAccounts(e.target.checked)} />
            </Box>
          }
          defaultLimit={100}
          data={filteredData}
          columns={[
            {
              width: 0,
              id: 'avatar',
              head: '',
              renderQuick: (_) => <AppAvatar size={24} email={_.email} />,
            },
            {
              type: 'string',
              id: 'name',
              head: m.name,
              renderQuick: (_) => _.name,
            },
            {
              id: 'email',
              head: m.email,
              render: (_) => {
                return {
                  label: <Txt bold>{_.email}</Txt>,
                  value: _.email,
                }
              },
              type: 'string',
            },
            {
              width: 110,
              id: 'createdAt',
              head: m.createdAt,
              type: 'date',
              render: (_) => {
                return {
                  label: <Txt color="hint">{formatDate(_.createdAt)}</Txt>,
                  value: _.createdAt,
                }
              },
            },
            {
              type: 'date',
              width: 140,
              id: 'lastConnectedAt',
              head: m.lastConnectedAt,
              render: (_) => {
                return {
                  label: _.lastConnectedAt && <Txt color="hint">{formatDateTime(_.lastConnectedAt)}</Txt>,
                  value: _.lastConnectedAt,
                }
              },
            },
            {
              id: 'drcJob',
              head: m.drcJob,
              renderQuick: (_) => _.drcJob,
              type: 'select_one',
              options: () =>
                seq(_users.get?.map((_) => _.drcJob))
                  .distinct((_) => _)
                  .compact()
                  .map((_) => ({value: _, label: _})),
            },
            {
              id: 'drcOffice',
              type: 'select_one',
              head: m.drcOffice,
              renderQuick: (_) => _.drcOffice,
              // options: () => seq(_users.get?.map(_ => _.drcOffice)).distinct(_ => _).compact().map(_ => ({value: _, label: _}))
            },
            {
              type: 'select_one',
              id: 'admin',
              width: 10,
              align: 'center',
              head: m.admin,
              render: (_) => ({
                label: _.admin && <TableIcon color="success">check_circle</TableIcon>,
                value: _.admin ? 'true' : 'false',
              }),
              options: () => [
                {value: 'true', label: m.yes},
                {value: 'false', label: m.no},
              ],
            },
            {
              id: 'action',
              width: 10,
              align: 'right',
              renderQuick: (_) => (
                <>
                  <Modal
                    onOpen={() => {
                      _editForm.reset({
                        name: _.name,
                        drcJob: _.drcJob,
                        drcOffice: _.drcOffice,
                      })
                    }}
                    title={m.edit}
                    confirmLabel={m.save}
                    PaperProps={{
                      sx: {
                        width: 600,
                        maxWidth: '95vw',
                        px: 3,
                        py: 2,
                      },
                    }}
                    onConfirm={(e, close) =>
                      _editForm.handleSubmit((form) => {
                        api.user.updateByEmail(_.email, form).then(() => {
                          _users.fetch({clean: false}, {includeDummy: showDummyAccounts})
                          close()
                        })
                      })()
                    }
                    content={
                      <>
                        <Controller
                          name="name"
                          control={_editForm.control}
                          defaultValue={_.name || ''}
                          render={({field}) => (
                            <TextField
                              {...field}
                              label={m.name}
                              fullWidth
                              size="small"
                              sx={{
                                mt: 3,
                                mb: 2,
                                '& label': {
                                  backgroundColor: 'white',
                                  px: 0.5,
                                },
                              }}
                              variant="outlined"
                            />
                          )}
                        />

                        <Controller
                          name="drcJob"
                          control={_editForm.control}
                          render={({field}) => {
                            const values = seq(_users.get?.map((_) => _.drcJob))
                              .distinct((_) => _)
                              .compact()
                              .get()

                            const currentValue = field.value ?? ''
                            const allOptions = seq([...values, currentValue])
                              .distinct((_) => _)
                              .compact()
                              .get()

                            return (
                              <Autocomplete
                                disablePortal
                                options={allOptions}
                                value={field.value ?? null}
                                onChange={(e, newValue) => field.onChange(newValue)}
                                renderInput={(params) => <TextField {...params} label={m.drcJob} sx={{mb: 2}} />}
                                isOptionEqualToValue={(opt, val) => opt === val}
                              />
                            )
                          }}
                        />
                        <Controller
                          name="drcOffice"
                          control={_editForm.control}
                          render={({field}) => {
                            const values = seq(_users.get?.map((_) => _.drcOffice))
                              .distinct((_) => _)
                              .compact()
                              .get()

                            const currentValue = field.value ?? ''
                            const allOptions = seq([...values, currentValue])
                              .distinct((_) => _)
                              .compact()
                              .get()

                            return (
                              <Autocomplete
                                disablePortal
                                options={allOptions}
                                value={field.value ?? null}
                                onChange={(e, newValue) => field.onChange(newValue)}
                                renderInput={(params) => <TextField {...params} label={m.drcOffice} sx={{mb: 2}} />}
                                isOptionEqualToValue={(opt, val) => opt === val}
                              />
                            )
                          }}
                        />
                      </>
                    }
                  >
                    <IpIconBtn size="small">edit</IpIconBtn>
                  </Modal>
                  <IpIconBtn
                    disabled={_.email === conf.contact || _.email === session.email}
                    children="visibility"
                    loading={_connectAs.loading}
                    onClick={() => connectAs(_.email)}
                    tooltip={m.connectAs}
                  />
                </>
              ),
            },
          ]}
        />
      </Panel>
    </Page>
  )
}
