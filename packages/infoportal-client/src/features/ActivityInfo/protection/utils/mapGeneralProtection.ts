import {match} from '@axanc/ts-utils'

import {groupBy, IKoboMeta, Person} from 'infoportal-common'

import {
  ageSexMapper,
  aiPopulationGroupCode,
  ALERT,
  buildProtectionRequest,
  meta2AiAgeGender,
  PROGRAM_PREFIXES,
  type Bundle,
} from '@/features/ActivityInfo/shared'

import {labelActivities, sharedActivityProps} from './shared'

const mapGeneralProtection = async (data: IKoboMeta[], periodString: string): Promise<Bundle[]> => {
  let i = 0

  return await Promise.all(
    groupBy({
      data,
      groups: [
        {by: ({formId}) => formId},
        {by: ({activity}) => activity!},
        {by: ({project}) => project[0]},
        {by: ({oblast}) => oblast},
        {by: ({raion}) => raion!},
        {by: ({hromada}) => hromada!},
        {by: ({settlement}) => settlement!},
      ],
      finalTransform: async (group, [_formId, drcProgram, project, oblast, raion, hromada, settlement]) => {
        const [_namePart, isoPart] = settlement.split('_')
        const settlementIso = isoPart ?? settlement

        return groupBy({
          data: group.flatMap(({persons, displacement: _dropTopLevelDisplacement, ...rest}) => {
            return persons?.map((person) => ({...person, ...rest}))
          }) as (IKoboMeta & Person.Details)[],
          groups: [
            {by: ({displacement}) => displacement!},
            {by: ({gender, age}) => meta2AiAgeGender(age, gender!)!},
            {by: ({disability}) => (disability && Boolean(disability[0]) ? 1 : 0)},
          ],
          finalTransform: (record, [displacement, ageGender, disability]) => {
            const recordId = `${PROGRAM_PREFIXES.drcprot}${periodString.replace('-', '')}${String(++i).padStart(5, '0')}`
            const activity = {
              ...sharedActivityProps({
                project,
                drcProgram,
                periodString,
                sp: 'PLHUKR26/SP1',
                oblast,
                raion,
                hromada,
                settlement: settlementIso,
              }),
              'Population Group': match(displacement)
                .cases({
                  [Person.DisplacementStatus.Idp]: aiPopulationGroupCode.Idp,
                  [Person.DisplacementStatus.NonDisplaced]: aiPopulationGroupCode.NonDisplaced,
                  [Person.DisplacementStatus.Returnee]: aiPopulationGroupCode.NonDisplaced,
                })
                .default(undefined) as aiPopulationGroupCode,
              'Age & Sex': ageSexMapper(ageGender),
              ...(disability === 1 && {Disability: 'DSB' as const}),
              'Reached/Delivered - New Non-repeated (Manual)': record.length,
            } as const
            const requestBody = buildProtectionRequest(activity, recordId)

            return {
              activity: labelActivities(activity, record),
              data: record,
              recordId,
              requestBody,
              submit: requestBody.changes.some(({fields}) => {
                if (
                  activity['Population Group'] !== aiPopulationGroupCode.Idp &&
                  activity['Strategic Priority'] === 'PLHUKR26/SP4'
                ) {
                  return false
                }

                return !Object.values(fields).some((value) => {
                  return (value as string)?.includes && (value as string)?.includes(ALERT)
                })
              }),
            }
          },
        }).transforms
      },
    }).transforms,
  ).then((result) => result.flat())
}

export {mapGeneralProtection}
