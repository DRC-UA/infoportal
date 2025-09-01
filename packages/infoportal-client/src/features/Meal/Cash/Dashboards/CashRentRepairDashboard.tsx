import {CashPdmData, useCashPdm} from '@/features/Meal/Cash/Context/CashContext'
import {useCashFilter} from '@/features/Meal/Cash/Context/useCashFilter'
import React, {useMemo, useState} from 'react'
import {Seq, seq} from '@axanc/ts-utils'
import {Meal_cashPdm} from 'infoportal-common'
import {DebouncedInput, Page} from '@/shared'
import {DataFilterLayout} from '@/shared/DataFilter/DataFilterLayout'
import {PeriodPicker} from '@/shared/PeriodPicker/PeriodPicker'
import {Box, TextField} from '@mui/material'
import {CashOverview} from '@/features/Meal/Cash/Components/CashOverview'
import {Registration} from '@/features/Meal/Cash/Components/Registration'
import {AbilityCover} from '@/features/Meal/Cash/Components/AbilityCover'
import {Outcome} from '@/features/Meal/Cash/Components/Outcome'
import {Accountability} from '@/features/Meal/Cash/Components/Accountability'
import {DataFilter} from '@/shared/DataFilter/DataFilter'

export const CashRentRepairDashboard = () => {
  const ctx = useCashPdm()
  const {shape} = useCashFilter(ctx.fetcherAnswers.get)
  const [filters, setFilters] = useState<Record<string, string[] | undefined>>({})
  const [search, setSearch] = useState<string>('')

  const cashOnly: Seq<CashPdmData<Meal_cashPdm.T>> = useMemo(
    () => seq(ctx.fetcherAnswers.get).filter((_) => _.source === 'pdm') as Seq<CashPdmData<Meal_cashPdm.T>>,
    [ctx.fetcherAnswers.get],
  )

  const data: Seq<CashPdmData<Meal_cashPdm.T>> = useMemo(() => {
    let rows = cashOnly

    const ids = search
      .split(/\s+/)
      .map((s) => s.trim())
      .filter(Boolean)

    if (ids.length) {
      rows = rows.filter((_) => {
        const unique = _.answers.unique_number?.toString()
        return ids.some((id) => unique?.includes(id))
      })
    }

    return DataFilter.filterData(rows, shape, filters) as Seq<CashPdmData<Meal_cashPdm.T>>
  }, [cashOnly, shape, filters, search])

  return (
    <Page width="lg" loading={ctx.fetcherAnswers.loading}>
      <DataFilterLayout
        shapes={shape}
        filters={filters}
        setFilters={setFilters}
        before={
          <>
            <DebouncedInput<[Date | undefined, Date | undefined]>
              debounce={400}
              value={[ctx.periodFilter.start, ctx.periodFilter.end]}
              onChange={([start, end]) => ctx.setPeriodFilter((prev) => ({...prev, start, end}))}
            >
              {(value, onChange) => (
                <PeriodPicker
                  sx={{marginTop: '-6px'}}
                  value={value ?? [undefined, undefined]}
                  onChange={onChange}
                  min={ctx.fetcherPeriod.get?.cashPdm.start}
                  max={ctx.fetcherPeriod.get?.cashPdm.end}
                />
              )}
            </DebouncedInput>

            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <TextField
                label="Unique ID or Phone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                placeholder="Search by Unique ID or Phone"
                sx={{minWidth: 220, ml: 1}}
              />
            </Box>
          </>
        }
      />
      {data && (
        <>
          {seq(data).length > 0 && <CashOverview data={data} />}
          {seq(data).length > 0 && <Registration data={data} />}
          {seq(data).length > 0 && <AbilityCover data={data} />}
          {seq(data).length > 0 && <Outcome data={data} />}
          {seq(data).length > 0 && <Accountability data={data} />}
        </>
      )}
    </Page>
  )
}
