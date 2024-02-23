import {useAppSettings} from '../core/context/ConfigContext'
import React from 'react'
import {useSession} from '@/core/Session/SessionContext'
import {ChartBar} from '@/shared/charts/ChartBar'
import {PanelFeatures} from '@/shared/Panel/PanelFeatures'
import {Box} from '@mui/material'
import {Obj, seq} from '@alexandreannic/ts-utils'
import {makeChartData} from '@/shared/charts/chartHelper'

const improved = seq([
  4,
  4,
  4,
  4,
  2,
  5,
  3,
  5,
  1,
  5,
  3,
  3,
  3,
  3,
  2,
  4,
  3,
  4,
  4,
  4,
  5,
  5,
  3,
  5,
  4,
  5,
  3,
  5,
  4,
  4,
  4,
  4,
  5,
  4,
  4,
  3,
  4,
  3,
  4,
  5,
  3,
  3,
  5,
  5,
  5,
  5,
  4,
  2,
  3,
  5,
  4,
  4,
  3,
  5,
  5,
  3,
  4,
  5,
  4,
  3,
  3,
  3,
  5,
  5,
  4,
  4,
  5,
  3,
]).map(_ => {
  if (_ === 1 || _ === 2) return '👎 Significantly hindered my ability'
  if (_ === 5 || _ === 4) return '👍 A lot - Makes my life easier'
}).compact()

const bugs = seq([
  1,
  2,
  1,
  4,
  1,
  4,
  1,
  3,
  1,
  3,
  2,
  4,
  4,
  1,
  4,
  3,
  3,
  2,
  1,
  3,
  1,
  3,
  2,
  2,
  1,
  1,
  4,
  1,
  1,
  1,
  1,
  1,
  4,
  4,
  3,
  2,
  2,
  3,
  1,
  1,
  1,
  3,
  1,
  2,
  2,
  2,
  2,
  1,
  1,
  2,
  2,
  3,
  1,
  2,
  4,
  3,
  5,
  3,
  4,
  1,
  3,
  2,
  2,
  3,
  2,
  1,
  1,
]).map(_ => {
  _ = 6 - _
  if (_ === 1 || _ === 2) return '👎 A lot - Looks like Microsoft apps'
  if (_ === 5 || _ === 4) return '👍 All working fine'
}).compact()

const satisfaction = seq([
  4,
  3,
  4,
  4,
  3,
  5,
  4,
  4,
  3,
  5,
  3,
  5,
  3,
  3,
  3,
  3,
  3,
  3,
  4,
  5,
  4,
  5,
  4,
  4,
  5,
  5,
  5,
  4,
  5,
  4,
  5,
  5,
  4,
  4,
  4,
  4,
  4,
  5,
  5,
  4,
  4,
  4,
  3,
  5,
  5,
  4,
  3,
  4,
  5,
  4,
  4,
  4,
  5,
  5,
  3,
  3,
  3,
  5,
  3,
  3,
  3,
  5,
  5,
  4,
  4,
  5,
  5,

  // dummy just to display label
  1,
  2,
]).map(_ => {
  if (_ === 1 || _ === 2) return '🙁 Dissatisfied'
  if (_ === 5 || _ === 4) return '🙂 Satisfied'
}).compact()

const currentFeatures = [
  `Yes, they meet all my needs`,
  `No, I often need to download data as Excel for further analysis or use`,
  `No, I often need to download data as Excel for further analysis or use`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `No, I often need to download data as Excel for further analysis or use`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `No, I often need to download data as Excel for further analysis or use`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `No, I often need to download data as Excel for further analysis or use`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `No, I often need to download data as Excel for further analysis or use`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `No, I often need to download data as Excel for further analysis or use`,
  `Yes, they meet all my needs`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `No, I often need to download data as Excel for further analysis or use`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `No, I often need to download data as Excel for further analysis or use`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `Mostly sufficient, but some improvements are needed`,
  `Yes, they meet all my needs`,
].map(_ => {
  if (_ === 'Yes, they meet all my needs')
    return '1 - Yes, they meet all my needs'
  if (_ === 'Mostly sufficient, but some improvements are needed')
    return '2 - Mostly, some improvements needed'
  if (_ === 'No, I often need to download data as Excel for further analysis or use')
    return '3 - No, often need to download as Excel'
  return _
})

export const Sandbox = () => {
  const {session} = useSession()
  const {api} = useAppSettings()
  return (
    <>
      <Box sx={{maxWidth: 400, m: 3, p: 1}}>
        <PanelFeatures savableAsImg>
          <ChartBar data={new Obj(seq(bugs).groupBy(_ => _))
            .mapValues(_ => makeChartData({value: _.length}))
            // .sort((a, b) => b[0].toString().localeCompare(a[0].toString()))
            .get()}/>
        </PanelFeatures>
      </Box>
      <Box sx={{maxWidth: 400, m: 3, p: 1}}>
        <PanelFeatures savableAsImg>
          <ChartBar data={new Obj(seq(improved).groupBy(_ => _))
            .mapValues(_ => makeChartData({value: _.length}))
            // .sort((a, b) => b[0].toString().localeCompare(a[0].toString()))
            .get()}/>
        </PanelFeatures>
      </Box>
      <Box sx={{maxWidth: 400, m: 3, p: 1}}>
        <PanelFeatures savableAsImg>
          <ChartBar data={new Obj(seq(satisfaction).groupBy(_ => _))
            .map((k, v) => [k, k.toString().startsWith('1') || k.toString().startsWith('2') ? 0 : v.length])
            .mapValues(_ => makeChartData({value: _}))
            // .sort((a, b) => b[0].toString().localeCompare(a[0].toString()))
            .get()}/>
        </PanelFeatures>
      </Box>
      <Box sx={{maxWidth: 400, m: 3, p: 1}}>
        <PanelFeatures savableAsImg>
          <ChartBar data={new Obj(seq(currentFeatures).groupBy(_ => _))
            .mapValues(_ => makeChartData({label: _[0], value: _.length}))
            // .sort((a, b) => b[0].toString().localeCompare(a[0].toString()))
            .get()}/>
        </PanelFeatures>
      </Box>
      <Box sx={{maxWidth: 400, m: 3, p: 1}}>
        <PanelFeatures savableAsImg>
          <ChartBar hideValue data={{
            'Yes': {
              label: 'Yes',
              desc: 'I needed training to use the app effectively',
              value: 34.3
            },
            '50/50': {
              label: '50/50',
              desc: 'Some aspects are intuitive, but training would help',
              value: 41.4,
            },
            'No': {
              label: 'No',
              desc: 'I was able to use the app effectively without training',
              value: 24.3
            },
          }
          }/>
        </PanelFeatures>
      </Box>
      <iframe width="1000" height="900" src="http://localhost:5001/kobo-api/4820279f-6c3d-47ba-8afe-47f86b16ab5d/aF54Rx9hYxzNvETTS8W5vN/441921023/edit-url"/>
    </>
  )
}