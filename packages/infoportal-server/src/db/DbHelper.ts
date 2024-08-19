import {ApiPaginate} from 'infoportal-common'

export class DbHelper {
  static toPaginate = (totalSize?: number) => <T>(data: T[]): ApiPaginate<T> => {
    return {
      data,
      total: totalSize ?? data.length,
    }
  }
}