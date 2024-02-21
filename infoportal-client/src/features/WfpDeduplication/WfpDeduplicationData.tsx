import {Page} from '@/shared/Page'
import {useAppSettings} from '@/core/context/ConfigContext'
import {Sheet} from '@/shared/Sheet/Sheet'
import React, {useEffect, useMemo} from 'react'
import {useI18n} from '@/core/i18n'
import {Panel} from '@/shared/Panel'
import {WfpDeduplicationStatus} from '@/core/sdk/server/wfpDeduplication/WfpDeduplication'
import {Enum, fnSwitch, seq} from '@alexandreannic/ts-utils'
import {Txt} from 'mui-extension'
import {DrcOffice} from '@infoportal-common'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {format} from 'date-fns'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {useFetcher} from '@/shared/hook/useFetcher'

export const DeduplicationStatusIcon = ({status}: {status: WfpDeduplicationStatus}) => {
  return fnSwitch(status, {
    Deduplicated: <TableIcon color="warning" children="join_full"/>,
    PartiallyDeduplicated: <TableIcon color="info" children="join_left"/>,
    NotDeduplicated: <TableIcon color="success" children="check_circle"/>,
    Error: <TableIcon color="error" children="error"/>,
  }, () => <></>)
}

export const WfpDeduplicationData = () => {
  const {api} = useAppSettings()
  const _search = useFetcher(api.wfpDeduplication.search)
  const {formatDate, formatLargeNumber} = useI18n()
  const {m} = useI18n()

  const existingOrga = useMemo(() => {
    if (!_search.get) return
    return seq(_search.get.data)
      .map(_ => _.existingOrga)
      .distinct(_ => _)
      .compact()
      .map(SheetUtils.buildOption)
  }, [_search.get])

  useEffect(() => {
    _search.fetch()
  }, [])

  return (
    <Page width="full">
      <Panel>
        <Sheet
          id="wfp"
          showExportBtn
          title={'wfp-deduplication-' + format(new Date(), 'yyyy-MM-dd')}
          loading={_search.loading}
          columns={[
            {
              id: 'fileName',
              head: m.fileName,
              renderExport: true,
              render: _ => _.fileName,
              type: 'string',
            },
            {
              id: 'createdAt',
              head: m.createdAt,
              renderExport: true,
              render: _ => formatDate(_.createdAt),
              renderValue: _ => _.createdAt,
              type: 'date'
            },
            {
              id: 'office',
              head: m.office,
              renderExport: true,
              render: _ => _.office,
              type: 'select_one',
              options: () => Enum.values(DrcOffice).map(_ => ({label: _, value: _}))
            },
            // {
            //   id: 'beneficiaryId',
            //   head: 'beneficiaryId',
            //   renderExport: true,
            //   render: _ => _.beneficiaryId, type: 'string'
            // },
            {
              id: 'taxId',
              head: m.taxID,
              renderExport: true,
              render: _ => _.taxId ?? <Txt color="error">{m.mpca.uploadWfpTaxIdMapping}</Txt>,
              type: 'string',
            },
            {
              id: 'amount',
              type: 'number',
              head: m.amount,
              align: 'right',
              renderExport: true,
              render: _ => formatLargeNumber(_.amount)
            },
            {
              id: 'validFrom',
              head: m.validFrom,
              type: 'date',
              renderExport: true,
              render: _ => formatDate(_.validFrom)
            },
            {
              id: 'expiry',
              head: m.expiry,
              renderExport: true,
              type: 'date',
              render: _ => formatDate(_.expiry)
            },
            {
              id: 'suggestion',
              head: m.suggestion,
              renderExport: true,
              render: _ => m.mpca.drcSupportSuggestion[_.suggestion],
              renderValue: _ => m.mpca.drcSupportSuggestion[_.suggestion] ?? SheetUtils.blank,
              width: 246,
              type: 'select_one',
              // options: () => Enum.keys(DrcSupportSuggestion).map(_ => ({label: m.mpca.drcSupportSuggestion[_], value: _})),
            },
            {
              id: 'status',
              align: 'center',
              head: m.status,
              width: 0,
              type: 'select_one',
              options: () => SheetUtils.buildOptions(Enum.keys(WfpDeduplicationStatus), true),
              tooltip: _ => m.mpca.status[_.status],
              renderExport: false,
              render: _ => <DeduplicationStatusIcon status={_.status}/>,
              renderValue: _ => _.status ?? SheetUtils.blank,
            },
            {
              id: 'existingOrga',
              head: m.mpca.existingOrga,
              renderExport: true,
              render: _ => _.existingOrga,
              options: existingOrga ? (() => existingOrga) : undefined,
              type: 'select_one',
            },
            {
              id: 'existingAmount',
              head: m.mpca.existingAmount,
              align: 'right', renderExport: true,
              render: _ => _.existingAmount && formatLargeNumber(_.existingAmount),
              type: 'number',
            },
            {
              id: 'existingStart',
              head: m.mpca.existingStart,
              renderExport: true,
              render: _ => _.existingStart && formatDate(_.existingStart),
              type: 'date',
            },
            {
              id: 'existingEnd',
              head: m.mpca.existingEnd,
              renderExport: true,
              render: _ => _.existingEnd && formatDate(_.existingEnd),
              type: 'date',
            },
          ]}
          data={_search.get?.data}
        />
      </Panel>
    </Page>
  )
}