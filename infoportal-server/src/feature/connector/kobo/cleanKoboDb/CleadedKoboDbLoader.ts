import * as csvToJson from 'csvtojson/v2'
import {KoboSdk} from '../KoboClient/KoboSdk'
import * as fs from 'fs'
import {lazy} from '@alexandreannic/ts-utils'
import {appConf} from '../../../../core/conf/AppConf'

const metaColumns = [
  '_id',
]
export const getCsv = lazy(async (koboSdk: KoboSdk): Promise<any[]> => {
  const stream = fs.createReadStream(appConf.rootProjectDir + '/src/connector/kobo/cleanKoboDb/cleaned-kobo-db.csv')
  const csv = await csvToJson.default({}).fromStream(stream)
  const form = await koboSdk.getForm('aFU8x6tHksveU2c3hK7RUG')
  return csv
    .filter(_ => _._validation_status !== 'Not validated')
    .map(row => {
      Object.keys(row).forEach(column => {
        if ([
          '_4_What_oblast_are_you_from',
          '_4_1_What_raion_in_Ch_currently_living_in',
          '_4_2_What_raion_in_Ch_currently_living_in',
          '_4_3_What_raion_in_Ch_currently_living_in',
          '_4_4_What_raion_in_Av_currently_living_in',
          '_4_5_What_raion_in_Vo_currently_living_in',
          '_4_6_What_raion_in_Dn_currently_living_in',
          '_4_7_What_raion_in_Do_currently_living_in',
          '_4_8_What_raion_in_Vi_currently_living_in',
          '_4_9_What_raion_in_Se_currently_living_in',
          '_4_10_What_raion_in_Z_currently_living_in',
          '_4_11_What_raion_in_Z_currently_living_in',
          '_4_12_What_raion_in_Z_currently_living_in',
          '_4_13_What_raion_in_A_currenrtly_living_in',
          '_4_14_What_raion_in_I_currently_living_in',
          '_4_15_What_raion_in_K_currently_living_in',
          '_4_16_What_raion_in_K_currently_living_in',
          '_4_17_What_raion_in_K_currently_living_in',
          '_4_18_What_raion_in_K_hradska_are_you_from',
          '_4_19_What_raion_in_K_currently_living_in',
          '_4_20_What_raion_in_L_currently_living_in',
          '_4_21_What_raion_in_L_currently_living_in',
          '_4_22_What_raion_in_M_currently_living_in',
          '_4_23_What_raion_in_O_currently_living_in',
          '_4_24_What_raion_in_P_currently_living_in',
          '_4_25_What_raion_in_R_currently_living_in',
          '_4_26_What_raion_in_S_currently_living_in',
          '_4_27_What_raion_in_T_currently_living_in',
        ].includes(column)) {
          return
        }
        const schema = form.content.survey.find(_ => _.name === column)
        if (!schema) {
          if (metaColumns.includes(column)) {
            return
          }
          delete row[column]
          return
        }
        if (schema.select_from_list_name) {
          const choices = form.content.choices.filter(_ => _.list_name === schema.select_from_list_name)
          choices.forEach(c => {
            row[column] = row[column].replaceAll(c.label[0], c.name)
          })
        }
      })
      return row
    }).map(row => {
      Object.keys(row).forEach(k => {
        if (row[k] === '') {
          row[k] = undefined
        }
      })
      return row
    })
})
