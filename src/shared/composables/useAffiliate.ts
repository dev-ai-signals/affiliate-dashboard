import { ref } from 'vue'
import api from '@/shared/api/axios'

export function useAffiliate() {
  const totalEarned = ref(0)
  const balance = ref(0)
  const signedUp = ref(0)
  const affiliateLink = ref('')
  const tier2Link = ref('')
  const tier2Info = ref<any>(null)

  async function fetchDashboard() {
    const { data } = await api.get('/affiliate/dashboard')
    totalEarned.value = data.totalEarned
    signedUp.value = data.signedUp
    affiliateLink.value = data.inviteAffiliateLink ?? ''
    tier2Link.value = data.productLink ?? ''
    tier2Info.value = data.invitedAffiliates ?? null
  }

  async function submitWallet(address: string) {
    const payload = {
      code: 'USDC',
      walletAddresses: {
        USDC: address,
      }
    }

    await api.post('/affiliate/wallet/update', payload)
  }

  return {
    totalEarned,
    balance,
    signedUp,
    affiliateLink,
    tier2Link,
    tier2Info,
    fetchDashboard,
    submitWallet
  }
}
