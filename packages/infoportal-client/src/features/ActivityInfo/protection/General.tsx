import type {FC} from 'react'

import {DrcProgram} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'

import {mapGeneralProtection} from './utils'
import {Page} from '@/shared'

const General: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher(
    [
      DrcProgram.CommunityLevelPm,
      DrcProgram.Counselling,
      DrcProgram.MHPSSActivities,
      DrcProgram.PGS,
      DrcProgram.ProtectionMonitoring,
      DrcProgram.ProtectionAccompaniment,
      DrcProgram.Referral,
    ],
    mapGeneralProtection,
  )

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod, loading: false}} />
    </Page>
  )
}

export {General}
