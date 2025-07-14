import {isDate, Legal_individual_aid} from 'infoportal-common'

import {hlpDocDateFields, civilDocDateFields} from '@/features/Legal/IndividualAid/Dashboard'

const pickPrioritizedAid = (aids: Legal_individual_aid.T['number_case']): Legal_individual_aid.T['number_case'] => {
  if (aids === undefined) return

  const hlpAssistanceWithDoc = aids.find(({beneficiary_application_type, ...aid}) => {
    return (
      beneficiary_application_type === 'assistance' &&
      hlpDocDateFields.some((field) => {
        console.log(isDate(aid[field]))
        return isDate(aid[field])
      })
    )
  })
  const civilAssistanceWithDoc = aids.find(({beneficiary_application_type, ...aid}) => {
    return beneficiary_application_type === 'assistance' && civilDocDateFields.some((field) => isDate(aid[field]))
  })

  if (hlpAssistanceWithDoc) return [hlpAssistanceWithDoc]

  if (civilAssistanceWithDoc) return [civilAssistanceWithDoc]

  return [aids[0]]
}

export {pickPrioritizedAid}
