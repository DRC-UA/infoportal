import {ReactNode, useMemo} from 'react'

import {KoboIndex, KoboXmlMapper} from 'infoportal-common'

import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {HeaderParams} from '@/shared/Datatable/util/datatableType'
import {IpIconBtn} from '@/shared/IconBtn'
import {PopoverWrapper} from '@/shared/PopoverWrapper'

export const useCustomHeader = (): undefined | ((_: HeaderParams<any>) => ReactNode) => {
  const ctx = useDatabaseKoboTableContext()
  return useMemo(() => {
    switch (ctx.form.id) {
      case KoboIndex.byName('protection_pss').id:
      case KoboIndex.byName('protection_hhs3').id:
      case KoboIndex.byName('protection_gbv').id:
      case KoboIndex.byName('protection_groupSession').id:
      case KoboIndex.byName('protection_communityMonitoring').id:
      case KoboIndex.byName('ecrec_cashRegistration').id:
      case KoboIndex.byName('ecrec_cashRegistrationBha').id:
      case KoboIndex.byName('bn_re').id:
      case KoboIndex.byName('bn_rapidResponse').id:
      case KoboIndex.byName('shelter_nta').id:
      case KoboIndex.byName('bn_cashForRentRegistration').id:
      case KoboIndex.byName('bn_cashForRentApplication').id:
      case KoboIndex.byName('ecrec_vetApplication').id:
      case KoboIndex.byName('ecrec_vetEvaluation').id:
      case KoboIndex.byName('ecrec_msmeGrantEoi').id:
      case KoboIndex.byName('shelter_cashForShelter').id:
      case KoboIndex.byName('ecrec_vet_bha388').id:
      case KoboIndex.byName('ecrec_vet2_dmfa').id:
      case KoboIndex.byName('ecrec_msmeGrantReg').id:
      case KoboIndex.byName('bn_rapidResponse2').id:
      case KoboIndex.byName('partner_lampa').id:
      case KoboIndex.byName('ecrec_small_scale').id:
      case KoboIndex.byName('ecrec_subsistance').id:
      case KoboIndex.byName('legal_individual_aid').id: {
        return (_: HeaderParams<{custom: KoboXmlMapper.Breakdown}>) => {
          return (
            <PopoverWrapper
              popoverProps={{
                slotProps: {
                  paper: {
                    sx: {
                      minWidth: 510,
                    },
                  },
                },
              }}
              content={() => (
                <AgeGroupTable
                  tableId="useCustomHeader"
                  enableDisplacementStatusFilter
                  enablePwdFilter
                  persons={_.filteredData.flatMap((_) => _.custom?.persons ?? [])}
                />
              )}
            >
              <IpIconBtn children="group" disabled={!_.filteredData} />
            </PopoverWrapper>
          )
        }
      }
    }
  }, [ctx.form.id])
}
