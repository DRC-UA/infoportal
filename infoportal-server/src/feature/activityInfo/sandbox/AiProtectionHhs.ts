import {aiOblasts} from '../location/aiOblasts'
import {aiRaions} from '../location/aiRaions'
import {aiHromada} from '../location/aiHromada'


export namespace AiProtectionHhs {
// type Inputs = Record<keyof typeof inputs, any>

  export const inputs = {
    ID: {id: 'ci8ugsnldt0vh8z1c'},
    'Partner Organization': {
      id: 'ci607odlbs8w4pe2',
      optionsId: 'cr4xx3dlbs86w9y2',
      labelsId: 'cnbsrhflbs8advx9'
    },
    'Implementing Partner 1': {
      id: 'cmlymv8ldsuaebzb',
      optionsId: 'cr4xx3dlbs86w9y2',
      labelsId: 'cnbsrhflbs8advx9'
    },
    'Implementing Partner 2': {
      id: 'c4iibgxldsubqwqc',
      optionsId: 'cr4xx3dlbs86w9y2',
      labelsId: 'cnbsrhflbs8advx9'
    },
    'Plan Code': {
      id: 'cu3do47ldu8x1eg4m',
      optionsId: 'cqnfuewldtzuhuf2',
      labelsId: 'co99k7plbs8ffnpn'
    },
    Oblast: {
      id: 'cva2znrle7pd83vd',
      optionsId: 'cg7v61llbunvy9t9',
      labelsId: 'ca0ivw8lda77nm46'
    },
    Raion: {
      id: 'cb7h23tle7pdocme',
      optionsId: 'cjy8nbnlbunzcnh1h',
      labelsId: 'cj7i9fldackojz7'
    },
    Hromada: {
      id: 'cqai21ple7pe0bif',
      optionsId: 'c700rjplbuo1fjq5m',
      labelsId: 'co749hfldacpjlc8'
    },
    Settlement: {
      id: 'cir5yiule7peev5g',
      optionsId: 'cqvi6fqlbuo3hyc63',
      labelsId: 'c499sexlbuo3syc6e'
    },
    'Collective Centre': {
      id: 'cpn7bf1le7pevjuh',
      optionsId: 'cl69o0lldbf4rtk2',
      labelsId: 'cb669lfldbf529g3'
    },
    'Response Theme': {id: 'cfzh1whldu8r0u84k'},
    'Reporting Month': {id: 'cmxllh3ldsuvom9g'},
    'Population Group': {
      id: 'c19j8p9ldsv4qa3o',
      optionsId: 'cqjd0o4ld4hbyo12',
      labelsId: 'c85susjld4hc4rb3'
    },
    'Protection Indicators': {
      id: 'c79be77ldswj831t',
      optionsId: 'c3vbxtgldsw1as42',
      labelsId: 'ck5orstldsw7jfn5'
    },
    'Protection Sub-Indicators': {
      id: 'ccli5mkldt1r8lb1d',
      optionsId: 'c91xm2fldt1k1kh8',
      labelsId: 'cvjz2klldswbsqzu'
    },
    'Total Individuals Reached': {id: 'cgwjgg2ldsx1nzsv'},
    Girls: {id: 'c62l7s0lbs8mvnx3b'},
    Boys: {id: 'cqvizd5lbs8mvnx3d'},
    'Adult Women': {id: 'ceij8s2lbs8mvnx3f'},
    'Adult Men': {id: 'cpbkputlbs8mvny3h'},
    'Elderly Women': {id: 'cpkkgqulbs8mvny3j'},
    'Elderly Men': {id: 'cmyfyd8lbs8mvny3l'},
    'People with disability': {id: 'cj41459lbs8mvny3n'},
    'Achievement (non-individual)': {id: 'cn37fnmlbs8mvny3r'}, // always = 12 I think
    '# of individuals who received support to master stress-management strategies': {id: 'cev98hrldvi6g825'},
    '# of individuals received Problem Management Plus intervention': {id: 'c9qcv7fldvih1bca'},
    '# of individuals received CETA intervention': {id: 'c2khmc8ldviio99b'},
    '# of individuals received other PSS interventions': {id: 'cucpuskldvik1mpc'},
    '# of individuals who received support to Master Stress-Management Strategies': {id: 'cxv8koaldviffeg9'}
  }

