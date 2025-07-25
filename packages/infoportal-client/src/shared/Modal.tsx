import {cloneElement, useState, type EventHandler, type ReactElement, type ReactNode, type SyntheticEvent} from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  LinearProgress,
  type PaperProps,
} from '@mui/material'

export interface ModalProps extends Omit<DialogProps, 'children' | 'onClick' | 'open' | 'content'> {
  disabled?: boolean
  title?: string
  confirmLabel?: string
  cancelLabel?: string
  content?: ((content: () => void) => ReactNode) | ReactNode | string
  children: ReactElement<any>
  onOpen?: () => void
  onClose?: () => void
  onConfirm?: (event: SyntheticEvent<any>, close: () => void) => void
  confirmDisabled?: boolean
  onClick?: EventHandler<SyntheticEvent<any>>
  PaperProps?: Partial<PaperProps>
  loading?: boolean
  overrideActions?: (_: () => void) => ReactNode
}

export const Modal = ({
  overrideActions,
  children,
  title,
  content,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClick,
  onOpen,
  onClose,
  confirmDisabled,
  loading,
  ...props
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = () => {
    onOpen?.()
    setIsOpen(true)
  }

  const close = () => {
    onClose?.()
    setIsOpen(false)
  }

  const confirm = (event: SyntheticEvent<any>) => {
    if (onConfirm) onConfirm(event, close)
  }

  return (
    <>
      {cloneElement(children, {
        onClick: (event: SyntheticEvent<any>) => {
          if (children.props.onClick) children.props.onClick(event)
          if (onClick) onClick(event)
          open()
        },
      })}
      <Dialog open={isOpen} onClose={close} {...props}>
        {loading && (
          <LinearProgress
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
            }}
          />
        )}
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{typeof content === 'function' ? content(close) : content}</DialogContent>
        <DialogActions>
          {overrideActions ? (
            overrideActions(close)
          ) : (
            <>
              <Button color="primary" onClick={close}>
                {cancelLabel || 'Cancel'}
              </Button>
              {onConfirm && (
                <Button color="primary" onClick={confirm} disabled={confirmDisabled}>
                  {confirmLabel || 'Confirm'}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
