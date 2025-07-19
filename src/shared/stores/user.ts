import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    email: '',
    referralCode: '',
    userDto: null as null | {
      id: string
      email: string
      fullName: string
      roles: string[]
      agreementSignedAt: string | null
    },
    isLoggedIn: false,
  }),
  actions: {
    login(payload: { token: string, userDto: any }) {
      this.token = payload.token
      this.email = payload.userDto.email
      this.userDto = {
        id: payload.userDto.id,
        email: payload.userDto.email,
        fullName: payload.userDto.fullName,
        roles: payload.userDto.roles,
        agreementSignedAt: payload.userDto.agreementSignedAt ?? null
      }
      this.isLoggedIn = true
      localStorage.setItem('userSession', JSON.stringify(this.$state))
    },
    setReferral(code: string) {
      this.referralCode = code
    },
    logout() {
      this.token = ''
      this.email = ''
      this.userDto = null
      this.isLoggedIn = false
      localStorage.removeItem('userSession')
    },
    hydrate() {
      const data = localStorage.getItem('userSession')
      if (data) Object.assign(this, JSON.parse(data))
    }
  }
})

export function getUserToken() {
  const session = localStorage.getItem('userSession')
  if (!session) return ''
  try {
    const parsed = JSON.parse(session)
    return parsed.token || ''
  } catch (e) {
    return ''
  }
}
