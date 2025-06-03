import {useParams} from 'react-router-dom'
import * as yup from 'yup'
import React, {ReactNode} from 'react'
import {Box, GlobalStyles, Icon, ThemeProvider} from '@mui/material'
import {Txt, TxtProps} from '@/shared/Txt'
import {useI18n} from '@/core/i18n'
import {muiTheme} from '@/core/theme'
import {DRCLogoLarge} from '@/shared/logo/logo'
import {capitalize, KoboSubmissionFlat, KoboIndex, Meal_visitMonitoring, KoboSchemaHelper} from 'infoportal-common'
import {useSession} from '@/core/Session/SessionContext'
import {DrawingCanvas} from '@/shared/DrawingCanvas'
import {mapFor, seq} from '@axanc/ts-utils'
import {getKoboAttachmentUrl} from '@/shared/TableMedia/KoboAttachedMedia'
import {CompressedImg} from '@/shared/CompressedImg'
import {useMealVisitContext} from '@/features/Meal/Visit/MealVisitContext'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'

const urlValidation = yup.object({
  id: yup.string().required(),
})

const Title = ({children, sx, ...props}: {children: ReactNode} & TxtProps) => {
  return (
    <Txt bold block sx={{...sx, mb: 0.5}} {...props}>
      {children}
    </Txt>
  )
}

const generalStyles = (
  <GlobalStyles
    styles={{
      body: {background: '#fff'},
      td: {padding: 0},
      '@media print': {
        main: {padding: '0 !important'},
        '#app-sidebar-id': {display: 'none'},
        '#app-header': {display: 'none'},
        '#meal-visit-details-content': {margin: 0, padding: 0},
      },
    }}
  />
)

const Row = ({label, children}: {label: ReactNode; children: ReactNode}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        pb: 1.25,
        mb: 0,
        '&:not(:last-child) .meal-pdf-row-content': {
          borderBottom: (t) => '1px solid ' + t.palette.divider,
        },
      }}
    >
      <Box sx={{width: 100}}>
        <Title>{label}</Title>
        {/*<Txt uppercase size="small" color="hint">{label}</Txt>*/}
      </Box>
      <Box className="meal-pdf-row-content" sx={{flex: 1, pb: 1.5}}>
        {children}
      </Box>
    </Box>
  )
}

const SectionWithParts = ({
  title,
  parts,
  entry,
  schema,
}: {
  title: string
  parts: {question: string; field: keyof Meal_visitMonitoring.T; ifNoExplain?: keyof Meal_visitMonitoring.T}[]
  entry: KoboSubmissionFlat<Meal_visitMonitoring.T>
  schema: KoboSchemaHelper.Bundle
}) => {
  const content = parts
    .map(({question, field, ifNoExplain}) => {
      const answer = entry[field]
      const explanation = ifNoExplain && entry[ifNoExplain]

      // Show only "no" answers with explanations
      if (answer !== 'no' || !explanation) return null

      return (
        <Box key={String(field)} sx={{mb: 1}}>
          <Txt bold>{question}</Txt>
          <Box sx={{mt: 0.5, ml: 2}}>
            <Txt italic color="hint">
              <b>No.</b> {String(explanation)}
            </Txt>
          </Box>
        </Box>
      )
    })
    .filter(Boolean)

  return content.length > 0 ? (
    <Box sx={{mt: 2}}>
      <Title size="big">{title}</Title>
      {content}
    </Box>
  ) : null
}

const SimpleFieldSection = ({
  title,
  field,
  entry,
}: {
  title: string
  field: keyof Meal_visitMonitoring.T
  entry: KoboSubmissionFlat<Meal_visitMonitoring.T>
}) => {
  const value = entry[field]
  return value ? (
    <Box sx={{mt: 2}}>
      <Title size="big">{title}</Title>
      <Box sx={{textAlign: 'justify', whiteSpace: 'pre-line'}}>
        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
      </Box>
    </Box>
  ) : null
}

export const MealVisitDetails = () => {
  return (
    <ThemeProvider
      theme={muiTheme({
        dark: false,
        fontSize: 14,
        mainColor: '#af161e',
        backgroundDefault: '#fff',
        backgroundPaper: '#fff',
        cardElevation: 1,
      })}
    >
      {generalStyles}
      <_DashboardMealVisitPdf />
    </ThemeProvider>
  )
}

