import React, {ReactNode, useContext, useEffect, useMemo} from 'react'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {useAsync, UseAsyncMultiple} from '@/shared/hook/useAsync'
import {KoboAnswer, KoboAnswerId, KoboId} from '@/core/sdk/server/kobo/Kobo'
import {useAppSettings} from '@/core/context/ConfigContext'
import {
  CfmDataPriority,
  CfmDataProgram,
  CfmDataSource,
  DrcOffice,
  DrcProject,
  DrcProjectHelper,
  KeyOf,
  KoboIndex,
  KoboMealCfmHelper,
  KoboMealCfmStatus,
  KoboMealCfmTag,
  Meal_CfmExternal,
  Meal_CfmInternal,
  OblastIndex,
  OblastISO,
  OblastName
} from '@infoportal-common'
import {CfmDataFilters} from '@/features/Cfm/Data/CfmTable'
import {Access, AccessSum} from '@/core/sdk/server/access/Access'
import {AppFeatureId} from '@/features/appFeatureId'
import {useSession} from '@/core/Session/SessionContext'
import {ApiSdk} from '@/core/sdk/server/ApiSdk'
import {useIpToast} from '@/core/useToast'
import {fnSwitch, Obj, Seq, seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'
import {TableIcon, TableIconProps} from '@/features/Mpca/MpcaData/TableIcon'
import {Box, BoxProps} from '@mui/material'

const formIdMapping: Record<string, CfmDataSource> = {
  [KoboIndex.byName('meal_cfmExternal').id]: CfmDataSource.External,
  [KoboIndex.byName('meal_cfmInternal').id]: CfmDataSource.Internal,
}

export enum CfmDataOrigin {
  Internal = 'Internal',
  External = 'External',
}

export const CfmStatusIcon = ({status, ...props}: {
  status: KoboMealCfmStatus
} & Omit<TableIconProps, 'children'>) => fnSwitch(status, {
  [KoboMealCfmStatus.Close]: <TableIcon {...props} tooltip="Close" color="success">check_circle</TableIcon>,
  [KoboMealCfmStatus.Open]: <TableIcon {...props} tooltip="Open" color="warning">new_releases</TableIcon>,
  [KoboMealCfmStatus.Processing]: <TableIcon {...props} tooltip="Processing" color="info">schedule</TableIcon>,
  [KoboMealCfmStatus.Archived]: <TableIcon {...props} tooltip="Processing" color="disabled">archive</TableIcon>,
})

export const CfmStatusIconLabel = ({status, ...props}: {
  status: KoboMealCfmStatus
} & Omit<BoxProps, 'status' | 'children'>) => (
  <Box component="span" {...props}>
    <CfmStatusIcon status={status} sx={{mr: 1}}/>
    {status}
  </Box>
)

export const cfmStatusIconIndex = Obj.mapValues(KoboMealCfmStatus, _ => <CfmStatusIcon status={_}/>)

export type CfmData = {
  readonly origin: CfmDataOrigin
  readonly priority?: CfmDataPriority
  readonly formId: KoboId
  readonly tags?: KoboMealCfmTag
  readonly form: CfmDataSource
  readonly comments?: string
  readonly feedback?: string
  readonly additionalInformation?: string
  readonly project?: DrcProject
  readonly oblast: OblastName
  readonly oblastIso: OblastISO
  readonly category?: Meal_CfmInternal.T['feedback_type']
  readonly external_prot_support?: Meal_CfmExternal.T['prot_support']
  readonly internal_existing_beneficiary?: Meal_CfmInternal.T['existing_beneficiary']
  // internal_project_code?: Meal_CfmInternal.T['project_code']
  // external_thanks_feedback?: MealCfmExternal['thanks_feedback']
  // external_complaint?: MealCfmExternal['complaint']
  external_consent?: Meal_CfmExternal.T['consent']
  external_feedback_type?: Meal_CfmExternal.T['feedback_type']
  // internal_feedback?: Meal_CfmInternal.T['feedback']
  // internal?: Pick<Meal_CfmInternal.T, 'feedback' | 'existing_beneficiary' | 'project_code'>
  // external?: Pick<MealCfmExternal, 'prot_support' | 'thanks_feedback' | 'complaint' | 'consent' | 'feedback_type'>
} & Pick<KoboAnswer<Meal_CfmInternal.T>,
  // 'ben_det_oblast' |
  'ben_det_raion' |
  'ben_det_hromada'
> & Pick<KoboAnswer<Meal_CfmInternal.T>,
  'id' |
  'start' |
  'date' |
  'end' |
  'submissionTime' |
  'existing_beneficiary' |
  'name' |
  'gender' |
  'phone' |
  'email'
>

export interface CfmContext {
  authorizations: {
    sum: AccessSum,
    accessibleOffices?: DrcOffice[]
    accessiblePrograms?: CfmDataProgram[]
    // seeHisOwn: boolean
  }
  schemaInternal: KoboSchemaHelper.Bundle
  schemaExternal: KoboSchemaHelper.Bundle
  updateTag: UseAsyncMultiple<(_: {
    formId: KoboId,
    answerId: KoboAnswerId,
    key: keyof KoboMealCfmTag,
    value: any
  }) => Promise<void>, KoboId>
  asyncRemove: UseAsyncMultiple<(_: {
    formId: KoboId,
    answerId: KoboAnswerId
  }) => Promise<void>, KoboId>
  users: UseFetcher<ApiSdk['user']['search']>
  fetcherData: UseFetcher<() => Promise<{
    [CfmDataSource.Internal]: KoboAnswer<Meal_CfmInternal.T, KoboMealCfmTag>[]
    [CfmDataSource.External]: KoboAnswer<Meal_CfmExternal.T, KoboMealCfmTag>[]
  }>>
  mappedData: Seq<CfmData>
  visibleData: Seq<CfmData>
}

const CfmContext = React.createContext({} as CfmContext)

export const useCfmContext = () => useContext<CfmContext>(CfmContext)

export const cfmMakeUpdateRequestKey = (form: KoboId, answerId: KoboAnswerId, key: KeyOf<KoboMealCfmTag>) => form + answerId + key

export const cfmMakeEditRequestKey = (form: KoboId, answerId: KoboAnswerId) => form + answerId

export const CfmProvider = ({
  children,
  schemaInternal,
  schemaExternal,
}: {
  schemaInternal: KoboSchemaHelper.Bundle
  schemaExternal: KoboSchemaHelper.Bundle
  children: ReactNode
}) => {
  const {m} = useI18n()
  const {session, accesses} = useSession()
  const {api} = useAppSettings()
  const {toastError} = useIpToast()

  const users = useFetcher(() => api.user.search())

  const authorizations: CfmContext['authorizations'] = useMemo(() => {
    const cfmAccesses = seq(accesses).filter(Access.filterByFeature(AppFeatureId.cfm))
    const sum = Access.toSum(cfmAccesses, session.admin)
    const accessibleOffices = cfmAccesses.map(_ => _.params).flatMap(_ => _?.office).compact().get()
    const accessiblePrograms = cfmAccesses.map(_ => _.params).flatMap(_ => _?.program).compact().get()
    // const seeHisOwn = !!cfmAccesses.find(_ => _.params?.seeHisOwn)
    return {
      sum,
      accessibleOffices: accessibleOffices.length === 0 ? undefined : accessibleOffices,
      accessiblePrograms: accessiblePrograms.length === 0 ? undefined : accessiblePrograms,
      // seeHisOwn: seeHisOwn,
    }
  }, [session, accesses])

  const fetcherData = useFetcher(async (filters?: CfmDataFilters) => {
    const [external, internal] = await Promise.all([
      api.kobo.typedAnswers.searchMealCfmExternal(filters).then(_ => _.data),
      api.kobo.typedAnswers.searchMealCfmInternal(filters).then(_ => _.data),
    ])
    return {[CfmDataSource.External]: external, [CfmDataSource.Internal]: internal}
  })

  const mappedData = useMemo(() => {
    const res: CfmData[] = []
    fetcherData.get?.[CfmDataSource.External].forEach(_ => {
      const category = _.tags?.feedbackTypeOverride
      res.push({
        category,
        project: _.tags?.project,
        priority: KoboMealCfmHelper.feedbackType2priority(category),
        formId: KoboIndex.byName('meal_cfmExternal').id,
        origin: CfmDataOrigin.External,
        external_feedback_type: _.feedback_type,
        external_consent: _.consent,
        external_prot_support: _.prot_support,
        form: CfmDataSource.External,
        oblast: OblastIndex.byKoboName(_.ben_det_oblast!)!.name,
        oblastIso: OblastIndex.byKoboName(_.ben_det_oblast!)!.iso,
        feedback: _.complaint ?? _.thanks_feedback ?? _.request,
        ..._,
      })
    })
    fetcherData?.get?.[CfmDataSource.Internal].forEach(_ => {
      const category = _.tags?.feedbackTypeOverride ?? _.feedback_type
      const koboCode = _.project_code === 'Other' ? _.project_code_specify : _.project_code
      const parsedCode = koboCode?.match(/UKR.(000\d\d\d)/)?.[1]
      res.push({
        project: DrcProjectHelper.searchByCode(parsedCode),
        priority: KoboMealCfmHelper.feedbackType2priority(category),
        category,
        formId: KoboIndex.byName('meal_cfmInternal').id,
        origin: CfmDataOrigin.Internal,
        form: CfmDataSource.Internal,
        internal_existing_beneficiary: _.existing_beneficiary,
        // internal_project_code: _.project_code,
        oblast: OblastIndex.byKoboName(_.ben_det_oblast!).name,
        oblastIso: OblastIndex.byKoboName(_.ben_det_oblast!).iso,
        ..._,
      })
    })
    return seq(res).sortByNumber(item => item.submissionTime ? new Date(item.submissionTime).getTime() : 0);
  }, [fetcherData])

  const visibleData = useMemo(() => {
    return mappedData.filter(_ => {
      if (_.tags?.deletedBy) return false
      if (session.email === _.tags?.focalPointEmail)
        return true
      if (!authorizations.sum.read)
        return false
      if (authorizations.accessiblePrograms && !authorizations.accessiblePrograms.includes(_.tags?.program!))
        return false
      if (authorizations.accessibleOffices && !authorizations.accessibleOffices.includes(_.tags?.office!))
        return false
      // if (authorizations.accessibleEmails && !authorizations.accessibleEmails.includes(_.tags?.focalPointEmail!))
      //   return false
      return true
    })
  }, [fetcherData, authorizations.accessiblePrograms, authorizations.accessibleOffices])

  const updateTag = useAsync((params: {
    formId: KoboId,
    answerId: KoboAnswerId,
    key: keyof KoboMealCfmTag,
    value: any
  }) => {
    return api.kobo.answer.updateTag({
      formId: params.formId,
      answerIds: [params.answerId],
      tags: {[params.key]: params.value}
    }).then(() => {
      const formName = formIdMapping[params.formId]
      fetcherData.set(prev => prev ? ({
        ...prev,
        [formName]: prev[formName].map(_ => {
          if (_.id === params.answerId) {
            _.tags = {..._.tags, [params.key]: params.value}
          }
          return _
        })
      }) : undefined)
    }).catch(e => {
      toastError(m._shelter.cannotUpdateTag(1, params.key as string, params.value as string))
      throw e
    })
  }, {
    requestKey: ([_]) => cfmMakeUpdateRequestKey(_.formId, _.answerId, _.key)
  })

  const asyncRemove = useAsync(async ({formId, answerId}: {
    formId: KoboId,
    answerId: KoboAnswerId
  }) => {
    // await Promise.all([
    // await updateTag.call({
    //   formId,
    //   answerId,
    //   key: 'deletedAt',
    //   value: new Date(),
    // })
    await updateTag.call({
      formId,
      answerId,
      key: 'deletedBy',
      value: session.email ?? 'unknown',
    })
    // ])
  }, {
    requestKey: ([_]) => cfmMakeEditRequestKey(_.formId, _.answerId)
  })

  useEffect(() => {
    fetcherData.fetch()
    users.fetch()
  }, [])

  return (
    <CfmContext.Provider value={{
      authorizations,
      asyncRemove,
      updateTag,
      fetcherData: fetcherData,
      users,
      mappedData,
      visibleData,
      schemaInternal,
      schemaExternal,
    }}>
      {children}
    </CfmContext.Provider>
  )
}
