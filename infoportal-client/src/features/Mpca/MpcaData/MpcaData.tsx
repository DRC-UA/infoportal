import React, {useEffect, useState} from 'react'
import {Page} from '@/shared/Page'
import {useMpcaContext} from '../MpcaContext'
import {useI18n} from '@/core/i18n'
import {Panel} from '@/shared/Panel'
import {useAppSettings} from '@/core/context/ConfigContext'
import {appConfig} from '@/conf/AppConfig'
import {koboIndex, KoboIndex, koboMetaStatusLabel, MpcaEntity} from '@infoportal-common'
import {IpBtn} from '@/shared/Btn'
import {formatLargeNumber} from '@/core/i18n/localization/en'
import {MpcaHelper} from '@/core/sdk/server/mpca/MpcaEntity'
import {SelectDrcProject} from '@/shared/customInput/SelectDrcProject'
import {Box} from '@mui/material'
import {useAsync} from '@/shared/hook/useAsync'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {Datatable} from '@/shared/Datatable/Datatable'
import {DeduplicationStatusIcon} from '@/features/WfpDeduplication/WfpDeduplicationData'
import {TableImg} from '@/shared/TableImg/TableImg'
import {OptionLabelTypeCompact} from '@/shared/customInput/SelectStatus'

export const getKoboImagePath = (url: string): string => {
  return appConfig.apiURL + `/kobo-api/${koboIndex.drcUa.server.prod}/attachment?path=${url.split('api')[1]}`
}

