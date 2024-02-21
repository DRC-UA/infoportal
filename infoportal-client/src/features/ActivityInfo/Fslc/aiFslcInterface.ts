import {aiHromadas, aiOblasts, aiRaions, DrcProject} from '@infoportal-common'

export namespace AiTypeFslc {
  export type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

  export interface Type {
    'Partner Organization': Opt<'Partner Organization'>,
    'Donor'?: Opt<'Donor'>,
    'Report to a planned project?': Opt<'Report to a planned project?'>,
    'Project (FSLC-Updated)': Opt<'Project (FSLC-Updated)'>,
    'Oblast': string,
    'Raion': string,
    'Hromada': string,
    'Settlement'?: string,
    'Collective Sites'?: string,
    'Response Theme'?: Opt<'Response Theme'>,
    'Response Plan': Opt<'Response Plan'>,
    'Reporting Month': string,
    'Population Group': Opt<'Population Group'>,
    'FSLC Indicators': Opt<'FSLC Indicators'>,
    'Activity status': Opt<'Activity status'>,
    'Activity Start Date'?: string,
    'Activity End Date'?: string,
    'Assistance Modality': Opt<'Assistance Modality'>,
    'Cash Delivery Mechanism'?: Opt<'Cash Delivery Mechanism'>,
    'Value per unit'?: number,
    'Currency'?: Opt<'Currency'>,
    'Frequency'?: Opt<'Frequency'>,
    // Informative, not reported
    'Households': number,
    'Total Individuals Reached': number,
    'New unique Individuals Reached': number,
    'Girls': number,
    'Boys': number,
    'Adult Women': number,
    'Adult Men': number,
    'Elderly Women': number,
    'Elderly Men': number,
    'People with Disability'?: number,
    // 'Non-Individual': number,
    'Comments'?: string,
  }

