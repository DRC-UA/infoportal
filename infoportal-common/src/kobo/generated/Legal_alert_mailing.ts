export namespace Legal_alert_mailing {
  export type Option<T extends keyof typeof options> = keyof (typeof options)[T]
  // Form id: atB9Q6Q2Gt6t9dzdabYRZB
  export interface T {
    start: string,
    end: string,
    // disclaimer [note] Thanks for your interest in DRC's legal alert. To subscribe, please enter your email below.
    disclaimer: string,
    // email [text] Email
    email: string | undefined,
  }
  export const options = {

  }

  const extractQuestionName = (_: Record<string, any>) => {
    const output: any = {}
    Object.entries(_).forEach(([k, v]) => {
      const arr = k.split('/')
      const qName = arr[arr.length - 1]
      output[qName] = v
    })
    return output
  }

  export const map = (_: Record<keyof T, any>): T => ({
    ..._
  }) as T
}