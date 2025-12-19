import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from 'react'
import {match, seq, Seq} from '@axanc/ts-utils'

import {
  DrcOffice,
  DrcProject,
  Ecrec_cashRegistration,
  KoboIndex,
  KoboSubmissionFlat,
  KoboXmlMapper,
  Meal_cashPdm,
  OblastIndex,
  OblastName,
  Period,
  Person,
  Bn_pam,
} from 'infoportal-common'

import {useAppSettings} from '@/core/context/ConfigContext'
import {useFetcher, UseFetcher} from '@/shared/hook/useFetcher'
import {mapBnPamToCashPdmData} from '@/features/Meal/Cash/Mappers/mapBnPamRow'

export type CashActivityCode =
  | 'caf' // Cash for animal feed
  | 'cfg' // Cash for agriculture
  | 'empca' // Emergency MPCA
  | 'vet' // Vocational training (VET)
  | 'msme' // Business support (MSME)
  | 'casr' // Cash for animal Shelter repair
  | 'caren' // Cash for Rent
  | 'carep' // Cash for Repair

export const CashActivityGroups = {
  agri: ['caf', 'cfg'] as CashActivityCode[],
  mpca: ['empca'] as CashActivityCode[],
  vetMsme: ['vet', 'msme'] as CashActivityCode[],
  animalShelter: ['casr'] as CashActivityCode[],
  rentRepair: ['caren', 'carep'] as CashActivityCode[],
}

export type CashPdmForm = Meal_cashPdm.T | Ecrec_cashRegistration.T | Bn_pam.T

export type CashPdmData<T extends CashPdmForm = CashPdmForm> = {
  source: 'pdm' | 'ecrec'
  oblast?: OblastName
  raion?: string
  hromada?: string
  project?: DrcProject
  office?: DrcOffice
  pdmType?: string
  received?: string
  activity?: CashActivityCode | undefined
  persons?: Person.Details[]
  answers: KoboSubmissionFlat<T>
}

export interface CashPdmContextShape {
  fetcherPeriod: UseFetcher<() => Promise<{cashPdm: Period; ecrec: Period}>>
  periodFilter: Partial<Period>
  setPeriodFilter: Dispatch<SetStateAction<Partial<Period>>>
  fetcherAnswers: UseFetcher<(filter: Partial<Period>) => Promise<Seq<CashPdmData>>>
  answersIndex?: Record<string, CashPdmData>
  selectByActivities: (codes: CashActivityCode[]) => Seq<CashPdmData<Meal_cashPdm.T>>
}

const Ctx = createContext({} as CashPdmContextShape)
export const useCashPdm = () => useContext(Ctx)

