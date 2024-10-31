import {KoboAnswerId} from 'infoportal-common'

const base = (formId = ':formId') => `/form/${formId}`

export const databaseIndex = {
  basePath: '/database',
  siteMap: {
    index: '/',
    home: base,
    custom: (id = ':id') => `/custom/${id}`,
    entry: {
      relative: `:id`,
      absolute: (formId = ':formId') => base(formId) + `/:id`
    },
    database: {
      relative: `database`,
      absolute: (formId = ':formId') => base(formId) + '/database'
    },
    answer: {
      relative: (answerId: KoboAnswerId = ':answerId') => `answer/${answerId}`,
      absolute: (formId = ':formId', answerId: KoboAnswerId = ':answerId') => base(formId) + `/answer/${answerId}`
    },
    access: {
      relative: `access`,
      absolute: (formId = ':formId') => base(formId) + '/access'
    },
    history: {
      relative: `history`,
      absolute: (formId = ':formId') => base(formId) + '/history'
    },
  }
}
