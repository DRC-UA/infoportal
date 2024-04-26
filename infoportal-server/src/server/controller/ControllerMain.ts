import {NextFunction, Request, Response} from 'express'
import {ServiceStats} from '../services/ServiceStats'
import * as yup from 'yup'
import axios, {AxiosError} from 'axios'

export class ControllerMain {

  constructor(
    private stats: ServiceStats
  ) {
  }

  readonly proxyImg = async (req: Request, res: Response, next: NextFunction) => {

  }

  readonly proxy = async (req: Request, res: Response, next: NextFunction) => {
    const body = await yup.object({
      url: yup.string().required(),
      method: yup.string().required(),
      body: yup.mixed<any>().optional(),
      headers: yup.mixed<any>().optional(),
    }).validate(req.body)
    try {
      const request = await axios.create().request({
        url: body.url,
        method: body.method,
        headers: body.headers,
        params: body.body,
        responseType: 'arraybuffer',
      })
      res.set('Content-Type', body.headers?.['Content-Type'])
      res.set('Content-Length', request.data.length)

      res.send(request.data)
    } catch (e) {
      console.log((e as AxiosError).code)
      next(e)
    }
  }

  readonly htmlStats = async (req: Request, res: Response, next: NextFunction) => {
    // const html = await this.stats.getAll({
    //   start: new Date(2022, 11, 1),
    //   end: new Date(2023, 2, 1)
    // })
    res.send('Running v6.0')
    // res.send('Hello.')
  }
}
