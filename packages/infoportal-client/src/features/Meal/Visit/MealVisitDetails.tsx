import {useParams} from 'react-router'
import * as yup from 'yup'
import React, {ReactNode} from 'react'
import {Box, Checkbox, GlobalStyles, Icon, ThemeProvider} from '@mui/material'
import {Txt, TxtProps} from '@/shared/Txt'
import {useI18n} from '@/core/i18n'
import {muiTheme} from '@/core/theme'
import {DRCLogoLarge} from '@/shared/logo/logo'
import {capitalize, KoboSubmissionFlat, KoboIndex, Meal_visitMonitoring} from 'infoportal-common'
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
    styles={(t) => ({
      body: {
        background: '#fff',
      },
      td: {
        padding: 0,
      },
      '@media print': {
        main: {
          padding: '0 !important',
        },
        '#app-sidebar-id': {
          display: 'none',
        },
        '#app-header': {
          display: 'none',
        },

        '#meal-visit-details-content': {
          margin: 0,
          padding: 0,
        },
      },
    })}
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
      sx={{
        background: 'white',
        '@media screen': {
          margin: 'auto',
          my: 2,
          padding: '1cm',
          maxWidth: '21cm',
        },
      }}
    >
      <Box
        sx={{
          '@media print': {
            position: 'fixed',
            top: '0px',
            right: 0,
            left: 0,
          },
        }}
      >
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
        {/*<Divider className="divider" sx={{mb: 2}}/>*/}
      </Box>

      <table>
        <thead>
          <tr>
            <td>
              <Box
                sx={{
                  '@media print': {
                    height: 90,
                  },
                }}
              ></Box>
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
                    {entry.mdt && 'Team'} {entry.mdt?.map((_) => schema.translate.choice('mdt', _))}
                    <br />
                    {entry.whom}
                  </Row>
                )}
                {entry.visit_type && (
                  <Row label="Visit type">
                    {schema.helper.choicesIndex['visit_type']?.map((_) => (
                      <Box key={_.$kuid} sx={{display: 'flex', alignItems: 'center', mb: 0.5}}>
                        <Checkbox disabled size="small" sx={{p: 0, pr: 1}} checked={_.name === entry.visit_type} />
                        {schema.translate.choice('visit_type', _.name)}
                      </Box>
                    ))}
                    {entry.visit_type_specify}
                  </Row>
                )}
                <Row label="Concerns">
                  {entry.sei ? (
                    <>
                      {schema.helper.choicesIndex['details']?.map((_) => (
                        <Box key={_.$kuid} sx={{display: 'flex', alignItems: 'center', mb: 0.5}}>
                          <Checkbox
                            disabled
                            size="small"
                            sx={{p: 0, pr: 1}}
                            checked={entry.sei?.includes(_.name as any)}
                          />
                          {schema.translate.choice('sei', _.name)}
                        </Box>
                      ))}
                      {entry.visit_type_specify}
                    </>
                  ) : (
                    'None'
                  )}
                </Row>
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
                {
                  title: 'Safety and Security Issues:',
                  fields: [
                    'shelter_available',
                    'space_not_suitable_reason',
                    'no_access_reason',
                    'weather_not_proof_reason',
                  ],
                },
                {
                  title: 'Code of Conduct and Accountability:',
                  fields: ['ccn', 'ccsn', 'ccdn', 'cccn', 'psean'],
                },
                {
                  title: 'Visibility:',
                  fields: ['visbn', 'vislogon', 'vispo'],
                },
              ]
                .filter(({field, fields}) => {
                  const value = field
                    ? entry[field as keyof typeof entry]
                    : fields
                        ?.map((f) => entry[f as keyof typeof entry])
                        .filter(Boolean)
                        .join(', ')

                  return entry.has_comments !== 'no' || !!value
                })
                .map(({title, field, fields}) => {
                  const raw = field
                    ? entry[field as keyof typeof entry]
                    : fields
                        ?.map((f) => entry[f as keyof typeof entry])
                        .filter(Boolean)
                        .join(', ')

                  const value =
                    entry.has_comments === 'no'
                      ? typeof raw === 'object' && raw !== null
                        ? Array.isArray(raw)
                          ? raw.join(', ')
                          : JSON.stringify(raw)
                        : String(raw ?? '')
                      : entry.fcpc

                  return (
                    <React.Fragment key={title}>
                      <Box sx={{mt: 2}}>
                        <Title sx={{mb: 0.5}} size="big">
                          {title}
                        </Title>
                        <Box sx={{textAlign: 'justify', whiteSpace: 'pre-line'}}>{value}</Box>
                      </Box>
                    </React.Fragment>
                  )
                })}

              {/*<Box sx={{display: 'grid', mt: 1, mx: -.5, gridTemplateColumns: '1fr 1fr 1fr'}}>*/}
              {/*  {seq(mapFor(10, i => (entry as any)['fcp' + (i + 1)]))*/}
              {/*    .map(fileName => koboImgHelper({attachments: entry.attachments, fileName}).fullUrl)*/}
              {/*    .compact()*/}
              {/*    .map(url =>*/}
              {/*      <Box key={url} sx={{*/}
              {/*        m: .5,*/}
              {/*        borderRadius: t => t.shape.borderRadius + 'px',*/}
              {/*        backgroundImage: `url(${url})`,*/}
              {/*        backgroundColor: t => t.palette.divider,*/}
              {/*        backgroundSize: 'cover',*/}
              {/*        backgroundPosition: 'center',*/}
              {/*        height: 'auto',*/}
              {/*        '&:before': {*/}
              {/*          paddingTop: '100%',*/}
              {/*          content: '" "',*/}
              {/*          display: 'block',*/}
              {/*        }*/}
              {/*      }}>*/}
              {/*      </Box>*/}
              {/*    )}*/}
              {/*</Box>*/}
              <Box sx={{display: 'grid', mt: 1, mx: -0.5, gridTemplateColumns: '1fr 1fr 1fr'}}>
                {seq([
                  ...mapFor(10, (i) => (entry as any)['fcp' + (i + 1)]),
                  ...mapFor(12, (i) => (entry as any)['photo' + (i + 1)]),
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
                  .map((x) => (
                    <CompressedImg key={x} url={x!} height={600} />
                  ))}
              </Box>
              <Box sx={{breakInside: 'avoid', display: 'flex', justifyContent: 'space-between', mt: 1}}>
                <Box>
                  <Title>Prepared by:</Title>
                  <Box>{session.name}</Box>
                  <Txt size="small" color="hint">
                    {session.drcOffice} {session.drcJob}
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
                <Box>
                  <Title>Acknowledged by:</Title>
                  <Box>&nbsp;</Box>
                  <Txt size="small" color="hint">
                    Relevant Programme or HoO
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
              </Box>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  )
}
