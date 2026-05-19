import type {FC} from 'react'

import {DrcProgram, DrcSector} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'
import {Page} from '@/shared'

import {protectionMapperMaker} from './utils'

const Legal: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher({
    sectors: [DrcSector.Legal],
    activities: [
      DrcProgram.LegalAssistanceHlp,
      DrcProgram.LegalAssistanceHlpDocs,
      DrcProgram.LegalAssistanceCivil,
      DrcProgram.LegalAssistanceCivilDocs,
      DrcProgram.LegalCounselling,
    ],
    mapper: protectionMapperMaker('drclegal'),
  })

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {Legal}
