import {Theme} from '@mui/material'
import {Pdf} from '@/shared/PdfLayout/PdfLayout'
import {SnapshotMonitoSample} from '@/features/Snapshot/SnapshotGbvSurvey/SnapshotGbvMonitoSample'
import {SnapshotMonitoSample2} from '@/features/Snapshot/SnapshotGbvSurvey/SnapshotGbvMonitoSample2'
import React from 'react'

export const snapshotColors = (t: Theme) => [
  '#8884d8',
  '#8dd1e1',
  '#82ca9d',
  '#a4de6c',
  '#d0ed57',
  '#ffc658',
  '#ff8042',
  '#ffbb28',
  '#ff9999',
  '#ff4d4d',
  '#4d79ff',
  '#9933ff',
]

export const SnapshotGbvMonito = () => {
  return (
    <Pdf>
      <SnapshotMonitoSample />
      <SnapshotMonitoSample2 />
    </Pdf>
  )
}
