import React, {useEffect, useState} from 'react'
import {Page} from '@/shared/Page'
import {Sheet} from '@/shared/Sheet/Sheet'
import {useMpcaContext} from '../MpcaContext'
import {useI18n} from '@/core/i18n'
import {Panel} from '@/shared/Panel'
import {map} from '@alexandreannic/ts-utils'
import {useAppSettings} from '@/core/context/ConfigContext'
import {appConfig} from '@/conf/AppConfig'
import {koboIndex, KoboIndex} from '@infoportal-common'
import {IpBtn} from '@/shared/Btn'
import {TableImg} from '@/shared/TableImg/TableImg'
import {DeduplicationStatusIcon} from '@/features/WfpDeduplication/WfpDeduplicationData'
import {formatLargeNumber} from '@/core/i18n/localization/en'
import {MpcaEntity, MpcaHelper} from '@/core/sdk/server/mpca/MpcaEntity'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {SelectDrcProject} from '@/shared/customInput/SelectDrcProject'
import {Box, FormControlLabel, Switch} from '@mui/material'
import {useAsync} from '@/shared/hook/useAsync'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'

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
        <Sheet<MpcaEntity>
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
              id: 'id',
              head: m.koboId,
              type: 'string',
              render: _ => _.id,
            },
            {
              id: 'source',
              head: m.form,
              type: 'select_one',
              // options: () => SheetUtils.buildOptions(Enum.keys(MpcaRowSource)),
              render: _ => KoboIndex.byName(_.source).parsed.name,
            },
            {
              id: 'date',
              head: m.date,
              type: 'date',
              renderValue: _ => _.date,
              render: _ => formatDate(_.date),
            },
            {
              id: 'donor',
              head: m.donor,
              type: 'select_one',
              // options: () => SheetUtils.buildOptions(Enum.keys(DrcDonor), true),
              render: _ => _.finalDonor ?? '',
            },
            {
              id: 'project',
              head: m.project,
              type: 'select_one',
              width: 160,
              // options: () => SheetUtils.buildOptions(Enum.keys(DrcProject), true),
              render: _ => _.project ?? SheetUtils.blank,
            },
            {
              id: 'project_overridden',
              head: m.mpca.projectOverride,
              width: 180,
              type: 'select_one',
              renderValue: row => row.tags?.projects?.[0] ?? SheetUtils.blank,
              renderOption: row => row.tags?.projects?.[0] ?? SheetUtils.blank,
              render: _ => (
                <SelectDrcProject label={null} options={MpcaHelper.projects} value={_.tags?.projects?.[0]} onChange={p => {
                  ctx.asyncUpdates.call({
                    formId: KoboIndex.byName(_.source).id,
                    answerIds: [_.id],
                    key: 'projects',
                    value: p ? [p] : null,
                  })
                }}/>
              )
            },
            {
              id: 'project_final',
              width: 160,
              head: m.mpca.projectFinal,
              type: 'select_one',
              render: _ => _.finalProject ?? SheetUtils.blank,
            },
            {
              id: 'prog',
              head: m.program,
              type: 'select_multiple',
              // options: () => SheetUtils.buildOptions(Enum.keys(MpcaProgram), true),
              renderValue: _ => _.prog,
              render: _ => _.prog?.join(' | '),
              renderExport: _ => _.prog?.join(' | '),
            },
            {
              id: 'oblast',
              head: m.oblast,
              type: 'select_one',
              // options: () => SheetUtils.buildOptions(Enum.values(OblastIndex.oblastByISO), true),
              render: _ => _.oblast ?? SheetUtils.blank,
            },
            {
              id: 'office',
              head: m.office,
              type: 'select_one',
              // options: () => SheetUtils.buildOptions(Enum.values(DrcOffice), true),
              render: _ => _.office ?? SheetUtils.blank,
            },
            {
              id: 'enumerator',
              head: m.enumerator,
              type: 'string',
              // options: () => SheetUtils.buildOptions(Enum.values(DrcOffice), true),
              render: _ => _.enumerator ?? SheetUtils.blank,
            },
            {
              id: 'hhSize',
              head: m.hhSize,
              type: 'number',
              render: _ => _.hhSize,
            },
            {
              id: 'amountUahSupposed',
              align: 'right',
              head: m.amountUAH,
              type: 'number',
              renderValue: _ => _.amountUahSupposed,
              render: _ => _.amountUahSupposed ? formatLargeNumber(_.amountUahSupposed) : undefined,
            },
            {
              id: 'amountUahDedup',
              align: 'right',
              head: 'Amount dedup',
              type: 'number',
              renderValue: _ => _.amountUahDedup,
              render: _ => _.amountUahDedup ? formatLargeNumber(_.amountUahDedup) : undefined,
            },
            {
              id: 'amountUahFinal',
              align: 'right',
              head: 'Amount final',
              type: 'number',
              renderValue: _ => _.amountUahFinal,
              render: _ => _.amountUahFinal ? formatLargeNumber(_.amountUahFinal) : undefined,
            },
            {
              id: 'deduplication',
              align: 'center',
              width: 0,
              head: m.deduplication,
              type: 'select_one',
              // options: () => SheetUtils.buildOptions(Enum.keys(WfpDeduplicationStatus), true),
              tooltip: _ => _.deduplication && m.mpca.status[_.deduplication.status],
              renderValue: _ => _.deduplication?.status ?? SheetUtils.blank,
              render: _ => _.deduplication && <DeduplicationStatusIcon status={_.deduplication.status}/>,
            },
            {
              id: 'suggestion',
              head: m.suggestion,
              type: 'select_one',
              // options: () => SheetUtils.buildOptions(Enum.keys(DrcSupportSuggestion), true),
              render: _ => _.deduplication?.suggestion ?? SheetUtils.blank,
            },            // {
            //   id: 'deduplicationFile',
            //   head: 'deduplicationFile',
            //   type: 'select_one',
            //   options: () => getAllPossibleValues('deduplicationFile').map(_ => ({value: _, label: _})),
            //   render: _ => <Txt skeleton={50}/>
            // },
            // {
            //   id: 'duplication',
            //   type: 'select_one',
            //   head: m.status,
            //   options: () => Enum.keys(DeduplicationStatus).map(_ => ({value: _, label: _})),
            //   align: 'center',
            //   render: _ => fnSwitch(_.duplication!, {
            //     duplicate: <TableIcon color="warning" children="content_copy"/>,
            //     no_duplicate: <TableIcon color="success" children="check_circle"/>,
            //     pending: <TableIcon color="disabled" children="schedule"/>,
            //   }, () => <Txt skeleton={30}/>)
            // },
            {
              type: 'string',
              id: 'taxId',
              head: m.taxID,
              render: _ => _.taxId,
            },
            {
              id: 'taxIdImg',
              align: 'center',
              head: m.taxID,
              renderExport: false,
              render: _ => map(_.taxIdFileURL, url =>
                <TableImg tooltipSize={650} url={getKoboImagePath(url.download_small_url)}/>
              )
            },
            {
              type: 'string',
              id: 'passportSerie',
              head: m.passportSerie,
              render: _ => _.passportSerie
            },
            {
              type: 'string',
              id: 'passportNum',
              head: m.passportNumber,
              render: _ => _.passportNum
            },
            {
              id: 'idFileImg', head: m.id, align: 'center', render: _ => map(_.idFileURL, url =>
                <TableImg tooltipSize={650} url={getKoboImagePath(url.download_small_url)}/>
              )
            },
            {type: 'string', id: 'lastName', head: m.lastName, render: _ => _.lastName},
            {type: 'string', id: 'firstName', head: m.firstName, render: _ => _.firstName},
            {type: 'string', id: 'patronyme', head: m.patronyme, render: _ => _.patronyme},
            {
              id: 'displacement',
              head: m.displacementStatus,
              render: _ => _.benefStatus,
              type: 'select_one',
              // options: () => SheetUtils.buildOptions(Enum.keys(bn_ReOptions.ben_det_res_stat)),
            },
            {id: 'phone', type: 'string', head: m.phone, render: _ => _.phone},
            {
              id: 'status',
              type: 'select_one',
              head: m.status,
              render: _ => _.tags?.status ?? DatatableUtils.blank,
            }
            // {
            //   id: 'committed',
            //   type: 'select_one',
            //   head: m.mpca.committed,
            //   tooltip: null,
            //   renderValue: row => row.tags?.committed ? 'true' : 'false',
            //   renderOption: row => row.tags?.committed ? m.mpca.committed : SheetUtils.blankLabel,
            //   render: row => (
            //     <>
            //       <Switch size="small" checked={!!row.tags?.committed} onChange={(e, checked) => ctx.asyncUpdates.call({
            //         formId: KoboIndex.byName(row.source).id,
            //         answerIds: [row.id],
            //         key: 'committed',
            //         value: checked ? new Date() : null,
            //       })}/>
            //     </>
            //   )
            // }
          ]}
        />
      </Panel>
    </Page>
  )
}
