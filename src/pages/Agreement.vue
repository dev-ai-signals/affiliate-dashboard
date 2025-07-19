<template>
  <section class="agreement">
    <div class="agreement__banner">
      <div class="agreement__glass">
        <h1 class="agreement__title">Affiliate Agreement</h1>
      </div>
    </div>

    <div class="agreement__content">
      <p class="first-paragraph">Please read these terms and conditions carefully before using Our Service.</p>

      <h3>Effective Date: [Insert Date]</h3>
      <p><strong>This Agreement</strong> is entered into by and between <strong>AI Signals</strong>, (hereinafter referred to as the “Company”), and the undersigned individual (hereinafter referred to as the “Affiliate”).</p>

      <span class="break-line"></span>

      <h3>1. Purpose of Agreement</h3>
      <p><strong>This Agreement</strong> sets forth the terms under which the Affiliate agrees to promote, market, and refer subscribers to the Company's services, specifically the <strong>AI Signals Professional Terminal and Signals</strong>, in exchange for commission-based compensation.</p>

      <span class="break-line-two"></span>

      <h3>2. Commission Structure</h3>

      <h3>2.1 Tier 1 – Direct Sales Commission</h3>
      <p class="dif-margin-p">The Affiliate shall earn a <strong>66% commission</strong> on all monthly subscription sales made directly through the Affiliate’s unique referral link.</p>

      <h3>2.2 Tier 2 – Override Commission (Sub-Affiliate Sales)</h3>
      <p class="list-text-top">If the Affiliate refers another person (a "Sub-Affiliate") to the Program, and that Sub-Affiliate makes subscription sales:</p>

      <ul>
        <li>The Affiliate shall earn an additional <strong>11% override commission</strong> on all direct sales made by the Sub-Affiliate, provided that:</li>
        <li>The Affiliate generates <strong>no less than $5,000 in personal Tier 1 subscription sales</strong> during the same calendar month in which the override is claimed.</li>
      </ul>
      <p class="list-text-bottom">If the $5,000 threshold is not met in a given month, the 11% override will not be paid for that period.</p>

      <span class="break-line-three"></span>
      <h3>3. Payment Terms</h3>
      <ul>
        <li>Commissions shall be paid <strong>monthly</strong>, within <strong>10 business days</strong> following the end of each calendar month.</li>
        <li>All payments will be made in [USDT, USDC], to the account or wallet address provided by the Affiliate.</li>
        <li>The Affiliate is solely responsible for reporting and paying any applicable income taxes or transaction fees.</li>
      </ul>

      <span class="break-line-two"></span>

      <h3>4. Marketing & Conduct Requirements</h3>
      <p class="list-text-top">The Affiliate agrees to:</p>
      <ul>
        <li>Market and promote the AI Signals platform in a lawful, honest, and professional manner.</li>
        <li>Avoid making any false or misleading claims regarding profits, investment returns, or Company guarantees.</li>
        <li>Comply with all applicable regulations and advertising laws within the Affiliate’s local jurisdiction.</li>
      </ul>
      <p class="list-text-middle">Prohibited conduct includes, but is not limited to:</p>
      <ul>
        <li>Spamming, unsolicited messaging, or deceptive traffic generation.</li>
        <li>Promising guaranteed profits or returns.</li>
        <li>Misrepresentation of the Company’s services or affiliate structure.</li>
      </ul>
      <p class="list-text-bottom">Violation of these terms may result in <strong>immediate termination of this Agreement and forfeiture of unpaid commissions.</strong></p>

      <span class="break-line-two"></span>
      <h3>5. Term and Termination</h3>
      <p class="list-text-top">This Agreement shall remain in effect until terminated by either party.</p>
      <ul>
        <li>The Affiliate may terminate this Agreement at any time with written notice.</li>
        <li>The Company reserves the right to terminate this Agreement at any time, with or without cause, by providing written notice to the Affiliate.</li>
        <li>Upon termination, the Affiliate shall no longer promote the Company or present as an active Affiliate, and any future commissions from ongoing subscriptions or renewals will cease unless otherwise agreed in writing.</li>
      </ul>

      <span class="break-line-two"></span>
      <h3>6. Independent Contractor Status</h3>
      <p>The Affiliate enters this Agreement as an independent contractor. Nothing in this Agreement shall be construed to create a partnership, joint venture, or employer-employee relationship.</p>

      <span class="break-line-two"></span>
      <h3>7. Limitation of Liability</h3>
      <p>The Company shall not be held liable for indirect, incidental, or consequential damages arising from this Agreement. No guarantees are made regarding income potential or performance of the AI Signals platform.</p>

      <span class="break-line-two"></span>
      <h3>8. Governing Law</h3>
      <p>This Agreement shall be governed by and interpreted in accordance with the laws of Singapore. Any disputes shall be resolved under the jurisdiction of the courts of Singapore.</p>

      <span class="break-line-two"></span>
      <h3>9. Entire Agreement</h3>
      <p>This Agreement constitutes the entire understanding between the Company and the Affiliate. No other promises or agreements shall be binding unless made in writing and signed by both parties.</p>

      <span class="break-line-two"></span>
      <h3>10. Acceptance</h3>
      <p>By signing below, the Affiliate acknowledges having read, understood, and agreed to the terms set forth in this Agreement.</p>

      <span class="break-line-two"></span>

      <p class="last-p">To continue, please draw your signature below, check the box, and accept our terms.</p>

      <div class="acceptance-form">
        <div class="signature-box">
          <div class="canvas-wrapper">
            <vue-signature
              ref="signaturePad"
              :width="370"
              :height="131"
              class="signature-canvas"
              @end="updateHasSignature"
            />
          </div>
          <div class="clear-btn" @click="clearSignature">Clear</div>
        </div>

        <div class="acceptance-row">
          <div class="checkbox-container">
            <input type="checkbox" v-model="agreeToTerms" />
            <label>I agree to the AI Signals Affiliate Agreement</label>
          </div>

          <button
            class="accept-btn"
            type="button"
            :disabled="!agreeToTerms"
            @click="handleAccept"
          >
            <img :src="check" alt="Check Button" />
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import check from '@/assets/icons/check-btn.svg'
import VueSignature from 'vue3-signature'
import { useAgreement } from '@/shared/composables/useAgreement'
import { useUserStore } from '@/shared/stores/user'

