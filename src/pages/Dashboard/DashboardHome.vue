<template>
  <section class="dashboard">
    <div class="dashboard__banner">
      <div class="dashboard__glass">
        <h1 class="dashboard__title">Dashboard</h1>
      </div>
    </div>

    <div class="dashboard__container">
      <div class="dashboard__cards">
        <div class="card-one">
          <h2>${{ totalEarned.toFixed(2) }}</h2>
          <span>Total Sales</span>
        </div>

        <div class="card-two">
          <div class="card-two-right">
            <div class="spanned-text">
              <span>SIGNED UP</span>
              <span class="darken">{{ signedUp }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard__tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'links' }"
          @click="activeTab = 'links'"
        >
          Links
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'settings' }"
          @click="activeTab = 'settings'"
        >
          Settings
        </button>
      </div>

      <div v-if="activeTab === 'links'" class="dashboard__links">
        <div class="link-group">
          <label><strong>Customer Link</strong></label>
          <div class="input-wrap" @click="copyText(tier2Link)">
            <span class="fake-input">{{ tier2Link }}</span>
            <img src="@/assets/icons/copy.svg" alt="Copy Icon" :class="{ blink: copiedLink === tier2Link }" />
          </div>
        </div>

        <div class="link-group" v-if="affiliateLink">
          <label><strong>Recruit Link</strong></label>
          <div class="input-wrap" @click="copyText(affiliateLink)">
            <span class="fake-input">{{ affiliateLink }}</span>
            <img src="@/assets/icons/copy.svg" alt="Copy Icon" :class="{ blink: copiedLink === affiliateLink }" />
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'settings'" class="dashboard__settings">
        <div class="settings__left">
          <div class="form-group">
            <label>Previous Password</label>
            <div class="password-input-wrapper">
              <input
                :type="showPreviousPassword ? 'text' : 'password'"
                placeholder="eg. Xyz1234"
                v-model="previousPassword"
                @input="passwordError = ''"
              />
              <img
                src="@/assets/icons/eye.svg"
                alt="Toggle visibility"
                class="eye-icon"
                @click="showPreviousPassword = !showPreviousPassword"
              />
            </div>

          </div>
          <div class="form-group">
            <label>New Password</label>
            <div class="password-input-wrapper">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="eg. Xyz1234"
                v-model="newPassword"
                @input="passwordError = ''"
              />
              <img
                src="@/assets/icons/eye.svg"
                alt="Toggle visibility"
                class="eye-icon"
                @click="showNewPassword = !showNewPassword"
              />
            </div>
          </div>
          <div class="form-group">
            <label>Confirm New Password</label>
            <div class="password-input-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="eg. Xyz1234"
                v-model="confirmPassword"
                @input="passwordError = ''"
              />
              <img
                src="@/assets/icons/eye.svg"
                alt="Toggle visibility"
                class="eye-icon"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </div>

            <p v-if="passwordError" class="input-error">{{ passwordError }}</p>
          </div>
          <div class="submit-btn-container">
            <span class="forgot" @click="goToForgot">Forgot password</span>
            <button class="submit-btn green" @click="handleChangePassword">Change Password</button>

            <div v-if="isMobile && successMessage === 'Password Changed'" class="success-notification">
              <img src="@/assets/icons/check-green.svg" alt="Success Icon">
              {{ successMessage }}
            </div>
          </div>
        </div>

        <div class="settings__right">
          <div class="form-group-wallet">
            <p>Enter your wallet address below to receive instant payouts from your personal and team sales.</p>
            <p>Please note: payouts are currently supported <strong>only via USDC on the ERC-20 network</strong>.</p>
            <label>Wallet Address</label>
            <input type="text" v-model="walletAddress" placeholder="eg. 0x742d35Cc...f44e" />
            <p v-if="errorMessage" class="input-error">{{ errorMessage }}</p>
          </div>
          <button class="submit-btn green" @click="handleSubmitWallet">Submit Wallet</button>

          <div v-if="isMobile && successMessage === 'Wallet Submitted'" class="success-notification">
            <img src="@/assets/icons/check-green.svg" alt="Success Icon">
            {{ successMessage }}
          </div>
        </div>
      </div>

      <div class="in-betweeen"></div>

      <div class="sign-out-container">
        <div v-if="!isMobile && successMessage" class="success-notification">
          <img src="@/assets/icons/check-green.svg" alt="Success Icon">
          {{ successMessage }}
        </div>

        <button class="signout-btn" @click="signOut">
          <img src="@/assets/icons/sign-out.svg" alt="Sign Out Icon">
          Sign Out
        </button>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'
