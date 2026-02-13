import {useEffect, useState} from 'react'
import {match} from '@axanc/ts-utils'
import {endOfMonth, startOfMonth, subMonths} from 'date-fns'

import {DrcSector, groupBy, KoboMetaStatus, Person, type Period} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import type {DatatableRow} from '@/shared/Datatable/util/datatableType'
import {useFetcher} from '@/shared/hook/useFetcher'

import {FlatMetaPersonRecord} from './types'

const useInterimReport = () => {
  const [period, setPeriod] = useState<Partial<Period>>({
    start: startOfMonth(subMonths(new Date(), 1)),
    end: endOfMonth(subMonths(new Date(), 1)),
  })
  const {api} = useAppSettings()

  const {get, loading, fetch} = useFetcher((period) =>
    api.koboMeta.search({status: [KoboMetaStatus.Committed], ...period}),
  )

  const flatData: FlatMetaPersonRecord[] =
    get?.data.flatMap(
      ({koboId, persons, sector, oblast, raion, hromada, lastStatusUpdate}) =>
        persons?.map(({displacement, age}) => ({
          id: koboId,
          // switch from VA to Child Protection, if victim is a minor
          sector: sector === DrcSector.VA && age !== undefined && age < 18 ? DrcSector.ChildProtection : sector,
          oblast,
          raion,
          hromada,
          lastStatusUpdate,
          displacement,
        })) ?? [],
    ) ?? []

  const data: DatatableRow[] = groupBy({
    data: flatData,
    groups: [
      {by: ({sector}) => sector},
      {by: ({oblast}) => oblast},
      {by: ({raion}) => raion!},
      {by: ({hromada}) => hromada!},
    ],
    finalTransform: (group, [sector, oblast, raion, hromada]): DatatableRow => {
      const {ids, idp, ndp} = group.reduce(
        (accumulator, {displacement, id}) => {
          return {
            ...accumulator,
            ids: accumulator.ids.add(id),
            ...match(displacement)
              .cases({
                [Person.DisplacementStatus.Idp]: {idp: accumulator.idp + 1},
                [Person.DisplacementStatus.Refugee]: {idp: accumulator.idp + 1},
                [Person.DisplacementStatus.NonDisplaced]: {ndp: accumulator.ndp + 1},
                [Person.DisplacementStatus.Returnee]: {ndp: accumulator.ndp + 1},
              })
              .default({ndp: accumulator.ndp + 1}),
          }
        },
        {
          ids: new Set<string>(),
          idp: 0,
          ndp: 0,
        },
      )

      const isKyiv = raion.toLowerCase() === 'kyivska'

      return {
        ids,
        sector,
        ...(isKyiv
          ? {
              oblast: 'Kyiv',
              raion: 'Kyiv',
              hromada: 'Kyiv',
            }
          : {
              oblast,
              raion,
              hromada,
            }),
        idp,
        ndp,
      }
    },
  }).transforms

  useEffect(() => {
    fetch({}, period)
  }, [period])

  return {
    loading,
    data,
    period,
    setPeriod,
  }
}

export {useInterimReport}