const { signAffiliateAgreement } = useAgreement()
const router = useRouter()
const agreeToTerms = ref(false)
const signaturePad = ref<any>(null)
const hasSignature = ref(false)

const isMobile = ref(window.innerWidth <= 768)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

function updateHasSignature() {
  hasSignature.value = signaturePad.value?.isEmpty() === false
}

function clearSignature() {
  signaturePad.value?.clear()
  updateHasSignature()
}

async function handleAccept() {
  if (!agreeToTerms.value) return
  if (!hasSignature.value) {
    alert('Please provide your signature.')
    return
  }

  const canvas = signaturePad.value.$el.querySelector('canvas') as HTMLCanvasElement
  if (!canvas) {
    alert('Failed to capture signature. Try again.')
    return
  }

  const base64Signature = canvas.toDataURL('image/jpeg', 0.7)

  try {
    await signAffiliateAgreement(base64Signature)

    const userStore = useUserStore()
    if (userStore.userDto) {
      userStore.userDto = {
        ...userStore.userDto,
        agreementSignedAt: new Date().toISOString()
      }
    }
    localStorage.setItem('userSession', JSON.stringify(userStore.$state))

    router.push('/dashboard')
  } catch (err) {
    console.error(err)
    alert('Agreement failed. Please try again.')
  }
}

