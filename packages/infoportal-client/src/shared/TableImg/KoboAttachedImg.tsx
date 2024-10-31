import {AppConfig, appConfig} from '@/conf/AppConfig'
import {KoboAnswerId, KoboAttachment, KoboId} from 'infoportal-common'
import {TableImg} from '@/shared/TableImg/TableImg'
import {useMemo} from 'react'
import {KoboApiSdk} from '@/core/sdk/server/kobo/KoboApiSdk'

export const proxyKoboImg = ({
  formId,
  url,
  fileName,
  conf = appConfig,
}: {
  formId: KoboId
  url?: string
  fileName?: string
  conf?: AppConfig
}) => {
  const path = url?.split('api')[1]
  return {
    path,
    fullUrl: path ? KoboApiSdk.getAttachementUrl({formId, path, baseUrl: conf.apiURL}) : undefined
    // fullUrl: path ? conf.apiURL + `/kobo-api/${serverId}/attachment?path=${path}&file=${fileName}` : undefined
  }
}

const parseKoboFileName = (fileName?: string) => fileName ? fileName.replaceAll(' ', '_').replaceAll(/[^0-9a-zA-Z-_.\u0400-\u04FF]/g, '') : undefined

export const findFileUrl = ({formId, answerId, fileName, attachments}: {formId: KoboId, answerId: KoboAnswerId, fileName?: string, attachments: KoboAttachment[]}) => {
  const parsedFileName = parseKoboFileName(fileName)
  const attachment = parsedFileName ? attachments.find(_ => _.filename.includes(parsedFileName)) : undefined
  if (attachment) {
    return `https://eu.kobotoolbox.org/api/v2/assets/${formId}/data/${answerId}/attachments/${attachment.id}/`
  }
  // return parsedFileName ? attachments.find(_ => _.filename.includes(parsedFileName))?.download_small_url : undefined
}

export const koboImgHelper = ({
  fileName,
  attachments,
  conf = appConfig,
  formId,
  answerId,
}: {
  formId: KoboId
  answerId: KoboAnswerId
  fileName?: string,
  attachments: KoboAttachment[]
  conf?: AppConfig
}) => {
  const url = findFileUrl({formId, answerId, fileName, attachments})
  return proxyKoboImg({
    formId,
    url,
    fileName,
    conf,
  })
}

export const KoboAttachedImg = ({
  fileName,
  attachments,
  size,
  formId,
  answerId,
  tooltipSize = 450,
}: {
  formId: KoboId
  answerId: KoboAnswerId
  size?: number
  tooltipSize?: number | null
  fileName?: string
  attachments: KoboAttachment[]
}) => {
  const file = useMemo(() => koboImgHelper({formId, answerId, attachments, fileName}), [attachments, fileName])
  return (
    fileName && <TableImg size={size} tooltipSize={tooltipSize} url={file.fullUrl ?? ''}/>
  )
}

export const AllAttachements = ({
  attachments,
  formId,
}: {
  formId: KoboId
  attachments: KoboAttachment[]
}) => {
  return attachments?.map((a: KoboAttachment, i: number) =>
    <TableImg key={i} size={100} tooltipSize={100} url={proxyKoboImg({formId, url: a.download_url}).fullUrl ?? ''}/>
  )
}
