export const pick = <T extends object, K extends keyof any>(src: T, ...keys: K[]) => {
  for (const k of keys) {
    const v = (src as any)?.[k]
    if (v !== undefined) return v
  }
  return undefined
}

export const yn = <T extends string | undefined>(v: T) => v
