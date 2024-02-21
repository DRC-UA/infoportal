import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import {kobo, UUID} from '@infoportal-common'
import {useEffect, useState} from 'react'
import {KoboFormListButton} from './KoboFormList'
import {useFetchers} from '@/shared/hook/useFetchers'
import {map} from '@alexandreannic/ts-utils'
import {Box} from '@mui/material'
import {useFetcher} from '@/shared/hook/useFetcher'

export const DatabaseSources = () => {
  const {api} = useAppSettings()
  const _allKoboForm = useFetcher(() => api.koboApi.getForms(kobo.drcUa.server.prod))
  const _sources = useFetchers((formId: UUID) => api.koboApi.getForm({id: formId}), {
    requestKey: ([_]) => _
  })
  const [mainSource, setMainSource] = useState<UUID | undefined>()

  useEffect(() => {
    if (mainSource)
      _sources.fetch({}, mainSource)
  }, [mainSource])

  useEffect(() => {
    _allKoboForm.fetch()
    // _old.fetch()
  }, [])

  return (
    <Page>
      {_allKoboForm.get && (
        <>
          <KoboFormListButton forms={_allKoboForm.get} onChange={_ => setMainSource(_)}/>
          {map(_sources.get[mainSource!], source => (
            <>
              {source.content.survey.map(q => (
                <Box key={q.name}>{q.name}</Box>
              ))}
            </>
          ))}
        </>
      )}
    </Page>
  )
}