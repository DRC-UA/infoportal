import {SheetBlankValue, SheetColumnProps, SheetOptions, SheetRow} from '@/shared/Sheet/util/sheetType'
import React, {ReactNode} from 'react'

export class SheetUtils {

  static readonly localStorageKey = {
    column: 'database-columns-',
    filters: 'datatable-filters-',
  }
  // static readonly FILTER_BLANK_TEXT = 'FILTER_BLANK_TEXT_someRandomTextToAvoidCollision_9fa3'
  static readonly buildColumns = <T extends SheetRow = SheetRow>(_: SheetColumnProps<T>[]) => _

  static readonly blank: SheetBlankValue = ''
  static readonly blankLabel = <i>BLANK</i>
  static readonly blankOption: SheetOptions = {value: SheetUtils.blank, label: SheetUtils.blankLabel}

  static readonly buildOptions = (opt: string[], addBlank?: boolean): SheetOptions[] => {
    return [
      ...(addBlank ? [SheetUtils.blankOption] : []),
      ...opt.map(SheetUtils.buildOption),
    ]
  }

  static readonly buildOption = (_: string): SheetOptions => {
    return {value: _, label: _}
  }

  static readonly buildCustomOption = (_: string, label?: ReactNode): SheetOptions => {
    return {value: _, label: label ?? _}
  }

  /** @deprecated*/
  static readonly getValueGetter = <T extends SheetRow>(col: Pick<SheetColumnProps<T>, 'render' | 'renderValue'>, colName: string): (_: T, i?: number) => any => {
    return col.renderValue ?? col.render as any ?? ((_: T, i: number) => _[colName])
  }
}