import {useMemo, type FC} from 'react'
import {Box} from '@mui/material'

import {formatLargeNumber, useI18n} from '@/core/i18n'
import {Panel, PanelBody} from '@/shared/Panel'

import type {CashIndividualsProps} from './types'

export const CashIndividuals: FC<CashIndividualsProps> = ({data}) => {
  const {m} = useI18n()

  const {households, individuals} = useMemo(() => {
    const households = data.length
    const individuals = data
      .map(({familySize}) => familySize)
      .compact()
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
