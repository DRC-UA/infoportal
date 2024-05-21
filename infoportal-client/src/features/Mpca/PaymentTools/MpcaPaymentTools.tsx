import {Page} from '@/shared/Page'
import {useMpcaContext} from '../MpcaContext'
import {useEffect} from 'react'
import {Panel, PanelTitle} from '@/shared/Panel'
import {useI18n} from '../../../core/i18n'
import {Txt} from 'mui-extension'
import {useNavigate} from 'react-router'
import {mpcaIndex} from '../Mpca'
import {TableIcon} from '@/features/Mpca/MpcaData/TableIcon'
import {Datatable} from '@/shared/Datatable/Datatable'

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
        <Datatable
          id="mpca-payments"
          header={<PanelTitle>{m.mpca.paymentTools}</PanelTitle>}
          data={_getPayments.get}
          loading={_getPayments.loading}
          columns={[
            {
              id: 'createdAt',
              head: m.createdAt,
              renderQuick: _ => formatDate(_.createdAt)
            },
            {
              id: 'budgetLineMPCA',
              head: m.mpca.budgetLineMPCA,
              renderQuick: _ => _.budgetLineMPCA
            },
            {
              id: 'budgetLineCFR',
              head: m.mpca.budgetLineCFR,
              renderQuick: _ => _.budgetLineCFR
            },
            {
              id: 'budgetLineStartUp',
              head: m.mpca.budgetLineStartUp,
              renderQuick: _ => _.budgetLineStartUp
            },
            {
              id: 'hoo',
              head: m.mpca.headOfOperations,
              renderQuick: _ => _.headOfOperation,
            },
            {
              id: 'hoo',
              head: m.mpca.financeAndAdministrationOfficer,
              renderQuick: _ => _.financeAndAdministrationOfficer,
            },
            {
              id: 'hoo',
              head: m.mpca.cashAndVoucherAssistanceAssistant,
              renderQuick: _ => _.cashAndVoucherAssistanceAssistant,
            },
            {
              id: 'kobo',
              head: 'Kobo',
              align: 'right',
              renderQuick: _ => <Txt link bold>{_.answers?.length}</Txt>
            },
            {
              id: 'actions',
              head: '',
              align: 'right',
              onClick: _ => navigate(mpcaIndex.siteMap.paymentTool(_.id)),
              renderQuick: _ => <TableIcon>chevron_right</TableIcon>
            }
          ]}/>
      </Panel>
    </Page>
  )
}