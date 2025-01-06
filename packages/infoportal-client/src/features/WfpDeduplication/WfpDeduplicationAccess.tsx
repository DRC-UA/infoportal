import {useAppSettings} from '@/core/context/ConfigContext'
import {AppFeatureId} from '@/features/appFeatureId'
import {useAsync} from '@/shared/hook/useAsync'
import {AccessTable} from '@/features/Access/AccessTable'
import {IpBtn} from '@/shared/Btn'
import {Panel} from '@/shared/Panel'
import React, {useEffect} from 'react'
import {useSession} from '@/core/Session/SessionContext'
import {WfpDeduplicationAccessForm} from '@/features/WfpDeduplication/WfpDeduplicationAccessForm'
import {useI18n} from '@/core/i18n'
import {Page} from '@/shared/Page'
import {WfpDeduplicationAccessParams} from '@/core/sdk/server/access/Access'
import {useFetcher} from '@/shared/hook/useFetcher'

export const WfpDeduplicationAccess = () => {
  const {api} = useAppSettings()
  const {session} = useSession()
  const {m} = useI18n()

  const _get = useFetcher(() => api.access.search({featureId: AppFeatureId.wfp_deduplication}))
  const _remove = useAsync(api.access.remove, {requestKey: (_) => _[0]})

  const refresh = () => {
    _get.fetch({force: true, clean: false})
  }

  useEffect(() => {
    _get.fetch({})
  }, [])

  return (
    <Page>
      <Panel>
        <AccessTable
          asyncRemove={_remove}
          fetcherData={_get}
          renderParams={(_: WfpDeduplicationAccessParams) => JSON.stringify(_.filters)}
          onRemoved={refresh}
          isAdmin={session.admin}
          header={
            session.admin && (
              <WfpDeduplicationAccessForm onAdded={refresh}>
                <IpBtn sx={{mr: 1}} variant="contained" icon="person_add">
                  {m.grantAccess}
                </IpBtn>
              </WfpDeduplicationAccessForm>
            )
          }
        />
      </Panel>
    </Page>
  )
}
