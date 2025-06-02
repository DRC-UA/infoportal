export namespace Conflict_pre_post {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]

  // Form id: atG7X5hrbXbR9eseskUoCq
  export interface T {
    start: string
    end: string
    // cal_score [calculate] Підсумковий бал
    cal_score: string
    // date [date] Дата тестування
    date: Date | undefined
    // date_birth [date] Дата народження:
    date_birth: Date | undefined
    // organisation [text] Організація:
    organisation: string | undefined
    // complete_training [select_one] Цей тест проходиться до чи після навчання?
    complete_training: undefined | Option<'complete_training'>
    // date_complete_pre [date] Дата проходження тестування до навчання
    date_complete_pre: Date | undefined
    // before_consent [select_one] Привіт! Дякуємо за участь у цьому короткому тесті. Ваші відповіді є анонімними та добровільними. Невелика група працівників ДРБ використає результати, щоб покращити нашу роботу. Ми цінуємо вашу чесну думку — її надання жодним чином не вплине на вашу участь у цій чи майбутніх активностях. Я погоджуюсь
    before_consent: undefined | Option<'conflict_negative'>
    cal_pre_post: string
    // full_number_member [calculate] Повний номер учасника
    full_number_member: string
    // questions/conflict_negative [select_one] Конфлікт - це завжди негативне явище.
    conflict_negative: undefined | Option<'conflict_negative'>
    // questions/cal_conflict_negative [calculate] Score
    cal_conflict_negative: string
    // questions/conflict_sensitivity [select_multiple] Що таке чутливість до конфлікту?
    conflict_sensitivity: undefined | Option<'conflict_sensitivity'>[]
    // questions/cal_conflict_sensitivity [calculate] Score
    cal_conflict_sensitivity: string
    // questions/risks_organisation [select_multiple] Які ризики існують для організації, якщо вона не діє з урахуванням чутливості до конфлікту?
    risks_organisation: undefined | Option<'risks_organisation'>[]
    // questions/cal_risks_organisation [calculate] Score
    cal_risks_organisation: string
    // questions/following_conflict [select_multiple] Які з наступних тверджень описують, яким чином чутливість до конфлікту може стати можливістю?
    following_conflict: undefined | Option<'following_conflict'>[]
    // questions/cal_following_conflict [calculate] Score
    cal_following_conflict: string
    // questions/rp_conflict_sensitivity [select_multiple] Хто повинен відігравати роль у забезпеченні чутливості до конфлікту?
    rp_conflict_sensitivity: undefined | Option<'rp_conflict_sensitivity'>[]
    // questions/cal_rp_conflict_sensitivity [calculate] Score
    cal_rp_conflict_sensitivity: string
    // training_evaluation/good_balance [select_one] Тренінг базується на хорошому балансі між теорією та практикою
    good_balance: undefined | Option<'content_transferable'>
    // training_evaluation/presentations [select_one] Презентації різних елементів були добре структуровані та зрозумілі
    presentations: undefined | Option<'content_transferable'>
    // training_evaluation/methodology [select_one] Методологія тренінгу була інтерактивною та заохочувала до активної участі
    methodology: undefined | Option<'content_transferable'>
    // training_evaluation/facilitation_inclusive [select_one] Підхід до фасилітації був інклюзивним
    facilitation_inclusive: undefined | Option<'content_transferable'>
    // training_evaluation/content_transferable [select_one] Зміст тренінгу може бути застосований у вашій роботі
    content_transferable: undefined | Option<'content_transferable'>
    // training_evaluation/content_specific_tasks [text] Для яких конкретно завдань або сфер вашої повсякденної роботи ви плануєте використовувати зміст і матеріали тренінгу?
    content_specific_tasks: string | undefined
    // training_evaluation/comments [text] Будь ласка, додайте тут будь-які додаткові коментарі, які у вас можливо є стосовно тренінгу та його змісту
    comments: string | undefined
  }

  export const options = {
    complete_training: {
      before: `До навчання`,
      after: `Після навчання`,
    },
    conflict_negative: {
      yes: `Так`,
      no: `Ні`,
    },
    conflict_sensitivity: {
      humanitarian_intervention: `Чутливість до конфлікту - це гуманітарне втручання, спрямоване на вирішення конфліктів і сприяння миробудівництву.`,
      recognizing_interventions: `Чутливість до конфлікту – це визнання того, що втручання може мати непередбачувані наслідки для контексту, в якому вони здійснюються.`,
      practice_understanding: `Чутливість до конфлікту - це практика розуміння того, як втручання організації взаємодіє з конфліктом, з метою мінімізації негативних та максимізації позитивних результатів.`,
    },
    risks_organisation: {
      exacerbating_conflicts: `Загострення існуючих конфліктів`,
      slowing_project: `Уповільнення реалізації проєкту через уникнення роботи в конфліктному контексті`,
      increasing_marginalisation: `Посилення маргіналізації певних груп або сегментів суспільства`,
      focusing_assistance: `Зосередження допомоги на певних групах може створити враження, що гуманітарна організація є упередженою`,
      creating_inclusive_environment: `Створення інклюзивного середовища`,
    },
    following_conflict: {
      strengthens_relationships: `Зміцнює відносини з громадами та зацікавленими сторонами.`,
      organizations_challenges: `Забезпечує, щоб організації ніколи не мали труднощів в операційній діяльності.`,
      organisations_opportunities: `Дозволяє організаціям визначати можливості для соціальної згуртованості.`,
      strengthens_credibility: `Зміцнює довіру до організації та визнання її як неупередженого та чутливого до потреб діяча.`,
      organisations_political: `Забезпечує, щоб організації уникали всі політичні та соціальні проблемні питання.`,
    },
    rp_conflict_sensitivity: {
      meal: `Відділ моніторингу та оцінки даних MEAL`,
      smt: `Команда старших менеджерів`,
      project_team: `Команди, які реалізують проєкти`,
      support: `Служби підтримки`,
      programme_managers: `Програмні менеджери`,
      all: `Усе вищезазначене (співробітники всіх рівнів)`,
    },
    content_transferable: {
      strongly_disagree: `Повністю не погоджуюсь`,
      disagree: `Не погоджуюсь`,
      neutral: `Нейтрально`,
      agree: `Погоджуюсь`,
      strongly_agree: `Повністю погоджуюсь`,
    },
  } as const

  const extractQuestionName = (_: Record<string, any>) => {
    const output: any = {}
    Object.entries(_).forEach(([k, v]) => {
      const arr = k.split('/')
      const qName = arr[arr.length - 1]
      output[qName] = v
    })
    return output
  }

  export const map = (_: Record<keyof T, any>): T =>
    ({
      ..._,
      date: _.date ? new Date(_.date) : undefined,
      date_birth: _.date_birth ? new Date(_.date_birth) : undefined,
      date_complete_pre: _.date_complete_pre ? new Date(_.date_complete_pre) : undefined,
      conflict_sensitivity: _.conflict_sensitivity?.split(' '),
      risks_organisation: _.risks_organisation?.split(' '),
      following_conflict: _.following_conflict?.split(' '),
      rp_conflict_sensitivity: _.rp_conflict_sensitivity?.split(' '),
    }) as T
}
