export type KoboApiType = KoboApiForm['content']['survey'][0]['type']

export type KoboApiQuestion = KoboApiForm['content']['survey'][0]

export interface KoboApiForm {
  name: string
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
      $autoname?: string
      $kuid: string
      $qpath: string
      label?: string[]
      $xpath: string
      name: string
      type:
        'end_repeat' |
        'begin_repeat' |
        'begin_group' |
        'note' |
        'end_group' |
        'text' |
        'calculate' |
        'integer' |
        'select_one' |
        'select_multiple' |
        'start' |
        'end' |
        'datetime' |
        'date'
      select_from_list_name?: string
    }[]
    translated: ['hint', 'label', 'media::image']
    translations: [string, string]
  }
}

export const koboQuestionType: KoboApiType[] = [
  'text',
  'start',
  'end',
  'integer',
  'select_one',
  'select_multiple',
  'date',
]

export const filterKoboQuestionType = (_: KoboApiQuestion) => koboQuestionType.includes(_.type)
