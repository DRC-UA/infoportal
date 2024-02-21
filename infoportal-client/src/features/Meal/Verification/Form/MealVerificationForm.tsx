import {useAppSettings} from '@/core/context/ConfigContext'
import React, {ReactNode} from 'react'
import {Page} from '@/shared/Page'
import {Box, Icon, Step, StepContent, StepLabel, Stepper, useTheme} from '@mui/material'
import {useI18n} from '@/core/i18n'
import {KoboIndex} from '@infoportal-common'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {Controller, useForm} from 'react-hook-form'
import {MealVerificationFormData} from '@/features/Meal/Verification/Form/MealVerificationFormData'
import {IpBtn, IpBtnProps} from '@/shared/Btn'
import {IpInput} from '@/shared/Input/Input'
import {Panel, PanelBody} from '@/shared/Panel'
import {KoboAnswerId} from '@/core/sdk/server/kobo/Kobo'
import {SheetFilterValue} from '@/shared/Sheet/util/sheetType'
import {Txt} from 'mui-extension'
import {useAsync} from '@/shared/hook/useAsync'
import {useEffectFn, useMemoFn} from '@alexandreannic/react-hooks-lib'
import {useIpToast} from '@/core/useToast'
import {MealVerificationAnsers, MealVerificationAnswersStatus} from '@/core/sdk/server/mealVerification/MealVerification'
import {useNavigate} from 'react-router'
import {mealVerificationActivities, mealVerificationActivitiesIndex, mealVerificationConf} from '@/features/Meal/Verification/mealVerificationConfig'
import {mealIndex} from '@/features/Meal/Meal'

export interface MealVerificationForm {
  activity: string
  name: string
  desc?: string
  filters: Record<KoboAnswerId, SheetFilterValue>
  answerIds: KoboAnswerId[]
}

const RenderRow = ({icon, label, children}: {
  icon?: string
  label: ReactNode
  children: ReactNode
}) => {
  return (
    <Box sx={{display: 'flex'}}>
      <Box sx={{width: 30, textAlign: 'center', mr: 1}}>
        {icon && <Icon color="disabled">{icon}</Icon>}
      </Box>
      <Box sx={{mb: 2}}>
        <Txt bold block sx={{mr: 2, mb: .5}}>{label}</Txt>
        <Txt block color="hint">{children}</Txt>
      </Box>
    </Box>
  )
}

