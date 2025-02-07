import {fnSwitch} from '@alexandreannic/ts-utils'
import {capitalize} from 'infoportal-common'
import {AiParsedSchema} from './AiBuilderSchemaParser'
import {AiBuilder} from './AiBuilder'
import * as fs from 'node:fs'
import * as prettier from 'prettier'
import path from 'node:path'
import {appConf} from '../appConf'

export class AiBuilderFileMakerBackup {
  constructor(
    private args: AiBuilder.Args,
    private parsedForm: AiParsedSchema[],
    private parsedSubForm?: AiParsedSchema[],
    private conf = appConf,
  ) {}

  private readonly formatCode = async (textContent: string): Promise<string> => {
    const prettierConfig = await prettier.resolveConfig(path.join(this.conf.rootProjectDir, '../../.prettierrc'))
    return await prettier.format(textContent, {
      ...prettierConfig,
      parser: 'typescript',
    })
  }

  readonly print = async (outDir: string) => {
    const filePath = outDir + '/AiType' + capitalize(this.args.name) + '.ts'
    console.log(`Generate into ${filePath}`)

    const textContent =
      `export namespace AiType${capitalize(this.args.name)} {` +
      this.generateInterface(this.parsedForm) +
      '\n\n' +
      this.generateMappingFn(this.parsedForm) +
      '\n\n' +
      this.printOptions(this.parsedForm) +
      '\n\n' +
      (this.parsedSubForm && this.parsedSubForm.length > 0
        ? this.generateInterface(this.parsedSubForm, 'sub') +
          '\n\n' +
          this.generateMappingFn(this.parsedSubForm, 'sub') +
          '\n\n' +
          this.printOptions(this.parsedSubForm, 'sub') +
          '\n\n'
        : '') +
      '}'

    try {
      fs.writeFileSync(filePath, await this.formatCode(textContent))
    } catch (e) {
      console.log(`${this.args.name} contains error.`)
      fs.writeFileSync(filePath, textContent)
    }
  }

  readonly printOptions = (d: AiParsedSchema[], prefix = '') => {
    return (
      `export const options${capitalize(prefix)} = {\n` +
      d
        .filter((_) => !!_.options)
        .map(
          (q) =>
            `` +
            `  '${q.label}': {\n` +
            `    ${q.options?.map((o) => `"${o.label}": '${o.id}'`).join(',\n    ')}` +
            `\n  }`,
        )
        .join(',\n') +
      '\n}'
    )
  }

  readonly generateMappingFn = (d: AiParsedSchema[], prefix = '') => {
    return (
      `export const map${capitalize(prefix)} = (a: Type${capitalize(prefix)}) => ({\n` +
      d
        .map((q) => {
          const mapValue = fnSwitch(
            q.type,
            {
              enumerated: () => {
                return `options${capitalize(prefix)}['${q.label}'][a['${q.label}']!]`
              },
              reference: () => {
                return `'${q.optionsId}' + ':' + options${capitalize(prefix)}['${q.label}'][a['${q.label}']!]`
              },
            },
            (_) => `a['${q.label}']`,
          )
          return `  '${q.id}': a['${q.label}'] === undefined ? undefined : ${mapValue}`
        })
        .join(',\n') +
      '\n})'
    )
  }

  readonly generateInterface = (d: AiParsedSchema[], prefix = '') => {
    return (
      `` +
      `type Opt${capitalize(prefix)}<T extends keyof typeof options${capitalize(prefix)}> = keyof (typeof options${capitalize(prefix)})[T]\n\n` +
      `export interface Type${capitalize(prefix)} {\n` +
      d
        .map((q) => {
          const type = fnSwitch(
            q.type,
            {
              reference: `Opt${capitalize(prefix)}<'${q.label}'>`,
              enumerated: `Opt${capitalize(prefix)}<'${q.label}'>`,
              quantity: 'number',
            },
            (_) => 'string',
          )
          return `  '${q.label}'${q.required ? '' : '?'}: ${type}`
        })
        .join(',\n') +
      '\n}'
    )
  }
}
