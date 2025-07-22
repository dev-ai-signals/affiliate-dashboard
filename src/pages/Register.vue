<template>
  <section class="register">
    <div class="register__banner">
      <div class="register__glass">
        <h1 class="register__title">AI Signals Affiliate Program</h1>
      </div>
    </div>
    <div class="register__container">
      <div class="register__left">
        <img v-if="!isMobile" :src="registerImage" alt="Keyboard illustration" />
        <div v-else class="mobile-top-content">
          <img class="logo" :src="logo" alt="AI Signals Logo" />
          <img :src="mobileRegisterImage" alt="Mobile Content Image">
        </div>
      </div>

      <div class="register__right">
        <img v-if="!isMobile" class="logo" :src="logo" alt="AI Signals Logo" />

        <form class="register__form" @submit="handleSubmit">
          <label>Email</label>
          <input
            v-model="email"
            @input="sync('email', $event)"
            type="email"
            placeholder="eg. name@gmail.com"
            :disabled="!!successMessage"
          />
          <p v-if="errors.email" class="error-text">{{ errors.email }}</p>

          <label>Full Name</label>
          <input
            v-model="fullName"
            @input="sync('fullName', $event)"
            type="text"
            placeholder="eg. full name"
            :disabled="!!successMessage"
          />
          <p v-if="errors.fullName" class="error-text">{{ errors.fullName }}</p>

          <label>Create Password</label>
          <div class="password-input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              @input="sync('password', $event)"
              placeholder="eg. xyz1234567"
              :disabled="!!successMessage"
            />
            <img
              src="@/assets/icons/eye.svg"
              alt="Toggle visibility"
              class="eye-icon"
              @click="showPassword = !showPassword"
            />
          </div>
          <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
          <label>Confirm Password</label>
          <div class="password-input-wrapper">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              @input="sync('confirmPassword', $event)"
              placeholder="eg. xyz1234567"
              :disabled="!!successMessage"
            />
            <img
              src="@/assets/icons/eye.svg"
              alt="Toggle visibility"
              class="eye-icon"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </div>
          <p v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</p>
          <button type="submit" :disabled="!!successMessage">
            {{ successMessage ? 'LINK SENT' : 'GET STARTED' }}
          </button>

          <div class="switch-login">
            Already have an account? <span @click="goToLogin">Login</span>
          </div>

          <div class="success-wrapper">
            <div v-if="successMessage" class="success-notification">
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
import registerImage from '@/assets/images/register-image.webp'
import mobileRegisterImage from '@/assets/images/mobile-register-content.webp'
import logo from '@/assets/icons/logo-notext.svg'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '@/shared/composables/useAuth'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/shared/stores/user'

const route = useRoute()

const { register } = useAuth()
const isMobile = ref(window.innerWidth <= 768)
const userStore = useUserStore()

const router = useRouter()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const email = ref('')
const fullName = ref('')
const password = ref('')
const confirmPassword = ref('')
const successMessage = ref('')

const errors = ref<Record<string, string>>({})

async function handleSubmit(e: Event) {
  e.preventDefault()
  errors.value = {}

  let hasClientError = false

  if (!email.value) {
    errors.value.email = 'Email is required'
    hasClientError = true
  }

  if (!fullName.value) {
    errors.value.fullName = 'Full name is required'
    hasClientError = true
  }


  if (!password.value) {
    errors.value.password = 'Password is required'
    hasClientError = true
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Please confirm your password'
    hasClientError = true
  }

  if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Passwords do not match'
    hasClientError = true
  }

  if (hasClientError) return

  try {
    await register({
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      fullName: fullName.value,
      ...(userStore.referralCode ? { referralCode: userStore.referralCode } : {})
    })

    successMessage.value = 'Activation link sent. Please check your inbox.'
    setTimeout(() => {
      router.push('/login')
    }, 5000)
  } catch (err: any) {
    if (err.response?.status === 400 && err.response.data) {
      errors.value = err.response.data
    } else {
      errors.value.email = 'Registration failed. Please try again.'
    }
  }
}

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

function sync(field: string, e: Event) {
  const value = (e.target as HTMLInputElement).value

  if (field === 'email') email.value = value
  if (field === 'fullName') fullName.value = value
  if (field === 'password') password.value = value
  if (field === 'confirmPassword') confirmPassword.value = value

  if (errors.value[field]) delete errors.value[field]
}

function goToLogin() {
  router.push('/login')
}

onMounted(() => {
  window.addEventListener('resize', checkMobile)

  const refCode = route.query.ref
  if (typeof refCode === 'string') {
    userStore.setReferral(refCode)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped lang="scss">
.register {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 100px;
    background: url('@/assets/images/register-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      background: url('@/assets/images/mobile-register-bg.webp');
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
    -webkit-backdrop-filter: blur(24px);
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
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    height: auto;
    padding: 90px 0;
  }

  &__left {
    img {
      border-radius: 10px;
      max-width: 392px;
      height: auto;
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

    .logo {
      width: 50px;
      height: auto;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 9px;

    .success-wrapper {
      height: 44px;
      margin-top: 12px;

      .success-notification {
        display: flex;
        align-items: center;
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
          width: 18px;
          height: 18px;
        }
      }
    }

    .error-text {
      color: #f44336;
      font-size: 0.6rem;
    }

    label {
      font-weight: 500;
      font-size: 12px;
      color: rgba(0, 0, 0, 1);
    }

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

    button {
      background-color: rgba(241, 162, 59, 1);
      height: 35px;
      border: none;
      border-radius: 5px;
      color: rgba(255, 255, 255, 1);
      padding: 10px 20px;
      font-weight: 500;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background-color: #e6991e;
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        color: #888888;
      }
    }

    .switch-login {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      text-align: left;
      font-weight: 400;

      span {
        color: rgba(49, 118, 177, 1);
        cursor: pointer;
        font-weight: 500;
        transition: color 0.2s;
        text-decoration: underline;

        &:hover {
          color: #e6991e;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .register__glass {
    width: 90%;
    height: auto;
    padding: 8px 14px;
    .register__title {
      font-size: 22px;
    }
  }

  .register__container {
    width: 90%;
    flex-direction: column;
    gap: 20px;
    padding: 30px 20px 60px 20px;
  }

  .register__left img {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }

  .register__right {
    width: 100%;
    .logo {
      width: 40px;
    }
  }

  .register__form {
    gap: 8px;

    input {
      height: 42px;
      font-size: 14px;

      &::placeholder {
        font-size: 13px;
      }
    }

    .password-input-wrapper {
      input {
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
    }

    button {
      height: 42px;
      font-size: 14px;
    }

    .switch-login {
      font-size: 13px;
      text-align: center;
    }
  }
}

</style>
