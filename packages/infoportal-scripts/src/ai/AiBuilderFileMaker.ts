import {fnSwitch} from '@axanc/ts-utils'
import {capitalize} from 'infoportal-common'
import {AiParsedSchema} from './AiBuilderSchemaParser'
import {AiBuilder} from './AiBuilder'
import * as fs from 'node:fs'
import * as prettier from 'prettier'
import path from 'node:path'
import {appConf} from '../appConf'

export class AiBuilderFileMaker {
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

  readonly make = async (outDir: string) => {
    const filePath = outDir + '/AiType' + capitalize(this.args.name) + '.ts'
    console.log(`Generate into ${filePath}`)

    const textContent = [
      `export namespace AiType${capitalize(this.args.name)} {`,
      this.makeInterface(this.parsedForm),
      this.makeMappingFunction(this.parsedForm),
      this.makeChoices(this.parsedForm),
      ...(this.parsedSubForm && this.parsedSubForm.length > 0
        ? [
            this.makeInterface(this.parsedSubForm, 'sub'),
            this.makeMappingFunction(this.parsedSubForm, 'sub'),
            this.makeChoices(this.parsedSubForm, 'sub'),
          ]
        : []),
      '}',
    ].join('\n\n')

    try {
      fs.writeFileSync(filePath, await this.formatCode(textContent))
    } catch (e) {
      console.log(`${this.args.name} contains error.`)
      fs.writeFileSync(filePath, textContent)
    }
  }

  readonly makeChoices = (d: AiParsedSchema[], prefix = '') => {
    return [
      `export const options${capitalize(prefix)} = {`,
      d
        .filter((_) => !!_.options)
        .map((q) => `${q.code}: { ${q.options?.map((o) => `"${o.label}": '${o.id}'`).join(',\n    ')}}`)
        .join(',\n'),
      '}',
    ].join('\n')
  }

  readonly makeMappingFunction = (d: AiParsedSchema[], prefix = '') => {
    return [
      `export const map${capitalize(prefix)} = (a: Type${capitalize(prefix)}) => ({`,
      d
        .map((q) => {
          const mapValue = fnSwitch(
            q.type,
            {
              enumerated: () => `options${capitalize(prefix)}['${q.label}'][a['${q.label}']!]`,
              reference: () => `'${q.optionsId}' + ':' + options${capitalize(prefix)}['${q.label}'][a['${q.label}']!]`,
            },
            (_) => `a['${q.label}']`,
          )
          return `'${q.id}': a['${q.label}'] === undefined ? undefined : ${mapValue}`
        })
        .join(',\n'),
      '})',
    ].join('\n')
  }

  readonly makeInterface = (d: AiParsedSchema[], prefix = '') => {
    return [
      `type Opt${capitalize(prefix)}<T extends keyof typeof options${capitalize(prefix)}> = keyof (typeof options${capitalize(prefix)})[T]`,
      `export interface Type${capitalize(prefix)}`,
      '{',
      d
        .flatMap((q) => [
          `/**\n      ${q.label}${q.description ? '\n      ' + q.description.replaceAll(/\s/g, ' ') : ''}    */`,
          `${q.code}${q.required ? '' : '?'}: ${this.getType(q, prefix)}`,
        ])
        .join('\n'),
      '}',
    ].join('\n')
  }

  private getType(q: AiParsedSchema, prefix: string): string {
    return fnSwitch(
      q.type,
      {
        reference: `Opt${capitalize(prefix)}<'${q.code}'>`,
        enumerated: `Opt${capitalize(prefix)}<'${q.code}'>`,
        quantity: 'number',
      },
      (_) => 'string',
    )
  }
}