import { useAffiliate } from '@/shared/composables/useAffiliate'
import { useUserStore } from '@/shared/stores/user'


const {
  totalEarned,
  signedUp,
  affiliateLink,
  tier2Link,
  fetchDashboard,
  submitWallet,
} = useAffiliate()

const { changePassword } = useAuth()

const isMobile = ref(window.innerWidth <= 768)

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth <= 768
})

const showPreviousPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const router = useRouter()

const activeTab = ref<'links' | 'settings'>('links')
const previousPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const passwordError = ref('')
const successMessage = ref('')
const copiedLink = ref('')
const walletAddress = ref('')

function copyText(text: string) {
  navigator.clipboard.writeText(text)
  copiedLink.value = text
  setTimeout(() => {
    copiedLink.value = ''
  }, 600)
}

async function handleChangePassword() {
  passwordError.value = ''

  if (!previousPassword.value || !newPassword.value || !confirmPassword.value) {
    passwordError.value = 'Please fill out all fields.'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'New passwords do not match.'
    return
  }
  if (newPassword.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters.'
    return
  }

  try {
    await changePassword(previousPassword.value, newPassword.value)

    successMessage.value = 'Password Changed'
    previousPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err) {
    passwordError.value = 'Server error, please try again.'
  }
}

onMounted(async () => {
  const userStore = useUserStore()
  await userStore.hydrate()

  if (!userStore.userDto?.agreementSignedAt) {
    router.push('/agreement')
    return
  }

  await fetchDashboard()
})

const errorMessage = ref('')

async function handleSubmitWallet() {
  try {
    await submitWallet(walletAddress.value)
    successMessage.value = 'Wallet Submitted'
    errorMessage.value = ''
    setTimeout(() => successMessage.value = '', 3000)
  } catch (err) {
    errorMessage.value = 'Failed to submit wallet'
    successMessage.value = ''
    setTimeout(() => errorMessage.value = '', 3000)
  }
}

function goToForgot() {
  router.push('/forgot-password')
}

