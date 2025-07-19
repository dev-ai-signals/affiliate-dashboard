<template>
  <section class="login">
    <div class="login__banner">
      <div class="login__glass">
        <h1 class="login__title">AI Signals Affiliate Login</h1>
      </div>
    </div>
    <div class="login__container">
      <div class="login__left">
        <img v-if="!isMobile" :src="loginImage" alt="Keyboard login illustration" />
        <div v-else class="mobile-top-content">
          <img class="logo" :src="logo" alt="AI Signals Logo" />
          <img :src="mobileLoginImage" alt="Mobile Content Image">
        </div>
      </div>

      <div class="login__right">
        <img v-if="!isMobile" class="logo" :src="logo" alt="AI Signals Logo" />

        <form class="login__form" @submit.prevent="handleSubmit">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="eg. name@gmail.com" />

          <label>Password</label>
          <div class="password-input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="eg. xyz1234567"
            />
            <img
              src="@/assets/icons/eye.svg"
              alt="Toggle visibility"
              class="eye-icon"
              @click="showPassword = !showPassword"
            />
          </div>


          <button type="submit" :disabled="loading">LOGIN</button>

          <div class="login__extras">
            <span class="forgot" @click="goToForgot">Forgot password</span>
            <span class="new">New Affiliate? <span class="link" @click="goToRegister">Click here</span></span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import loginImage from '@/assets/images/login-image.webp'
import mobileLoginImage from '@/assets/images/mobile-login-content.webp'
import logo from '@/assets/icons/logo-notext.svg'
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '@/shared/composables/useAuth'

const isMobile = ref(window.innerWidth <= 768)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

const router = useRouter()
const showPassword = ref(false)
const email = ref('')
const password = ref('')
const loading = ref(false)

const { login } = useAuth()

async function handleSubmit(e: Event) {
  e.preventDefault()

  if (!email.value || !password.value) {
    alert('Please enter both email and password.')
    return
  }

  loading.value = true
  try {
    await login(email.value, password.value)
  } catch (err: any) {
    console.error('Login failed:', err)
    alert('Login failed. Please check your credentials.')
  } finally {
    loading.value = false
  }
}

function goToForgot() {
  router.push('/forgot-password')
}

function goToRegister() {
  router.push('/register')
}

onMounted(() => {
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

</script>

<style scoped lang="scss">
.login {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 100px;
    background: url('@/assets/images/login-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      background: url('@/assets/images/mobile-login-bg.webp');
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
    color: rgba(255, 255, 255, 1);
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

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        font-weight: 400;
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
    }

    .login__extras {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);

      .forgot, .link {
        color: rgba(49, 118, 177, 1);
        cursor: pointer;
        font-weight: 400;
        transition: color 0.2s;

        &:hover {
          color: #e6991e;
        }
      }

      .link {
        text-decoration: underline;
      }
    }
  }
}


@media (max-width: 768px) {
  .login__glass {
    width: 90%;
    height: auto;
    padding: 8px 14px;
    .login__title {
      font-size: 22px;
    }
  }

  .login__container {
    width: 90%;
    flex-direction: column;
    gap: 20px;
    padding: 30px 20px 60px 20px;
  }

  .login__left img {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }

  .login__right {
    width: 100%;
    .logo {
      width: 40px;
    }
  }

  .login__form {
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

    .login__extras {
      font-size: 13px;
      text-align: center;
    }
  }
}

</style>
