import {Div, SlidePanel, SlideWidget} from '@/shared/PdfLayout/PdfSlide'
import {ChartBar} from '@/shared/charts/ChartBar'
import {MapSvg} from '@/shared/maps/MapSvg'
import React, {useState} from 'react'
import {useI18n} from '@/core/i18n'
import {Box, Icon, useTheme} from '@mui/material'
import {Lazy} from '@/shared/Lazy'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {chain, Person, Protection_hhs3} from 'infoportal-common'
import {ChartBarStacker} from '@/shared/charts/ChartBarStacked'
import {ChartPieWidget} from '@/shared/charts/ChartPieWidget'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Obj} from '@alexandreannic/ts-utils'
import {ChartPieWidgetByKey} from '@/shared/charts/ChartPieWidgetByKey'
import {ChartBarMultipleBy} from '@/shared/charts/ChartBarMultipleBy'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'
import {Datatable} from '@/shared/Datatable/Datatable'
import {ProtectionMonito} from '@/features/Protection/DashboardMonito/ProtectionMonitoContext'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {ChartHelper} from '@/shared/charts/chartHelper'

export const ProtectionDashboardMonitoSample = () => {
  const ctx = ProtectionMonito.useContext()
  const {formatLargeNumber, m} = useI18n()
  const theme = useTheme()
  const [ag, setAg] = useState<keyof (typeof Person.ageGroup)>('DRC')
  const [agDisplay, setAgDisplay] = useState<'chart' | 'table'>('chart')
  return (
    <Div column>
      <Div alignItems="flex-start" responsive>
        <Div column>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="home" title={m.hhs}>
              {formatLargeNumber(ctx.dataFiltered.length)}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="person" title={m.individuals}>
              {formatLargeNumber(ctx.dataFlatFiltered.length)}
            </SlideWidget>
            <SlideWidget sx={{flex: 1}} icon="group" title={m.hhSize}>
              {(ctx.dataFlatFiltered.length / ctx.dataFiltered.length).toFixed(1)}
            </SlideWidget>
          </Div>
        </Div>
        <Div column>
          <Div sx={{alignItems: 'stretch'}}>
            <SlideWidget sx={{flex: 1}} icon="elderly" title={m.avgAge}>
              <Lazy deps={[ctx.dataFiltered]} fn={() => ctx.dataFlat.map(_ => _.age).compact().sum() / ctx.dataFlat.length}>
                {_ => _.toFixed(1)}
              </Lazy>
            </SlideWidget>
            <SlidePanel BodyProps={{sx: {p: '0px !important'}}} sx={{flex: 1, m: 0, display: 'flex', alignItems: 'center', pl: 2,}}>
              <Lazy deps={[ctx.dataFiltered]} fn={() => ChartHelper.percentage({
                data: ctx.dataFlat,
                value: _ => _.gender === 'Female'
              })}>
                {_ => (
                  <ChartPieWidget dense value={_.value} base={_.base} title={m.females}/>
                )}
              </Lazy>
            </SlidePanel>
            <SlidePanel BodyProps={{sx: {p: '0px !important'}}} sx={{flex: 1, m: 0, display: 'flex', alignItems: 'center', pl: 2,}}>
              <ChartPieWidgetByKey
                dense
                title={m.uaCitizen}
                data={ctx.dataFiltered}
                property="if_ukrainian_do_you_or_your_household_members_identify_as_member_of_a_minority_group"
                filterBase={_ => _ !== 'unable_unwilling_to_answer'}
                filter={_ => _ === 'no'}
              />
              {/*<Lazy deps={[data]} fn={() => ChartTools.percentage({*/}
              {/*  data,*/}
              {/*  value: _ => _.if_ukrainian_do_you_or_your_household_members_identify_as_member_of_a_minority_group === 'no'*/}
              {/*})}>*/}
              {/*  {_ => (*/}
              {/*    <PieChartIndicator value={_.percent} title={m.uaCitizenShip}/>*/}
              {/*  )}*/}
              {/*</Lazy>*/}
            </SlidePanel>

            {/*<SlideWidget sx={{flex: 1}} icon="my_location" title={m.coveredOblasts}>*/}
            {/*  <Lazy deps={[data]} fn={() => ctx.dataFiltered.distinct(_ => _.where_are_you_current_living_oblast).length}>*/}
            {/*    {_ => _}*/}
            {/*  </Lazy>*/}
            {/*</SlideWidget>*/}
          </Div>
        </Div>
      </Div>
      <Div alignItems="flex-start" responsive>
        <Div column>
          <SlidePanel title={m.HHsLocation}>
            <MapSvg data={ctx.byCurrentOblast} sx={{mx: 1}} base={ctx.dataFiltered.length}/>
          </SlidePanel>
          <SlidePanel title={m.disaggregation}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 2}}>
              <IpSelectSingle placeholder={m.ageGroup} sx={{mr: 1}} hideNullOption value={ag} options={Obj.keys(Person.ageGroup)} onChange={e => setAg(e)}/>
              <ScRadioGroup value={agDisplay} onChange={setAgDisplay} dense inline>
                <ScRadioGroupItem
                  dense hideRadio
                  value="table"
                  title={<Icon color="disabled" sx={{marginBottom: '-5px', fontSize: '20px !important'}}>calendar_view_month</Icon>}
                />
                <ScRadioGroupItem
                  dense hideRadio value="chart"
                  title={<Icon color="disabled" sx={{marginBottom: '-5px', fontSize: '20px !important'}}>align_horizontal_left</Icon>}
                />
              </ScRadioGroup>
            </Box>
            <Lazy deps={[ctx.dataFiltered, agDisplay, ag]} fn={() => ctx.ageGroup(ctx.dataFiltered, Person.ageGroup[ag])}>
              {_ => agDisplay === 'chart' ? (
                <ChartBarStacker data={_} height={250}/>
              ) : (
                <Datatable
                  id="prot-dash-population"
                  sx={{border: t => `1px solid ${t.palette.divider}`, overflow: 'hidden', borderRadius: t => t.shape.borderRadius + 'px'}}
                  hidePagination
                  data={_}
                  columns={[
                    {
                      width: 0,
                      id: 'Group',
                      head: m.ageGroup,
                      type: 'select_one',
                      renderQuick: _ => _.key
                    },
                    {
                      width: 0,
                      id: 'Male',
                      head: m.male,
                      type: 'number',
                      render: _ => {
                        return {
                          label: formatLargeNumber(_.Male),
                          value: _.Male
                        }
                      }
                    },
                    {
                      width: 0,
                      id: 'Female',
                      head: m.female,
                      type: 'number',
                      render: _ => {
                        return {
                          label: formatLargeNumber(_.Female),
                          value: _.Female
                        }
                      }
                    },
                    {
                      width: 0,
                      id: 'Other',
                      head: m.other,
                      type: 'number',
                      render: _ => {
                        return {
                          label: formatLargeNumber(_.Other ?? 0),
                          value: _.Other
                        }
                      }
                    },
                  ]}
                />
                // <Box component="table" sx={css.table}>
                //   <tr>
                //     <td></td>
                //     <td>{m.female}</td>
                //     <td>{m.male}</td>
                //     <td>{m.other}</td>
                //   </tr>
                //   {_.map(k =>
                //     <tr key={k.key}>
                //       <td>{k.key}</td>
                //       <td>{k.Female}</td>
                //       <td>{k.Male}</td>
                //       <td>{k.Other}</td>
                //     </tr>
                //   )}
                //   <tr>
                //     <td><b>{m.total}</b></td>
                //     <td><b>{_.reduce((acc, _) => acc + (_.Female ?? 0), 0)}</b></td>
                //     <td><b>{_.reduce((acc, _) => acc + (_.Male ?? 0), 0)}</b></td>
                //     <td><b>{_.reduce((acc, _) => acc + (_.Other ?? 0), 0)}</b></td>
                //   </tr>
                // </Box>
              )}
            </Lazy>
          </SlidePanel>
        </Div>
        <Div column>
          <SlidePanel title={m.poc}>
            <Lazy
              deps={[ctx.dataFiltered]}
              fn={() => chain(ChartHelperOld.single({
                data: ctx.dataFiltered.map(_ => _.do_you_identify_as_any_of_the_following).compact(),
              }))
                .map(ChartHelperOld.sortBy.value)
                .map(ChartHelperOld.setLabel(Protection_hhs3.options.do_you_identify_as_any_of_the_following))
                .get()}
            >
              {_ => <ChartBar data={_}/>}
            </Lazy>
          </SlidePanel>
          <SlidePanel>
            <Lazy deps={[ctx.dataFiltered, ctx.dataPreviousPeriod]} fn={(d) => ChartHelper.percentage({
              data: d
                .map(_ => _.do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household)
                .compact()
                .filter(_ => !_.includes('unable_unwilling_to_answer')),
              value: _ => !_.includes('no_specific_needs'),
            })}>
              {(_, last) => <ChartPieWidget sx={{mb: 2}} title={m.protHHS2.HHSwSN} value={_.value} base={_.base} evolution={_.percent - last.percent}/>}
            </Lazy>
            <ChartBarMultipleBy
              data={ctx.dataFiltered}
              by={_ => _.do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household}
              filterValue={['no_specific_needs', 'unable_unwilling_to_answer', 'other_specify']}
              label={Protection_hhs3.options.do_any_of_these_specific_needs_categories_apply_to_the_head_of_this_household}
            />
          </SlidePanel>
          <SlidePanel title={m.protHHS2.hhTypes}>
            <ChartBarSingleBy
              data={ctx.dataFiltered}
              by={_ => _.what_is_the_type_of_your_household}
              label={Protection_hhs3.options.what_is_the_type_of_your_household}
            />
          </SlidePanel>

          {/*<SlidePanel title={m.protHHS2.ethnicMinorities}>*/}
          {/*<DashboardProtHHS2BarChart*/}
          {/*  data={ctx.dataFiltered}*/}
          {/*  question="if_ukrainian_do_you_or_your_household_members_identify_as_member_of_a_minority_group"*/}
          {/*  filterValue={[*/}
          {/*    'no',*/}
          {/*    'unable_unwilling_to_answer'*/}
          {/*  ]}*/}
          {/*/>*/}
          {/*</SlidePanel>*/}
        </Div>
      </Div>
    </Div>
  )
}