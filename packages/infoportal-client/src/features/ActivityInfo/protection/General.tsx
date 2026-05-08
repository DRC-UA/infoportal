import type {FC} from 'react'

import {DrcProgram, DrcSector} from 'infoportal-common'

import {AiTable, useMetaFetcher} from '@/features/ActivityInfo/shared'

import {mapGeneralProtection} from './utils'
import {Page} from '@/shared'

const General: FC = () => {
  const {fetcher, data, columns, period, setPeriod} = useMetaFetcher({
    sectors: [DrcSector.GeneralProtection],
    activities: [
      DrcProgram.AwarenessRaisingSession,
      DrcProgram.CommunityLevelPm,
      DrcProgram.Counselling,
      DrcProgram.MHPSSActivities,
      DrcProgram.PGS,
      DrcProgram.ProtectionMonitoring,
      DrcProgram.ProtectionAccompaniment,
      DrcProgram.Referral,
    ],
    mapper: mapGeneralProtection,
  })

  return (
    <Page loading={fetcher.loading} width="full">
      <AiTable {...{data, columns, period, setPeriod}} />
    </Page>
  )
}

export {General}
