import React, {useMemo, useState} from 'react'
import {Page} from '@/shared/Page'
import {IpInput} from '@/shared/Input/Input'
import {format, getDaysInMonth, parse, subMonths} from 'date-fns'
import {mapFor} from '@alexandreannic/ts-utils'

enum Status {
  AM = 'AM',
  PM = 'PM',
  N = 'N',
  OFF = 'OFF',
}

const SafetyPage = () => {
  const [period, setPeriod] = useState(format(subMonths(new Date(), 1), 'yyyy-MM'))
  const persons = [
    'Yana',
    'Denys',
    'Bohdan',
    'Volodymyr',
    'Stanislav',
  ]

  const dayInMonth = getDaysInMonth(parse(period, 'yyyy-MM', new Date()))

  const data = useMemo(() => {
    const res: Record<string, Status>[] = []
    const dayInMonth = getDaysInMonth(parse(period, 'yyyy-MM', new Date()))
    // for (let i = 0; i < length - 1; i++) {
    //   persons.forEach(p => {
    //     if (!res[i]) res[i] = {}
    //
    //   })
    // }

  }, [persons, period])

  return (
    <Page>
      {period} --
      {+period.split('-')![1] - 1}
      --
      {dayInMonth}
      <IpInput
        type="month"
        sx={{width: 200, mr: 1}}
        value={period}
        onChange={_ => setPeriod(_.target.value)}
      />

      <table className="table borderY">
        <thead>
        <tr>
          <td></td>
          {mapFor(dayInMonth, i => <td key={i}>{i + 1}</td>)}
        </tr>
        </thead>
        <tbody>
        {persons.map(p =>
          <tr key={p}>
            <td>{p}</td>
            {mapFor(dayInMonth, i => <td key={i}>{i}</td>)}
          </tr>
        )}
        </tbody>
      </table>


    </Page>
  )
}

export default SafetyPage