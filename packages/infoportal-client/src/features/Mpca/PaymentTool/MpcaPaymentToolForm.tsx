import {MpcaPayment, MpcaPaymentUpdate} from '../../../core/sdk/server/mpcaPaymentTool/MpcaPayment'
import {Controller, useForm} from 'react-hook-form'
import {AaSelect} from '@/shared/Select/Select'
import React, {useEffect} from 'react'
import {useI18n} from '../../../core/i18n'
import {ListRow} from '@/shared/ListRow'
import {IpInput} from '@/shared/Input/Input'
import {IpIconBtn} from '@/shared/IconBtn'

const budgetLines = [
  {value: '', children: ''},
  {value: 'UKR-000284', children: 'UKR-000284'},
]

export const MpcaPaymentToolForm = ({
  tool,
  onChange
}: {
  tool: MpcaPayment
  onChange: (_: MpcaPaymentUpdate) => void
}) => {
  const {m} = useI18n()
  const {
    register,
    getValues,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<Pick<MpcaPayment, 'budgetLineCFR'
    | 'budgetLineStartUp'
    | 'city'
    | 'budgetLineMPCA'
    | 'headOfOperation'
    | 'cashAndVoucherAssistanceAssistant'
    | 'financeAndAdministrationOfficer'>
  >()

  useEffect(() => {
    const subscription = watch(_ => {
      onChange(_)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <>
      <ListRow icon="person" border label={m.mpca.headOfOperations}>
        <IpIconBtn sx={{ml: 1}} children="gesture" color="primary"/>
        <IpInput defaultValue={tool.headOfOperation} {...register('headOfOperation')}/>
      </ListRow>
      <ListRow icon="" border label={m.mpca.financeAndAdministrationOfficer}>
        <IpIconBtn sx={{ml: 1}} children="gesture" color="primary"/>
        <IpInput defaultValue={tool.financeAndAdministrationOfficer} {...register('financeAndAdministrationOfficer')}/>
      </ListRow>
      <ListRow icon="" label={m.mpca.cashAndVoucherAssistanceAssistant}>
        <IpIconBtn sx={{ml: 1}} children="gesture" color="primary"/>
        <IpInput defaultValue={tool.cashAndVoucherAssistanceAssistant} {...register('cashAndVoucherAssistanceAssistant')}/>
      </ListRow>
      <ListRow icon="place" label={m.city}>
        <Controller
          name="city"
          defaultValue={tool.city}
          control={control}
          render={({field}) => <AaSelect defaultValue={field.value ?? ''} onChange={_ => field.onChange({target: {value: _}} as any)} options={[
            {value: '', children: ''},
            {value: 'Kyiv', children: m.kyiv},
            {value: 'Mykolaiv', children: m.mykolaiv},
          ]}/>}
        />
      </ListRow>
      <ListRow icon="savings" border label={m.mpca.budgetLineCFR}>
        <Controller
          name="budgetLineCFR"
          defaultValue={tool.budgetLineCFR}
          control={control}
          render={({field}) => <AaSelect defaultValue={field.value ?? ''} onChange={_ => field.onChange({target: {value: _}} as any)} options={budgetLines}/>}
        />
      </ListRow>
      <ListRow icon={''} border label={m.mpca.budgetLineMPCA}>
        <Controller
          name="budgetLineMPCA"
          defaultValue={tool.budgetLineMPCA}
          control={control}
          render={({field}) => <AaSelect defaultValue={field.value ?? ''} onChange={_ => field.onChange({target: {value: _}} as any)} options={budgetLines}/>}
        />
      </ListRow>
      <ListRow icon={''} label={m.mpca.budgetLineStartUp}>
        <Controller
          name="budgetLineStartUp"
          defaultValue={tool.budgetLineStartUp}
          control={control}
          render={({field}) => <AaSelect defaultValue={field.value ?? ''} onChange={_ => field.onChange({target: {value: _}} as any)} options={budgetLines}/>}
        />
      </ListRow>
    </>
  )

}