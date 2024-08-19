import {IKoboMeta, PersonDetails} from 'infoportal-common'

export type ProtectionActivityFlat  = Omit<IKoboMeta, 'persons'> & PersonDetails