export const MpcaData = () => {
  const {m, formatDate} = useI18n()
  const {api} = useAppSettings()
  const ctx = useMpcaContext()
  const [selected, setSelected] = useState<string[]>([])
  const _payment = useAsync(api.mpcaPayment.create)

  useEffect(() => {
    ctx.fetcherData.fetch({force: false})
  }, [])

  // const getAllPossibleValues = (key: keyof NonNullable<typeof enhancedData>[0]) => Array.from(new Set(enhancedData?.map(_ => _[key]))) as string[]

  return (
    <Page width="full">
      <Panel sx={{overflow: 'visible'}}>
        <Datatable<MpcaEntity>
          id="mpca"
          title={m.data}
          showExportBtn
          // header={<PanelTitle>{m.data}</PanelTitle>}
          loading={ctx.fetcherData.loading}
          getRenderRowKey={_ => '' + _.id}
          data={ctx.data}
          select={{
            getId: _ => _.id,
            onSelect: _ => setSelected(_),
            selectActions: (
              <>
                <SelectDrcProject sx={{width: 140, mr: 1}} options={MpcaHelper.projects} onChange={p => {
                  ctx.asyncUpdates.call({
                    answerIds: selected,
                    key: 'projects',
                    value: p ? [p] : null,
                  })
                }}/>
                {/*<FormControlLabel*/}
                {/*  sx={{pl: .5, pr: 1.5, py: .5, ml: 0, mr: 1, border: t => '1px solid ' + t.palette.divider, borderRadius: 100}}*/}
                {/*  label={m.mpca.commit}*/}
                {/*  control={*/}
                {/*    <Switch size="small" onChange={(p, checked) => {*/}
                {/*      ctx.asyncUpdates.call({*/}
                {/*        answerIds: selected,*/}
                {/*        key: 'committed',*/}
                {/*        value: checked ? new Date() : undefined,*/}
                {/*      })*/}
                {/*    }}/>*/}

                {/*  }*/}
                {/*/>*/}
                {/*<AaSelectSingle*/}
                {/*  label={m.mpca.committed}*/}
                {/*  sx={{width: 140, mr: 1}}*/}
                {/*  options={[*/}
                {/*    {value: new Date() as any, children: 'Committed'},*/}
                {/*  ]}*/}
                {/*  onChange={p => {*/}
                {/*    ctx.asyncUpdates.call({*/}
                {/*      answerIds: selected,*/}
                {/*      key: 'committed',*/}
                {/*      value: p,*/}
                {/*    })*/}
                {/*  }}*/}
                {/*/>*/}
                <Box sx={{borderLeft: t => '1px solid ' + t.palette.divider, height: 30, ml: 1, mr: 2}}/>
                <IpBtn
                  disabled
                  sx={{mr: 1}}
                  color="primary"
                  icon="content_paste_search"
                  variant="outlined"
                >
                  {m.mpca.generateDeduplicationFile}
                </IpBtn>
                <IpBtn
                  disabled
                  color="primary"
                  icon="create_new_folder"
                  variant="outlined"
                  loading={_payment.loading}
                  onClick={() => {
                    _payment.call(selected)
                  }}
                >
                  {m.mpca.makePaymentTool}
                </IpBtn>
              </>
            )
          }}
          columns={[
            {
              type: 'select_one',
              id: 'status',
              head: m.status,
              width: 0,
              align: 'center',
              render: _ => {
                return {
                  label: <OptionLabelTypeCompact type={koboMetaStatusLabel[_.status!]}/>,
                  value: _.status,
                  option: _.status,
                }
              },
            },
            {
              id: 'id',
              head: m.koboId,
              type: 'string',
              renderQuick: _ => _.koboId,
            },
            {
              id: 'source',
              head: m.form,
              type: 'select_one',
              renderQuick: _ => KoboIndex.searchById(_.formId)?.translation,
            },
            {
              id: 'date',
              head: m.date,
              type: 'date',
              render: _ => {
                return {
                  label: formatDate(_.date),
                  value: _.date,
                }
              }
            },
            {
              id: 'donor',
              head: m.donor,
              type: 'select_multiple',
              options: () => DatatableUtils.buildOptions(ctx.data?.flatMap(_ => _.donor!).distinct(_ => _) ?? [], true),
              renderQuick: _ => _.donor,
            },
            {
              id: 'project',
              head: m.project,
              type: 'select_multiple',
              width: 160,
              options: () => DatatableUtils.buildOptions(ctx.data?.flatMap(_ => _.project!).distinct(_ => _) ?? [], true),
              renderQuick: _ => _.project,
            },
            {
              id: 'prog',
              head: m.program,
              type: 'select_one',
              renderQuick: _ => _.activity,
            },
            {
              id: 'oblast',
              head: m.oblast,
              type: 'select_one',
              renderQuick: _ => _.oblast,
            },
            {
              id: 'hromada',
              head: m.hromada,
              type: 'select_one',
              renderQuick: _ => _.hromada,
            },
            {
              id: 'raion',
              head: m.raion,
              type: 'select_one',
              renderQuick: _ => _.raion,
            },
            {
              id: 'office',
              head: m.office,
              type: 'select_one',
              renderQuick: _ => _.office,
            },
            {
              id: 'enumerator',
              head: m.enumerator,
              type: 'string',
              // options: () => SheetUtils.buildOptions(Enum.values(DrcOffice), true),
              renderQuick: _ => _.enumerator,
            },
            {
              id: 'hhSize',
              head: m.hhSize,
              type: 'number',
              renderQuick: _ => _.personsCount,
            },
            {
              id: 'amountUahSupposed',
              align: 'right',
              head: m.amountUAH,
              type: 'number',
              render: _ => {
                return {
                  value: _.amountUahSupposed,
                  label: _.amountUahSupposed ? formatLargeNumber(_.amountUahSupposed) : undefined
                }
              },
            },
            {
              id: 'amountUahDedup',
              align: 'right',
              head: 'Amount dedup',
              type: 'number',
              render: _ => {
                return {
                  value: _.amountUahDedup,
                  label: _.amountUahDedup ? formatLargeNumber(_.amountUahDedup) : undefined
                }
              },
            },
            {
              id: 'amountUahFinal',
              align: 'right',
              head: 'Amount final',
              type: 'number',
              render: _ => {
                return {
                  value: _.amountUahFinal,
                  label: _.amountUahFinal ? formatLargeNumber(_.amountUahFinal) : undefined,
                }
              }
            },
            {
              id: 'deduplication',
              align: 'center',
              width: 0,
              head: m.deduplication,
              type: 'select_one',
              // options: () => SheetUtils.buildOptions(Enum.keys(WfpDeduplicationStatus), true),
              render: _ => {
                return {
                  tooltip: _.deduplication && m.mpca.status[_.deduplication.status],
                  value: _.deduplication?.status,
                  option: _.deduplication?.status,
                  label: _.deduplication && <DeduplicationStatusIcon status={_.deduplication.status}/>
                }
              },
            },
            // {
            //   id: 'suggestion',
            //   head: m.suggestion,
            //   type: 'select_one',
            //   // options: () => SheetUtils.buildOptions(Enum.keys(DrcSupportSuggestion), true),
            //   renderQuick: _ => _.deduplication?.suggestion,
            // },            // {
            // //   id: 'deduplicationFile',
            // //   head: 'deduplicationFile',
            // //   type: 'select_one',
            // //   options: () => getAllPossibleValues('deduplicationFile').map(_ => ({value: _, label: _})),
            // //   render: _ => <Txt skeleton={50}/>
            // // },
            // // {
            // //   id: 'duplication',
            // //   type: 'select_one',
            // //   head: m.status,
            // //   options: () => Enum.keys(DeduplicationStatus).map(_ => ({value: _, label: _})),
            // //   align: 'center',
            // //   render: _ => fnSwitch(_.duplication!, {
            // //     duplicate: <TableIcon color="warning" children="content_copy"/>,
            // //     no_duplicate: <TableIcon color="success" children="check_circle"/>,
            // //     pending: <TableIcon color="disabled" children="schedule"/>,
            // //   }, () => <Txt skeleton={30}/>)
            // // },
            {
              type: 'string',
              id: 'taxId',
              head: m.taxID,
              renderQuick: _ => _.taxId,
            },
            {
              id: 'taxIdImg',
              align: 'center',
              head: m.taxID,
              type: 'string',
              render: _ => {
                return {
                  export: _.taxIdFileUrl,
                  value: _.taxIdFileName,
                  label: _.taxIdFileUrl && <TableImg tooltipSize={650} url={getKoboImagePath(_.taxIdFileUrl)}/>
                }
              }
            },
            {
              type: 'string',
              id: 'passportNum',
              head: m.passportNumber,
              renderQuick: _ => _.passportNum
            },
            {
              id: 'idFileImg',
              align: 'center',
              head: m.taxID,
              type: 'string',
              render: _ => {
                return {
                  export: _.idFileUrl,
                  value: _.idFileName,
                  label: _.idFileUrl && <TableImg tooltipSize={650} url={getKoboImagePath(_.idFileUrl)}/>
                }
              }
            },
            {type: 'string', id: 'lastName', head: m.lastName, renderQuick: _ => _.lastName},
            {type: 'string', id: 'firstName', head: m.firstName, renderQuick: _ => _.firstName},
            {type: 'string', id: 'patronyme', head: m.patronyme, renderQuick: _ => _.patronymicName},
            {id: 'phone', type: 'string', head: m.phone, renderQuick: _ => _.phone},
          ]}
        />
      </Panel>
    </Page>
  )
}
