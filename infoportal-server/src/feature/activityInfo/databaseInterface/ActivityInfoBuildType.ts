import {activityInfoForms} from '../model/ActivityInfo'
import {generateDatabaseInterface} from './AiGenerateDataseInterface'

export const ActivityInfoBuildType = {
  wash: () => generateDatabaseInterface({
    optionsLimit: 200000,
    formId: activityInfoForms.wash,
    name: 'wash',
    ignoredQuestions: [
      'Total Reached (All Population Groups)',
    ],
    skipQuestion: [
      /Collective Sites/,
      /Total Reached \(No Disaggregation\)/,
      /Oblast/,
      /Raion/,
      /Implementing Partner/,
    ],
    skipQuestionsOptions: [
      /Donor Name/,
      /Reporting Organization/,
      /Sub-Implementing Partner/,
      /Hromada/,
      /Settlement/,
    ],
    pickSpecificOptionSet: {
      cg7insdlee1c3h0s: 'cbc6ncylee1d4ulu',
      c6q8ni3lepq77hp3: 'cocmup7lepq89f38',
    },
    filterOptions: {
      'Organisation': _ => {
        return _.includes('Danish Refugee Council')
      },
      'Implementing Partner': _ => {
        return _.includes('Danish Refugee Council')
      }
    }
  }),

  fslc: () => generateDatabaseInterface({
    formId: activityInfoForms.fslc,
    name: 'fslc',
    skipQuestionsOptions: [
      /Oblast/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ],
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
      'Implementing Partner': _ => {
        return _.includes('Danish Refugee Council')
      }
    },
  }),
  snfi: () => generateDatabaseInterface({
    formId: activityInfoForms.snfi,
    name: 'snfi',
    skipQuestionsOptions: [
      /Oblast/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ],
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
      'Implementing Partner': _ => {
        return _.includes('Danish Refugee Council')
      }
    },
  }),

  generalProtection: () => generateDatabaseInterface({
    formId: activityInfoForms.generalProtectionRmm,
    name: 'generalProtection',
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
    },
    skipQuestionsOptions: [
      /Implementing Partner/,
      /Implementing Partner 2/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ]
  }),

  gbv: () => generateDatabaseInterface({
    formId: activityInfoForms.gbv,
    name: 'gbv',
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
    },
    skipQuestionsOptions: [
      /Implementing Partner/,
      /Implementing Partner 2/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ]
  }),

  mineAction: () => generateDatabaseInterface({
    formId: activityInfoForms.mineAction,
    name: 'mineAction',
    filterOptions: {
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
    },
    skipQuestionsOptions: [
      /Implementing Partner/,
      /Implementing Partner 2/,
      /OblastIndex/,
      /Raion/,
      /Hromada/,
      /Settlement/,
      /Collective Site/,
    ]
  }),

  mpca: () => generateDatabaseInterface({
    optionsLimit: 200,
    formId: activityInfoForms.mpca,
    name: 'mpca',
    ignoredQuestions: [],
    skipQuestion: [
      // /MPCA Indicators/,
      // /Donor/,
      // /Implementing Partner/,
      // /MPCA Indicators/,
    ],
    skipQuestionsOptions: [
      /OblastIndex/,
      /Raion/,
      /Hromada/i,
      /Settlement/,
      /Collective Site/,
    ],
    pickSpecificOptionSet: {},
    filterOptions: {
      'Implementing Partner': _ => {
        return _.includes('Danish Refugee Council')
      },
      'Reporting Organization': _ => {
        return _.includes('Danish Refugee Council')
      },
    }
  })
}