import React, {Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState} from 'react'
import {
  DrcOffice,
  DrcProject,
  DrcProjectHelper,
  KoboIndex,
  KoboSubmissionFlat,
  KoboXmlMapper,
  Meal_cashPdm,
  Meal_shelterPdm,
  OblastIndex,
  OblastName,
  Period,
  Meal_nfiPdm,
  Person,
  Protection_gbvPdm,
  Legal_pam,
} from 'infoportal-common'
import {Kobo} from 'kobo-sdk'
import {match, map, seq, Seq} from '@axanc/ts-utils'
import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'

export enum PdmType {
  Cash = 'Cash',
  Shelter = 'Shelter',
  Nfi = 'Nfi',
  Gbv = 'Gbv',
  Legal = 'Legal',
}

export type PdmForm = Meal_cashPdm.T | Meal_shelterPdm.T | Meal_nfiPdm.T | Protection_gbvPdm.T | Legal_pam.T

export type PdmData<T extends PdmForm> = {
  type: PdmType
  oblast: OblastName
  project: DrcProject | undefined
  office?: DrcOffice | undefined
  persons?: Person.Details[]
  answers: KoboSubmissionFlat<T>
}

export interface MealPdmDashboardContext {
  fetcherAnswers: UseFetcher<(filter: Partial<Period>) => Promise<Seq<PdmData<PdmForm>>>>
  fetcherPeriod: UseFetcher<() => Promise<Period>>
  periodFilter: Partial<Period>
  setPeriodFilter: Dispatch<SetStateAction<Partial<Period>>>
  answersIndex?: Record<Kobo.SubmissionId, PdmData<PdmForm>>
}

const Context = React.createContext({} as MealPdmDashboardContext)

export const useMealPdmContext = () => useContext<MealPdmDashboardContext>(Context)

