import {KoboForm, Prisma, PrismaClient} from '@prisma/client'
import {ApiPaginate, ApiPaginateHelper, ApiPagination, UUID} from '@infoportal-common'
import {DbKoboAnswer, KoboAnswerId, KoboId} from '../connector/kobo/KoboClient/type/KoboAnswer'
import {KoboSdkGenerator} from './KoboSdkGenerator'
import {filterKoboQuestionType, KoboApiQuestion} from '../connector/kobo/KoboClient/type/KoboApiForm'
import {Enum, fnSwitch, seq} from '@alexandreannic/ts-utils'
import {format} from 'date-fns'
import {KoboAnswersFilters} from '../../server/controller/kobo/ControllerKoboAnswer'
import {UserSession} from '../session/UserSession'
import {AccessService} from '../access/AccessService'
import {AppFeatureId} from '../access/AccessType'
import {KoboEvent} from './KoboEvent'
import {defaultPagination} from '../../core/Type'

export interface KoboAnswerFilter {
  filters?: KoboAnswersFilters,
  paginate?: ApiPagination
}

interface KoboAnswerSearch<
  TAnswer extends Record<string, any> = Record<string, string | undefined>,
  TTags extends Record<string, any> | undefined = undefined
> extends KoboAnswerFilter {
  formId: UUID,
  fnMap?: (_: Record<string, string | undefined>) => TAnswer
  fnMapTags?: (_?: any) => TTags,
}

export class KoboService {

  constructor(
    private prisma: PrismaClient,
    private access = new AccessService(prisma),
    private sdkGenerator: KoboSdkGenerator = new KoboSdkGenerator(prisma),
    private event: KoboEvent = new KoboEvent(),
  ) {
  }

  readonly getForms = async (): Promise<KoboForm[]> => {
    return this.prisma.koboForm.findMany()
  }

  readonly searchAnswersByUsersAccess = async ({
    user,
    ...params
  }: {
    formId: string,
    filters: KoboAnswersFilters,
    paginate: ApiPagination
    user?: UserSession
  }) => {
    if (!user) return ApiPaginateHelper.make()([])
    const access = await this.access.searchForUser({featureId: AppFeatureId.kobo_database, user})
      .then(_ => _.filter(_ => _.params?.koboFormId === params.formId))

    if (!user.admin && access.length === 0) return ApiPaginateHelper.make()([])

    const accessFilters = seq(access).map(_ => _.params?.filters).compact().reduce<Record<string, string[]>>((acc, x) => {
      Enum.entries(x).forEach(([k, v]) => {
        if (Array.isArray(x[k])) {
          acc[k] = seq([...acc[k] ?? [], ...x[k] ?? []]).distinct(_ => _)
        } else {
          acc[k] = v as any
        }
      })
      return acc
    }, {} as const)

    const accessFiltersEntry = Enum.entries(
      new Enum(accessFilters).transform((k, v) => [k, new Set(v)]).get()
    )
    const data = await this.searchAnswers(params)
    if (!user.admin)
      data.data = data.data.filter(_ => {
        return accessFiltersEntry.every(([question, answer]) => answer.has(_.answers[question]))
      })
    return data
  }

  readonly searchAnswers = ({
    formId,
    filters = {},
    paginate = defaultPagination,
  }: {
    formId: string,
    filters?: KoboAnswersFilters,
    paginate?: ApiPagination
  }): Promise<ApiPaginate<DbKoboAnswer>> => {
    return this.prisma.koboAnswers.findMany({
      take: paginate.limit,
      skip: paginate.offset,
      orderBy: [
        {date: 'desc',},
        {submissionTime: 'desc',},
      ],
      where: {
        deletedAt: null,
        date: {
          gte: filters.start,
          lt: filters.end,
        },
        formId,
        AND: filters.filterBy?.map((filter) => ({
          OR: filter.value.map(v => ({
            answers: {
              path: [filter.column],
              ...v ? {
                ['string_contains']: v
              } : {
                equals: Prisma.DbNull,
              }
            }
          }))
        })),
      }
    }).then(_ => _.map(d => ({
      start: d.start,
      end: d.end,
      version: d.version ?? undefined,
      attachments: d.attachments,
      geolocation: d.geolocation,
      submissionTime: d.submissionTime,
      id: d.id,
      uuid: d.uuid,
      validationStatus: d.validationStatus as any,
      validatedBy: d.validatedBy ?? undefined,
      lastValidatedTimestamp: d.lastValidatedTimestamp ?? undefined,
      answers: d.answers as any,
      formId: d.formId,
      tags: d.tags,
    })))
      // .then(_ => {
      //   if (_?.[0].answers.date)
      //     return _.sort((a, b) => {
      //       return (b.answers.date as string ?? b.submissionTime.toISOString()).localeCompare(
      //         a.answers.date as string ?? a.submissionTime.toISOString()
      //       )
      //     })
      //   return _
      // })
      .then(ApiPaginateHelper.make())
  }

