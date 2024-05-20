import React, {useMemo, useState} from 'react'
import {Page} from '@/shared/Page'
import {fnSwitch, map, Obj, seq} from '@alexandreannic/ts-utils'
import {useI18n} from '@/core/i18n'
import {Panel} from '@/shared/Panel'
import {Box, useTheme} from '@mui/material'
import {TableIcon, TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {KoboAttachedImg} from '@/shared/TableImg/KoboAttachedImg'
import {
  add,
  DrcProject,
  KoboIndex,
  KoboShelterTa,
  KoboValidation,
  safeArray,
  safeNumber,
  Shelter_NTA,
  shelterDrcProject,
  ShelterProgress,
  ShelterTaPriceLevel,
} from '@infoportal-common'
import {Txt} from 'mui-extension'
import {useShelterContext} from '@/features/Shelter/ShelterContext'
import {IpInput} from '@/shared/Input/Input'
import {DebouncedInput} from '@/shared/DebouncedInput'
import {ShelterSelectContractor, ShelterSelectStatus} from '@/features/Shelter/Data/ShelterTableInputs'
import {SheetUtils} from '@/shared/Sheet/util/sheetUtils'
import {SelectDrcProjects} from '@/shared/customInput/SelectDrcProject'
import {ShelterEntity} from '@/core/sdk/server/shelter/ShelterEntity'
import {IpDatepicker} from '@/shared/Datepicker/IpDatepicker'
import {IpSelectSingle} from '@/shared/Select/SelectSingle'
import {TableInput} from '@/shared/TableInput'
import {DatabaseKoboSyncBtn} from '@/features/Database/KoboTable/DatabaseKoboSyncBtn'
import {OptionLabelTypeCompact, SelectStatusBy, SelectStatusConfig} from '@/shared/customInput/SelectStatus'
import {DatatableUtils} from '@/shared/Datatable/util/datatableUtils'
import {Datatable} from '@/shared/Datatable/Datatable'
import {keyTypeIcon} from '@/features/Database/KoboTable/getColumnBySchema'
import {useKoboEditAnswerContext} from '@/core/context/KoboEditAnswersContext'
import {TableEditCellBtn} from '@/shared/TableEditCellBtn'
import {KoboEditAnswer} from '@/shared/koboEdit/KoboEditAnswer'
import {useKoboEditTagContext} from '@/core/context/KoboEditTagsContext'
import {ShelterContractor} from '@infoportal-common'
import {useKoboAnswersContext} from '@/core/context/KoboAnswers'

export const ShelterTable = () => {
  const theme = useTheme()
  const ctx = useShelterContext()
  const ctxAnswers = useKoboAnswersContext()
  const ctxEditAnswers = useKoboEditAnswerContext()
  const ctxEditTag = useKoboEditTagContext()
  const {m, formatDate, formatLargeNumber} = useI18n()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const {selectedNta, selectedTa} = useMemo(() => {
    const selected = selectedIds.map(_ => ctx.data.mappedData[ctx.data.index![_]])
    return {
      selectedNta: seq(selected).map(_ => _.nta?.id).compact(),
      selectedTa: seq(selected).map(_ => _.ta?.id).compact(),
    }
  }, [ctx.data.index, selectedIds])

  const columns = useMemo(() => {
    return DatatableUtils.buildColumns<ShelterEntity>([
      {
        type: 'select_one',
        head: m._shelter.ntaForm,
        id: 'ntaForm',
        options: () => [{value: 'exist', label: m._shelter.taRefOk}, {value: 'notexist', label: m._shelter.taRefNok}],
        render: _ => {
          return {
            tooltip: null,
            value: _.nta ? 'exist' : 'notexist',
            label: (
              <>
                {map(_.nta, answer =>
                  <>
                    <TableIconBtn tooltip={m.view} children="visibility" onClick={() => ctxAnswers.openAnswerModal({answer, formId: KoboIndex.byName('shelter_nta').id})}/>
                    <TableIconBtn tooltip={m.edit} href={ctx.asyncEdit(KoboIndex.byName('shelter_nta').id, answer.id)} target="_blank" children="edit"/>
                  </>
                ) ?? (
                  <>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <TableIcon color="error" sx={{mr: .5}}>error</TableIcon>
                      <Box>
                        <Txt block size="small" sx={{marginBottom: '-5px'}}>TA ID: <Txt bold>{_.ta?.id}</Txt></Txt>
                        <Txt block size="small" sx={{marginBottom: '-2px'}}>NTA Ref: <Txt bold>{_.ta?.nta_id}</Txt></Txt>
                      </Box>
                    </Box>
                  </>
                )}
              </>
            )
          }
        }
      },
      {
        id: 'Id',
        head: 'ID',
        typeIcon: keyTypeIcon,
        className: 'td-id',
        type: 'string',
        renderQuick: _ => _.nta?.id,
      },
      {
        type: 'date',
        id: 'ntaSubmissionTime',
        head: m.submissionTime,
        render: _ => {
          return {
            value: _.nta?.submissionTime,
            label: formatDate(_.nta?.submissionTime),
          }
        }
      },
      {
        id: 'office',
        type: 'select_one',
        head: m.office,
        render: _ => {
          return {
            value: _.nta?.back_office,
            label: ctx.nta.schema.translate.choice('back_office', _.nta?.back_office)
          }
        },
      },
      {
        id: 'oblast',
        type: 'select_one',
        options: () => Obj.entries(Shelter_NTA.options.ben_det_oblast).map(([value, label]) => ({value, label})),
        head: m.oblast,
        render: _ => {
          return {
            value: _.nta?.ben_det_oblast,
            label: ctx.nta.schema.translate.choice('ben_det_oblast', _.nta?.ben_det_oblast)
          }
        },
      },
      {
        id: 'raion',
        type: 'string',
        // options: () => Obj.entries(Shelter_NTA.options.ben_det_raion).map(([value, label]) => ({value, label})),
        head: m.raion,
        render: _ => {
          return {
            label: ctx.nta.schema.translate.choice('ben_det_raion', _.nta?.ben_det_raion),
            value: _.nta?.ben_det_raion,
          }
        },
      },
      {
        id: 'hromada',
        type: 'string',
        // options: () => Obj.entries(Shelter_NTA.options.ben_det_raion).map(([value, label]) => ({value, label})),
        head: m.raion,
        render: _ => {
          return {
            label: ctx.nta.schema.translate.choice('ben_det_hromada', _.nta?.ben_det_hromada),
            value: _.nta?.ben_det_hromada,
          }
        },
      },
      {
        id: 'settelment',
        type: 'string',
        // options: () => Obj.entries(Shelter_NTA.options.ben_det_raion).map(([value, label]) => ({value, label})),
        head: m._shelter.settlement,
        renderQuick: _ => _.nta?.settlement,
      },
      {
        id: 'street',
        type: 'string',
        // options: () => Obj.entries(Shelter_NTA.options.ben_det_raion).map(([value, label]) => ({value, label})),
        head: m._shelter.street,
        renderQuick: _ => _.nta?.street,
      },
      {
        id: 'modality',
        type: 'select_one',
        head: m.modality,
        subHeader: selectedIds.length > 0
          ? <TableEditCellBtn onClick={() => ctxEditAnswers.open({
            formId: KoboIndex.byName('shelter_nta').id,
            answerIds: selectedIds,
            question: 'modality',
          })}/>
          : undefined,
        render: _ => {
          return {
            option: ctx.nta.schema.translate.choice('modality', _.nta?.modality),
            label: _.nta
              ? <KoboEditAnswer
                value={_.nta.modality}
                columnName="modality"
                formId={KoboIndex.byName('shelter_nta').id}
                answerId={_.nta.id}
              />
              : <></>,
            value: _.nta?.modality,
          }
        },
      },
      {
        type: 'string',
        id: 'name',
        width: 160,
        head: m.name,
        render: (row: ShelterEntity) => map(row.nta, nta => ({
          value: nta.tags?.interviewee_name ?? nta.interviewee_name,
          label: <TableInput
            originalValue={nta.interviewee_name}
            value={nta.tags?.interviewee_name ?? nta.interviewee_name}
            onChange={_ => ctxEditAnswers.asyncUpdateByName.call({
              formName: 'shelter_nta',
              answerIds: [nta.id],
              question: 'interviewee_name',
              answer: _
            })}
          />
        })) ?? {value: DatatableUtils.blank, label: ''}
      },
      {
        type: 'select_one',
        id: 'taxId',
        width: 160,
        head: m.taxID,
        render: (row: ShelterEntity) => map(row.nta, nta => {
          return {
            option: nta.tags?.pay_det_tax_id_num ?? nta.pay_det_tax_id_num,
            value: nta.tags?.pay_det_tax_id_num ?? nta.pay_det_tax_id_num,
            label: <TableInput
              type="number"
              originalValue={nta.pay_det_tax_id_num}
              value={nta.tags?.pay_det_tax_id_num ?? nta.pay_det_tax_id_num}
              onChange={_ => ctxEditAnswers.asyncUpdateByName.call({
                formName: 'shelter_nta',
                answerIds: [nta.id],
                question: 'pay_det_tax_id_num',
                answer: _
              })}
            />
          }
        }) ?? {value: DatatableUtils.blank, label: '', option: DatatableUtils.blank}
      },
      {
        type: 'string',
        id: 'taxId_org',
        head: m.taxID,
        renderQuick: (row: ShelterEntity) => row.nta?.pay_det_tax_id_num,
      },
      {
        type: 'select_one',
        id: 'displacement',
        head: m.displacement,
        render: _ => {
          return {
            option: _.nta?.ben_det_res_stat ?? DatatableUtils.blank,
            value: _.nta?.ben_det_res_stat,
            label: ctx.nta.schema.translate.choice('ben_det_res_stat', _.nta?.ben_det_res_stat)
          }
        },
      },
      {
        id: 'owner_tenant_type',
        type: 'select_one',
        head: m._shelter.owner,
        options: () => Obj.entries(Shelter_NTA.options.owner_tenant_type).map(([value, label]) => ({value, label})),
        render: _ => {
          return {
            value: _.nta?.owner_tenant_type,
            label: ctx.nta.schema.translate.choice('owner_tenant_type', _.nta?.owner_tenant_type)
          }
        },
      },
      {
        id: 'hhSize',
        type: 'number',
        head: m.hhSize,
        renderQuick: _ => _.nta?.ben_det_hh_size,
      },
      {
        id: 'document_type',
        type: 'select_one',
        head: m._shelter.documentType,
        options: () => Obj.entries(Shelter_NTA.options.document_type).map(([value, label]) => ({value, label})),
        render: _ => {
          return {
            value: _.nta?.document_type,
            label: ctx.nta.schema.translate.choice('document_type', _.nta?.document_type)
          }
        },
      },
      {
        id: 'dwelling_type',
        type: 'select_one',
        head: m._shelter.accommodation,
        options: () => Obj.entries(Shelter_NTA.options.dwelling_type).map(([value, label]) => ({value, label})),
        render: _ => {
          return {
            label: ctx.nta.schema.translate.choice('dwelling_type', _.nta?.dwelling_type),
            value: _.nta?.dwelling_type,
          }
        },
      },
      {
        id: 'ownership_verification',
        type: 'select_one',
        align: 'center',
        width: 0,
        head: m._shelter.ownershipDocumentExist,
        options: () => Obj.entries(Shelter_NTA.options.pregnant_lac).map(([value, label]) => ({value, label})),
        render: _ => {
          return {
            value: _.nta?.ownership_verification,
            label: fnSwitch(_.nta?.ownership_verification!, {
              yes: <TableIcon color="success">check_circle</TableIcon>,
              no: <TableIcon color="error">cancel</TableIcon>,
            }, () => undefined)
          }
        }
      },
      {
        id: 'ownership_verification_doc',
        type: 'select_one',
        head: m._shelter.ownershipDocument,
        options: () => [{value: 'exist', label: m.exist}, {value: 'not_exist', label: m.notExist}],
        render: _ => {
          return {
            value: _.nta?.doc_available_yes1 ? 'exist' : 'not_exist',
            label: <Box component="span" sx={{'& > :not(:last-child)': {marginRight: '2px'}}}>
              {_.nta?.attachments && (
                <>
                  <KoboAttachedImg attachments={_.nta.attachments} fileName={_.nta.doc_available_yes1}/>
                  <KoboAttachedImg attachments={_.nta.attachments} fileName={_.nta.doc_available_yes2}/>
                  <KoboAttachedImg attachments={_.nta.attachments} fileName={_.nta.doc_available_yes3}/>
                  <KoboAttachedImg attachments={_.nta.attachments} fileName={_.nta.doc_available_yes4}/>
                  <KoboAttachedImg attachments={_.nta.attachments} fileName={_.nta.doc_available_yes5}/>
                </>
              )}
            </Box>,
          }
        }
      },
      {
        id: 'damage_score',
        typeIcon: null,
        type: 'number',
        width: 0,
        head: m._shelter.scoreDamage,
        renderQuick: _ => add(_.nta?.apt_score, _.nta?.hh_score),
      },
      {
        id: 'displ_score',
        typeIcon: null,
        type: 'number',
        width: 0,
        head: m._shelter.scoreDisplacement,
        renderQuick: _ => safeNumber(_.nta?.displ_score),
      },
      {
        id: 'socio_score',
        typeIcon: null,
        type: 'number',
        width: 0,
        head: m._shelter.scoreSocio,
        render: _ => {
          return {
            value: safeNumber(_.nta?.socio_score),
            label: add(_.nta?.socio_score!) < 6 ? <Txt bold color="error">{_.nta?.socio_score}</Txt> : _.nta?.socio_score,
          }
        },
      },
      {
        id: 'total',
        typeIcon: null,
        type: 'number',
        width: 0,
        head: m._shelter.total,
        render: _ => ({
          value: add(_.nta?.apt_score, _.nta?.hh_score, _.nta?.displ_score, _.nta?.socio_score),
          label: add(_.nta?.apt_score, _.nta?.hh_score, _.nta?.displ_score, _.nta?.socio_score)
        })
      },
      {
        type: 'select_one',
        id: 'validation',
        head: m._shelter.validationStatus,
        width: 0,
        typeIcon: null,
        subHeader: selectedNta.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_nta',
          answerIds: selectedNta,
          type: 'select_one',
          options: Obj.values(KoboValidation).map(_ => ({
            value: _, label: _, before: <OptionLabelTypeCompact sx={{alignSelf: 'center', mr: 1}} type={SelectStatusConfig.statusType.KoboValidation[_]}/>
          })),
          tag: '_validation',
        })}/>,
        render: (row: ShelterEntity) => {
          return {
            option: row.nta?.tags?._validation,
            value: row.nta?.tags?._validation,
            label: map(row.nta, nta => (
              <SelectStatusBy
                enum="KoboValidation"
                compact
                value={nta.tags?._validation}
                onChange={(tagChange) => {
                  ctxEditTag.asyncUpdateByName.call({
                    formName: 'shelter_nta',
                    answerIds: [nta.id],
                    tag: '_validation',
                    value: tagChange ?? undefined,
                  })
                }}
              />
            ))
          }
        }
      },
      {
        id: 'TA',
        width: 0,
        style: () => ({borderLeft: '4px solid ' + theme.palette.divider}),
        styleHead: {borderLeft: '4px solid ' + theme.palette.divider},
        head: m._shelter.taForm,
        type: 'select_one',
        options: () => [{value: 'true', label: m._shelter.taFilled}, {value: 'false', label: m._shelter.taNotFilled}],
        render: _ => {
          return {
            tooltip: null,
            value: _.ta ? 'true' : 'false',
            label: map(_.ta, form =>
              <>
                <TableIconBtn tooltip={m.view} children="visibility" onClick={() => ctxAnswers.openAnswerModal({formId: KoboIndex.byName('shelter_ta').id, answer: form})}/>
                <TableIconBtn tooltip={m.edit} href={ctx.asyncEdit(KoboIndex.byName('shelter_ta').id, form.id)} target="_blank" children="edit"/>
              </>
            )
          }
        }
      },
      {
        id: 'taid',
        className: 'td-id',
        width: 0,
        typeIcon: keyTypeIcon,
        head: m.id,
        type: 'string',
        renderQuick: _ => _.ta?.id,
      },
      {
        type: 'date',
        id: 'taSubmissionTime',
        head: m.submissionTime,
        render: _ => {
          return {
            value: _.ta?.submissionTime,
            label: formatDate(_.ta?.submissionTime),
          }
        },
      },
      {
        type: 'number',
        width: 0,
        head: m._shelter.roofSum,
        id: 'roof',
        renderQuick: _ => _.ta ? add(_.ta.roof_shiffer_m, _.ta.roof_metal_sheets_m, _.ta.roof_onduline_sheets_m, _.ta.bitumen_paint_m) : undefined,
      },
      {
        type: 'number',
        width: 0,
        head: m._shelter.windowsSum,
        id: 'windows',
        renderQuick: _ => _.ta ? add(
          _.ta.singleshutter_windowdoubleglazed_pc,
          _.ta.singleshutter_window_tripleglazed_pc,
          _.ta.doubleshutter_window_tripleglazed_pc,
          _.ta.glass_replacement_tripleglazed_pc
        ) : undefined,
      },
      {
        id: 'agreement',
        head: m._shelter.agreement,
        type: 'string',
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'text',
          tag: 'agreement',
        })}/>,
        render: row => {
          return {
            value: row.ta?.tags?.agreement,
            label: map(row.ta, ta => (
              <TableInput
                originalValue={null}
                value={row.ta?.tags?.agreement}
                onChange={_ => ctxEditTag.asyncUpdateByName.call({
                  formName: 'shelter_ta',
                  answerIds: [ta.id],
                  tag: 'agreement',
                  value: _,
                })}
              />
            ))
          }
        }
      },
      {
        id: 'workOrder',
        head: m._shelter.workOrder,
        type: 'select_one',
        typeIcon: null,
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'text',
          tag: 'workOrder',
        })}/>,
        render: row => {
          return {
            option: row.ta?.tags?.workOrder ?? DatatableUtils.blank,
            value: row.ta?.tags?.workOrder,
            label: map(row.ta, ta => (
              <TableInput
                originalValue={null}
                value={row.ta?.tags?.workOrder}
                onChange={_ => ctxEditTag.asyncUpdateByName.call({
                  formName: 'shelter_ta',
                  answerIds: [ta.id],
                  tag: 'workOrder',
                  value: _,
                })}
              />
            ))
          }
        }
      },
      {
        id: 'project',
        head: m.project,
        width: 174,
        type: 'select_multiple',
        typeIcon: null,
        options: () => DatatableUtils.buildOptions(shelterDrcProject, true),
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'select_multiple',
          options: shelterDrcProject,
          tag: 'project',
        })}/>,
        render: row => {
          const projectArray = safeArray(row.ta?.tags?.project)
          return {
            value: projectArray,
            label: map(row.ta, ta => {
              return (
                <DebouncedInput
                  debounce={1000}
                  value={projectArray}
                  onChange={(projectChange: DrcProject[] | undefined) => {
                    ctxEditTag.asyncUpdateByName.call({
                      formName: 'shelter_ta',
                      answerIds: [ta.id],
                      tag: 'project',
                      value: projectChange ?? undefined,
                    })
                  }}
                >
                  {(value, onChange) => (
                    <SelectDrcProjects
                      label={null}
                      value={value}
                      onChange={onChange}
                      options={shelterDrcProject}
                    />
                  )}
                </DebouncedInput>
              )
            })
          }
        }
      },
      {
        id: 'hasLot1',
        head: m._shelter.lot1,
        width: 0,
        align: 'center',
        type: 'select_one',
        typeIcon: null,
        options: () => ['Yes', 'No', 'None'].map(SheetUtils.buildOption),
        render: row => {
          return {
            tooltip: null,
            value: fnSwitch(KoboShelterTa.hasLot1(row.ta) + '', {
              true: 'Yes',
              false: 'No',
            }, () => 'None'),
            label: fnSwitch(KoboShelterTa.hasLot1(row.ta) + '', {
              true: <TableIcon color="success">task_alt</TableIcon>,
              false: <TableIcon color="disabled">block</TableIcon>,
            }, () => <></>)
          }
        },
      },
      {
        id: 'contractor1',
        width: 148,
        head: m._shelter.contractor1,
        type: 'select_one',
        typeIcon: null,
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'select_one',
          options: Obj.values(ShelterContractor),
          tag: 'contractor1',
        })}/>,
        render: row => {
          return {
            option: row.ta?.tags?.contractor1 ?? DatatableUtils.blank,
            value: row.ta?.tags?.contractor1,
            label: map(row.ta, ta => (
              <ShelterSelectContractor
                disabled={!KoboShelterTa.hasLot1(ta)}
                value={ta.tags?.contractor1}
                oblast={ta?.ben_det_oblast}
                onChange={(tagChange) => {
                  ctxEditTag.asyncUpdateByName.call({
                    formName: 'shelter_ta',
                    answerIds: [ta.id],
                    tag: 'contractor1',
                    value: tagChange,
                  })
                }}
              />
            ))
          }
        }
      },
      {
        id: 'hasLot2',
        head: m._shelter.lot2,
        width: 0,
        align: 'center',
        type: 'select_one',
        typeIcon: null,
        options: () => ['Yes', 'No', 'None'].map(SheetUtils.buildOption),
        render: row => {
          return {
            tooltip: null,
            value: fnSwitch(KoboShelterTa.hasLot2(row.ta) + '', {
              true: 'Yes',
              false: 'No',
            }, () => 'None'),
            label: fnSwitch(KoboShelterTa.hasLot2(row.ta) + '', {
              true: <TableIcon color="success">task_alt</TableIcon>,
              false: <TableIcon color="disabled">block</TableIcon>,
            }, () => <></>),
          }
        }
      },
      {
        id: 'contractor2',
        width: 148,
        head: m._shelter.contractor2,
        type: 'select_one',
        typeIcon: null,
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'select_one',
          options: Obj.values(ShelterContractor),
          tag: 'contractor2',
        })}/>,
        render: row => {
          return {
            option: row.ta?.tags?.contractor2 ?? DatatableUtils.blank,
            value: row.ta?.tags?.contractor2,
            label: map(row.ta, ta => (
              <ShelterSelectContractor
                disabled={!KoboShelterTa.hasLot2(ta)}
                value={ta.tags?.contractor2}
                oblast={ta?.ben_det_oblast}
                onChange={(tagChange) => {
                  ctxEditTag.asyncUpdateByName.call({
                    formName: 'shelter_ta',
                    answerIds: [ta.id],
                    tag: 'contractor2',
                    value: tagChange,
                  })
                }}
              />
            ))
          }
        }
      },
      {
        id: 'damageLevel',
        width: 148,
        head: m._shelter.scoreDamage,
        type: 'select_one',
        options: () => Obj.keys(ShelterTaPriceLevel).map(_ => ({value: _, label: _})),
        typeIcon: null,
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'select_one',
          options: Obj.values(ShelterTaPriceLevel),
          tag: 'damageLevel',
        })}/>,
        render: row => {
          return {
            option: row.ta?.tags?.damageLevel ?? DatatableUtils.blank,
            value: row.ta?.tags?.damageLevel,
            label: map(row.ta, ta => {
              return (
                <IpSelectSingle<ShelterTaPriceLevel>
                  value={ta.tags?.damageLevel}
                  onChange={(tagChange) => {
                    ctxEditTag.asyncUpdateByName.call({
                      formName: 'shelter_ta',
                      answerIds: [ta.id],
                      tag: 'damageLevel',
                      value: tagChange,
                    })
                  }}
                  options={Obj.keys(ShelterTaPriceLevel)}
                />
              )
            })
          }
        }
      },
      // column.progress,
      {
        id: 'price',
        head: m.price,
        type: 'number',
        typeIcon: null,
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'decimal',
          tag: 'price',
        })}/>,
        render: row => {
          return {
            value: row.ta?.tags?.price,
            label: map(row.ta, ta => (
              <DebouncedInput<number | undefined>
                debounce={1250}
                value={row.ta?.tags?.price}
                onChange={_ => {
                  ctxEditTag.asyncUpdateByName.call({
                    formName: 'shelter_ta',
                    answerIds: [ta.id],
                    tag: 'price',
                    value: _,
                  })
                }}
              >
                {(value, onChange) => (
                  <IpInput
                    type="number"
                    helperText={null}
                    defaultValue={value}
                    onChange={e => onChange(e.target.value === '' ? undefined : safeNumber(e.target.value))}
                  />
                )}
              </DebouncedInput>
            ))
          }
        }
      },
      {
        type: 'number',
        width: 0,
        id: 'price_deprecated',
        head: 'Auto ' + m.price + ' (deprecated)',
        render: (row: ShelterEntity) => {
          return {
            value: row.ta?._price ?? undefined,
            label: map(row.ta?._price, _ => _ === null ? '⚠️ Missing price' : formatLargeNumber(_))
          }
        },
      },
      {
        type: 'select_one',
        id: 'price_level',
        head: m._shelter.priceLevel,
        width: 0,
        align: 'center',
        typeIcon: null,
        options: () => [
          SheetUtils.buildCustomOption(ShelterTaPriceLevel.Light, <><TableIcon color="success">looks_one</TableIcon> {ShelterTaPriceLevel.Light}</>),
          SheetUtils.buildCustomOption(ShelterTaPriceLevel.Medium, <><TableIcon color="warning">looks_two</TableIcon> {ShelterTaPriceLevel.Medium}</>),
          SheetUtils.buildCustomOption(ShelterTaPriceLevel.Heavy, <><TableIcon color="error">looks_3</TableIcon> {ShelterTaPriceLevel.Heavy}</>),
        ],
        render: (row: ShelterEntity) => {
          return {
            value: row.ta?._priceLevel,
            label: fnSwitch(row.ta?._priceLevel!, {
              [ShelterTaPriceLevel.Light]: <TableIcon color="success">looks_one</TableIcon>,
              [ShelterTaPriceLevel.Medium]: <TableIcon color="warning">looks_two</TableIcon>,
              [ShelterTaPriceLevel.Heavy]: <TableIcon color="error">looks_3</TableIcon>,
            }, () => <></>)
          }
        }
      },
      {
        type: 'select_one',
        id: 'progress',
        head: m._shelter.progressStatus,
        width: 190,
        typeIcon: null,
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'select_one',
          options: Object.keys(ShelterProgress),
          tag: 'progress',
        })}/>,
        options: () => Obj.keys(ShelterProgress).map(_ => ({value: _, label: m._shelter.progress[_]})),
        render: (row: ShelterEntity) => {
          return {
            value: row.ta?.tags?.progress,
            label: map(row.ta, ta => (
              <ShelterSelectStatus
                value={ta.tags?.progress}
                onChange={(tagChange) => {
                  ctxEditTag.asyncUpdateByName.call({
                    formName: 'shelter_ta',
                    answerIds: [ta.id],
                    tag: 'progress',
                    value: tagChange,
                  })
                  if (tagChange === ShelterProgress.RepairWorksCompleted)
                    ctxEditTag.asyncUpdateByName.call({
                      formName: 'shelter_ta',
                      answerIds: [ta.id],
                      tag: 'workDoneAt',
                      value: new Date(),
                    })
                  else if (ta.tags?.workDoneAt)
                    ctxEditTag.asyncUpdateByName.call({
                      formName: 'shelter_ta',
                      answerIds: [ta.id],
                      tag: 'workDoneAt',
                      value: null,
                    })
                }}
              />
            ))
          }
        }
      },
      {
        id: 'workDoneAt',
        head: m._shelter.workDoneAt,
        type: 'date',
        width: 134,
        subHeader: selectedTa.length > 0 && <TableEditCellBtn onClick={() => ctxEditTag.openByName({
          formName: 'shelter_ta',
          answerIds: selectedTa,
          type: 'datetime',
          tag: 'workDoneAt',
        })}/>,
        render: (row: ShelterEntity) => {
          return {
            value: row.ta?.tags?.workDoneAt,
            label: row.ta?.tags?.progress === ShelterProgress.RepairWorksCompleted && map(row.ta, ta => (
              <IpDatepicker
                value={row.ta?.tags?.workDoneAt}
                onChange={_ => ctxEditTag.asyncUpdateByName.call({
                  formName: 'shelter_ta',
                  answerIds: [ta.id],
                  tag: 'workDoneAt',
                  value: _,
                })}
              />
            ))
          }
        }
      },
    ])
  }, [ctx.data.mappedData, ctx.langIndex, selectedIds])

  const allowedData = useMemo(() => {
    if (ctx.allowedOffices.length === 0)
      return ctx.data.mappedData
    return ctx.data.mappedData?.filter(_ => ctx.allowedOffices.includes(_.nta?.back_office))
  }, [ctx.data])

  return (
    <Page width="full">
      <Panel>
        <Datatable
          id="shelter"
          title="Shelter-Assessment_database"
          select={{
            onSelect: setSelectedIds,
            getId: _ => _.id,
          }}
          // showExportBtn
          header={
            <>
              {/*<IpIconBtn*/}
              {/*  children="refresh"*/}
              {/*  loading={ctx.data.fetching}*/}
              {/*  onClick={() => ctx.data.fetchAll({force: true, clean: true})}*/}
              {/*  tooltip={m.refreshTable}*/}
              {/*  sx={{ml: -1}}*/}
              {/*/>*/}
              <IpSelectSingle<number>
                hideNullOption
                sx={{maxWidth: 128, mr: 1}}
                defaultValue={ctx.langIndex}
                onChange={ctx.setLangIndex}
                options={[
                  {children: 'XML', value: -1},
                  ...ctx.nta.schema.schemaHelper.sanitizedSchema.content.translations.map((_, i) => ({children: _, value: i}))
                ]}
              />
              <DatabaseKoboSyncBtn
                sx={{marginLeft: 'auto'}}
                loading={ctx.data.asyncSyncAnswers.loading}
                onClick={ctx.data.asyncSyncAnswers.call}
              />
            </>
          }
          data={allowedData}
          loading={ctx.data.fetching}
          getRenderRowKey={_ => _.id}
          columns={columns}
          showExportBtn
        />
      </Panel>
    </Page>
  )
}
