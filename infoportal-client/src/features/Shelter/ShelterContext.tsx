import React, {ReactNode, useContext} from 'react'
import {KoboAnswerId, KoboIndex, Shelter_NTA, ShelterNtaTags, ShelterTaTags} from '@infoportal-common'
import {UseShelterData} from '@/features/Shelter/useShelterData'
import {UseShelterActions, useShelterActions} from '@/features/Shelter/useShelterActions'
import {AccessSum} from '@/core/sdk/server/access/Access'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'
import {KoboSchemaContext} from '@/features/KoboSchema/KoboSchemaContext'

export type ShelterContext = Pick<KoboSchemaContext, 'langIndex' | 'setLangIndex'> & {
  access: AccessSum
  data: UseShelterData
  nta: UseShelterActions<ShelterNtaTags>
  ta: UseShelterActions<ShelterTaTags>
  allowedOffices: Shelter_NTA.T['back_office'][]
}

const Context = React.createContext({} as ShelterContext)

export const useShelterContext = () => useContext<ShelterContext>(Context)

export const ShelterProvider = ({
  schemaTa,
  schemaNta,
  children,
  allowedOffices,
  access,
  data,
  ...props
}: {
  access: AccessSum
  data: UseShelterData
  schemaTa: KoboSchemaHelper.Bundle
  schemaNta: KoboSchemaHelper.Bundle
  children: ReactNode
  allowedOffices: ShelterContext['allowedOffices']
} & Pick<KoboSchemaContext, 'langIndex' | 'setLangIndex'>) => {
  const updateTag = (form: 'ta' | 'nta') => ({answerIds, key, value}: {
    answerIds: KoboAnswerId[]
    key: any
    value: any
  }) => data.fetcher.set(prev => {
    if (!data.index || !prev) return prev
    const set = new Set(answerIds)
    return prev.map(_ => {
      if (set.has(_[form]?.id ?? '!') && _[form]) {
        _[form]!.tags = {
          ...(_[form]?.tags ?? {}),
          [key]: value,
        }
      }
      return _
    })
  })

  const ntaActions = useShelterActions<ShelterNtaTags>({
    form: 'nta',
    formId: KoboIndex.byName('shelter_nta').id,
    setEntity: data.fetcher.set,
    schema: schemaNta,
  })
  const taActions = useShelterActions<ShelterTaTags>({
    form: 'ta',
    formId: KoboIndex.byName('shelter_ta').id,
    setEntity: data.fetcher.set,
    schema: schemaTa,
  })

  return (
    <Context.Provider value={{
      access,
      data,
      nta: ntaActions,
      ta: taActions,
      allowedOffices,
      ...props,
    }}>
      {children}
    </Context.Provider>
  )
}