  export const inputsOptions = {
    'Population Group': {
      'IDPs': 'co8y3rvld4hchx14',
      'Non-Displaced': 'cl76cbild4hcq8i5',
      'Returnees': 'cxbkri3ld4hcx9z6',
    },
    'Protection Indicators': {
      '# of persons reached through protection monitoring': 'cntvm8fle4efhhpn',
    },
    'Partner Organization': {
      'DRC - Danish Demining Group (DRC-DDG)': 'cv9umq8lehiq43f103',
      // TODO Check why I got cgaexfclehiq43fzv ???
      // 'DRC - Danish Demining Group (DRC-DDG)': 'cgaexfclehiq43fzv',
    },
    'Plan Code': {
      'GP-DRC-00001': 'cfbgfipleo7dg222',
      'GP-DRC-00002': 'cy76ipoleo7ij1j3',
      'GP-DRC-00003': 'crsa7psleo7l08n4',
      'GP-DRC-00004': 'cxf2j7kleo7mstp5'
    },
    Oblast: aiOblasts,
    Raion: aiRaions,
    Hromada: aiHromada,
  }

  type GET<T extends keyof typeof inputsOptions> = keyof typeof inputsOptions[T]

// let B: Partial<Record<keyof typeof inputs, any>> = {
//   ID: 2,
//   'Protection Indicators'
// }
  export interface FormParams {
    'Partner Organization'?: GET<'Partner Organization'>
    'Plan Code': GET<'Plan Code'>
    'Oblast': GET<'Oblast'>
    'Raion': GET<'Oblast'>
    'Hromada': GET<'Hromada'>
    'Settlement'?: string
    'Collective Centre'?: string
    subActivities: {
      'Reporting Month': string
      'Population Group': GET<'Population Group'>
      'Protection Indicators'?: GET<'Protection Indicators'>
      'Collective Centre'?: string
      'Total Individuals Reached': number
      'Girls': number
      'Boys': number
      'Adult Women': number
      'Adult Men': number
      'Elderly Women': number
      'Elderly Men': number
      'People with disability': number
      // 'Achievement (non-individual)': number
    }[]
  }


  interface AIHHForms {
    'ID': string,
    'Partner Organization': string
    'Implementing Partner 1': string
    'Implementing Partner 2': string
    'Plan Code': string
    'Oblast': string
    'Raion': string
    'Hromada': string
    'Settlement': string
    'Collective Centre': string
    'Response Theme': string
    'Reporting Month': string
    'Population Group': string
    'Protection Indicators': string
    'Protection Sub-Indicators': string
    'Total Individuals Reached': string
    'Girls': string
    'Boys': string
    'Adult Women': string
    'Adult Men': string
    'Elderly Women': string
    'Elderly Men': string
    'Achievement (non-individual)': string
    'People with disability': string
  }


// form/c3vbxtgldsw1as42/record/cntvm8fle4efhhpn
  const activities = {
    c6nflpglemqkd9h4: 'HRP2023',
    c16tlt9ldsw73ck4: 'Моніторинг у сфері захисту на рівні домогосподарств',
    cbp0y9bldswb0lxm: 'c2lllo9ldswb0lxl',
    cfsnsvdldswa105f: 'c173cqnldswa105e',
    cgtjh8zldvhgzn629: 'cc66lm4ldvhhbit2a',
    cjarsddldsw9l9z9: 'Особи',
    ck5orstldsw7jfn5: '# of persons reached through protection monitoring',
    cmees1vlemqj5iw2: 'GP108',
    cmyo72klemqjrwp3: 'GP108-019',
    cnebbh7ldsw8pu58: 'Individual',
    co2cveqldsw8bnr7: 'ALL',
    cqn8nk6ldsw7vr26: 'кількість осіб, охоплених моніторингом захисту',
    cvjz2klldswbsqzu: 'cq04ujnldswbsqzt',
    cykkilxldsw1s0h3: 'Protection Monitoring at Household Level',
  }

  export const columnsListMap = {
    cr4xx3dlbs86w9y2: {
      labelsId: 'cnbsrhflbs8advx9',
      label: 'partnerOrg',
    },
    cqnfuewldtzuhuf2: {
      labelsId: 'co99k7plbs8ffnpn',
      label: 'planCodeActivity',
    },
    cg7v61llbunvy9t9: {
      labelsId: 'ca0ivw8lda77nm46',
      label: 'oblast',
    },
    cjy8nbnlbunzcnh1h: {
      labelsId: 'cj7i9fldackojz7',
      label: 'raion',
    },
    c700rjplbuo1fjq5m: {
      labelsId: 'co749hfldacpjlc8',
      label: 'hromada',
    },
    cqjd0o4ld4hbyo12: {
      labelsId: 'c85susjld4hc4rb3',
      label: 'populationGroup',
    },
    c3vbxtgldsw1as42: {
      labelsId: 'ck5orstldsw7jfn5',
      label: 'protectionIndicators',
    },
    ccli5mkldt1r8lb1d: {
      labelsId: 'cvjz2klldswbsqzu',
      label: 'Protection Sub-Indicators'
    }
  }

// ID des indicators avec sublist from c79be77ldswj831t
// c3vbxtgldsw1as42 : ck5orstldsw7jfn5
}
