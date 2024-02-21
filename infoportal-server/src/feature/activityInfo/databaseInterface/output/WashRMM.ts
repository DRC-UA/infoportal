type Opt<T extends keyof typeof optionsWashRMM> = keyof (typeof optionsWashRMM)[T]

export interface WashRMM {
  'Organisation': Opt<'Organisation'>,
  'Reporting Month': string,
  'Implementing Partner': Opt<'Implementing Partner'>,
  'Reporting Against a plan?': Opt<'Reporting Against a plan?'>,
  'WASH - APM': Opt<'WASH - APM'>,
  'Oblast': Opt<'Oblast'>,
  'Raion': string,
  'Hormada': string,
  'Settlement': string,
  'Location Type': Opt<'Location Type'>,
  'Other Institution'?: string,
  'Activities & Indicators': Opt<'Activities & Indicators'>,
  'Disaggregation by population group, gender and age known?': Opt<'Disaggregation by population group, gender and age known?'>,
  'Breakdown known?': Opt<'Breakdown known?'>,
  'Population Group': Opt<'Population Group'>,
  'Girls': number,
  'Boys': number,
  'Men': number,
  'Women': number,
  'Elderly Men': number,
  'Elderly Women': number,
  'People with disability'?: number,
  'Comments'?: string
}

export const mapWashRMM = (a: WashRMM) => ({
  'cexob8plee1f1fr2e': 'cr4xx3dlbs86w9y2' + ':' + optionsWashRMM['Organisation'][a['Organisation']!],
  'cz7e0oelee1f1fs33': a['Reporting Month'],
  'camyyslf9ktv5i3': 'cr4xx3dlbs86w9y2' + ':' + optionsWashRMM['Implementing Partner'][a['Implementing Partner']!],
  'c27wxzdlee1f1fr2f': optionsWashRMM['Reporting Against a plan?'][a['Reporting Against a plan?']!],
  'c88r15clefrj8p51p': 'cg7insdlee1c3h0s' + ':' + optionsWashRMM['WASH - APM'][a['WASH - APM']!],
  'cx4n597lee1f1fr2m': 'cg7v61llbunvy9t9' + ':' + optionsWashRMM['Oblast'][a['Oblast']!],
  'chuh8dlee1f1fr2n': a['Raion'],
  'c1dnndblee1f1fs2o': a['Hormada'],
  'ctgq0o6lee1f1fs2p': a['Settlement'],
  'c1noyq5lee1f1fs2r': optionsWashRMM['Location Type'][a['Location Type']!],
  'cl7k9nxlee1f1fs31': a['Other Institution'],
  'cjmh99nlepqfnnz2': 'c6q8ni3lepq77hp3' + ':' + optionsWashRMM['Activities & Indicators'][a['Activities & Indicators']!],
  'cb8chejlee1f1fs37': optionsWashRMM['Disaggregation by population group, gender and age known?'][a['Disaggregation by population group, gender and age known?']!],
  'c21nco7lfv0qagmd': optionsWashRMM['Breakdown known?'][a['Breakdown known?']!],
  'cxhfyualee1f1fs3b': optionsWashRMM['Population Group'][a['Population Group']!],
  'c20g75xlee1f1fs3g': a['Girls'],
  'cvz7h6slee1f1fs3h': a['Boys'],
  'cijxk8dlee1f1fs3i': a['Men'],
  'cpv37cllee1f1fs3j': a['Women'],
  'clbj7wblee1f1fs3k': a['Elderly Men'],
  'ci2r93klee1f1fs3l': a['Elderly Women'],
  'cqei3gilg3gw0pm2': a['People with disability'],
  'c56verzlee1f1fs3n': a['Comments']
})

