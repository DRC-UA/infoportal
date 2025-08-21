import {ApiClient} from 'kobo-sdk'
import fetch from 'node-fetch'
import {TOTP, URI} from 'otpauth'

export class WfpBuildingBlockClient {
  constructor(
    private params: {
      otpUrl: string
      login: string
      password: string
      baseURL?: string
    },
  ) {
    this.params = {
      baseURL: 'https://buildingblocks.ukr.wfp.org/api',
      ...params,
    }
  }

  private readonly getOtpCode = () => {
    const otpUrl = this.params.otpUrl
    const otpUrlParts = URI.parse(otpUrl)
    const totp = new TOTP({
      issuer: otpUrlParts.issuer,
      label: otpUrlParts.label,
      secret: otpUrlParts.secret.base32,
    })
    return totp.generate()
  }

  private readonly getApiToken = async (): Promise<string> => {
    const response = await fetch(this.params.baseURL + '/manager/auth', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: this.params.login,
        password: this.params.password,
        resetOtp: false,
        otp: this.getOtpCode(),
      }),
    })

    const {apiToken} = await response.json()

    return apiToken
  }

  generate = async () => {
    const token = await this.getApiToken()

    return new ApiClient({
      baseUrl: this.params.baseURL!,
      headers: {
        Authorization: token,
      },
    })
  }
}
