import type {Seq} from '@axanc/ts-utils'

import {Person, Protection_pss} from 'infoportal-common'

interface ProtectionPssWithPersons extends Protection_pss.T {
  id: string
  persons: Person.Details[]
}

type ProtectionPssWithPersonsFlat = ProtectionPssWithPersons & Person.Details

export type {ProtectionPssWithPersons, ProtectionPssWithPersonsFlat}
