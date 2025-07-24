import type {FC} from 'react'
import Typography from '@mui/material/Typography'
import {LightAsync as SyntaxHighlighter} from 'react-syntax-highlighter'
import atomOneDark from 'react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark'

import {
  rrmFormStructureJson,
  reportBody,
  typeBuilderFormIds,
  sectorSchemaGenerator,
  indicators,
  interfaceGeneratorCommand,
} from './codeChunks'

const DocsActivityInfo: FC = () => {
  return (
    <article>
      <Typography variant="h2">Reporting to Activity Info</Typography>
      <Typography variant="h3" marginBlock={2} id="1-activity-info-structure">
        1. Activity Info structure
      </Typography>
      <Typography>
        Activity Info is a platform for storing reports on NGO&#39;s activities. For this a yearly database is being
        created, like <em>&quot;2025 Ukraine Response Planning &amp; Monitoring</em>&quot;.
      </Typography>
      <Typography>
        The main parts of the database are <em>&quot;Activity Planning module (APM)&quot;</em> and{' '}
        <em>&quot;Response Monitoring Module (RRM)&quot;</em>. Before any reporting through Infoportal is possible, the
        APM should be filled.
      </Typography>
      <Typography variant="h3" marginBlock={2} id="2-rrm-form-structure">
        2. RRM Form structure
      </Typography>
      <Typography>
        To check the reporting form structure open any previously sent report and check the browsers console. The{' '}
        <code>translated</code> endpoint returns a JSON structure of the form. Below is a trimmed version for
        demonstration:
      </Typography>
      <SyntaxHighlighter language="json" style={atomOneDark}>
        {rrmFormStructureJson}
      </SyntaxHighlighter>
      <Typography>
        As one may see, the <code>forms</code> in terms of Activity Info are actually a <code>fields</code> of the form.{' '}
        <code>elements</code> of the <code>schema</code> property are the answer variants (translations, options of
        different relevance etc). Let&#39;s stick to English variant.
      </Typography>
      <Typography>
        To send the report to Activity Info API our goal is to compile a request body of the form one may see below:
      </Typography>
      <SyntaxHighlighter language="json" style={atomOneDark}>
        {reportBody}
      </SyntaxHighlighter>
      <Typography>
        Where the &quot;fields&quot; option is an object, representing the structure of questions and answers of the
        form.
      </Typography>
      <Typography variant="h3" marginBlock={2} id="3-generating-interfaces">
        3. Generating interfaces
      </Typography>
      <Typography>
        To build a report body in type-safe manner, we generate an interface. For this we use a dedicated script at
      </Typography>
      <SyntaxHighlighter language="text" style={atomOneDark}>
        packages/infoportal-scripts/src/ActivityInfoBuildType.ts
      </SyntaxHighlighter>
      <Typography>
        Make needed modifications to the <code>ActivityInfoBuildType</code> class, like provide proper
        &quot;formId&quot; for a respective sector. The <code>cofrmId</code> could be taken from the respective RRM
        form's URI, like{' '}
        <code>
          https://www.activityinfo.org/app#form/<strong>cmasgbem5w7pgf02</strong>/table
        </code>{' '}
        for SNFI form:
      </Typography>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDark}
        showLineNumbers
        startingLineNumber={12}
        lineNumberStyle={{borderRight: '1px solid', paddingRight: 8, marginRight: 12, opacity: 0.4}}
      >
        {typeBuilderFormIds}
      </SyntaxHighlighter>
      <Typography>and / or set the needed questions per sector:</Typography>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDark}
        showLineNumbers
        startingLineNumber={23}
        lineNumberStyle={{borderRight: '1px solid', paddingRight: 8, marginRight: 12, opacity: 0.4}}
      >
        {sectorSchemaGenerator}
      </SyntaxHighlighter>
      <Typography variant="h3" component="h4" marginBlock={2} id="3-1-setting-activity-indicators-types">
        3.1. Setting activity indicators types
      </Typography>
      <Typography>
        Some fields have nested structure. For example Activity Indicators. They consist of <code>Activity Label</code>,{' '}
        <code>Indicator Label</code>, <code>Modality</code> and <code>Themes</code>. Since all <code>Themes</code> have
        the same label value <code>No specific theme</code>, we are combining indicator&#39;s params in one string like
        that:
      </Typography>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDark}
        showLineNumbers
        startingLineNumber={111}
        lineNumberStyle={{borderRight: '1px solid', paddingRight: 8, marginRight: 12, opacity: 0.4}}
      >
        {indicators}
      </SyntaxHighlighter>
      <Typography>Run the script to generate Activity Info reports interfaces:</Typography>
      <SyntaxHighlighter
        language="bash"
        style={atomOneDark}
      >{`npm run build-ai-type -w infoportal-scripts`}</SyntaxHighlighter>
      or
      <SyntaxHighlighter language="bash" style={atomOneDark}>{`npm run dev -w infoportal-scripts`}</SyntaxHighlighter>
      <Typography>if you uncommented some a command to generate some specific interface like:</Typography>
      <SyntaxHighlighter
        language="typescript"
        style={atomOneDark}
        showLineNumbers
        startingLineNumber={111}
        lineNumberStyle={{borderRight: '1px solid', paddingRight: 8, marginRight: 12, opacity: 0.4}}
      >
        {interfaceGeneratorCommand}
      </SyntaxHighlighter>
      <Typography>Find the generated interface[s] in the folder:</Typography>
      <SyntaxHighlighter language="bash" style={atomOneDark}>{`packages/infoportal-scripts/output`}</SyntaxHighlighter>
      <Typography variant="h3" marginBlock={2} id="4-preparing-the-report">
        4. Preparing the report
      </Typography>
      <Typography>Copy the file[s] with generated interfaces to a dedicated location, like:</Typography>
      <SyntaxHighlighter
        language="bash"
        style={atomOneDark}
      >{`packages/infoportal-client/src/features/ActivityInfo/Gbv/aiGbvType.ts`}</SyntaxHighlighter>
      <Typography>
        In the same folder locate a mapper class and adjust it, if needed, to produce the data suitable for the report.
        For example, you may want to adjust request, that fetches meta data for the sector.
      </Typography>
      <Typography>
        The most essential part of the request adjustment is &quot;mapActivity&quot; function, that prepares the final
        body to be sent to the Activity Info API. It groups meta data, performs a callback on the groups of data and
        returns the transformed data to reporting.
      </Typography>
      <Typography>
        Pay attention to the Indicators - Activity matcher. Indicators for the activity could be provided by PMs.
      </Typography>
      <Typography variant="h3" marginBlock={2} id="recap-">
        Recap:
      </Typography>
      <blockquote>
        <Typography component="ul">
          <Typography component="li">Make sure all plan/project codes are set in the APM module.</Typography>
          <Typography component="li">
            If changes were made in APM module of Activity Info portal, generate new interface[s].
          </Typography>
          <Typography component="li">
            Check Activity Info module for missing data, like activity indicators, plan/project codes etc. Adjust the
            mapper class accordingly to fix the issues found.
          </Typography>
          <Typography component="li">Check the documentation above for possible solution.</Typography>
        </Typography>
      </blockquote>
    </article>
  )
}

export {DocsActivityInfo}
