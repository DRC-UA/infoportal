import {useState, useEffect, type FC} from 'react'
import {Paper, Table, TableContainer, useTheme} from '@mui/material'

import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {Page} from '@/shared'

import {EchoTableBody, EchoTableHead} from './components'
import {gbvWgssPdmMapper, prepareTableData} from './tools'
import type {EchoPmKoiTableData} from './types'

const EchoPmKoi: FC = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<EchoPmKoiTableData>()
  const {byName} = useKoboAnswersContext()
  const dataSetter = (inputData: EchoPmKoiTableData) => setData(inputData)
  const stopLoadingIndication = () => setLoading(false)
  const theme = useTheme()

  useEffect(() => {
    Promise.all([byName('gbv_wgssPdm').fetch()])
      .then(([gbvWgssPdmData]) => [...gbvWgssPdmMapper(gbvWgssPdmData)])
      .then(prepareTableData)
      .then(dataSetter)
      .finally(stopLoadingIndication)
  }, [])

  return (
    <Page width="full" loading={loading} paddingInline={2}>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 'calc(100vh - 62px)',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table
          aria-label="ECHO PM KOI Table"
          stickyHeader
          sx={{
            th: {whiteSpace: 'nowrap'},
            td: {textAlign: 'right'},
            'thead th': {textAlign: 'center'},
            'thead th+th': {borderLeft: `1px solid ${theme.palette.divider}`},
            'thead tr:first-of-type th': {textTransform: 'uppercase'},
            'thead tr:last-of-type th': {textAlign: 'right'},
            'tbody tr:last-of-type th': {borderBottom: 'none'},
            'tbody tr:last-of-type td': {borderBottom: 'none'},
            'tbody td': {borderLeft: `1px solid ${theme.palette.divider}`},
          }}
        >
          <EchoTableHead />
          <EchoTableBody {...data} />
        </Table>
      </TableContainer>
    </Page>
  )
}

export default EchoPmKoi
