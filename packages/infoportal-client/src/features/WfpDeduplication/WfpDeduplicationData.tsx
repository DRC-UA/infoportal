import {useEffect, type FC} from 'react'
import {match} from '@axanc/ts-utils'
import {useTheme} from '@mui/material'
import {Deduplication} from '@prisma/client'
import {toDate} from 'date-fns'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

export const DeduplicationStatusIcon = ({status}: {status: Deduplication}) => {
  return match(status)
    .cases({
      [Deduplication.Eligible]: <TableIcon color="success" children="check_circle" sx={{mr: 1}} />,
      [Deduplication.Deduplicated]: <TableIcon color="error" children="join_full" sx={{mr: 1}} />,
    })
    .default(null)
}

export const WfpDeduplicationData: FC<{rerender: boolean}> = ({rerender}) => {
  const {api} = useAppSettings()
  const _search = useFetcher(api.wfpDeduplication.search)
  const {formatLargeNumber} = useI18n()
  const {m, formatDate, formatDateTime} = useI18n()
  const theme = useTheme()

  useEffect(() => {
    _search.fetch()
  }, [rerender])

  return (
    <Page width="full">
      <Panel>
        <Datatable
          id="wfp"
          showExportBtn
          title={'wfp-deduplication-' + formatDate(new Date())}
          loading={_search.loading}
          rowStyle={({deduplicationType, result}) => ({
            ...(deduplicationType !== null && {opacity: 0.5}),
            ...(result === 'Deduplicated - see deduplication report.' && {color: theme.palette.error.main}),
          })}
          columns={[
            {
              id: 'status',
              type: 'select_one',
              head: m.status,
              align: 'center',
              render: ({status}) => ({
                label: status && <DeduplicationStatusIcon status={status} />,
                value: (status ?? undefined) as string | undefined,
              }),
            },
            {
              id: 'uploadedAt',
              type: 'date',
              head: m.uploadedAt,
              render: ({uploadedAt}) => {
                return {
                  label: uploadedAt && formatDateTime(toDate(uploadedAt)),
                  value: (uploadedAt && toDate(uploadedAt)) || undefined,
                }
              },
            },
            {
              id: 'batchId',
              type: 'string',
              head: m.batchId,
              renderQuick: ({batchId}) => batchId,
            },
            {
              id: 'fileName',
              type: 'string',
              head: m.fileName,
              renderQuick: ({fileName}) => fileName,
            },
            {
              id: 'drcOffice',
              type: 'select_one',
              head: m.drcOffice,
              render: ({drcOffice}) => {
                return {
                  label: drcOffice,
                  value: drcOffice,
                  tooltip: drcOffice,
                }
              },
            },
            {
              id: 'category',
              type: 'select_one',
              head: m.category,
              renderQuick: ({category}) => category,
            },
            {
              id: 'taxId',
              head: m.taxID,
              type: 'string',
              renderQuick: ({taxId}) => taxId,
            },
            {
              id: 'amount',
              type: 'number',
              head: m.amount,
              align: 'right',
              render: ({amount}) => {
                return {
                  label: formatLargeNumber(amount),
                  value: amount,
                }
              },
            },
            {
              id: 'currency',
              type: 'select_one',
              head: m.currency,
              renderQuick: ({currency}) => currency,
            },
            {
              id: 'result',
              type: 'string',
              head: m.result,
              renderQuick: ({result}) => result ?? undefined,
            },
            {
              id: 'organisation',
              type: 'select_one',
              head: m.organisation,
              renderQuick: ({organisation}) => organisation,
            },
            {
              id: 'deduplicationType',
              type: 'select_one',
              head: m.deduplicationType,
              renderQuick: ({deduplicationType}) => deduplicationType ?? undefined,
            },
            {
              id: 'reason',
              head: m.reason,
              type: 'select_one',
              renderQuick: ({reason}) => reason ?? undefined,
            },
            {
              id: 'startDate',
              head: m.startDate,
              type: 'string',
              renderQuick: ({startDate}) => startDate,
            },
            {
              id: 'endDate',
              head: m.endDate,
              type: 'string',
              renderQuick: ({endDate}) => endDate,
            },
          ]}
          data={_search.get?.data}
        />
      </Panel>
    </Page>
  )
}
