export const koboServerId = {
  prod: '4820279f-6c3d-47ba-8afe-47f86b16ab5d',
  dev: 'b90ec4b4-4426-48f3-a924-f6a1866ee698'
}

export const koboFormsId = {
  prod: {
    shelter_NTA: 'aL8oHMzJJ9soPepvK6YU9E',
    shelter_TA: 'aTP5nwZjpyR7oy7bdMZktC',
    shelter_cashForRepair: 'a9CjhyhTKVojCdArKmw9yM',
    shelter_north: 'aCPdwVnnsYeReynJ7YnLGH',
    safety_incident: 'aAJNkn7v9fRL2XqQCgEkXf',
    bn_re: 'aKgX4MNs6gCemDQKPeXxY8',
    bn_1_mpcaNfi: 'a4Sx3PrFMDAMZEGsyzgJJg',
    bn_1_mpcaNfiMyko: 'a8WAWB9Yxu2jkgk4Ei8GTk',
    bn_1_mpcaNfiNaa: 'aBGVXW2N26DaLehmKneuyB',
    bn_rapidResponseSidar: 'aTJRd5zLdPHcEhGDovh9dW',
    bn_rapidResponse: 'aMJL9DG8qEcULqTZTKQbrq',
    bn_cashForRentApplication: 'aBupWbhtUmA7so3532tYLa',
    bn_cashForRentRegistration: 'ajNzDaUuLkcEvjQhVsAmao',
    bn_0_mpcaRegNewShort: 'a5kgQdqZLLNTLSmC8DK7Eq',
    bn_0_mpcaReg: 'aEwY33SAtdayNTeHoiJfdg',
    bn_0_mpcaRegNoSig: 'aHuWQPkrC43qBfTmJvoLqg',
    bn_0_mpcaRegESign: 'a8JXohrBDqTdCc86Ysz26r',
    mealCfmInternal: 'aN3Y8JeH2fU3GthrWAs9FG',
    mealCfmExternal: 'aJaGLvGEdpYWk5ift8k87y',
    meal_VisitMonitoring: 'a8GkjWBQDfxVADGHWJDrUw',
    meal_VerificationEcrec: 'aEN2tkQhpsfX4G3i6Re7bi',
    meal_VerificationWinterization: 'aAWVLi8bSb2S8bHc5CcL8i',
    ecrec_cashRegistration: 'aE5md7RfHiy4LJmddoFAQH',
    ecrec_cashRegistrationBha: 'aQCGR2fESUNFMYKVHMyAET',
    protection_hhs3: 'aDmHHT6QzBSwwy9WZcTRrM',
    // protection_hhs3: 'aSU7zeDx6vhW73RnUnd6vb',
    // protection_hhs3: 'aELsEdoTp3gNXgcmcMGKhK',
    protection_hhs2_1: 'aQDZ2xhPUnNd43XzuQucVR',
    protection_Hhs2: 'aRHsewShwZhXiy8jrBj9zf',
    protection_Hhs1: 'aFU8x6tHksveU2c3hK7RUG',
    protection_communityMonitoring: 'aQHBhYgevdzw8TR2Vq2ZdR',
    protection_groupSession: 'a8Tn94arrSaH2FQBhUa9Zo',
    protection_pss: 'a52hN5iiCW73mxqqfmEAfp',
    protection_gbv: 'a5Noq6Wf9a8aE2cmi74FyS',
    partnership_partnersDatabase: 'aLs32U5Qc9HfQ5mxQtsEML',
    partnership_initialQuestionnaire: 'a6u7CBysEz746Hdx6pVLzp',
    partnership_assessment: 'aLD2Xc9cKSY22c5cAP5utT',
  },
  dev: {
    fcrmMpca: 'aQRGMGocoAhcMLaHDh2Tbn',
    fcrmMpcaMyko: 'aLRh952v3QJ6MdXd2M2WVq',
    fcrmMpcaNAA: 'aPPgvLA2YZUCX2hU8thw22',
  }
}

interface KoboForm {
  id: string
  name: string
  server: string
  groupName: string
}
