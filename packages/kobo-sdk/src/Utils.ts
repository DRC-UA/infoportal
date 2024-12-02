import PromisePool from "@supercharge/promise-pool"

export const chunkify = <T, R>({
  size,
  data,
  fn,
  concurrency,
}: {
  size: number,
  data: T[]
  fn: (_: T[]) => Promise<R>
  concurrency?: number
}): Promise<R[]> => {
  const chunkedSubmissions = data.reduce((chunks, id, index) => {
    if (index % size === 0) chunks.push([])
    chunks[chunks.length - 1].push(id)
    return chunks
  }, [] as T[][])
  if (concurrency)
    return PromisePool.withConcurrency(concurrency).for(chunkedSubmissions).process(fn).then(_ => _.results)
  return Promise.all(chunkedSubmissions.map(fn))
}
