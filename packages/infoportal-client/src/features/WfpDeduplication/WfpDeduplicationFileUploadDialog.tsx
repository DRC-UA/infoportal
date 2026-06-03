import {useCallback, useMemo, useState, type FC, type SetStateAction, type Dispatch} from 'react'
import {useDropzone} from 'react-dropzone'
import {match} from '@axanc/ts-utils'
import {Box, Button, Chip, Dialog, Stack, Stepper, Step, StepButton} from '@mui/material'

import {DrcOffice} from 'infoportal-common'

import {useI18n} from '@/core/i18n'
import {SelectDrcOffice} from '@/shared/customInput/SelectDrcOffice'

type WpfDeduplicationFileUploadDialogProps = {
  open: boolean
  onClose(): void
  onReset(): void
  enableOfficeSelection: boolean
  drcOffice: DrcOffice | undefined
  setDrcOffice: Dispatch<SetStateAction<DrcOffice | undefined>>
  files: File[]
  setFiles: Dispatch<SetStateAction<File[]>>
  onUpload(): Promise<void>
}

const acceptedFilePatterns = ['deduplication_result_', 'transaction_result_']

const WpfDeduplicationFileUploadDialog: FC<WpfDeduplicationFileUploadDialogProps> = ({
  open,
  onClose,
  onReset,
  enableOfficeSelection,
  drcOffice,
  setDrcOffice,
  files,
  setFiles,
  onUpload,
}) => {
  const {m} = useI18n()
  const [currentStep, setCurrentStep] = useState(0)
  const totalSteps = () => m.uploadFilesModal.steps.length
  const isLastStep = () => currentStep === totalSteps() - 1
  const onDrop = useCallback(
    (newFiles: File[]) =>
      setFiles((filesBefore) => {
        const allFiles = [...filesBefore, ...newFiles]
        const uniqueFileNames = Array.from(new Set(allFiles.map(({name}) => name)))

        return uniqueFileNames.map((fileName) => allFiles.find(({name}) => name === fileName)!)
      }),
    [setFiles],
  )
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: {
      'text/csv': [],
    },
  })

  const handleDelete = (index: number) => () => setFiles((files) => files.filter((_, i) => i !== index))

  const handleNext = () => setCurrentStep(isLastStep() ? currentStep : currentStep + 1)

  const handleBack = () => setCurrentStep((prevActiveStep) => prevActiveStep - 1)

  const handleStep = (step: number) => () => setCurrentStep(step)

  const handleReset = () => {
    onReset()
    setCurrentStep(0)
  }

  const isValid = useMemo(() => {
    if (files.length !== 2) return false
    if (!acceptedFilePatterns.every((pattern) => files.some(({name}) => name.includes(pattern)))) return false

    return true
  }, [files])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onTransitionExited={handleReset}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{paper: {sx: {minWidth: '30vw'}}}}
    >
      <Stack direction="column" display="flex" justifyContent="space-between" p={2} minHeight={200}>
        <Stepper nonLinear activeStep={currentStep} sx={{mb: 2}}>
          {m.uploadFilesModal.steps.map((label, index) => (
            <Step key={label}>
              <StepButton aria-controls="stepper-content" color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Stack paddingInline={1} minHeight="25vh" justifyContent="center" flexDirection="row" gap={2}>
          {match(currentStep)
            .cases({
              0: (
                <SelectDrcOffice
                  sx={{maxWidth: 300, alignSelf: 'center'}}
                  disabled={!enableOfficeSelection}
                  value={drcOffice}
                  onChange={(office) => {
                    setDrcOffice(office ?? undefined)
                  }}
                />
              ),
              1: (
                <>
                  <Stack
                    flex={1}
                    flexGrow={1}
                    gap={0.5}
                    justifyContent="center"
                    alignItems="center"
                    sx={{bgcolor: isDragActive ? 'action.hover' : 'background.paper'}}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    {files.length === 0
                      ? m.dropZonePlaceholder
                      : files.map(({name}, index) => (
                          <Chip key={name} size="small" label={name} onDelete={handleDelete(index)} />
                        ))}
                  </Stack>
                </>
              ),
            })
            .exhaustive()}
        </Stack>
        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
          <Button color="inherit" disabled={currentStep === 0} onClick={handleBack}>
            {m.uploadFilesModal.buttonLabels.back}
          </Button>
          <Box sx={{flex: '1 1 auto'}} />
          <Button onClick={isLastStep() ? onUpload : handleNext} disabled={(isLastStep() && !isValid) ?? false}>
            {isLastStep() ? m.uploadFilesModal.buttonLabels.uploadFiles : m.uploadFilesModal.buttonLabels.next}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  )
}

export default WpfDeduplicationFileUploadDialog
