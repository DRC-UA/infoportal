import {Fragment, type FC} from 'react'
import {match, seq, Obj} from '@axanc/ts-utils'
import {TableBody, TableCell, TableHead, TableRow} from '@mui/material'

import {safeNumber, Person} from 'infoportal-common'

import {echoAgeGroups} from './tools'
import type {EchoPmKoiTableData} from './types'

const AnswersRow: FC<{answer: string; answerStats: Record<Person.Gender, Record<string, number>>}> = ({
  answer,
  answerStats,
}) => {
  const girls = safeNumber(answerStats?.Female?.['5 - 17'], 0)
  const women = safeNumber(answerStats?.Female?.['18 - 49'], 0)
  const olderWomen = safeNumber(answerStats?.Female?.['50+'], 0)
  const femalesWithDisabilities = safeNumber(answerStats?.Female?.Disability, 0)
  const boys = safeNumber(answerStats?.Male?.['5 - 17'], 0)
  const men = safeNumber(answerStats?.Male?.['18 - 49'], 0)
  const olderMen = safeNumber(answerStats?.Male?.['50+'], 0)
  const malesWithDisabilities = safeNumber(answerStats?.Male?.Disability, 0)
  const totalFemales = girls + women + olderWomen
  const totalMales = boys + men + olderMen
  const total = totalFemales + totalMales

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {answer}
      </TableCell>
      <TableCell>{girls}</TableCell>
      <TableCell>{women}</TableCell>
      <TableCell>{olderWomen}</TableCell>
      <TableCell>{femalesWithDisabilities}</TableCell>
      <TableCell>{boys}</TableCell>
      <TableCell>{men}</TableCell>
      <TableCell>{olderMen}</TableCell>
      <TableCell>{malesWithDisabilities}</TableCell>
      <TableCell>[ diversity group a ]</TableCell>
      <TableCell>[ diversity group b ]</TableCell>
      <TableCell>{totalFemales}</TableCell>
      <TableCell>{totalMales}</TableCell>
      <TableCell>{girls + boys}</TableCell>
      <TableCell>{women + men}</TableCell>
      <TableCell>{olderWomen + olderMen}</TableCell>
      <TableCell>{femalesWithDisabilities + malesWithDisabilities}</TableCell>
      <TableCell>{total}</TableCell>
    </TableRow>
  )
}

const EchoTableHead: FC<{sampleSizes?: EchoPmKoiTableData['sampleSizes']}> = ({sampleSizes}) => (
  <TableHead>
    <TableRow>
      <TableCell></TableCell>
      <TableCell colSpan={4}>Female</TableCell>
      <TableCell colSpan={4}>Male</TableCell>
      <TableCell colSpan={2}>Potential additional diversity groups</TableCell>
      <TableCell colSpan={6}>Subtotals</TableCell>
    </TableRow>
    <TableRow sx={{position: 'relative'}}>
      <TableCell></TableCell>
      {echoAgeGroups.map((echoAgeGroup) => (
        <TableCell
          key={`Female ${echoAgeGroup}`}
          title={`Sample size: ${safeNumber(sampleSizes?.[echoAgeGroup]?.['Female'], 0)}`}
        >
          {echoAgeGroup}
        </TableCell>
      ))}
      <TableCell>Living with disability</TableCell>
      {echoAgeGroups.map((echoAgeGroup) => (
        <TableCell
          key={`Male ${echoAgeGroup}`}
          title={`Sample size: ${safeNumber(sampleSizes?.[echoAgeGroup]?.['Male'], 0)}`}
        >
          {echoAgeGroup}
        </TableCell>
      ))}
      <TableCell>Living with disability</TableCell>
      <TableCell>Diversity group A</TableCell>
      <TableCell>Diversity group B</TableCell>
      <TableCell
        title={seq(
          Obj.entries(sampleSizes ?? ({} as Record<'5 - 17' | '18 - 49' | '50+', Record<Person.Gender, number>>))
            .filter(([age]) => echoAgeGroups.includes(age))
            .map(([_age, {Female}]) => Female),
        )
          .sum()
          .toString()}
      >
        Total Female
      </TableCell>
      <TableCell
        title={seq(
          Obj.entries(sampleSizes ?? ({} as Record<'5 - 17' | '18 - 49' | '50+', Record<Person.Gender, number>>))
            .filter(([age]) => echoAgeGroups.includes(age))
            .map(([_age, {Male}]) => Male),
        )
          .sum()
          .toString()}
      >
        Total Male
      </TableCell>
      <TableCell
        title={String(
          safeNumber(sampleSizes?.['5 - 17']?.['Female'], 0) + safeNumber(sampleSizes?.['5 - 17']?.['Male'], 0),
        )}
      >
        Total 5-17 years
      </TableCell>
      <TableCell
        title={String(
          safeNumber(sampleSizes?.['18 - 49']?.['Female'], 0) + safeNumber(sampleSizes?.['18 - 49']?.['Male'], 0),
        )}
      >
        Total 18-49 years
      </TableCell>
      <TableCell
        title={String(safeNumber(sampleSizes?.['50+']?.['Female'], 0) + safeNumber(sampleSizes?.['50+']?.['Male'], 0))}
      >
        Total 50 years and more
      </TableCell>
      <TableCell>Total people living with disability</TableCell>
      <TableCell>Total</TableCell>
    </TableRow>
  </TableHead>
)

const EchoTableBody: FC<EchoPmKoiTableData['body']> = (data) => {
  return (
    <TableBody>
      {(['sdh1', 'sdh2', 'mea1', 'mea2', 'acc1', 'acc2', 'pem1', 'pem2'] as const).map((key) => (
        <Fragment key={key}>
          <TableRow>
            <TableCell component="th" scope="row" colSpan={18}>
              {match(key)
                .cases({
                  sdh1: 'SDH. 1 - Did you feel safe at all times travelling to receive the assistance/service (to/from your place), while receiving the assistance/service, and upon return to your place?',
                  sdh2: 'SDH. 2 - Did you feel that the (agency/NGO/implementing partner/contractor) staff treated you with respect during the intervention?',
                  mea1: 'MEA. 1 - Are you satisfied with the assistance/service provided?',
                  mea2: 'MEA. 2 - Do you know of people needing assistance/services who were excluded from the assistance/service provided?',
                  acc1: 'ACC. 1 - If you had a suggestion for, or a problem with the assistance/service, do you think you could channel the suggestion or lodge a complaint?',
                  acc2: 'ACC. 2 - To your knowledge, have suggestions or complaints raised been responded to or followed up?',
                  pem1: 'PEM. 1 - Were your views taken into account by the organization about the assistance you received?',
                  pem2: 'PEM. 2 - Did you feel well informed about the assistance/service available?',
                })
                .default(null)}
            </TableCell>
          </TableRow>
          <AnswersRow answer="Yes completely and Mostly yes" answerStats={data?.[key]?.yes} />
          <AnswersRow answer="Not really and Not at all" answerStats={data?.[key]?.no} />
          <AnswersRow answer="Don’t know" answerStats={data?.[key]?.dk} />
          <AnswersRow answer="No answer" answerStats={data?.[key]?.na} />
        </Fragment>
      ))}
    </TableBody>
  )
}

export {EchoTableHead, EchoTableBody}
