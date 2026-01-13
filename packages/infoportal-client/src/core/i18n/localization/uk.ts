import deepmerge from 'deepmerge'

import {en} from './en'
import type {DictionaryShape} from './types'

const uk = deepmerge(en, {
  messages: {
    idps: 'Внутрішньо переміщені особи',
    nonDisplaced: 'Не переміщений',
    refugeesAndReturnees: 'Біженці та ті, що повернулись з-за кордону',
    area: 'Область',
    answers: 'Відповіді',
    noDataAtm: 'На даний момент немає даних',
    seeResults: 'Переглянути результати',
    select3Outcomes: 'Будь ласка, виберіть 3 результати',
    somethingWentWrong: 'Щось пішло не так',
    yes: 'Так',
    no: 'Ні',
    previous: 'Попередній',
    next: 'Наступний',
    yourAnswers: 'Ваші відповіді',
    confirm: 'Підтвердити',
    formSubmitted: 'Відповіді успішно відправлені',
    protHHSnapshot: {},
    includeNotSpecified: 'в т.ч. "Не зазначено"',
    damageCause: 'Причина руйнувань',
    hhSize: 'Розмір домогосподарства',
    avgHHSize: 'Середній розмір домогосподарства',
    households: 'Домогосподарств',
    modality: 'Модальність',
    individualsCount: 'Кількість осіб',
    office: 'Офіс',
    oblast: 'Область',
    raion: 'Район',
    hromada: 'Громада',
    project: 'Проєкт',
    activity: 'Активність',
    submissions: 'Записи',
    count: 'Кількість',
    kobo: 'Kobo',
    koboData: 'Дані Kobo',
    dashboard: 'Дешборд',
    dashboards: 'Дешборди',
    topic: 'Тема',
    testType: 'Тип тесту',
    formOutcome: {
      title: 'Які 3 результати ...',
      questions: {
        now: '... Ви вважаєте, що ми найбільше допомагаємо зараз?',
        oneYear: '... Ви вважаєте, що ми маємо найбільше допомогти через рік?',
        end: '... Ви вважаєте, що ми маємо найбільше допомогти до кінця поточної стратегії ДРК (2025 року)',
      },
      breakthrough: {
        breakthrough1: {
          title: 'Прорив 1',
          desc: 'Як і інші, люди, які постраждали від конфлікту та переміщення, повинні мати змогу шукати безпеку та заявляти про основні права',
          options: {
            bt1_outcomeArea1: {
              title: 'Область результату 1',
              desc: 'Більш безпечні спільноти мають здатність та системи для зменшення всіх форм насильства',
            },
            bt1_outcomeArea2: {title: 'Область результату 2', desc: 'Базові потреби людей задовольняються'},
            bt1_outcomeArea3: {
              title: 'Область результату 3',
              desc: 'Державні службовці діють з повагою, захищають та виконують права людей',
            },
            bt1_outcomeArea4: {
              title: 'Область результату 4',
              desc: 'Люди можуть вимагати повагу до захисту та виконання їх прав',
            },
            bt1_outcomeArea5: {
              title: 'Область результату 5',
              desc: 'Люди можуть ефективно використовувати системи для виконання своїх прав',
            },
          },
        },
        breakthrough2: {
          title: 'Прорив 2',
          desc: 'На рівних з іншими, люди, що постраждали від конфліктів та переміщень, повинні мати можливість розвивати самодостатність',
          options: {
            bt2_outcomeArea5: {
              title: 'Область результату 5',
              desc: 'Люди можуть ефективно використовувати системи для здійснення своїх прав',
            },
            bt2_outcomeArea6: {
              title: 'Область результату 6',
              desc: 'Люди мають більш гідне та стійке забезпечення життя',
            },
            bt2_outcomeArea7: {
              title: 'Область результату 7',
              desc: 'Підвищується соціальна сплоченість у спільнотах/суспільствах',
            },
            bt2_outcomeArea8: {
              title: 'Область результату 8',
              desc: 'Люди можуть ефективно брати участь у справедливому та рівному громадському житті',
            },
            bt2_outcomeArea9: {
              title: 'Область результату 9',
              desc: 'Зменшується ризик вразливості та небезпеки природних катастроф',
            },
          },
        },
      },
    },
    questionArea: 'У якій області ви працюєте?',
    areas: {
      north: 'Північ',
      east: 'Схід',
      south: 'Південь',
      west: 'Захід',
    },
    docsTitle: 'Документація',
    victimAssistanceTitle: 'допомога постраждалим',
    riskEducation: {
      sectionTitle: 'Навчання про ризики',
      sessionsNumber: 'Кількість сесій',
      individualsReached: 'Осіб охоплено',
    },
    xmlLabels: 'XML поля',
    language: {
      uk: 'Українська',
      en: 'Англійська',
    },
    _shelter: {
      damageCondition: 'What is the Condition of the Building / Apartment',
      repairStandardsWidget: {
        chartTitle: (n: number) => `Відповідність стандартам ${n} відремонтованих локацій`,
        labels: {
          yes: 'Відповідає',
          no: 'Не відповідає',
          notDefined: 'Не визначено',
        },
      },
    },
    legal: {
      individualAid: 'Індивідуальна юридична допомога',
      aidType: {
        title: 'Тип допомоги',
        assistance: 'Вторинна допомога',
        councelling: 'Консультація',
      },
      docTypeCount: {
        hlp: 'Отримали документи на власність',
        civilDocs: 'Отримали цивільні документи',
      },
      registeredBy: 'Зареєстрував',
      aidStatus: 'Статус допомоги',
      aidDate: 'Дата допомоги',
      aidClosureDate: 'Дата закриття допомоги',
      map: {
        title: 'Бенефіціари по областях',
      },
    },
    communications: {
      title: 'Дані відділу комунікацій',
      subPages: {
        yearlyReport: {
          title: 'Річний звіт',
        },
      },
    },
    mealMonitoringPdm: {
      sidebarLinkLabelForEcrecAgMsmeVetPam: 'EcRec (Ag, MSME, VET) PAM',
      loadingDataSubtitlePlaceholder: 'Завантажую дані',
    },
    pssDashboard: {
      uniqueIndividualsHint: 'Деперсоналізовані ідентифікуючі дані збираються з половини вересня 2025',
      sessionsCounterTitle: 'Проведено сесій:',
      sessionsAttendanceWidgetTitle: 'Відвідуваність СПП',
      prePostWidget: {
        title: 'Тестування до і після',
        pre: 'До',
        post: 'Після',
        difference: 'Прогрес',
      },
      inprovementStatsWidget: {
        title: (count: number) => `Статистика зміни стану ${count} людей`,
        labels: {
          improved: 'Покращення',
          noChanges: 'Без змін',
          worsened: 'Погіршення',
        },
      },
    },
    cbpDashboard: {
      buttonLabel: 'Дешборд CBP тестів "до" і "після"',
      mapTitle: 'Записи за областями',
      prePostTestScores: 'Бали за тестами "до" і "після"',
      progressLabel: 'Прогрес',
      timelineTitle: (count: number) => `Записи за місяцями (загальна кількість: ${count})`,
      avgProgress: 'Середній прогрес покращення знань',
      discrepancies: {
        title: 'Аналіз розбіжностей даних',
        preList: 'Перелік ID без відповідного тесту "після":',
        postList: 'Перелік ID без відповідного тесту "до":',
      },
    },
    gbvNeedsAssessmentSnapshot: {
      mykolaiv: {
        2025: {
          title: 'ГЗН: дослідження потреб з розбудови потенціалу на 2026',
          subTitle: 'Україна – Миколаїв (2025)',
          priorityTrainingTitle: 'Пріоритетні Потреби в тренінгах',
          mapLegendTitle: 'Кількість респондентів за районами',
          perspective_effective_system:
            'Ефективність системи реагування на випадки гендерно зумовленого і домашного насильства у громаді',
          access_supervision_support: 'Доступність супроводу або менторської підтримки',
          services_survivors_most: 'Найбільш актуальні послуги для постраждалих у громаді',
          effective_training_formats: 'Найефективніший формат навчання для установи',
          main_challenges_services:
            'Основні виклики у наданні послуг постраждалим від гендерно зумовленого чи домашнього насильства у 2025',
          main_barriers2025: 'Основні перешкоди у 2025',
          areas_staff_training: 'Пріоритетні напрями навчання співробітників 2025',
          training_high_risk_groups_yes: 'Пріоритетна група',
          manage_staff_burnout: 'Якість роботи організації з вигоранням працівників та надання психологічної підтримки',
          strengthen_capacity_respond:
            'Бажані навчальні заходи для підвищення спроможності реагувати в зазначених випадках',
        },
      },
    },
    plurals: {
      session: {
        zero: 'Сесій',
        one: 'Сесія',
        two: 'Сесії',
        few: 'Сесії',
        many: 'Сесій',
        other: 'Сесій',
      },
      individuals: {
        zero: 'Осіб',
        one: 'Особа',
        two: 'Осіб',
        few: 'Особи',
        many: 'Осіб',
        other: 'Осіб',
      },
      oblast: {
        zero: 'Областей',
        one: 'Область',
        two: 'Області',
        few: 'Областей',
        many: 'Областей',
        other: 'Областей',
      },
      uniqueIndividuals: {
        zero: 'Унікальних осіб',
        one: 'Унікальна особа',
        two: 'Унікальні особи',
        few: 'Унікальні особи',
        many: 'Унікальних осіб',
        other: 'Унікальних осіб',
      },
      submission: {
        zero: 'Записів',
        one: 'Запис',
        two: 'Записи',
        few: 'Записи',
        many: 'Записів',
        other: 'Записів',
      },
      submissionLocative: {
        zero: 'записів',
        one: 'записі',
        two: 'записах',
        few: 'записах',
        many: 'записах',
        other: 'записах',
      },
      preTest: {
        zero: 'Тестів "до"',
        one: 'Тест "до"',
        two: 'Тести "до"',
        few: 'Тестів "до"',
        many: 'Тестів "до"',
        other: 'Тестів "до"',
      },
      postTest: {
        zero: 'Тестів "після"',
        one: 'Тест "після"',
        two: 'Тести "після"',
        few: 'Тестів "після"',
        many: 'Тестів "після"',
        other: 'Тестів "після"',
      },
    },
  },
} satisfies DictionaryShape)

export {uk}
