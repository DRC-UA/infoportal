import {KoboSubmissionMetaData} from '../mapper/index.js'

export namespace KoboFlattenRepeatedGroup {
  export type Data = Pick<KoboSubmissionMetaData, 'id' | 'submissionTime'> & Cursor & Record<string, any>

  type Row = Record<string, any> & Pick<KoboSubmissionMetaData, 'id' | 'submissionTime'>

  export type Cursor = {
    _index?: number
    _parent_index?: number
    _parent_table_name?: string
    _index_chain?: number[]
    _path_chain?: string[]
  }

  export const INDEX_COL = '_index'
  export const PARENT_INDEX_COL = '_parent_index'
  export const PARENT_TABLE_NAME = '_parent_table_name'

  export const run = ({
    data = [],
    path,
    depth = 0,
    replicateParentData,
  }: {
    data?: Row[]
    path: string[]
    depth?: number
    replicateParentData?: boolean
  }): Data[] => {
    if (path.length === depth) return data as any
    return run({
      data: data.flatMap(
        (d, i: number) =>
          d[path[depth]]?.map((child: any, j: number) => {
            const parent = d as Data
            const parentIndexChain = parent._index_chain ?? (parent._index !== undefined ? [parent._index] : [])
            const parentPathChain = parent._path_chain ?? (depth > 0 ? [path[depth - 1]] : [])

            return {
              ...(replicateParentData ? d : {}),
              ...(child ?? {}),
              submissionTime: d.submissionTime,
              id: d.id,
              [INDEX_COL]: j,
              [PARENT_INDEX_COL]: parent._index ?? i,
              [PARENT_TABLE_NAME]: path[depth - 1],
              _index_chain: [...parentIndexChain, j],
              _path_chain: [...parentPathChain, path[depth]],
            } as Data
          }) ?? [],
      ),
      path,
      depth: depth + 1,
      replicateParentData,
    })
  }

  export const buildIndexedXPath = ({questionXPath, row}: {questionXPath: string; row: Data}): string => {
    const segs = questionXPath.split('/')
    if (!segs.length) return questionXPath

    const names = row._path_chain ?? []
    const idxs = row._index_chain ?? []

    if (!names.length || names.length !== idxs.length) return questionXPath

    let p = 0
    const out = segs.map((seg) => {
      const clean = seg.replace(/\[\d+\]$/, '')
      if (p < names.length && clean === names[p]) {
        const idx1 = (idxs[p] ?? 0) + 1
        p++
        return `${clean}[${idx1}]`
      }
      return clean
    })

    return out.join('/')
  }

}
