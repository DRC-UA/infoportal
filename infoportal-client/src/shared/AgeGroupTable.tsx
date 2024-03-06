import {add, DisplacementStatus, Person, PersonDetails, WgDisability} from '@infoportal-common'
import {Sheet} from '@/shared/Sheet/Sheet'
import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {Enum, Obj} from '@alexandreannic/ts-utils'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {Alert} from 'mui-extension'
import {Box, BoxProps} from '@mui/material'
import {Datatable} from '@/shared/Datatable/Datatable'

const displacementStatusOptions = Obj.values(DisplacementStatus)
const disabilitiesOptions = Obj.values(WgDisability)

export const AgeGroupTable = ({
  tableId,
  persons,
  enableDisplacementStatusFilter,
  ...sx
}: {
  enableDisplacementStatusFilter?: boolean
  tableId: string
  persons?: PersonDetails[]
} & BoxProps) => {
  const [displacementStatus, setDisplacementStatus] = useState<DisplacementStatus[]>([])
  const [pwd, setPwd] = useState<'Yes' | 'All'>('All')
  const [tableAgeGroup, setTableAgeGroup] = usePersistentState<typeof Person.ageGroups[0]>('ECHO', {storageKey: 'mpca-dashboard-ageGroup'})
  const {m, formatLargeNumber} = useI18n()

  const data = useMemo(() => {
    if (!persons) return
    const filteredPersons = enableDisplacementStatusFilter ? persons.filter(_ => {
      if (displacementStatus.length > 0 && !displacementStatus.includes(_.displacement!)) return false
      if (pwd === 'Yes' && (_.disability === undefined || _.disability.includes(WgDisability.None) || _.disability.length === 0)) return false
      return true
    }) : persons
    const gb = Person.groupByGenderAndGroup(Person.getAgeGroup(tableAgeGroup))(filteredPersons)
    return Enum.entries(gb).map(([k, v]) => ({ageGroup: k, ...v}))
  }, [persons, tableAgeGroup, pwd, displacementStatus])

  return (
    <Box {...sx}>
      {enableDisplacementStatusFilter && (
        <Alert type="info" dense sx={{mb: 1}} dangerouslySetInnerHTML={{__html: m.consideredAsPwd}}/>
      )}
      <Datatable
        id={tableId}
        className="ip-border"
        hidePagination
        header={
          <>
            {enableDisplacementStatusFilter && (
              <>
                <IpSelectMultiple
                  label={m.displacementStatus}
                  sx={{maxWidth: 160, mr: 1}}
                  options={displacementStatusOptions}
                  value={displacementStatus}
                  onChange={setDisplacementStatus}
                />
                <IpSelectSingle
                  hideNullOption
                  label={m.disability}
                  sx={{maxWidth: 160, mr: 1}}
                  options={['Yes', 'All']}
                  value={pwd}
                  onChange={_ => setPwd(_)}
                />
              </>
            )}
            <IpSelectSingle label={m.ageGroup} sx={{maxWidth: 100}} options={Person.ageGroups} hideNullOption onChange={setTableAgeGroup} value={tableAgeGroup}/>
            {/*<ScRadioGroup value={tableAgeGroup} onChange={setTableAgeGroup} dense inline>*/}
            {/*  {Person.ageGroups.map(_ =>*/}
            {/*    <ScRadioGroupItem key={_} value={_} title={m._ageGroup[_]} hideRadio/>*/}
            {/*  )}*/}
            {/*</ScRadioGroup>*/}
          </>
        }
        data={data}
        columns={[
          {width: 0, id: 'Group', head: m.ageGroup, type: 'select_one', renderQuick: _ => _.ageGroup},
          {width: 0, id: 'Male', head: m.male, type: 'number', render: _ => ({value: _.Male, label: formatLargeNumber(_.Male)})},
          {width: 0, id: 'Female', head: m.female, type: 'number', render: _ => ({value: _.Female, label: formatLargeNumber(_.Female)})},
          {width: 0, id: 'Other', head: m.other, type: 'number', render: _ => ({value: _.Other ?? 0, label: formatLargeNumber(_.Other ?? 0)})},
          {width: 0, id: 'Total', head: m.total, type: 'number', render: _ => ({value: add(_.Male, _.Female, _.Other), label: formatLargeNumber(add(_.Male, _.Female, _.Other))})},
        ]}
      />
    </Box>
  )
}