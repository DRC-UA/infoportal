import type {Dispatch, SetStateAction} from 'react'

import {Legal_individual_aid, KoboSubmissionFlat, KoboBaseTags} from 'infoportal-common'

import {DataFilter} from '@/shared/DataFilter/DataFilter'

type Period = {start?: Date; end?: Date}

interface FiltersProps {
  shapes: Record<string, DataFilter.Shape<KoboSubmissionFlat<Legal_individual_aid.T, KoboBaseTags>, string>>
  filters: Record<string, string[] | undefined>
  setOptionFilters: Dispatch<SetStateAction<Record<string, string[] | undefined>>>
  setCasePeriod: Dispatch<SetStateAction<Period>>
  casePeriod?: Period
  caseClosurePeriod?: Period
  setCaseClosurePeriod: Dispatch<SetStateAction<Period>>
}

export type {FiltersProps}
