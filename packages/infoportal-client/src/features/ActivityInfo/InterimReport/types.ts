import {type IKoboMeta, Person} from 'infoportal-common'

type FlatMetaPersonRecord = Pick<IKoboMeta, 'id' | 'sector' | 'oblast' | 'raion' | 'hromada' | 'lastStatusUpdate'> & {
  displacement: Person.DisplacementStatus | undefined
}

export type {FlatMetaPersonRecord}