export const optionsWashRMM = {
  'Organisation': {
    "Danish Refugee Council": 'cv9umq8lehiq43f103'
  },
  'Implementing Partner': {
    "Danish Refugee Council": 'cv9umq8lehiq43f103'
  },
  'Reporting Against a plan?': {
    "Yes": 'cdol1v3lee1f1fr2g',
    "No": 'c6lenxclee1f1fr2h'
  },
  'WASH - APM': {
    "DRC-00001": 'c7zdmthlfqh9grv2',
    "DRC-00002": 'cguuq3hlfqhw58sa',
    "DRC-00003": 'cfpmdbylfqi8bj2f',
    "DRC-00004": 'clwy3yalfqicip1m',
    "DRC-00005": 'ctzggrblfqigglao',
    "DRC-00006": 'cpnojhxlfqij30ot',
    "DRC-00007": 'ccpjftslfqilf4qv'
  },
  'Oblast': {
    "Autonomous Republic of Crimea_Автономна Республіка Крим": 'ciua21glebrkckb2',
    "Cherkaska_Черкаська": 'chvmygrlebrkckc3',
    "Chernihivska_Чернігівська": 'clo1x4vlebrkckc4',
    "Chernivetska_Чернівецька": 'ctohs39lebrkckc5',
    "Dnipropetrovska_Дніпропетровська": 'c247whblebrkckc6',
    "Donetska_Донецька": 'cdqzkfalebrkckc7',
    "Ivano-Frankivska_Івано-Франківська": 'ci6107klebrkckc8',
    "Kharkivska_Харківська": 'c4s5fm0lebrkckc9',
    "Khersonska_Херсонська": 'c7f3g3ilebrkckda',
    "Khmelnytska_Хмельницька": 'cuup1d8lebrkckdb',
    "Kirovohradska_Кіровоградська": 'c3uihhnlebrkckdc',
    "Kyiv_Київ": 'c1tv3frlebrkckdd',
    "Kyivska_Київська": 'coi9q1zlebrkckde',
    "Luhanska_Луганська": 'cfje7n6lebrkckdf',
    "Lvivska_Львівська": 'cm6px6xlebrkckdg',
    "Mykolaivska_Миколаївська": 'ctv8cw5lebrkckdh',
    "Odeska_Одеська": 'c23ovtglebrkckdi',
    "Poltavska_Полтавська": 'ciiv648lebrkckdj',
    "Rivnenska_Рівненська": 'chadf69lebrkckdk',
    "Sevastopol_Севастополь": 'c27kgk0lebrkckdl',
    "Sumska_Сумська": 'cj530slebrkckdm',
    "Ternopilska_Тернопільська": 'cx73u5ulebrkckdn',
    "Vinnytska_Вінницька": 'cb1bqpilebrkckdo',
    "Volynska_Волинська": 'cnf4ddvlebrkckdp',
    "Zakarpatska_Закарпатська": 'cesrf15lebrkckdq',
    "Zaporizka_Запорізька": 'cez5t8mlebrkckdr',
    "Zhytomyrska_Житомирська": 'cyx8240lebrkckds'
  },
  'Location Type': {
    "Individuals/households": 'cilx8ndlee1f1fs2s',
    "Water company/system": 'cis965wlee1f1fs2t',
    "Collective centers for IDPs": 'cmvb6r2lee1f1fs2u',
    "Health Institution": 'cjrhwuelee1f1fs2v',
    "Education Institution": 'c592ycqlee1f1fs2w',
    "Social Institution": 'c9a6zmrlee1f1fs2x',
    "District Heating": 'cwhvfg2lee1f1fs2y',
    "Local authority": 'c3e5t09lee1f1fs2z',
    "Other Institution": 'cq7yvumlee1f1fs30'
  },
  'Activities & Indicators': {
    "# of individuals benefiting from the construction of new water sources (boreholes etc)": 'cbgyykxlepqbb85h',
    "# of individuals benefiting from the distribution of household water treatment materials": 'cjfm6u4lepqbb85i',
    "# of individuals benefiting from the installation / operation of Surface Water Treatment Units and temporary distribution systems": 'ccwxkdzlepqbb85j',
    "# of individuals benefiting from the installation of institutional/communal water treatment units (e.g. filters)": 'cjyaqmtlepqbb85k',
    "# of individuals benefiting from provision of bottled water / distribution of water bottels": 'cgag463lepqbb86l',
    "# of individuals benefiting from the provision of water trucking": 'cijz5vylepqbb86m',
    "# of individuals benefiting from the provision/installation of water storage tanks": 'c5a0i2llepqbb86n',
    "# of individuals benefiting from the provision of jerry cans for household water storage": 'cdrvqvclepqbb86o',
    "# of individuals benefiting from hygiene kit/items distribution (in-kind)": 'cp5ddzclepqbb86p',
    "# of individuals benefiting from hygiene promotion activities": 'csi8p1ylepqbb86q',
    "# of individuals benefiting from hygiene kit/items distribution (cash or voucher)": 'csxp9nvlepqbb86r',
    "# of individuals benefiting from the provision of laundry equipment (dryers, washing machines)": 'cr1ria3lepqbb86s',
    "# of individuals benefiting from shower rehabilitation or construction/installation": 'cg97ojilepqbb86t',
    "# of individuals benefiting from toilet rehabilitation/installation (including handwashing)": 'c30q2lelepqbb86u',
    "# of individuals benefiting from the provision of institutional cleaning kits": 'cqbhyxclepqbb86v',
    "# of individuals benefiting from the provision/construction of handwashing station": 'ceb9xgalepqbb86w',
    "# of individuals benefiting from the connection of institutions/shelters to the water or wastewater/sewerage network": 'cpbbgojlepqbb86x',
    "# of individuals benefiting from the supply of institutional boiler units": 'cwockf1lepqbb86y',
    "# of individuals benefiting from the provision of PPE / safety equipment": 'cv2enjmlepqbb86z',
    "# of individuals benefiting from the rehabilitation of off-site sewage treatment, pumping stations or sewage networks": 'cy3asiclepqbb8610',
    "# of individuals benefiting from the provision of leak detection equipment / training": 'cxwfbdzlepqbb8611',
    "# of individuals benefiting from the provision of machinery / equipment": 'cot24helepqbb8612',
    "# of individuals benefiting from the provision of water testing materials / equipment": 'c96r3sulepqbb8613',
    "# of individuals benefiting from the provision of water treatment supplies (Chlorine, coagulents, etc.)": 'c8lv3qlepqbb8614',
    "# of individuals benefiting from the repair of existing centralized water system": 'coo3327lepqbb8615',
    "# of individuals benefiting from the repair of existing decentralized water systems (boreholes, wells, etc)": 'c6il695lepqbb8616',
    "# of individuals benefiting from training": 'c75q4mslepqbb8717',
    "# of individuals benefiting from the provision of generators for for water/waste water service providers": 'c6kekgblepqbb8718',
    "# of individuals benefiting from the provision of Solid waste management materials / consumables (bins, bags, etc.)": 'c4q4rclepqbb8719',
    "# of individuals benefiting from support to Solid Waste collection / disposal services": 'c42gdfqlepqbb871a',
    "# of individuals benefiting from the equipment/Repairs/Rehabilitation of centralised heating system": 'cgfrenflepqbb871b',
    "# of individuals benefiting from the supply of mobile boilers for centralised heating systems": 'cqrpx7nlepqbb871c',
    "# of individuals benefiting from the provision of generators for Heating system": 'csexnmlepqbb871d'
  },
  'Disaggregation by population group, gender and age known?': {
    "Yes": 'cum56qplee1f1fs38',
    "No": 'cpw5ozolee1f1fs39'
  },
  'Breakdown known?': {
    "Yes": 'cxlnm0nlfv0qagmc',
    "No": 'c4t2hsplfv0qn9ge'
  },
  'Population Group': {
    "Overall (all groups)": 'cle3u90lee1f1fs3c',
    "Non-Displaced": 'ch9m5kclee1f1fs3d',
    "Returnees": 'c2lfae5lee1f1fs3f',
    "IDPs": 'c3j7peolee1f1fs3e'
  }
}

