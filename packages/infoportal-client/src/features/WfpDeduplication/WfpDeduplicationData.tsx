import {useEffect, useMemo} from 'react'
import {match, Obj, seq} from '@axanc/ts-utils'
import {format} from 'date-fns'

import {DrcOffice, WfpDeduplicationStatus} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useI18n} from '@/core/i18n'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {Datatable} from '@/shared/Datatable/Datatable'
import type {DatatableOptions} from '@/shared/Datatable/util/datatableType'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {useFetcher} from '@/shared/hook/useFetcher'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'
import {Txt} from '@/shared/Txt'

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
  const {formatDate, formatDateTime, formatLargeNumber} = useI18n()
  const {m} = useI18n()
  const getOfficeOptions = (): DatatableOptions[] => Obj.values(DrcOffice).map((value) => ({label: value, value}))
  const getStatusOptions = (): DatatableOptions[] => DatatableUtils.buildOptions(Obj.keys(WfpDeduplicationStatus), true)

  const {existingOrga, taxIdCounter} = useMemo(() => {
    if (!_search.get) return {}
    const data = seq(_search.get.data)
    return {
      taxIdCounter: data.groupByAndApply(
        ({taxId}) => taxId ?? '',
        (group) => group.length,
      ),
      existingOrga: data
        .map(({existingOrga}) => existingOrga)
        .distinct((organisation) => organisation)
        .compact()
        .map(DatatableUtils.buildOption),
    }
  }, [_search.get])

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
          columns={[
            {
              id: 'fileName',
              head: m.fileName,
              renderQuick: ({fileName}) => fileName,
              type: 'string',
            },
            {
              id: 'createdAt',
              head: m.createdAt,
              render: ({createdAt}) => {
                return {
                  label: formatDate(createdAt),
                  value: createdAt,
                  tooltip: formatDateTime(createdAt),
                }
              },
              type: 'date',
            },
            {
              id: 'office',
              head: m.office,
              renderQuick: ({office}) => office,
              type: 'select_one',
              options: getOfficeOptions,
            },
            {
              type: 'select_one',
              id: 'category',
              head: m.category,
              renderQuick: ({category}) => category,
            },
            {
              id: 'beneficiaryId',
              head: 'Beneficiary Id',
              renderQuick: ({beneficiaryId}) => beneficiaryId,
              type: 'string',
            },
            {
              id: 'taxId',
              head: m.taxID,
              type: 'string',
              render: ({taxId}) => {
                return {
                  value: taxId,
                  label: taxId ?? <Txt color="error">{m.mpca.uploadWfpTaxIdMapping}</Txt>,
                }
              },
            },
            {
              id: 'taxIdOccurrences',
              head: m.taxIdOccurrences,
              type: 'number',
              renderQuick: ({taxId}) => taxIdCounter?.[taxId!] ?? 0,
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
              id: 'validFrom',
              head: m.validFrom,
              type: 'date',
              render: ({validFrom}) => {
                return {
                  label: formatDate(validFrom),
                  value: validFrom,
                }
              },
            },
            {
              id: 'expiry',
              head: m.expiry,
              type: 'date',
              render: ({expiry}) => {
                return {
                  label: formatDate(expiry),
                  value: expiry,
                }
              },
            },
            {
              id: 'suggestion',
              head: m.suggestion,
              renderQuick: ({suggestion}) => m.mpca.drcSupportSuggestion[suggestion],
              width: 246,
              type: 'select_one',
              // options: () => Obj.keys(DrcSupportSuggestion).map(_ => ({label: m.mpca.drcSupportSuggestion[_], value: _})),
            },
            {
              id: 'suggestionDuration',
              head: m.mpca.suggestionDurationInMonths,
              type: 'number',
              render: ({suggestionDurationInMonths}) => {
                return {
                  value: suggestionDurationInMonths,
                  label: `${suggestionDurationInMonths} ${m.months}`,
                }
              },
            },
            {
              id: 'status',
              align: 'center',
              head: m.status,
              width: 0,
              type: 'select_one',
              options: getStatusOptions,
              render: ({status}) => {
                return {
                  tooltip: m.mpca.status[status],
                  label: <DeduplicationStatusIcon status={status} />,
                  value: status ?? DatatableUtils.blank,
                }
              },
            },
            {
              id: 'existingOrga',
              head: m.mpca.existingOrga,
              renderQuick: ({existingOrga}) => existingOrga,
              options: existingOrga ? () => existingOrga : undefined,
              type: 'select_one',
            },
            {
              id: 'existingAmount',
              head: m.mpca.existingAmount,
              render: ({existingAmount}) => {
                return {
                  label: existingAmount && formatLargeNumber(existingAmount),
                  value: existingAmount,
                }
              },
              type: 'number',
            },
            {
              id: 'existingStart',
              head: m.mpca.existingStart,
              render: ({existingStart}) => {
                return {
                  label: existingStart && formatDate(existingStart),
                  value: existingStart,
                }
              },
              type: 'date',
            },
            {
              id: 'existingEnd',
              head: m.mpca.existingEnd,
              render: ({existingEnd}) => {
                return {
                  label: existingEnd && formatDate(existingEnd),
                  value: existingEnd,
                }
              },
              type: 'date',
            },
          ]}
          data={_search.get?.data}
        />
      </Panel>
    </Page>
  )
}
