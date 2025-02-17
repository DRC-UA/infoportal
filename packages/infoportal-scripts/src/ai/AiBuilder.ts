import {ActivityInfoSdk} from 'infoportal-common'
import {appConf} from '../appConf'
import {AiBuilderSchemParser} from './AiBuilderSchemaParser'
import {AiBuilderFileMaker} from './AiBuilderFileMaker'

export namespace AiBuilder {
  export type Args = {
    optionsLimit?: number
    formId: string
    name: string
    questionSettings: Partial<
      Record<
        string,
        {
          skip?: boolean
          skipChoices?: boolean
          filterChoices?: (label: string) => boolean
          selectColumnByLabels?: string[]
        }
      >
    >
    outputDir?: string
  }

  export const run = async (args: Args, conf = appConf) => {
    const sdk = new ActivityInfoSdk(appConf.activityInfo.apiToken)
    const formTree = await sdk.fetchForm(args.formId)
    // TODO: Here we assume there won't be more than 1 nested form, and that's not good :-)
    const [form, subForm] = await new AiBuilderSchemParser(args, formTree, sdk).parse()
    const outDir = conf.rootProjectDir + '/src/output/activityInfo'
    await new AiBuilderFileMaker(args, form, subForm).make(outDir)
  }
}
