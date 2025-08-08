import {Obj, seq} from '@axanc/ts-utils'

// MEMO: please keep indexes sorted

const koboIndex = {
  awareness_raising_partners: 'aEMZ2g3Hv2d69unotuewKn',
  bn_0_mpcaReg: 'aEwY33SAtdayNTeHoiJfdg',
  bn_0_mpcaRegESign: 'a8JXohrBDqTdCc86Ysz26r',
  bn_0_mpcaRegNewShort: 'a5kgQdqZLLNTLSmC8DK7Eq',
  bn_0_mpcaRegNoSig: 'aHuWQPkrC43qBfTmJvoLqg',
  bn_1_mpcaNfi: 'a4Sx3PrFMDAMZEGsyzgJJg',
  bn_1_mpcaNfiMyko: 'a8WAWB9Yxu2jkgk4Ei8GTk',
  bn_1_mpcaNfiNaa: 'aBGVXW2N26DaLehmKneuyB',
  bn_cashForRentApplication: 'aBupWbhtUmA7so3532tYLa',
  bn_cashForRentRegistration: 'ajNzDaUuLkcEvjQhVsAmao',
  bn_rapidResponse: 'aMJL9DG8qEcULqTZTKQbrq',
  bn_rapidResponse2: 'adpuqZypnqHb8LNfX49iA5',
  bn_rapidResponseSida: 'aTJRd5zLdPHcEhGDovh9dW',
  bn_re: 'aKgX4MNs6gCemDQKPeXxY8',
  cbp_pre_post: 'aHSQ7cJKbGoBs3F5DGSf8Y',
  conflict_pre_post: 'atG7X5hrbXbR9eseskUoCq',
  conflict_trainings: 'arEDCmKLXgKRcxoddunFgq',
  cs_tracker: 'ac5Xu2t2vJ97WneTGaSVNH',
  ecrec_cashRegistration: 'aE5md7RfHiy4LJmddoFAQH',
  ecrec_cashRegistrationBha: 'aQCGR2fESUNFMYKVHMyAET',
  ecrec_mbg: 'amCfEFHyK5BEwxsAA2Babr',
  ecrec_msmeGrantEoi: 'awYf9G3sZB4grG8S4w3Wt8',
  ecrec_msmeGrantReg: 'aoJppKLX7QvSkMYokUfEjB',
  ecrec_msmeGrantSelection: 'aQkWZkWjVpJsqZ3tYtuwFZ',
  ecrec_small_scale: 'aGLgXRGGXGrwtJc8y9mEUQ',
  ecrec_subsistance: 'acWaJmM4PAj2zbiw75rcRk',
  ecrec_vet2_dmfa: 'ag34YtGDQiW5FstyAxzy5P',
  ecrec_vetApplication: 'aGGGapARnC2ek7sA6SuHmu',
  ecrec_vetEvaluation: 'a4iDDoLpUJHbu6cwsn2fnG',
  ecrec_vet_bha388: 'aLEGqicGyzkZCeCYeWqEyG',
  legal_individual_aid: 'aJxhKpk5fw5SYjEkBopxvJ',
  legal_individual_aid_partners: 'aBzcRWZfNsYcavdadrgmsA',
  legal_pam: 'a3puEbm9w4ME323B6werxJ',
  meal_cashPdm: 'aEKoPVd36PLRrmqWgk42DG',
  meal_cfmExternal: 'aJaGLvGEdpYWk5ift8k87y',
  meal_cfmInternal: 'aN3Y8JeH2fU3GthrWAs9FG',
  meal_eorePdm: 'aTHMDjqm7jodctcrBE4bS7',
  meal_nfiPdm: 'aLyuPbbNSWsW6rcAixq3Eu',
  meal_pdmStandardised: 'aCWKwfvJ6F48HxUZTrr9L7',
  meal_pssPdm: 'a7bAcCujpff6E94FPRubzS',
  meal_shelterPdm: 'a7iHZCW28ncZY7iDcqVF49',
  meal_verificationEcrec: 'aEN2tkQhpsfX4G3i6Re7bi',
  meal_verificationPartnerBnre: 'awDJ8L8B77AvV9SDLYPis9',
  meal_verificationWinterization: 'aAWVLi8bSb2S8bHc5CcL8i',
  meal_visitMonitoring: 'a8GkjWBQDfxVADGHWJDrUw',
  meal_winterizationPdm: 'aj5hf3xf3jH7Uq5z7nYny4',
  partner_angels: 'aSK3rbp4gbRWmaGUL5eN5v',
  partner_lampa: 'axkkzwvccFtUkkL3BzSSnW',
  partner_misto_syly: 'aHr7429Q2n2YvBBJunx7b9',
  partner_pomogaem: 'awpFpKtZZYEDuaZbqPi944',
  partnership_assessment: 'aLD2Xc9cKSY22c5cAP5utT',
  partnership_initialQuestionnaire: 'a6u7CBysEz746Hdx6pVLzp',
  partnership_partnersDatabase: 'aLs32U5Qc9HfQ5mxQtsEML',
  protection_coc: 'aRBEzakmsMPpw8VoJG8Gpk',
  protection_communityMonitoring: 'aQHBhYgevdzw8TR2Vq2ZdR',
  protection_counselling: 'a2ck63vPA7hkk8aEhNTSUJ',
  protection_gbv: 'a5Noq6Wf9a8aE2cmi74FyS',
  protection_gbvPdm: 'aiKSgfpAqreCjd6P47GC42',
  protection_gbvSocialProviders: 'aKrbJdapRxfdPgXb3KqzHd',
  protection_groupSession: 'a8Tn94arrSaH2FQBhUa9Zo',
  protection_hhs1: 'aFU8x6tHksveU2c3hK7RUG',
  protection_hhs2: 'aRHsewShwZhXiy8jrBj9zf',
  protection_hhs2_1: 'aQDZ2xhPUnNd43XzuQucVR',
  protection_hhs3: 'aDmHHT6QzBSwwy9WZcTRrM',
  protection_pfa_training_test: 'a68LY3yZUXn6iTNvDCivtB',
  protection_pss: 'a52hN5iiCW73mxqqfmEAfp',
  protection_referral: 'a62ZpworuN4nFLznsUej8r',
  pseah_training_tracker: 'aRBEzakmsMPpw8VoJG8Gpk',
  safeguarding_psea: 'afq5ayhc2kssnomB8LR4oX',
  safety_incident: 'aAJNkn7v9fRL2XqQCgEkXf',
  shelter_cashForRepair: 'a9CjhyhTKVojCdArKmw9yM',
  shelter_cashForShelter: 'aQgRrYdwHuvWbj23LpywPF',
  shelter_north: 'aCPdwVnnsYeReynJ7YnLGH',
  shelter_nta: 'aL8oHMzJJ9soPepvK6YU9E',
  shelter_ta: 'aTP5nwZjpyR7oy7bdMZktC',
  va_bio_tia: 'aKZW9UTf9nqfiLhxtjcT3d',
}

