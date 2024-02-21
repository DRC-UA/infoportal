import {Enum, seq, Seq} from '@alexandreannic/ts-utils'
import {ChartHelperOld} from '@/shared/charts/chartHelperOld'
import {KoboProtection_hhs3, Person} from '@infoportal-common'
import Gender = Person.Gender

export const getProtHhsIptData = (data?: Seq<KoboProtection_hhs3.T>) => {
  const csv: {base: string, gender: string, ageGroup: string, total: number}[] = []
  const flatData = data?.flatMap(_ => _.persons.map(p => ({..._, ...p})))
  const mapOffice = {
    chernihiv: 'Central',
    dnipro: 'East',
    kharkiv: 'East',
    lviv: 'West',

    mykolaiv: 'South',
    sumy: 'East'
  }

  if (flatData) {
    const byOffice = flatData
      ?.filter(_ =>
        _.staff_to_insert_their_DRC_office === 'chernihiv' ||
        _.staff_to_insert_their_DRC_office === 'dnipro' ||
        _.staff_to_insert_their_DRC_office === 'kharkiv' ||
        _.staff_to_insert_their_DRC_office === 'lviv'
      )
      .groupBy(_ => _.staff_to_insert_their_DRC_office!)
    Enum.entries(ChartHelperOld.sortBy.custom(['dnipro', 'kharkiv', 'chernihiv', 'lviv'])(byOffice)).forEach(([base, v]) => {
      Enum.entries(ChartHelperOld.sortBy.custom([Gender.Male, Gender.Female])(
        seq(v)
          // .filter(_ => _.gender === 'male' || _.gender === 'female')
          .groupBy(_ => _.gender!))
      ).forEach(([gender, genderV]) => {
        const byAge = seq(genderV).groupBy(_ => Person.groupByAgeGroup(Person.ageGroup.BHA)(_, p => p.age!)!)
        const byAgeFilled = {
          '0 - 4': byAge['0 - 4'] ?? [],
          '5 - 9': byAge['5 - 9'] ?? [],
          '10 - 14': byAge['10 - 14'] ?? [],
          '15 - 18': byAge['15 - 18'] ?? [],
          '19 - 29': byAge['19 - 29'] ?? [],
          '30 - 59': byAge['30 - 59'] ?? [],
          '60+': byAge['60+'] ?? [],
        }
        Enum.entries(byAgeFilled).forEach(([ageGroup, ageV]) => {
          csv.push({
            base,
            gender,
            ageGroup: ageGroup + ' years',
            total: ageV.length
          })
        })
        csv.push({
          base,
          gender,
          ageGroup: 'Disaggregates Not Available',
          total: 0,
        })
        csv.push({
          base,
          gender,
          ageGroup: 'total',
          total: genderV.length,
        })
      })
      csv.push({
        base,
        gender: 'total',
        ageGroup: 'total',
        total: v.length,
      })
    })
    csv.push({
      base: 'total',
      gender: 'total',
      ageGroup: 'total',
      total: flatData.length,
    })
    return toCsv(csv)
  }
}
const toCsv = (data: {base: string, gender: string, ageGroup: string, total: number}[]) => {
  return data.map(row => Object.values(row).map(_ => `"${_}"`).join(',')).join('\n')
}