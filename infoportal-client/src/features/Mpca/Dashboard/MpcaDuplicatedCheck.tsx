import {MpcaEntity} from '@infoportal-common'
import {Enum, Seq, seq} from '@alexandreannic/ts-utils'
import {Sheet} from '@/shared/Sheet/Sheet'
import React, {ReactNode, useMemo, useState} from 'react'
import {useI18n} from '@/core/i18n'
import {SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Tooltip} from '@mui/material'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {Datatable} from '@/shared/Datatable/Datatable'

enum Type {
  'phone' = 'phone',
  'taxId' = 'taxId',
  'taxId+phone' = 'taxId+phone',
}

export const MpcaDuplicatedCheckPanel = ({
  data
}: {
  data: Seq<MpcaEntity>
}) => {
  const {m} = useI18n()
  const [type, setType] = useState<Type>(Type.phone)
  return (
    <SlidePanel title={m.mpca.duplicationCheck}>
      <MpcaDuplicatedCheck
        header={
          <ScRadioGroup value={type} onChange={setType} inline dense>
            {Enum.values(Type).map(_ =>
              <ScRadioGroupItem hideRadio value={_} key={_} title={_}/>
            )}
          </ScRadioGroup>
        }
        data={data}
        property={type}
        fn={_ => {
          if (type === Type['taxId+phone'])
            if (_.phone && _.taxId) return _.phone + '+' + _.taxId
          return (_ as any)[type]
        }}/>
    </SlidePanel>
  )
}

export const MpcaDuplicatedCheck = ({
  data,
  property,
  fn,
  header,
}: {
  header: ReactNode
  property: string //keyof MpcaEntity
  fn: (_: MpcaEntity) => string
  data: Seq<MpcaEntity>
}) => {
  const {m, formatDate} = useI18n()
  const res = useMemo(() => {
    const gb = data
      // .compactBy(property)
      // .groupBy(_ => (_ as any)[property])
      .groupBy(fn)
    return seq(Enum.entries(gb)).map(([k, v]) => ({
      key: k,
      count: v.length,
      list: v,
    }))
      .filter(_ => _.count > 1 && _.key !== 'undefined')
      // .sortByNumber(_ => _.count, '9-0')
      .sort((a, b) => {
        return b.count - a.count
      })
  }, [property, data])
  return (
    <Datatable
      className="ip-border"
      header={header}
      id={'mpca-duplicate-' + property}
      data={res}
      columns={[
        {
          type: 'select_one',
          id: property,
          head: property,
          renderQuick: _ => _.key,
          width: 80,
        },
        {
          type: 'number',
          id: 'count',
          head: m.count,
          renderQuick: _ => _.count,
          width: 10,
        },
        {
          id: 'oblast',
          type: 'select_multiple',
          head: m.oblast,
          options: () => SheetUtils.buildOptions(res.flatMap(_ => _.list.map(_ => _.oblast)).distinct(_ => _).compact()),
          render: _ => {
            const offices = _.list?.map(_ => _.oblast).distinct(_ => _) ?? []
            return {
              label: _.list?.map(x => x.oblast) as string[],
              value: _.list?.map(x => x.oblast) as string[],
              tooltip: offices.map(_ => [null, undefined, 'null', 'undefined', ''].includes(_) ? '""' : _).join(', ')
            }
          }
        },
        {
          id: 'enumerator',
          type: 'string',
          head: m.enumerator,
          render: _ => {
            const enumerators = _.list?.map(_ => _.enumerator).distinct(_ => _) ?? []
            const enumeratorString = enumerators.join(', ')
            return {
              label: enumeratorString,
              value: enumeratorString,
              tooltip: enumerators.map(_ => [null, undefined, 'null', 'undefined', ''].includes(_) ? '""' : _).join(', ')
            }
          }
        },
        {
          id: 'date',
          head: m.date,
          renderQuick: _ => {
            const dates = _.list.map(_ => formatDate(_.date))
            return (
              <Tooltip title={<>{dates.map(_ => <>{_}<br/></>)}</>}>
                <div>{dates.join(', ')}</div>
              </Tooltip>
            )
          },
        },
      ]}
    />
  )
}