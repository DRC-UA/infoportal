import {MpcaPaymentTool, MpcaPaymentToolAnswers, PrismaClient} from '@prisma/client'
import {UUID} from 'infoportal-common'
import {MpcaPaymentEntity, MpcaPaymentUpdate} from './MpcaPayment'

const mapPayment = ({answers, ..._}: MpcaPaymentTool & {answers: MpcaPaymentToolAnswers[]}): MpcaPaymentEntity => ({
  id: _.id ?? undefined,
  name: _.name ?? undefined,
  index: _.index ?? undefined,
  budgetLineMPCA: _.budgetLineMPCA ?? undefined,
  budgetLineCFR: _.budgetLineCFR ?? undefined,
  budgetLineStartUp: _.budgetLineStartUp ?? undefined,
  headOfOperation: _.headOfOperation ?? undefined,
  cashAndVoucherAssistanceAssistant: _.cashAndVoucherAssistanceAssistant ?? undefined,
  financeAndAdministrationOfficer: _.financeAndAdministrationOfficer ?? undefined,
  city: _.city ?? undefined,
  createdAt: _.createdAt ?? undefined,
  updatedAt: _.updatedAt ?? undefined,
  answers: answers.map(a => a.koboAnswersId)
})

export class MpcaPaymentService {

  constructor(
    private prisma: PrismaClient,
  ) {
  }

  /**
   * TODO Optimize!
   */
  readonly create = async (answerIds: string[]) => {
    const tool = await this.prisma.mpcaPaymentTool.create({data: {}})
    await Promise.all(answerIds.map(_ =>
      this.prisma.mpcaPaymentToolAnswers.createMany({
        data: {
          mpcaPaymentToolId: tool.id,
          koboAnswersId: _
        }
      })
    ))
    return tool
  }

  readonly getById = async (id: UUID) => {
    return this.prisma.mpcaPaymentTool.findFirst({
      where: {
        id,
      },
      include: {answers: true}
    }).then(_ => _ ? mapPayment(_) : undefined)
  }

  readonly getAll = async () => {
    return this.prisma.mpcaPaymentTool.findMany({
      include: {answers: true}
    }).then(res => res.map(mapPayment))
  }

  readonly update = async (id: UUID, data: MpcaPaymentUpdate) => {
    return this.prisma.mpcaPaymentTool.update({
      where: {id},
      data,
    })
  }
}
