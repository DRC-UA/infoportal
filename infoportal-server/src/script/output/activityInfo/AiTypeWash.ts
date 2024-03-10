export namespace AiTypeWash {type Opt<T extends keyof typeof options> = keyof (typeof options)[T]

export interface Type {
  'Activity Plan Code': Opt<'Activity Plan Code'>,
  'Reporting Organization': Opt<'Reporting Organization'>,
  'Implementing Partner': Opt<'Implementing Partner'>,
  'Donor Name'?: string,
  'WASH': Opt<'WASH'>,
  'Response Theme': Opt<'Response Theme'>,
  'Additional Topic'?: Opt<'Additional Topic'>,
  'Oblast': Opt<'Oblast'>,
  'Raion': string,
  'Hromada': string,
  'Settlement': string,
  'Location Type': Opt<'Location Type'>,
  'Other Institution'?: string,
  'Reporting Month': string,
  'Activity Start month'?: string,
  'Activity End month'?: string,
  'Disaggregation by population group and/or gender and age known?': Opt<'Disaggregation by population group and/or gender and age known?'>,
  'Total Reached (No Disaggregation)': number,
  'Population Group': Opt<'Population Group'>,
  'Girls (0-17)': number,
  'Boys (0-17)': number,
  'Adult Women (18-59)': number,
  'Adult Men (18-59)': number,
  'Older Women (60+)': number,
  'Older Men (60+)': number,
  'People with disability'?: number,
  'Name of items/services delivered'?: string,
  'Quantity of items/services delivered'?: number,
  'Comments'?: string
}

export const map = (a: Type) => ({
  'c2nep41lqearott2': a['Activity Plan Code'] === undefined ? undefined : 'c4lw2lulqe5980q2' + ':' + options['Activity Plan Code'][a['Activity Plan Code']!],
  'ctgqybrlqc7tnu54': a['Reporting Organization'] === undefined ? undefined : 'czbgrslpwg36j52' + ':' + options['Reporting Organization'][a['Reporting Organization']!],
  'ca0cclilqc7y3rf5': a['Implementing Partner'] === undefined ? undefined : 'czbgrslpwg36j52' + ':' + options['Implementing Partner'][a['Implementing Partner']!],
  'ccn7miflrta651r3': a['Donor Name'] === undefined ? undefined : a['Donor Name'],
  'c6nt2bflqc8rpj19': a['WASH'] === undefined ? undefined : 'cjb5kx9lqb3sassc1' + ':' + options['WASH'][a['WASH']!],
  'cnbc532lqc9lcelf': a['Response Theme'] === undefined ? undefined : options['Response Theme'][a['Response Theme']!],
  'cwq4j5rlr7vymrv6z': a['Additional Topic'] === undefined ? undefined : options['Additional Topic'][a['Additional Topic']!],
  'c11ns3tlqc9s1a4n': a['Oblast'] === undefined ? undefined : 'cemuxawlq3kfmqf2' + ':' + options['Oblast'][a['Oblast']!],
  'cq3a2vllqc9tar9o': a['Raion'] === undefined ? undefined : a['Raion'],
  'cpzpk2blqc9v5gcp': a['Hromada'] === undefined ? undefined : a['Hromada'],
  'cbdwyrqlqc9wodaq': a['Settlement'] === undefined ? undefined : a['Settlement'],
  'c3pr1enlqca5a7ms': a['Location Type'] === undefined ? undefined : options['Location Type'][a['Location Type']!],
  'cemzddlqcabd1311': a['Other Institution'] === undefined ? undefined : a['Other Institution'],
  'c9tbprqlqcb118z13': a['Reporting Month'] === undefined ? undefined : a['Reporting Month'],
  'cqhei8flqcbarb616': a['Activity Start month'] === undefined ? undefined : a['Activity Start month'],
  'cctee5clqcbbbt517': a['Activity End month'] === undefined ? undefined : a['Activity End month'],
  'ctwkp7glqcbo0sd1l': a['Disaggregation by population group and/or gender and age known?'] === undefined ? undefined : options['Disaggregation by population group and/or gender and age known?'][a['Disaggregation by population group and/or gender and age known?']!],
  'ca7ucemlqcbwhn91n': a['Total Reached (No Disaggregation)'] === undefined ? undefined : a['Total Reached (No Disaggregation)'],
  'cq4tl9vlqcci9rk1p': a['Population Group'] === undefined ? undefined : options['Population Group'][a['Population Group']!],
  'c72jz8olqdihkn93': a['Girls (0-17)'] === undefined ? undefined : a['Girls (0-17)'],
  'cbxlhi2lqdin0zh4': a['Boys (0-17)'] === undefined ? undefined : a['Boys (0-17)'],
  'ccvfi26lqdisrzv6': a['Adult Women (18-59)'] === undefined ? undefined : a['Adult Women (18-59)'],
  'c1opnqxlqditf4z7': a['Adult Men (18-59)'] === undefined ? undefined : a['Adult Men (18-59)'],
  'cr43pjylqdiu3pa8': a['Older Women (60+)'] === undefined ? undefined : a['Older Women (60+)'],
  'cgwi8wulqdiutzo9': a['Older Men (60+)'] === undefined ? undefined : a['Older Men (60+)'],
  'ckrzqozlqdivz9ka': a['People with disability'] === undefined ? undefined : a['People with disability'],
  'c6c70olqdmbg8hp': a['Name of items/services delivered'] === undefined ? undefined : a['Name of items/services delivered'],
  'cylmnl9lqdmfqvxq': a['Quantity of items/services delivered'] === undefined ? undefined : a['Quantity of items/services delivered'],
  'cbyqctglqdmgrbyr': a['Comments'] === undefined ? undefined : a['Comments']
})

export const options = {
  'Activity Plan Code': {
    
  },
  'Reporting Organization': {
    "Danish Refugee Council": 'cloyih3lpwhjdsu2r0'
  },
  'Implementing Partner': {
    "Danish Refugee Council": 'cloyih3lpwhjdsu2r0'
  },
  'WASH': {
    "# of individuals benefiting from the new water source construction or rehabilitation (boreholes, wells, etc.)": 'c7xomzulqb3t0zxcs',
    "# of individuals benefiting from the distribution of household water treatment materials": 'c41inuzlqb3t0zxct',
    "# of individuals benefiting from the installation / operation of water treatment units and temporary distribution systems": 'c2yq2jmlqb3t0zxcu',
    "# of individuals benefiting from the provision of bottled water / distribution of water bottles": 'cy49n8hlqb3t0zxcv',
    "# of individuals benefiting from the provision of water trucking": 'czdypeglqb3t0zxcw',
    "# of individuals benefiting from the provision / installation of water storage tanks": 'ch8mqh2lqb3t0zxcx',
    "# of individuals benefiting from the provision of jerry cans for household water storage": 'cpn5xmlqb3t0zxcy',
    "# of individuals benefiting from hygiene kit/items distribution (in-kind)": 'cohoilmlqb3t0zxcz',
    "# of individuals benefiting from hygiene promotion activities": 'clqt5x6lqb3t0zxd0',
    "# of individuals benefiting from hygiene kit/items distribution (cash or voucher)": 'c3vfteelqb3t0zxd1',
    "# of individuals benefiting from the provision of laundry equipment (dryers, washing machines)": 'cg9j0ahlqb3t0zxd2',
    "# of individuals benefiting from shower rehabilitation or construction/installation": 'cp12i3glqb3t0zxd3',
    "# of individuals benefiting from toilet rehabilitation/installation (including handwashing)": 'c3kohtflqb3t0zxd4',
    "# of individuals benefiting from the provision of institutional cleaning kits": 'cwj43lqb3t0zxd5',
    "# of individuals benefiting from the provision/construction of handwashing stations": 'cbf4zfwlqb3t0zxd6',
    "# of individuals benefiting from the connection of institutions/shelters to the water or Wastewater/sewerage network": 'cyleyv9lqb3t0zxd7',
    "# of individuals benefiting from the supply of hot water boiler units in institutions": 'c5k7kbylqb3t0zxd8',
    "# of individuals benefiting from the installation of institutional water treatment units (e.g. filters)": 'csrm0l6lqb3t0zxd9',
    "# of individuals benefiting from the provision of PPE/safety equipment": 'cjd3oe7lqb3t0zxda',
    "# of individuals benefiting from the rehabilitation of off-site sewage treatment, pumping stations or sewage networks": 'cdmp5kmlqb3t0zxdb',
    "# of individuals benefiting from the provision of leak detection equipment/training": 'chmjuovlqb3t0zxdc',
    "# of individuals benefiting from the provision of machinery/equipment": 'c9vav5vlqb3t0zxdd',
    "# of individuals benefiting from the provision of water testing materials/equipment": 'c591ucclqb3t0zxde',
    "# of individuals benefiting from the provision of water treatment supplies (Chlorine, coagulants, etc.)": 'c2txaumlqb3t0zxdf',
    "# of individuals benefiting from the repair of the existing centralized water system": 'cvxhps2lqb3t0zxdg',
    "# of individuals benefiting from the repair of existing decentralized water systems (boreholes, wells, etc.) (operated by service providers only)": 'cbfjye9lqb3t0zxdh',
    "# of individuals trained": 'c2wsl95lqb3t0zxdi',
    "# of individuals benefiting from the provision of generators for water/wastewater service providers": 'c3abyx0lqb3t0zxdj',
    "# of individuals assisted through the provision of solid waste management materials / consumables (bins, bags, etc.)": 'crdcqlhlqb3t0zxdk',
    "# of individuals assisted through support to solid waste collection / disposal services": 'c11zjojlqb3t0zxdl',
    "# of individuals assisted through the provision of equipment/repairs/rehabilitation of centralized heating systems": 'c3lzmc4lqb3t0zxdm',
    "# of individuals assisted through the supply of mobile boilers for centralized heating systems": 'ccg3p6blqb3t0zxdn',
    "# of individuals assisted through the provision of generators for heating systems": 'c9ggh5jlqb3t0zxdo'
  },
  'Response Theme': {
    "No specific theme": 'c13zbetlqc9lcele',
    "Winter response": 'c1pajmzlqc9mbhog',
    "Inter-agency convoy": 'c3mpvh8lsxaedio3'
  },
  'Additional Topic': {
    "No specific topic": 'c3gudm2lr7vymrv70',
    "Liberated Area": 'cw3iezglr7vymrw72',
    "WASH FIT": 'cenvhq4lr7vymrw73',
    "IOM Pipeline": 'c4354felr7vymrw74',
    "UHF": 'cnyz1zplr7vymrw75'
  },
  'Oblast': {
    "Autonomous Republic of Crimea_Автономна Республіка Крим": 'c5c2sr3lq3kjj6gd',
    "Cherkaska_Черкаська": 'clbgltvlq3kjj6he',
    "Chernihivska_Чернігівська": 'c7jz1shlq3kjj6hf',
    "Chernivetska_Чернівецька": 'c78zq2rlq3kjj6hg',
    "Dnipropetrovska_Дніпропетровська": 'c6l0fjylq3kjj6hh',
    "Donetska_Донецька": 'c3memjqlq3kjj6hi',
    "Ivano-Frankivska_Івано-Франківська": 'cy93k5lq3kjj6hj',
    "Kharkivska_Харківська": 'cbbcx5ylq3kjj6hk',
    "Khersonska_Херсонська": 'cq8k2oylq3kjj6hl',
    "Khmelnytska_Хмельницька": 'cliunu3lq3kjj6hm',
    "Kirovohradska_Кіровоградська": 'cxvw276lq3kjj6hn',
    "Kyiv_Київ": 'cwe11jplq3kjj6ho',
    "Kyivska_Київська": 'cnp046mlq3kjj6hp',
    "Luhanska_Луганська": 'ctu8ahklq3kjj6hq',
    "Lvivska_Львівська": 'cmpyidslq3kjj6hr',
    "Mykolaivska_Миколаївська": 'ccqvlallq3kjj6hs',
    "Odeska_Одеська": 'c2uwqqqlq3kjj6ht',
    "Poltavska_Полтавська": 'cwq2uuxlq3kjj6hu',
    "Rivnenska_Рівненська": 'c2j0t0flq3kjj6hv',
    "Sevastopol_Севастополь": 'cjvbpkplq3kjj6hw',
    "Sumska_Сумська": 'cb4nm4xlq3kjj6hx',
    "Ternopilska_Тернопільська": 'clrrzfslq3kjj6hy',
    "Vinnytska_Вінницька": 'cvx17yllq3kjj6hz',
    "Volynska_Волинська": 'cdzklrblq3kjj6h10',
    "Zakarpatska_Закарпатська": 'cfqiux5lq3kjj6h11',
    "Zaporizka_Запорізька": 'cmqvx7elq3kjj6h12',
    "Zhytomyrska_Житомирська": 'c51dllnlq3kjj6h13'
  },
  'Location Type': {
    "Individuals/households": 'ct4n84alqca5a7mr',
    "Vodocanal": 'cjwfxh7lqca80v0t',
    "Collective centers for IDPs": 'c7l2xkhlqca8nmiu',
    "Health Institution": 'crg792rlqca8zqpv',
    "Education Institution": 'cy5bfx7lqca9802w',
    "Social Institution": 'cwkj067lqca9hf2x',
    "District Heating": 'cufexbblqca9orey',
    "Local authority": 'cq8jviklqca9w2yz',
    "Other Institution": 'chjo4tzlqcaaa5p10'
  },
  'Disaggregation by population group and/or gender and age known?': {
    "Yes": 'czas9m9lqcbo0sd1k',
    "No": 'cdkz04slqcborra1m'
  },
  'Population Group': {
    "Overall (all groups)": 'cq6gpkulqcci9rj1o',
    "Non-Displaced": 'cp78xblqccj1to1q',
    "Returnees": 'ca7ebx6lqccjhy01r',
    "Internally Displaced": 'cbnpmdvlqccjjaj1s'
  }
}

}