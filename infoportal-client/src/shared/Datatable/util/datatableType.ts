import React, {CSSProperties, ReactNode} from 'react'
import {BoxProps} from '@mui/material'
import {KeyOf} from '@infoportal-common'
import {ApiPaginate} from '@/core/sdk/server/_core/ApiSdkUtils'
import {GenerateXlsFromArrayParams} from '@/shared/Sheet/util/generateXLSFile'

export type DatatablePropertyType = 'date' | 'number' | 'string' | 'select_one' | 'select_multiple'

export type OrderBy = 'asc' | 'desc'

export interface DatatableOptions {
  value: string
  // label?: string
  // Should be string to filter options in filters popup
  label?: ReactNode
}

export interface DatatableSearch<T = any> {
  limit: number
  offset: number
  sortBy?: string
  orderBy?: OrderBy
}

export type HeaderParams<T extends DatatableRow> = {
  data: T[]
  filteredData: T[]
  filteredAndSortedData: T[]
}

export type DatatableRow = Record<string, any> // Record<string, any/* string | number[] | string[] | Date | number | undefined*/>
export interface DatatableTableProps<T extends DatatableRow, K extends string = string> extends Omit<BoxProps, 'onSelect'> {
  header?: ReactNode | ((_: HeaderParams<T>) => ReactNode)
  id: string
  loading?: boolean
  total?: number
  defaultFilters?: Record<K, any>
  defaultLimit?: number
  title?: string
  readonly select?: {
    readonly onSelect: (_: string[]) => void
    readonly getId: (_: T) => string
    readonly selectActions?: ReactNode
  }
  readonly data?: T[]
  getRenderRowKey?: (_: T, index: number) => string
  rowStyle?: (_: T) => CSSProperties
  onClickRows?: (_: T, event: React.MouseEvent<HTMLElement>) => void
  rowsPerPageOptions?: number[]
  columns: DatatableColumn.Props<T, K>[]
  showColumnsToggle?: boolean
  hidePagination?: boolean
  showColumnsToggleBtnTooltip?: string
  showExportBtn?: boolean
  exportAdditionalSheets?: (filteredAndSortedData: T[]) => GenerateXlsFromArrayParams[]
  renderEmptyState?: ReactNode
  onFiltersChange?: (_: Record<KeyOf<T>, DatatableFilterValue>) => void
  onDataChange?: (_: {
    data?: T[]
    filteredData?: T[]
    filteredAndSortedData?: T[]
    filteredSortedAndPaginatedData?: ApiPaginate<T>
  }) => void
  sort?: {
    sortableColumns?: string[]
    sortBy?: KeyOf<T>
    orderBy?: OrderBy
    onSortChange: (_: {
      sortBy?: KeyOf<T>;
      orderBy?: OrderBy
    }) => void
  }
}

export namespace DatatableColumn {

  export type Value = string[] | string | undefined | Date | number | null | boolean

  export type RenderT<T extends Value, TOption = any> = {
    label: ReactNode
    option?: TOption
    value: T
    tooltip?: string | undefined | null
    export?: null | string | number | undefined | Date
  }

  export interface Base<T extends DatatableRow, K extends string = string> {
    id: K
    noSort?: boolean
    width?: number
    head?: string
    noCsvExport?: boolean
    align?: 'center' | 'right'
    onClick?: (_: T) => void
    hidden?: boolean
    alwaysVisible?: boolean
    style?: (_: T) => CSSProperties
    styleHead?: CSSProperties
    classHead?: string
    typeIcon?: ReactNode
    subHeader?: ReactNode,
    className?: string | ((_: T) => string | undefined)
    stickyEnd?: boolean
  }

  export namespace SelectOne {
    export type RenderQuick<T extends DatatableRow> = (_: T) => string | undefined
    export type Render<T extends DatatableRow> = (_: T) => RenderT<string | undefined, ReactNode>
    export type BaseType = {
      options?: () => DatatableOptions[]
      type: 'select_one'
    }
    export type TypeInner<T extends DatatableRow> = BaseType & {
      render: Render<T>
    } & ({
      noCsvExport?: false
    })
    export type TypeQuick<T extends DatatableRow> = BaseType & {
      renderQuick: RenderQuick<T>
    }
    export type TypeOuter<T extends DatatableRow> = TypeInner<T> | TypeQuick<T>
  }

  export namespace SelectMultiple {
    export type RenderQuick<T extends DatatableRow> = (_: T) => string[] | undefined
    export type Render<T extends DatatableRow> = (_: T) => RenderT<string[] | undefined, ReactNode>
    export type BaseType = {
      options: () => DatatableOptions[]
      type: 'select_multiple'
    }
    export type TypeInner<T extends DatatableRow> = BaseType & {
      render: Render<T>
    }
    export type TypeQuick<T extends DatatableRow> = BaseType & {
      renderQuick: RenderQuick<T>
    }
    export type TypeOuter<T extends DatatableRow> = TypeInner<T> | TypeQuick<T>
  }

