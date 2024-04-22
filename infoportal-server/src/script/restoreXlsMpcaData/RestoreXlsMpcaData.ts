import * as csvToJson from 'csvtojson'
import fs from 'fs'
import {appConf} from '../../core/conf/AppConf'
import {ApiClient} from '../../core/client/ApiClient'
import {seq} from '@alexandreannic/ts-utils'
import {MpcaEntity} from '@infoportal-common'
import {differenceInDays} from 'date-fns'

interface XLSD {
  donor: string
  playlist: string
  passing_to_afo_date: string
  payment_date: Date
  protection_ref: string
  surname_en: string
  surname_ua: string
  name_en: string
  name_ua: string
  patronymic_en: string
  patronymic_ua: string
  idp_status: string
  amount_transfer_uah: number
  mpca: string
  cfr: string
  startup_uah: string
  hh_size: string
  months: string
  passport_serial: string
  passport_number: string
  tax_id: string
  phone: string
}

(async () => {
  const dbData = await new ApiClient({baseUrl: 'http://localhost:5001'}).post('/mpca/search').then((_: {data: any[]}) => {
    return seq(_.data.map(d => {
      return {
        ...d,
        date: new Date(d.date),
      }
    }) as MpcaEntity[])
  })
  const indexByTax = dbData.groupBy(_ => _.taxId ?? '')
  const stream = fs.createReadStream(appConf.rootProjectDir + '/src/script/restoreXlsMpcaData/mpca-data_not_in_kobo_oleh_vyshnevskyi.csv')
  const json: XLSD[] = await csvToJson.default({delimiter: ';'}).fromStream(stream).then((_: Record<keyof XLSD, string>[]) => _.map(x => {
    if (!x.payment_date) throw new Error('missing date')
    const [d, m, y] = x.payment_date?.split('.')
    return {
      ...x,
      payment_date: new Date(+y, +m - 1, +d),
      amount_transfer_uah: +x.amount_transfer_uah!,
    }
  }))

  const errors: any[] = []
  const res = seq(json)
    .map(_ => {
      const db = indexByTax[_.tax_id]
      if (!db) return
      const dbCloser = db.sort((a, b) => Math.abs(differenceInDays(_.payment_date, a.date) - differenceInDays(_.payment_date, b.date)))[0]
      if (_.tax_id === '') return
      if (dbCloser.amountUahSupposed === _.amount_transfer_uah || dbCloser.amountUahFinal === _.amount_transfer_uah) return
      return {
        taxId: _.tax_id,
        date: _.payment_date,
        xlsAmount: _.amount_transfer_uah,
        dbdate: dbCloser.date,
        dbamount: dbCloser.amountUahSupposed,
        dbAmountFinal: dbCloser.amountUahFinal,
        dayDiff: differenceInDays(_.payment_date, dbCloser.date),
        count: db.length,
      }
    })
    .compact()
    .sort((b, a) => a.dayDiff - b.dayDiff)
    // .sortByNumber(_ => _.dayDiff, '0-9')
    // .sortByNumber(_ => _.dayDiff, '9-0')
    .get()
  // console.log(errors)
  // console.log(errors.length)
  console.table(res)
  console.log(res.length)
  // console.log(json.length - res.length)
})()
