import {PrismaClient} from '@prisma/client'
import {KoboSdkGenerator} from '../../feature/kobo/KoboSdkGenerator'
import {Bn_rapidResponseSidar} from '../output/kobo/Bn_rapidResponseSidar'
import {KoboMappedAnswersService} from '../../feature/kobo/KoboMappedAnswersService'
import {DeepPartial} from '@alexandreannic/ts-utils'
import {PromisePool} from '@supercharge/promise-pool'
import {scriptConf} from '../ScriptConf'

type Option<T extends keyof typeof Bn_rapidResponseSidar.options> = Bn_rapidResponseSidar.Option<T>

const rrmKoboIdsToMigrate = [
    '520294399',
    '520294411',
    '520294418',
    '520294426',
    '520294441',
    '520294456',
    '520294466',
    '520294476',
    '520294484',
    '520294493',
    '520294505',
    '520294513',
    '520294526',
    '520294536',
    '520294547',
    '520294558',
    '520294582',
    '520294594',
    '520294599',
    '520294607',
    '520294609',
    '520294619',
    '520294624',
    '520294627',
    '520294633',
    '520294638',
    '520294643',
    '520294644',
    '520294653',
    '520294656',
    '520294664',
    '520294666',
    '520294671',
    '520294674',
    '520294683',
    '520294684',
    '520294692',
    '520294699',
    '520294709',
    '520294719',
    '520294726',
    '520294739',
    '520294744',
    '520294748',
    '520294751',
    '520294754',
    '520294769',
    '520294766',
    '520294777',
    '520294780',
    '520294784',
    '520294796',
    '520294791',
    '520294809',
    '520294814',
    '520294829',
    '520294824',
    '520294846',
    '520294850',
    '520294858',
    '520294869',
    '520294878',
    '520294886',
    '520294904',
    '520309456',
    '520309459',
    '520309464',
    '520309471',
    '520309480',
    '520309494',
    '520309517',
    '520309532',
    '520309546',
    '520309562',
    '520309576',
    '520309589',
    '520309603',
    '520309612',
    '520309619',
    '520309628',
    '520309640',
    '520309648',
    '520309661',
    '520309671',
    '520309685',
    '520309696',
    '520309705',
    '520309715',
    '520312897',
    '520312905',
    '520312911',
    '520312921',
    '520312924',
    '520312933',
    '520312940',
    '520312948',
    '520312956',
    '520312962',
    '520312968',
    '520312973',
    '520312979',
    '520312984',
    '520592841',
    '520592844',
    '520592847',
    '520592849',
    '520592854',
    '520592856',
    '520592860',
    '520592863',
    '520592865',
    '520592870',
    '520592874',
    '520592879',
    '520592881',
    '520592883',
    '520592885',
    '520592888',
    '520592894',
    '520592901',
    '520592906',
    '520592907',
    '520592911',
    '520592916',
    '520592921',
    '520592924',
    '520592930',
    '520592933',
    '520592937',
    '520592938',
    '520592939',
    '520594038',
    '520594041',
    '520594046',
    '520594051',
    '520594053',
    '520594056',
    '520594059',
    '520594064',
    '520594066',
    '520594071',
    '520594075',
    '520594080',
    '520594082',
    '520594086',
    '520594089',
    '520594093',
    '520594099',
    '520594104',
    '520594110',
    '520594117',
    '520594120',
    '520594124',
    '520594130',
    '520594137',
    '520594142',
    '520594147',
    '520594155',
    '520594163',
    '520594167',
    '520594172',
    '520594175',
    '520594900',
    '520594903',
    '520594908',
    '520594910',
    '520594913',
    '520594920',
    '520594933',
    '520594934',
    '520594937',
    '520594940',
    '520594947',
    '520594951',
    '520594953',
    '520594956',
    '520594957',
    '520594959',
    '520594961',
    '520594964',
    '520594970',
    '520594976',
    '520594980',
    '520594984',
    '520594989',
    '520594991',
    '520594994',
    '520594996',
    '520594998',
    '520595001',
    '520595002',
    '520595004',
    '520595005',
    '520595007',
    '520595009',
    '520595012',
    '520595015',
    '520595018',
    '520595025',
    '520595028',
    '520595033',
    '520595034',
    '520595041',
    '520595040',
    '520595046',
    '520595047',
    '520595054',
    '520595056',
    '520595059',
    '520595063',
    '520595070',
    '520595071',
    '520595073',
    '520595076',
    '520595078',
    '520595084',
    '520595091',
    '520595098',
    '520595103',
    '520595106',
    '520595110',
    '520595114',
    '520595118',
    '520595121',
    '520595126',
    '520595130',
    '520595133',
    '520595136',
    '520595141',
    '521259905',
    '521259913',
    '521259917',
    '521259922',
    '521259927',
    '521259933',
    '521259937',
    '521259942',
    '521259944',
    '521259950',
    '521259962',
    '521259966',
    '521259973',
    '521259977',
    '521259982',
    '521259990',
    '521259998',
    '521260004',
    '521260006',
    '521260016',
    '521260019',
    '521260025',
    '521260031',
    '521260042',
    '521260047',
    '521260055',
    '521260060',
    '521260065',
    '521260095',
    '521260110',
    '521273800',
    '521273805',
    '521273812',
  ]

