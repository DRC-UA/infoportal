import {Enum, Seq, seq} from '@alexandreannic/ts-utils'
import {Box} from '@mui/material'
import {ScRadioGroup, ScRadioGroupItem} from '@/shared/RadioGroup'
import {IpSelectMultiple} from '@/shared/Select/SelectMultiple'
import {Lazy} from '@/shared/Lazy'
import {format} from 'date-fns'
import {ChartLine} from '@/shared/charts/ChartLine'
import {SlidePanel} from '@/shared/PdfLayout/PdfSlide'
import React, {useEffect, useState} from 'react'
import {Messages} from '@/core/i18n/localization/en'
import {useEffectFn} from '@alexandreannic/react-hooks-lib'
import {useI18n} from '@/core/i18n'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useIpToast} from '@/core/useToast'
import {useFetcher} from '@/shared/hook/useFetcher'

interface MinusRusData {
  aircraft: number
  armored_combat_vehicles: number
  artillery: number
  prisoners: number
  killed: number
  ships_boats: number
  tanks: number
  component: 'losses'
  date: Date
  helicopters: number
  id: number
  wounded: number
  _uid: string
}

const parseMinusRus = (htmlPage: string) => {
  let fix20231224WrongDate = 0
  const mapped = (evalScript(htmlPage).state.sortedStoriesByDateDESC as any[])
    .map(_ => _.content as MinusRusData)
    .map((_) => {
      if (format(new Date(_.date), 'yyyy-MM-dd') === '2023-12-25') {
        fix20231224WrongDate++
        if (fix20231224WrongDate === 2)
          _.date = new Date(2023, 11, 24)
      }
      return {
        ..._,
        aircraft: +_.aircraft,
        armored_combat_vehicles: +_.armored_combat_vehicles,
        artillery: +_.artillery,
        helicopters: +_.helicopters,
        wounded: +_.wounded,
        prisoners: +_.prisoners,
        killed: +_.killed,
        ships_boats: +_.ships_boats,
        tanks: +_.tanks,
        date: new Date(_.date),
      }
    })
  return seq(mapped)
}

const evalScript = (htmlPage: string) => {
  const container = document.createElement('div')
  container.innerHTML = htmlPage
  const scripts = container.querySelectorAll('script')
  const dataScript = scripts.item(2)
  const code = dataScript.innerHTML.replaceAll('window.__NUXT__=', '')
  return eval(code)
}

const minusResKeys: Seq<keyof Messages['safety']['minusRusLabel']> = seq([
  'prisoners',
  'killed',
  'aircraft',
  'armored_combat_vehicles',
  'artillery',
  'helicopters',
  'wounded',
  'ships_boats',
  'tanks',
])

export const MinusRusChartPanel = () => {
  const {api} = useAppSettings()
  const {toastError} = useIpToast()
  const {m} = useI18n()
  const fetcherMinusRus = useFetcher(() => api.proxyRequest('GET', 'https://russialoses-dev.herokuapp.com')
    .then(parseMinusRus) as Promise<Seq<MinusRusData>>)

  const [minusRusDateFormat, setMinusRusDateFormat] = useState<string>('yyyy-MM-dd')
  const [minusRusCurveType, setMinusRusCurveType] = useState<'relative' | 'cumulative'>('relative')
  const [minusRusCurves, setMinusRusCurves] = useState<{
    prisoners: boolean
    killed: boolean
    aircraft: boolean
    armored_combat_vehicles: boolean
    artillery: boolean
    helicopters: boolean
    wounded: boolean
    ships_boats: boolean
    tanks: boolean
  }>({
    prisoners: false,
    killed: true,
    aircraft: false,
    armored_combat_vehicles: false,
    artillery: false,
    helicopters: false,
    wounded: false,
    ships_boats: false,
    tanks: false,
  })

  useEffect(() => {
    fetcherMinusRus.fetch()
  }, [])

  useEffectFn(fetcherMinusRus.error, () => toastError('Failed to parse minusrus.com'))

  return (
    <SlidePanel title={m.safety.minusRusTitle}>
      {/*<Txt block dangerouslySetInnerHTML={{__html: m._dashboardSafetyIncident.dataTakenFromMinusRus}}/>*/}
      <Box sx={{my: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <ScRadioGroup inline dense value={minusRusCurveType} onChange={setMinusRusCurveType}>
          <ScRadioGroupItem hideRadio value="relative">{m.relative}</ScRadioGroupItem>
          <ScRadioGroupItem hideRadio value="cumulative">{m.cumulative}</ScRadioGroupItem>
        </ScRadioGroup>
        <ScRadioGroup inline dense value={minusRusDateFormat} onChange={setMinusRusDateFormat}>
          <ScRadioGroupItem hideRadio value="yyyy-MM-dd">{m.daily}</ScRadioGroupItem>
          <ScRadioGroupItem hideRadio value="yyyy-MM">{m.monthly}</ScRadioGroupItem>
        </ScRadioGroup>
        <IpSelectMultiple
          sx={{width: 200}}
          options={minusResKeys.map(_ => ({value: _, children: m.safety.minusRusLabel[_]}))}
          value={minusResKeys.filter(_ => minusRusCurves[_])}
          onChange={e => {
            setMinusRusCurves(prev => {
              Enum.keys(prev).forEach(_ => {
                if (e.includes(_)) prev[_] = true
                else prev[_] = false
              })
              return {...prev}
            })
          }}
        />
      </Box>

      <Lazy deps={[fetcherMinusRus.get, minusRusDateFormat, minusRusCurveType, minusRusCurves]} fn={() => {
        if (!fetcherMinusRus.get) return
        const gb = fetcherMinusRus.get?.sortByNumber(_ => _.date.getTime()).groupBy(_ => format(_.date, minusRusDateFormat))
        const res = Enum.entries(gb).map(([k, v]) => {
          return {
            name: k,
            ...Enum.entries(minusRusCurves).filter(([curveK, isEnabled]) => isEnabled).reduce((acc, [curveK]) => ({
              ...acc,
              [curveK]: v.sum(_ => _[curveK])
            }), {}),
          }
        })
        if (minusRusCurveType === 'cumulative') return res
        return res.filter((_, i) => i > 0).map((_, i) => ({
          ..._,
          ...Enum.entries(minusRusCurves).filter(([k, v]) => v).reduce((acc, [k]) => ({
            ...acc,
            // @ts-ignore
            [k]: _[k] - res[i][k]
          }), {}),
        }))
      }}>
        {_ => (
          <ChartLine
            loading={fetcherMinusRus.loading}
            hideLabelToggle
            height={280}
            data={_ as any}
            translation={m.safety.minusRusLabel}/>
        )}
      </Lazy>
    </SlidePanel>
  )
}