import {useMemo} from 'react'

interface Type {
  <T, D extends any>(_: {
    deps: D[]
    fn: (_: D) => T
    children: (..._: T[]) => any
  }): any
}

export const Lazy: Type = ({
  deps,
  fn,
  children,
}) => {
  const res = useMemo(() => deps.map(fn), deps)
  return children(...res)
}