;(async () => {
  const config = {
    server: 'prod',
    importConcurrency: 5,
  } as const
  const serverConfig = Object.freeze({
    prod: {
      sida: 'aTJRd5zLdPHcEhGDovh9dW'
    },
    dev: {
      sida: 'aM4v6eTVSfYMxvXb9zhCQ2',
    },
  })[config.server]
  const prisma = new PrismaClient()
  const sdkv1 = await new KoboSdkGenerator(prisma).getV1(scriptConf.kobo[config.server].serverId)
  const data = await new KoboMappedAnswersService(prisma).searchBn_RapidResponseMechanism()
    .then(res => {
      return res.data.filter(_ => {
        return rrmKoboIdsToMigrate.includes('' + _.id)
      })
    })

  const res = data.map((d, i) => {
    const r: DeepPartial<Input> = {
      start: d.start.toISOString(),
      end: d.end.toISOString(),
      greetings: {
        // not_hello: '',
        // not_information_collect: '',
        interview_date: d.submissionTime,
        agree_interviewed: 'yes',
      },
      metadata: {
        donor: 'sida',
        oblast: d.ben_det_oblast as any,
        raion: d.ben_det_raion as any,
        hromada: d.ben_det_hromada as any,
        // age: '', // TODO
        // sex: '', // TODO
        you_receive_kit: 'yes', // TODO
        ben_det_surname_l: d.ben_det_surname,
        ben_det_first_name_l: d.ben_det_first_name,
        ben_det_pat_name_l: d.ben_det_pat_name,
        phonenumber: d.ben_det_ph_number,
        // you_receive_kit_no: '',
        you_receive_kit_yes: ['nfkf'],
        specify: '',
        selected_other: '',
        family_supported_kit: d.ben_det_hh_size,
        family_categories: undefined,
        family_categories_other: undefined,
      },
      your_comments: `Imported programmatically from RRM form. Index ${i}.`,
      comments: {
        interviewer_comments: JSON.stringify(d),
        not_thank: '',
      },
    }
    return r
  })
  await PromisePool.withConcurrency(config.importConcurrency).for(res).process(async (j, i) => {
    try {
      const res = await sdkv1.submit({
        formId: serverConfig.sida,
        data: j,
      })
      console.log(i, res.message ?? res.error)
    } catch (e: any) {
      console.error(e)
    }
  })
  console.log('Completed')
})()

