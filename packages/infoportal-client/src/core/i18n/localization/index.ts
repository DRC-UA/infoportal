import merge from 'deepmerge'

import {en} from './en'
import {ua as uaOriginal} from './ua'

const ua = merge(en, uaOriginal)

export {en, ua}
