import {DbKoboAnswer, KoboAnswerMetaData, KoboId} from '../connector/kobo/KoboClient/type/KoboAnswer'
import {filterKoboQuestionType} from '../connector/kobo/KoboClient/type/KoboApiForm'
import XlsxPopulate from 'xlsx-populate'
import {convertNumberIndexToLetter} from '@infoportal-common'
import {PrismaClient} from '@prisma/client'
import {KoboService} from './KoboService'
import {appConf} from '../../core/conf/AppConf'

/** @deprecated??*/
export class KoboToXLS {

  constructor(
    private prisma: PrismaClient,
    private service: KoboService = new KoboService(prisma),
  ) {

  }

  readonly generateXLSFromAnswers = async ({
    fileName,
    formId,
    data,
    langIndex,
    password,
  }: {
    fileName: string
    formId: KoboId,
    data: DbKoboAnswer[],
    langIndex?: number
    password?: string
  }) => {
    const koboFormDetails = await this.service.getFormDetails(formId)
    const translated = langIndex !== undefined ? await this.service.translateForm({formId, langIndex, data}) : data
    const flatTranslated = translated.map(({answers, ...meta}) => ({...meta, ...answers}))
    const columns = (() => {
      const metaColumns: (keyof KoboAnswerMetaData)[] = ['id', 'submissionTime', 'version']
      const schemaColumns = koboFormDetails.content.survey.filter(filterKoboQuestionType)
        .map(_ => langIndex !== undefined && _.label
          ? _.label[langIndex]?.replace(/(<([^>]+)>)/gi, '') ?? _.name
          : _.name)
      return [...metaColumns, ...schemaColumns]
    })()
    const workbook = await XlsxPopulate.fromBlankAsync()
    const sheet = workbook.sheet('Sheet1')
    sheet.cell('A1').value([columns] as any)
    sheet.cell('A2').value(flatTranslated.map(a =>
      columns.map(_ => (a as any)[_])
    ) as any)


    sheet.freezePanes(2, 1)
    // const ['start', 'end', 'su']
    sheet.column('A').width(11)
    sheet.column('B').width(11)
    sheet.row(1).style({
      'bold': true,
      'fill': 'f2f2f2',
      'fontColor': '6e7781',
    })

    workbook.toFileAsync(appConf.rootProjectDir + `/${fileName}.xlsx`, {password})
  }

  private readonly styleDateColumn = (allColumns: string[], columnName: string) => {
    const findColumnByName = (name: string) => convertNumberIndexToLetter(Object.keys(allColumns).indexOf(name))
  }
}
