import {Obj} from '@alexandreannic/ts-utils'

export namespace Regexp {
  export const pattern = {
    email: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
    drcEmail: '^[a-zA-Z0-9._-]+@drc\.ngo$',
    // url: 'http',
    url: 'https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)',
  }

  export const get = new Obj(pattern).map((k, v) => [k, new RegExp(v)]).get()
}
