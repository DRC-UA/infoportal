import {KoboAnswerId, KoboId} from '@infoportal-common'
import {Dispatch, SetStateAction} from 'react'
import {useAppSettings} from '@/core/context/ConfigContext'
import {KoboSchemaHelper} from '@/features/KoboSchema/koboSchemaHelper'

import {ShelterEntity} from '@/core/sdk/server/shelter/ShelterEntity'

export type UseShelterActions = ReturnType<typeof useShelterActions>

export const useShelterActions = ({
  formId,
  schema,
}: {
  schema: KoboSchemaHelper.Bundle
  formId: KoboId,
  setEntity: Dispatch<SetStateAction<ShelterEntity[] | undefined>>
}) => {
  const {api} = useAppSettings()
  const asyncEdit = (answerId: KoboAnswerId) => api.koboApi.getEditUrl({formId, answerId})
  return {
    schema,
    asyncEdit,
  }
}