export const CashPdmProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {api} = useAppSettings()
  const [periodFilter, setPeriodFilter] = useState<Partial<Period>>({})

  const fetcherPeriod = useFetcher(async () => {
    const [cashPdm, ecrec, bnPam] = await Promise.all([
      api.kobo.answer.getPeriod(KoboIndex.byName('meal_cashPdm').id),
      api.kobo.answer.getPeriod(KoboIndex.byName('ecrec_cashRegistration').id),
      api.kobo.answer.getPeriod(KoboIndex.byName('bn_pam').id),
    ])
    return {cashPdm, ecrec, bnPam}
  })

  const request = async (): Promise<Seq<CashPdmData>> => {
    const [cash, ecrec, bnpam] = await Promise.all([
      api.kobo.typedAnswers.search.meal_cashPdm(),
      api.kobo.typedAnswers.search.ecrec_cashRegistration(),
      api.kobo.typedAnswers.search.bn_pam(),
    ])

    const mapCash = seq(cash.data).map<CashPdmData<Meal_cashPdm.T>>((record) => ({
      source: 'pdm',
      oblast: record.ben_det_oblast ? OblastIndex.byKoboName(record.ben_det_oblast)?.name : undefined,
      raion: record.ben_det_raion ?? undefined,
      hromada: record.ben_det_hromada ?? undefined,
      project: match(record.donor!)
        .cases({
          ukr000270_pofu: DrcProject['UKR-000270 Pooled Funds'],
          ukr000298_novo: DrcProject['UKR-000298 Novo-Nordisk'],
          ukr000360_novo: DrcProject['UKR-000360 Novo-Nordisk'],
          ukr000322_echo: DrcProject['UKR-000322 ECHO2'],
          ukr000314_uhf4: DrcProject['UKR-000314 UHF4'],
          ukr000348_bha_llh: DrcProject['UKR-000348 BHA3'],
          ukr000352_uhf7: DrcProject['UKR-000352 UHF7'],
          ukr000347_danida: DrcProject['UKR-000347 DANIDA'],
          ukr000330_sdc: DrcProject['UKR-000330 SDC2'],
          ukr000336_uhf6: DrcProject['UKR-000336 UHF6'],
          ukr000345_bha: DrcProject['UKR-000345 BHA2'],
          ukr000363_uhf8: DrcProject['UKR-000363 UHF8'],
          ukr000340_augustinus_fonden_mpca: DrcProject['UKR-000340 Augustinus Fonden'],
          ukr000341_hoffman_husmans_fond_mpca: DrcProject['UKR-000341 Hoffmans & Husmans'],
          ukr000342_private_funds: DrcProject['UKR-000342 Pooled Funds'],
          ukr000372_echo3: DrcProject['UKR-000372 ECHO3'],
          ukr000388_bha: DrcProject['UKR-000388 BHA'],
          other: DrcProject['Other'],
        })
        .default(() => undefined),
      office: match(record.office!)
        .cases({
          dnipro: DrcOffice.Dnipro,
          kharkiv: DrcOffice.Kharkiv,
          chernihiv: DrcOffice.Chernihiv,
          sumy: DrcOffice.Sumy,
          mykolaiv: DrcOffice.Mykolaiv,
          lviv: DrcOffice.Lviv,
          zaporizhzhya: DrcOffice.Zaporizhzhya,
          slovyansk: DrcOffice.Sloviansk,
        })
        .default(() => undefined),
      persons: KoboXmlMapper.Persons.cash_pdm(record),
      activity: record.pdmtype as CashActivityCode | undefined,
      received: record.did_receive_cash ?? undefined,
      answers: record,
    }))

    const mapEcrec = seq(ecrec.data).map<CashPdmData<Ecrec_cashRegistration.T>>((record) => ({
      source: 'ecrec',
      oblast: record.ben_det_oblast ? OblastIndex.byKoboName(record.ben_det_oblast)?.name : undefined,
      project: match(record.back_donor!)
        .cases({
          '372_echo': DrcProject['UKR-000372 ECHO3'],
          '363_uhf8': DrcProject['UKR-000363 UHF8'],
          uhf7: DrcProject['UKR-000352 UHF7'],
          uhf6: DrcProject['UKR-000336 UHF6'],
        })
        .default(() => undefined),
      office: match(record.back_office!)
        .cases({
          dnk: DrcOffice.Dnipro,
          hrk: DrcOffice.Kharkiv,
          chj: DrcOffice.Chernihiv,
          umy: DrcOffice.Sumy,
          nlv: DrcOffice.Mykolaiv,
          lwo: DrcOffice.Lviv,
          zap: DrcOffice.Zaporizhzhya,
          khe: DrcOffice.Kherson,
        })
        .default(() => undefined),
      persons: KoboXmlMapper.Persons.ecrec_cashRegistration(record),
      activity: undefined,
      answers: record,
    }))

    const mapBnPam = seq(bnpam.data).map(mapBnPamToCashPdmData)

    return seq([...mapCash, ...mapEcrec, ...mapBnPam])
  }

  const fetcherAnswers = useFetcher(request)

  const answersIndex = useMemo(() => {
    return seq(fetcherAnswers.get).groupByFirst((_) => _.answers.id)
  }, [fetcherAnswers.get])

  useEffect(() => {
    fetcherPeriod.fetch()
  }, [])

  useEffect(() => {
    const p = fetcherPeriod.get
    if (p) {
      const starts = [p.cashPdm.start, p.ecrec.start, p.bnPam?.start].filter(Boolean) as Date[]
      const ends = [p.cashPdm.end, p.ecrec.end, p.bnPam?.end].filter(Boolean) as Date[]
      setPeriodFilter({
        start: starts.length ? new Date(Math.min(...starts.map((d) => d.getTime()))) : undefined,
        end: ends.length ? new Date(Math.max(...ends.map((d) => d.getTime()))) : undefined,
      })
    }
  }, [fetcherPeriod.get])

  useEffect(() => {
    fetcherAnswers.fetch({force: true, clean: false})
  }, [periodFilter])

  const selectByActivities = (codes: CashActivityCode[]) =>
    seq(fetcherAnswers.get)
      .filter((_) => _.source === 'pdm')
      .filter((_) => _.activity && codes.includes(_.activity as CashActivityCode)) as Seq<CashPdmData<Meal_cashPdm.T>>

  return (
    <Ctx.Provider
      value={{
        fetcherPeriod,
        periodFilter,
        setPeriodFilter,
        fetcherAnswers,
        answersIndex,
        selectByActivities,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}
