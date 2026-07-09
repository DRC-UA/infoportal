import {useMemo} from 'react'
import {seq, Seq} from '@axanc/ts-utils'

import {Meal_cashPdm, Bn_pam} from 'infoportal-common'

import {CashPdmData, CashPdmForm} from '@/features/Meal/Cash/Context/CashContext'
import {useI18n} from '@/core/i18n'
import {DataFilter} from '@/shared/DataFilter/DataFilter'
import {useKoboTranslations} from '@/utils'

export const useCashFilter = (data: Seq<CashPdmData<CashPdmForm>> = seq(), {isBn = false}: {isBn?: boolean} = {}) => {
  const {m} = useI18n()
  const {translateField} = useKoboTranslations('bn_pam', {en: 0, uk: 1})

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
        ...(isBn && {
          assistanceType: {
            icon: 'category',
            label: translateField ? translateField('type_bn') : '',
            getValue: ({answers}) => (answers as Bn_pam.T).type_bn,
            getOptions: () => DataFilter.buildOptionsFromObject(Bn_pam.options.type_bn),
          },
        }),
        received: {
          icon: 'check_circle',
          label: m.mealMonitoringPdm.received,
          getValue: (_) => _.received,
          getOptions: () => DataFilter.buildOptionsFromObject(Meal_cashPdm.options.any_member_household),
        },
      }),
    [data, m, translateField],
  )

  return {shape}
}
