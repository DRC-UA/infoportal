import {add, DisplacementStatus, Person, PersonDetails, WgDisability} from '@infoportal-common'
import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {usePersistentState} from '@/shared/hook/usePersistantState'
import {Enum, Obj} from '@alexandreannic/ts-utils'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {Box, BoxProps, Switch, Theme} from '@mui/material'
import {Datatable} from '@/shared/Datatable/Datatable'
import {IpBtn} from '@/shared/Btn'

const displacementStatusOptions = Obj.values(DisplacementStatus)
const disabilitiesOptions = Obj.values(WgDisability)

export const AgeGroupTable = ({
  tableId,
  persons,
  hideHeader,
  enableDisplacementStatusFilter,
  enablePwdFilter,
  ...sx
}: {
  hideHeader?: boolean
  enableDisplacementStatusFilter?: boolean
  tableId: string
  persons?: PersonDetails[]
  enablePwdFilter?: boolean
} & BoxProps) => {
  const [displacementStatus, setDisplacementStatus] = useState<DisplacementStatus[]>([])
  const [onlyPwd, setOnlyPwd] = useState<boolean>(false)
  const [tableAgeGroup, setTableAgeGroup] = usePersistentState<typeof Person.ageGroups[0]>('ECHO', {storageKey: 'mpca-dashboard-ageGroup'})
  const {m, formatLargeNumber} = useI18n()

  const data = useMemo(() => {
    if (!persons) return
    const filteredPersons = persons.filter(_ => {
      if (enableDisplacementStatusFilter && displacementStatus.length > 0 && !displacementStatus.includes(_.displacement!)) return false
      if (enablePwdFilter && onlyPwd && (_.disability === undefined || _.disability.includes(WgDisability.None) || _.disability.length === 0)) return false
      return true
    })
    const gb = Person.groupByGenderAndGroup(Person.getAgeGroup(tableAgeGroup))(filteredPersons)
    return Enum.entries(gb).map(([k, v]) => ({ageGroup: k, ...v}))
  }, [persons, tableAgeGroup, onlyPwd, displacementStatus, enableDisplacementStatusFilter, enablePwdFilter])

  return (
    <Box {...sx}>
      <Datatable
        id={tableId}
        className="ip-border"
        hidePagination
        header={hideHeader ? null :
          <>
            <IpSelectSingle label={m.ageGroup} sx={{maxWidth: 100}} options={Person.ageGroups}
                            hideNullOption onChange={setTableAgeGroup} value={tableAgeGroup}/>
            {enableDisplacementStatusFilter && (
              <IpSelectMultiple
                label={m.displacementStatus}
                sx={{maxWidth: 160, ml: 1}}
                options={displacementStatusOptions}
                value={displacementStatus}
                onChange={setDisplacementStatus}
              />
            )}
            {enablePwdFilter && (
              <IpBtn
                variant="outlined"
                iconSx={{
                  color: (t: Theme) => t.palette.text.disabled,
                  transform: 'rotate(90deg)'
                }}
                onClick={() => setOnlyPwd(prev => !prev)}
                tooltip={m.consideredAsPwd}
                sx={{
                  textTransform: 'initial',
                  ml: 1,
                  whiteSpace: 'nowrap',
                  fontWeight: 400,
                  color: t => t.palette.text.secondary
                }}
              >
                {m.onlyPwds}
                <Switch size="small" sx={{mr: -1}} checked={onlyPwd}/>
              </IpBtn>
            )}
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
          {
            width: 0,
            id: 'Male',
            head: m.male,
            type: 'number',
            render: _ => ({value: _.Male, label: formatLargeNumber(_.Male)})
          },
          {
            width: 0,
            id: 'Female',
            head: m.female,
            type: 'number',
            render: _ => ({value: _.Female, label: formatLargeNumber(_.Female)})
          },
          {
            width: 0,
            id: 'Other',
            head: m.other,
            type: 'number',
            render: _ => ({value: _.Other ?? 0, label: formatLargeNumber(_.Other ?? 0)})
          },
          {
            width: 0,
            id: 'Total',
            head: m.total,
            type: 'number',
            render: _ => ({
              value: add(_.Male, _.Female, _.Other),
              label: formatLargeNumber(add(_.Male, _.Female, _.Other))
            })
          },
        ]}
      />
    </Box>
  )
}
