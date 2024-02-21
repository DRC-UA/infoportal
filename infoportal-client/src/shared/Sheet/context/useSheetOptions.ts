import {SheetInnerColumnProps, SheetOptions, SheetRow} from '@/shared/Sheet/util/sheetType'
import {useCallback, useEffect, useMemo} from 'react'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {seq} from '@alexandreannic/ts-utils'
import {UseSheetData} from '@/shared/Sheet/context/useSheetData'

import {KeyOf} from '@infoportal-common'

export type UseSheetOptions<T extends SheetRow> = ReturnType<typeof useSheetOptions<T>>

const optionsRef = new Map<string, SheetOptions[] | undefined>()

export const useSheetOptions = <T extends SheetRow>({
  data,
  columns,
  columnsIndex,
}: {
  data: UseSheetData<T>
  columns: SheetInnerColumnProps<any>[],
  columnsIndex: Record<KeyOf<T>, SheetInnerColumnProps<any>>
}) => {

  const automaticOptionColumns = useMemo(() => columns.filter(_ =>
    (_.type === 'select_multiple' || _.type === 'select_one') && _.options === undefined
  ), [columns])

  useEffect(function resetAutomaticRef() {
    automaticOptionColumns.forEach(c => {
      optionsRef.delete(c.id)
    })
  }, [data.filteredData])

  return useCallback((columnId: KeyOf<T>) => {
    if (!optionsRef.has(columnId)) {
      const col = columnsIndex[columnId]
      if ((col.type === 'select_one' || col.type === 'select_multiple') && col.options) {
        optionsRef.set(columnId, col.options())
      } else {
        if (col.type === 'select_one') {
          optionsRef.set(columnId, seq(data.filterExceptBy(columnId))
            ?.distinct(_ => col.renderValue(_))
            .sort((a, b) => (col.renderValue(b) ?? '').localeCompare(col.renderValue(a) ?? ''))
            .map(_ => SheetUtils.buildCustomOption(
              col.renderValue(_) as string,
              col.renderOption(_) as string,
            )))
        } else if (col.type === 'select_multiple') {
          optionsRef.set(columnId, seq(data.filterExceptBy(columnId))
            ?.flatMap(_ => col.renderValue(_))
            .distinct(_ => _)
            .sort((a, b) => (a ?? '').localeCompare(b ?? ''))
            .map(_ => _ ? SheetUtils.buildCustomOption(_, col.renderOption!(_) as string) : SheetUtils.blankOption)
          )
        }
      }
    }
    return optionsRef.get(columnId)
  }, [data.filteredData, data.filters, columns])
}