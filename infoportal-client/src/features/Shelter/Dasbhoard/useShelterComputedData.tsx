import {useMemo} from 'react'
import {fnSwitch, Seq} from '@alexandreannic/ts-utils'

import {ShelterEntity} from '@/core/sdk/server/shelter/ShelterEntity'
import {Person} from '@infoportal-common'

export type UseShelterComputedData = ReturnType<typeof useShelterComputedData>

export const useShelterComputedData = ({
  data
}: {
  data?: Seq<ShelterEntity>
}) => {
  return useMemo(() => {
    if (!data) return
    const persons: Person.Person[] = data
      .flatMap(row => !row.nta ? [] : [...(row.nta.hh_char_hh_det ?? []), {
        hh_char_hh_det_age: row.nta.hh_char_res_age,
        hh_char_hh_det_gender: row.nta.hh_char_res_gender,
      }])
      .map(row => ({
        age: row.hh_char_hh_det_age,
        gender: fnSwitch(row.hh_char_hh_det_gender!, {
          male: Person.Gender.Male,
          female: Person.Gender.Female,
        }, () => undefined)
      }))
    return {
      persons,
    }
  }, [data])
}