  // readonly generateXLSForHHS = async ({start, end}: {start?: Date, end?: Date}) => {
  //   const filePattern = (oblast: string) => `drc.ua.prot.hh2.${start ? format(start, 'yyyy-MM') + '.' : ''}${oblast}`
  //   const oblasts = [
  //     'chernihiv',
  //     'lviv',
  //     'kharkiv',
  //     'mykolaiv',
  //     'dnipro',
  //   ]
  //   const requests = oblasts.map(oblast => this.searchAnswers({
  //     formId: KoboIndex.byName('protection_hhs2_1').id,
  //     filters: {
  //       start: start,
  //       end: end,
  //       filterBy: [{
  //         column: 'staff_to_insert_their_DRC_office',
  //         value: [oblast],
  //       }]
  //     }
  //   }))
  //   const requestAll = this.searchAnswers({
  //     formId: KoboIndex.byName('protection_hhs2_1').id,
  //     filters: {start: start, end: end}
  //   })
  //   await Promise.all([requestAll, ...requests]).then(_ => _.map(_ => _.data)).then(([
  //     all,
  //     chernihiv,
  //     lviv,
  //     kharkiv,
  //     mykolaiv,
  //     dnipro,
  //   ]) => {
  //     return [
  //       this.generateXLSFromAnswers({
  //         fileName: filePattern('all'),
  //         formId: KoboIndex.byName('protection_hhs2_1').id,
  //         langIndex: 0,
  //         data: all,
  //       }),
  //       this.generateXLSFromAnswers({
  //         fileName: filePattern('chernihivska'),
  //         formId: KoboIndex.byName('protection_hhs2_1').id,
  //         langIndex: 0,
  //         data: chernihiv,
  //         password: 'HHDataCEJ$!', //113
  //       }),
  //       this.generateXLSFromAnswers({
  //         fileName: filePattern('lvivska'),
  //         formId: KoboIndex.byName('protection_hhs2_1').id,
  //         langIndex: 0,
  //         data: lviv,
  //         password: 'YW!(78', // 143
  //       }),
  //       this.generateXLSFromAnswers({
  //         fileName: filePattern('kharkivska'),
  //         formId: KoboIndex.byName('protection_hhs2_1').id,
  //         langIndex: 0,
  //         data: kharkiv,
  //         password: 'ZK38^&', // 59
  //       }),
  //       this.generateXLSFromAnswers({
  //         fileName: filePattern('mykolaivska'),
  //         formId: KoboIndex.byName('protection_hhs2_1').id,
  //         langIndex: 0,
  //         data: mykolaiv,
  //         password: 'b53d', // 104
  //       }),
  //       this.generateXLSFromAnswers({
  //         fileName: filePattern('dnipropetrovska'),
  //         formId: KoboIndex.byName('protection_hhs2_1').id,
  //         langIndex: 0,
  //         data: dnipro,
  //         password: 'PL09!@', // 47
  //       }),
  //     ]
  //   })
  // }

  readonly getFormDetails = async (formId: KoboId) => {
    const dbForm = await this.prisma.koboForm.findFirstOrThrow({where: {id: formId}})
    const sdk = await this.sdkGenerator.get(dbForm.serverId)
    return sdk.getForm(dbForm.id)
  }

