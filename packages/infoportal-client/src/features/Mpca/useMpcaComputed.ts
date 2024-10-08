import {Obj, Seq} from '@alexandreannic/ts-utils'
import {useMemo} from 'react'
import {DrcSupportSuggestion, MpcaEntity} from 'infoportal-common'

export type UseMpcaComputed = ReturnType<typeof useMpcaComputed>

export const useMpcaComputed = ({
  data,
}: {
  data: Seq<MpcaEntity>
}) => useMemo(() => {
  // const flatData = data.flatM()
  const deduplications = data.map(_ => _.deduplication).compact()
  return {
    // flatData,
    persons: data.flatMap(_ => _.persons).compact(),
    deduplications,
    preventedAssistance: deduplications.filter(_ => [
      DrcSupportSuggestion.NoAssistanceFullDuplication,
      DrcSupportSuggestion.NoAssistanceExactSameTimeframe,
      DrcSupportSuggestion.NoAssistanceDrcDuplication,
    ].includes(_.suggestion)),
    multipleTimeAssisted: (() => {
      const grouped = data.filter(_ => [
          DrcSupportSuggestion.FullNoDuplication,
          DrcSupportSuggestion.FullNoDuplication,
          undefined
        ].includes(_.deduplication?.suggestion)
      ).groupBy(_ => _.taxId!)
      return new Obj(grouped)
        .map((k, v) => [k, v.length])
        .filter((k, v) => v > 1)
        .get()
    })(),
  }
}, [data])
