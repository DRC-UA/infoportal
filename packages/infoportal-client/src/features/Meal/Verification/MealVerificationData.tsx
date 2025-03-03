import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useMealVerificationContext} from '@/features/Meal/Verification/MealVerificationContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {useIpToast} from '@/core/useToast'
import React, {useEffect, useState} from 'react'
import {mealVerificationActivities} from '@/features/Meal/Verification/mealVerificationConfig'
import {InferTypedAnswer} from '@/core/sdk/server/kobo/KoboTypedAnswerSdk'
import {Page, PageTitle} from '@/shared'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {MealVerificationStatus} from '@/core/sdk/server/mealVerification/MealVerification'
import {MealVerificationLinkToForm} from '@/features/Meal/Verification/MealVerificationList'
import {
  MealVerificationBundle,
  MealVerificationDataTable,
  PlaceHolderState,
} from '@/features/Meal/Verification/MealVerificationDataTable'
import {KoboIndex} from 'infoportal-common'
import {capitalize} from 'infoportal-common'
import {Box, CircularProgress, Icon, useTheme} from '@mui/material'
import {useParams} from 'react-router-dom'
import * as yup from 'yup'
import {fnSwitch} from '@axanc/ts-utils'

const paramSchema = yup.object({id: yup.string().required()})

