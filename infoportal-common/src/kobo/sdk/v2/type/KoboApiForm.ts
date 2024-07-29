export type KoboApiColType = KoboApiSchema['content']['survey'][0]['type']

export type KoboApiQuestionSchema = KoboApiSchema['content']['survey'][0]

export type KoboApiQuestionType = KoboApiQuestionSchema['type']

export type KoboApiQuestionChoice = KoboApiSchema['content']['choices'][0]

export enum DeploymentStatus {
  deployed = 'deployed',
  archived = 'archived',
  draft = 'draft',
}

export type KoboApiFiles = {
  asset: string
  content: string
  date_created: string
  description: string
  file_type: string
  metadata: {
    filename: string
    hash: string
    mimetype: string
  }
  uid: string
  url: string
  user: string
  user__username: string
}

export type KoboApiColumType = 'file'
  | 'deviceid'
  | 'end_repeat'
  | 'begin_repeat'
  | 'begin_group'
  | 'select_one'
  | 'note'
  | 'datetime'
  | 'end_group'
  | 'username'
  | 'geopoint'
  | 'image'
  | 'today'
  | 'text'
  | 'calculate'
  | 'integer'
  | 'decimal'
  | 'select_multiple'
  | 'select_one_from_file'
  | 'date'
  | 'start'
  | 'end'

export interface KoboApiSchema {
  name: string
  deployment__links: {
    iframe_url: string
    offline_url: string
    preview_url: string
    single_iframe_url: string
    single_once_iframe_url: string
    single_once_url: string
    single_url: string
    url: string
  }
  content: {
    choices: {
      $autovalue: string,
      $kuid: string,
      label: string[],
      list_name: string,
      name: string,
    }[]
    schema: string
    settings: {version: string, default_language: string}
    survey: {
      $autoname: string
      $kuid: string
      $qpath: string
      $xpath: string
      label?: string[]
      appearance?: 'multiline',
      name: string
      file?: string
      type: KoboApiColumType
      calculation: KoboApiColumType
      select_from_list_name?: string
    }[]
    translated: ['hint', 'label', 'media::image']
    translations: string[]
  }
  deployment_status: DeploymentStatus
  has_deployment: boolean
  date_created: Date
  date_modified: Date
  deployed_version_id: string
  deployment__active: boolean
  // deployment__identifier: "https://kc.humanitarianresponse.info/alexandre_annic_drc/forms/aRHsewShwZhXiy8jrBj9zf"
  deployment__submission_count: 0
  // downloads: [,…]
  // export_settings: []
  // kind: "asset"
  // owner: "https://kobo.humanitarianresponse.info/api/v2/users/alexandre_annic_drc/"
  owner__username: string
  // parent: null
  // permissions: [{,…}, {,…}, {,…}, {,…}, {,…}, {,…}, {,…}, {,…}]
  // settings: {sector: {label: "Humanitarian - Coordination / Information Management",…},…}
  // status: "private"
  subscribers_count: 0
  // summary: {geo: false,…}
  // tag_string: ""
  uid: string
  // url: "https://kobo.humanitarianresponse.info/api/v2/assets/aRHsewShwZhXiy8jrBj9zf/"
  version_id: string
  files: KoboApiFiles[]
}
