import {BoxProps} from '@mui/material'
import React from 'react'
import {Sheet} from '@/shared/Sheet/Sheet'

/** @deprecated*/
export const AnswerTable = <T extends Record<string, any>, >({
  answers,
  ...props
}: {
  answers: T[]
} & BoxProps) => {
  return (
    <Sheet<T>
      id="answer-table"
      title=""
      {...props}
      data={answers}
      columns={Object.keys(answers?.[0] ?? {}).map(k => ({
        id: k,
        head: k,
        render: _ => {
          return typeof _[k] === 'object' ? JSON.stringify(_[k]) : _[k]
        },
      }))}
    />
  )
}