const koboFormById: Record<string, KoboFormName> = seq(Obj.entries(koboIndex)).reduceObject(([k, v]) => [v, k])

const koboFormTranslation: Record<KoboFormName, string> = {
  awareness_raising_partners: '[Legal] (PARTNERS) Awareness raising sessions',
  bn_0_mpcaReg: '[Basic Needs] v0 MPCA Registration',
  bn_0_mpcaRegESign: '[Basic Needs] v0 MPCA Registration (GREENLIGHT WITH ESIGNATURE)',
  bn_0_mpcaRegNewShort: '[Basic Needs] v0 MPCA Registration (NEW-SHORT 01102022)',
  bn_0_mpcaRegNoSig: '[Basic Needs] v0 MPCA Registration (GREENLIGHT WITH CONSENT - NO SIGNATURE)',
  bn_1_mpcaNfi: '[Basic Needs] v1 Joint MPCA-NFI Registration',
  bn_1_mpcaNfiMyko: '[Basic Needs] v1 Joint MPCA-NFI Registration (Mykolaiv Short Form)',
  bn_1_mpcaNfiNaa: '[Basic Needs] v1 Joint MPCA-NFI Registration Form (NAA Trial)',
  bn_cashForRentApplication: '[Basic Needs] Cash for Rent Application',
  bn_cashForRentRegistration: '[Basic Needs] Cash for Rent Registration',
  bn_rapidResponse: '[Basic Needs] Rapid Response Mechanism',
  bn_rapidResponse2: '[Basic Needs] Rapid Response Mechanism v2',
  bn_rapidResponseSida: '[Basic Needs] RRM SIDA',
  bn_re: '[Basic Needs] Registration and Evaluation Form',
  cbp_pre_post: '[Protection] CBP Trainings - Pre/post test',
  conflict_pre_post: '[Peacebuilding] Conflict Sensitivity Training Pre-Post Test',
  conflict_trainings: '[Peacebuilding] Conflict Sensitivity Trainings',
  cs_tracker: '[Peacebuilding] CS Training Tracker',
  ecrec_cashRegistration: '[Ecrec] Cash Registration Agricultural Inputs',
  ecrec_cashRegistrationBha: '[Ecrec] Cash Registration Improve Agricultural Production (BHA)',
  ecrec_mbg: '[Ecrec] MBG',
  ecrec_msmeGrantEoi: '[Ecrec] MSME EOI',
  ecrec_msmeGrantReg: '[Ecrec] MSME grant registration form',
  ecrec_msmeGrantSelection: '[Ecrec] MSME Grant Selection',
  ecrec_small_scale: '[Ecrec] Small Scale Farmer Registration Form',
  ecrec_subsistance: '[Ecrec] Subsistance farmer registration',
  ecrec_vet2_dmfa: '[Ecrec] VET DMFA355 grant registration form',
  ecrec_vetApplication:
    '[Ecrec] VET - Training grants - we are now accepting applications / Гранти на навчання — відкриваємо прийом заявок',
  ecrec_vetEvaluation: '[Ecrec] VET - Candidate evaluation',
  ecrec_vet_bha388: '[Ecrec] VET BHA388 grant registration form',
  legal_individual_aid: '[Legal] Individual Legal Aid Form',
  legal_individual_aid_partners: '[Legal] (PARTNERS) Individual Legal Aid Form',
  legal_pam: '[MEAL] Legal Aid PAM Master',
  meal_cashPdm: '[MEAL] Cash PDM',
  meal_cfmExternal: '[MEAL] Cfm External',
  meal_cfmInternal: '[MEAL] Cfm Internal',
  meal_eorePdm: '[MEAL] EORE PDM',
  meal_nfiPdm: '[MEAL] NFI PDM',
  meal_pdmStandardised: '[MEAL] MPCA Standardised PDM',
  meal_pssPdm: '[MEAL] PSS PDM',
  meal_shelterPdm: '[MEAL] Shelter PDM',
  meal_verificationEcrec: '[MEAL] Verification EcRec',
  meal_verificationPartnerBnre: '[MEAL] Verification Partner BNRE',
  meal_verificationWinterization: '[MEAL] Verification Winterization',
  meal_visitMonitoring: '[MEAL] Field Visit Monitoring',
  meal_winterizationPdm: 'Winterization 2024-2025 PDM',
  partner_angels: '[Verification] UKRF №155 DRC-200 Реєстрація на отримання грошей на паливо',
  partner_lampa: '[Verification] NGO LAMPA CASH FOR SOLID FUEL',
  partner_misto_syly: '[Verification] DRC-203 (Misto Syly)',
  partner_pomogaem: '[Verification] DRC_Pomagaem_UHF',
  partnership_assessment: '[Partnership] CBP CSO Assessment',
  partnership_initialQuestionnaire: '[Partnership] CBP CSO Initial Questionnaire',
  partnership_partnersDatabase: '[Partnership] DRC Partners Database',
  protection_coc: '[Protection] GBV PSEAH & CoC Training',
  protection_communityMonitoring: '[Protection] Community Monitoring',
  protection_counselling: '[Protection] Counselling',
  protection_gbv: '[Protection] GBV',
  protection_gbvPdm: 'Dignity Kit GBV PDM',
  protection_gbvSocialProviders: '[Protection] GBV Survey for social service providers',
  protection_groupSession: '[Protection] Group Session',
  protection_hhs1: '[Protection] HHS (old v1)',
  protection_hhs2: '[Protection] HHS v2 (deprecated)',
  protection_hhs2_1: '[Protection] HHS v2',
  protection_hhs3: '[Protection] Household Survey',
  protection_pfa_training_test: '[Protection] PFA Training - Pre/post test',
  protection_pss: '[Protection] PSS',
  protection_referral: '[Protection] Referral Tracking Form',
  pseah_training_tracker: 'DRC - PSEAH Training tracker',
  safeguarding_psea: '[Safeguarding] Tracker of trainings on Safeguarding and PSEA of partners in DRC',
  safety_incident: '[Safety] Incident tracker',
  shelter_cashForRepair: '[Shelter] Cash for Repairs Registration Form',
  shelter_cashForShelter: '[Shelter] Cash for Shelter',
  shelter_north: '[Shelter] North',
  shelter_nta: '[Shelter] NTA',
  shelter_ta: '[Shelter] TA',
  va_bio_tia: '[VA] BIO & TIA Assessment form',
}

export type KoboFormName = keyof typeof koboIndex

export namespace KoboIndex {
  export interface ParsedForm {
    name: string
    program?: string
    donors?: string[]
  }

  export const names = Obj.keys(koboIndex)

  export const parseFormName = (name: string): ParsedForm => {
    const match = name.match(/^\[(.*?)]\s*(?:\{(.*?)})?\s*(.*)$/)
    if (match) {
      const [, sector, donors, formName] = match

      return {
        program: sector,
        name: formName,
        donors: donors?.split(','),
      }
    }

    return {
      name,
    }
  }

  export const byName = (name: keyof typeof koboIndex) => {
    const id = koboIndex[name]
    const translation = koboFormTranslation[name]

    return {
      name,
      id,
      translation,
      parsed: parseFormName(translation),
    }
  }

  export const searchById = (id: string) => {
    const name = koboFormById[id]
    const translation = koboFormTranslation[name]
    if (name)
      return {
        name,
        id,
        translation,
      }
  }
}
