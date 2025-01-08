import {IKoboMeta, Person} from 'infoportal-common'

export type ProtectionActivityFlat = Omit<IKoboMeta, 'persons'> & Person.Details
