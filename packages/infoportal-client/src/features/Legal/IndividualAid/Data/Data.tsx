import {useCallback, type FC} from 'react'

import {KoboIndex, Legal_individual_aid, PeriodHelper} from 'infoportal-common'

import {KoboMappedAnswer} from '@/core/sdk/server/kobo/KoboMapper'
import {DatabaseTable} from '@/features/Database/KoboTable/DatabaseKoboTable'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {DatatableFilterValue} from '@/shared/Datatable/util/datatableType'
import {Page} from '@/shared/Page'
import {Panel} from '@/shared/Panel'

import {useIndividualAidData} from '../Dashboard/hooks'
import Filters from '../Filters'
import {useLegalFilterShape} from '../hooks'

const Data: FC = () => {
  const filterShape = useLegalFilterShape()

  const {optionFilter, setOptionFilters, casePeriod, setCasePeriod, caseClosurePeriod, setCaseClosurePeriod} =
    useIndividualAidData()

  const dataFilter = (record: KoboMappedAnswer) => {
    const typedRecord = record as unknown as KoboMappedAnswer<Legal_individual_aid.T>
    const passesOptionFilters = DataFilter.filterData([typedRecord], filterShape, optionFilter).length > 0
    const passesDateFilters =
      typedRecord.number_case?.some(
        ({date_case, date_case_closure}) =>
          PeriodHelper.isDateIn(casePeriod, date_case) && PeriodHelper.isDateIn(caseClosurePeriod, date_case_closure),
      ) ?? false

    return passesOptionFilters && passesDateFilters
  }
  const handleFiltersChange = useCallback(
    (filters: Record<string, DatatableFilterValue>) => {
      // Convert Datatable filter values to our format
      setOptionFilters((prev) => {
        const converted: Record<string, string[] | undefined> = {}

        for (const key of Object.keys(filters)) {
          const value = filters[key]
          if (Array.isArray(value)) {
            // Handle select_multiple
            converted[key] = value as string[]
          } else if (typeof value === 'string') {
            // Handle select_one
            converted[key] = [value]
          }
          // Ignore other filter types
        }

        return {...prev, ...converted}
      })
    },
    [setOptionFilters],
  )

  return (
    <Page width="full">
      <Panel>
        <Filters
          shapes={filterShape}
          filters={optionFilter}
          setOptionFilters={setOptionFilters}
          casePeriod={casePeriod}
          setCasePeriod={setCasePeriod}
          caseClosurePeriod={caseClosurePeriod}
          setCaseClosurePeriod={setCaseClosurePeriod}
          slotProps={{wrapperBox: {paddingInline: 2}}}
        />
        <DatabaseTable
          formId={KoboIndex.byName('legal_individual_aid').id}
          dataFilter={dataFilter}
          onFiltersChange={handleFiltersChange}
        />
      </Panel>
    </Page>
  )
}

export {Data}