export const MealVerificationData = () => {
  const {m} = useI18n()
  const t = useTheme()
  const {id} = paramSchema.validateSync(useParams())
  const {api} = useAppSettings()
  const ctx = useMealVerificationContext()
  const ctxSchema = useKoboSchemaContext()
  const {dateFromNow} = useI18n()
  const {toastError} = useIpToast()

  const [placeholder, setPlaceholder] = useState<{name: string; state: PlaceHolderState}[]>([])
  const [bundle, setBundle] = useState<undefined | MealVerificationBundle>()

  const addPlaceholder = (name: string, state: PlaceHolderState) => {
    setPlaceholder((prev) => {
      let exists = false
      const res = prev.map((_) => {
        if (_.name === name) {
          exists = true
          return {..._, state}
        }
        return _
      })
      if (!exists) res?.push({name, state})
      return res
    })
  }

  const wrapNullable = <T,>(name: string, variable: T): T => {
    if (variable) addPlaceholder(name, PlaceHolderState.Success)
    else addPlaceholder(name, PlaceHolderState.Error)
    return variable
  }

  const wrapPromise = async <T,>(name: string, fn: () => Promise<T>): Promise<undefined | T> => {
    addPlaceholder(name, PlaceHolderState.Loading)
    return fn()
      .then((_) => {
        addPlaceholder(name, PlaceHolderState.Success)
        return _
      })
      .catch((e) => {
        addPlaceholder(name, PlaceHolderState.Error)
        return undefined
      })
  }

  useEffect(() => {
    ;(async () => {
      const verifications = await wrapPromise('Fetch all Verification requests', ctx.fetcherVerifications.fetch)
      const mealVerification = wrapNullable(
        'Search current Verification request',
        verifications?.find((_) => _.id === id),
      )
      if (!mealVerification) return
      const activity = wrapNullable(
        'Get table configuration',
        mealVerificationActivities.find((_) => _.id === mealVerification.activity),
      )
      if (!activity) return
      const formNameReg = wrapNullable(
        'Check Registration form is connected to IP',
        KoboIndex.searchById(activity.registration.koboFormId)?.name,
      )
      const formNameVerif = wrapNullable(
        'Check Verification form is connected to IP',
        KoboIndex.searchById(activity.verification.koboFormId)?.name,
      )
      if (!formNameReg || !formNameVerif) return
      const [schemaReg, schemaVerif, dataReg, dataVerif, toVerify] = await Promise.all([
        wrapPromise('Fetch Registration schema', () => ctxSchema.fetchByName(formNameReg)),
        wrapPromise('Fetch Verification schema', () => ctxSchema.fetchByName(formNameVerif)),
        wrapPromise('Fetch Registration submissions', () =>
          api.kobo.typedAnswers.searchByAccess[activity.registration.fetch]({}).then(
            (_) => _.data as InferTypedAnswer<any>,
          ),
        ),
        wrapPromise('Fetch Verification submissions', () =>
          api.kobo.typedAnswers.searchByAccess[activity.verification.fetch]({}).then(
            (_) => _.data as InferTypedAnswer<any>,
          ),
        ),
        wrapPromise('Get Verification submissions status', () => api.mealVerification.getAnswers(mealVerification.id)),
      ])
      if (!toVerify || !schemaReg || !schemaVerif || !dataReg || !dataVerif) return
      setBundle({
        mealVerification,
        activity,
        schemaReg,
        dataReg,
        schemaVerif,
        dataVerif,
        toVerify,
      })
    })()
  }, [id])

  const refreshToVerify = () => {
    if (bundle)
      api.mealVerification
        .getAnswers(bundle.mealVerification.id)
        .then((toVerify) => setBundle((_) => ({..._!, toVerify})))
        .catch(toastError)
  }

  if (!bundle) {
    return (
      <Page width="xs">
        <PageTitle>{m.loading}...</PageTitle>
        {placeholder?.map((_) => (
          <Box key={_.name} sx={{display: 'flex', alignItems: 'center', mt: 1, mb: 2}}>
            <Box sx={{display: 'flex', width: 32}}>
              {fnSwitch(_.state, {
                Loading: <CircularProgress size={20} />,
                Error: <Icon color="error">error</Icon>,
                Success: <Icon color="success">check_circle</Icon>,
              })}
            </Box>
            <Box>{_.name}</Box>
          </Box>
        ))}
      </Page>
    )
  }
  return (
    <Page width="full">
      <PageTitle
        action={
          <>
            <IpSelectSingle
              label={m.status}
              sx={{minWidth: 140}}
              disabled={!ctx.access.admin}
              value={bundle.mealVerification.status}
              options={[
                {
                  children: (
                    <>
                      <Icon sx={{verticalAlign: 'middle', mr: 0.5, color: t.palette.success.main}} title={m.Approved}>
                        check_circle
                      </Icon>
                      {m.Approved}
                    </>
                  ),
                  value: MealVerificationStatus.Approved,
                },
                {
                  children: (
                    <>
                      <Icon sx={{verticalAlign: 'middle', mr: 0.5, color: t.palette.error.main}} title={m.Rejected}>
                        error
                      </Icon>
                      {m.Rejected}
                    </>
                  ),
                  value: MealVerificationStatus.Rejected,
                },
                {
                  children: (
                    <>
                      <Icon sx={{verticalAlign: 'middle', mr: 0.5, color: t.palette.warning.main}} title={m.Pending}>
                        schedule
                      </Icon>
                      {m.Pending}
                    </>
                  ),
                  value: MealVerificationStatus.Pending,
                },
              ]}
              onChange={(e) => {
                ctx.asyncUpdate.call(bundle.mealVerification.id, e ?? undefined)
              }}
            />
          </>
        }
        subTitle={
          <Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <MealVerificationLinkToForm koboFormId={bundle.activity.registration.koboFormId} sx={{mr: 1}} />
              <MealVerificationLinkToForm koboFormId={bundle.activity.verification.koboFormId} />
            </Box>
            {capitalize(dateFromNow(bundle.mealVerification.createdAt))} by <b>{bundle.mealVerification.createdBy}</b>
            <Box>{bundle.mealVerification.desc}</Box>
          </Box>
        }
      >
        {bundle.mealVerification.activity} {'>'} {bundle.mealVerification.name}
      </PageTitle>
      <MealVerificationDataTable {...bundle} refreshToVerify={refreshToVerify} />
    </Page>
  )
}