  readonly translateForm = async ({
    formId,
    langIndex,
    data,
  }: {
    formId: KoboId,
    langIndex: number,
    data: DbKoboAnswer[],
  }) => {
    const flatAnswers = data.map(({answers, ...meta}) => ({...meta, ...answers}))
    const koboFormDetails = await this.getFormDetails(formId)
    const indexLabel = seq(koboFormDetails.content.survey).filter(filterKoboQuestionType).reduceObject<Record<string, KoboApiQuestion>>(_ => [_.name, _])
    const indexOptionsLabels = seq(koboFormDetails.content.choices).reduceObject<Record<string, undefined | string>>(_ => [_.name, _.label?.[langIndex]])
    return flatAnswers.map(d => {
      const translated = {} as DbKoboAnswer
      Enum.keys(d).forEach(k => {
        const translatedKey = indexLabel[k]?.label?.[langIndex] ?? k
        const translatedValue = (() => {
          if (k === 'submissionTime') {
            return format(d[k], 'yyyy-MM-dd')
          }
          return fnSwitch(indexLabel[k]?.type, {
            'select_multiple': () => d[k]?.split(' ').map((_: any) => indexOptionsLabels[_]).join('|'),
            'start': () => format(d[k], 'yyyy-MM-dd'),
            'end': () => format(d[k], 'yyyy-MM-dd'),
          }, _ => indexOptionsLabels[d[k]] ?? d[k])
        })();
        (translated as any)[translatedKey.replace(/(<([^>]+)>)/gi, '')] = translatedValue
      })
      return translated
    })
  }

  // readonly generateXLSFromAnswers = async ({
  //   fileName,
  //   formId,
  //   data,
  //   langIndex,
  //   password,
  // }: {
  //   fileName: string
  //   formId: KoboId,
  //   data: DbKoboAnswer[],
  //   langIndex?: number
  //   password?: string
  // }) => {
  //   const koboFormDetails = await this.getFormDetails(formId)
  //   const translated = langIndex !== undefined ? await this.translateForm({formId, langIndex, data}) : data
  //   const flatTranslated = translated.map(({answers, ...meta}) => ({...meta, ...answers}))
  //   const columns = (() => {
  //     const metaColumns: (keyof KoboAnswerMetaData)[] = ['id', 'submissionTime', 'version']
  //     const schemaColumns = koboFormDetails.content.survey.filter(filterKoboQuestionType)
  //       .map(_ => langIndex !== undefined && _.label
  //         ? removeHtml(_.label[langIndex]) ?? _.name
  //         : _.name)
  //     return [...metaColumns, ...schemaColumns]
  //   })()
  //   const workbook = await XlsxPopulate.fromBlankAsync()
  //   const sheet = workbook.sheet('Sheet1')
  //   sheet.cell('A1').value([columns] as any)
  //   sheet.cell('A2').value(flatTranslated.map(a =>
  //     columns.map(_ => a[_])
  //   ) as any)
  //
  //   const findColumnByName = (name: string) => convertNumberIndexToLetter(Object.keys(columns).indexOf(name))
  //
  //   sheet.freezePanes(2, 1)
  //   // const ['start', 'end', 'su']
  //   sheet.column('A').width(11)
  //   sheet.column('B').width(11)
  //   sheet.row(1).style({
  //     'bold': true,
  //     'fill': 'f2f2f2',
  //     'fontColor': '6e7781',
  //   })
  //
  //   workbook.toFileAsync(appConf.rootProjectDir + `/${fileName}.xlsx`, {password})
  // }

  readonly updateAnswers = async ({
    formId,
    submissionIds,
    question,
    answer
  }: {
    formId: KoboId,
    submissionIds: KoboAnswerId[],
    question: string,
    answer?: string
  }) => {
    const sdk = await this.sdkGenerator.get()
    await Promise.all([
      sdk.updateData({formId, submissionIds: submissionIds, data: {[question]: answer}}),
      // this.prisma.koboAnswers.updateMany({
      //   where: {id: {in: submissionIds}}
      //   data: {
      //     answers:
      //   }
      // })
    ])

  }

  readonly updateTags = async ({formId, answerIds, tags}: {formId: KoboId, answerIds: KoboAnswerId[], tags: Record<string, any>}) => {
    const answers = await this.prisma.koboAnswers.findMany({
      select: {
        id: true,
        tags: true,
      },
      where: {
        formId,
        id: {
          in: answerIds
        }
      }
    })
    await Promise.all(answers.map(answer => {
      const newTag = {...answer.tags as any, ...tags}
      return this.prisma.koboAnswers.update({
        where: {
          id: answer.id,
        },
        data: {
          tags: newTag,
        }
      })
    }))
    this.event.emitTagEdited({formId, answerIds, tags})
  }
}

