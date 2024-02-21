import {Badge, Box, Icon, LinearProgress, TablePagination,} from '@mui/material'
import React, {useEffect, useMemo} from 'react'
import {useI18n} from '@/core/i18n'
import {Txt} from 'mui-extension'
import {slugify} from '@infoportal-common'
import {Enum, fnSwitch, map} from '@alexandreannic/ts-utils'
import {IpIconBtn} from '../IconBtn'
import {useMemoFn} from '@alexandreannic/react-hooks-lib'
import {generateXLSFromArray} from '@/shared/Sheet/util/generateXLSFile'
import {SheetBody} from './SheetBody'
import {SheetHead} from './SheetHead'
import {SheetRow, SheetTableProps} from '@/shared/Sheet/util/sheetType'
import {format} from 'date-fns'
import {SheetProvider, useSheetContext} from '@/shared/Sheet/context/SheetContext'
import {DatatableColumnToggle} from '@/shared/Sheet/DatatableColumnsToggle'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {SheetModal} from '@/shared/Sheet/SheetModal'
import {SheetErrorBoundary} from '@/shared/Sheet/SheetErrorBundary'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {SheetSkeleton} from '@/shared/Sheet/SheetSkeleton'
import {useAsync} from '@/shared/hook/useAsync'

/** @deprecated use <Datatable/> */
export const Sheet = <T extends SheetRow = SheetRow>({
  total,
  data,
  columns,
  getRenderRowKey,
  defaultLimit,
  showColumnsToggle,
  showColumnsToggleBtnTooltip,
  rowsPerPageOptions = [20, 50, 100, 500],
  select,
  onFiltersChange,
  onDataChange,
  defaultFilters,
  ...props
}: SheetTableProps<T>) => {
  const mappedColumns = useMemo(() => {
    return columns.map(col => {
      if (col.type === 'select_one' || col.type === 'select_multiple') {
        return {
          ...col,
          type: col.type as any,
          renderValue: col.renderValue ?? col.render as any ?? ((_: T) => _[col.id]),
          renderOption: col.renderOption ?? col.render,
          renderExport: col.renderExport === false ? false : col.renderExport ?? col.renderValue ?? col.render as any,
        }
      }
      return {
        ...col,
        type: col.type,
        renderValue: col.renderValue ?? col.render as any ?? ((_: T) => _[col.id])
      }
    })
  }, [columns])

  return (
    <SheetErrorBoundary>
      <SheetProvider
        id={props.id}
        columns={mappedColumns}
        data={data}
        defaultLimit={defaultLimit}
        select={select}
        getRenderRowKey={getRenderRowKey}
        onFiltersChange={onFiltersChange}
        onDataChange={onDataChange}
        defaultFilters={defaultFilters}
      >
        <_Sheet
          rowsPerPageOptions={rowsPerPageOptions}
          {...props}
        />
      </SheetProvider>
    </SheetErrorBoundary>
  )
}

