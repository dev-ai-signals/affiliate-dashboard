import { useUserStore } from '@/shared/stores/user'
import api from '@/shared/api/axios'
import { useRouter } from 'vue-router'

type RegisterPayload = {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  referralCode?: string
}

export function useAuth() {
  const userStore = useUserStore()
  const router = useRouter()

  async function login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password })
    userStore.login(data)

    const hasSignedAgreement = data?.userDto?.agreementSignedAt !== null

    if (!hasSignedAgreement) {
      router.push('/agreement')
    } else {
      router.push('/dashboard')
    }
  }

  async function register(payload: RegisterPayload) {
    await api.post('/auth/register/affiliate', payload)
  }

  async function forgotPassword(email: string) {
    await api.post('/auth/forgot-password', { email })
  }

  async function resetPassword(token: string, newPassword: string) {
    await api.post('/auth/reset-password', { token, newPassword })
  }

  async function changePassword(currentPassword: string, newPassword: string) {
    await api.put('/auth/change-password', {
      currentPassword,
      newPassword
    })
  }

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
  }
}