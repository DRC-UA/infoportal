import {PanelHead} from '@/shared/Panel'
import {PanelBody, Txt} from 'mui-extension'
import React, {useMemo} from 'react'
import {Popover} from '@mui/material'
import {getColumnBySchema} from '@/features/Database/KoboTable/getColumnBySchema'
import {useI18n} from '@/core/i18n'
import {KoboAnswer} from '@/core/sdk/server/kobo/Kobo'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {Datatable} from '@/shared/Datatable/Datatable'

export const DatabaseKoboTableGroupModal = ({
  groupData,
  name,
  onClose,
  anchorEl,
}: {
  groupData: KoboAnswer[],
  name: string
  onClose: () => void
  anchorEl: any,
}) => {
  const {m} = useI18n()
  const ctx = useDatabaseKoboTableContext()

  const columns = useMemo(() => {
    return getColumnBySchema({
      data: groupData,
      m,
      schema: ctx.schema.schemaHelper.groupSchemas[name],
      translateQuestion: ctx.schema.translate.question,
      translateChoice: ctx.schema.translate.choice,
      choicesIndex: ctx.schema.schemaHelper.choicesIndex,
      groupSchemas: ctx.schema.schemaHelper.groupSchemas,
    })
  }, [ctx.schema.schemaUnsanitized])

  return (
    <Popover open={!!anchorEl} anchorEl={anchorEl} onClose={onClose}>
      <PanelHead>
        <Txt block sx={{maxWidth: 400}} truncate>{ctx.schema.translate.question(name)}</Txt>
      </PanelHead>
      <PanelBody>
        <Datatable columns={columns} data={groupData} id={name}/>
      </PanelBody>
    </Popover>
  )
}