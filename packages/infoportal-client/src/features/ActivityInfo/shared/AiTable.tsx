import type {FC} from 'react'
import {seq} from '@axanc/ts-utils'
import {Badge, Box} from '@mui/material'
import {endOfMonth, startOfYear} from 'date-fns'

import {KoboIndex, type IKoboMeta} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {useSession} from '@/core/Session/SessionContext'
import {useIpToast} from '@/core/useToast'
import {
  AiPreviewActivity,
  AiPreviewRequest,
  AiSendBtn,
  AiViewAnswers,
} from '@/features/ActivityInfo/shared/ActivityInfoActions'
import {IpBtn} from '@/shared/Btn'
import {Datatable} from '@/shared/Datatable/Datatable'
import {DatatableHeadIconByType} from '@/shared/Datatable/DatatableHead'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {useAsync} from '@/shared/hook/useAsync'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'

import type {AiTableProps} from './types'

const deduplicateKoboIds = (data: IKoboMeta[]): Array<string> => Array.from(new Set(data.map(({koboId}) => koboId)))

const AiTable: FC<AiTableProps> = ({data, columns, period, setPeriod, loading}) => {
  const {session} = useSession()
  const {api} = useAppSettings()
  const {m} = useI18n()
  const {toastHttpError} = useIpToast()

  const _submit = useAsync((id: string, p: any) => api.activityInfo.submitActivity(p), {requestKey: ([i]) => i})

  return (
    <Datatable
      defaultLimit={100}
      showExportBtn
      loading={loading}
      data={data}
      header={
        <Box sx={{display: 'flex', alignItems: 'center', flex: 1}}>
          <PeriodPicker
            min={startOfYear('2026')}
            value={[period.start, period.end]}
            onChange={([start, end]) => setPeriod({start, end})}
            fullWidth={false}
            max={endOfMonth(new Date())}
          />
          {session.admin && (
            <IpBtn
              icon="send"
              variant="contained"
              loading={_submit.anyLoading}
              sx={{ml: 'auto'}}
              onClick={() => {
                if (!data) return
                _submit
                  .call(
                    'all',
                    data.filter(({submit}) => submit).map(({requestBody}) => requestBody),
                  )
                  .catch(toastHttpError)
              }}
            >
              {m.submitAll}
            </IpBtn>
          )}
        </Box>
      }
      columns={[
        {
          width: 120,
          id: 'actions',
          noCsvExport: true,
          renderQuick: ({submit, requestBody, activity, recordId, data}) => {
            return (
              session.admin && (
                <>
                  <AiSendBtn
                    loading={_submit.loading[recordId]}
                    disabled={!submit || JSON.stringify(requestBody).includes('undefined')}
                    onClick={() => {
                      _submit.call(recordId, [requestBody]).catch(toastHttpError)
                    }}
                  />
                  <AiPreviewActivity activity={{...activity}} />
                  <Badge
                    variant="dot"
                    color="primary"
                    overlap="circular"
                    badgeContent="!"
                    invisible={!JSON.stringify(requestBody).includes('undefined')}
                  >
                    <AiPreviewRequest request={requestBody} />
                  </Badge>
                  <AiViewAnswers
                    answers={data.map((columns) => {
                      const copy = {...columns}
                      copy.formId = KoboIndex.searchById(copy.formId)?.translation ?? copy.formId
                      delete copy.referencedFormId
                      delete copy.id
                      delete copy.uuid
                      return copy
                    })}
                  />
                </>
              )
            )
          },
        },
        {
          id: 'form',
          head: m.kobo,
          width: 220,
          type: 'select_one',
          options: () => {
            return DatatableUtils.buildOptions(
              seq(data)
                .flatMap(({data}) => data)
                .map(({formId}) => formId)
                .distinct((formId) => formId)
                .compact()
                .map((formId) => KoboIndex.searchById(formId)?.translation ?? formId),
            )
          },
          render: ({data}) => {
            const value = data[0].formId
            const label = KoboIndex.searchById(value)?.translation ?? value
            return {
              value,
              label,
            }
          },
        },
        {
          id: 'koboId',
          type: 'id',
          head: m.koboId,
          typeIcon: <DatatableHeadIconByType type="id" />,
          className: 'td-id',
          renderQuick: ({data}) => deduplicateKoboIds(data).join(' '),
        },
        {
          id: 'activityInfoId',
          type: 'select_one',
          head: 'Record ID',
          renderQuick: ({recordId}) => recordId,
        },
        // @ts-expect-error
        ...columns.map(({key, type}) => {
          return {
            head: key,
            id: key,
            type: type,
            renderQuick: ({activity}: any) => activity[key],
          }
        }),
      ]}
    />
  )
}

export {AiTable}
