import {useEffect} from 'react'
import {useCrudList} from '@alexandreannic/react-hooks-lib'
import {endOfDay} from 'date-fns'
import {Controller, useForm} from 'react-hook-form'

import {NullableFn, Regexp, slugify} from 'infoportal-common'

import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {Switch, TextField} from '@mui/material'
import {IpIconBtn} from '@/shared/IconBtn'
import {IpInput} from '@/shared/Input/Input'
import {Txt} from '@/shared/Txt'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {Proxy} from '@/core/sdk/server/proxy/Proxy'
import {Modal} from '@/shared'
import {Datatable} from '@/shared/Datatable/Datatable'
import {appConfig} from '@/conf/AppConfig'

interface CreateForm {
  name: string
  origin?: string
  slug: string
  url: string
  expireAt?: Date
}

export const AdminProxy = () => {
  const {api} = useAppSettings()
  const {m, formatDateTime} = useI18n()

  const _createForm = useForm<CreateForm>({
    mode: 'onChange',
  })

  const _editForm = useForm<CreateForm>({
    mode: 'onChange',
  })

  const _search = useCrudList('id', {
    c: api.proxy.create,
    r: api.proxy.search,
    u: api.proxy.update,
    d: api.proxy.delete,
  })
  useEffect(() => {
    _search.fetch()
  }, [])

  const parseForUrl: NullableFn<string> = (_) => {
    return slugify(_?.toLowerCase()) as any
  }

  return (
    <Page width="lg">
      <Panel>
        <Datatable
          id="proxy"
          header={
            <>
              <Modal
                title={m.create}
                loading={_search.creating}
                confirmDisabled={!_createForm.formState.isValid}
                onConfirm={(e, close) =>
                  _createForm.handleSubmit((form) => {
                    _search
                      .create(
                        {},
                        {
                          ...form,
                          expireAt: form.expireAt ? endOfDay(new Date(form.expireAt)) : undefined,
                          slug: parseForUrl(form.name),
                        },
                      )
                      .then(close)
                  })()
                }
                content={
                  <>
                    <Controller
                      defaultValue={''}
                      control={_createForm.control}
                      name="name"
                      rules={{
                        required: {value: true, message: m.required},
                      }}
                      render={({field, fieldState}) => (
                        <IpInput
                          {...field}
                          label={m.name}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          sx={{mb: 2, mt: 1}}
                        />
                      )}
                    />
                    <IpInput
                      disabled={true}
                      label={m.proxyUrl}
                      value={Proxy.makeUrl({
                        appConfig,
                        proxy: {slug: parseForUrl(_createForm.watch('name') ?? '')},
                      })}
                      sx={{mb: 2}}
                    />
                    <Controller
                      defaultValue={''}
                      control={_createForm.control}
                      name="url"
                      rules={{
                        required: {value: true, message: m.required},
                        pattern: {value: Regexp.get.url, message: m.invalidUrl},
                      }}
                      render={({field, fieldState}) => (
                        <IpInput
                          {...field}
                          label={m.proxyDestinationUrl}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          sx={{mb: 2}}
                        />
                      )}
                    />
                    <Controller
                      control={_createForm.control}
                      name="expireAt"
                      render={({field, fieldState}) => (
                        <IpInput
                          {...field}
                          InputLabelProps={{shrink: true}}
                          label={m.expireAt}
                          type="date"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                  </>
                }
              >
                <IpIconBtn>add</IpIconBtn>
              </Modal>
            </>
          }
          data={_search.list}
          loading={_search.fetching}
          columns={[
            {
              type: 'string',
              id: 'name',
              head: m.name,
              renderQuick: (_) => _.name,
            },
            {
              type: 'string',
              id: 'origin',
              head: m.origin,
              render: (_) => {
                const redirectUrl = Proxy.makeUrl({appConfig: appConfig, proxy: _})
                return {
                  value: _.slug,
                  label: (
                    <Txt link>
                      <a target="_blank" href={redirectUrl}>
                        {redirectUrl}
                      </a>
                    </Txt>
                  ),
                }
              },
            },
            {
              type: 'string',
              id: 'destination',
              head: m.destination,
              render: (_) => {
                return {
                  value: _.url,
                  label: (
                    <Txt link>
                      <a target="_blank" href={_.url}>
                        {_.url}
                      </a>
                    </Txt>
                  ),
                }
              },
            },
            {
              type: 'date',
              id: 'createdAt',
              head: m.createdAt,
              render: (_) => {
                return {
                  label: formatDateTime(_.createdAt),
                  value: _.createdAt,
                }
              },
            },
            {
              type: 'date',
              id: 'expireAt',
              width: 0,
              head: m.expireAt,
              render: (_) => {
                return {
                  label: formatDateTime(_.expireAt),
                  value: _.expireAt,
                }
              },
            },
            {
              type: 'string',
              id: 'enabled',
              align: 'center',
              head: m.enabled,
              render: (_) => {
                return {
                  label: (
                    <Switch
                      checked={!_.disabled}
                      onChange={(e) => _search.update(_.id, {disabled: !e.currentTarget.checked})}
                    />
                  ),
                  value: !_.disabled ? 'Enabled' : 'Disabled',
                  option: !_.disabled,
                }
              },
            },
            {
              id: 'actions',
              head: '',
              width: 0,
              align: 'right',
              renderQuick: (_) => (
                <>
                  <Modal
                    onOpen={() =>
                      _editForm.reset({
                        name: _.name,
                        url: _.url,
                        expireAt: _.expireAt ? new Date(_.expireAt) : undefined,
                        slug: _.slug,
                      })
                    }
                    title={m.edit}
                    confirmLabel={m.save}
                    onConfirm={(e, close) =>
                      _editForm.handleSubmit((form) => {
                        _search
                          .update(_.id, {
                            name: form.name,
                            url: form.url,
                            expireAt: form.expireAt ? endOfDay(new Date(form.expireAt)) : undefined,
                          })
                          .then(close)
                      })()
                    }
                    content={
                      <>
                        <Controller
                          name="name"
                          control={_editForm.control}
                          rules={{required: {value: true, message: m.required}}}
                          render={({field, fieldState}) => (
                            <TextField
                              {...field}
                              fullWidth
                              size="small"
                              label={m.name}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              sx={{mt: 2, mb: 2}}
                            />
                          )}
                        />
                        <Controller
                          name="url"
                          control={_editForm.control}
                          rules={{
                            required: {value: true, message: m.required},
                            pattern: {value: Regexp.get.url, message: m.invalidUrl},
                          }}
                          render={({field, fieldState}) => (
                            <IpInput
                              {...field}
                              label={m.proxyDestinationUrl}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                              sx={{mb: 2}}
                            />
                          )}
                        />
                        <Controller
                          name="expireAt"
                          control={_editForm.control}
                          render={({field, fieldState}) => (
                            <IpInput
                              {...field}
                              InputLabelProps={{shrink: true}}
                              label={m.expireAt}
                              type="date"
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                      </>
                    }
                  >
                    <IpIconBtn size="small">edit</IpIconBtn>
                  </Modal>
                  <TableIconBtn onClick={() => _search.remove(_.id)} loading={_search.removing(_.id)}>
                    delete
                  </TableIconBtn>
                </>
              ),
            },
          ]}
        />
      </Panel>
    </Page>
  )
}
