import type {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

export class ControllerVaDuplicates {
  readonly #prisma: PrismaClient

  constructor() {
    this.#prisma = new PrismaClient()
  }

  readonly get = async (_request: Request, response: Response) => {
    const records = await this.#prisma.$queryRaw`
      SELECT
        t.id,
        t."answers"->>'bio_name' AS bio_name,
        t."answers"->>'office_bio' AS office_bio,
        t."answers"->>'responsible_drc_staff_bio' AS responsible_drc_staff_bio
      FROM public."KoboAnswers" t
      JOIN (
        SELECT answers->>'bio_name' AS bio_name
        FROM public."KoboAnswers"
        WHERE "formId" = 'aKZW9UTf9nqfiLhxtjcT3d'
        GROUP BY answers->>'bio_name'
        HAVING COUNT(*) > 1
      ) dups ON t.answers->>'bio_name' = dups.bio_name
      WHERE t."formId" = 'aKZW9UTf9nqfiLhxtjcT3d'
      ORDER BY t.id DESC;
    `
    response.send(records)
  }
}
