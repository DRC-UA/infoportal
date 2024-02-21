import {novemberDmytro} from './2023-12-11-ecrec-paiement'
import {PrismaClient} from '@prisma/client'
import {KoboService} from '../feature/kobo/KoboService'
import {KoboMappedAnswersService} from '../feature/kobo/KoboMappedAnswersService'
import {Enum, seq} from '@alexandreannic/ts-utils'
import {KoboIndex} from '@infoportal-common'
import {EcrecCashRegistrationPaymentStatus, EcrecCashRegistrationTags} from '../db/koboForm/DbHelperEcrecCashRegistration'

export const updateTags = async () => {
  const prisma = new PrismaClient()
  const koboService = new KoboService(prisma)
  const mapped = new KoboMappedAnswersService(prisma)
  const allecrec = await mapped.searchBn_ecrecCashRegistration().then(_ => {
    const gb = seq(_.data).groupBy(_ => _.pay_det_tax_id_num ?? '')
    return new Enum(gb).transform((k, v) => {
      // if (v.length > 1) throw new Error(k + ' ' + v.length)
      return [k, v[0].id]
    }).get()
  })

  for (const xlsRow of novemberDmytro.flat()) {
    const id = allecrec[xlsRow.taxid]
    const tag: EcrecCashRegistrationTags = {
      program: xlsRow.program,
      paidUah: xlsRow.amount,
      status: EcrecCashRegistrationPaymentStatus.Paid,
    }
    console.log(xlsRow.taxid, id)
    await koboService.updateTags({
      answerIds: [id],
      formId: KoboIndex.byName('ecrec_cashRegistration').id,
      tags: tag
    })
  }
  novemberDmytro
}

updateTags()