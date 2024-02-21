import {KoboAnswerId, KoboId} from '../connector/kobo/KoboClient/type/KoboAnswer'
import {EventEmitter} from 'events'
import {appEventEmitter} from '../../index'
import {logger} from '../../helper/Logger'

interface KoboEventTagEdited {
  formId: KoboId,
  answerIds: KoboAnswerId[],
  tags: Record<string, any>
}

export class KoboEvent {

  constructor(
    private emitter: EventEmitter = appEventEmitter,
    private log = logger('KoboEvent')
  ) {
  }

  static readonly TAG_EDITED = 'KOBO_TAG_EDITED'

  readonly emitTagEdited = (params: KoboEventTagEdited) => {
    this.emitter.emit(KoboEvent.TAG_EDITED, params)
    this.log.info(`Emitted ${KoboEvent.TAG_EDITED}`, params.formId, params.tags)
  }

  readonly listenTagEdited = (cb: (_: KoboEventTagEdited) => void) => {
    this.emitter.on(KoboEvent.TAG_EDITED, cb)
  }
}