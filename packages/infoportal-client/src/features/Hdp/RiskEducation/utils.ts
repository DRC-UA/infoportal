import type {Seq} from '@axanc/ts-utils'

import type {RiskEducationDirectSession} from 'infoportal-common'

const riskEdicationMapper = (data: Seq<RiskEducationDirectSession>) => {
  return data.map((session) => ({
    ...session,
    oblast: session.admin1_name_en,
    raion: session.admin2_name_en,
    hromada: session.admin3_name_en,
    settlement: session.admin4_name_en,
  }))
}

export {riskEdicationMapper}
