export namespace AiTypeWash {
  type Opt<T extends keyof typeof options> = keyof (typeof options)[T]
  export interface Type {
    /**
			Activity Plan Code
		*/
    plan_code: Opt<'plan_code'>
    /**
			Reporting Organization
		*/
    org_rep: Opt<'org_rep'>
    /**
			Implementing Partner
		*/
    org_imp: Opt<'org_imp'>
    /**
			Donor Name
		*/
    donor?: string
    /**
			WASH
		*/
    indicator: Opt<'indicator'>
    /**
			Response Theme
		*/
    theme: Opt<'theme'>
    /**
			Additional Topic
		*/
    theme2?: Opt<'theme2'>
    /**
			Oblast
		*/
    adm1: Opt<'adm1'>
    /**
			Raion
		*/
    adm2: Opt<'adm2'>
    /**
			Hromada
		*/
    adm3: string
    /**
			Settlement
		*/
    adm4: string
    /**
			Location Type
		*/
    loc_type: Opt<'loc_type'>
    /**
			Other Institution
		*/
    ben_type_other?: string
    /**
			Reporting Month
		*/
    month_rep: string
    /**
			Activity Start month
		*/
    month_start?: string
    /**
			Activity End month
			estimated
		*/
    month_end?: string
    /**
			Disaggregation by population group and/or gender and age known?
		*/
    disaggregation: Opt<'disaggregation'>
    /**
			Total Reached (No Disaggregation)
		*/
    tot_reach: number
    /**
			Population Group
		*/
    popgroup: Opt<'popgroup'>
    /**
			Girls (0-17)
		*/
    ind_girls: number
    /**
			Boys (0-17)
		*/
    ind_boys: number
    /**
			Adult Women (18-59)
		*/
    ind_adwomen: number
    /**
			Adult Men (18-59)
		*/
    ind_admen: number
    /**
			Older Women (60+)
		*/
    ind_oldwomen: number
    /**
			Older Men (60+)
		*/
    ind_oldmen: number
    /**
			People with disability
			Out of the total individuals reached
		*/
    ind_pwd?: number
    /**
			Name of items/services delivered
		*/
    items_name?: string
    /**
			Quantity of items/services delivered
		*/
    items_qty?: number
    /**
			Comments
		*/
    com?: string
    /**
			HNRP Scope
		*/
    hnrp_scope?: Opt<'hnrp_scope'>
    /**
			Outside HNRP Scope sub-categories
		*/
    outscope_type?: Opt<'outscope_type'>
  }

