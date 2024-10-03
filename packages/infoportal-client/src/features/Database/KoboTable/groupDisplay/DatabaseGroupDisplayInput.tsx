import {IpBtn, IpBtnProps, PopoverWrapper, Txt} from '@/shared'
import React from 'react'
import {Box, Icon, useTheme} from '@mui/material'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {ipSelectItem, IpSelectSingle} from '@/shared/Select/SelectSingle'
import {Obj} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'

export const DatabaseGroupDisplayInput = (props: IpBtnProps) => {
  const t = useTheme()
  const {m} = useI18n()
  const {schema, groupDisplay} = useDatabaseKoboTableContext()
  return (
    <PopoverWrapper content={() => (
      <Box sx={{p: 1, minWidth: 120, width: 320}}>
        <Txt color="hint" sx={{mb: .5}} fontSize="small" block>{m._koboDatabase.repeatAs}</Txt>
        <ScRadioGroup dense value={groupDisplay.repeatAs} onChange={groupDisplay.setRepeatAs}>
          <ScRadioGroupItem value={null} title={m._koboDatabase.repeatDont}/>
          <ScRadioGroupItem value="rows" title={m._koboDatabase.repeatAsRows}/>
          <ScRadioGroupItem value="columns" title={m._koboDatabase.repeatAsColumn}/>
        </ScRadioGroup>
        {groupDisplay.repeatAs === 'rows' && (
          <>
            <Txt color="hint" sx={{mt: 1.5, mb: .5}} fontSize="small" block>{m._koboDatabase.repeatAsQuestionName}</Txt>
            <IpSelectSingle
              value={groupDisplay.repeatedQuestion}
              renderValue={_ => schema.translate.question(_)!}
              onChange={_ => groupDisplay.setRepeatedQuestion(_ ?? undefined)}
              options={Obj.keys(schema.schemaHelper.groupSchemas).map(_ =>
                ipSelectItem({
                  value: _,
                  title: schema.translate.question(_),
                  desc: _,
                }),
              )}
            />
          </>
        )}
      </Box>
    )}>
      <IpBtn
        variant="input"
        color="inherit"
        children={<Icon sx={{transform: 'rotate(180deg)', marginRight: '-8px'}}>move_up</Icon>}
        endIcon={<Icon sx={{color: t.palette.text.secondary}}>arrow_drop_down</Icon>}
        {...props}
      />
    </PopoverWrapper>
  )
}