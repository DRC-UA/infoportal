import {Project, SourceFile, VariableDeclarationKind} from 'ts-morph'
import {capitalize} from 'infoportal-common'
import {AiBuilder} from './AiBuilder'
import {AiParsedSchema} from './AiBuilderSchemaParser'
import {fnSwitch} from '@alexandreannic/ts-utils'
import * as prettier from 'prettier'
import * as fs from 'node:fs'
import {appConf} from '../appConf'
import * as path from 'node:path'

export class AiBuilderFileMakerBackup {
  constructor(
    private args: AiBuilder.Args,
    private parsedForm: AiParsedSchema[],
    private parsedSubForm?: AiParsedSchema[],
    private project = new Project({
      compilerOptions: {
        noEmitOnError: false,
      },
    }),
    private conf = appConf,
  ) {}

  async print(outDir: string) {
    const fileName = `AiType${capitalize(this.args.name)}.ts`
    const filePath = `${outDir}/${fileName}`
    console.log(`Generating into ${filePath}`)

    const sourceFile = this.project.createSourceFile(filePath, '', {overwrite: true})

    this.generateNamespace(sourceFile, this.parsedForm)
    if (this.parsedSubForm && this.parsedSubForm.length > 0) {
      this.generateNamespace(sourceFile, this.parsedSubForm, 'sub')
    }
    try {
      fs.writeFileSync(filePath, await this.formatCode(sourceFile.getFullText()))
    } catch (e) {
      console.log(`${this.args.name} contains error.`)
      fs.writeFileSync(filePath, sourceFile.getFullText())
    }
  }

  private readonly formatCode = async (textContent: string): Promise<string> => {
    const prettierConfig = await prettier.resolveConfig(path.join(this.conf.rootProjectDir, '../../.prettierrc'))
    return await prettier.format(textContent, {
      ...prettierConfig,
      parser: 'typescript',
    })
  }

  private generateNamespace(sourceFile: SourceFile, d: AiParsedSchema[], prefix = '') {
    const namespaceName = `AiType${capitalize(prefix)}`
    const namespaceDeclaration = sourceFile.addModule({name: namespaceName, isExported: true})

    namespaceDeclaration.addTypeAlias({
      name: `Opt${capitalize(prefix)}<T extends keyof typeof options${capitalize(prefix)}>`,
      type: `keyof (typeof options${capitalize(prefix)})[T]`,
    })

    namespaceDeclaration.addInterface({
      name: `Type${capitalize(prefix)}`,
      isExported: true,
      properties: d.map((q) => ({
        name: `'${q.label}'`,
        hasQuestionToken: !q.required,
        type: this.getType(q, prefix),
      })),
    })

    namespaceDeclaration.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: `options${capitalize(prefix)}`,
          initializer: this.generateOptions(d, prefix),
        },
      ],
    })

    namespaceDeclaration.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: `map${capitalize(prefix)}`,
          initializer: this.generateMappingFn(d, prefix),
        },
      ],
    })
  }

  private generateOptions(d: AiParsedSchema[], prefix = ''): string {
    return `{
      ${d
        .filter((q) => q.options)
        .map(
          (q) => `'${q.label}': {
        ${q.options?.map((o) => `'${o.label}': '${o.id}'`).join(',\n')}
      }`,
        )
        .join(',\n')}
    }`
  }

  private generateMappingFn = (d: AiParsedSchema[], prefix = '') => {
    return (
      `(a: Type${capitalize(prefix)}) => ({\n` +
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

  private getType(q: AiParsedSchema, prefix: string): string {
    return fnSwitch(
      q.type,
      {
        reference: `Opt${capitalize(prefix)}<'${q.label}'>`,
        enumerated: `Opt${capitalize(prefix)}<'${q.label}'>`,
        quantity: 'number',
      },
      (_) => 'string',
    )
  }
}
