import {PartnershipData} from '@/features/Partnership/PartnershipType'
import {useMemo} from 'react'
import {Seq} from '@alexandreannic/ts-utils'

export const usePartnershipDashboard = ({data}: {data: Seq<PartnershipData>}) => {
  return useMemo(() => {
    const ongoingGrant = data.filter((_) => _.Is_there_an_ongoing_relationsh === 'ongoing_grant')
    return {
      ongoingGrant,
      oblastIso: data.flatMap((_) => _.oblastIso).compact(),
    }
  }, [data])
}
