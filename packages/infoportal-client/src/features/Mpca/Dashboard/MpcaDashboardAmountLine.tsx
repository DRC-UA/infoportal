import {format} from 'date-fns'
import {Obj, Seq, seq} from '@alexandreannic/ts-utils'
import {ChartLine} from '@/shared/charts/ChartLine'
import {Lazy} from '@/shared/Lazy'
import React from 'react'
import {MpcaEntity} from 'infoportal-common'
import {useI18n} from '@/core/i18n'

export const MpcaDashboardAmountLine = ({
  data,
  getAmount,
}: {
  data: Seq<MpcaEntity>
  getAmount: (d: MpcaEntity) => number | undefined
}) => {
  const {m} = useI18n()
  return (
    <Lazy
      deps={[data, getAmount]}
      fn={() => {
        const gb = data.groupBy((d) => format(d.date, 'yyyy-MM'))
        return new Obj(gb)
          .map((k, v) => [
            k,
            {
              count: v.length,
              amount: seq(v).sum((_) => getAmount(_) ?? 0),
            },
          ])
          .sort(([ka], [kb]) => ka.localeCompare(kb))
          .entries()
          .map(([k, v]) => ({name: k, [m.submissionTime]: v.count, [m.amount]: v.amount}))
      }}
    >
      {(_) => <ChartLine fixMissingMonths hideYTicks height={200} data={_ as any} hideLabelToggle distinctYAxis />}
    </Lazy>
  )
}