  export namespace Undefined {
    export type RenderQuick<T extends DatatableRow> = (_: T) => ReactNode
    export type Render<T extends DatatableRow> = (_: T) => RenderT<undefined>
    export type BaseType = {
      type?: undefined
    }
    export type TypeInner<T extends DatatableRow> = BaseType & {
      render: Render<T>
    }
    export type TypeQuick<T extends DatatableRow> = BaseType & {
      renderQuick: RenderQuick<T>
    }
    export type TypeOuter<T extends DatatableRow> = TypeInner<T> | TypeQuick<T>
  }

  export namespace Text {
    export type RenderQuick<T extends DatatableRow> = (_: T) => string | undefined
    export type Render<T extends DatatableRow> = (_: T) => RenderT<string | undefined>
    export type BaseType = {
      type: 'string'
    }
    export type TypeInner<T extends DatatableRow> = BaseType & {
      render: Render<T>
    }
    export type TypeQuick<T extends DatatableRow> = BaseType & {
      renderQuick: RenderQuick<T>
    }
    export type TypeOuter<T extends DatatableRow> = TypeInner<T> | TypeQuick<T>
  }

  export namespace Date {
    export type RenderQuick<T extends DatatableRow> = (_: T) => string | undefined
    export type Render<T extends DatatableRow> = (_: T) => RenderT<Date | undefined>
    export type BaseType = {
      type: 'date'
    }
    export type TypeInner<T extends DatatableRow> = BaseType & {
      render: Render<T>
    }
    export type TypeQuick<T extends DatatableRow> = BaseType & {
      renderQuick: RenderQuick<T>
    }
    export type TypeOuter<T extends DatatableRow> = TypeInner<T> | TypeQuick<T>
  }

  export namespace Number {
    export type RenderQuick<T extends DatatableRow> = (_: T) => number | undefined
    export type Render<T extends DatatableRow> = (_: T) => RenderT<number | undefined>
    export type BaseType = {
      type: 'number'
    }
    export type TypeInner<T extends DatatableRow> = BaseType & {
      render: Render<T>
    }
    export type TypeQuick<T extends DatatableRow> = BaseType & {
      renderQuick: RenderQuick<T>
    }
    export type TypeOuter<T extends DatatableRow> = TypeInner<T> | TypeQuick<T>
  }

  export type InnerProps<T extends DatatableRow, K extends string = string> = Base<T, K> & (
    Text.TypeInner<T> |
    SelectOne.TypeInner<T> |
    Date.TypeInner<T> |
    Number.TypeInner<T> |
    SelectMultiple.TypeInner<T> |
    Undefined.TypeInner<T>
    )
  export type Props<T extends DatatableRow, K extends string = string> = Base<T, K> & (
    Text.TypeOuter<T> |
    SelectOne.TypeOuter<T> |
    Date.TypeOuter<T> |
    Number.TypeOuter<T> |
    SelectMultiple.TypeOuter<T> |
    Undefined.TypeOuter<T>
    )
  export type QuickProps<T extends DatatableRow, K extends string = string> = Base<T, K> & (
    Text.TypeQuick<T> |
    SelectOne.TypeQuick<T> |
    Date.TypeQuick<T> |
    Number.TypeQuick<T> |
    SelectMultiple.TypeQuick<T> |
    Undefined.TypeQuick<T>
    )

  export const isQuick = (_: Props<any>): _ is QuickProps<any> => {
    return !!(_ as any).renderQuick
  }
  export const isInner = (_: Props<any>): _ is InnerProps<any> => {
    return !!(_ as any).render
  }
}


export type DatatableFilterValueString = {
  filterBlank?: boolean,
  value?: string
} | undefined
export type DatatableFilterValueSelect = string[]
export type DatatableFilterValueDate = [Date | undefined, Date | undefined]
export type DatatableFilterValueNumber = [number | undefined, number | undefined]
export type DatatableFilterValue = DatatableFilterValueString | DatatableFilterValueSelect | DatatableFilterValueDate | DatatableFilterValueNumber
export type DatatableBlankValue = ''

// type SchemaItem = {
//   id: string;
//   type: string;
// };
//
// type FilterValue<T extends SchemaItem> = T['type'] extends 'string'
//   ? string
//   : T['type'] extends 'date'
//     ? Date
//     : never;
//
// type Filters<T extends SchemaItem[]> = {
//   [K in T[number]['id']]: any
// };
//
// type CallFnArgs<T extends SchemaItem[]> = {
//   schema: T;
//   filters: Filters<T>;
// };
//
// function callFn<T extends SchemaItem[]>(args: CallFnArgs<T>): void {
//   // Your implementation here
// }
//
// // Example usage
// callFn({
//   schema: [{ id: 'first', type: 'string' }, { id: 'second', type: 'date' }],
//   filters: { xxx: 'test', second: new Date() },
// });