  export const map = (a: Type) => ({
    c2nep41lqearott2:
      a['Activity Plan Code'] === undefined
        ? undefined
        : 'c4lw2lulqe5980q2' + ':' + options['Activity Plan Code'][a['Activity Plan Code']!],
    ctgqybrlqc7tnu54:
      a['Reporting Organization'] === undefined
        ? undefined
        : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
    ca0cclilqc7y3rf5:
      a['Implementing Partner'] === undefined
        ? undefined
        : 'czbgrslpwg36j52' + ':' + options['Implementing Partner'][a['Implementing Partner']!],
    ccn7miflrta651r3: a['Donor Name'] === undefined ? undefined : a['Donor Name'],
    c6nt2bflqc8rpj19: a['WASH'] === undefined ? undefined : 'cjb5kx9lqb3sassc1' + ':' + options['WASH'][a['WASH']!],
    cnbc532lqc9lcelf: a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!],
    cwq4j5rlr7vymrv6z:
      a['Additional Topic'] === undefined ? undefined : options['Additional Topic'][a['Additional Topic']!],
    c11ns3tlqc9s1a4n:
      a['Oblast'] === undefined ? undefined : 'cemuxawlq3kfmqf2' + ':' + options['Oblast'][a['Oblast']!],
    cq3a2vllqc9tar9o: a['Raion'] === undefined ? undefined : 'cd5q9sdlq3kklo314' + ':' + options['Raion'][a['Raion']!],
    cpzpk2blqc9v5gcp: a['Hromada'] === undefined ? undefined : a['Hromada'],
    cbdwyrqlqc9wodaq: a['Settlement'] === undefined ? undefined : a['Settlement'],
    c3pr1enlqca5a7ms: a['Location Type'] === undefined ? undefined : options['Location Type'][a['Location Type']!],
    cemzddlqcabd1311: a['Other Institution'] === undefined ? undefined : a['Other Institution'],
    c9tbprqlqcb118z13: a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
    cqhei8flqcbarb616: a['Activity Start month'] === undefined ? undefined : a['Activity Start month'],
    cctee5clqcbbbt517: a['Activity End month'] === undefined ? undefined : a['Activity End month'],
    ctwkp7glqcbo0sd1l:
      a['Disaggregation by population group and/or gender and age known?'] === undefined
        ? undefined
        : options['Disaggregation by population group and/or gender and age known?'][
            a['Disaggregation by population group and/or gender and age known?']!
          ],
    ca7ucemlqcbwhn91n:
      a['Total Reached (No Disaggregation)'] === undefined ? undefined : a['Total Reached (No Disaggregation)'],
    cq4tl9vlqcci9rk1p:
      a['Population Group'] === undefined ? undefined : options['Population Group'][a['Population Group']!],
    c72jz8olqdihkn93: a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
    cbxlhi2lqdin0zh4: a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
    ccvfi26lqdisrzv6: a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
    c1opnqxlqditf4z7: a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
    cr43pjylqdiu3pa8: a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
    cgwi8wulqdiutzo9: a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
    ckrzqozlqdivz9ka: a['People with disability'] === undefined ? undefined : a['People with disability'],
    c6c70olqdmbg8hp:
      a['Name of items/services delivered'] === undefined ? undefined : a['Name of items/services delivered'],
    cylmnl9lqdmfqvxq:
      a['Quantity of items/services delivered'] === undefined ? undefined : a['Quantity of items/services delivered'],
    cbyqctglqdmgrbyr: a['Comments'] === undefined ? undefined : a['Comments'],
    cn9a2dglw6fm42i3: a['HNRP Scope'] === undefined ? undefined : options['HNRP Scope'][a['HNRP Scope']!],
    c9xcyaklw6fxy494:
      a['Outside HNRP Scope sub-categories'] === undefined
        ? undefined
        : 'cs4astklw6ftd2y2' +
          ':' +
          options['Outside HNRP Scope sub-categories'][a['Outside HNRP Scope sub-categories']!],
  })

  export const options = {
    plan_code: {
      'WASH-DRC-00001': 'cklh0hltn666me2',
      'WASH-DRC-00002': 'cn94ssyltn670dk3',
      'WASH-DRC-00003': 'c9p2whmltn67fg34',
      'WASH-DRC-00004': 'cpjbps1ltn67yl05',
      'WASH-DRC-00005': 'cb9qznjlw0rzyj53',
      'WASH-DRC-00006': 'cqjr9vylx8w17f54',
      'WASH-DRC-00007': 'cmzsxamlx8w468x5',
      'WASH-DRC-00008': 'cjar7rem0w6gl8181',
      'WASH-DRC-00009': 'cskeweem0w6k2jg82',
      'WASH-DRC-00010': 'cftkpczm4ind03p2',
    },
    org_rep: {'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'},
    org_imp: {'Danish Refugee Council': 'cloyih3lpwhjdsu2r0'},
    indicator: {
      '# of individuals benefiting from the new water source construction or rehabilitation (boreholes, wells, etc.)':
        'c7xomzulqb3t0zxcs',
      '# of individuals benefiting from the distribution of household water treatment materials': 'c41inuzlqb3t0zxct',
      '# of individuals benefiting from the installation / operation of water treatment units and temporary distribution systems':
        'c2yq2jmlqb3t0zxcu',
      '# of individuals benefiting from the provision of bottled water / distribution of water bottles':
        'cy49n8hlqb3t0zxcv',
      '# of individuals benefiting from the provision of water trucking': 'czdypeglqb3t0zxcw',
      '# of individuals benefiting from the provision / installation of water storage tanks': 'ch8mqh2lqb3t0zxcx',
      '# of individuals benefiting from the provision of jerry cans for household water storage': 'cpn5xmlqb3t0zxcy',
      '# of individuals benefiting from hygiene kit/items distribution (in-kind)': 'cohoilmlqb3t0zxcz',
      '# of individuals benefiting from hygiene promotion activities': 'clqt5x6lqb3t0zxd0',
      '# of individuals benefiting from hygiene kit/items distribution (cash or voucher)': 'c3vfteelqb3t0zxd1',
      '# of individuals benefiting from the provision of laundry equipment (dryers, washing machines)':
        'cg9j0ahlqb3t0zxd2',
      '# of individuals benefiting from shower rehabilitation or construction/installation': 'cp12i3glqb3t0zxd3',
      '# of individuals benefiting from toilet rehabilitation/installation (including handwashing)':
        'c3kohtflqb3t0zxd4',
      '# of individuals benefiting from the provision of institutional cleaning kits': 'cwj43lqb3t0zxd5',
      '# of individuals benefiting from the provision/construction of handwashing stations': 'cbf4zfwlqb3t0zxd6',
      '# of individuals benefiting from the connection of institutions/shelters to the water or Wastewater/sewerage network':
        'cyleyv9lqb3t0zxd7',
      '# of individuals benefiting from the supply of hot water boiler units in institutions': 'c5k7kbylqb3t0zxd8',
      '# of individuals benefiting from the installation of institutional water treatment units (e.g. filters)':
        'csrm0l6lqb3t0zxd9',
      '# of individuals benefiting from the provision of PPE/safety equipment': 'cjd3oe7lqb3t0zxda',
      '# of individuals benefiting from the rehabilitation of off-site sewage treatment, pumping stations or sewage networks':
        'cdmp5kmlqb3t0zxdb',
      '# of individuals benefiting from the provision of leak detection equipment/training': 'chmjuovlqb3t0zxdc',
      '# of individuals benefiting from the provision of machinery/equipment': 'c9vav5vlqb3t0zxdd',
      '# of individuals benefiting from the provision of water testing materials/equipment': 'c591ucclqb3t0zxde',
      '# of individuals benefiting from the provision of water treatment supplies (Chlorine, coagulants, etc.)':
        'c2txaumlqb3t0zxdf',
      '# of individuals benefiting from the repair of the existing centralized water system': 'cvxhps2lqb3t0zxdg',
      '# of individuals benefiting from the repair of existing decentralized water systems (boreholes, wells, etc.) (operated by service providers only)':
        'cbfjye9lqb3t0zxdh',
      '# of individuals trained': 'c2wsl95lqb3t0zxdi',
      '# of individuals benefiting from the provision of generators for water/wastewater service providers':
        'c3abyx0lqb3t0zxdj',
      '# of individuals assisted through the provision of solid waste management materials / consumables (bins, bags, etc.)':
        'crdcqlhlqb3t0zxdk',
      '# of individuals assisted through support to solid waste collection / disposal services': 'c11zjojlqb3t0zxdl',
      '# of individuals assisted through the provision of equipment/repairs/rehabilitation of centralized heating systems':
        'c3lzmc4lqb3t0zxdm',
      '# of individuals assisted through the supply of mobile boilers for centralized heating systems':
        'ccg3p6blqb3t0zxdn',
      '# of individuals assisted through the provision of generators for heating systems': 'c9ggh5jlqb3t0zxdo',
    },
    theme: {
      'No specific theme': 'c13zbetlqc9lcele',
      'Winter response': 'c1pajmzlqc9mbhog',
      'Inter-agency convoy': 'c3mpvh8lsxaedio3',
    },
    theme2: {
      'No specific topic': 'c3gudm2lr7vymrv70',
      'Liberated Area': 'cw3iezglr7vymrw72',
      'WASH FIT': 'cenvhq4lr7vymrw73',
      'IOM Pipeline': 'c4354felr7vymrw74',
      UHF: 'cnyz1zplr7vymrw75',
    },
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
    adm2: {
      Bakhchysaraiskyi_Бахчисарайський: 'clpy8gmlq3kosdz1f',
      Bilohirskyi_Білогірський: 'cnv5hktlq3kosdz1g',
      Dzhankoiskyi_Джанкойський: 'ckoz8z0lq3kosdz1h',
      Yevpatoriiskyi_Євпаторійський: 'cw7s5ktlq3kosdz1i',
      Kerchynskyi_Керченський: 'cr689rflq3kosdz1j',
      Krasnohvardiiskyi_Красногвардійський: 'cavyvxdlq3kosdz1k',
      Krasnoperekopskyi_Красноперекопський: 'ctzecyflq3kosdz1l',
      Simferopolskyi_Сімферопольський: 'cn5e6srlq3kosdz1m',
      Feodosiiskyi_Феодосійський: 'ceft6w8lq3kosdz1n',
      Yaltynskyi_Ялтинський: 'cimaa17lq3kosdz1o',
      Vinnytskyi_Вінницький: 'cj8x2vklq3kosdz1p',
      Haisynskyi_Гайсинський: 'cuc9vvalq3kosdz1q',
      Zhmerynskyi_Жмеринський: 'cwpb9w0lq3kosdz1r',
      'Mohyliv-Podilskyi_Могилів-Подільський': 'cux2ei3lq3kosdz1s',
      Tulchynskyi_Тульчинський: 'c4mgs00lq3kosdz1t',
      Khmilnytskyi_Хмільницький: 'cmclf09lq3kosdz1u',
      Volodymyrskyi_Володимирський: 'cegsprolq3kosdz1v',
      'Kamin-Kashyrskyi_Камінь-Каширський': 'ccovsn6lq3kosdz1w',
      Kovelskyi_Ковельський: 'c8qavkklq3kosdz1x',
      Lutskyi_Луцький: 'clvltv5lq3kosdz1y',
      Dniprovskyi_Дніпровський: 'cg0neprlq3kosdz1z',
      'Kamianskyi_Кам’янський': 'cxzh1v2lq3kosdz20',
      Kryvorizkyi_Криворізький: 'cdyujcrlq3kosdz21',
      Nikopolskyi_Нікопольський: 'cq3lwh8lq3kosdz22',
      Novomoskovskyi_Новомосковський: 'cb7ndu6lq3kosdz23',
      Pavlohradskyi_Павлоградський: 'cbqz5w4lq3kosdz24',
      Synelnykivskyi_Синельниківський: 'c3ocn5alq3kosdz25',
      Bakhmutskyi_Бахмутський: 'chpckeplq3kosdz26',
      Volnovaskyi_Волноваський: 'cno06iqlq3kosdz27',
      Horlivskyi_Горлівський: 'cbsr7yhlq3kosdz28',
      Donetskyi_Донецький: 'cg7dd15lq3kosdz29',
      Kalmiuskyi_Кальміуський: 'c4725xalq3kosdz2a',
      Kramatorskyi_Краматорський: 'clcphxlq3kosdz2b',
      Mariupolskyi_Маріупольський: 'cxyyb19lq3kosdz2c',
      Pokrovskyi_Покровський: 'cehb82flq3kosdz2d',
      Berdychivskyi_Бердичівський: 'cco7x3qlq3kosdz2e',
      Zhytomyrskyi_Житомирський: 'cdy987slq3kosdz2f',
      Korostenskyi_Коростенський: 'ctwx185lq3kosdz2g',
      Zviahelskyi_Звягельський: 'cl6fakblq3kosdz2h',
      Berehivskyi_Берегівський: 'c1vcqurlq3kosdz2i',
      Mukachivskyi_Мукачівський: 'c39l9cqlq3kosdz2j',
      Rakhivskyi_Рахівський: 'ckt1x6dlq3kosdz2k',
      Tiachivskyi_Тячівський: 'ciram3ylq3kosdz2l',
      Uzhhorodskyi_Ужгородський: 'ca6tdaxlq3kosdz2m',
      Khustskyi_Хустський: 'c756zfelq3kosdz2n',
      Berdianskyi_Бердянський: 'cmyjd13lq3kosdz2o',
      Vasylivskyi_Василівський: 'cd85ui9lq3kosdz2p',
      Zaporizkyi_Запорізький: 'cnnggjxlq3kosdz2q',
      Melitopolskyi_Мелітопольський: 'cpq3aymlq3kosdz2r',
      Polohivskyi_Пологівський: 'ct03geylq3kosdz2s',
      Verkhovynskyi_Верховинський: 'cxaork4lq3kosdz2t',
      'Ivano-Frankivskyi_Івано-Франківський': 'csi3kthlq3kosdz2u',
      Kaluskyi_Калуський: 'ce87wkxlq3kosdz2v',
      Kolomyiskyi_Коломийський: 'cjmqqa1lq3kosdz2w',
      Kosivskyi_Косівський: 'cs27bktlq3kosdz2x',
      Nadvirnianskyi_Надвірнянський: 'cdvfxm4lq3kosdz2y',
      'Chornobyl Exclusion Zone_Чорнобильська зона відчуження': 'ctxlwy1lq3kosdz2z',
      Bilotserkivskyi_Білоцерківський: 'cj53w9blq3kosdz30',
      Boryspilskyi_Бориспільський: 'co6wym5lq3kosdz31',
      Brovarskyi_Броварський: 'czgw130lq3kosdz32',
      Buchanskyi_Бучанський: 'ctn3agrlq3kosdz33',
      Vyshhorodskyi_Вишгородський: 'caw2olxlq3kosdz34',
      Obukhivskyi_Обухівський: 'cqoci07lq3kosdz35',
      Fastivskyi_Фастівський: 'cm6u7k8lq3kosdz36',
      Holovanivskyi_Голованівський: 'c2gc6golq3kosdz37',
      Kropyvnytskyi_Кропивницький: 'c5niz8dlq3kosdz38',
      Novoukrainskyi_Новоукраїнський: 'cr2bs81lq3kosdz39',
      Oleksandriiskyi_Олександрійський: 'cfoj3uylq3kosdz3a',
      Alchevskyi_Алчевський: 'cmhjh3zlq3kosdz3b',
      Dovzhanskyi_Довжанський: 'cbhx20ylq3kosdz3c',
      Luhanskyi_Луганський: 'cxrsytslq3kosdz3d',
      Rovenkivskyi_Ровеньківський: 'ctvq5bblq3kosdz3e',
      Svativskyi_Сватівський: 'c7mfenklq3kosdz3f',
      Sievierodonetskyi_Сєвєродонецький: 'cdizdutlq3kosdz3g',
      Starobilskyi_Старобільський: 'crbqdv4lq3kosdz3h',
      Shchastynskyi_Щастинський: 'clwk13plq3kosdz3i',
      Drohobytskyi_Дрогобицький: 'c9rznavlq3kosdz3j',
      Zolochivskyi_Золочівський: 'cj3hqaflq3kosdz3k',
      Lvivskyi_Львівський: 'c68thy7lq3kosdz3l',
      Sambirskyi_Самбірський: 'ccao6bilq3kosdz3m',
      Stryiskyi_Стрийський: 'ck46lu1lq3kosdz3n',
      Chervonohradskyi_Червоноградський: 'cz2k4jrlq3kosdz3o',
      Yavorivskyi_Яворівський: 'cay89d2lq3kosdz3p',
      Bashtanskyi_Баштанський: 'cbf7ru6lq3kosdz3q',
      Voznesenskyi_Вознесенський: 'cxwod8jlq3kosdz3r',
      Mykolaivskyi_Миколаївський: 'cw4g05zlq3kosdz3s',
      Pervomaiskyi_Первомайський: 'cbjcym2lq3kosdz3t',
      Berezivskyi_Березівський: 'c6ee861lq3kose03u',
      'Bilhorod-Dnistrovskyi_Білгород-Дністровський': 'csh3ritlq3kose03v',
      Bolhradskyi_Болградський: 'c922ygblq3kose03w',
      Izmailskyi_Ізмаїльський: 'cds9sbwlq3kose03x',
      Odeskyi_Одеський: 'ce3jvi1lq3kose03y',
      Podilskyi_Подільський: 'cpup3rulq3kose03z',
      Rozdilnianskyi_Роздільнянський: 'cdld89alq3kose040',
      Kremenchutskyi_Кременчуцький: 'ci43dqnlq3kose041',
      Lubenskyi_Лубенський: 'coc5kdlq3kose042',
      Myrhorodskyi_Миргородський: 'c1fl6dklq3kose043',
      Poltavskyi_Полтавський: 'cvp0mejlq3kose044',
      Varaskyi_Вараський: 'cukwvs9lq3kose045',
      Dubenskyi_Дубенський: 'coweyh5lq3kose046',
      Rivnenskyi_Рівненський: 'cg68s82lq3kose047',
      Sarnenskyi_Сарненський: 'clyrogxlq3kose048',
      Konotopskyi_Конотопський: 'c708hu8lq3kose049',
      Okhtyrskyi_Охтирський: 'cifm28vlq3kose04a',
      Romenskyi_Роменський: 'c8irg28lq3kose04b',
      Sumskyi_Сумський: 'c2v5en6lq3kose04c',
      Shostkynskyi_Шосткинський: 'ccjvju9lq3kose04d',
      Kremenetskyi_Кременецький: 'c1fzrlzlq3kose04e',
      Ternopilskyi_Тернопільський: 'cofrehqlq3kose04f',
      Chortkivskyi_Чортківський: 'corhx7plq3kose04g',
      Bohodukhivskyi_Богодухівський: 'cw7s9kxlq3kose04h',
      Iziumskyi_Ізюмський: 'c7kfedflq3kose04i',
      Krasnohradskyi_Красноградський: 'c6wp33nlq3kose04j',
      "Kupianskyi_Куп'янський": 'c4ojqphlq3kose04k',
      Lozivskyi_Лозівський: 'c7hv4dylq3kose04l',
      Kharkivskyi_Харківський: 'c9tjvctlq3kose04m',
      Chuhuivskyi_Чугуївський: 'c978dbxlq3kose04n',
      Beryslavskyi_Бериславський: 'c8n16pllq3kose04o',
      Henicheskyi_Генічеський: 'cd823lulq3kose04p',
      Kakhovskyi_Каховський: 'c33b6glq3kose04q',
      Skadovskyi_Скадовський: 'c6h82belq3kose04r',
      Khersonskyi_Херсонський: 'c71pvfdlq3kose04s',
      "Kamianets-Podilskyi_Кам'янець-Подільський": 'c3qk6talq3kose04t',
      Khmelnytskyi_Хмельницький: 'c3oa742lq3kose04u',
      Shepetivskyi_Шепетівський: 'c89vxcalq3kose04v',
      Zvenyhorodskyi_Звенигородський: 'c7johiwlq3kose04w',
      Zolotoniskyi_Золотоніський: 'cbey3evlq3kose04x',
      Umanskyi_Уманський: 'ctszjpnlq3kose04y',
      Cherkaskyi_Черкаський: 'cos2hzilq3kose04z',
      Vyzhnytskyi_Вижницький: 'c3208gilq3kose050',
      Dnistrovskyi_Дністровський: 'c93ahyglq3kose051',
      Chernivetskyi_Чернівецький: 'cw7xjwllq3kose052',
      Koriukivskyi_Корюківський: 'clr9994lq3kose053',
      Nizhynskyi_Ніжинський: 'cgqm5c7lq3kose054',
      'Novhorod-Siverskyi_Новгород-Сіверський': 'c63knbylq3kose055',
      Prylutskyi_Прилуцький: 'c8irqn5lq3kose056',
      Chernihivskyi_Чернігівський: 'chjhfwtlq3kose057',
      Kyiv_Київ: 'cfy1yh6lq3kose058',
      Sevastopol_Севастополь: 'cuk10dalq3kose059',
    },
    loc_type: {
      'Individuals/households': 'ct4n84alqca5a7mr',
      Vodocanal: 'cjwfxh7lqca80v0t',
      'Collective centers for IDPs': 'c7l2xkhlqca8nmiu',
      'Health Institution': 'crg792rlqca8zqpv',
      'Education Institution': 'cy5bfx7lqca9802w',
      'Social Institution': 'cwkj067lqca9hf2x',
      'District Heating': 'cufexbblqca9orey',
      'Local authority': 'cq8jviklqca9w2yz',
      'Other Institution': 'chjo4tzlqcaaa5p10',
    },
    disaggregation: {Yes: 'czas9m9lqcbo0sd1k', No: 'cdkz04slqcborra1m'},
    popgroup: {
      'Overall (all groups)': 'cq6gpkulqcci9rj1o',
      'Non-Displaced': 'cp78xblqccj1to1q',
      Returnees: 'ca7ebx6lqccjhy01r',
      'Internally Displaced': 'cbnpmdvlqccjjaj1s',
    },
    hnrp_scope: {'Outside HNRP Scope': 'c1im1zxlw6fm42i2'},
    outscope_type: {
      'Outside priority areas': 'cvf0ba4lw6fucqv4',
      'Funding not reported in FTS​': 'c7cah40lw6fula95',
      'Delivered outside HNRP​ mechanism': 'cj4y1s3lw6furva6',
      'Not aligned to guidance': 'c8mycj4lw6fv7477',
    },
  }
}
