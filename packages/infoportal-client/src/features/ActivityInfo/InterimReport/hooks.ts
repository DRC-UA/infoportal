import {KoboMetaStatus} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@/shared/hook/useFetcher'

const useInterimReport = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher(() => api.koboMeta.search({status: [KoboMetaStatus.Committed]}))

  return {
    loading: fetcher.loading,
    data: fetcher.get,
  }
}

export {useInterimReport}
