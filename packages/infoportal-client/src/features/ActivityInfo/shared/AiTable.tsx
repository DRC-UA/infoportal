import type {FC} from 'react'
import {seq} from '@axanc/ts-utils'
import {Box, useTheme} from '@mui/material'
import {endOfMonth} from 'date-fns'

import {KoboIndex, type IKoboMeta} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {useSession} from '@/core/Session/SessionContext'
import {useIpToast} from '@/core/useToast'
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
  const theme = useTheme()

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
            value={[period.start, period.end]}
            onChange={([start, end]) => setPeriod({start, end})}
            fullWidth={false}
            max={endOfMonth(new Date())}
          />
          {session.admin && (
            <IpBtn
              icon="send"
              variant="contained"
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
          type: 'string',
          head: m.koboId,
          typeIcon: <DatatableHeadIconByType type="id" />,
          className: 'td-id',
          renderQuick: ({data}) => deduplicateKoboIds(data).join(' '),
        },
        {
          id: 'activityInfoId',
          type: 'select_one',
          head: 'Record ID',
          style: () => ({borderRight: '3px solid ' + theme.palette.divider}),
          styleHead: {borderRight: '3px solid ' + theme.palette.divider},
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
