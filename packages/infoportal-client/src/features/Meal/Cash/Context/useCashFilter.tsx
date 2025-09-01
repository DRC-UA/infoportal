import {seq, Seq} from '@axanc/ts-utils'
import {CashPdmData, CashPdmForm} from '@/features/Meal/Cash/Context/CashContext'
import {useI18n} from '@/core/i18n'
import {useMemo} from 'react'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {Meal_cashPdm} from 'infoportal-common'

export const useCashFilter = (data: Seq<CashPdmData<CashPdmForm>> = seq()) => {
  const {m} = useI18n()
  const shape = useMemo(
    () =>
      DataFilter.makeShape<CashPdmData<CashPdmForm>>({
        oblast: {
          icon: 'location_on',
          label: m.oblast,
          getValue: (_) => _.oblast,
          getOptions: () =>
            DataFilter.buildOptions(
              data
                .flatMap((_) => _.oblast!)
                .distinct((_) => _)
                .sort(),
            ),
        },
        raion: {
          icon: 'location_on',
          label: m.raion,
          getValue: (_) => _.raion,
          getOptions: () =>
            DataFilter.buildOptions(
              data
                .flatMap((_) => _.raion!)
                .distinct((_) => _)
                .sort(),
            ),
        },
        hromada: {
          icon: 'location_on',
          label: m.hromada,
          getValue: (_) => _.hromada,
          getOptions: () =>
            DataFilter.buildOptions(
              data
                .flatMap((_) => _.hromada!)
                .distinct((_) => _)
                .sort(),
            ),
        },
        office: {
          icon: 'share',
          label: m.office,
          getValue: (_) => _.office,
          getOptions: () =>
            DataFilter.buildOptions(
              data
                .flatMap((_) => _.office!)
                .distinct((_) => _)
                .sort(),
            ),
        },
        project: {
          icon: 'business',
          label: m.project,
          getValue: (_) => _.project,
          getOptions: () =>
            DataFilter.buildOptions(
              data
                .flatMap((_) => _.project!)
                .distinct((_) => _)
                .sort(),
            ),
        },
        pdmtype: {
          icon: 'category',
          label: m.mealMonitoringPdm.pdmType,
          getValue: (_) =>
            _.pdmType ??
            (Array.isArray((_.answers as any).pdmtype) ? (_.answers as any).pdmtype[0] : (_.answers as any).pdmtype),
          getOptions: () => DataFilter.buildOptionsFromObject(Meal_cashPdm.options.pdmtype),
        },
        received: {
          icon: 'check_circle',
          label: m.mealMonitoringPdm.received,
          getValue: (_) => _.received,
          getOptions: () => DataFilter.buildOptionsFromObject(Meal_cashPdm.options.any_member_household),
        },
      }),
    [data, m],
  )

  return {shape}
}
