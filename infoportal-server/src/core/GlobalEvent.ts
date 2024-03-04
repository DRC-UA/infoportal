import {KoboAnswer, KoboAnswerId, KoboId} from '../feature/connector/kobo/KoboClient/type/KoboAnswer'
import {EventEmitter} from 'events'
import {logger} from '../helper/Logger'
import {KoboSyncServerResult} from '../feature/kobo/KoboSyncServer'

export namespace GlobalEvent {

  interface KoboTagEditedParams {
    formId: KoboId,
    answerIds: KoboAnswerId[],
    tags: Record<string, any>
  }

  interface KoboFormSyncParams
    // extends KoboSyncServerResult
  {
    formId: KoboId
  }

  export enum Event {
    KOBO_FORM_SYNCHRONIZED = 'KOBO_FORM_SYNCHRONIZED',
    KOBO_TAG_EDITED = 'KOBO_TAG_EDITED'
  }

  type Emit = {
    (event: Event.KOBO_TAG_EDITED, params: KoboTagEditedParams): void
    (event: Event.KOBO_FORM_SYNCHRONIZED, params: KoboFormSyncParams): void
  }

  type Listen = {
    (event: Event.KOBO_TAG_EDITED, cb: (params: KoboTagEditedParams) => void): void
    (event: Event.KOBO_FORM_SYNCHRONIZED, cb: (params: KoboFormSyncParams) => void): void
  }


  export class Class {

    private static instance: Class
    static readonly getInstance = () => {
      if (!Class.instance) Class.instance = new Class()
      return Class.instance
    }

    private constructor(
      private emitter: EventEmitter = new EventEmitter(),
      private log = logger('GlobalEvent')
    ) {
      this.log.info(`Initialize GlobalEvent.`)
      this.listen = this.emitter.on.bind(this.emitter)
    }

    readonly emit: Emit = (event, params): void => {
      this.emitter.emit(event, params)
      this.log.info(`Emitted ${event}`, JSON.stringify(params))
    }

    readonly listen: Listen
  }
}