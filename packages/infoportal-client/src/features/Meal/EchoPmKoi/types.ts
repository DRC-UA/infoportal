import {DrcProject, Person} from 'infoportal-common'

import {prepareTableData} from './tools'

type AnswerOptions = 'yes' | 'no' | 'dk' | 'na'

type EchoPmKoiRecord = {
  source: string
  gender: Person.Gender | undefined
  age: number | undefined
  disability: boolean | undefined
  date: Date | undefined
  project: DrcProject | undefined
  answers: {
    sdh1: AnswerOptions
    sdh2: AnswerOptions
    mea1: AnswerOptions
    mea2: AnswerOptions
    acc1: AnswerOptions
    acc2: AnswerOptions
    pem1: AnswerOptions
    pem2: AnswerOptions
  }
}

type EchoPmKoiTableData = ReturnType<typeof prepareTableData>

type DateRange = [Date | undefined, Date | undefined]

export type {EchoPmKoiRecord, EchoPmKoiTableData, DateRange}
