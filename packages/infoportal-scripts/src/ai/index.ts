import {AiBuilder} from './AiBuilder'

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
    AiBuilder.run({
      optionsLimit: 200000,
      formId: activityInfoForms.wash,
      name: 'wash',
      questionSettings: {
        'Reporting Organization': {
          filterChoices: (_) => {
            return _.includes('Danish Refugee Council')
          },
        },
        'Implementing Partner': {
          filterChoices: (_) => {
            return _.includes('Danish Refugee Council')
          },
        },
        'Donor Name': {
          skipChoices: true,
        },
        'Sub-Implementing Partner': {
          skipChoices: true,
        },
        Hromada: {
          skipChoices: true,
        },
        Settlement: {
          skipChoices: true,
        },
      },
    }),

  fslc: () =>
    AiBuilder.run({
      formId: activityInfoForms.fslc,
      name: 'fslc',
      questionSettings: {
        'Reporting Organization': {
          filterChoices: (_) => {
            return _.includes('Danish Refugee Council')
          },
        },
        'Activity and indicator': {
          selectColumnByLabels: ['Activity', 'Sub-activity', 'Indicator', 'Modality'],
        },
        'Implementing Partner': {
          filterChoices: (_) => {
            return _.includes('Danish Refugee Council')
          },
        },

        Raion: {skipChoices: true},
        Hromada: {skipChoices: true},
        Settlement: {skipChoices: true},
        'Collective Site': {skipChoices: true},
      },
    }),

  snfi: () =>
    AiBuilder.run({
      optionsLimit: 200,
      formId: activityInfoForms.snfi,
      name: 'snfi',
      questionSettings: {
        Oblast: {skipChoices: true},
        Raion: {skipChoices: true},
        Hromada: {skipChoices: true},
        Settlement: {skipChoices: true},
        'Collective Site': {skipChoices: true},
        'Indicators - SNFI': {
          selectColumnByLabels: ['Activity_label', 'Indicator_label', 'Modality', 'Theme'],
        },
        'Reporting Organization': {
          filterChoices: (_) => _.includes('Danish Refugee Council'),
        },
        'Implementing Partner': {
          filterChoices: (_) => _.includes('Danish Refugee Council'),
        },
      },
    }),

  generalProtection: () =>
    AiBuilder.run({
      formId: activityInfoForms.generalProtectionRmm,
      name: 'generalProtection',
      questionSettings: {
        'Reporting Organization': {
          filterChoices: (_) => _.includes('Danish Refugee Council'),
        },
        'Implementing Partner': {
          skipChoices: true,
        },
        'Implementing Partner 2': {
          skipChoices: true,
        },
        Raion: {
          skipChoices: true,
        },
        Hromada: {
          skipChoices: true,
        },
        Settlement: {
          skipChoices: true,
        },
        'Collective Site': {
          skipChoices: true,
        },
      },
    }),

  gbv: () =>
    AiBuilder.run({
      formId: activityInfoForms.gbv,
      name: 'gbv',
      questionSettings: {
        'Reporting Organization': {
          filterChoices: (_) => _.includes('Danish Refugee Council'),
        },
        'Implementing Partner': {skipChoices: true},
        'Implementing Partner 2': {skipChoices: true},
        Raion: {skipChoices: true},
        Hromada: {skipChoices: true},
        Settlement: {skipChoices: true},
        'Collective Site': {skipChoices: true},
      },
    }),

  mineAction: () =>
    AiBuilder.run({
      formId: activityInfoForms.mineAction,
      name: 'mineAction',
      questionSettings: {
        'Reporting Organization': {
          filterChoices: (_) => _.includes('Danish Refugee Council'),
        },
        'Implementing Partner': {skipChoices: true},
        'Implementing Partner 2': {skipChoices: true},
        OblastIndex: {skipChoices: true},
        Raion: {skipChoices: true},
        Hromada: {skipChoices: true},
        Settlement: {skipChoices: true},
        'Collective Site': {skipChoices: true},
      },
    }),

  mpca: () =>
    AiBuilder.run({
      optionsLimit: 200,
      formId: activityInfoForms.mpca,
      name: 'mpca',
      questionSettings: {
        Donor: {
          skipChoices: true,
        },
        'Implementing Partner': {filterChoices: (_) => _.includes('Danish Refugee Council')},
        'Reporting Organization': {filterChoices: (_) => _.includes('Danish Refugee Council')},
        Raion: {skipChoices: true},
        Hromada: {skipChoices: true},
        Settlement: {skipChoices: true},
        'Collective Site': {skipChoices: true},
      },
    }),
}
