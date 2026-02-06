import {useEffect, useState, type ReactElement} from 'react'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {Box, Icon} from '@mui/material'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {KoboFormCreate} from '@/core/sdk/server/kobo/KoboFormSdk'
import {useIpToast} from '@/core/useToast'
import {useDatabaseContext} from '@/features/Database/DatabaseContext'
import {IpIconBtn, Modal, Txt} from '@/shared'
import {IpInput} from '@/shared/Input/Input'
import {useAsync} from '@/shared/hook/useAsync'
import {useFetcher} from '@/shared/hook/useFetcher'
import {useFetchers} from '@/shared/hook/useFetchers'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'

export const DatabaseNew = ({children, onAdded}: {onAdded?: () => void; children: ReactElement<any>}) => {
  const {api} = useAppSettings()
  const _server = useFetcher(api.kobo.server.getAll)
  const _form = useFetchers(api.koboApi.searchSchemas, {requestKey: ([_]) => _.serverId})
  const _add = useAsync(api.kobo.form.add)
  const {m, formatDate} = useI18n()
  const [selectedForm, setSelectedForm] = useState<KoboFormCreate | undefined>()
  const {toastHttpError} = useIpToast()
  const {formsAccessible} = useDatabaseContext()
  const accessibleFormIds = formsAccessible?.map((form) => form.id)
  const [query, setQuery] = useState('')
  const handleClear = () => setQuery('')

  useEffectFn(_server.error, toastHttpError)
  // useEffectFn(_form.error, toastHttpError)
  useEffectFn(_add.error, toastHttpError)

  useEffect(() => {
    _server.fetch()
  }, [])

  useEffect(() => {
    if (_server.get) {
      _server.get.forEach((_) => _form.fetch({}, {serverId: _.id}))
    }
  }, [_server.get])

  return (
    <Modal
      loading={_server.loading || _form.anyLoading || _add.loading}
      title={m._koboDatabase.registerNewForm}
      confirmLabel={m.register}
      confirmDisabled={selectedForm === undefined}
      onConfirm={() => {
        if (selectedForm) {
          _add.call(selectedForm).then(onAdded)
          setSelectedForm(undefined)
        }
      }}
      onClose={handleClear}
      slotProps={{
        paper: {
          sx: {
            height: '90%',
            width: '90%',
          },
        },
      }}
      content={
        <>
          <IpInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={m.filterPlaceholder}
            endAdornment={
              <IpIconBtn
                disabled={!query.length}
                aria-label={m.clearFilter}
                title={m.clearFilter}
                size="small"
                onClick={handleClear}
              >
                close
              </IpIconBtn>
            }
          />
          {_server.get?.map((server) => (
            <Box
              key={server.id}
              sx={{
                '&:not(:last-of-type)': {
                  mb: 2,
                },
              }}
            >
              <Txt size="big" bold sx={{mb: 0.5}}>
                {server.url.replace('https://', '')}
              </Txt>
              <ScRadioGroup dense value={selectedForm?.uid}>
                {(() => {
                  const forms = _form.get[server.id]
                    ?.filter((_) => _.has_deployment)
                    .filter((form) => !accessibleFormIds?.includes(form.uid)) // do not show already connected forms
                    .filter((form) => form.name.toLowerCase().includes(query.toLowerCase()))
                    .map((form) => (
                      <ScRadioGroupItem
                        dense
                        key={form.uid}
                        selected={form.uid === selectedForm?.uid}
                        value={form.uid}
                        onClick={() =>
                          setSelectedForm({
                            uid: form.uid,
                            serverId: server.id,
                          })
                        }
                        title={form.name}
                        description={
                          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Box>{form.deployment__submission_count}</Box>
                            {formatDate(form.date_created)}
                          </Box>
                        }
                      />
                    ))

                  return forms && forms.length > 0 ? (
                    forms
                  ) : (
                    <Box
                      sx={{
                        textAlign: 'center',
                        mt: 2,
                        color: (t) => t.palette.text.disabled,
                      }}
                    >
                      <Icon sx={{fontSize: '3em !important'}}>block</Icon>
                      <Box>{m.missingOrFaulty}</Box>
                    </Box>
                  )
                })()}
              </ScRadioGroup>
            </Box>
          ))}
        </>
      }
    >
      {children}
    </Modal>
  )
}
