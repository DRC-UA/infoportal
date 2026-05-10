import {match} from '@axanc/ts-utils'

import {DrcSector, groupBy, IKoboMeta, Person} from 'infoportal-common'

import {
  ageSexGroup2AiCodeMapper,
  aiPopulationGroupCode,
  ALERT,
  buildVaRequest,
  meta2AiAgeGenderGroups,
  PROGRAM_PREFIXES,
  type Bundle,
} from '@/features/ActivityInfo/shared'

import {labelActivities, pickIndicatorByProgram, sharedActivityProps} from './shared'

const mapVictimAssistance = async (data: IKoboMeta[], periodString: string): Promise<Bundle[]> => {
  let i = 0

  return await Promise.all(
    groupBy({
      data,
      groups: [
        {by: ({activity}) => activity!},
        {by: ({project}) => project[0]},
        {by: ({oblast}) => oblast},
        {by: ({raion}) => raion!},
        {by: ({hromada}) => hromada!},
        {by: ({settlement}) => settlement!},
      ],
      finalTransform: async (group, [drcProgram, project, oblast, raion, hromada, settlement]) => {
        const [_namePart, isoPart] = settlement.split('_')
        const settlementIso = isoPart?.toLocaleUpperCase() ?? settlement

        return groupBy({
          data: group.flatMap(({persons, displacement: _dropTopLevelDisplacement, ...rest}) => {
            return persons?.map((person) => ({...person, ...rest}))
          }) as (IKoboMeta & Person.Details)[],
          groups: [
            {by: ({displacement}) => displacement!},
            {by: ({gender, age}) => meta2AiAgeGenderGroups(age, gender!)!},
            {by: ({disability}) => (disability && Boolean(disability[0]) ? 1 : 0)},
          ],
          finalTransform: (record, [displacement, ageGender, disability]) => {
            const recordId = `${PROGRAM_PREFIXES.drcva}${periodString.replace('-', '')}${String(++i).padStart(5, '0')}`
            const activity = {
              Indicator: pickIndicatorByProgram({activity: drcProgram, sector: DrcSector.VA}),
              ...sharedActivityProps({
                project,
                periodString,
                sp: 'PLHUKR26/SP3',
                oblast,
                raion,
                hromada,
                settlement: settlementIso,
              }),
              'Cash: Restriction': 'RES',
              'Population Group': match(displacement)
                .cases({
                  [Person.DisplacementStatus.Idp]: aiPopulationGroupCode.Idp,
                  [Person.DisplacementStatus.NonDisplaced]: aiPopulationGroupCode.NonDisplaced,
                  [Person.DisplacementStatus.Returnee]: aiPopulationGroupCode.NonDisplaced,
                })
                .default(`${ALERT} - ${displacement}`) as aiPopulationGroupCode,
              'Age & Sex': ageSexGroup2AiCodeMapper(ageGender),
              ...(disability === 1 && {Disability: 'DSB' as const}),
              'Reached/Delivered - New Non-repeated (Manual)': record.length,
            } as const
            const requestBody = buildVaRequest(activity, recordId)

            return {
              activity: labelActivities(activity, record),
              data: record,
              recordId,
              requestBody,
              submit: requestBody.changes.some(({fields}) => {
                return !Object.values(fields).some(
                  (value) => (value as string)?.includes && (value as string)?.includes('undefined'),
                )
              }),
            }
          },
        }).transforms
      },
    }).transforms,
  ).then((result) => result.flat())
}

export {mapVictimAssistance}