export const _DashboardMealVisitPdf = () => {
  const ctx = useMealVisitContext()
  const schema = useKoboSchemaContext().byName.meal_visitMonitoring.get!
  const {session} = useSession()
  const {m, formatDate} = useI18n()
  const {id} = urlValidation.validateSync(useParams())
  const entry: KoboSubmissionFlat<Meal_visitMonitoring.T> | undefined = ctx.answersIndex?.[id]

  if (!entry) return 'Not found'
  return (
    <Box
      id="meal-visit-details-content"
      sx={{background: 'white', '@media screen': {margin: 'auto', my: 2, padding: '1cm', maxWidth: '21cm'}}}
    >
      <Box sx={{'@media print': {position: 'fixed', top: 0, right: 0, left: 0}}}>
        <Box sx={{display: 'flex', alignItems: 'flex-start', pb: 1, mb: 1}}>
          <Box sx={{flex: 1}}>
            <Box component="h1" sx={{m: 0}}>
              Field Visit Report, Ukraine
            </Box>
            <Txt color="hint" sx={{display: 'flex', alignItems: 'center'}}>
              <Txt block size="big">
                Programme Quality & Monitoring
              </Txt>
              <Icon fontSize="inherit" sx={{mx: 1}}>
                remove
              </Icon>
              <Txt block size="big">
                {formatDate(entry.submissionTime)}
              </Txt>
            </Txt>
          </Box>
          <DRCLogoLarge height={70} />
        </Box>
      </Box>

      <table>
        <thead>
          <tr>
            <td>
              <Box sx={{'@media print': {height: 90}}} />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Box>
                <Row label={m.project}>
                  {entry.mdd_001?.map((_) => schema.translate.choice('mdd_001', _)).join(', ')}
                </Row>
                <Row label={m.location}>
                  {schema.translate.choice('md_det_oblast', entry.md_det_oblast)} oblast,&nbsp;
                  {schema.translate.choice('md_det_raion', entry.md_det_raion)} raion,&nbsp;
                  {schema.translate.choice('md_det_hromada', entry.md_det_hromada)} hromada.
                  <br />
                  {entry.mds && (
                    <>
                      {capitalize(entry.mds ?? '')}
                      <br />
                    </>
                  )}
                  {schema.translate.choice('location_details', entry.location_details)}
                </Row>
                {entry.whom && (
                  <Row label="With whom">
                    {entry.mdt && 'Team ' + entry.mdt?.map((_) => schema.translate.choice('mdt', _)).join(', ')}
                    <br />
                    {entry.whom}
                  </Row>
                )}
              </Box>
              {[
                {title: 'General Observation:', field: 'main_objective'},
                {title: 'Target Groups:', field: 'target_groups'},
                {title: 'Activity Overview:', field: 'activity_overview'},
                {title: 'Satisfaction and Feedback:', field: 'satisfaction_level'},
                {title: 'Focus Group Discussions:', field: 'FGD_part'},
                {title: 'Feedback from Organizers:', field: 'feedback_org'},
                {title: 'Stakeholders Interviews:', field: 'stakeholder_interview'},
                {title: 'Overall Observations:', field: 'overall_observation'},
              ].map((props) => (
                <SimpleFieldSection
                  key={props.field}
                  {...props}
                  field={props.field as keyof Meal_visitMonitoring.T}
                  entry={entry}
                />
              ))}

              <SectionWithParts
                title="Safety and Security Issues"
                entry={entry}
                schema={schema}
                parts={[
                  {
                    question: 'Was there a shelter available for the team during this alarm?',
                    field: 'shelter_available',
                    ifNoExplain: 'shelter_no_reason',
                  },
                  {
                    question: 'Was the space suitable?',
                    field: 'space_suitable',
                    ifNoExplain: 'space_not_suitable_reason',
                  },
                  {
                    question: 'Was there wheelchair access?',
                    field: 'wheelchair_access',
                    ifNoExplain: 'no_access_reason',
                  },
                  {
                    question: 'Was the site weather-proof?',
                    field: 'weather_proof',
                    ifNoExplain: 'weather_not_proof_reason',
                  },
                ]}
              />

              <SectionWithParts
                title="Code of Conduct and Accountability"
                entry={entry}
                schema={schema}
                parts={[
                  {question: 'Was CFM explained?', field: 'ccm', ifNoExplain: 'ccn'},
                  {
                    question: 'Was staff behaviour aligned with the Code of Conduct?',
                    field: 'ccs',
                    ifNoExplain: 'ccsn',
                  },
                  {question: 'Did any beneficiaries feel unsafe around staff?', field: 'ccd', ifNoExplain: 'ccdn'},
                  {question: 'Were CFM flyers distributed?', field: 'ccc', ifNoExplain: 'cccn'},
                  {question: 'Were PSEA flyers distributed?', field: 'psea', ifNoExplain: 'psean'},
                ]}
              />

              <SectionWithParts
                title="Visibility"
                entry={entry}
                schema={schema}
                parts={[
                  {question: 'Were all DRC staff clearly visible and identified?', field: 'visb', ifNoExplain: 'visbn'},
                  {question: 'Was the donor logo visible?', field: 'vislogo', ifNoExplain: 'vislogon'},
                  {question: 'Any additional comments?', field: 'visf', ifNoExplain: 'vispo'},
                ]}
              />

              <Box sx={{display: 'grid', mt: 1, mx: -0.5, gridTemplateColumns: '1fr 1fr 1fr'}}>
                {seq([
                  ...mapFor(10, (i) => (entry as any)[`fcp${i + 1}`]),
                  ...mapFor(12, (i) => (entry as any)[`photo${i + 1}`]),
                ])
                  .map((fileName) =>
                    getKoboAttachmentUrl({
                      formId: KoboIndex.byName('meal_visitMonitoring').id,
                      answerId: entry.id,
                      attachments: entry.attachments,
                      fileName,
                    }),
                  )
                  .compact()
                  .map((url) => (
                    <CompressedImg key={url} url={url} height={600} />
                  ))}
              </Box>

              <Box sx={{breakInside: 'avoid', display: 'flex', justifyContent: 'space-between', mt: 1}}>
                {[
                  {label: 'Prepared by:', content: session.name, hint: `${session.drcOffice} ${session.drcJob}`},
                  {
                    label: 'Acknowledged by:',
                    content: '\u00a0',
                    hint: 'Relevant Programme or HoO',
                  },
                ].map(({label, content, hint}) => (
                  <Box key={label}>
                    <Title>{label}</Title>
                    <Box>{content}</Box>
                    <Txt size="small" color="hint">
                      {hint}
                    </Txt>
                    <Box sx={{position: 'relative', mt: 2}}>
                      <DrawingCanvas height={110} width={160} sx={{mt: 1}} />
                      <Txt
                        size="small"
                        color="hint"
                        block
                        sx={{position: 'absolute', p: 0.5, left: 12, top: -14, background: 'white'}}
                      >
                        Signature
                      </Txt>
                    </Box>
                  </Box>
                ))}
              </Box>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  )
}
