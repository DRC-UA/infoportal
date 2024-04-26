import React, {useEffect} from 'react'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {Sheet} from '@/shared/Sheet/Sheet'
import {useI18n} from '@/core/i18n'
import {Avatar, Box, BoxProps, Icon, useTheme} from '@mui/material'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {NavLink} from 'react-router-dom'
import {IpBtn} from '@/shared/Btn'
import {Modal, Txt} from 'mui-extension'
import {useAsync} from '@/shared/hook/useAsync'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useSession} from '@/core/Session/SessionContext'
import {koboIndex, KoboIndex} from '@infoportal-common'
import {AppFeatureId} from '@/features/appFeatureId'
import {databaseIndex} from '@/features/Database/databaseIndex'
import Link from 'next/link'
import {KoboId} from '@infoportal-common'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {MealVerificationStatus} from '@/core/sdk/server/mealVerification/MealVerification'
import {mealIndex} from '@/features/Meal/Meal'
import {useMealVerificationContext} from '@/features/Meal/Verification/MealVerificationContext'
import {mealVerificationActivitiesIndex} from '@/features/Meal/Verification/mealVerificationConfig'

export const MealVerificationLinkToForm = ({
  koboFormId,
  sx,
}: {
  koboFormId: KoboId
} & Pick<BoxProps, 'sx'>) => {
  const {conf} = useAppSettings()
  return (
    <Link target="_blank" href={conf.linkToFeature(
      AppFeatureId.kobo_database,
      databaseIndex.siteMap.database.absolute(koboIndex.drcUa.server.prod, koboFormId)
    )}>
      <Txt link sx={{display: 'flex', alignItems: 'center', ...sx}}>
        <Icon fontSize="inherit" sx={{mr: .5}}>open_in_new</Icon>
        {KoboIndex.searchById(koboFormId)?.translation}
      </Txt>
    </Link>
  )
}

export const MealVerificationList = () => {
  const ctx = useMealVerificationContext()
  const {api} = useAppSettings()
  const {session} = useSession()
  const asyncRemove = useAsync(api.mealVerification.remove)
  const {m, formatDateTime} = useI18n()
  const t = useTheme()
  useEffect(() => {
    ctx.fetcherVerifications.fetch({force: true, clean: false})
  }, [])

  return (
    <Page width="full">
      <Panel>
        <Sheet
          header={
            <>
              <NavLink to={mealIndex.siteMap.verification.form}>
                <IpBtn variant="contained" icon="add">{m._mealVerif.newRequest}</IpBtn>
              </NavLink>
            </>
          }
          id="meal-verification-request"
          data={ctx.fetcherVerifications.get}
          loading={ctx.fetcherVerifications.loading}
          columns={[
            {
              id: 'validation',
              head: m.validation,
              width: 0,
              type: 'select_one',
              tooltip: null,
              renderValue: (row) => row.status ?? SheetUtils.blank,
              renderOption: (row) => row.status ? m[row.status!] : SheetUtils.blank,
              render: row => (
                <>
                  <IpSelectSingle
                    disabled={!ctx.access.admin}
                    value={row.status}
                    options={[
                      {children: <Icon sx={{color: t.palette.success.main}} title={m.Approved}>check_circle</Icon>, value: MealVerificationStatus.Approved},
                      {children: <Icon sx={{color: t.palette.error.main}} title={m.Rejected}>error</Icon>, value: MealVerificationStatus.Rejected},
                      {children: <Icon sx={{color: t.palette.warning.main}} title={m.Pending}>schedule</Icon>, value: MealVerificationStatus.Pending},
                    ]}
                    onChange={(e) => {
                      ctx.asyncUpdate.call(row.id, e ?? undefined)
                    }}
                  />
                </>
              )
            },
            {
              type: 'string',
              id: 'name',
              head: m.name,
              style: () => ({fontWeight: t.typography.fontWeightBold}),
              render: _ => _.name
            },
            {
              type: 'string',
              id: 'desc',
              head: m.description,
              style: () => ({color: t.palette.text.secondary}),
              render: _ => _.desc
            },
            {
              type: 'date',
              id: 'createdAt',
              head: m.createdAt,
              render: _ => formatDateTime(_.createdAt),
              renderValue: _ => _.createdAt
            },
            {
              type: 'select_one',
              id: 'createdBy',
              head: m.createdBy,
              render: _ => <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Avatar sx={{width: 22, height: 22, mr: 1}}><Icon fontSize="small">person</Icon></Avatar>
                {_.createdBy}
              </Box>
            },
            {
              type: 'string',
              id: 'filters',
              head: m.filters,
              render: _ => JSON.stringify(_.filters)
            },
            {
              type: 'select_one',
              id: 'activity',
              head: m._mealVerif.activityForm,
              renderOption: _ => KoboIndex.searchById(mealVerificationActivitiesIndex[_.activity].registration.koboFormId)?.translation,
              renderValue: _ => KoboIndex.searchById(mealVerificationActivitiesIndex[_.activity].registration.koboFormId)?.translation,
              render: _ => <MealVerificationLinkToForm koboFormId={mealVerificationActivitiesIndex[_.activity].registration.koboFormId}/>
            },
            {
              type: 'select_one',
              id: 'verification',
              head: m._mealVerif.verificationForm,
              renderOption: _ => KoboIndex.searchById(mealVerificationActivitiesIndex[_.activity].verification.koboFormId)?.translation,
              renderValue: _ => KoboIndex.searchById(mealVerificationActivitiesIndex[_.activity].verification.koboFormId)?.translation,
              render: _ => <MealVerificationLinkToForm koboFormId={mealVerificationActivitiesIndex[_.activity].verification.koboFormId}/>
            },
            {
              id: 'actions',
              head: '',
              width: 1,
              align: 'right',
              render: _ => (
                <>
                  {session.admin && (
                    <Modal
                      title={m.confirmRemove}
                      onConfirm={(e, close) => asyncRemove.call(_.id).then(() => {
                        close()
                        ctx.fetcherVerifications.fetch({force: true, clean: false})
                      })}
                      loading={asyncRemove.loading}
                    >
                      <TableIconBtn>delete</TableIconBtn>
                    </Modal>
                  )}
                  <NavLink to={mealIndex.siteMap.verification.data(_.id)}>
                    <TableIconBtn>chevron_right</TableIconBtn>
                  </NavLink>
                </>
              )
            }
          ]}
        />
      </Panel>
    </Page>
  )
}
