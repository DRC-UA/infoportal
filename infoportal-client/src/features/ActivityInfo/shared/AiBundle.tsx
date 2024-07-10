import {ActiviftyInfoRecords} from '@/core/sdk/server/activity-info/ActiviftyInfoType'
import {Datatable} from '@/shared/Datatable/Datatable'
import React, {ReactNode, useEffect, useMemo, useState} from 'react'
import {UseFetcher} from '@/shared/hook/useFetcher'
import {map, Obj, seq} from '@alexandreannic/ts-utils'
import {AiPreviewActivity, AiPreviewRequest, AiSendBtn, AiViewAnswers} from '@/features/ActivityInfo/shared/ActivityInfoActions'
import {useAsync} from '@/shared/hook/useAsync'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useIpToast} from '@/core/useToast'
import {Box, useTheme} from '@mui/material'
import {IpInput} from '@/shared/Input/Input'
import {IpBtn} from '@/shared/Btn'
import {useI18n} from '@/core/i18n'
import {format, subMonths} from 'date-fns'
import {KoboAnswerFlat, KoboIndex} from '@infoportal-common'
import {useSession} from '@/core/Session/SessionContext'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {keyTypeIcon} from '@/features/Database/KoboTable/columns/getColumnBySchema'

export interface AiBundle<
  TActivity = any,
  TSubActivity extends any = undefined,
  TAnswer extends Record<string, any> = any
> {
  submit?: boolean
  recordId: string
  data: KoboAnswerFlat<TAnswer>[],
  activity: TActivity,
  subActivity?: TSubActivity,
  requestBody: ActiviftyInfoRecords,
}

export const aiInvalidValueFlag = '⚠️'
export const checkAiValid = (...args: (string | undefined)[]) => {
  return !args.find(_ => _ === undefined || _.includes(aiInvalidValueFlag))
}

export const AiBundleTable = ({
  fetcher,
  header,
  id,
}: {
  header?: ReactNode
  id: string
  fetcher: UseFetcher<(period: string) => Promise<AiBundle<any, any, any>[]>>
}) => {
  const {api, conf} = useAppSettings()
  const {toastHttpError} = useIpToast()
  const {session} = useSession()
  const {m} = useI18n()
  const t = useTheme()

  const [period, setPeriod] = useState(format(subMonths(new Date(), 1), 'yyyy-MM'))

  useEffect(() => {
    fetcher.fetch({clean: false}, period)
  }, [period])

  const maybeFirst = useMemo(() => {
    return fetcher.get?.[0]
  }, [fetcher])

  const _submit = useAsync((id: string, p: any) => api.activityInfo.submitActivity(p), {
    requestKey: ([i]) => i
  })

  return (
    <>
      <Datatable
        defaultLimit={100}
        showExportBtn
        id={`datatable-ai-${id}`}
        loading={fetcher.loading}
        data={fetcher.get}
        header={
          <Box sx={{display: 'flex', alignItems: 'center', flex: 1,}}>
            <IpInput
              helperText={null}
              sx={{width: 200, mr: 1}}
              type="month"
              value={period}
              onChange={e => setPeriod(e.target.value)}
            />
            {header}
            <IpBtn icon="send" variant="contained" sx={{ml: 'auto'}} onClick={() => {
              if (!fetcher.get) return
              _submit.call('all', fetcher.get.filter(_ => _.submit).map(_ => _.requestBody)).catch(toastHttpError)
            }}>
              {m.submitAll}
            </IpBtn>
          </Box>
        }
        columns={[
          {
            width: 120,
            id: 'actions',
            noCsvExport: true,
            renderQuick: _ => {
              return (
                <>
                  {session.admin && (
                    <>
                      <AiSendBtn
                        disabled={!_.submit}
                        onClick={() => {
                          _submit.call(_.recordId, [_.requestBody]).catch(toastHttpError)
                        }}
                      />
                      <AiPreviewActivity activity={{..._.activity, ..._.subActivity}}/>
                      <AiPreviewRequest request={_.requestBody}/>
                    </>
                  )}
                  <AiViewAnswers answers={_.data.map(_ => {
                    const copy = {..._}
                    copy.formId = KoboIndex.searchById(copy.formId)?.translation ?? copy.formId
                    delete copy.referencedFormId
                    delete copy.id
                    delete copy.uuid
                    return copy
                  })}/>
                </>
              )
            }
          },
          {
            id: 'form',
            head: m.kobo,
            width: 220,
            type: 'select_multiple',
            options: () => {
              return DatatableUtils.buildOptions(seq(fetcher.get).flatMap(_ => _.data).map(_ => KoboIndex.searchById(_.formId)?.translation ?? _.formId).distinct(_ => _).compact())
            },
            render: _ => {
              const formIds = seq(_.data).map(_ => KoboIndex.searchById(_.formId)?.translation ?? _.formId).distinct(_ => _).compact()
              return {
                value: formIds,
                label: formIds.join(', '),
              }
            },
          },
          {
            id: 'submissions',
            head: m.submissions,
            type: 'number',
            renderQuick: _ => _.data.length,
          },
          {
            id:'koboId',
            type: 'string',
            head: m.koboId,
            typeIcon: keyTypeIcon,
            className: 'td-id',
            renderQuick: _ => _.data.map(_ => _.koboId).join(' '),
            // options: () => DatatableUtils.buildOptions(fetcher.get?.flatMap(_ => _.data.map(_ => _.koboId)) ?? []),
            // render: _ => {
            //   // console.log(_)
            //   const ids = _.data.map(_ => _.koboId)
            //   return {
            //     label: ids.join(' '),
            //     value: ids,
            //   }
            // }
          },
          {
            id: 'id',
            type: 'select_one',
            head: 'Record ID',
            style: () => ({borderRight: '3px solid ' + t.palette.divider}),
            styleHead: {borderRight: '3px solid ' + t.palette.divider},
            renderQuick: _ => _.recordId
          },
          ...map(maybeFirst, first => [
            ...Object.keys(first.activity).map(colId => {
              return {
                head: colId,
                id: colId,
                // type: 'select_one',
                // type: 'string',
                type: typeof first.activity[colId] === 'number' ? 'number' : 'select_one' as any,
                renderQuick: (_: any) => _.activity[colId] as any,
              }
            }),
            ...Obj.keys(first.subActivity ?? {}).map(colId => {
              return {
                head: colId,
                id: colId,
                // type: 'string',
                type: typeof first.activity[colId] === 'number' ? 'number' : 'select_one' as any,
                renderQuick: (_: any) => _.subActivity[colId] as any,
              } as any
            })
          ]) ?? []
        ]}
      />
    </>
  )
}