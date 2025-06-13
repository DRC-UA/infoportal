import {ApiClient} from '@/core/sdk/server/ApiClient'
import {User} from '@/core/sdk/server/user/User'
import {DrcJob} from 'infoportal-common'

export class UserSdk {
  constructor(private client: ApiClient) {}

  readonly update = (user: Partial<User>) => {
    return this.client.post<User>(`/user/me`, {body: user})
  }

  readonly avatarUrl = (email: string) => {
    return `${this.client.baseUrl}/user/avatar/${email}`
  }

  readonly search = ({includeDummy}: {includeDummy?: boolean} = {}) => {
    return this.client
      .get<any[]>(`/user`)
      .then((res) => res.map(User.map))
      .then((res) => (includeDummy ? res : res.filter((_) => !_.email.includes('@dummy'))))
  }

  readonly fetchDrcJobs = () => {
    return this.client.get<DrcJob[]>('/user/drc-job');
  }
  readonly getCount = () => {
    return this.client.get<{ count: number }>('/user/count').then((res) => res.count)
  }
}