  export const map = (a: Type) => ({
    'ci607odlbs8w4pe2': a['Partner Organization'] === undefined ? undefined : 'cr4xx3dlbs86w9y2' + ':' + options['Partner Organization'][a['Partner Organization']!],
    'c1hl9qdlgao5ayp4': a['Donor'] === undefined ? undefined : 'cacmfplleguhh3k2' + ':' + options['Donor'][a['Donor']!],
    'c2vfxebldx0r9o81v': a['Report to a planned project?'] === undefined ? undefined : options['Report to a planned project?'][a['Report to a planned project?']!],
    'ck2o0khldbolhev5': a['Project (FSLC-Updated)'] === undefined ? undefined : 'cwthx6rldboa6hq2' + ':' + options['Project (FSLC-Updated)'][a['Project (FSLC-Updated)']!],
    // 'ct3cvkildbgub3b7': a['Oblast'] === undefined ? undefined : a['Oblast'],
    // 'c48optvldbguv498': a['Raion'] === undefined ? undefined : a['Raion'],
    // 'cfml2chldbgvdfb9': a['Hromada'] === undefined ? undefined : a['Hromada'],
    // @ts-ignore
    'ct3cvkildbgub3b7': 'cg7v61llbunvy9t9:' + aiOblasts[a['Oblast']],
    // @ts-ignore
    'c48optvldbguv498': 'cjy8nbnlbunzcnh1h:' + aiRaions[a['Raion']],
    // @ts-ignore
    'cfml2chldbgvdfb9': 'c700rjplbuo1fjq5m:' + aiHromadas[a['Hromada']],
    'c4n35tdldbgvsxja': a['Settlement'] === undefined ? undefined : a['Settlement'],
    'c90oollldbgwf09c': a['Collective Sites'] === undefined ? undefined : a['Collective Sites'],
    'ct7r8hmldx1yr4g2j': a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!],
    'chf9ihtlgaoar5yb': a['Response Plan'] === undefined ? undefined : options['Response Plan'][a['Response Plan']!],
    'cky74kaldx0oc8y1o': a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    'cphrh9zld4hec1z11': a['Population Group'] === undefined ? undefined : 'cqjd0o4ld4hbyo12' + ':' + options['Population Group'][a['Population Group']!],
    'c3xw7azldx0iliq1n': a['FSLC Indicators'] === undefined ? undefined : 'c2e6fmmldx0ch3ym' + ':' + options['FSLC Indicators'][a['FSLC Indicators']!],
    'cm96uc7lgaocv8oj': a['Activity status'] === undefined ? undefined : options['Activity status'][a['Activity status']!],
    'cp1kiaqlgaq5rwv2': a['Activity Start Date'] === undefined ? undefined : a['Activity Start Date'],
    'cj4390tlgaq6r3r3': a['Activity End Date'] === undefined ? undefined : a['Activity End Date'],
    'cmknpwjlgaq9y44a': a['Assistance Modality'] === undefined ? undefined : options['Assistance Modality'][a['Assistance Modality']!],
    'ch96ikblgaqflfc9': a['Cash Delivery Mechanism'] === undefined ? undefined : options['Cash Delivery Mechanism'][a['Cash Delivery Mechanism']!],
    'caxf48lgdeplu44': a['Value per unit'] === undefined ? undefined : a['Value per unit'],
    'cm8t708lgaqnhct13': a['Currency'] === undefined ? undefined : options['Currency'][a['Currency']!],
    'cbq93y6lgaqoeix1b': a['Frequency'] === undefined ? undefined : options['Frequency'][a['Frequency']!],
    'cl6k2uhldx1jlxl20': a['Total Individuals Reached'] === undefined ? undefined : a['Total Individuals Reached'],
    'cor4avglg0yjm8dt': a['New unique Individuals Reached'] === undefined ? undefined : a['New unique Individuals Reached'],
    'c6hlkmuld46ym4x4': a['Girls'] === undefined ? undefined : a['Girls'],
    'czerknsld396032n': a['Boys'] === undefined ? undefined : a['Boys'],
    'cavpa31ld46yyxg5': a['Adult Women'] === undefined ? undefined : a['Adult Women'],
    'cmcand4ld47x22ta': a['Adult Men'] === undefined ? undefined : a['Adult Men'],
    'cxckv4bld8u9ss51d': a['Elderly Women'] === undefined ? undefined : a['Elderly Women'],
    'cchdmp6ld8ubde01g': a['Elderly Men'] === undefined ? undefined : a['Elderly Men'],
    'cjhwvopld8ud9im1k': a['People with Disability'] === undefined ? undefined : a['People with Disability'],
    'cfqc2zulgao7k5e5': a['Comments'] === undefined ? undefined : a['Comments'],
  })

  export const options = {
    'Partner Organization': {
      'Danish Refugee Council': 'cv9umq8lehiq43f103'
    },
    'Donor': {
      'UHF': 'cahm0omlegumytc5ti',
    },
    'Report to a planned project?': {
      'Yes': 'cocupbnldx0r9o81u',
      'No': 'ca1wo2zldx0u4g61x'
    },
    'Project (FSLC-Updated)': {
      [DrcProject['UKR-000352 UHF7']]: 'c2eil8zlpv60tm82',
      [DrcProject['UKR-000336 UHF6']]: 'c89u324lpwcumwi5'
    },
    'Response Theme': {
      'Newly retaken areas': 'c7khfilldx1yr4g2i',
      'Winter response': 'cah8q3pldx1zblp2k'
    },
    'Response Plan': {
      'Flash Appeal': 'c93ft2rlgaobcnxc',
      'HRP 2023': 'csqea3olgaoar5ya',
      'Others': 'cv9jp7klgaobgu4d'
    },
    'Population Group': {
      'IDPs': 'co8y3rvld4hchx14',
      'Non-Displaced': 'cl76cbild4hcq8i5',
      'Returnees': 'cxbkri3ld4hcx9z6'
    },
    'FSLC Indicators': {
      'Agriculture and livestock inputs (cash)': 'ce6blj2lg0yeodzk',
    },
    'Activity status': {
      'Completed': 'cjouicvlgaod9vbk',
      'Ongoing': 'c2e4naylgaocv8oi'
    },
    'Assistance Modality': {
      'Cash or Voucher': 'cmkdx6algaqafv2b',
      'In-kind or Service Delivery': 'cefrb6algaq9y449'
    },
    'Cash Delivery Mechanism': {
      'ATM Card': 'c1v3rwplgaqflfc8',
      'Bank Transfer': 'cnxjryqlgaqfxhfa',
      'Direct cash payment': 'ckmzoeclgaqio2fb',
      'E-Transfer': 'cdy1u5jlgaqiwc5c',
      'E-Voucher': 'cycufbtlgaqj4ihd',
      'Mobile Money': 'ctn8ommlgaqj6sme',
      'Money Transfer Agent': 'cx2gm7hlgaqj9jbf',
      'Paper Voucher': 'c3e36onlgaqjhb0g',
      'Post Office': 'cy0yw1glgaqjob7h',
      'Other mechanisms': 'ce5uoeflgaqk1z6j'
    },
    'Currency': {
      'UAH': 'cfgswu4lgaqnnf514',
      'USD': 'cnbnp4rlgaqnplz15',
      'EUR': 'cybl09flgaqnhct12'
    },
    'Frequency': {
      'Weekly': 'cg8w3oslgaqoeix1a',
      'Fortnight': 'cz79bbflgaqoms41c',
      'Monthly': 'cqadz85lgaqor1v1d',
      'Quarterly': 'cwsibhhlgaqovu31e',
      'One-off': 'c745buflgaqp5l01f',
      'Others': 'c7e1066lgaqpan61g'
    },
    'Plan Type': {
      'HRP 2023': 'coj4hszlbs8ffnr14',
      'Funding carryover from the FA 2022': 'cjpdn0vlbs8ffnr15',
      'Other': 'c34rucblbs8ffnr16'
    },
    'Project Status': {
      'Planned - Funding has been requested (proposal submitted)': 'c7lrjxelbs8ffnr19',
      'Confirmed - Funding committed, project is yet to commence': 'c46umzblbs8ffnr1a'
    },
    'Funding Status': {
      'Fully funded': 'crjialnlbs8ffnr1e',
      'Partially funded': 'chiotsslbs8ffnr1f',
      'Unfunded': 'cafj3ehlbs8ffnr1g'
    },
  }
}

