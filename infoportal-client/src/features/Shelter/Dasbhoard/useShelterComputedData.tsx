import {fnSwitch, Seq} from '@alexandreannic/ts-utils'

import {ShelterEntity} from '@/core/sdk/server/shelter/ShelterEntity'
import {Person} from '@infoportal-common'
import {useMemo} from 'react'

export const collectXlsKoboIndividuals = (data: Seq<ShelterEntity>): any[] => {
  return data.flatMap(row => {
    if (!row.nta) return [];
    const individuals = [
      ...(row.nta.hh_char_hh_det ?? []),
      {
        // ben_det_res_stat: row.nta.ben_det_res_stat,
        // hh_char_hh_det_dis_level: row.nta.hh_char_hhh_dis_level,
        // hh_char_hh_det_dis_select: row.nta.hh_char_hhh_dis_select,
        hh_char_hh_det_age: row.nta.hh_char_res_age,
        hh_char_hh_det_gender: row.nta.hh_char_res_gender,
      },
    ];
    return individuals;
  });
};

export type UseShelterComputedData = ReturnType<typeof useShelterComputedData>

export const useShelterComputedData = ({
  data
}: {
  data?: Seq<ShelterEntity>
}) => {
  return useMemo(() => {
    if (!data) return;

    // Use the collectXlsKoboIndividuals function to standardize data collection
    const individuals = collectXlsKoboIndividuals(data);

  const persons: Person.Person[] = individuals.map(row => ({
    // stat: row.ben_det_res_stat,
    // level: row.hh_char_hh_det_dis_level,
    // select: row.hh_char_hh_det_dis_select,
    age: row.hh_char_hh_det_age,
    gender: fnSwitch(row.hh_char_hh_det_gender!, {
      male: Person.Gender.Male,
      female: Person.Gender.Female,
    }, () => undefined)
  }));
  console.log("Persons:", individuals)
    return {
      persons,
    }
  }, [data])
}
