import {Enum, Seq} from '@alexandreannic/ts-utils'
import {useMemo} from 'react'
import {DrcSupportSuggestion} from '@/core/sdk/server/wfpDeduplication/WfpDeduplication'
import {MpcaEntity} from '@/core/sdk/server/mpca/MpcaEntity'

export type UseBNREComputed = ReturnType<typeof useBNREComputed>

export const useBNREComputed = ({
  data,
}: {
  data?: Seq<MpcaEntity> | undefined
}) => useMemo(() => {
  if (!data) return
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
          DrcSupportSuggestion.ThreeMonthsNoDuplication,
          DrcSupportSuggestion.ThreeMonthsUnAgency,
          undefined
        ].includes(_.deduplication?.suggestion)
      ).groupBy(_ => _.taxId!)
      return new Enum(grouped)
        .transform((k, v) => [k, v.length])
        .filter((k, v) => v > 1)
        .get()
    })(),
    // ageGroup: chain(flatData.filter(_ => _?.hh_char_hh_det_age !== undefined).groupBy(_ => Person.groupByAgeGroup()(_, p => +p?.hh_char_hh_det_age!)))
    //   .map(_ => Enum.entries(_).map(([group, v]) => ({
    //       key: group,
    //       Male: v.filter(_ => _.hh_char_hh_det_gender === 'male').length,
    //       Female: v.filter(_ => _.hh_char_hh_det_gender === 'female').length,
    //       Other: v.filter(_ => _.hh_char_hh_det_gender === undefined).length,
    //     })
    //   ))
    //   .map(_ => _.sort((a, b) => Object.keys(Person.ageGroup.DRC).indexOf(b.key) - Object.keys(Person.ageGroup.DRC).indexOf(a.key)))
    //   .get
    // ,
  }
}, [data])
