import React, {useMemo} from 'react'
import {Box} from '@mui/material'
import {Seq, seq} from '@axanc/ts-utils'
import {formatLargeNumber, useI18n} from '@/core/i18n'
import {CashPdmData} from '@/features/Meal/Cash/Context/CashContext'
import {Meal_cashPdm} from 'infoportal-common'
import {Panel, PanelBody} from '@/shared/Panel'

type Props = {data: Seq<CashPdmData<Meal_cashPdm.T>>}

export const CashIndividuals: React.FC<Props> = ({data}) => {
  const {m} = useI18n()

  const {households, individuals} = useMemo(() => {
    const households = seq(data).length
    const individuals = seq(data)
      .map((_) => (_.answers.number_male ?? 0) + (_.answers.number_female ?? 0))
      .sum()
    return {households, individuals}
  }, [data])

  return (
    <Panel>
      <PanelBody>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
          {[
            {icon: 'fingerprint', label: m.households, value: households},
            {icon: 'person', label: m.individuals, value: individuals},
          ].map(({icon, label, value}) => (
            <Box key={label} display="flex" flexDirection="column" alignItems="center" flex={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <span className="material-icons" style={{fontSize: 20, color: '#555'}}>
                  {icon}
                </span>
                <strong style={{fontSize: 18}}>{formatLargeNumber(value)}</strong>
              </Box>
              <Box fontSize={12} mt={0.5} textAlign="center">
                {label.toUpperCase()}
              </Box>
            </Box>
          ))}
        </Box>
      </PanelBody>
    </Panel>
  )
}