function signOut() {
  localStorage.clear()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.dashboard {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 20px;

  &__banner {
    height: 100px;
    background: url('@/assets/images/dashboard-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  &__glass {
    width: 1180px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-radius: 10px;
    padding: 10px 20px;
    gap: 10px;
  }

  &__title {
    font-size: 32px;
    color: #fff;
    font-weight: 600;
  }

  &__container {
    width: 1180px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 20px 40px;
    margin: 0 auto;
    height: auto;
  }

  &__cards {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;

    .card-one {
      flex: 1;
      width: 228px;
      height: 122px;
      background: rgba(243, 245, 252, 1);
      border-radius: 8px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;

      h2 {
        font-size: 32px;
        font-weight: 600;
        color: rgba(93, 128, 249, 1);
      }

      span {
        font-size: 14px;
        font-weight: 600;
        color: rgba(26, 26, 26, 0.7);
      }
    }

    .card-two {
      width: 228px;
      height: 122px;
      background: rgba(243, 245, 252, 1);
      border-radius: 8px;
      padding: 20px 50px 20px 20px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;

      h2 {
        font-size: 32px;
        font-weight: 600;
        color: rgba(93, 128, 249, 1);
      }

      span {
        font-size: 14px;
        font-weight: 600;
        color: rgba(26, 26, 26, 0.7);
      }

      .card-two-left {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }

      .card-two-right {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;

        .spanned-text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;

          span {
            font-weight: 500;
            font-size: 16px;
            color: rgba(26, 26, 26, 0.5);
          }

          .darken {
            font-weight: 600;
            font-size: 16px;
            color: rgba(26, 26, 26, 1);
            margin-left: auto;
          }
        }
      }
    }
  }

  &__tabs {
    display: flex;
    gap: 12px;
    width: 100%;
    border-bottom: 1px solid rgba(204, 216, 233, 1);

    .tab {
      padding: 8px 22px;
      border: 1px solid rgba(204, 216, 233, 1);
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      font-size: 14px;
      color: rgba(26, 26, 26, 1);

      &:not(.active):hover {
        background-color: rgba(243, 245, 252, 1);
      }

      &.active {
        background: rgba(6, 116, 41, 1);
        color: rgba(255, 255, 255, 1);

        &:hover {
          background: #065b23;
        }
      }
    }
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    width: 100%;

    .link-group {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        display: block;
        font-weight: 500;
        font-size: 16px;
        color: rgba(31, 41, 55, 1);
      }

      .input-wrap {
        display: flex;
        align-items: center;
        background: rgba(229, 227, 227, 0.6);
        border-radius: 5px;
        padding: 0 10px;
        height: 36px;
        width: 100%;

        .fake-input {
          flex: 1;
          font-weight: 400;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.4);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          width: 28px;
          height: 28px;
          cursor: pointer;
        }
      }
    }
  }

  .in-betweeen {
    border-bottom: 1px solid rgba(204, 216, 233, 1);
    width: 100%;
    margin-top: 10px;
  }

  .sign-out-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;

    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    .signout-btn {
      height: 36px;
      width: auto;
      border: 1px solid rgba(204, 216, 233, 1);
      border-radius: 5px;
      background: transparent;
      color: rgba(30, 30, 30, 1);
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      padding: 10px 20px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      img {
        width: 16px;
      }

      &:hover {
        background-color: #e6991e;
      }

      @media (max-width: 768px) {
        width: 100%;

        &:hover {
          background-color: #e6991e;
        }
      }
    }

    .success-notification {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      background: rgba(6, 116, 41, 1);
      color: #fff;
      font-weight: 500;
      font-size: 14px;
      padding: 10px 20px;
      border-radius: 5px;
      width: 100%;
      max-width: 400px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.dashboard__settings {
  display: flex;
  gap: 40px;
  margin-top: 0;
  width: 100%;

  .settings__left {
    flex: 1;
    background: transparent;
    border-radius: 8px;
    padding: 24px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;

    .submit-btn-container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .submit-btn {
        border: none;
        border-radius: 5px;
        font-weight: 500;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        width: 200px;
        height: 36px;

        &.green {
          background: rgba(6, 116, 41, 1);
          &:hover {
            background: #065b23;
          }
        }
      }

      .forgot, .link {
        color: rgba(49, 118, 177, 1);
        cursor: pointer;
        font-weight: 400;
        transition: color 0.2s;
        font-size: 14px;

        &:hover {
          color: #e6991e;
        }
      }
    }
  }

  .settings__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    justify-content: space-between;
    padding: 20px 0;

    .form-group-wallet {
      padding: 20px;
      background: rgba(243, 245, 252, 1);
      display: flex;
      flex-direction: column;
      border-radius: 8px;

      gap: 2px;

      p {
        font-size: 14px;
        color: rgba(26, 26, 26, 1);
        font-weight: 400;
        margin-bottom: 20px;
      }

      label {
        font-weight: 500;
        font-size: 14px;
        color: rgba(26, 26, 26, 1);
      }

      input {
        height: 42px;
        border: 1px solid rgba(204, 216, 233, 1);
        border-radius: 4px;
        padding: 0 12px;
        font-size: 14px;
        color: rgba(26, 26, 26, 0.7);
        background: rgba(255, 255, 255, 1);

        &::placeholder {
          color: rgba(26, 26, 26, 0.4);
        }
      }

      .input-error {
        color: rgba(255, 0, 0, 0.8);
        font-size: 13px;
        margin-top: 4px;
      }
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;

    gap: 4px;

    .input-error {
      color: rgba(255, 0, 0, 0.8);
      font-size: 13px;
      margin-top: 4px;
    }

    p {
      font-size: 14px;
      color: rgba(26, 26, 26, 1);
      font-weight: 400;
    }

    label {
      font-weight: 500;
      font-size: 14px;
      color: rgba(26, 26, 26, 1);
    }

    input {
      height: 42px;
      border: 1px solid rgba(204, 216, 233, 1);
      border-radius: 4px;
      padding: 0 12px;
      font-size: 14px;
      color: rgba(26, 26, 26, 0.7);
      background: rgba(255, 255, 255, 1);

      &::placeholder {
        color: rgba(26, 26, 26, 0.4);
      }
    }

    .password-input-wrapper {
      position: relative;

      input {
        padding: 11px 6px;
        border-radius: 4px;
        height: 39px;
        border: 1px solid rgba(0, 0, 0, 0.26);
        background: transparent;
        color: #000;
        font-weight: 400;
        font-size: 12px;
        width: 100%;
        padding-right: 35px;
      }

      .eye-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        width: 18px;
        height: 18px;
        transform: translateY(-50%);
        cursor: pointer;
        opacity: 0.6;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .submit-btn {
    border: none;
    border-radius: 5px;
    font-weight: 500;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    width: 200px;
    height: 36px;

    &.green {
      background: rgba(6, 116, 41, 1);
      &:hover {
        background: #065b23;
      }
    }
  }
}

@media (max-width: 768px) {
  .dashboard__glass {
    width: 90%;
    height: auto;
    padding: 8px 14px;

    .dashboard__title {
      font-size: 22px;
    }
  }

  .dashboard__container {
    width: 90%;
    padding: 30px 20px 60px 20px;
  }

  .dashboard__cards {
    flex-direction: column;
    width: 100%;
    gap: 20px;

    .card-one,
    .card-two {
      width: 100%;
      height: auto;

      h2 {
        font-size: 32px;
      }

      span {
        font-size: 13px;
      }
    }

    .card-two {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      padding: 20px;

      .card-two-left,
      .card-two-right {
        width: 100%;
        align-items: flex-start;
      }

      .spanned-text {
        justify-content: space-between;
        width: 100%;
      }
    }
  }

  .dashboard__tabs {
    .tab {
      font-size: 14px;
      padding: 8px 12px;
    }
  }

  .dashboard__links {
    .link-group {
      gap: 12px;

      label {
        font-size: 16px;
      }

      .input-wrap {
        height: 42px;

        .fake-input {
          font-size: 14px;
        }

        img {
          width: 32px;
          height: 32px;
        }
      }
    }
  }

  .dashboard__settings {
    flex-direction: column;
    gap: 60px;

    .settings__left,
    .settings__right {
      width: 100%;
      padding: 0;
    }

    .submit-btn-container {
      flex-direction: column;
      align-items: flex-start;
      margin-top: 10px;
      gap: 0;

      .submit-btn {
        width: 100% !important;
      }

      .forgot, .link {
        width: 100%;

        &:hover {
          color: #e6991e;
        }
      }
    }

    .success-notification {
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;

      background: rgba(6, 116, 41, 1);
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 5px;
      width: 100%;
      max-width: 400px;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .settings__right {
      align-items: flex-start;

      .form-group-wallet {
        padding: 20px;

        p {
          font-size: 14px;
        }

        label {
          font-size: 13px;
        }

        input {
          height: 40px;
          font-size: 13px;
        }
      }

      .submit-btn {
        width: 100%;
      }
    }
  }
}

.blink {
  animation: blinkAnim 0.2s ease;
}

@keyframes blinkAnim {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.1; }
}
</style>

