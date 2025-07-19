<template>
  <section class="reset">
    <div class="reset__banner">
      <div class="reset__glass">
        <h1 class="reset__title">Password Reset</h1>
      </div>
    </div>

    <div class="reset__container">
      <div class="reset__left">
        <img v-if="!isMobile" :src="resetImage" alt="Reset illustration" />
        <div v-else class="mobile-top-content">
          <img class="logo" :src="logo" alt="AI Signals Logo" />
          <img :src="mobileResetImage" alt="Mobile Content Image" />
        </div>
      </div>

      <div class="reset__right">
        <img v-if="!isMobile" class="logo" :src="logo" alt="AI Signals Logo" />

        <form class="reset__form" @submit.prevent="handleSubmit">
          <label>New Password</label>
          <div class="password-input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="New password"
              @input="passwordError = ''"
            />
            <img
              src="@/assets/icons/eye.svg"
              alt="Toggle visibility"
              class="eye-icon"
              @click="showPassword = !showPassword"
            />
          </div>

          <label>Confirm Password</label>
          <div class="password-input-wrapper">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Confirm password"
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

          <button type="submit" :disabled="!!successMessage">
            {{ successMessage ? 'REDIRECTING...' : 'RESET PASSWORD' }}
          </button>

          <div v-if="successMessage" class="success-wrapper">
            <div class="success-notification">
              <img src="@/assets/icons/check-green.svg" alt="Success Icon" />
              {{ successMessage }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import resetImage from '@/assets/images/reset-image.webp'
import mobileResetImage from '@/assets/images/mobile-reset-content.webp'
import logo from '@/assets/icons/logo-notext.svg'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

const { resetPassword } = useAuth()
const passwordError = ref('')
const successMessage = ref('')
const route = useRoute()
const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isMobile = ref(window.innerWidth <= 768)
const password = ref('')
const confirmPassword = ref('')

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

async function handleSubmit() {
  if (!password.value || !confirmPassword.value) {
    alert('Please enter both fields')
    return
  }

  if (password.value !== confirmPassword.value) {
    passwordError.value = 'New passwords do not match.'
    return
  }

  try {
    const token = route.query.token as string
    await resetPassword(token, password.value)

    successMessage.value = 'Password successfully reset. Redirecting...'
    password.value = ''
    confirmPassword.value = ''
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (err) {
    alert('Reset failed')
    console.error(err)
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
.reset {
  background-color: #f5f5f5;
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 100px;
    background: url('@/assets/images/reset-banner.webp') center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      background: url('@/assets/images/mobile-reset-bg.webp') center/cover no-repeat;
    }
  }

  &__glass {
    width: 1380px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(24px);
    border-radius: 10px;
    padding: 10px 20px;
    gap: 10px;
  }

  &__title {
    font-size: 36px;
    color: #fff;
    font-weight: 600;
  }

  &__container {
    width: 1392px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 66px;
    background-color: #fff;
    border-radius: 10px;
    padding: 90px 0;
  }

  &__left {
    img {
      border-radius: 10px;
      max-width: 392px;
    }

    .mobile-top-content {
      display: flex;
      flex-direction: column;
      gap: 30px;

      .logo {
        width: 48px;
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 354px;
    gap: 9px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 9px;

    .input-error {
      color: rgba(255, 0, 0, 0.8);
      font-size: 12px;
      transition: opacity 0.2s ease;
    }

    label {
      font-weight: 500;
      font-size: 12px;
      color: #000;
    }

    .success-wrapper {
      height: 44px;
      margin-top: 12px;

      .success-notification {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #067429;
        color: #fff;
        font-weight: 500;
        font-size: 14px;
        padding: 10px 20px;
        border-radius: 5px;
        width: 100%;

        img {
          width: 18px;
          height: 18px;
        }
      }
    }

    .password-input-wrapper {
      position: relative;

      input {
        width: 100%;
        padding: 11px 6px 11px 6px;
        padding-right: 35px;
        border-radius: 4px;
        height: 39px;
        border: 1px solid rgba(0, 0, 0, 0.26);
        background: transparent;
        color: #000;
        font-size: 12px;

        &::placeholder {
          color: rgba(0, 0, 0, 0.5);
        }
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

    button {
      background-color: #f1a23b;
      height: 35px;
      border: none;
      border-radius: 5px;
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background-color: #e6991e;
      }

      &:disabled {
        background-color: #ccc;
        color: #888;
        cursor: not-allowed;
      }
    }
  }
}

@media (max-width: 768px) {
  .reset__glass {
    width: 90%;
    padding: 8px 14px;

    .reset__title {
      font-size: 22px;
    }
  }

  .reset__container {
    width: 90%;
    flex-direction: column;
    gap: 20px;
    padding: 30px 20px 60px;
  }

  .reset__left img {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }

  .reset__right {
    width: 100%;
  }

  .reset__form {
    gap: 8px;

    .success-wrapper {
      .success-notification {
        font-size: 13px;
        padding: 10px 14px;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }

    .password-input-wrapper input {
      height: 42px;
      font-size: 14px;
      padding-right: 35px;

      &::placeholder {
        font-size: 13px;
      }
    }

    .eye-icon {
      width: 16px;
      height: 16px;
      right: 8px;
    }

    button {
      height: 42px;
      font-size: 14px;
    }
  }
}
</style>