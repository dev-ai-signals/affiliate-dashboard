import api from '@/shared/api/axios'

export function useAgreement() {
  async function signAffiliateAgreement(base64Signature: string) {
    await api.post('/affiliate/sign-agreement', {
      base64Signature,
    })
  }

  return { signAffiliateAgreement }
}
