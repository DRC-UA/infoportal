import React, {ReactNode, useMemo} from 'react'
import {useDatabaseKoboTableContext} from '@/features/Database/KoboTable/DatabaseKoboContext'
import {KoboGeneralMapping, KoboIndex} from '@infoportal-common'
import {HeaderParams} from '@/shared/Datatable/util/datatableType'
import {AgeGroupTable} from '@/shared/AgeGroupTable'
import {PopoverWrapper} from '@/shared/PopoverWrapper'
import {IpIconBtn} from '@/shared/IconBtn'

export const useCustomHeader = (): undefined | ((_: HeaderParams<any>) => ReactNode) => {
  const ctx = useDatabaseKoboTableContext()
  return useMemo(() => {
    switch (ctx.form.id) {
      case KoboIndex.byName('ecrec_cashRegistration').id:
      case KoboIndex.byName('ecrec_cashRegistrationBha').id:
      case KoboIndex.byName('bn_re').id:
      case KoboIndex.byName('shelter_nta').id:
      case KoboIndex.byName('bn_cashForRentRegistration').id:
      case KoboIndex.byName('bn_cashForRentApplication').id:
      case KoboIndex.byName('shelter_cashForShelter').id: {
        return (_: HeaderParams<{custom: KoboGeneralMapping.IndividualBreakdown}>) => {
          return (
            <PopoverWrapper
              content={() => (
                <AgeGroupTable tableId="useCustomHeader" persons={_.filteredData.flatMap(_ => _.custom.persons)}/>
              )}
            >
              <IpIconBtn children="group"/>
            </PopoverWrapper>
          )
        }
      }
    }
  }, [ctx.form.id])
}