const ex1 = {
  'changes':
    [{
      'formId': 'csgkp3xlg0yezpb8',
      'recordId': 'cjrbxg8lpwfef1p2',
      'parentRecordId': null,
      'fields': {
        'ci607odlbs8w4pe2': 'cr4xx3dlbs86w9y2:cv9umq8lehiq43f103',
        'c1hl9qdlgao5ayp4': 'cacmfplleguhh3k2:cahm0omlegumytc5ti',
        'c2vfxebldx0r9o81v': 'ca1wo2zldx0u4g61x', //Report to a planned project?
        'ct3cvkildbgub3b7': 'cg7v61llbunvy9t9:ctohs39lebrkckc5', // Oblast
        'c48optvldbguv498': 'cjy8nbnlbunzcnh1h:cpdb6rtlecp1fu23p', // Raion
        'cfml2chldbgvdfb9': 'c700rjplbuo1fjq5m:cyw9qdxlebsue991aj', // Hromada
        'ct7r8hmldx1yr4g2j': 'c7khfilldx1yr4g2i', // Response Theme
        'chf9ihtlgaoar5yb': 'csqea3olgaoar5ya', // Response Plan
        'cky74kaldx0oc8y1o': '2023-11', // Reporting Month
        'cphrh9zld4hec1z11': 'cqjd0o4ld4hbyo12:co8y3rvld4hchx14', // Population Group = IDP
        'c3xw7azldx0iliq1n': 'c2e6fmmldx0ch3ym:ce6blj2lg0yeodzk', // FSLC Indicators
        'cm96uc7lgaocv8oj': 'cjouicvlgaod9vbk', // Activity status
        'cp1kiaqlgaq5rwv2': '2023-10-01',
        'cj4390tlgaq6r3r3': '2023-10-01',
        'cmknpwjlgaq9y44a': 'cmkdx6algaqafv2b', // Assistance Modality
        'ch96ikblgaqflfc9': 'cnxjryqlgaqfxhfa', // Cash Delivery Mechanism
        'caxf48lgdeplu44': 7500,
        'cm8t708lgaqnhct13': 'cfgswu4lgaqnnf514', // Currency
        'cbq93y6lgaqoeix1b': 'c745buflgaqp5l01f', // Frequency
        'cl6k2uhldx1jlxl20': 27,
        'cor4avglg0yjm8dt': 1,
        'c6hlkmuld46ym4x4': 2,
        'czerknsld396032n': 3,
        'cavpa31ld46yyxg5': 4,
        'cmcand4ld47x22ta': 5,
        'cxckv4bld8u9ss51d': 6,
        'cchdmp6ld8ubde01g': 7,
        'cjhwvopld8ud9im1k': 1
      }
    }]
}
