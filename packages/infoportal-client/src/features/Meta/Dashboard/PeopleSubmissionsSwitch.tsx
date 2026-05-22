import type {FC, ChangeEvent} from 'react'
import {Box, Switch, Typography} from '@mui/material'

import {useI18n} from '@/core/i18n'

interface PeopleSubmissionsSwitchProps {
  dataSource: 'submissions' | 'people'
  toggleDataSource: (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

const PeopleSubmissionsSwitch: FC<PeopleSubmissionsSwitchProps> = ({dataSource, toggleDataSource}) => {
  const {m} = useI18n()

  return (
    <Box display="flex" flexDirection="row" gap={1}>
      <Typography>{m.submissions}</Typography>
      <Switch size="small" value={dataSource} color="primary" onChange={toggleDataSource} />
      <Typography>{m.people}</Typography>
    </Box>
  )
}

export default PeopleSubmissionsSwitch
