import {KoboAnswerId} from '../../../../infoportal-common/src'

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
      absolute: (serverId = ':serverId', formId = ':formId', answerId: KoboAnswerId = ':answerId') => base(serverId, formId) + `/database/answer/${answerId}`
    },
    access: {
      relative: `access`,
      absolute: (serverId = ':serverId', formId = ':formId') => base(serverId, formId) + '/access'
    },
    // database: (serverId = ':serverId', formId = ':formId') => `form/${serverId}/${formId}/database`,
    // access: (serverId = ':serverId', formId = ':formId') => `form/${serverId}/${formId}/access`,
  }
}
