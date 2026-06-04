import {Obj, Seq} from '@axanc/ts-utils'
import {useMemo} from 'react'
import {MpcaEntity} from 'infoportal-common'

export type UseMpcaComputed = ReturnType<typeof useMpcaComputed>

export const useMpcaComputed = ({data}: {data: Seq<MpcaEntity>}) =>
  useMemo(() => {
    // const flatData = data.flatM()
    const deduplications = data.map((_) => _.deduplication).compact()
    return {
      // flatData,
      persons: data.flatMap((_) => _.persons).compact(),
      deduplications,
      preventedAssistance: deduplications.filter(({reason}) => Boolean(reason)),
      multipleTimeAssisted: (() => {
        const grouped = data
          .filter(({deduplication}) => deduplication?.reason === undefined)
          .groupBy(({taxId}) => taxId!)
        return new Obj(grouped)
          .map((k, v) => [k, v.length])
          .filter((k, v) => v > 1)
          .get()
      })(),
    }
  }, [data])
