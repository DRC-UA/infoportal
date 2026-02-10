import {BoxProps} from '@mui/material'

import {Datatable} from '@/shared/Datatable/Datatable'
import {DatatableHeadIconByType} from '@/shared/Datatable/DatatableHead'

export const AnswerTable = <T extends Record<string, any>>({
  answers,
  koboKey,
  ...props
}: {
  koboKey?: string
  answers: T[]
} & BoxProps) => {
  return (
    <Datatable<T>
      id="answer-table"
      title=""
      {...props}
      data={answers}
      columns={[
        ...(koboKey
          ? [
              {
                id: 'Id',
                head: 'ID',
                typeIcon: <DatatableHeadIconByType type="id" />,
                className: 'td-id',
                type: 'id' as const,
                renderQuick: (_: any) => _[koboKey],
              },
            ]
          : []),
        ...Object.keys(answers?.[0] ?? {})
          .filter((k) => !koboKey || koboKey !== k)
          .map((k) => ({
            id: k,
            type: 'select_one' as const,
            head: k,
            renderQuick: (_: any) => {
              return typeof _[k] === 'object' ? JSON.stringify(_[k]) : _[k]
            },
          })),
      ]}
    />
  )
}
