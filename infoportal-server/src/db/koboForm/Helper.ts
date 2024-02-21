export class DbKoboFormHelper {

  static readonly setTagPropertyTsType = <A extends Record<string, any>>() => <T extends {answers: any}>(_: T): Omit<T, 'answer'> & {answers: A} => _
}