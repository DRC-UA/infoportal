import {AppConfig, appConfig} from '@/conf/AppConfig'
import {koboIndex} from '@infoportal-common'
import {TableImg} from '@/shared/TableImg/TableImg'
import {KoboAttachment} from '@/core/sdk/server/kobo/Kobo'
import {useMemo} from 'react'

export const proxyKoboImg = ({
  url,
  fileName,
  serverId = koboIndex.drcUa.server.prod,
  conf = appConfig,
}: {
  url?: string
  fileName?: string
  serverId?: string
  conf?: AppConfig
}) => {
  const path = url?.split('api')[1]
  return {
    path,
    fullUrl: path ? conf.apiURL + `/kobo-api/${serverId}/attachment?path=${path}&file=${fileName}` : undefined
  }
}

const parseKoboFileName = (fileName?: string) => fileName ? fileName.replaceAll(' ', '_').replaceAll(/[^0-9a-zA-Z-_.]/g, '') : undefined

export const findFileUrl = ({fileName, attachments}: {fileName?: string, attachments: KoboAttachment[]}) => {
  const parsedFileName = parseKoboFileName(fileName)
  return parsedFileName ? attachments.find(_ => _.filename.includes(parsedFileName))?.download_small_url : undefined
}

export const koboImgHelper = ({
  fileName,
  serverId = koboIndex.drcUa.server.prod,
  attachments,
  conf = appConfig,
}: {
  fileName?: string,
  serverId?: string
  attachments: KoboAttachment[]
  conf?: AppConfig
}) => {
  const url = findFileUrl({fileName, attachments})
  return proxyKoboImg({
    url,
    fileName,
    serverId,
    conf,
  })
}

export const KoboAttachedImg = ({
  fileName,
  serverId,
  attachments,
  size,
  tooltipSize = 450,
}: {
  size?: number
  tooltipSize?: number | null
  fileName?: string
  serverId?: string
  attachments: KoboAttachment[]
}) => {
  const file = useMemo(() => koboImgHelper({attachments, fileName}), [attachments, fileName])
  return (
    <TableImg size={size} tooltipSize={tooltipSize} url={file.fullUrl ?? ''}/>
  )
}

export const AllAttachements = ({
  attachments,
}: {
  attachments: KoboAttachment[]
}) => {
  return attachments?.map((a: KoboAttachment, i: number) =>
    <TableImg key={i} size={100} tooltipSize={100} url={proxyKoboImg({url: a.download_url}).fullUrl ?? ''}/>
  )
}
