import {useState} from 'react'

export type UseDatabaseGroupDisplay = ReturnType<typeof useDatabaseGroupDisplay>

export const useDatabaseGroupDisplay = (defaultRepeatedQuestion: string) => {
  const [repeatAs, setRepeatAs] = useState<null | 'rows' | 'columns'>(null)
  const [repeatedQuestion, setRepeatedQuestion] = useState<undefined | string>(defaultRepeatedQuestion)

  return {
    repeatAs,
    repeatedQuestion,
    setRepeatAs,
    setRepeatedQuestion,
  }
}