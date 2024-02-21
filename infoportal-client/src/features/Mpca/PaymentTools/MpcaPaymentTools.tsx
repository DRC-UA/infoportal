import {Page} from '@/shared/Page'
import {useMpcaContext} from '../MpcaContext'
import {useEffect} from 'react'
import {Sheet} from '@/shared/Sheet/Sheet'
import {Panel, PanelTitle} from '@/shared/Panel'
import {useI18n} from '../../../core/i18n'
import {Txt} from 'mui-extension'
import {useNavigate} from 'react-router'
import {mpcaIndex} from '../Mpca'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'

export const MpcaPaymentTools = () => {
  const {m, formatDate, formatLargeNumber} = useI18n()
  const {_getPayments} = useMpcaContext()
  const navigate = useNavigate()

  useEffect(() => {
    _getPayments.fetch()
  }, [])

  return (
    <Page>
      <Panel>
        <Sheet
          id="mpca-payments"
          header={<PanelTitle>{m.mpca.paymentTools}</PanelTitle>}
          data={_getPayments.get}
          loading={_getPayments.loading}
          columns={[
            {
              id: 'createdAt',
              head: m.createdAt,
              render: _ => (
                formatDate(_.createdAt)
              )
            },
            {
              id: 'budgetLineMPCA',
              head: m.mpca.budgetLineMPCA,
              render: _ => _.budgetLineMPCA
            },
            {
              id: 'budgetLineCFR',
              head: m.mpca.budgetLineCFR,
              render: _ => _.budgetLineCFR
            },
            {
              id: 'budgetLineStartUp',
              head: m.mpca.budgetLineStartUp,
              render: _ => _.budgetLineStartUp
            },
            {
              id: 'hoo',
              head: m.mpca.headOfOperations,
              render: _ => _.headOfOperation,
            },
            {
              id: 'hoo',
              head: m.mpca.financeAndAdministrationOfficer,
              render: _ => _.financeAndAdministrationOfficer,
            },
            {
              id: 'hoo',
              head: m.mpca.cashAndVoucherAssistanceAssistant,
              render: _ => _.cashAndVoucherAssistanceAssistant,
            },
            {
              id: 'kobo',
              head: 'Kobo',
              align: 'right',
              render: _ => (
                <Txt link bold>{_.answers?.length}</Txt>
              )
            },
            {
              id: 'actions',
              head: '',
              align: 'right',
              onClick: _ => navigate(mpcaIndex.siteMap.paymentTool(_.id)),
              render: _ => (
                <TableIcon>chevron_right</TableIcon>
              )
            }
          ]}/>
      </Panel>
    </Page>
  )
}