interface Input {
  start: string,
  end: string,
  // phonenumber [phonenumber] Beneficiary mobile number
  phonenumber: string,
  greetings: {
    // greetings/not_hello [note] Hello, my name is [insert name] I am from [organization name].We want to ask you some questions to obtain information about the NFI assistance that your center/you personally has received from us. Your participation is voluntary and the questions will take around 10-15 minutes to answer. If you accept to participate, you have the option to stop answering or to not answer any question that you don't want to. This information will help us to understand what has been done appropriately in the process, what hasn't worked that good and what we should be doing differently. We want to hear your thoughts, so we can improve the way that we are doing our job in the future.
    not_hello: string,
    // greetings/not_information_collect [note] The information we collect about your personal identity will only be used to identify you for follow up questions if necessary, and will not be shared wider than with internal staff as well as  DRC Staff. Finally, please know that if you provide negative feedback about our work, this will not have any negative consequences to your permanence in this or future activities of this project.
    not_information_collect: string,
    // greetings/interwiever_name [text] Interwiever name
    interwiever_name: string | undefined,
    // greetings/type_interview [select_one] Type of interview
    type_interview: undefined | Option<'type_interview'>,
    // greetings/interview_date [date] Interview date
    interview_date: Date | undefined,
    // greetings/agree_interviewed [select_one] Do you agree to be interviewed?
    agree_interviewed: undefined | Option<'complaint_response'>,

  }
  metadata: {
    ben_det_surname_l: string | undefined,
    // metadata/ben_det_first_name_l [text] What is your first name (as shown in personal ID)?
    ben_det_first_name_l: string | undefined,
    // metadata/ben_det_pat_name_l [text] What is your patronymic name?
    ben_det_pat_name_l: string | undefined,
    // metadata/taxid [text] What is your individual tax number?
    taxid: string | undefined,
    phonenumber: number | undefined,
    // metadata/donor [select_one] Donor
    donor: undefined | Option<'donor'>,
    // metadata/oblast [select_one] Oblast
    oblast: undefined | Option<'oblast'>,
    // metadata/raion [select_one] Raion
    raion: undefined | Option<'raion'>,
    // metadata/hromada [select_one] Hromada
    hromada: undefined | Option<'hromada'>,
    // metadata/age [integer] What is your age?
    age: number | undefined,
    // metadata/sex [select_one] What is your sex?
    sex: undefined | Option<'sex'>,
    // metadata/you_receive_kit [select_one] Did you receive the kit(s)?
    you_receive_kit: undefined | Option<'you_receive_kit'>,
    // metadata/you_receive_kit_no [note] If "I receive no kits" In instances of reporting that the center has not received the kits, the following must take place:   • Apologise to the individual you are speaking to and the absence of the promised kits   • Explain that you will follow up on the status of the distribution, and get back to them with information as soon as possible   • End the interview, and return to conduct the interview once the kits have been received
    you_receive_kit_no: string,
    // metadata/you_receive_kit_yes [select_multiple] If Yes  - What type of NFI kit you have received?
    you_receive_kit_yes: undefined | Option<'you_receive_kit_yes'>[],
    // metadata/specify [text] If other, please specify:
    specify: string | undefined,
    // metadata/selected_other [note] Kindly note that this interview is only intended for your feedback on the Family kit (including Kitchen kit) and/or the Hygiene kit
    selected_other: string,
    // metadata/family_supported_kit [integer] How many people in your household were supported by the kit(s) including you?
    family_supported_kit: number | undefined,
    // metadata/family_categories [select_multiple] Does any person in your household, which also benefitted from the kit(s) , fall under any of these categories?
    family_categories: undefined | Option<'family_categories'>[],
    // metadata/family_categories_other [text] If "Other" Please specify:
    family_categories_other: string | undefined,
  }
  satisfaction: {
    // satisfaction/satisfied_kit_contents [select_one] Are you satisfied with the kit contents?
    satisfied_kit_contents: undefined | Option<'satisfied_kit_contents'>,
    // satisfaction/satisfied_kit_contents_bad_hkf [text] If "neither satisfied not dissatisfied" or "somewhat dissatisfied" or "very dissatisfied", please explain why:
    satisfied_kit_contents_bad_hkf: string | undefined,
    // satisfaction/you_quantity_given [select_one] Do you think the quantity given for each item in the Hygiene kit is enough to last for 3 months?
    you_quantity_given: undefined | Option<'complaint_response'>,
    // satisfaction/you_quantity_given_no_hkf [text] If No, which items do you consider insufficient?
    you_quantity_given_no_hkf: string | undefined,
    // satisfaction/quantity_bwk_sufficient [select_one] Do you think the quality given for each item is sufficient?
    quantity_bwk_sufficient: undefined | Option<'complaint_response'>,
    // satisfaction/quantity_bwk_sufficient_no [text] If No, which items do you consider insufficient?
    quantity_bwk_sufficient_no: string | undefined,
  }
  coping_strategies: {

    // coping_strategies/consider_selling_kit [select_one] Did you consider selling the kit/part of the kit and use the money in another way? If you did, it is ok to say so now - it will help us adapt our activities.
    consider_selling_kit: undefined | Option<'consider_selling_kit'>,
    // coping_strategies/consider_selling_kit_yes [select_multiple] If answer is 'Yes, and I sold it' then - What did you use the money from the kit sale for (which was more useful for you)?
    consider_selling_kit_yes: undefined | Option<'consider_selling_kit_yes'>[],
    // coping_strategies/consider_selling_kit_yes_other [text] If "Other" Please specify:
    consider_selling_kit_yes_other: string | undefined,
    // coping_strategies/particular_item_wish [select_one] Is there a particular item(s) you would wish to have included in the kit(s)?
    particular_item_wish: undefined | Option<'complaint_response'>,
    // coping_strategies/particular_item_wish_yes [text] If "Yes", please state which one
    particular_item_wish_yes: string | undefined,
  }
  effectiveness: {
    // effectiveness/provided_assistance_family [select_one] In your opinion, has the provided Hygiene Kit improved the hygiene conditions of your household?
    provided_assistance_family: undefined | Option<'complaint_response'>,
    // effectiveness/provided_assistance_family_comments [text] Comment
    provided_assistance_family_comments: string | undefined,
    // effectiveness/provided_assistance_nfkf [select_one] In your opinion, has the provided NFI Family kit and Kitchen kit improved living conditions in your family?
    provided_assistance_nfkf: undefined | Option<'complaint_response'>,
    // effectiveness/provided_assistance_nfkf_comments [text] Comment
    provided_assistance_nfkf_comments: string | undefined,
  }
  delivery_process: {
    // delivery_process/receive_kit [select_one] How did you receive the kit(s)?
    receive_kit: undefined | Option<'receive_kit'>,
    // delivery_process/easy_difficul_distribution [select_one] How easy or difficult for you was it to get to the distribution site?
    easy_difficul_distribution: undefined | Option<'easy_difficul_distribution'>,
    // delivery_process/easy_difficul_distribution_comments [text] Access [comments]
    easy_difficul_distribution_comments: string | undefined,
    // delivery_process/process_assistance_delivery [select_one] Overall, how would you evaluate the process of assistance delivery and distribution of the kit(s)?
    process_assistance_delivery: undefined | Option<'process_assistance_delivery'>,
    // delivery_process/process_assistance_delivery_bad [text] If "Very Bad"or "Bad" or "Satisfactory" , Please explain further
    process_assistance_delivery_bad: string | undefined,
    // delivery_process/requested_return_assistance [select_one] Were you requested anything in return for the assistance provided, apart from documentation?
    requested_return_assistance: undefined | Option<'complaint_response'>,
    // delivery_process/requested_return_assistance_yes [text] If "Yes", please clarify
    requested_return_assistance_yes: string | undefined,
    // delivery_process/not_remind_line [note] #### 🔘 Please ensure to remind the individual that they can apply to the Code of Conduct Line. Remind them of the number if they did not receive the CFM leaflet, or they are not aware or the CFM line.
    not_remind_line: string,
    // delivery_process/treated_respect_staff [select_one] Did you feel you were treated with respect by the staff during the process?
    treated_respect_staff: undefined | Option<'complaint_response'>,
    // delivery_process/treated_respect_staff_no [text] If "No", Please explain further
    treated_respect_staff_no: string | undefined,
  }
  accountability: {
    // accountability/know_your_suggestions [select_one] Do you know how and where you could address your suggestions, comments or complaints related to the assistance, if any?
    know_your_suggestions: undefined | Option<'complaint_response'>,
    // accountability/know_your_suggestions_yes [select_one] If "Yes", have you provided any feedback/ suggestions, complaints, or questions?
    know_your_suggestions_yes: undefined | Option<'know_your_suggestions_yes'>,
    // accountability/complaint_response [select_one] If yes, have you received an answer or response?
    complaint_response: undefined | Option<'complaint_response'>,
    // accountability/know_your_suggestions_yes_nd [select_one] If "No did not provide any", why?
    know_your_suggestions_yes_nd: undefined | Option<'know_your_suggestions_yes_nd'>,
    // accountability/know_your_suggestions_yes_nd_other [text] If "Other" Please specify:
    know_your_suggestions_yes_nd_other: string | undefined,
    // accountability/know_your_suggestions_no [select_one] If "No", why?
    know_your_suggestions_no: undefined | Option<'know_your_suggestions_no'>,
    // accountability/know_your_suggestions_no_other [text] If "Other" Please specify:
    know_your_suggestions_no_other: string | undefined,
  }
  outstanding_needs: {
    // outstanding_needs/types_humanitarian_assistance [select_multiple] What types of humanitarian assistance do you currently need?
    types_humanitarian_assistance: undefined | Option<'types_humanitarian_assistance'>[],
    // outstanding_needs/types_humanitarian_assistance_other [text] If "Other" please detail
    types_humanitarian_assistance_other: string | undefined,
  }
  // your_comments [text] Please, leave your comments, reviews and suggestions (if any)
  your_comments: string | undefined,
  comments: {
    // comments/interviewer_comments [text] Interviewer’s comments
    interviewer_comments: string | undefined,
    // comments/not_thank [note] Thank you for your support and participating in this interview.
    not_thank: string,
  }
}