const _Sheet = <T extends SheetRow>({
  header,
  id,
  showExportBtn,
  renderEmptyState,
  loading,
  hidePagination,
  rowsPerPageOptions,
  title,
  onClickRows,
  ...props
}: Pick<SheetTableProps<T>, 'onClickRows' | 'hidePagination' | 'id' | 'title' | 'showExportBtn' | 'rowsPerPageOptions' | 'renderEmptyState' | 'header' | 'loading' | 'sx'>) => {
  const ctx = useSheetContext()
  const _generateXLSFromArray = useAsync(generateXLSFromArray)
  useEffect(() => ctx.select?.onSelect(ctx.selected.toArray), [ctx.selected.get])
  const {m} = useI18n()

  const exportToCSV = () => {
    if (ctx.data.filteredAndSortedData) {
      _generateXLSFromArray.call(slugify(title) ?? 'noname', {
        sheetName: 'data',
        data: ctx.data.filteredAndSortedData,
        schema: ctx.columns
          .filter(_ => _.renderExport !== false)
          .map((q, i) => ({
            head: q.head as string ?? q.id,
            render: (row: any) => {
              // if (!q.renderExport || !q.renderValue) return
              if (q.renderExport === true) return fnSwitch(q.type!, {
                number: () => map(row[q.id], _ => +_),
                date: () => map(row[q.id], (_: Date) => format(_, 'yyyy-MM-dd hh:mm:ss'))
              }, () => row[q.id])
              if (q.renderExport) {
                return q.renderExport(row)
              }
              if (q.renderValue) {
                return q.renderValue(row)
              }
              return row[q.id]
            }
          })),
      })
    }
  }

  const filterCount = useMemoFn(ctx.data.filters, _ => Enum.keys(_).length)

  const [hiddenColumns, setHiddenColumns] = usePersistentState<string[]>([], {storageKey: SheetUtils.localStorageKey.column + id})
  const filteredColumns = useMemo(() => ctx.columns.filter(_ => !hiddenColumns.includes(_.id)), [ctx.columns, hiddenColumns])

  return (
    <Box {...props}>
      {header !== null && (
        <Box sx={{position: 'relative', p: 1, display: 'flex', alignItems: 'center', width: '100%'}}>
          <Badge badgeContent={filterCount} color="primary" overlap="circular" onClick={() => {
            ctx.data.setFilters({})
            ctx.data.resetSearch()
          }}>
            <IpIconBtn sx={{mr: 1}} children="filter_alt_off" tooltip={m.clearFilter} disabled={!filterCount}/>
          </Badge>
          <DatatableColumnToggle
            sx={{mr: 1}}
            columns={ctx.columns}
            hiddenColumns={hiddenColumns}
            onChange={_ => setHiddenColumns(_)}
            title={m.toggleDatatableColumns}
          />
          {typeof header === 'function' ? header({
            data: ctx.data.data as T[],
            filteredData: ctx.data.filteredData as T[],
            filteredAndSortedData: ctx.data.filteredAndSortedData as T[],
          }) : header}
          {showExportBtn && (
            <IpIconBtn loading={_generateXLSFromArray.loading} onClick={exportToCSV} children="download"/>
          )}
          {ctx.selected.size > 0 && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              borderRadius: t => t.shape.borderRadius + 'px',
              background: t => t.palette.background.paper,
            }}>
              <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                fontWeight: t => t.typography.fontWeightBold,
                background: t => t.palette.action.focus,
                pl: 1,
                pr: 2,
                border: t => `2px solid ${t.palette.primary.main}`,
                borderTopLeftRadius: t => t.shape.borderRadius + 'px',
                borderTopRightRadius: t => t.shape.borderRadius + 'px',
                // margin: .75,
                // color: t => t.palette.primary.main,
                // borderRadius: t => t.shape.borderRadius + 'px',
              }}>
                <IpIconBtn color="primary" children="clear" onClick={ctx.selected.clear}/>
                <Box sx={{mr: 1, whiteSpace: 'nowrap'}}>
                  <b>{ctx.selected.size}</b> {m.selected}
                </Box>
                {ctx.select?.selectActions}
              </Box>
            </Box>
          )}
        </Box>
      )}
      <Box sx={{overflowX: 'auto'}}>
        <Box sx={{
          // width: 'max-coontent'
        }}>
          <Box id={id} component="table" className="borderY table" sx={{minWidth: '100%'}}>
            <SheetHead
              data={ctx.data.filteredSortedAndPaginatedData?.data}
              search={ctx.data.search}
              filters={ctx.data.filters}
              columns={filteredColumns}
              columnsIndex={ctx.columnsIndex}
              select={ctx.select}
              selected={ctx.selected}
              onOpenFilter={ctx.modal.filterPopover.open}
              onOpenStats={ctx.modal.statsPopover.open}
            />
            <tbody>
            {map(ctx.data.filteredSortedAndPaginatedData, data => {
              return data.data.length > 0 ? (
                <SheetBody
                  onClickRows={onClickRows}
                  data={data.data}
                  select={ctx.select}
                  columns={filteredColumns}
                  getRenderRowKey={ctx.getRenderRowKey}
                  selected={ctx.selected}
                />
              ) : (
                <tr>
                  <td className="td-loading" colSpan={ctx.columns?.length ?? 1}>
                    <Box sx={{display: 'flex', alignItems: 'center', p: 4}}>
                      <Icon color="disabled" sx={{fontSize: 40, mr: 2}}>block</Icon>
                      <Txt color="disabled" size="title">{m.noDataAtm}</Txt>
                    </Box>
                  </td>
                </tr>
              )
            })}
            </tbody>
          </Box>
        </Box>
      </Box>
      {loading && (ctx.data.data ? (
        <LinearProgress sx={{position: 'absolute', left: 0, right: 0, top: 0}}/>
      ) : (
        <SheetSkeleton/>
      ))}
      {!hidePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={ctx.data.filteredData?.length ?? 0}
          rowsPerPage={ctx.data.search.limit}
          page={ctx.data.search.offset / ctx.data.search.limit}
          onPageChange={(event: unknown, newPage: number) => {
            ctx.data.setSearch(prev => ({...prev, offset: newPage * ctx.data.search.limit}))
          }}
          onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            ctx.data.setSearch(prev => ({...prev, limit: event.target.value as any}))
          }}
        />
      )}
      <SheetModal/>
    </Box>
  )
}

