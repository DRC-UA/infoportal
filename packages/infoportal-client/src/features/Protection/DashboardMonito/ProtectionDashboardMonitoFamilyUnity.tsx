import {Div, SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import React, {useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {Lazy} from '@/shared/Lazy'
import {ChartBar} from '@/shared/charts/ChartBar'
import {Protection_hhs3} from 'infoportal-common'
import {Box, Checkbox} from '@mui/material'
import {Txt} from '@/shared/Txt'
import {Obj} from '@alexandreannic/ts-utils'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'
import {ChartHelper} from '@/shared/charts/chartHelper'

type Filters = Pick<Record<keyof typeof Protection_hhs3.options['are_you_separated_from_any_of_your_households_members'], boolean>,
  'partner' |
  'child_lt_18' |
  'child_gte_18' |
  'mother' |
  'father' |
  'caregiver' |
  'other_relative'
>

export const ProtectionDashboardMonitoFamilyUnity = () => {
  const ctx = ProtectionMonito.useContext()
  const {formatLargeNumber, m} = useI18n()
  const [category, setCategory] = useState<Filters>({
    partner: true,
    child_lt_18: true,
    child_gte_18: true,
    mother: true,
    father: true,
    caregiver: true,
    other_relative: true,
  })

  const allChecked = useMemo(() => Obj.values(category).every(_ => _), [category])
  const oneChecked = useMemo(() => !!Obj.values(category).find(_ => _), [category])

  const updateAll = (checked: boolean) => {
    setCategory({
      partner: checked,
      child_lt_18: checked,
      child_gte_18: checked,
      mother: checked,
      father: checked,
      caregiver: checked,
      other_relative: checked,
    })
  }

  return (
    <>
      <Div responsive>
        <Div column>
          <SlidePanel>
            <ChartPieWidgetByKey
              compare={{before: ctx.dataPreviousPeriod}}
              title={m.protHHS2.familyMemberSeparated}
              property="are_you_separated_from_any_of_your_households_members"
              filter={_ => !_.includes('no') && !_.includes('unable_unwilling_to_answer')}
              sx={{mb: 2}}
              data={ctx.dataFiltered}
            />
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Checkbox indeterminate={!allChecked && oneChecked} checked={allChecked} onChange={() => {
                updateAll(!allChecked)
              }}/>
              <Txt bold size="big">{m.selectAll}</Txt>
            </Box>
            <Lazy deps={[ctx.dataFiltered, category]} fn={() =>
              ChartHelper.multiple({
                filterValue: ['unable_unwilling_to_answer', 'no'],
                data: ctx.dataFiltered.map(_ => _.are_you_separated_from_any_of_your_households_members).compact()
              }).setLabel(Protection_hhs3.options.are_you_separated_from_any_of_your_households_members)
                .get()
            }>
              {_ => <ChartBar
                data={_}
                labels={{
                  partner: <Checkbox
                    size="small"
                    checked={category.partner}
                    onChange={e => setCategory(prev => ({...prev, partner: e.target.checked}))}
                  />,
                  child_lt_18: <Checkbox
                    size="small"
                    checked={category.child_lt_18}
                    onChange={e => setCategory(prev => ({...prev, child_lt_18: e.target.checked}))}
                  />,
                  child_gte_18: <Checkbox
                    size="small"
                    checked={category.child_gte_18}
                    onChange={e => setCategory(prev => ({...prev, child_gte_18: e.target.checked}))}
                  />,
                  mother: <Checkbox
                    size="small"
                    checked={category.mother}
                    onChange={e => setCategory(prev => ({...prev, mother: e.target.checked}))}
                  />,
                  father: <Checkbox
                    size="small"
                    checked={category.father}
                    onChange={e => setCategory(prev => ({...prev, father: e.target.checked}))}
                  />,
                  caregiver: <Checkbox
                    size="small"
                    checked={category.caregiver}
                    onChange={e => setCategory(prev => ({...prev, caregiver: e.target.checked}))}
                  />,
                  other_relative: <Checkbox
                    size="small"
                    checked={category.other_relative}
                    onChange={e => setCategory(prev => ({...prev, other_relative: e.target.checked}))}
                  />,
                } as any}
              />
              }
            </Lazy>
          </SlidePanel>

        </Div>
        <Div column>
          <SlidePanel title={m.protHHS2.locationOfSeparatedFamilyMembers}>
            <Lazy deps={[ctx.dataFiltered, category]} fn={() => ChartHelper.single({
              data: ctx.dataFiltered.flatMap(_ => [
                ...category.partner ? [_.where_is_your_partner] : [],
                ...category.child_lt_18 ? [_.where_is_your_child_lt_18] : [],
                ...category.child_gte_18 ? [_.where_is_your_child_gte_18] : [],
                ...category.mother ? [_.where_is_your_mother] : [],
                ...category.father ? [_.where_is_your_father] : [],
                ...category.caregiver ? [_.where_is_your_caregiver] : [],
                ...category.other_relative ? [_.where_is_your_other_relative] : [],
              ]).compact(),
              // filterValue: ['unable_unwilling_to_answer']
            }).setLabel(Protection_hhs3.options.where_is_your_partner).get()
            }>
              {_ => <ChartBar data={_}/>}
            </Lazy>
          </SlidePanel>
          <SlidePanel title={m.protHHS2.reasonForRemainInOrigin}>
            <Lazy deps={[ctx.dataFiltered, category]} fn={() => ChartHelper.single({
              data: ctx.dataFiltered.flatMap(_ => [
                ...category.partner ? [_.where_is_your_partner_remain_behind_in_the_area_of_origin] : [],
                ...category.child_lt_18 ? [_.where_is_your_child_lt_18_remain_behind_in_the_area_of_origin] : [],
                ...category.child_gte_18 ? [_.where_is_your_child_gte_18_remain_behind_in_the_area_of_origin] : [],
                ...category.mother ? [_.where_is_your_mother_remain_behind_in_the_area_of_origin] : [],
                ...category.father ? [_.where_is_your_father_remain_behind_in_the_area_of_origin] : [],
                ...category.caregiver ? [_.where_is_your_caregiver_remain_behind_in_the_area_of_origin] : [],
                ...category.other_relative ? [_.where_is_your_other_relative_remain_behind_in_the_area_of_origin] : [],
              ]).compact(),
              // filterValue: ['unable_unwilling_to_answer']
            }).setLabel(Protection_hhs3.options.where_is_your_partner_remain_behind_in_the_area_of_origin).get()
            }>
              {_ => <ChartBar data={_}/>}
            </Lazy>
          </SlidePanel>
        </Div>
      </Div>
    </>
  )
}