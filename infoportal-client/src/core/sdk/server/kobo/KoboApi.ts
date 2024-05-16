export type KoboApiColType = KoboSchema['content']['survey'][0]['type']

export type KoboQuestionSchema = KoboSchema['content']['survey'][0]

export type KoboQuestionType = KoboQuestionSchema['type']

export type KoboQuestionChoice = KoboSchema['content']['choices'][0]

export type KoboFiles = {
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

export interface KoboSchema {
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
      name: string
      file?: string
      type:
        'file' |
        'deviceid' |
        'end_repeat' |
        'begin_repeat' |
        'begin_group' |
        'select_one' |
        'note' |
        'datetime' |
        'end_group' |
        'username' |
        'geopoint' |
        'image' |
        'today' |
        'text' |
        'calculate' |
        'integer' |
        'decimal' |
        'select_multiple' |
        'select_one_from_file' |
        'date' |
        'start' |
        'end'
      select_from_list_name?: string
    }[]
    translated: ['hint', 'label', 'media::image']
    translations: string[]
  }
  files: KoboFiles[]
}
