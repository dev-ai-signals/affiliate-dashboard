<template>
  <section class="login">
    <div class="login__banner">
      <div class="login__glass">
        <h1 class="login__title">AI Signals Affiliate Login</h1>
      </div>
    </div>
    <div class="login__container">
      <div class="login__left">
        <img :src="loginImage" alt="Keyboard login illustration" />
      </div>

      <div class="login__right">
        <img class="logo" :src="logo" alt="AI Signals Logo" />

        <form class="login__form" @submit.prevent="handleSubmit">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="eg. name@gmail.com" />

          <label>Password</label>
          <input v-model="password" type="password" placeholder="eg. xyz1234567" />

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
import logo from '@/assets/icons/logo-notext.svg'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import api from '@/shared/api/axios'
import { useUserStore } from '@/shared/stores/user'

const userStore = useUserStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleSubmit(e: Event) {
  e.preventDefault()

  if (!email.value || !password.value) {
    alert('Please enter both email and password.')
    return
  }

  loading.value = true
  try {
    const { data } = await api.post('/auth/login', {
      email: email.value,
      password: password.value,
    })

    userStore.login(data)
    router.push('/dashboard')
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

</script>

<style scoped lang="scss">
.login {
  background-color: rgba(245, 245, 245, 1);
  color: #000;
  min-height: 100vh;
  padding-bottom: 10px;

  &__banner {
    height: 142px;
    background: url('@/assets/images/login-banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
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
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    height: 758px;
    padding: 45px 155px 90px 155px;
  }

  &__left {
    img {
      border-radius: 10px;
      max-width: 521px;
      height: auto;
      margin-right: 88px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 6px;

    .logo {
      width: 66px;
      height: auto;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;

    label {
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
    }

    input {
      padding: 14px 8px;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.26);
      background: transparent;
      color: #000;
      font-weight: 400;
      font-size: 16px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
        font-size: 16px;
        font-weight: 400;
      }
    }

    button {
      background-color: rgba(241, 162, 59, 1);
      height: 46px;
      border: none;
      border-radius: 5px;
      color: rgba(255, 255, 255, 1);
      padding: 10px 20px;
      font-weight: 500;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background-color: #e6991e;
      }
    }

    .login__extras {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
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
</style>