export const MealPdmProvider = ({children}: {children: ReactNode}) => {
  const {api} = useAppSettings()
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})

  const request = (): Promise<Seq<PdmData<PdmForm>>> => {
    return Promise.all([
      api.kobo.typedAnswers.search.meal_cashPdm().then((_) =>
        seq(_.data).map((record) => ({
          type: PdmType.Cash,
          oblast: OblastIndex.byKoboName(record.ben_det_oblast!)!.name,
          project: DrcProjectHelper.search(record.donor),
          office: match(record.office!)
            .cases({
              dnipro: DrcOffice.Dnipro,
              empca: DrcOffice.Kharkiv,
              chernihiv: DrcOffice.Chernihiv,
              sumy: DrcOffice.Sumy,
              mykolaiv: DrcOffice.Mykolaiv,
              lviv: DrcOffice.Lviv,
              zaporizhzhya: DrcOffice.Zaporizhzhya,
              slovyansk: DrcOffice.Sloviansk,
            })
            .default(() => undefined),
          persons: KoboXmlMapper.Persons.cash_pdm(record),
          answers: record,
        })),
      ),
      api.kobo.typedAnswers.search.meal_shelterPdm().then((_) =>
        seq(_.data).map((record) => ({
          type: PdmType.Shelter,
          oblast: OblastIndex.byKoboName(record.oblast!)!.name,
          project: match(record.Donor!)
            .cases({
              ukr000345_bha2: DrcProject['UKR-000345 BHA2'],
              echo: DrcProject['UKR-000322 ECHO2'],
              uhf4: DrcProject['UKR-000314 UHF4'],
              unhcr: DrcProject['UKR-000308 UNHCR'],
              novo: DrcProject['UKR-000298 Novo-Nordisk'],
              uhf6: DrcProject['UKR-000336 UHF6'],
            })
            .default(() => undefined),
          office: KoboXmlMapper.office(record.office),
          persons: KoboXmlMapper.Persons.shelter_pdm(record),
          answers: record,
        })),
      ),
      api.kobo.typedAnswers.search.meal_nfiPdm().then((_) =>
        seq(_.data).map((record) => ({
          type: PdmType.Nfi,
          oblast: OblastIndex.byKoboName(record.oblast!)!.name,
          project: match(record.donor!)
            .cases({
              bha: DrcProject['UKR-000284 BHA'],
              '345_bha': DrcProject['UKR-000345 BHA2'],
              echo2: DrcProject['UKR-000322 ECHO2'],
              sdc: DrcProject['UKR-000330 SDC2'],
              okf: DrcProject['UKR-000309 OKF'],
              pofu: DrcProject['UKR-000270 Pooled Funds'],
              frem: DrcProject['UKR-000293 French MFA'],
              danida: DrcProject['UKR-000347 DANIDA'],
              uhf4: DrcProject['UKR-000314 UHF4'],
              nono: DrcProject['UKR-000298 Novo-Nordisk'],
              sdcs: DrcProject['UKR-000330 SDC2'],
              mofa: DrcProject['UKR-000301 DANISH MoFA'],
            })
            .default(() => undefined),
          office: KoboXmlMapper.office(record.office_responsible),
          persons: KoboXmlMapper.Persons.nfi_pdm(record),
          answers: record,
        })),
      ),
      api.kobo.typedAnswers.search.protection_gbvPdm().then((_) =>
        seq(_.data).map((record) => ({
          type: PdmType.Gbv,
          oblast: OblastIndex.byKoboName(record.ben_det_oblast!)!.name,
          project: match(record.donor!)
            .cases({
              '347_danida': DrcProject['UKR-000347 DANIDA'],
              '336_uhf6': DrcProject['UKR-000336 UHF6'],
            })
            .default(() => undefined),
          answers: record,
        })),
      ),
      api.kobo.typedAnswers.search.legal_pam().then((_) =>
        seq(_.data).map((record) => ({
          type: PdmType.Legal,
          oblast: OblastIndex.byKoboName(record.ben_det_oblast!)!.name,
          office: KoboXmlMapper.office(record.office),
          persons: KoboXmlMapper.Persons.legal_pdm(record),
          project: match(record.project!)
            .cases({
              ukr000372_echo: DrcProject['UKR-000372 ECHO3'],
              ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
              ukr000355_dmfa: DrcProject['UKR-000355 Danish MFA'],
              ukr000304_pspu: DrcProject['UKR-000304 PSPU'],
              ukr000397_gffo: DrcProject['UKR-000397 GFFO'],
              ukr000388_bha: DrcProject['UKR-000388 BHA'],
              ukr000xxx_fcdo: DrcProject['UKR-000285 FCDO'],
            })
            .default(() => undefined),
          answers: record,
        })),
      ),
    ]).then((results) => seq(results.flat()))
  }

  const fetcherPeriod = useFetcher(() => {
    return Promise.all([
      api.kobo.answer.getPeriod(KoboIndex.byName('meal_cashPdm').id),
      api.kobo.answer.getPeriod(KoboIndex.byName('meal_shelterPdm').id),
      api.kobo.answer.getPeriod(KoboIndex.byName('meal_nfiPdm').id),
      api.kobo.answer.getPeriod(KoboIndex.byName('protection_gbvPdm').id),
      api.kobo.answer.getPeriod(KoboIndex.byName('legal_pam').id),
    ]).then(([cashPeriod, shelterPeriod, nfiPeriod, gbvPeriod, legalPeriod]) => ({
      cashPeriod,
      shelterPeriod,
      nfiPeriod,
      gbvPeriod,
      legalPeriod,
    }))
  })

  const fetcherAnswers = useFetcher(request)

  const answersIndex = useMemo(() => {
    return seq(fetcherAnswers.get).groupByFirst((_) => _.answers.id)
  }, [fetcherAnswers.get])

  useEffect(() => {
    fetcherPeriod.fetch()
  }, [])

  useEffect(() => {
    map(fetcherPeriod.get, setPeriodFilter)
  }, [fetcherPeriod.get])

  useEffect(() => {
    fetcherAnswers.fetch({force: true, clean: false})
  }, [periodFilter])

  return (
    <Context.Provider
      value={{
        fetcherAnswers,
        periodFilter,
        setPeriodFilter,
        fetcherPeriod,
        answersIndex,
      }}
    >
      {children}
    </Context.Provider>
  )
}
