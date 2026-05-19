import {match} from '@axanc/ts-utils'
import {isWithinInterval} from 'date-fns'

import {
  Bn_rapidResponse2,
  capitalize,
  DrcProject,
  DrcProjectHelper,
  DrcSector,
  groupBy,
  KoboXmlMapper,
  Person,
  type KoboSubmissionFlat,
  type KoboTagStatus,
  type OblastName,
} from 'infoportal-common'

import {
  ageSexGroup2AiCodeMapper,
  ageSexReference,
  aiPopulationGroupCode,
  buildRequest,
  meta2AiAgeGenderGroups,
  labelActivities,
  paymentFrequency2AiCodeMapper,
  pickIndicatorByProgram,
  sharedActivityProps,
  type Bundle,
  type AiType51aMonitoring,
} from '@/features/ActivityInfo/shared'

type StrategicPriority = ReturnType<typeof sharedActivityProps>['Strategic Priority']

const cashMapperMaker =
  (uah2usd: number) =>
  async ({
    data,
    period,
  }: {
    data: (KoboSubmissionFlat<Bn_rapidResponse2.T, KoboTagStatus> & {formId: string})[]
    period: string
  }): Promise<Bundle[]> => {
    let i = 0

    const flatMappedData = data.flatMap(({id, formId, ...row}) => {
      const persons = KoboXmlMapper.Persons.bn_rapidResponse2(row)

      return persons.map(({age, gender, displacement, disability}) => {
        const inFirstQuarter = isWithinInterval(row.tags?.lastStatusUpdate!, {
          start: new Date('2026-01-01'),
          end: new Date('2026-03-31'),
        })

        const payment = Number(row.mpca_amount) / persons.length

        const strategicPriority: StrategicPriority = match(row.leave_regular_place)
          .cases({
            yes: 'PLHUKR26/SP2',
            no: 'PLHUKR26/SP1',
          } as const)
          .default('PLHUKR26/SP1')

        const populationGroup = match(displacement)
          .cases({
            [Person.DisplacementStatus.Idp]: Person.DisplacementStatus.Idp,
          })
          .default(Person.DisplacementStatus.NonDisplaced)

        return {
          formId,
          koboId: id,
          project: [DrcProjectHelper.search(row.mpca_donor)!],
          indicator: pickIndicatorByProgram({
            activity: match(row.leave_regular_place)
              .cases({
                yes: inFirstQuarter ? 'mpca-evacuees' : 'uct-evacuees',
                no: inFirstQuarter ? 'mpca-front-line' : 'uct-front-line',
              })
              .default('mpca-front-line'),
            sector: DrcSector.MPCA,
          }),
          strategicPriority,
          oblast: capitalize(row.ben_det_oblast!) as OblastName,
          raion: capitalize(row.ben_det_raion!),
          hromada: capitalize(row.ben_det_hromada!.split('_')[0]),
          settlement: row.ben_det_settlement,
          ageGender: meta2AiAgeGenderGroups(age, gender!),
          disability,
          populationGroup,
          displacement: populationGroup, // for better labelling only
          payment,
        }
      })
    })

    return await Promise.all(
      groupBy({
        data: flatMappedData,
        groups: [
          {by: ({project}) => project[0]!},
          {by: ({indicator}) => indicator!},
          {by: ({strategicPriority}) => strategicPriority},
          {by: ({oblast}) => oblast},
          {by: ({raion}) => raion!},
          {by: ({hromada}) => hromada!},
          {by: ({settlement}) => settlement?.toUpperCase()!},
          {by: ({populationGroup}) => populationGroup!},
          {by: ({ageGender}) => ageGender!},
          {by: ({disability}) => (disability && Boolean(disability[0]) ? 1 : 0)},
        ],
        finalTransform: async (records, groups) => {
          const [
            project,
            indicator,
            strategicPriority,
            oblast,
            raion,
            hromada,
            settlement,
            populationGroup,
            ageGender,
            disability,
          ] = groups as [
            DrcProject,
            AiType51aMonitoring.Type['Indicator'],
            StrategicPriority,
            string,
            string,
            string,
            string,
            Person.DisplacementStatus,
            keyof typeof ageSexReference,
            '0' | '1',
          ]
          const [_namePart, isoPart] = (settlement as string).split('_')
          const settlementIso = isoPart?.toUpperCase() ?? settlement
          const recordId = `drc${['CLCWG/CA1/IN2', 'CLCWG/CA2/IN2'].includes(indicator) ? 'mpca' : 'uct'}${period.replace('-', '')}${String(++i).padStart(5, '0')}`
          const activity = {
            Indicator: indicator,
            ...sharedActivityProps({
              project,
              period,
              sp: strategicPriority,
              oblast,
              raion,
              hromada,
              settlement: settlementIso,
            }),
            'Population Group': aiPopulationGroupCode[populationGroup as 'Idp' | 'NonDisplaced'],
            'Age & Sex': ageSexGroup2AiCodeMapper(ageGender),
            'Payment Frequency': paymentFrequency2AiCodeMapper('Lump sum - ONE'),
            ...(disability === '1' && ({Disability: 'DSB'} as const)),
            'Reached/Delivered - Total incl. Repeated (Manual)': records.length,
            'Reached/Delivered - New Non-repeated (Manual)': records.length,
            'USD Amount (Manual)':
              records.map(({payment}) => payment).reduce((total, current) => total + current, 0) * uah2usd,
            'Number of Months (Manual)': 3,
          } as const

          const requestBody = buildRequest(activity, recordId)

          return {
            activity: labelActivities(activity, records),
            data: records,
            recordId,
            requestBody,
            submit: requestBody.changes.some(({fields}) => {
              return !Object.values(fields).some((value) => {
                return (value as string)?.includes && (value as string)?.includes('undefined')
              })
            }),
          }
        },
      }).transforms,
    ).then((result) => result.flat())
  }

export {cashMapperMaker}
