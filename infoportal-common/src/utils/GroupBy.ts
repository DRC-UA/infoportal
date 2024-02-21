import {Enum, Seq, seq} from '@alexandreannic/ts-utils'

type GroupByKey = string | number | symbol

export const groupBy: {
  <T extends Record<GroupByKey, any>, A extends GroupByKey, R extends any>(_: {
    data: T[],
    groups: [
      {by: ((_: T) => A), sort?: (a: A, b: A) => number}
    ],
    finalTransform: (_: Seq<T>, groups: [A]) => R
  }): Record<A, R>

  <T extends Record<GroupByKey, any>, A extends GroupByKey, B extends GroupByKey, R extends any>(_: {
    data: T[],
    groups: [
      {by: ((_: T) => A), sort?: (a: A, b: A) => number},
      {by: ((_: T) => B), sort?: (a: B, b: B) => number}
    ],
    finalTransform: (_: Seq<T>, groups: [A, B]) => R
  }): Record<A, Record<B, R>>

  <T extends Record<GroupByKey, any>, A extends GroupByKey, B extends GroupByKey, C extends GroupByKey, R extends any>(_: {
    data: T[],
    groups: [
      {by: ((_: T) => A), sort?: (a: A, b: A) => number},
      {by: ((_: T) => B), sort?: (a: B, b: B) => number},
      {by: ((_: T) => C), sort?: (a: C, b: C) => number},
    ],
    finalTransform: (_: Seq<T>, groups: [A, B, C]) => R
  }): Record<A, Record<B, Record<C, R>>>

  <T extends Record<GroupByKey, any>, A extends GroupByKey, B extends GroupByKey, C extends GroupByKey, D extends GroupByKey, R extends any>(_: {
    data: T[],
    groups: [
      {by: ((_: T) => A), sort?: (a: A, b: A) => number},
      {by: ((_: T, groups: [A]) => B), sort?: (a: B, b: B) => number},
      {by: ((_: T, groups: [A, B]) => C), sort?: (a: C, b: C) => number},
      {by: ((_: T, groups: [A, B, C]) => D), sort?: (a: D, b: D) => number},
    ],
    finalTransform: (_: Seq<T>, groups: [A, B, C, D]) => R
  }): Record<A, Record<B, Record<C, Record<D, R>>>>

  <T extends Record<GroupByKey, any>, A extends GroupByKey, B extends GroupByKey, C extends GroupByKey, D extends GroupByKey, E extends GroupByKey, R extends any>(_: {
    data: T[],
    groups: [
      {by: ((_: T) => A), sort?: (a: A, b: A) => number},
      {by: ((_: T, groups: [A]) => B), sort?: (a: B, b: B) => number},
      {by: ((_: T, groups: [A, B]) => C), sort?: (a: C, b: C) => number},
      {by: ((_: T, groups: [A, B, C]) => D), sort?: (a: D, b: D) => number},
      {by: ((_: T, groups: [A, B, C, D]) => E), sort?: (a: E, b: E) => number},
    ],
    finalTransform: (_: Seq<T>, groups: [A, B, C, D, E]) => R
  }): Record<A, Record<B, Record<C, Record<D, Record<E, R>>>>>

  <T extends Record<GroupByKey, any>, A extends GroupByKey, B extends GroupByKey, C extends GroupByKey, D extends GroupByKey, E extends GroupByKey, F extends GroupByKey, R extends any>(_: {
    data: T[],
    groups: [
      {by: ((_: T) => A), sort?: (a: A, b: A) => number},
      {by: ((_: T, groups: [A]) => B), sort?: (a: B, b: B) => number},
      {by: ((_: T, groups: [A, B]) => C), sort?: (a: C, b: C) => number},
      {by: ((_: T, groups: [A, B, C]) => D), sort?: (a: D, b: D) => number},
      {by: ((_: T, groups: [A, B, C, D]) => E), sort?: (a: E, b: E) => number},
      {by: ((_: T, groups: [A, B, C, D, E]) => F), sort?: (a: F, b: F) => number},
    ],
    finalTransform: (_: Seq<T>, groups: [A, B, C, D, E, F]) => R
  }): Record<A, Record<B, Record<C, Record<D, Record<E, Record<E, F>>>>>>

  <T extends Record<GroupByKey, any>, A extends GroupByKey, B extends GroupByKey, C extends GroupByKey, D extends GroupByKey, E extends GroupByKey, F extends GroupByKey, G extends GroupByKey, R extends any>(_: {
    data: T[],
    groups: [
      {by: ((_: T) => A), sort?: (a: A, b: A) => number},
      {by: ((_: T, groups: [A]) => B), sort?: (a: B, b: B) => number},
      {by: ((_: T, groups: [A, B]) => C), sort?: (a: C, b: C) => number},
      {by: ((_: T, groups: [A, B, C]) => D), sort?: (a: D, b: D) => number},
      {by: ((_: T, groups: [A, B, C, D]) => E), sort?: (a: E, b: E) => number},
      {by: ((_: T, groups: [A, B, C, D, E]) => F), sort?: (a: F, b: F) => number},
      {by: ((_: T, groups: [A, B, C, D, E, F]) => G), sort?: (a: G, b: G) => number},
    ],
    finalTransform: (_: Seq<T>, groups: [A, B, C, D, E, F, G]) => R
  }): Record<A, Record<B, Record<C, Record<D, Record<E, Record<E, Record<E, G>>>>>>>
  
  // <T extends Record<GroupByKey, any>, A extends GroupByKey, B extends GroupByKey, C extends GroupByKey, D extends GroupByKey, E extends GroupByKey, R extends any>(_: {
  //   data: T[],
  //   groups: [
  //     {by: ((_: T) => A), sort?: (a: A, b: A) => number},
  //     {by: ((_: T) => B), sort?: (a: B, b: B) => number},
  //     {by: ((_: T) => C), sort?: (a: C, b: C) => number},
  //     {by: ((_: T) => D), sort?: (a: D, b: D) => number},
  //     {by: ((_: T) => E), sort?: (a: E, b: E) => number},
  //   ],
  //   finalTransform: (_: Seq<T>, groups: [A, B, C, D, E]) => R
  // }): Record<A, Record<B, Record<C, Record<D, Record<D, R>>>>>

  <T extends Record<GroupByKey, any>, A extends GroupByKey, B extends GroupByKey, C extends GroupByKey, D extends GroupByKey, E extends GroupByKey, F extends GroupByKey, G extends GroupByKey, R extends any>(_: {
    data: T[],
    groups: [
      {by: ((_: T) => A), sort?: (a: A, b: A) => number},
      {by: ((_: T, groups: [A]) => B), sort?: (a: B, b: B) => number},
      {by: ((_: T, groups: [A, B]) => C), sort?: (a: C, b: C) => number},
      {by: ((_: T, groups: [A, B, C]) => D), sort?: (a: D, b: D) => number},
      {by: ((_: T, groups: [A, B, C, D]) => E), sort?: (a: E, b: E) => number},
      {by: ((_: T, groups: [A, B, C, D, E]) => F), sort?: (a: F, b: F) => number},
      {by: ((_: T, groups: [A, B, C, D, E, F]) => G), sort?: (a: G, b: G) => number},
    ],
    finalTransform: (_: Seq<T>, groups: [A, B, C, D, E, F, G]) => R
  }): Record<A, Record<B, Record<C, Record<D, Record<E, Record<E, Record<E, G>>>>>>>


  <T extends Record<GroupByKey, any>>(_: {
    data: T[],
    groups: {by: ((_: T) => GroupByKey), sort?: (a: string, b: string) => number}[],
    finalTransform: (_: Seq<T>, groups: GroupByKey[]) => any
  }): Record<GroupByKey, any>
} = ({
  data,
  groups,
  finalTransform,
  collectedGroup = []
}: any) => {
  if (groups.length === 0) return finalTransform(seq(data), collectedGroup)
  const [group, ...rest] = groups
  const res = seq(data).groupBy(_ => group.by(_, collectedGroup))
  return new Enum(res)
    .sort(([a], [b]) => group.sort ? group.sort(a, b) : a.localeCompare(b))
    .transform((k, v) => [k, groupBy({
      data: v,
      groups: rest,
      finalTransform,
      collectedGroup: [...collectedGroup, k]
    } as any)])
    .get() as Record<GroupByKey, any>
}
