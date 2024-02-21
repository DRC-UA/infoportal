import {SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {Enum, fnSwitch, Seq} from '@alexandreannic/ts-utils'
import {DrcProject, Partnership_partnersDatabase} from '@infoportal-common'
import React, {useState} from 'react'
import {PartnershipData} from '@/features/Partnership/PartnershipType'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {useI18n} from '@/core/i18n'
import {ChartBarSingleBy} from '@/shared/charts/ChartBarSingleBy'

export const PanershipPanelDonor = ({
  data,
}: {
  data: Seq<PartnershipData>
}) => {
  const {m} = useI18n()
  const [mode, setMode] = useState<'project' | 'donor'>('donor')
  return (
    <SlidePanel>
      <ScRadioGroup inline dense value={mode} onChange={setMode}>
        <ScRadioGroupItem hideRadio value="donor">{m.donor}</ScRadioGroupItem>
        <ScRadioGroupItem hideRadio value="project">{m.project}</ScRadioGroupItem>
      </ScRadioGroup>
      {fnSwitch(mode, {
        donor: (
          <ChartBarSingleBy data={data.flatMap(_ => _.group_vi2hh32).compact()} label={Partnership_partnersDatabase.options.Donor} by={_ => _.Donor!}/>
        ),
        project: (
          <ChartBarSingleBy
            data={data.flatMap(_ => _.group_vi2hh32).compact()}
            by={_ => Enum.values(DrcProject).find(p => p.includes('' + _.Project_code!))!}
          />
        )
      })}
      {/*<Lazy deps={[data]} fn={() => {*/}
      {/*  return ChartTools.single({*/}
      {/*    data: data.flatMap(_ => _.group_vi2hh32?.map(_ => _.Donor)).compact(),*/}
      {/*  })*/}
      {/*}}>*/}
      {/*  {_ => <HorizontalBarChartGoogle data={_}/>}*/}
      {/*</Lazy>*/}
    </SlidePanel>
  )
}