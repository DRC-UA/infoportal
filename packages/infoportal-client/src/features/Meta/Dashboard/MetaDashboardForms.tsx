import {useMemo, useState, type ChangeEvent} from 'react'
import {Card, CardHeader, CardContent} from '@mui/material'
import Link from 'next/link'
import {generatePath} from 'react-router'

import {KoboIndex} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {useMetaContext} from '@/features/Meta/MetaContext'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

import {FORM_LABELS_DATA} from './constants'
import PeopleSubmissionsSwitch from './PeopleSubmissionsSwitch'

const MetaDashbordForms = () => {
  const {
    data: {filteredData},
  } = useMetaContext()
  const {m} = useI18n()
  const flatFilteredData = useMemo(
    () => filteredData.flatMap(({persons, ...rest}) => persons!.map((person) => ({...rest, persons: [person]}))),
    [filteredData],
  )
  const [dataSource, setDataSource] = useState<'submissions' | 'people'>('submissions')
  const toggleDataSource = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setDataSource(checked ? 'people' : 'submissions')
  }

  const data = dataSource === 'submissions' ? filteredData : flatFilteredData

  return (
    <Card>
      <CardHeader
        title={m.form}
        action={<PeopleSubmissionsSwitch dataSource={dataSource} toggleDataSource={toggleDataSource} />}
        slotProps={{action: {sx: {margin: 0}}}}
      />
      <CardContent sx={{pt: 0}}>
        <ChartBarSingleBy
          data={data}
          label={Object.fromEntries(
            FORM_LABELS_DATA.map(({label, formId}) => [
              label,
              <Link key={formId} href={generatePath('database#/form/:formId/database', {formId})} target="_blank">
                {label}
              </Link>,
            ]),
          )}
          by={({formId}) => KoboIndex.searchById(formId)?.translation ?? formId}
        />
      </CardContent>
    </Card>
  )
}

export default MetaDashbordForms