onMounted(() => {
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped lang="scss">
.agreement {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 100px;
    background: url('@/assets/images/affiliate-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      background: url('@/assets/images/mobile-agreement-bg.webp');
    }
  }

  &__glass {
    display: flex;
    background-color: #065b23;
    width: 1380px;
    height: 80px;
    align-items: center;
    justify-content: center;

    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 10px;
    gap: 10px;
  }

  &__title {
    font-size: 36px;
    color: #fff;
    font-weight: 600;
  }

  &__content {
    width: 1024px;
    margin: 10px auto;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 80px 116px;

    .first-paragraph {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(93, 90, 90, 1);
      margin-bottom: 10px;
    }

    h3 {
      font-size: 16px;
      color: rgba(0, 0, 0, 1);
      font-weight: 600;
      margin-bottom: 10px;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(93, 90, 90, 1);
    }

    .break-line {
      border-top: 1px solid rgba(0, 0, 0, 1);
      width: 100%;
      margin: 20px 0;
    }

    .break-line-two {
      border-top: 1px solid rgba(0, 0, 0, 1);
      width: 100%;
      margin: 20px 0;
    }

    .break-line-three {
      border-top: 1px solid rgba(0, 0, 0, 1);
      width: 100%;
      margin: 10px 0 20px 0;
    }

    .dif-margin-p {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(93, 90, 90, 1);
      margin-bottom: 20px;
    }

    .list-text-top {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(93, 90, 90, 1);
      margin-bottom: 20px;
    }

    .list-text-middle {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(93, 90, 90, 1);
      margin: 20px 0;
    }

    .list-text-bottom {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(93, 90, 90, 1);
      margin-top: 20px;
    }

    ul {
      padding-left: 30px;
      list-style: disc;
      color: rgba(93, 90, 90, 1);
      font-size: 14px;
    }

    .last-p {
      color: rgba(0, 0, 0, 1);
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 10px;
    }

    strong {
      font-weight: 600;
    }

    .acceptance-form {
      width: 100%;
      display: flex;
      flex-direction: column;

      .signature-box {
        position: relative;
        width: 340px;
        display: flex;
        flex-direction: column;

        .canvas-wrapper {
          width: 340px;
          height: 130px;
          border: 1px solid rgba(196, 196, 196, 1);
          position: relative;

          .signature-canvas {
            width: 100%;
            height: 100%;
          }
        }

        .clear-btn {
          font-size: 14px;
          text-decoration: underline;
          margin-top: 4px;
          color: rgba(49, 118, 177, 1);
          cursor: pointer;
          width: fit-content;

          &:hover {
            color: #e6991e;
          }
        }
      }

      .acceptance-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 20px;

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;

          input[type='checkbox'] {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }

          label {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.5);
          }
        }

        .accept-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 40px;
          width: 174px;
          border-radius: 5px;
          padding: 10px 20px;
          border: none;
          background-color: rgba(241, 162, 59, 1);
          color: rgba(255, 255, 255, 1);
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;

          &:hover {
            background-color: #e6991e;
          }

          &:disabled {
            background-color: rgba(193, 193, 193, 1);
            cursor: not-allowed;
          }
        }
      }
    }
  }
}


@media (max-width: 768px) {
  .agreement__glass {
    width: 90%;
    height: auto;
    padding: 8px 14px;
    .agreement__title {
      font-size: 22px;
    }
  }

  .agreement__container {
    width: 90%;
    flex-direction: column;
    gap: 20px;
    padding: 30px 20px 60px 20px;
  }

  .agreement__content {
    width: 90%;
    padding: 30px 20px;
  }

  .agreement__content {
    .first-paragraph,
    p,
    .dif-margin-p,
    .list-text-top,
    .list-text-middle,
    .list-text-bottom,
    ul,
    .last-p {
      font-size: 13px;
      line-height: 20px;
    }

    h3 {
      font-size: 15px;
    }

    ul {
      padding-left: 20px;
    }

    .acceptance-form {
      .signature-box {
        width: 100%;

        .canvas-wrapper {
          width: 100%;
        }
      }

      .acceptance-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;

        .checkbox-container {
          label {
            font-size: 13px;
          }
        }

        .accept-btn {
          width: 100%;
          font-size: 14px;
          height: 42px;
        }
      }
    }
  }
}

</style>
