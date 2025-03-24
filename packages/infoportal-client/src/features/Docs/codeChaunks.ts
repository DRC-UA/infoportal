const rrmFormStructureJson = `{
  "root": "co7iurtm513bt64h7u",
  "forms": {
    "cideet6m4jy2m0fy3x": {
      "id": "cideet6m4jy2m0fy3x",
      "schema": {
        "id": "cideet6m4jy2m0fy3x",
        "databaseId": "c7rcg6gm4jy2gsj2",
        "label": "Partner",
        "elements": [
          {
            "id": "cc206ssm4s8fpt52",
            "code": "Partner_ID",
            "label": "ID"
          }
        ]
      }
    },
    "ckt3l0m4wiw1n92": {
      "id": "ckt3l0m4wiw1n92",
      "schema": {
        "id": "ckt3l0m4wiw1n92",
        "databaseId": "c7rcg6gm4jy2gsj2",
        "label": "Collective Sites",
        "elements": [
          {
            "id": "cnwy51cm4wiwi9m3",
            "code": "Site_Pcode",
            "label": "Site Pcode"
          }
        ]
      }
    },
    "ctica5gm4r928td16": {
      "id": "ctica5gm4r928td16",
      "schema": {
        "id": "ctica5gm4r928td16",
        "databaseId": "c7rcg6gm4jy2gsj2",
        "label": "Indicators - Protection",
        "elements": [
          {
            "id": "cmkuysum4r92lre17",
            "code": "cluster_short",
            "label": "Cluster Short"
          }
        ]
      }
    },
    "ciok70dm4r8lp7f2": {
      "id": "ciok70dm4r8lp7f2",
      "schema": {
        "id": "ciok70dm4r8lp7f2",
        "databaseId": "c7rcg6gm4jy2gsj2",
        "label": "Admin 1",
        "elements": [
          {
            "id": "c30hinjm4r8ojix3",
            "code": "Oblast",
            "label": "Oblast"
          }
        ]
      }
    },
    "csd3f5bm4tt7flx1amn": {
      "id": "csd3f5bm4tt7flx1amn",
      "schema": {
        "id": "csd3f5bm4tt7flx1amn",
        "databaseId": "c7rcg6gm4jy2gsj2",
        "label": "Activity Planning Module (GBV)",
        "elements": [
          {
            "id": "csbbhepm4sgfamsa",
            "code": "plan_id",
            "label": "ID"
          }
        ]
      }
    },
    "cgczbtmm513bt64h7v": {
      "id": "cgczbtmm513bt64h7v",
      "schema": {
        "id": "cgczbtmm513bt64h7v",
        "databaseId": "c7rcg6gm4jy2gsj2",
        "label": "Activities and People",
        "elements": [
          {
            "id": "c9znya5m6j1fwro6",
            "code": "month_rep",
            "label": "Reporting Month"
          }
        ]
      }
    },
    "c3m2htlm4s9h25d16": {
      "id": "c3m2htlm4s9h25d16",
      "schema": {
        "id": "c3m2htlm4s9h25d16",
        "databaseId": "c7rcg6gm4jy2gsj2",
        "label": "Donor",
        "elements": [
          {
            "id": "c2d226um4s9hr8v17",
            "code": "ORGNAMEENG",
            "label": "Organization Name ENG",
            "typeParameters": {
              "range": [
                {
                  "formId": "c1v215km4s71ndl22"
                }
              ]
            }
          }
        ]
      }
    },
    "co7iurtm513bt64h7u": {
      "id": "co7iurtm513bt64h7u",
      "schema": {
        "id": "co7iurtm513bt64h7u",
        "databaseId": "c7rcg6gm4jy2gsj2",
        "label": "GBV AoR RMM",
        "elements": [
          {
            "id": "c9jwta5m4whznd44",
            "code": "RMM_ID",
            "label": "ID"
          }
        ]
      }
    }
  }
}`

const reportBody = `{
  "changes": [
    {
      "formId": "co7iurtm513bt64h7u",
      "recordId": "drcgbv202502000",
      "parentRecordId": null,
      "fields": {
        "chkoxzhm4wi1a2f5": "cideet6m4jy2m0fy3x:cjmwszwm4s8hlkyrae",
        "ccqwr7rm52ju6299": "csd3f5bm4tt7flx1amn:cttpclmm7ueb7126",
        "ce9pjx6m4wihjfpa": "ciok70dm4r8lp7f2:c59kitcm4r8z2zgh",
        "cp70mkkm4wil1q7d": "cyr4ry4m4s81hdd6v:cbvvjepm5mqeqhhmxa",
        "cy52j7km4wiqb94g": "crfw0hkm4wiqb94f"
      }
    },
    {
      "formId": "cgczbtmm513bt64h7v",
      "recordId": "drcgbv202502000i00",
      "parentRecordId": "drcgbv202502000",
      "fields": {
        "c9znya5m6j1fwro6": "2025-02",
        "ckgn2n6m4wk2393o": "ctica5gm4r928td16:coarog2m6g8dljqo",
        "cxcth1bm4wk7dvms": 19,
        "ce79tc4m4wkdpd4t": 0,
        "csq1r47m4wl091ky": 0,
        "ctm6pddm4wl2ky2z": 1,
        "c3knsqem4wl8nfu14": 0
      }
    }
  ]
}`

const typeBuilderFormIds = `private formIds = {
  [sector]: formId,
},`

const sectorSchemaGenerator = `readonly definition = {
  [sector]: () =>
    this.builder.generateSchema({
      formId: this.formIds[sector],
      questionSettings: {
        [question label]: {skipChoices: true},
        [another question label]: {skipChoices: true},
        [one more question label]: {
          filterChoices: (choices) => choices.includes('Danish Refugee Council'),
        }, // to skip inrrelevant options, we don't need them to overload the interface
      },
    }),
  },
}`

const indicators = `// packages/infoportal-client/src/features/ActivityInfo/Gbv/aiGbvType.ts

export namespace AiTypeActivitiesAndPeople {
  ...
  export const options = {
    'Indicators - Protection': {
      'GBV case management > # of individuals supported with GBV case management that meet GBViE minimum standards':
        'ca16hqom6g8dljp4',
      },
    },
  ...
  },
}`

const interfaceGeneratorCommand = `// packages/infoportal-scripts/src/index.ts
  ...
  await new ActivityInfoBuildType().definition.gbv()`

export {
  rrmFormStructureJson,
  reportBody,
  typeBuilderFormIds,
  sectorSchemaGenerator,
  indicators,
  interfaceGeneratorCommand,
}
