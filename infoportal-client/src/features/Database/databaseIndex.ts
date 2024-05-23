import {KoboAnswerId} from '@infoportal-common'

const base = (serverId = ':serverId', formId = ':formId') => `/form/${serverId}/${formId}`

export const databaseIndex = {
  basePath: '/database',
  siteMap: {
    index: '/',
    home: base,
    entry: {
      relative: `:id`,
      absolute: (serverId = ':serverId', formId = ':formId') => base(serverId, formId) + `/:id`
    },
    database: {
      relative: `database`,
      absolute: (serverId = ':serverId', formId = ':formId') => base(serverId, formId) + '/database'
    },
    answer: {
      relative: (answerId: KoboAnswerId = ':answerId') => `answer/${answerId}`,
      absolute: (serverId = ':serverId', formId = ':formId', answerId: KoboAnswerId = ':answerId') => base(serverId, formId) + `/answer/${answerId}`
    },
    access: {
      relative: `access`,
      absolute: (serverId = ':serverId', formId = ':formId') => base(serverId, formId) + '/access'
    },
    history: {
      relative: `history`,
      absolute: (serverId = ':serverId', formId = ':formId') => base(serverId, formId) + '/history'
    },
  }
}
