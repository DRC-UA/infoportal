import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher} from '@alexandreannic/react-hooks-lib'
import {useEffect} from 'react'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'

export type EcrecData = InferTypedAnswer<'ecrec_cashRegistration'>

export const useEcrecData = () => {
  const {api} = useAppSettings()
  const fetcher = useFetcher(api.kobo.typedAnswers.search.ecrec_cashRegistration)

  useEffect(() => {
    fetcher.fetch()
  }, [])

  return fetcher
}