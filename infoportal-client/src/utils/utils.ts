import {addMonths, differenceInMonths, isAfter, isBefore, startOfMonth} from 'date-fns'
import {isValidElement, ReactNode} from 'react'

export namespace Utils {

  export const extractInnerText = (node: ReactNode): string => {
    if (typeof node === 'string') {
      return node
    }
    if (!node || !isValidElement(node) || !node.props || !node.props.children) {
      return ''
    }
    if (Array.isArray(node.props.children)) {
      return node.props.children.map(extractInnerText).join('')
    }
    return extractInnerText(node.props.children)
  }

  export const getOverlapMonths = (startDate1: Date, endDate1: Date, startDate2: Date, endDate2: Date) => {
    const start1 = startOfMonth(startDate1)
    const end1 = startOfMonth(endDate1)
    const start2 = startOfMonth(startDate2)
    const end2 = startOfMonth(endDate2)

    const overlapStart = isBefore(start1, start2) ? start2 : start1
    const overlapEnd = isAfter(end1, end2) ? end2 : end1

    const overlapMonths = differenceInMonths(addMonths(overlapEnd, 1), overlapStart)

    return overlapMonths > 0 ? overlapMonths : 0
  }

  export const downloadBufferAsFile = (buffer: Buffer, filename: string) => {
    const _ = document.createElement('a')
    const content = new Blob([buffer])
    const encodedUri = window.URL.createObjectURL(content)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', filename)
    link.click()
  }

  export const downloadStringAsFile = (stringData: string, fileName: string) => {
    const _ = document.createElement('a')
    _.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringData))
    _.setAttribute('download', fileName)
    _.click()
  }

  export const openCanvasInNewTab = (canvas: HTMLCanvasElement, name: string) => {
    setTimeout(() => {
      // w.document.write('<static src="' + canvas.toDataURL('png') + '" />')
      canvas.toBlob((blob) => {
        const w = window.open(URL.createObjectURL(blob!), '_blank')!
        w.document.title = name
      })
      document.body.appendChild(canvas)
    }, 1000)
  }
}
