import {useEffect} from 'react'
import {match} from '@axanc/ts-utils'
import {format} from 'date-fns'

import {WfpDeduplicationStatus} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {Datatable} from '@/shared/Datatable/Datatable'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

export const DeduplicationStatusIcon = ({status}: {status: WfpDeduplicationStatus}) => {
  return match(status)
    .cases({
      Deduplicated: <TableIcon color="warning" children="join_full" />,
      PartiallyDeduplicated: <TableIcon color="info" children="join_left" />,
      NotDeduplicated: <TableIcon color="success" children="check_circle" />,
      Error: <TableIcon color="error" children="error" />,
    })
    .default(null)
}

export const WfpDeduplicationData = () => {
  const {api} = useAppSettings()
  const _search = useFetcher(api.wfpDeduplication.search)
  const {formatLargeNumber} = useI18n()
  const {m} = useI18n()

  useEffect(() => {
    _search.fetch()
  }, [])

  return (
    <Page width="full">
      <Panel>
        <Datatable
          id="wfp"
          showExportBtn
          title={'wfp-deduplication-' + format(new Date(), 'yyyy-MM-dd')}
          loading={_search.loading}
          rowStyle={({result}) => ({opacity: result === 'Success - loaded' ? 1 : 0.5})}
          columns={[
            {
              id: 'batchId',
              type: 'string',
              head: 'Batch ID',
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
              head: 'Currency',
              renderQuick: ({currency}) => currency,
            },
            {
              id: 'result',
              type: 'string',
              head: 'Result',
              renderQuick: ({result}) => result ?? undefined,
            },
            {
              id: 'organisation',
              type: 'select_one',
              head: 'Organisation',
              renderQuick: ({organisation}) => organisation,
            },
            {
              id: 'deduplicationType',
              type: 'select_one',
              head: 'Deduplication Type',
              renderQuick: ({deduplicationType}) => deduplicationType ?? undefined,
            },
            {
              id: 'reason',
              head: 'Reason',
              type: 'string',
              renderQuick: ({reason}) => reason ?? undefined,
            },
            {
              id: 'startDate',
              head: 'Start Date',
              type: 'string',
              renderQuick: ({startDate}) => startDate,
            },
            {
              id: 'endDate',
              head: 'End Date',
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
