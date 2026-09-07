import {useEffect, useMemo, useState, type FC} from 'react'
import {useTheme} from '@mui/material'

import {KoboSchemaHelper, KoboIndex, leftJoin} from 'infoportal-common'

import {useKoboAnswersContext} from '@/core/context/KoboAnswersContext'
import {useI18n} from '@/core/i18n'
import {Page} from '@/shared'
import {Datatable} from '@/shared/Datatable/Datatable'
import {columnBySchemaGenerator} from '@/features/Database/KoboTable/columns/columnBySchema'
import {databaseKoboDisplayBuilder} from '@/features/Database/KoboTable/groupDisplay/DatabaseKoboDisplay'
import {useKoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'
import {Panel, PanelHead, PanelTitle} from '@/shared/Panel'

const VetPamVsReg: FC = () => {
  const [loading, setLoading] = useState(true)
  const {m, currentLang} = useI18n()
  const theme = useTheme()
  const koboContext = useKoboAnswersContext()
  const pamFetcher = koboContext.byName('meal_ecrec_agMsmeVetPam')
  const regFetcher = koboContext.byName('ecrec_vet_bha388')
  const schemasContext = useKoboSchemaContext({autoFetch: ['meal_ecrec_agMsmeVetPam', 'ecrec_vet_bha388']})

  useEffect(() => {
    Promise.all([pamFetcher.fetch(), regFetcher.fetch()]).finally(() => setLoading(false))
  }, [])

  const data = useMemo(() => {
    return leftJoin(
      pamFetcher.get?.data.filter(({pdmtype}) => pdmtype === 'vet') ?? [],
      regFetcher.get?.data ?? [],
      ({unique_number}) => unique_number,
      ({ph_number}) => ph_number,
    ).map(({right, ...pam}) => ({
      id: pam.id,
      pam,
      reg: right,
    }))
  }, [pamFetcher.get?.data, regFetcher.get?.data])

  const pamColumns = useMemo(() => {
    const formId = KoboIndex.byName('meal_ecrec_agMsmeVetPam').id
    const sourceSchema = schemasContext.byId[formId]?.get

    if (!sourceSchema) return []

    const schema = KoboSchemaHelper.buildBundle({
      schema: sourceSchema.schema,
      langIndex: currentLang === 'uk' ? 1 : 0,
    })

    const schemaColumns = columnBySchemaGenerator({
      formId,
      schema,
      m,
      t: theme,
      currentLang,
      getRow: ({pam}) => pam,
    }).getAll()

    return databaseKoboDisplayBuilder({
      data: data ?? [],
      formId,
      schema,
      display: {},
      m,
      t: theme,
    })
      .transformColumns(schemaColumns)
      .map((column) => ({
        ...column,
        id: `pam_${column.id}`,
        group: `pam_${column.group}`,
        groupLabel: `PAM / ${column.groupLabel}`,
      }))
  }, [currentLang, m, theme, schemasContext.byId, pamFetcher.get?.data])

  const regColumns = useMemo(() => {
    const formId = KoboIndex.byName('ecrec_vet_bha388').id
    const sourceSchema = schemasContext.byId[formId]?.get

    if (!sourceSchema) return []

    const schema = KoboSchemaHelper.buildBundle({
      schema: sourceSchema.schema,
      langIndex: currentLang === 'uk' ? 0 : 1,
    })

    const schemaColumns = columnBySchemaGenerator({
      formId,
      schema,
      m,
      t: theme,
      currentLang,
      getRow: ({reg}) => reg ?? {},
    }).getAll()

    return databaseKoboDisplayBuilder({
      data: data ?? [],
      formId,
      schema,
      display: {},
      m,
      t: theme,
    })
      .transformColumns(schemaColumns)
      .map((column, index) => ({
        ...column,
        id: `reg_${column.id}`,
        group: `reg_${column.group}`,
        groupLabel: `REG / ${column.groupLabel}`,
        style:
          index === 0
            ? (row: any) => ({
                ...column.style?.(row),
                borderLeft: `12px solid ${theme.palette.divider}`,
              })
            : column.style,
        styleHead:
          index === 0
            ? {
                ...column.styleHead,
                borderLeft: `12px solid ${theme.palette.divider}`,
              }
            : column.styleHead,
      }))
  }, [currentLang, m, theme, schemasContext.byId, regFetcher.get?.data])

  return (
    <Page width="lg" loading={loading}>
      <Panel>
        <PanelHead>
          <PanelTitle>
            {KoboIndex.byName('meal_ecrec_agMsmeVetPam').translation} vs{' '}
            {KoboIndex.byName('ecrec_vet_bha388').translation}
          </PanelTitle>
        </PanelHead>
        <Datatable
          id="vet-pam-vs-reg"
          title="VET PAM vs REG"
          data={data}
          getRenderRowKey={(_) => _.id}
          columns={[...pamColumns, ...regColumns]}
          showExportBtn
        />
      </Panel>
    </Page>
  )
}

export {VetPamVsReg}
