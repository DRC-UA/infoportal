import {useContext, createContext, useEffect, type ReactNode} from 'react'
import {type Seq, seq, map, Obj} from '@alexandreannic/ts-utils'

import {IKoboMeta, Ecrec_vet_bha388, Ecrec_msmeGrantReg, KoboIndex} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {KoboAnswerFilter} from '@/core/sdk/server/kobo/KoboAnswerSdk'
import {type KoboSchemaContext, useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useFetcher, type UseFetcher} from '@/shared/hook/useFetcher'
import {useAsync, UseAsyncSimple} from '@/shared/hook/useAsync'

export interface EcrecContext {
  refresh: UseAsyncSimple<() => Promise<void>>
  data?: Seq<EcrecMergedEntity>
  fetcherData: UseFetcher<(filters?: KoboAnswerFilter) => Promise<Seq<IKoboMeta>>>
  schema: {
    ecrec_msmeGrantReg: KoboSchemaContext['byName']['ecrec_msmeGrantReg']['get']
  }
}

interface EcrecMSMEFields
  extends Partial<
    Pick<
      Ecrec_msmeGrantReg.T,
      | 'vetting_status'
      | 'validation_visit'
      | 'committee_decision'
      | 'status_first_tranche'
      | 'status_second_tranche'
      | 'business_consultancy'
      | 'post_distribution'
    >
  > {}

interface EcrecVETFields
  extends Partial<
    Pick<
      Ecrec_vet_bha388.T,
      | 'course_payment'
      | 'transportation_payment'
      | 'equipment_payment'
      | 'course_completed'
      | 'documentation_completion_course'
      | 'certificate_submitted'
    >
  > {}

export interface EcrecMergedEntity extends IKoboMeta, EcrecMSMEFields, EcrecVETFields {}

const Context = createContext({} as EcrecContext)

export const useEcrecContext = () => useContext(Context)

export const EcrecProvider = ({children}: {children: ReactNode}) => {
  const {api} = useAppSettings()
  const fetcherData = useFetcher(async () => {
    const [metaData, ecrec_msmeGrantRegResponse] = await Promise.all([
      api.ecrec.search().then((response) => seq(response.data)),
      api.kobo.typedAnswers.search.ecrec_msmeGrantReg(),
    ])
    const msmeGrantRegDictionary: Record<string, Ecrec_msmeGrantReg.T> = ecrec_msmeGrantRegResponse.data.reduce(
      (prev, current) => ({...prev, [current.id]: current}),
      {},
    )
    return metaData.map<EcrecMergedEntity>((record) => {
      return {
        ...record,
        ...(record.formId === KoboIndex.byName('ecrec_msmeGrantReg').id && {
          vetting_status: msmeGrantRegDictionary[record.koboId]?.vetting_status,
          validation_visit: msmeGrantRegDictionary[record.koboId]?.validation_visit,
          committee_decision: msmeGrantRegDictionary[record.koboId]?.committee_decision,
          status_first_tranche: msmeGrantRegDictionary[record.koboId]?.status_first_tranche,
          status_second_tranche: msmeGrantRegDictionary[record.koboId]?.status_second_tranche,
          business_consultancy: msmeGrantRegDictionary[record.koboId]?.business_consultancy,
          post_distribution: msmeGrantRegDictionary[record.koboId]?.post_distribution,
        }),
      }
    })
  })
  const koboAnswersCtx = useKoboAnswersContext()
  const schemaContext = useKoboSchemaContext()
  const asyncRefresh = useAsync(async () => {
    await api.ecrec.refresh()
    await fetcherData.fetch({clean: true, force: false})
  })

  useEffect(() => {
    fetcherData.fetch()
    koboAnswersCtx.byName('ecrec_msmeGrantReg').fetch()
    schemaContext.fetchByName('ecrec_msmeGrantReg')
  }, [])

  return (
    <Context.Provider
      value={{
        data: fetcherData.get,
        fetcherData,
        schema: {
          ecrec_msmeGrantReg: schemaContext.byName.ecrec_msmeGrantReg.get,
        },
        refresh: asyncRefresh,
      }}
    >
      {children}
    </Context.Provider>
  )
}