export const MealVerificationForm = () => {
  const {api} = useAppSettings()
  const {m} = useI18n()
  const {toastHttpError, toastSuccess} = useIpToast()
  const [activeStep, setActiveStep] = React.useState(0)
  const t = useTheme()
  const navigate = useNavigate()

  const asyncCreate = useAsync(api.mealVerification.create)
  useEffectFn(asyncCreate.error, toastHttpError)

  const nextStep = () => {
    setActiveStep(_ => _ + 1)
  }
  const prevStep = () => {
    setActiveStep(_ => Math.max(0, _ - 1))
  }

  const form = useForm<MealVerificationForm>()

  const BackBtn = ({}: {}) => (
    <IpBtn
      onClick={prevStep}
      sx={{mt: 1, mr: 1}}
    >
      {m.back}
    </IpBtn>
  )

  const NextBtn = ({
    disabled,
    label,
    ...props
  }: {
    label?: string
  } & IpBtnProps) => (
    <IpBtn
      disabled={disabled}
      variant="contained"
      onClick={nextStep}
      {...props}
      sx={{mt: 1, mr: 1}}
    >
      {label ?? m.continue}
    </IpBtn>
  )

  const submit = async ({answerIds, ...form}: MealVerificationForm) => {
    try {
      const numElementsToSelect = Math.floor((mealVerificationConf.sampleSizeRatio) * answerIds.length)
      const answers: Omit<MealVerificationAnsers, 'id'>[] = answerIds
        .sort(() => Math.random() - 0.5)
        .map((a, i) => ({
          koboAnswerId: a,
          status: i <= numElementsToSelect - 1 ? MealVerificationAnswersStatus.Selected : undefined
        }))
      await asyncCreate.call({...form, answers})
      toastSuccess(m._mealVerif.requested)
      navigate(mealIndex.siteMap.verification._)
    } catch (e) {
    }
  }

  const activity = useMemoFn(form.watch('activity'), name => mealVerificationActivities.find(_ => _.name === name))

  return (
    <Page>
      <Panel title={m._mealVerif.requestTitle}>
        <PanelBody>
          <Stepper nonLinear activeStep={activeStep} orientation="vertical">
            <Step completed={!!form.watch('activity')}>
              <StepLabel>{m.selectForm}</StepLabel>
              <StepContent>
                <Controller
                  name="activity"
                  rules={{required: {value: true, message: m.required}}}
                  control={form.control}
                  render={({field}) => (
                    <ScRadioGroup {...field} dense onChange={id => {
                      if (id) nextStep()
                      field.onChange(id)
                    }}>
                      {mealVerificationActivities.map(activity =>
                        <ScRadioGroupItem
                          key={activity.name}
                          value={activity.name}
                          title={KoboIndex.searchById(mealVerificationActivitiesIndex[activity.name].registration.koboFormId)?.translation}
                        />
                      )}
                    </ScRadioGroup>
                  )}
                />
                <Box sx={{my: 1}}>
                  <NextBtn disabled={!activity}/>
                </Box>
              </StepContent>
            </Step>
            <Step completed={!!form.watch('answerIds')}>
              <StepLabel>{m.selectData}</StepLabel>
              <StepContent>
                <Txt color="hint" sx={{mb: 1}}>{m._mealVerif.applyFilters}</Txt>
                {activity && (
                  <MealVerificationFormData
                    activity={activity}
                    onDataChange={_ => form.setValue('answerIds', _)}
                    onFiltersChange={_ => form.setValue('filters', _)}
                  />
                )}
                <Box sx={{mb: 1}}>
                  <NextBtn disabled={form.watch('answerIds')?.length === undefined} label={m._mealVerif.selectedNRows(form.watch('answerIds')?.length ?? '-')}/>
                  <BackBtn/>
                </Box>
              </StepContent>
            </Step>
            <Step completed={!!form.watch('name')}>
              <StepLabel>{m.details}</StepLabel>
              <StepContent>
                <Controller
                  name="name"
                  rules={{required: {value: true, message: m.required}}}
                  control={form.control}
                  render={({field}) => (
                    <IpInput {...field} label={m._mealVerif.giveANameToId}/>
                  )}
                />
                <Controller
                  name="desc"
                  control={form.control}
                  render={({field}) => (
                    <IpInput multiline maxRows={8} minRows={3} {...field} label={m._mealVerif.giveDetails}/>
                  )}
                />
                <Box sx={{mb: 1}}>
                  <NextBtn disabled={!form.watch('name')}/>
                  <BackBtn/>
                </Box>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>{m.recap}</StepLabel>
              <StepContent>
                <RenderRow icon="info" label={form.watch('name')}>
                  {form.watch('desc')}
                </RenderRow>
                {activity && (
                  <RenderRow label={m._mealVerif.selectedKoboForm} icon="fact_check">
                    <Txt bold block size="big">{activity.name}</Txt>
                    <Txt block>
                      {m._mealVerif.koboForm}:&nbsp;
                      <Box component="span" sx={{fontFamily: 'monospace'}}>{KoboIndex.searchById(activity.registration.koboFormId)?.translation}</Box>
                    </Txt>
                  </RenderRow>
                )}
                <RenderRow label={m.filters} icon="filter_alt">
                  <Txt bold block size="small">
                    <pre>{JSON.stringify(form.watch('filters'), null, 2)}</pre>
                  </Txt>
                </RenderRow>
                <RenderRow label={m.data} icon="table_view">
                  <Box dangerouslySetInnerHTML={{__html: m._mealVerif.selectedData(form.watch().answerIds?.length)}}/>
                  <Box sx={{mt: .5}}>
                    <Icon color="disabled" sx={{verticalAlign: 'top', mr: 1}}>subdirectory_arrow_right</Icon>
                    {m._mealVerif.sampleSizeN(mealVerificationConf.sampleSizeRatio * 100)}
                    <Icon color="disabled" sx={{verticalAlign: 'top', mx: 1}}>east</Icon>
                    <Txt sx={{borderRadius: 1000, border: '1px solid ' + t.palette.success.light, py: .5, px: 1, color: t.palette.success.main}}
                         dangerouslySetInnerHTML={{
                           __html: m._mealVerif.dataToBeVerified(
                             Math.floor(mealVerificationConf.sampleSizeRatio * form.watch().answerIds?.length)
                           )
                         }}/>
                  </Box>
                </RenderRow>

                <Box sx={{mb: 1}}>
                  <NextBtn label={m.submit} loading={asyncCreate.loading} disabled={!form.formState.isValid} onClick={form.handleSubmit(submit)}/>
                  <BackBtn/>
                </Box>
              </StepContent>
            </Step>
          </Stepper>
        </PanelBody>
      </Panel>
    </Page>
  )
}
