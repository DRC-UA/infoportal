import {Icon, styled, Tooltip} from '@mui/material'

const ImageDiv = styled('div', {shouldForwardProp: (prop) => prop !== 'size' && prop !== 'url'})<{
  size: number
  url: string
}>(({theme, size, url}) => ({
  display: 'inline-block',
  backgroundImage: `url(${url})`,
  borderRadius: '6px',
  backgroundColor: theme.palette.divider,
  '&:hover': {
    transform: 'scale(1.2)',
    boxShadow: theme.shadows[4],
  },
  backgroundSize: 'cover',
  verticalAlign: 'middle',
  transition: theme.transitions.create('all'),
  height: size,
  width: size,
}))

const SizedTooltip = styled('div', {
  shouldForwardProp: (prop) => prop !== 'tooltipSize' && prop !== 'url',
})<{tooltipSize: number; url: string}>(({tooltipSize, url}) => ({
  common: {
    display: 'inline-block',
    backgroundImage: `url(${url})`,
    borderRadius: '6px',
  },
  tooltip: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: tooltipSize,
    width: tooltipSize,
  },
}))

const NoImageIcon = styled(Icon)<{size: number}>(({size}) => ({
  verticalAlign: 'middle',
  height: size - 4,
  width: size,
  fontSize: size - 4,
}))

export const TableImg = ({
  url = '',
  size = 30,
  tooltipSize,
}: {
  tooltipSize?: number | null
  size?: number
  url?: string
}) =>
  url ? (
    <Tooltip
      enterDelay={340}
      placement="bottom"
      title={tooltipSize && <SizedTooltip tooltipSize={tooltipSize} url={url} />}
    >
      <a href={url} target="_blank">
        <ImageDiv size={size} url={url} />
      </a>
    </Tooltip>
  ) : (
    <NoImageIcon color="disabled" size={size}>
      hide_image
    </NoImageIcon>
  )
