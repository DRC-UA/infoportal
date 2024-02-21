import {KoboFormName, KoboIndex} from '@infoportal-common'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useIpToast} from '@/core/useToast'
import {useFetchers} from '@/shared/hook/useFetchers'

export const useSchemaFetchers = () => {
  const {api} = useAppSettings()
  const {toastHttpError} = useIpToast()
  return useFetchers((name: KoboFormName) => {
    return api.koboApi.getForm({id: KoboIndex.byName(name).id}).catch(e => {
      toastHttpError(e)
      throw e
    })
  }, {
    requestKey: _ => _[0],
  })
}