import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {useEffect} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useCrudList} from '@alexandreannic/react-hooks-lib'
import {useI18n} from '@/core/i18n'
import {Switch} from '@mui/material'
import {IpIconBtn} from '@/shared/IconBtn'
import {useForm} from 'react-hook-form'
import {IpInput} from '@/shared/Input/Input'
import {Regexp, slugify} from 'infoportal-common'
import {Txt} from '@/shared/Txt'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {Proxy} from '@/core/sdk/server/proxy/Proxy'
import {endOfDay} from 'date-fns'
import {Modal} from '@/shared'
import {Datatable} from '@/shared/Datatable/Datatable'
import {formatDateTime} from '@/core/i18n/localization/en'

interface CreateForm {
  name: string
  slug: string
  url: string
  expireAt: Date
}

export const AdminProxy = () => {
  const {api} = useAppSettings()
  const {formatDate, m} = useI18n()

  const _createForm = useForm<CreateForm>()

  const _search = useCrudList('id', {
    c: api.proxy.create,
    u: api.proxy.update,
    r: api.proxy.search,
    d: api.proxy.delete,
  })
  useEffect(() => {
    _search.fetch()
  }, [])

  const parseForUrl = (_?: string) => {
    return slugify(_?.toLowerCase())
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
                onConfirm={(e, close) => _createForm.handleSubmit(form => {
                  _search.create({}, {
                    ...form,
                    expireAt: form.expireAt ? endOfDay(new Date(form.expireAt)) : undefined,
                    slug: parseForUrl(form.name),
                  }).then(close)
                })()}
                content={
                  <>
                    <IpInput
                      {..._createForm.register('name', {
                        required: {value: true, message: m.required}
                      })}
                      label={m.name}
                      error={!!_createForm.formState.errors.name}
                      helperText={parseForUrl(_createForm.watch('name'))}
                      sx={{mb: 2, mt: 1}}
                    />
                    <IpInput
                      sx={{mb: 2}}
                      label={m.url}
                      error={!!_createForm.formState.errors.url}
                      helperText={_createForm.formState.errors.name?.message ?? m.error}
                      {..._createForm.register('url', {
                        required: {value: true, message: m.required},
                        pattern: {value: Regexp.get.url, message: m.invalidUrl},
                      })}
                    />
                    <IpInput
                      InputLabelProps={{shrink: true}}
                      label={m.expireAt}
                      type="date"
                      {..._createForm.register('expireAt', {
                        required: {value: true, message: m.required},
                      })}
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
              renderQuick: _ => _.name,
            },
            {
              type: 'string',
              id: 'origin',
              head: m.origin,
              render: _ => {
                return {
                  value: _.slug,
                  label: (
                    <Txt link><a target="_blank" href={Proxy.makeUrl(_)}>{Proxy.makeUrl(_)}</a></Txt>
                  )
                }
              }
            },
            {
              type: 'string',
              id: 'destination',
              head: m.destination,
              render: _ => {
                return {
                  value: _.url,
                  label: (
                    <Txt link><a target="_blank" href={_.url}>{_.url}</a></Txt>
                  )
                }
              }
            },
            {
              type: 'date',
              id: 'createdAt',
              head: m.createdAt,
              render: _ => {
                return {
                  label: formatDateTime(_.createdAt),
                  value: _.createdAt,
                }
              }
            },
            {
              type: 'date',
              id: 'expireAt',
              width: 0,
              head: m.expireAt,
              render: _ => {
                return {
                  label: formatDateTime(_.expireAt),
                  value: _.expireAt,
                }
              }
            },
            {
              type: 'string',
              id: 'enabled',
              align: 'center',
              head: m.enabled,
              render: _ => {
                return {
                  label: (
                    <Switch
                      checked={!_.disabled}
                      onChange={e => _search.update(_.id, {disabled: !e.currentTarget.checked})}
                    />
                  ),
                  value: !_.disabled ? 'Enabled' : 'Disabled',
                  option: !_.disabled,
                }
              }
            },
            {
              id: 'actions',
              head: '',
              width: 0,
              align: 'right',
              renderQuick: _ => (
                <TableIconBtn onClick={() => _search.remove(_.id)} loading={_search.removing(_.id)}>delete</TableIconBtn>
              ),
            },
          ]}/>
      </Panel>
    </Page>

  )
}