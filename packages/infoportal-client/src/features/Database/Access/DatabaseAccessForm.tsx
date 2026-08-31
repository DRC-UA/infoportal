import {ReactElement, useCallback, useMemo} from 'react'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {map, seq} from '@axanc/ts-utils'
import {Autocomplete, Box, Button, Chip, createFilterOptions, Icon} from '@mui/material'
import {Kobo} from 'kobo-sdk'
import {Controller, useForm, useFieldArray} from 'react-hook-form'

import {KoboSchemaHelper, KoboCustomDirective, nullValuesToUndefined} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {AppFeatureId} from '@/features/appFeatureId'
import {Modal, Txt} from '@/shared'
import {KoboDatabaseAccessParams} from '@/core/sdk/server/access/Access'
import {useI18n} from '@/core/i18n'
import {useIpToast} from '@/core/useToast'
import {AccessForm, IAccessForm} from '@/features/Access/AccessForm'
import {AccessFormSection} from '@/features/Access/AccessFormSection'
import {DirectiveTemplate, koboIconMap} from '@/features/Database/KoboTable/columns/columnBySchema'
import {TableIconBtn} from '@/features/Mpca/MpcaData/TableIcon'
import {useAsync} from '@/shared/hook/useAsync'
import {useFetcher} from '@/shared/hook/useFetcher'
import {IpInput} from '@/shared/Input/Input'

interface Form extends IAccessForm {
  filters?: {
    question?: string
    answer?: string | string[]
  }[]
}

