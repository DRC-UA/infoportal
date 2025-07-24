const root = 'individual-legal-aid'

const pages = {
  individualLegalAid: {
    slug: root,
    dashboard: {
      path: `${root}/dashboard`,
      slug: 'dashboard',
    },
    data: {
      path: `${root}/data`,
      slug: 'data',
      group: {
        path: `${root}/data/group/:group`,
        slug: `group/:group`,
      },
    },
  },
}

export {pages}
