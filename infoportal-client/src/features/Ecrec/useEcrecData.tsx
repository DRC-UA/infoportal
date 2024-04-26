import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@alexandreannic/react-hooks-lib'
import {useEffect} from 'react'
import {Ecrec_cashRegistration, KoboAnswerFlat, KoboEcrec_cashRegistration, KoboGeneralMapping} from '@infoportal-common'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'

export type EcrecData = KoboAnswerFlat<Ecrec_cashRegistration.T> & {
  custom: KoboGeneralMapping.IndividualBreakdown
  tags?: KoboEcrec_cashRegistration.Tags
}

export const useEcrecData = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher(api.kobo.typedAnswers.searchEcrec_cashRegistration as () => Promise<ApiPaginate<EcrecData>>)

  useEffect(() => {
    fetcher.fetch()
  }, [])

  return fetcher
}