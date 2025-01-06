import {generateDatabaseInterface} from './AiGenerateDataseInterface'

const dbId = 'cbi4e3dlbs86afe2'
export const activityInfoForms = {
  generalProtectionRmm: 'czd5jf7lqf2zv4r4r',
  mineAction: 'cmnzatklqv1q3s243u',
  snfi: 'c95ky7klr95z6ia3v',
  fslc: 'chxr3zlqc5qatg2',
  wash: 'cz86p3tlqc7h66y2',
  mpca: 'c9vv9j8lqm633lj1tm',
  gbv: 'c6mrp6dlqv1q7q243w',
  // mineAction: 'cmnzatklqv1q3s243u',

  // snfiRmm: 'ckrgu2uldtxbgbg1h',
  // generalProtectionRmm: 'cas3n26ldsu5aea5',
  // activities_and_people: 'cy3vehlldsu5aeb6',
  // washAPM2: 'cg7insdlee1c3h0s',
  // washRmm: 'crvtph7lg6d5dhq2',
  // mpcaRmm: 'cxeirf9ldwx90rs6',
}

export const ActivityInfoBuildType = {
  wash: () =>
    generateDatabaseInterface({
      optionsLimit: 200000,
      formId: activityInfoForms.wash,
      name: 'wash',
      ignoredQuestions: [],
      skipQuestion: [],
      skipQuestionsOptions: [
        /Donor Name/,
        // /Raion/,
        // /Hromada/,
        /Sub-Implementing Partner/,
        /Hromada/,
        /Settlement/,
      ],
      pickSpecificOptionSet: {
        cg7insdlee1c3h0s: 'cbc6ncylee1d4ulu',
        c6q8ni3lepq77hp3: 'cocmup7lepq89f38',
      },
      filterOptions: {
        'Reporting Organization': (_) => {
          return _.includes('Danish Refugee Council')
        },
        'Implementing Partner': (_) => {
          return _.includes('Danish Refugee Council')
        },
      },
    }),

  fslc: () =>
    generateDatabaseInterface({
      formId: activityInfoForms.fslc,
      name: 'fslc',
      skipQuestionsOptions: [/Oblast/, /Raion/, /Hromada/, /Settlement/, /Collective Site/],
      filterOptions: {
        'Reporting Organization': (_) => {
          return _.includes('Danish Refugee Council')
        },
        'Implementing Partner': (_) => {
          return _.includes('Danish Refugee Council')
        },
      },
    }),
  snfi: () =>
    generateDatabaseInterface({
      formId: activityInfoForms.snfi,
      name: 'snfi',
      skipQuestionsOptions: [/Oblast/, /Raion/, /Hromada/, /Settlement/, /Collective Site/],
      filterOptions: {
        'Reporting Organization': (_) => {
          return _.includes('Danish Refugee Council')
        },
        'Implementing Partner': (_) => {
          return _.includes('Danish Refugee Council')
        },
      },
    }),

  generalProtection: () =>
    generateDatabaseInterface({
      formId: activityInfoForms.generalProtectionRmm,
      name: 'generalProtection',
      filterOptions: {
        'Reporting Organization': (_) => {
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
      ],
    }),

  gbv: () =>
    generateDatabaseInterface({
      formId: activityInfoForms.gbv,
      name: 'gbv',
      filterOptions: {
        'Reporting Organization': (_) => {
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
      ],
    }),

  mineAction: () =>
    generateDatabaseInterface({
      formId: activityInfoForms.mineAction,
      name: 'mineAction',
      filterOptions: {
        'Reporting Organization': (_) => {
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
      ],
    }),

  mpca: () =>
    generateDatabaseInterface({
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
      skipQuestionsOptions: [/Raion/, /Hromada/i, /Settlement/, /Collective Site/],
      pickSpecificOptionSet: {},
      filterOptions: {
        'Implementing Partner': (_) => {
          return _.includes('Danish Refugee Council')
        },
        'Reporting Organization': (_) => {
          return _.includes('Danish Refugee Council')
        },
      },
    }),
}
;(async () => {
  await ActivityInfoBuildType.snfi()
  await ActivityInfoBuildType.generalProtection()
  await ActivityInfoBuildType.mpca()
  await ActivityInfoBuildType.wash()
  await ActivityInfoBuildType.fslc()
  await ActivityInfoBuildType.gbv()
})()
