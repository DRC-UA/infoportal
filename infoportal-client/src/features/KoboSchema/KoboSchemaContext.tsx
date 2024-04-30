import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from 'react'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {KoboFormName} from '@infoportal-common'
import {useI18n} from '@/core/i18n'
import {useSchemaFetchers} from '@/features/KoboSchema/useSchemaFetcher'
import {UseFetchers} from '@/shared/hook/useFetchers'
import {KoboSchema} from '@/core/sdk/server/kobo/KoboApi'
import {Enum} from '@alexandreannic/ts-utils'

export type KoboTranslateQuestion = (key: string) => string
export type KoboTranslateChoice = (key: string, choice?: string) => string

interface KoboSchemaProviderProps {
  defaultLangIndex?: number
  children: ReactNode
}

export interface KoboSchemaContext {
  schema: Partial<Record<KoboFormName, KoboSchemaHelper.Bundle>>
  langIndex: number
  setLangIndex: Dispatch<SetStateAction<number>>
  fetchers: UseFetchers<(_: KoboFormName) => Promise<KoboSchema>, KoboFormName>
}

const Context = React.createContext({} as KoboSchemaContext)

export const useKoboSchemaContext = ({autoFetch}: {autoFetch?: KoboFormName[]} = {}) => {
  const ctx = useContext<KoboSchemaContext>(Context)
  if (!ctx) throw Error('Cannot used useKoboSchemasContext outside of KoboSchemasProvider.')
  useEffect(() => {
    if (autoFetch) autoFetch.forEach(name => {
      ctx.fetchers.fetch({}, name)
    })
  }, [])
  return ctx
}

export const KoboSchemaProvider = ({
  defaultLangIndex = 0,
  children,
}: KoboSchemaProviderProps) => {
  const {m} = useI18n()
  const [langIndex, setLangIndex] = useState<number>(defaultLangIndex)
  const fetchers = useSchemaFetchers()
  const schemaBundle = useMemo(() => {
    const res: Partial<Record<KoboFormName, KoboSchemaHelper.Bundle>> = {}
    Enum.entries(fetchers.getAsObj).forEach(([name, schema]) => {
      res[name] = KoboSchemaHelper.buildBundle({schema, langIndex, m})
    })
    return res
  }, [fetchers.getAsObj, langIndex])

  return (
    <Context.Provider value={{
      langIndex,
      setLangIndex,
      fetchers,
      schema: schemaBundle,
    }}>
      {children}
    </Context.Provider>
  )
}
