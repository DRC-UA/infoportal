// declare module 'src/location/settlements.save.js' {
//   const value: Record<string, {
//     iso: string
//     parent: string
//     ua: string
//     en: string
//     _5w: string
//   }>
//   export default value
// }

export type SettlementIso = string

export type Settlement = {
  iso: SettlementIso
  parent: string
  ua: string
  en: string
  _5w: string
}

// export declare const settlement: Record<string, Settlement>