export const DatabaseAccessForm = ({
  formId,
  children,
  form,
  onAdded,
}: {
  onAdded?: () => void
  children: ReactElement
  formId: Kobo.FormId
  form: Kobo.Form
}) => {
  const langIndex = 0
  const survey = form.content.survey

  const {m} = useI18n()
  const {toastHttpError} = useIpToast()
  const {api} = useAppSettings()

  const _addAccess = useAsync(api.access.create)
  const requestInConstToFixTsInference = (databaseId: Kobo.FormId) =>
    api.access
      .search({featureId: AppFeatureId.kobo_database})
      .then((_) => _.filter((_) => _.params?.koboFormId === databaseId))
  const _access = useFetcher(requestInConstToFixTsInference)

  useEffectFn(_addAccess.error, toastHttpError)
  useEffectFn(_access.error, toastHttpError)

  const accessForm = useForm<Form>()

  const {indexQuestion, indexOptionsByListName, indexOptionsByName} = useMemo(() => {
    return {
      indexQuestion: seq(survey)
        .compactBy('name')
        .groupByFirst((_) => _.name),
      indexOptionsByListName: seq(form.content.choices).groupBy((_) => _.list_name),
      indexOptionsByName: seq(form.content.choices).groupByFirst((_) => _.name),
    }
  }, [form])

  const questions = useMemo(() => {
    return map(survey, (schema) =>
      schema.filter(
        (_) => _.type === 'calculate' || _.type === 'text' || _.type === 'select_multiple' || _.type === 'select_one',
      ),
    )
  }, [survey])

  const filterOptions = useCallback(
    (
      index: Record<
        string,
        {
          name: string
          label?: string[]
        }
      >,
    ) =>
      createFilterOptions({
        stringify: (optionName: string) => KoboSchemaHelper.getLabel(index[optionName], langIndex),
      }),
    [form],
  )

  const submit = ({selectBy, filters, ...f}: Form) => {
    _addAccess
      .call({
        ...nullValuesToUndefined(f),
        featureId: AppFeatureId.kobo_database,
        params: KoboDatabaseAccessParams.create({
          koboFormId: formId,
          filters: filters?.reduce<Record<string, string[]>>((accum, {question, answer}) => {
            if (!question || answer === undefined || answer === '' || (Array.isArray(answer) && answer.includes(''))) {
              return accum
            }

            return {
              ...accum,
              [question]: Array.isArray(answer) ? answer : [answer],
            }
          }, {}),
        }),
      })
      .then(onAdded)
  }

  const {
    fields: filterFields,
    append: appendFilter,
    remove: removeFilter,
  } = useFieldArray({
    control: accessForm.control,
    name: 'filters',
  })

  return (
    <Modal
      loading={_addAccess.loading}
      confirmDisabled={!accessForm.formState.isValid}
      onConfirm={(_, close) =>
        accessForm.handleSubmit((_) => {
          submit(_)
          close()
        })()
      }
      content={
        <Box sx={{width: 500}}>
          <AccessForm form={accessForm} />
          <AccessFormSection
            icon="filter_alt"
            label={m.filter}
            childrenBoxSx={{display: 'flex', flex: 1, flexDirection: 'column'}}
          >
            {filterFields.map((field, index) => {
              const questionName = accessForm.watch(`filters.${index}.question`)
              const question = questionName ? indexQuestion[questionName] : undefined

              return (
                <Box key={field.id} sx={{display: 'flex', gap: 1, alignItems: 'flex-start'}}>
                  <Box sx={{flex: 1}}>
                    <Controller
                      name={`filters.${index}.question`}
                      control={accessForm.control}
                      rules={{required: true}}
                      render={({field: {value, onChange, ...controllerField}, fieldState}) => (
                        <Autocomplete
                          {...controllerField}
                          value={value}
                          onInputChange={(event, newInputValue, reason) => {
                            if (reason === 'reset') {
                              onChange('')
                            } else {
                              onChange(newInputValue)
                            }
                          }}
                          filterOptions={filterOptions(indexQuestion)}
                          onChange={(_e, fieldValue) => {
                            onChange(fieldValue)
                          }}
                          loading={!questions}
                          options={
                            questions
                              ?.map((_) => _.name!)
                              .filter(
                                (field) =>
                                  !accessForm
                                    .getValues()
                                    .filters?.map(({question}) => question)
                                    .includes(field),
                              ) ?? []
                          }
                          renderInput={({InputProps, ...props}) => (
                            <IpInput
                              {...InputProps}
                              {...props}
                              label={m.question}
                              error={!!fieldState.error}
                              helperText={!!fieldState.error && m.required}
                            />
                          )}
                          renderOption={(props, option) => {
                            if (indexQuestion[option].name.startsWith(KoboCustomDirective.make('TRIGGER_EMAIL'))) {
                              const template = DirectiveTemplate.render.TRIGGER_EMAIL
                              return (
                                <Box component="li" {...props} key={option} sx={{color: template.color}}>
                                  <Icon color="disabled" sx={{mr: 1, color: template.color}}>
                                    {template.icon}
                                  </Icon>
                                  <div>
                                    <Txt bold block>
                                      {template.label(indexQuestion[option], m)}
                                    </Txt>
                                    <Txt color="disabled">{option}</Txt>
                                  </div>
                                </Box>
                              )
                            } else
                              return (
                                <Box component="li" {...props} key={option}>
                                  <Icon color="disabled" sx={{mr: 1}}>
                                    {koboIconMap[indexQuestion[option].type]}
                                  </Icon>
                                  <div>
                                    <Txt block>
                                      {KoboSchemaHelper.getLabel(indexQuestion[option], langIndex).replace(
                                        /<[^>]+>/g,
                                        '',
                                      ) ?? option}
                                    </Txt>
                                    <Txt color="disabled">{option}</Txt>
                                  </div>
                                </Box>
                              )
                          }}
                        />
                      )}
                    />

                    {question?.type === 'select_one' || question?.type === 'select_multiple' ? (
                      <Controller
                        name={`filters.${index}.answer`}
                        control={accessForm.control}
                        rules={{required: true}}
                        render={({field: {onChange, value: fieldValue, ...controllerField}, fieldState}) => {
                          const listName = question.select_from_list_name
                          const options = indexOptionsByListName[listName!] ?? []

                          return (
                            <Autocomplete
                              {...controllerField}
                              onReset={() => {
                                onChange(undefined)
                              }}
                              freeSolo
                              filterOptions={filterOptions(indexOptionsByName)}
                              multiple
                              onChange={(_e, fieldValue) => _e && onChange(fieldValue)}
                              loading={!questions}
                              disableCloseOnSelect
                              options={options?.map((_) => _.name) ?? []}
                              // options={options?.map(_ => ({children: KoboSchemaHelper.getLabel(_, langIndex), value: _.name}))}
                              renderInput={({InputProps, ...props}) => (
                                <IpInput
                                  {...InputProps}
                                  {...props}
                                  label={m.answer}
                                  error={!!fieldState.error}
                                  helperText={fieldState.error && m.required}
                                />
                              )}
                              renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                  // eslint-disable-next-line react/jsx-key
                                  <Chip size="small" variant="outlined" label={option} {...getTagProps({index})} />
                                ))
                              }
                              renderOption={(props, option) => (
                                <Box component="li" {...props} key={option}>
                                  <div>
                                    <Txt block>
                                      {KoboSchemaHelper.getLabel(indexOptionsByName[option], langIndex).replace(
                                        /<[^>]+>/g,
                                        '',
                                      ) ?? option}
                                    </Txt>
                                    <Txt color="disabled">{option}</Txt>
                                  </div>
                                </Box>
                              )}
                            />
                          )
                        }}
                      />
                    ) : (
                      <Controller
                        name={`filters.${index}.answer`}
                        control={accessForm.control}
                        rules={{required: true}}
                        render={({field: controllerField}) => <IpInput {...controllerField} label={m.answer} />}
                      />
                    )}
                  </Box>
                  <TableIconBtn onClick={() => removeFilter(index)} children="delete" sx={{mt: 0.5}} />
                </Box>
              )
            })}
            <Button
              disabled={!accessForm.formState.isValid}
              variant="text"
              onClick={() => appendFilter({question: '', answer: ''})}
              sx={{marginInline: 'auto'}}
            >
              {m.addFilter}
            </Button>
          </AccessFormSection>
        </Box>
      }
    >
      {children}
    </Modal>
  )
}
