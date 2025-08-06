import {useCallback, useMemo, type Dispatch, type ReactNode, type SetStateAction} from 'react'
import {Obj, Seq, seq} from '@axanc/ts-utils'
import {Box, BoxProps} from '@mui/material'

import {useI18n} from '@/core/i18n'
import {themeLightScrollbar} from '@/core/theme'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {DashboardFilterOptions} from '@/shared/DashboardLayout/DashboardFilterOptions'
import {IpIconBtn} from '@/shared/IconBtn'
import {DataFilterLayoutPopup} from '@/shared/DataFilter/DataFilterLayoutPopup'

export interface FilterLayoutProps extends Pick<BoxProps, 'sx'> {
  readonly onClear?: (name?: string) => void
  readonly filters: Record<string, string[] | undefined>
  readonly setFilters: Dispatch<SetStateAction<Record<string, undefined | string[]>>>
  readonly before?: ReactNode
  readonly after?: ReactNode
  readonly data?: Seq<any>
  readonly shapes: Record<string, DataFilter.Shape<any, any>>
  readonly slotProps?: {
    wrapperBox?: BoxProps
    filtersBox?: BoxProps
    controlsBox?: BoxProps
  }
}

export const DataFilterLayout = ({
  sx,
  hidePopup,
  before,
  after,
  shapes,
  filters,
  setFilters,
  data,
  onClear,
  slotProps,
}: FilterLayoutProps & {
  hidePopup?: boolean
}) => {
  const {m} = useI18n()

  const getFilteredOptions = useCallback(
    (name: string) => {
      const filtersCopy = {...filters}
      delete filtersCopy[name]
      return DataFilter.filterData(data ?? seq([]), shapes, filtersCopy)
    },
    [filters, shapes, data],
  )

  return (
    <Box
      sx={{
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        ...slotProps?.wrapperBox,
      }}
    >
      <Box
        sx={{
          flex: 1,
          mt: -1,
          mb: 1,
          pt: 2,
          pb: 0.5,
          display: 'flex',
          alignItems: 'center',
          ...themeLightScrollbar,
          whiteSpace: 'nowrap',
          '& > *': {
            mr: 0.5,
          },
          ...(sx as any),
        }}
      >
        {before}
        <Box display="flex" gap={1} {...slotProps?.filtersBox}>
          {Obj.entries(shapes).map(([name, shape]) => (
            <DebouncedInput<string[]>
              key={name}
              debounce={50}
              value={filters[name]}
              onChange={(_) => setFilters((prev: any) => ({...prev, [name]: _}))}
            >
              {(value, onChange) => (
                <DashboardFilterOptions
                  icon={shape.icon}
                  value={value ?? []}
                  label={shape.label}
                  addBlankOption={shape.addBlankOption}
                  options={() => shape.getOptions(() => getFilteredOptions(name))}
                  onChange={onChange}
                  searchable={shape.searchable}
                />
              )}
            </DebouncedInput>
          ))}
        </Box>
        {after}
      </Box>
      <Box
        sx={{
          alignSelf: 'flex-start',
          display: 'flex',
          alignItems: 'center',
          mt: 1,
        }}
        {...slotProps?.controlsBox}
      >
        {!hidePopup && (
          <DataFilterLayoutPopup
            {...{
              before,
              after,
              shapes,
              filters,
              setFilters,
              data,
              onClear,
              slotProps,
              getFilteredOptions,
            }}
            onConfirm={setFilters}
          />
        )}
        {onClear && <IpIconBtn children="clear" tooltip={m.clearFilter} onClick={() => onClear()} />}
      </Box>
    </Box>
  )
}
