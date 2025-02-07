export namespace AiTypeSnfi {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    /**
      Reporting Organization    */
    org_rep: Opt<'org_rep'>
    /**
      Implementing Partner    */
    org_imp?: Opt<'org_imp'>
    /**
      Plan/Project Code    */
    plan_code: Opt<'plan_code'>
    /**
      Indicators - SNFI    */
    indicator: Opt<'indicator'>
    /**
      Distribution through Common Pipeline
      Select yes if items were received through the common pipeline.    */
    pipeline: Opt<'pipeline'>
    /**
      Distribution through inter-agency convoy (HOPC)
      Select yes if items were distributed through inter-agency convoy    */
    convoy: Opt<'convoy'>
    /**
      Oblast    */
    adm1: Opt<'adm1'>
    /**
      Raion    */
    adm2: string
    /**
      Hromada    */
    adm3: string
    /**
      Settlement    */
    adm4: string
    /**
      Collective Site    */
    cs?: string
    /**
      Date of completion/ distribution (YYYY-MM-DD)    */
    date_rep: string
    /**
      Reporting Month    */
    month_rep: string
    /**
      Population Group    */
    popgroup: Opt<'popgroup'>
    /**
      Non-individuals Reached
      Enter the number of units/ households reached.    */
    nonind: number
    /**
      Total Individuals Reached    */
    ind_total: number
    /**
      Girls (0-17)    */
    ind_girls: number
    /**
      Boys (0-17)    */
    ind_boys: number
    /**
      Adult Women (18-59)    */
    ind_adwomen: number
    /**
      Adult Men (18-59)    */
    ind_admen: number
    /**
      Older Women (60+)    */
    ind_oldwomen: number
    /**
      Older Men (60+)    */
    ind_oldmen: number
    /**
      People with disability
      Out of the total individuals reached    */
    ind_pwd?: number
    /**
      Comment    */
    comment?: string
    /**
      HNRP Scope    */
    hnrp_scope?: Opt<'hnrp_scope'>
    /**
      Outside HNRP Scope sub-categories    */
    outscope_type?: Opt<'outscope_type'>
  }

  export const map = (a: Type) => ({
    cs1qazglr960f863y:
      a['Reporting Organization'] === undefined
        ? undefined
        : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
    cuyzrsclr960f873z:
      a['Implementing Partner'] === undefined
        ? undefined
        : 'czbgrslpwg36j52' + ':' + options['Implementing Partner'][a['Implementing Partner']!],
    cg1pbdjlr965gbs4v:
      a['Plan/Project Code'] === undefined
        ? undefined
        : 'c52pe2mlr95snzf1q' + ':' + options['Plan/Project Code'][a['Plan/Project Code']!],
    c95dt4flrkljpae5:
      a['Indicators - SNFI'] === undefined
        ? undefined
        : 'cfsiyzhlqb3qx23ac' + ':' + options['Indicators - SNFI'][a['Indicators - SNFI']!],
    cryl3w4ls03kgonh:
      a['Distribution through Common Pipeline'] === undefined
        ? undefined
        : options['Distribution through Common Pipeline'][a['Distribution through Common Pipeline']!],
    c9r0xuyls03nuejj:
      a['Distribution through inter-agency convoy (HOPC)'] === undefined
        ? undefined
        : options['Distribution through inter-agency convoy (HOPC)'][
            a['Distribution through inter-agency convoy (HOPC)']!
          ],
    cxff006lr960f8c46:
      a['Oblast'] === undefined ? undefined : 'cemuxawlq3kfmqf2' + ':' + options['Oblast'][a['Oblast']!],
    cu3tssflr960f8c47: a['Raion'] === undefined ? undefined : a['Raion'],
    c3bw3xjlr960f8d48: a['Hromada'] === undefined ? undefined : a['Hromada'],
    cpkkgd9lr960f8d49: a['Settlement'] === undefined ? undefined : a['Settlement'],
    cy26vp3lr960f8e4a: a['Collective Site'] === undefined ? undefined : a['Collective Site'],
    cq4oobolr960f8e4d:
      a['Date of completion/ distribution (YYYY-MM-DD)'] === undefined
        ? undefined
        : a['Date of completion/ distribution (YYYY-MM-DD)'],
    cpljznblr960f8f4e: a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    coklklr960f8i4i:
      a['Population Group'] === undefined
        ? undefined
        : 'cf8ig2alq6dbe8t2' + ':' + options['Population Group'][a['Population Group']!],
    cbzwmwnlr960f8i4k: a['Non-individuals Reached'] === undefined ? undefined : a['Non-individuals Reached'],
    cj9zrudlr960f8j4l: a['Total Individuals Reached'] === undefined ? undefined : a['Total Individuals Reached'],
    ch0ejrblr960f8m4m: a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    c1514a9lr960f8m4n: a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    cjiw5cglr960f8o4o: a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
    cvftzh8lr960f8o4p: a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
    cr5nvs9lr960f8p4q: a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
    cfe87k6lr960f8q4r: a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
    cxoosq1lr960f8r4s: a['People with disability'] === undefined ? undefined : a['People with disability'],
    cgpsrwqlrq4ezo1m: a['Comment'] === undefined ? undefined : a['Comment'],
    cbblsrlw6flwkg3: a['HNRP Scope'] === undefined ? undefined : options['HNRP Scope'][a['HNRP Scope']!],
    c1bexc2lw6fxsdx4:
      a['Outside HNRP Scope sub-categories'] === undefined
        ? undefined
        : 'cs4astklw6ftd2y2' +
          ':' +
          options['Outside HNRP Scope sub-categories'][a['Outside HNRP Scope sub-categories']!],
  })

  export const options = {
    org_rep: {'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'},
    org_imp: {'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'},
    plan_code: {
      'SNFI-DRC-00001': 'cogjzchltfvf0i96',
      'SNFI-DRC-00002': 'comrbdrltfvt2ba7',
      'SNFI-DRC-00003': 'cfk562tltfvw5658',
      'SNFI-DRC-00004': 'cxdte2dltfvym1p9',
      'SNFI-DRC-00005': 'cz4d1myltfw08qza',
      'SNFI-DRC-00006': 'cqpalmjlth6tlpb2',
      'SNFI-DRC-00007': 'chd9sl9ltihdbdn4',
      'SNFI-DRC-00008': 'cb8q500ltjrjl0j4',
      'SNFI-DRC-00010': 'cjf1m7jlw0srvj5pt',
      'SNFI-DRC-00011': 'cxykpi1lw0stqa2pu',
      'SNFI-DRC-00012': 'cbdzwpglycyal8w2',
      'SNFI-DRC-00013': 'c2cv6j1lyfxsykic8',
      'SNFI-DRC-00014': 'c2k6vo4lyoggj6x2',
      'SNFI-DRC-00015': 'c79tdivlzju0vuv2',
      'SNFI-DRC-00016': 'c2us37im38uc9385g',
      'SNFI-DRC-00017': 'c3c2365m4jkyh1u2',
    },
    indicator: {
      'Emergency Construction Material (ECM) and Emergency Shelter Kit (ESK) > # supported with emergency shelter support > In Kind > No specific theme':
        'cqbiyfslrke6ze93',
      'Construction Materials > # supported with construction materials > In Kind > No specific theme':
        'ciikv4xlrke6zea4',
      'Host families support (Prykhystok) > # supported through Prykhystok > Cash > No specific theme':
        'c3tkc5mlrke6zea5',
      'NFIs for households > # supported with NFIs > Cash > No specific theme': 'cdibfn0lrke6zea6',
      'NFIs for households > # supported with NFIs > In Kind > No specific theme': 'cozl3hllrke6zea7',
      'Insulation of substandard houses > # supported through insulation of substandard homes > Cash > Winter response':
        'cmi92iglrke6zea8',
      'Insulation of substandard houses > # supported through insulation of substandard homes > In Kind > Winter response':
        'c2b3oeelrke6zea9',
      'Cash for utilities > # supported with cash for utilities > Cash > Winter response': 'cqq0mzxlrke6zeaa',
      'Provision of sustainable energy at home level > # supported through provision of sustainable energy at the home > Cash > No specific theme':
        'cjcnjnqlrke6zeab',
      'Provision of sustainable energy at home level > # supported through provision of sustainable energy at the home > In Kind > No specific theme':
        'ce94o8wlrke6zeac',
      'Humanitarian repair > # supported with light humanitarian repairs > Cash > No specific theme':
        'coe5n5slrke6zead',
      'Humanitarian repair > # supported with light humanitarian repairs > In Kind > No specific theme':
        'cv42tfvlrke6zeae',
      'Humanitarian repair > # supported with medium humanitarian repairs > Cash > No specific theme':
        'cjtu8tjlrke6zeaf',
      'Humanitarian repair > # supported with medium humanitarian repairs > In Kind > No specific theme':
        'c874hhclrke6zeag',
      'Humanitarian repair of common spaces (multistory) > # supported through repairs to common spaces in multistories > Cash > No specific theme':
        'c7pdvcslrke6zeah',
      'Humanitarian repair of common spaces (multistory) > # supported through repairs to common spaces in multistories > In Kind > No specific theme':
        'c1hggf3lrke6zeai',
      'Rental support > # supported by cash for rent (RMI) > Cash > No specific theme': 'ck09zltlrke6zeaj',
      'Refurbishment of Collective Sites > # supported through refurbishment of collective sites > In Kind > No specific theme':
        'cugh87clrke6zeak',
      'Humanitarian repair of social facilities > # supported through humanitarian repairs of social facilities > Cash > No specific theme':
        'coqqm9slrke6zeal',
      'Humanitarian repair of social facilities > # supported through humanitarian repairs of social facilities > In Kind > No specific theme':
        'cakfcirlrke6zeam',
      'Heavy repair > # supported with heavy humanitarian repairs > Cash > No specific theme': 'cu7r3xtlrke6zebn',
      'Heavy repair > # supported with heavy humanitarian repairs > In Kind > No specific theme': 'clah6j5lrke6zebo',
      'Transitional shelter > # supported with transitional shelter > Cash > No specific theme': 'comaq5nlrke6zebp',
      'Transitional shelter > # supported with transitional shelter > In Kind > No specific theme': 'cvwtyp0lrke6zebq',
      'Provision of white appliances > # supported with white appliances > Cash > No specific theme':
        'cu9qmu0lrke6zebr',
      'Provision of white appliances > # supported with white appliances > In Kind > No specific theme':
        'cgrctz9lrke6zebs',
      'NFIs for households > # supported with NFIs > Voucher > No specific theme': 'cuwfb5ulrke6zebt',
      'Insulation of substandard houses > # supported through insulation of substandard homes > Voucher > Winter response':
        'cf0jhphlrke6zebu',
      'Provision of sustainable energy at home level > # supported through provision of sustainable energy at the home > Voucher > No specific theme':
        'cdnwq5blrke6zebv',
      'Humanitarian repair > # supported with light humanitarian repairs > Voucher > No specific theme':
        'ccagmwilrke6zebw',
      'Humanitarian repair > # supported with medium humanitarian repairs > Voucher > No specific theme':
        'c9f82yflrke6zebx',
      'Provision of white appliances > # supported with white appliances > Voucher > No specific theme':
        'ccw1bxlrke6zeby',
      'Provision of Non-Standard NFIs > # supported with non-standard NFIs > In Kind > No specific theme':
        'ckddjh0lrke6zebz',
      'Reconstructions > # supported with core house reconstruction > In Kind > No specific theme': 'cgpklgxlrke6zeb10',
      'Winter heating appliances > # supported with winter heating appliances > Cash > Winter response':
        'cw1trxolrke6zeb11',
      'Winter heating appliances > # supported with winter heating appliances > In Kind > Winter response':
        'c7aa1telrke6zeb12',
      'Winter energy > # reached with support for winter energy needs (cash/voucher/fuel) > Cash > Winter response':
        'c2w7eoblrke6zeb13',
      'Winter energy > # reached with support for winter energy needs (cash/voucher/fuel) > In Kind > Winter response':
        'cailiytlrke6zeb14',
      'Winter clothing > # supported with winter clothes > Cash > Winter response': 'cesc70ilrke6zeb15',
      'Winter clothing > # supported with winter clothes > In Kind > Winter response': 'cm0qc6flrke6zeb16',
      'NFIs for winter > # supported with winter NFIs > Cash > Winter response': 'c9s84polrke6zeb17',
      'NFIs for winter > # supported with winter NFIs > In Kind > Winter response': 'c8ojxm4lrke6zeb18',
      'Winter heating appliances > # supported with winter heating appliances > Voucher > Winter response':
        'cbjnxfulrke6zeb19',
      'Winter energy > # reached with support for winter energy needs (cash/voucher/fuel) > Voucher > Winter response':
        'c6g9rfklrke6zeb1a',
      'Winter clothing > # supported with winter clothes > Voucher > Winter response': 'cavj34llrke6zeb1b',
      'NFIs for winter > # supported with winter NFIs > Voucher > Winter response': 'cka2oeolrke6zeb1c',
      'Emergency Construction Material (ECM) and Emergency Shelter Kit (ESK) > # of social facilities supported with emergency shelter assistance > In Kind > No specific theme':
        'chv1w0altoknrwq2',
      'Emergency Construction Material (ECM) and Emergency Shelter Kit (ESK) > # of residential units supported with emergency shelter assistance > In Kind > No specific theme':
        'cx9027xltoknrwr3',
      'Construction Materials > # of social facilities supported with construction materials > In Kind > No specific theme':
        'c5hxju4ltoknrwr4',
      'Construction Materials > # supported with construction materials > Voucher > No specific theme':
        'ci1mrkoltoknrwr5',
      'Construction Materials > # of social facilities supported with construction materials > Voucher > No specific theme':
        'ca2bfpkltoknrwr6',
      'Construction Materials > # supported with construction materials > Cash > No specific theme': 'cm8hb0hltoknrwr7',
      'Construction Materials > # of social facilities supported with construction materials > Cash > No specific theme':
        'c2mj2uoltoknrwr8',
      'Insulation of substandard houses > # of residential units upgraded > Cash > No specific theme':
        'catoqfyltoknrwr9',
      'Insulation of substandard houses > # of residential units upgraded > Voucher > No specific theme':
        'conr5sxltoknrwra',
      'Insulation of substandard houses > # of residential units upgraded > In Kind > No specific theme':
        'cnip433ltoknrwrc',
      'Humanitarian repair of common spaces (multistory) > # supported through repairs to common spaces in multistories > Voucher > No specific theme':
        'c9ivog3ltoknrwrd',
      'Humanitarian repair of common spaces (multistory) > # of multistorey apartment buildings repaired > Cash > No specific theme':
        'cluy80hltoknrwre',
      'Humanitarian repair of common spaces (multistory) > # of multistorey apartment buildings repaired > Voucher > No specific theme':
        'cigj143ltoknrwrf',
      'Humanitarian repair of common spaces (multistory) > # of multistorey apartment buildings repaired > In Kind > No specific theme':
        'cq7bkg0ltoknrwrg',
      'Rental support > # supported by cash for rent (RMI) > Voucher > No specific theme': 'cpqr3kxltoknrwrh',
      'Rental support > # secured their accommodation for rent (start-up grant) > Cash > No specific theme':
        'cgvv3ykltoknrwri',
      'Rental support > # secured their accommodation for rent (start-up grant) > Voucher > No specific theme':
        'ckawstlltoknrwrj',
      'Heavy repair > # supported with heavy humanitarian repairs > Voucher > No specific theme': 'cfy79o8ltoknrwrk',
      'Donation of NFIs at bomb shelters > # of individuals supported with NFIs > In Kind > No specific theme':
        'cfafly4ltoknrwrl',
      'Donation of NFIs at bomb shelters > # of kits distributed > In Kind > No specific theme': 'c5rbefpltoknrwrm',
      'Donation of NFIs at transit centres > # of supported with NFIs > In Kind > No specific theme':
        'ci5hi4lltoknrwrn',
      'Donation of NFIs at transit centres > # of kits distributed > In Kind > No specific theme': 'c6m2po0ltoknrwro',
      'Donation of NFIs at Heating points > # of supported with NFIs > In Kind > No specific theme': 'c73w16tltoknrwrp',
      'Donation of NFIs at Heating points > # of kits distributed > In Kind > No specific theme': 'c5lj76vltoknrwrq',
      'Donation of NFIs at Invincibility Points > # of supported with NFIs > In Kind > No specific theme':
        'chuli9pltoknrwrr',
      'Donation of NFIs at Invincibility Points > # of kits distributed > In Kind > No specific theme':
        'cm1bngbltoknrwrs',
      'Emergency Construction Material (ECM) and Emergency Shelter Kit (ESK) > # supported with emergency shelter support > Voucher > No specific theme':
        'c37fwgm3rfkow92',
      'Emergency Construction Material (ECM) and Emergency Shelter Kit (ESK) > # of social facilities supported with emergency shelter assistance > Voucher > No specific theme':
        'cuk50g1m3rfkow93',
      'Emergency Construction Material (ECM) and Emergency Shelter Kit (ESK) > # of residential units supported with emergency shelter assistance > Voucher > No specific theme':
        'c3ou5xlm3rfkow94',
    },
    pipeline: {Yes: 'c4rrv3dls03kgong', No: 'cg7qn48ls03l08gi'},
    convoy: {Yes: 'c7xcwyels03nuejk', No: 'cuf5onjls03nuejl'},
    adm1: {
      'Autonomous Republic of Crimea_Автономна Республіка Крим': 'c5c2sr3lq3kjj6gd',
      Cherkaska_Черкаська: 'clbgltvlq3kjj6he',
      Chernihivska_Чернігівська: 'c7jz1shlq3kjj6hf',
      Chernivetska_Чернівецька: 'c78zq2rlq3kjj6hg',
      Dnipropetrovska_Дніпропетровська: 'c6l0fjylq3kjj6hh',
      Donetska_Донецька: 'c3memjqlq3kjj6hi',
      'Ivano-Frankivska_Івано-Франківська': 'cy93k5lq3kjj6hj',
      Kharkivska_Харківська: 'cbbcx5ylq3kjj6hk',
      Khersonska_Херсонська: 'cq8k2oylq3kjj6hl',
      Khmelnytska_Хмельницька: 'cliunu3lq3kjj6hm',
      Kirovohradska_Кіровоградська: 'cxvw276lq3kjj6hn',
      Kyiv_Київ: 'cwe11jplq3kjj6ho',
      Kyivska_Київська: 'cnp046mlq3kjj6hp',
      Luhanska_Луганська: 'ctu8ahklq3kjj6hq',
      Lvivska_Львівська: 'cmpyidslq3kjj6hr',
      Mykolaivska_Миколаївська: 'ccqvlallq3kjj6hs',
      Odeska_Одеська: 'c2uwqqqlq3kjj6ht',
      Poltavska_Полтавська: 'cwq2uuxlq3kjj6hu',
      Rivnenska_Рівненська: 'c2j0t0flq3kjj6hv',
      Sevastopol_Севастополь: 'cjvbpkplq3kjj6hw',
      Sumska_Сумська: 'cb4nm4xlq3kjj6hx',
      Ternopilska_Тернопільська: 'clrrzfslq3kjj6hy',
      Vinnytska_Вінницька: 'cvx17yllq3kjj6hz',
      Volynska_Волинська: 'cdzklrblq3kjj6h10',
      Zakarpatska_Закарпатська: 'cfqiux5lq3kjj6h11',
      Zaporizka_Запорізька: 'cmqvx7elq3kjj6h12',
      Zhytomyrska_Житомирська: 'c51dllnlq3kjj6h13',
    },
    popgroup: {
      'Internally Displaced': 'cvw4on6lq6dgcoj5',
      'Non-Displaced': 'ck6ulx8lq6dgcok6',
      Returnees: 'cuz9qi9lq6dgcok7',
    },
    hnrp_scope: {'Outside HNRP Scope': 'c3isd05lw6flwkf2'},
    outscope_type: {
      'Outside priority areas': 'cvf0ba4lw6fucqv4',
      'Funding not reported in FTS​': 'c7cah40lw6fula95',
      'Delivered outside HNRP​ mechanism': 'cj4y1s3lw6furva6',
      'Not aligned to guidance': 'c8mycj4lw6fv7477',
    },
  }
}
