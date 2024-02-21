import {Dispatch, SetStateAction, useMemo, useState} from 'react'
import {UseSheetData} from '@/shared/Sheet/context/useSheetData'
import {SheetRow} from '@/shared/Sheet/util/sheetType'

interface ModalProps {
  columnId: string
  event: any
}

const group = (props: ModalProps | undefined, dispatch: Dispatch<SetStateAction<ModalProps | undefined>>) => {
  return {
    close: () => dispatch(undefined),
    open: (columnId: string, event: any) => {
      dispatch({columnId, event})
    },
    get: props,
  }
}

export type SheetModal<T extends SheetRow> = ReturnType<typeof useSheetModal<T>>

export const useSheetModal = <T extends SheetRow>({
  data,
}: {
  data: UseSheetData<T>
}) => {
  const [filterPopover, setFilterPopover] = useState<ModalProps | undefined>()
  const [statsPopover, setStatsPopover] = useState<ModalProps | undefined>()

  return useMemo(() => {
    return {
      filterPopover: group(filterPopover, setFilterPopover),
      statsPopover: group(statsPopover, setStatsPopover),
    }
  }, [
    data,
    filterPopover,
    statsPopover,
  ])
}