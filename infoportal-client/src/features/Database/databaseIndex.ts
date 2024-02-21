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
    access: {
      relative: `access`,
      absolute: (serverId = ':serverId', formId = ':formId') => base(serverId, formId) + '/access'
    },
    // database: (serverId = ':serverId', formId = ':formId') => `form/${serverId}/${formId}/database`,
    // access: (serverId = ':serverId', formId = ':formId') => `form/${serverId}/${formId}/access`,
  }
}
